(() => {
  "use strict";

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const bgmButton = document.getElementById("bgmToggle");
  const sfxButton = document.getElementById("sfxToggle");
  const COMPANY_PAN = { anthropic: -0.55, openai: 0, moonshot: 0.55 };
  const BASS_NOTES = [43.65, 43.65, 51.91, 43.65, 58.27, 51.91, 43.65, 38.89];
  const ARP_RATIOS = [1, 1.5, 2, 1.25, 1.5, 2, 2.5, 1.5];

  let context = null;
  let masterGain = null;
  let bgmGain = null;
  let sfxGain = null;
  let compressor = null;
  let reverbInput = null;
  let reverbDry = null;
  let reverbWet = null;
  let convolver = null;
  let noiseBuffer = null;
  let engineBuffer = null;
  let bgmEnabled = false;
  let sfxEnabled = false;
  let active = false;
  let running = false;
  let replayActive = false;
  let duckFactor = 1;
  let duckTimer = null;
  let raceSpeed = 1;
  let schedulerTimer = null;
  let nextStepTime = 0;
  let musicStep = 0;
  let currentRace = { racers: [], leader: null, progress: 0 };
  let lastLeader = null;
  const engines = new Map();
  const previousScores = new Map();
  const hornCooldown = new Map();
  const soundStats = { horns: 0, revs: 0, shifts: 0, whooshes: 0 };

  function ensureContext() {
    if (!AudioContextClass) return null;
    if (context) {
      if (context.state === "suspended") context.resume();
      return context;
    }

    context = new AudioContextClass();
    compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 18;
    compressor.ratio.value = 5;
    compressor.attack.value = 0.006;
    compressor.release.value = 0.22;

    masterGain = context.createGain();
    masterGain.gain.value = 0.78;
    bgmGain = context.createGain();
    bgmGain.gain.value = 0;
    sfxGain = context.createGain();
    sfxGain.gain.value = 0;
    bgmGain.connect(compressor);
    sfxGain.connect(compressor);
    reverbInput = context.createGain();
    reverbDry = context.createGain();
    reverbWet = context.createGain();
    convolver = context.createConvolver();
    convolver.buffer = buildImpulseResponse(2.35, 2.8);
    reverbDry.gain.value = 0.46;
    reverbWet.gain.value = 0.72;
    reverbInput.connect(reverbDry).connect(sfxGain);
    reverbInput.connect(convolver).connect(reverbWet).connect(sfxGain);
    compressor.connect(masterGain);
    masterGain.connect(context.destination);
    noiseBuffer = buildNoiseBuffer();
    engineBuffer = buildEngineBuffer();
    createEngineVoices();
    return context;
  }

  function buildImpulseResponse(duration = 2, decay = 2.5) {
    const length = Math.floor(context.sampleRate * duration);
    const buffer = context.createBuffer(2, length, context.sampleRate);
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const data = buffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const envelope = Math.pow(1 - i / length, decay);
        const early = i < context.sampleRate * .08 ? Math.sin(i * .19) * .22 : 0;
        data[i] = ((Math.random() * 2 - 1) * envelope + early) * .55;
      }
    }
    return buffer;
  }

  function buildNoiseBuffer() {
    const length = Math.floor(context.sampleRate * 2);
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      last = last * 0.72 + white * 0.28;
      data[i] = last;
    }
    return buffer;
  }

  function buildEngineBuffer() {
    const duration = 2;
    const sampleRate = context.sampleRate;
    const length = Math.floor(sampleRate * duration);
    const buffer = context.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    const firingHz = 72;
    let coloredNoise = 0;
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const phase = Math.PI * 2 * firingHz * t + 0.045 * Math.sin(Math.PI * 2 * 6 * t);
      const firingPulse = Math.pow(Math.max(0, Math.sin(phase)), 7);
      const compressionPulse = Math.pow(Math.max(0, Math.sin(phase + Math.PI)), 11) * 0.22;
      const harmonics =
        Math.sin(phase) * 0.34 +
        Math.sin(phase * 2 + 0.18) * 0.24 +
        Math.sin(phase * 3 + 0.41) * 0.17 +
        Math.sin(phase * 4.01) * 0.09 +
        Math.sin(phase * 6.02) * 0.055;
      coloredNoise = coloredNoise * 0.91 + (Math.random() * 2 - 1) * 0.09;
      const exhaustTexture = coloredNoise * (0.08 + firingPulse * 0.26);
      const sub = Math.sin(phase * 0.5) * 0.13;
      const raw = firingPulse * 0.74 - compressionPulse + harmonics * 0.46 + exhaustTexture + sub;
      data[i] = Math.tanh(raw * 1.85) * 0.56;
    }
    return buffer;
  }

  function setButton(button, on) {
    if (!button) return;
    button.classList.toggle("is-on", on);
    button.classList.toggle("is-pulsing", on);
    button.setAttribute("aria-pressed", String(on));
    const status = button.querySelector("small");
    if (status) status.textContent = on ? "ON" : "OFF";
  }

  function updateMix() {
    if (!context) return;
    const now = context.currentTime;
    const baseBgm = running ? 0.17 : 0.095;
    const bgmLevel = bgmEnabled && active ? baseBgm * duckFactor * (replayActive ? 0.42 : 1) : 0;
    const sfxLevel = sfxEnabled && active ? (replayActive ? 0.46 : 0.72) : 0;
    bgmGain.gain.cancelScheduledValues(now);
    bgmGain.gain.setTargetAtTime(bgmLevel, now, 0.08);
    sfxGain.gain.cancelScheduledValues(now);
    sfxGain.gain.setTargetAtTime(sfxLevel, now, 0.045);
    updateEngineMix();
  }

  function duck(level = 0.45, duration = 1.2) {
    if (!context) return;
    duckFactor = Math.max(0.2, Math.min(1, level));
    clearTimeout(duckTimer);
    updateMix();
    duckTimer = window.setTimeout(() => { duckFactor = 1; updateMix(); }, duration * 1000);
  }

  function setReplay(value) {
    replayActive = Boolean(value);
    if (context) {
      updateMix();
      if (sfxEnabled && active) {
        if (replayActive) {
          whoosh(currentRace.leader || "openai", 0.62);
          simpleTone(210, 0.28, 0.028, "triangle");
        } else {
          simpleTone(620, 0.1, 0.03, "sine");
        }
      }
    }
  }

  function toggleBgm(force) {
    if (!ensureContext()) return;
    bgmEnabled = typeof force === "boolean" ? force : !bgmEnabled;
    setButton(bgmButton, bgmEnabled);
    if (bgmEnabled) startMusicScheduler();
    else stopMusicScheduler();
    updateMix();
  }

  function toggleSfx(force) {
    if (!ensureContext()) return;
    sfxEnabled = typeof force === "boolean" ? force : !sfxEnabled;
    setButton(sfxButton, sfxEnabled);
    updateMix();
    if (sfxEnabled && active) uiConfirm();
  }

  function startMusicScheduler() {
    if (!context || schedulerTimer) return;
    nextStepTime = context.currentTime + 0.05;
    musicStep = 0;
    schedulerTimer = window.setInterval(scheduleMusic, 65);
    scheduleMusic();
  }

  function stopMusicScheduler() {
    if (schedulerTimer) window.clearInterval(schedulerTimer);
    schedulerTimer = null;
  }

  function scheduleMusic() {
    if (!context || !bgmEnabled || !active) return;
    const tempo = 116 + (raceSpeed - 1) * 18;
    const stepDuration = 60 / tempo / 4;
    while (nextStepTime < context.currentTime + 0.18) {
      scheduleMusicStep(musicStep, nextStepTime, stepDuration);
      musicStep = (musicStep + 1) % 32;
      nextStepTime += stepDuration;
    }
  }

  function scheduleMusicStep(step, time, stepDuration) {
    const beat = step % 16;
    if ([0, 4, 8, 12].includes(beat)) kick(time, beat === 0 ? 1 : 0.76);
    if (beat % 2 === 0) hat(time, beat === 14 ? 0.12 : 0.055, beat === 14);
    if ([4, 12].includes(beat)) snare(time, 0.065);
    if (beat % 4 === 0) {
      const note = BASS_NOTES[Math.floor(step / 4) % BASS_NOTES.length];
      bass(time, note, stepDuration * 3.3);
    }
    if ([2, 6, 10, 14].includes(beat)) {
      const root = BASS_NOTES[Math.floor(step / 4) % BASS_NOTES.length] * 4;
      arp(time, root * ARP_RATIOS[Math.floor(step / 2) % ARP_RATIOS.length], stepDuration * 1.65);
    }
    if (beat === 0) pad(time, BASS_NOTES[Math.floor(step / 16) % BASS_NOTES.length], stepDuration * 15.5);
  }

  function kick(time, strength = 1) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(145, time);
    oscillator.frequency.exponentialRampToValueAtTime(46, time + 0.12);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.34 * strength, time + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.19);
    oscillator.connect(gain).connect(bgmGain);
    oscillator.start(time);
    oscillator.stop(time + 0.21);
  }

  function hat(time, level, open = false) {
    const source = context.createBufferSource();
    source.buffer = noiseBuffer;
    const highpass = context.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 6800;
    const gain = context.createGain();
    const duration = open ? 0.19 : 0.055;
    gain.gain.setValueAtTime(level, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    source.connect(highpass).connect(gain).connect(bgmGain);
    source.start(time);
    source.stop(time + duration + 0.02);
  }

  function snare(time, level) {
    const source = context.createBufferSource();
    source.buffer = noiseBuffer;
    const bandpass = context.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 1800;
    bandpass.Q.value = 0.7;
    const gain = context.createGain();
    gain.gain.setValueAtTime(level, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.16);
    source.connect(bandpass).connect(gain).connect(bgmGain);
    source.start(time);
    source.stop(time + 0.18);
  }

  function bass(time, frequency, duration) {
    const oscillator = context.createOscillator();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    oscillator.type = "sawtooth";
    oscillator.frequency.value = frequency;
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(440, time);
    filter.frequency.exponentialRampToValueAtTime(125, time + duration);
    filter.Q.value = 4.5;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.085, time + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    oscillator.connect(filter).connect(gain).connect(bgmGain);
    oscillator.start(time);
    oscillator.stop(time + duration + 0.02);
  }

  function arp(time, frequency, duration) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    oscillator.type = "triangle";
    oscillator.frequency.value = frequency;
    filter.type = "lowpass";
    filter.frequency.value = 2400;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.031, time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    oscillator.connect(filter).connect(gain).connect(bgmGain);
    oscillator.start(time);
    oscillator.stop(time + duration + 0.02);
  }

  function pad(time, root, duration) {
    [1, 1.25, 1.5].forEach((ratio, index) => {
      const oscillator = context.createOscillator();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      oscillator.type = index === 0 ? "sawtooth" : "triangle";
      oscillator.frequency.value = root * ratio * 2;
      oscillator.detune.value = (index - 1) * 7;
      filter.type = "lowpass";
      filter.frequency.value = 620;
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.012, time + 0.24);
      gain.gain.setValueAtTime(0.012, time + Math.max(0.25, duration - 0.34));
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
      oscillator.connect(filter).connect(gain).connect(bgmGain);
      oscillator.start(time);
      oscillator.stop(time + duration + 0.04);
    });
  }

  function createEngineVoices() {
    ["anthropic", "openai", "moonshot"].forEach((key, index) => {
      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      const panner = context.createStereoPanner ? context.createStereoPanner() : null;
      source.buffer = engineBuffer;
      source.loop = true;
      source.loopStart = 0;
      source.loopEnd = engineBuffer.duration;
      source.playbackRate.value = 1;
      source.detune.value = (index - 1) * 7;
      filter.type = "lowpass";
      filter.frequency.value = 980;
      filter.Q.value = 1.4;
      gain.gain.value = 0;
      source.connect(filter).connect(gain);
      if (panner) {
        panner.pan.value = COMPANY_PAN[key];
        gain.connect(panner).connect(sfxGain);
      } else gain.connect(sfxGain);
      source.start();
      engines.set(key, {
        source, filter, gain, panner, active: false,
        revStart: 0, revUntil: 0, revStrength: 1,
        shiftStart: 0, shiftUntil: 0,
        lastGearBand: -1
      });
    });
  }

  function updateEngineMix() {
    if (!context || !engines.size) return;
    const now = context.currentTime;
    engines.forEach((engine, key) => {
      const racer = currentRace.racers?.find((item) => item.key === key);
      const audible = Boolean(sfxEnabled && active && running && racer?.active);
      const score = racer?.score || 0;
      const baseRate = 0.76 + score / 190 + Math.max(0, raceSpeed - 0.5) * 0.085;
      let revFactor = 1;
      if (now < engine.revUntil) {
        const progress = Math.max(0, Math.min(1, (now - engine.revStart) / (engine.revUntil - engine.revStart)));
        revFactor += Math.sin(progress * Math.PI) * 0.5 * engine.revStrength;
      }
      let shiftFactor = 1;
      if (now < engine.shiftUntil) {
        const progress = Math.max(0, Math.min(1, (now - engine.shiftStart) / (engine.shiftUntil - engine.shiftStart)));
        shiftFactor = 0.7 + progress * 0.3;
      }
      const engineIndex = ["anthropic", "openai", "moonshot"].indexOf(key);
      const combustionJitter = 1 + Math.sin(now * (16.5 + engineIndex * 0.7)) * 0.009;
      const playbackRate = Math.max(0.55, baseRate * revFactor * shiftFactor * combustionJitter);
      engine.source.playbackRate.setTargetAtTime(playbackRate, now, 0.035);
      engine.filter.frequency.setTargetAtTime(700 + score * 5.5 + (revFactor - 1) * 720, now, 0.045);
      engine.gain.gain.setTargetAtTime(audible ? 0.031 + score / 9000 : 0, now, audible ? 0.08 : 0.035);
      engine.active = audible;
    });
  }

  function simpleTone(frequency, duration, level = 0.08, type = "sine", when = 0, destination = sfxGain) {
    if (!context) return;
    const time = context.currentTime + when;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(level, time + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    oscillator.connect(gain).connect(destination);
    oscillator.start(time);
    oscillator.stop(time + duration + 0.02);
  }

  function uiConfirm() {
    if (!sfxEnabled || !context) return;
    simpleTone(740, 0.07, 0.055, "sine");
    simpleTone(1046, 0.09, 0.045, "sine", 0.07);
  }

  function countdown(value) {
    if (!sfxEnabled || !active || !ensureContext()) return;
    if (value === "GO") {
      simpleTone(880, 0.32, 0.11, "square");
      simpleTone(1320, 0.34, 0.06, "sine", 0.025);
    } else {
      simpleTone(520 + (Number(value) === 1 ? 90 : 0), 0.11, 0.075, "sine");
    }
  }

  function horn(company, duration = 0.3, level = 0.052) {
    if (!sfxEnabled || !context || !company) return;
    soundStats.horns += 1;
    const now = context.currentTime;
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const panner = context.createStereoPanner ? context.createStereoPanner() : null;
    filter.type = "bandpass";
    filter.frequency.value = 560;
    filter.Q.value = 0.8;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(level, now + 0.018);
    gain.gain.setValueAtTime(level, now + duration * 0.62);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    filter.connect(gain);
    if (panner) {
      panner.pan.value = COMPANY_PAN[company] || 0;
      gain.connect(panner).connect(sfxGain);
    } else gain.connect(sfxGain);
    [370, 466.16].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = index === 0 ? "sawtooth" : "triangle";
      oscillator.frequency.value = frequency;
      oscillator.detune.setValueAtTime(index ? 4 : -3, now);
      oscillator.detune.linearRampToValueAtTime(index ? -2 : 3, now + duration);
      oscillator.connect(filter);
      oscillator.start(now);
      oscillator.stop(now + duration + 0.025);
    });
  }

  function whoosh(company, strength = 1) {
    if (!sfxEnabled || !context) return;
    soundStats.whooshes += 1;
    const now = context.currentTime;
    const source = context.createBufferSource();
    source.buffer = noiseBuffer;
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const panner = context.createStereoPanner ? context.createStereoPanner() : null;
    if (panner) panner.pan.value = COMPANY_PAN[company] || 0;
    filter.type = "bandpass";
    filter.Q.value = 0.75;
    filter.frequency.setValueAtTime(260, now);
    filter.frequency.exponentialRampToValueAtTime(3200, now + 0.48);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.095 * strength, now + 0.13);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.58);
    source.connect(filter).connect(gain);
    if (panner) gain.connect(panner).connect(sfxGain); else gain.connect(sfxGain);
    source.start(now);
    source.stop(now + 0.62);
  }

  function rev(company, strength = 1) {
    if (!sfxEnabled || !context) return;
    soundStats.revs += 1;
    const engine = engines.get(company);
    if (!engine) return;
    const now = context.currentTime;
    engine.revStart = now;
    engine.revUntil = now + 0.82;
    engine.revStrength = Math.max(0.75, Math.min(1.4, strength));
    exhaustPop(company, now + 0.18, 0.038 * strength);
    exhaustPop(company, now + 0.55, 0.026 * strength);
  }

  function exhaustPop(company, time, level) {
    if (!noiseBuffer || !context) return;
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const panner = context.createStereoPanner ? context.createStereoPanner() : null;
    source.buffer = noiseBuffer;
    filter.type = "bandpass";
    filter.frequency.value = 480;
    filter.Q.value = 1.4;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(level, time + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.085);
    source.connect(filter).connect(gain);
    if (panner) {
      panner.pan.value = COMPANY_PAN[company] || 0;
      gain.connect(panner).connect(sfxGain);
    } else gain.connect(sfxGain);
    source.start(time);
    source.stop(time + 0.1);
  }

  function gearShift(company) {
    if (!sfxEnabled || !context) return;
    const engine = engines.get(company);
    if (!engine) return;
    soundStats.shifts += 1;
    const now = context.currentTime;
    engine.shiftStart = now;
    engine.shiftUntil = now + 0.17;
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const panner = context.createStereoPanner ? context.createStereoPanner() : null;
    source.buffer = noiseBuffer;
    filter.type = "lowpass";
    filter.frequency.value = 340;
    gain.gain.setValueAtTime(0.045, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
    source.connect(filter).connect(gain);
    if (panner) {
      panner.pan.value = COMPANY_PAN[company] || 0;
      gain.connect(panner).connect(sfxGain);
    } else gain.connect(sfxGain);
    source.start(now);
    source.stop(now + 0.09);
  }

  function boost(company, detail = {}) {
    if (!sfxEnabled || !active || !ensureContext()) return;
    const strength = Math.min(1.35, 0.72 + Math.max(0, detail.delta || 0) / 30);
    whoosh(company, strength);
    rev(company, strength);
  }

  function stunt(company, type) {
    if (!sfxEnabled || !active || !ensureContext()) return;
    duck(0.54, 1.25);
    if (["logic-leap", "memory-helix", "prism-roll"].includes(type)) whoosh(company, type === "logic-leap" ? 1.25 : 0.9);
    if (type === "logic-leap") {
      simpleTone(180, 0.24, 0.045, "sawtooth");
      simpleTone(360, 0.2, 0.035, "triangle", 0.18);
      window.setTimeout(() => exhaustPop(company, context.currentTime, 0.065), 1800);
    } else if (type === "code-drift") {
      tireSqueal(company, 1.35);
    } else if (type === "prism-roll") {
      [440, 660, 880].forEach((frequency, index) => simpleTone(frequency, 0.34, 0.028, "triangle", index * 0.13));
    } else if (type === "tool-swarm") {
      [740, 980, 1220, 1480].forEach((frequency, index) => simpleTone(frequency, 0.09, 0.027, "square", index * 0.12));
    } else if (type === "memory-helix") {
      [220, 277, 330, 440].forEach((frequency, index) => simpleTone(frequency, 0.42, 0.025, "sine", index * 0.17));
    } else if (type === "open-gate") {
      simpleTone(392, 0.5, 0.038, "triangle");
      simpleTone(587.33, 0.55, 0.031, "sine", 0.09);
    } else if (type === "agent-swarm") {
      [620, 760, 920, 1120].forEach((frequency, index) => simpleTone(frequency, 0.14, 0.025, "square", index * 0.07));
    } else if (type === "endurance-night") {
      simpleTone(110, 0.8, 0.04, "sawtooth");
      simpleTone(165, 0.85, 0.024, "triangle", 0.08);
    } else if (type === "drag-strip") {
      rev(company, 1.35);
      whoosh(company, 1.12);
    } else if (type === "fuel-strategy") {
      [220, 260, 300].forEach((frequency, index) => simpleTone(frequency, 0.22, 0.025, "triangle", index * 0.11));
    }
  }

  function suspensionImpact(company, strength = 1) {
    if (!sfxEnabled || !context) return;
    const now = context.currentTime;
    const panner = context.createStereoPanner ? context.createStereoPanner() : null;
    if (panner) panner.pan.value = COMPANY_PAN[company] || 0;
    const bus = panner || sfxGain;
    if (panner) panner.connect(sfxGain);

    const thud = context.createOscillator();
    const thudGain = context.createGain();
    thud.type = "sine";
    thud.frequency.setValueAtTime(92, now);
    thud.frequency.exponentialRampToValueAtTime(42, now + .18);
    thudGain.gain.setValueAtTime(.0001, now);
    thudGain.gain.exponentialRampToValueAtTime(.11 * strength, now + .008);
    thudGain.gain.exponentialRampToValueAtTime(.0001, now + .24);
    thud.connect(thudGain).connect(bus);
    thud.start(now); thud.stop(now + .26);

    const clunk = context.createBufferSource();
    const clunkFilter = context.createBiquadFilter();
    const clunkGain = context.createGain();
    clunk.buffer = noiseBuffer;
    clunkFilter.type = "lowpass"; clunkFilter.frequency.value = 620;
    clunkGain.gain.setValueAtTime(.075 * strength, now);
    clunkGain.gain.exponentialRampToValueAtTime(.0001, now + .11);
    clunk.connect(clunkFilter).connect(clunkGain).connect(bus);
    clunk.start(now); clunk.stop(now + .13);

    const spring = context.createOscillator();
    const springGain = context.createGain();
    spring.type = "triangle";
    spring.frequency.setValueAtTime(310, now + .035);
    spring.frequency.exponentialRampToValueAtTime(135, now + .32);
    springGain.gain.setValueAtTime(.0001, now + .035);
    springGain.gain.exponentialRampToValueAtTime(.027 * strength, now + .07);
    springGain.gain.exponentialRampToValueAtTime(.0001, now + .34);
    spring.connect(springGain).connect(bus);
    spring.start(now + .035); spring.stop(now + .36);
  }

  function surfaceScrub(company, duration = .6, intensity = 1) {
    if (!sfxEnabled || !context) return;
    const source = context.createBufferSource();
    const low = context.createBiquadFilter();
    const high = context.createBiquadFilter();
    const gain = context.createGain();
    const panner = context.createStereoPanner ? context.createStereoPanner() : null;
    const now = context.currentTime;
    source.buffer = noiseBuffer;
    low.type = "lowpass"; low.frequency.value = 1250;
    high.type = "highpass"; high.frequency.value = 170;
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.036 * intensity, now + .045);
    gain.gain.setValueAtTime(.031 * intensity, now + duration * .72);
    gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
    source.connect(low).connect(high).connect(gain);
    if (panner) { panner.pan.value = COMPANY_PAN[company] || 0; gain.connect(panner).connect(sfxGain); }
    else gain.connect(sfxGain);
    source.start(now); source.stop(now + duration + .03);
  }

  function gateMechanism(company, finalGate = false) {
    if (!sfxEnabled || !context) return;
    const now = context.currentTime;
    const panner = context.createStereoPanner ? context.createStereoPanner() : null;
    if (panner) panner.pan.value = COMPANY_PAN[company] || 0;
    const bus = panner || sfxGain;
    if (panner) panner.connect(sfxGain);
    const motor = context.createOscillator();
    const motorGain = context.createGain();
    motor.type = "sawtooth";
    motor.frequency.setValueAtTime(finalGate ? 120 : 96, now);
    motor.frequency.linearRampToValueAtTime(finalGate ? 72 : 58, now + .42);
    motorGain.gain.setValueAtTime(.0001, now);
    motorGain.gain.exponentialRampToValueAtTime(.034, now + .04);
    motorGain.gain.exponentialRampToValueAtTime(.0001, now + .45);
    motor.connect(motorGain).connect(bus);
    motor.start(now); motor.stop(now + .47);
    [0, .12, .26].forEach((offset, index) => {
      const click = context.createBufferSource(), filter = context.createBiquadFilter(), clickGain = context.createGain();
      click.buffer = noiseBuffer; filter.type = "bandpass"; filter.frequency.value = 1050 + index * 460; filter.Q.value = 3;
      clickGain.gain.setValueAtTime(.045, now + offset); clickGain.gain.exponentialRampToValueAtTime(.0001, now + offset + .055);
      click.connect(filter).connect(clickGain).connect(bus); click.start(now + offset); click.stop(now + offset + .07);
    });
  }

  function tunnelTone(frequency, duration = .4, level = .03) {
    if (!context || !reverbInput) return;
    simpleTone(frequency, duration, level, "sine", 0, reverbInput);
  }

  function stuntPhase(company, type, phase) {
    if (!sfxEnabled || !active || !ensureContext()) return;
    if (phase === "LAUNCH") {
      rev(company, 1.2);
      whoosh(company, 1.25);
    } else if (phase === "LANDING") {
      suspensionImpact(company, 1.12);
      exhaustPop(company, context.currentTime + 0.02, 0.06);
    } else if (phase === "PATCH DRIFT" || phase === "SWITCHBACK") {
      const duration = phase === "PATCH DRIFT" ? 0.72 : 0.48;
      tireSqueal(company, duration);
      surfaceScrub(company, duration + .12, phase === "PATCH DRIFT" ? 1 : .78);
    } else if (phase.includes("GATE") || phase === "TOOL SCAN") {
      gateMechanism(company, phase === "FINAL GATE" || phase === "SELF-HOST GATE");
      simpleTone(phase === "FINAL GATE" ? 1180 : 860, 0.08, 0.025, "square");
    } else if (["ENCODE", "MEMORY TUNNEL", "LONG RECALL", "BEACON FOUND"].includes(phase)) {
      const frequencies = { ENCODE: 330, "MEMORY TUNNEL": 392, "LONG RECALL": 494, "BEACON FOUND": 740 };
      tunnelTone(frequencies[phase], phase === "MEMORY TUNNEL" ? .75 : .38, .032);
    } else if (["SWARM DEPLOY", "PARALLEL ROLES", "SWARM MERGE"].includes(phase)) {
      const frequencies = { "SWARM DEPLOY": 680, "PARALLEL ROLES": 920, "SWARM MERGE": 1180 };
      simpleTone(frequencies[phase], 0.16, 0.03, "square");
    } else if (["SUNSET", "NIGHT RUN", "DAWN"].includes(phase)) {
      const frequencies = { SUNSET: 196, "NIGHT RUN": 130.81, DAWN: 392 };
      simpleTone(frequencies[phase], 0.4, 0.028, "triangle");
    } else if (["REACTION LIGHTS", "LAUNCH", "TOP SPEED"].includes(phase)) {
      if (phase === "LAUNCH") rev(company, 1.4);
      else simpleTone(phase === "REACTION LIGHTS" ? 520 : 980, 0.12, 0.04, "square");
    } else if (["PIT ENTRY", "TOKEN FUEL", "COST CHECK", "PIT EXIT"].includes(phase)) {
      const frequencies = { "PIT ENTRY": 240, "TOKEN FUEL": 310, "COST CHECK": 470, "PIT EXIT": 720 };
      simpleTone(frequencies[phase], 0.18, 0.03, "triangle");
    } else if (["LICENSE CHECK", "WEIGHTS RELEASED", "SELF-HOST GATE", "OPEN GARAGE"].includes(phase)) {
      const frequencies = { "LICENSE CHECK": 330, "WEIGHTS RELEASED": 440, "SELF-HOST GATE": 554, "OPEN GARAGE": 659 };
      simpleTone(frequencies[phase], 0.25, 0.028, "sine");
    }
  }

  function tireSqueal(company, duration) {
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const panner = context.createStereoPanner ? context.createStereoPanner() : null;
    source.buffer = noiseBuffer;
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2400, context.currentTime);
    filter.frequency.linearRampToValueAtTime(3600, context.currentTime + duration);
    filter.Q.value = 5.5;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.045, context.currentTime + 0.08);
    gain.gain.setValueAtTime(0.04, context.currentTime + duration * 0.72);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
    source.connect(filter).connect(gain);
    if (panner) {
      panner.pan.value = COMPANY_PAN[company] || 0;
      gain.connect(panner).connect(sfxGain);
    } else gain.connect(sfxGain);
    source.start();
    source.stop(context.currentTime + duration + 0.02);
  }

  function finish(company) {
    if (!sfxEnabled || !active || !ensureContext()) return;
    duck(0.28, 2.1);
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => simpleTone(frequency, 0.42, 0.065, "sawtooth", index * 0.12));
    window.setTimeout(() => crowdBurst(), 170);
  }

  function crowdBurst() {
    if (!sfxEnabled || !context) return;
    const source = context.createBufferSource();
    source.buffer = noiseBuffer;
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    filter.type = "bandpass";
    filter.frequency.value = 1050;
    filter.Q.value = 0.45;
    const now = context.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.075, now + 0.18);
    gain.gain.setValueAtTime(0.06, now + 0.65);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.35);
    source.connect(filter).connect(gain).connect(sfxGain);
    source.start(now);
    source.stop(now + 1.4);
  }

  function detectOvertakeIntent(payload) {
    if (!sfxEnabled || !active || !running || !context) return;
    const now = context.currentTime;
    const activeRacers = payload.racers.filter((racer) => racer.active);
    activeRacers.forEach((racer) => {
      const previousOwn = previousScores.get(racer.key);
      if (previousOwn == null || racer.score <= previousOwn + 0.35) return;
      const previousAhead = activeRacers
        .filter((other) => other.key !== racer.key)
        .map((other) => ({
          other,
          previousOther: previousScores.has(other.key) ? previousScores.get(other.key) : other.score
        }))
        .filter((entry) => entry.previousOther > previousOwn)
        .sort((a, b) => (a.previousOther - previousOwn) - (b.previousOther - previousOwn))[0];
      if (!previousAhead) return;
      const oldGap = previousAhead.previousOther - previousOwn;
      const newGap = previousAhead.other.score - racer.score;
      const lastHorn = hornCooldown.get(racer.key) || -Infinity;
      if (oldGap > 0 && newGap <= 4.5 && now - lastHorn > 4.2 / Math.max(0.75, raceSpeed)) {
        horn(racer.key, newGap <= 0 ? 0.34 : 0.26, newGap <= 0 ? 0.06 : 0.046);
        hornCooldown.set(racer.key, now);
      }
    });
  }

  function detectGearShifts(payload) {
    payload.racers.forEach((racer, index) => {
      const engine = engines.get(racer.key);
      if (!engine) return;
      if (!racer.active) {
        engine.lastGearBand = -1;
        return;
      }
      const offset = index * 0.027;
      const band = Math.floor((payload.progress + offset) / 0.095);
      if (running && engine.lastGearBand >= 0 && band > engine.lastGearBand) gearShift(racer.key);
      engine.lastGearBand = band;
    });
  }

  function updateRace(payload) {
    const priorLeader = currentRace.leader;
    detectOvertakeIntent(payload);
    detectGearShifts(payload);
    currentRace = payload;
    raceSpeed = payload.speed || raceSpeed;
    if (sfxEnabled && active && running && priorLeader && payload.leader && priorLeader !== payload.leader) {
      whoosh(payload.leader, 1.15);
      const engine = engines.get(payload.leader);
      if (engine) {
        engine.revStart = context.currentTime;
        engine.revUntil = context.currentTime + 0.65;
        engine.revStrength = 1.1;
      }
    }
    payload.racers.forEach((racer) => {
      if (racer.active) previousScores.set(racer.key, racer.score);
      else previousScores.delete(racer.key);
    });
    lastLeader = payload.leader || lastLeader;
    updateEngineMix();
  }

  function setRunning(value) {
    const wasRunning = running;
    running = Boolean(value);
    updateMix();
    if (!wasRunning && running && sfxEnabled && active && context) {
      currentRace.racers?.filter((racer) => racer.active).forEach((racer, index) => {
        window.setTimeout(() => rev(racer.key, 0.82 + index * 0.08), index * 70);
      });
    }
  }

  function activate() {
    active = true;
    updateMix();
    if (bgmEnabled) startMusicScheduler();
  }

  function deactivate() {
    active = false;
    replayActive = false;
    stopMusicScheduler();
    updateMix();
  }

  function reset() {
    lastLeader = null;
    replayActive = false;
    duckFactor = 1;
    clearTimeout(duckTimer);
    previousScores.clear();
    hornCooldown.clear();
    engines.forEach((engine) => {
      engine.lastGearBand = -1;
      engine.revUntil = 0;
      engine.shiftUntil = 0;
    });
    currentRace = { racers: [], leader: null, progress: 0 };
    updateEngineMix();
  }

  bgmButton?.addEventListener("click", () => toggleBgm());
  sfxButton?.addEventListener("click", () => toggleSfx());

  setButton(bgmButton, false);
  setButton(sfxButton, false);

  window.mgpAudio = {
    toggleBgm,
    toggleSfx,
    setReplay,
    duck,
    updateRace,
    setRunning,
    activate,
    deactivate,
    reset,
    countdown,
    boost,
    stunt,
    stuntPhase,
    finish,
    horn,
    getState: () => ({ bgmEnabled, sfxEnabled, active, running, replayActive, duckFactor, raceSpeed, stats: { ...soundStats } })
  };
  window.dispatchEvent(new Event("mgp-audio-ready"));
})();
