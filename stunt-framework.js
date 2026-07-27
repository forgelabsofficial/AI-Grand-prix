(() => {
  "use strict";

  const TYPE_TO_PRIMITIVE = {
    "logic-leap": "ramp",
    "code-drift": "drift",
    "prism-roll": "prism",
    "tool-swarm": "gate",
    "agent-swarm": "swarm",
    "memory-helix": "tunnel",
    "endurance-night": "night",
    "drag-strip": "drag",
    "fuel-strategy": "fuel",
    "open-gate": "garage"
  };

  class StuntFramework {
    constructor({ THREE, scene, curve }) {
      this.THREE = THREE;
      this.scene = scene;
      this.curve = curve;
      this.root = new THREE.Group();
      this.root.name = "Reusable Stunt Primitives";
      scene.add(this.root);
      this.activePrimitive = null;
      this.activeType = null;
      this.startT = 0;
      this.endT = 0;
      this.resumeFrom = 0;
      this.lane = 0;
      this.color = new THREE.Color(0xd8ff51);
      this.difficulty = 0.8;
      this.elapsed = 0;
      this.primitives = {
        ramp: this.createRamp(),
        tunnel: this.createTunnel(),
        gate: this.createGate(),
        drift: this.createDrift(),
        prism: this.createPrism(),
        swarm: this.createSwarm(),
        night: this.createNight(),
        drag: this.createDrag(),
        fuel: this.createFuel(),
        garage: this.createGarage()
      };
      this.hide();
    }

    material(color = 0xd8ff51, options = {}) {
      return new this.THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: options.emissiveIntensity ?? 0.18,
        roughness: options.roughness ?? 0.42,
        metalness: options.metalness ?? 0.38,
        transparent: options.transparent ?? false,
        opacity: options.opacity ?? 1,
        depthWrite: options.depthWrite ?? true,
        side: options.side ?? this.THREE.FrontSide
      });
    }

    createRamp() {
      const group = new this.THREE.Group();
      group.name = "Ramp primitive";
      const rampMaterial = this.material(0xd8ff51, { roughness: 0.55, metalness: 0.25 });
      const edgeMaterial = this.material(0xf4f6f1, { emissiveIntensity: 0.45, roughness: 0.35 });
      const launch = new this.THREE.Mesh(new this.THREE.BoxGeometry(5.6, 0.3, 3.5), rampMaterial.clone());
      launch.position.set(0, 1.15, 0);
      launch.rotation.z = 0.29;
      launch.castShadow = true;
      launch.receiveShadow = true;
      const landing = new this.THREE.Mesh(new this.THREE.BoxGeometry(5.2, 0.3, 3.5), rampMaterial.clone());
      landing.position.set(13.2, 1.05, 0);
      landing.rotation.z = -0.28;
      landing.castShadow = true;
      landing.receiveShadow = true;
      const leftEdge = new this.THREE.Mesh(new this.THREE.BoxGeometry(18.5, 0.11, 0.1), edgeMaterial.clone());
      leftEdge.position.set(6.5, 0.1, -1.72);
      const rightEdge = leftEdge.clone();
      rightEdge.position.z = 1.72;
      group.add(launch, landing, leftEdge, rightEdge);
      group.userData.colorMaterials = [launch.material, landing.material, leftEdge.material, rightEdge.material];
      this.root.add(group);
      return group;
    }

    createTunnel() {
      const group = new this.THREE.Group();
      group.name = "Tunnel primitive";
      group.userData.rings = [];
      for (let i = 0; i < 12; i++) {
        const ringMaterial = this.material(0xa88cff, { transparent: true, opacity: 0.52, depthWrite: false, emissiveIntensity: 0.9, roughness: 0.2 });
        ringMaterial.blending = this.THREE.AdditiveBlending;
        const ring = new this.THREE.Mesh(new this.THREE.TorusGeometry(4.6, 0.095, 8, 46), ringMaterial);
        ring.rotation.y = Math.PI / 2;
        ring.renderOrder = 8;
        group.add(ring);
        group.userData.rings.push(ring);
      }
      group.userData.colorMaterials = group.userData.rings.map((ring) => ring.material);
      this.root.add(group);
      return group;
    }

    createGate() {
      const group = new this.THREE.Group();
      group.name = "Gate primitive";
      group.userData.gates = [];
      for (let i = 0; i < 4; i++) {
        const gate = new this.THREE.Group();
        const frameMaterial = this.material(0x69d8ff, { emissiveIntensity: 0.7, roughness: 0.28 });
        const planeMaterial = this.material(0x69d8ff, { transparent: true, opacity: 0.09, depthWrite: false, emissiveIntensity: 0.5, side: this.THREE.DoubleSide });
        const left = new this.THREE.Mesh(new this.THREE.BoxGeometry(0.22, 5.4, 0.22), frameMaterial.clone());
        left.position.set(0, 2.5, -3.0);
        const right = left.clone();
        right.position.z = 3.0;
        const top = new this.THREE.Mesh(new this.THREE.BoxGeometry(0.22, 0.28, 6.25), frameMaterial.clone());
        top.position.set(0, 5.15, 0);
        const plane = new this.THREE.Mesh(new this.THREE.PlaneGeometry(6, 5), planeMaterial);
        plane.rotation.y = Math.PI / 2;
        plane.position.y = 2.5;
        gate.add(left, right, top, plane);
        gate.userData.plane = plane;
        gate.userData.colorMaterials = [left.material, right.material, top.material, plane.material];
        group.add(gate);
        group.userData.gates.push(gate);
      }
      group.userData.colorMaterials = group.userData.gates.flatMap((gate) => gate.userData.colorMaterials);
      this.root.add(group);
      return group;
    }

    createDrift() {
      const group = new this.THREE.Group();
      group.name = "Drift primitive";
      group.userData.cones = [];
      for (let i = 0; i < 14; i++) {
        const material = this.material(i % 2 ? 0xf4f6f1 : 0xff6b45, { emissiveIntensity: 0.22, roughness: 0.7, metalness: 0.02 });
        const cone = new this.THREE.Mesh(new this.THREE.ConeGeometry(0.32, 0.85, 10), material);
        cone.castShadow = true;
        group.add(cone);
        group.userData.cones.push(cone);
      }
      group.userData.colorMaterials = group.userData.cones.map((cone) => cone.material);
      this.root.add(group);
      return group;
    }

    createPrism() {
      const group = new this.THREE.Group();
      group.name = "Prism primitive";
      group.userData.frames = [];
      for (let i = 0; i < 7; i++) {
        const material = this.material(0x69d8ff, { transparent: true, opacity: 0.5, depthWrite: false, emissiveIntensity: 1.15, roughness: 0.12 });
        material.blending = this.THREE.AdditiveBlending;
        const frame = new this.THREE.Mesh(new this.THREE.TorusGeometry(3.9, 0.11, 8, 3), material);
        frame.renderOrder = 9;
        group.add(frame);
        group.userData.frames.push(frame);
      }
      group.userData.colorMaterials = group.userData.frames.map((frame) => frame.material);
      this.root.add(group);
      return group;
    }

    createSwarm() {
      const group = new this.THREE.Group();
      group.name = "Swarm primitive";
      group.userData.units = [];
      for (let i = 0; i < 12; i++) {
        const material = this.material(0xa88cff, { transparent: true, opacity: 0.8, emissiveIntensity: 0.85, roughness: 0.25 });
        const unit = new this.THREE.Mesh(new this.THREE.OctahedronGeometry(0.34, 0), material);
        unit.castShadow = true;
        group.add(unit);
        group.userData.units.push(unit);
      }
      const mergeMaterial = this.material(0xa88cff, { transparent: true, opacity: 0.62, depthWrite: false, emissiveIntensity: 1.1 });
      mergeMaterial.blending = this.THREE.AdditiveBlending;
      const mergeRing = new this.THREE.Mesh(new this.THREE.TorusGeometry(4.2, 0.09, 8, 42), mergeMaterial);
      mergeRing.rotation.y = Math.PI / 2;
      group.add(mergeRing);
      group.userData.mergeRing = mergeRing;
      group.userData.colorMaterials = [...group.userData.units.map((unit) => unit.material), mergeMaterial];
      this.root.add(group);
      return group;
    }

    createNight() {
      const group = new this.THREE.Group();
      group.name = "Night stage primitive";
      group.userData.pylons = [];
      const poleMaterial = this.material(0x64716a, { emissiveIntensity: 0.05, roughness: 0.38, metalness: 0.72 });
      for (let i = 0; i < 10; i++) {
        const pylon = new this.THREE.Group();
        const pole = new this.THREE.Mesh(new this.THREE.CylinderGeometry(0.07, 0.1, 6.5, 7), poleMaterial.clone());
        pole.position.y = 3.1;
        const lampMaterial = this.material(0xd8ff51, { emissiveIntensity: 2.1, roughness: 0.15 });
        const lamp = new this.THREE.Mesh(new this.THREE.BoxGeometry(0.9, 0.16, 0.34), lampMaterial);
        lamp.position.y = 6.2;
        pylon.add(pole, lamp);
        group.add(pylon);
        pylon.userData.lamp = lamp;
        group.userData.pylons.push(pylon);
      }
      group.userData.colorMaterials = group.userData.pylons.map((pylon) => pylon.userData.lamp.material);
      this.root.add(group);
      return group;
    }

    createDrag() {
      const group = new this.THREE.Group();
      group.name = "Drag strip primitive";
      group.userData.gantries = [];
      for (let i = 0; i < 5; i++) {
        const gantry = new this.THREE.Group();
        const material = this.material(0xf4f6f1, { emissiveIntensity: 0.5, roughness: 0.3 });
        const left = new this.THREE.Mesh(new this.THREE.BoxGeometry(0.18, 4.8, 0.18), material.clone());
        left.position.set(0, 2.3, -4.8);
        const right = left.clone(); right.position.z = 4.8;
        const top = new this.THREE.Mesh(new this.THREE.BoxGeometry(0.18, 0.22, 9.7), material.clone());
        top.position.y = 4.65;
        gantry.add(left, right, top);
        gantry.userData.lights = [];
        for (let lightIndex = 0; lightIndex < 3; lightIndex++) {
          const lightMat = this.material(lightIndex === 2 ? 0xd8ff51 : 0xff6b45, { emissiveIntensity: 1.8, roughness: 0.1 });
          const light = new this.THREE.Mesh(new this.THREE.SphereGeometry(0.18, 10, 8), lightMat);
          light.position.set(-0.16, 4.65, -0.52 + lightIndex * 0.52);
          gantry.add(light);
          gantry.userData.lights.push(light);
        }
        group.add(gantry);
        group.userData.gantries.push(gantry);
      }
      group.userData.colorMaterials = group.userData.gantries.flatMap((gantry) => [...gantry.children.slice(0, 3).map((child) => child.material), ...gantry.userData.lights.map((light) => light.material)]);
      this.root.add(group);
      return group;
    }

    createFuel() {
      const group = new this.THREE.Group();
      group.name = "Fuel strategy primitive";
      const frameMaterial = this.material(0xd8ff51, { emissiveIntensity: 0.75, roughness: 0.3 });
      const left = new this.THREE.Mesh(new this.THREE.BoxGeometry(0.25, 5, 0.25), frameMaterial.clone()); left.position.set(0, 2.4, -4.1);
      const right = left.clone(); right.position.z = 4.1;
      const roof = new this.THREE.Mesh(new this.THREE.BoxGeometry(0.28, 0.25, 8.4), frameMaterial.clone()); roof.position.y = 4.8;
      group.add(left, right, roof);
      group.userData.cells = [];
      for (let i = 0; i < 8; i++) {
        const material = this.material(0xd8ff51, { transparent: true, opacity: 0.72, emissiveIntensity: 1.25, roughness: 0.18 });
        const cell = new this.THREE.Mesh(new this.THREE.CylinderGeometry(0.2, 0.2, 0.75, 12), material);
        cell.rotation.z = Math.PI / 2;
        group.add(cell);
        group.userData.cells.push(cell);
      }
      group.userData.colorMaterials = [left.material, right.material, roof.material, ...group.userData.cells.map((cell) => cell.material)];
      this.root.add(group);
      return group;
    }

    createGarage() {
      const group = new this.THREE.Group();
      group.name = "Open garage primitive";
      const material = this.material(0xa88cff, { transparent: true, opacity: 0.48, emissiveIntensity: 1.0, roughness: 0.16, depthWrite: false });
      const leftDoor = new this.THREE.Mesh(new this.THREE.BoxGeometry(0.16, 5.4, 3.9), material.clone());
      leftDoor.position.set(0, 2.55, -2.15);
      const rightDoor = leftDoor.clone(); rightDoor.position.z = 2.15;
      const frame = new this.THREE.Mesh(new this.THREE.TorusGeometry(4.15, 0.11, 8, 4), material.clone());
      frame.rotation.y = Math.PI / 2;
      frame.position.y = 3;
      group.add(leftDoor, rightDoor, frame);
      group.userData.leftDoor = leftDoor;
      group.userData.rightDoor = rightDoor;
      group.userData.frame = frame;
      group.userData.colorMaterials = [leftDoor.material, rightDoor.material, frame.material];
      this.root.add(group);
      return group;
    }

    setCurve(curve) {
      this.curve = curve;
    }

    placeObject(object, t, lateral = 0, height = 0) {
      const safeT = Math.max(0.001, Math.min(0.992, t));
      const point = this.curve.getPointAt(safeT);
      const tangent = this.curve.getTangentAt(safeT).normalize();
      const side = new this.THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
      object.position.copy(point).addScaledVector(side, lateral);
      object.position.y += height;
      object.quaternion.setFromUnitVectors(new this.THREE.Vector3(1, 0, 0), tangent);
      return { point, tangent, side };
    }

    recolor(group, color) {
      const c = new this.THREE.Color(color);
      this.color.copy(c);
      (group.userData.colorMaterials || []).forEach((material, index) => {
        material.color.copy(index % 3 === 1 ? c.clone().lerp(new this.THREE.Color(0xf4f6f1), 0.22) : c);
        if (material.emissive) material.emissive.copy(c);
      });
    }

    show({ type, startT, endT, resumeFrom = 0, lane, color, difficulty = 0.8 }) {
      this.hide();
      this.activeType = type;
      this.startT = startT;
      this.endT = Math.max(startT + 0.001, endT || startT + 0.07);
      this.resumeFrom = Math.max(0, Math.min(0.95, resumeFrom));
      this.lane = lane;
      this.difficulty = Math.max(0.25, Math.min(1, difficulty));
      const primitiveName = TYPE_TO_PRIMITIVE[type] || "gate";
      const primitive = this.primitives[primitiveName];
      this.activePrimitive = primitive;
      primitive.visible = true;
      this.recolor(primitive, color);
      this.layout(primitiveName);
      return primitiveName;
    }

    layout(name) {
      const primitive = this.primitives[name];
      const span = Math.max(0.001, this.endT - this.startT);
      const at = (fraction) => this.startT + span * Math.max(0, Math.min(1, fraction));
      primitive.position.set(0, 0, 0);
      primitive.quaternion.identity();
      if (name === "ramp") {
        const launch = primitive.children[0];
        const landing = primitive.children[1];
        const leftEdge = primitive.children[2];
        const rightEdge = primitive.children[3];
        leftEdge.visible = false;
        rightEdge.visible = false;
        this.placeObject(launch, at(0.08), this.lane, 0.85);
        launch.rotateZ(0.21 + this.difficulty * 0.1);
        this.placeObject(landing, at(0.84), this.lane, 0.8);
        landing.rotateZ(-(0.2 + this.difficulty * 0.1));
      } else if (name === "tunnel") {
        const activeRings = 6 + Math.round(this.difficulty * 6);
        primitive.userData.rings.forEach((ring, index) => {
          ring.visible = index < activeRings;
          if (!ring.visible) return;
          const placement = this.placeObject(ring, at((index + 0.5) / activeRings), this.lane, 4.25);
          ring.quaternion.multiply(new this.THREE.Quaternion().setFromAxisAngle(new this.THREE.Vector3(0, 1, 0), Math.PI / 2));
          ring.userData.baseQuaternion = ring.quaternion.clone();
          ring.userData.tangent = placement.tangent.clone();
        });
      } else if (name === "gate") {
        const activeGates = 2 + Math.round(this.difficulty * 2);
        primitive.userData.gates.forEach((gate, index) => {
          gate.visible = index < activeGates;
          if (!gate.visible) return;
          gate.children[0].position.z = -3;
          gate.children[1].position.z = 3;
          gate.children[2].position.y = 5.15;
          this.placeObject(gate, at((index + 0.65) / activeGates), this.lane, 0.05);
          gate.userData.baseY = gate.position.y;
        });
      } else if (name === "drift") {
        const width = 0.82 + this.difficulty * 0.52;
        const count = primitive.userData.cones.length;
        primitive.userData.cones.forEach((cone, index) => {
          const alternating = (index % 2 ? 1 : -1) * (width + (index % 3) * 0.14);
          this.placeObject(cone, at((index + 0.5) / count), this.lane + alternating, 0.42);
          cone.userData.baseQuaternion = cone.quaternion.clone();
        });
      } else if (name === "prism") {
        const count = primitive.userData.frames.length;
        primitive.userData.frames.forEach((frame, index) => {
          frame.visible = true;
          const placement = this.placeObject(frame, at((index + 0.5) / count), this.lane, 3.9);
          frame.quaternion.multiply(new this.THREE.Quaternion().setFromAxisAngle(new this.THREE.Vector3(0, 1, 0), Math.PI / 2));
          frame.rotateZ((index % 2 ? -1 : 1) * (0.15 + index * 0.04));
          frame.userData.baseQuaternion = frame.quaternion.clone();
          frame.userData.tangent = placement.tangent.clone();
        });
      } else if (name === "swarm") {
        const count = primitive.userData.units.length;
        primitive.userData.units.forEach((unit, index) => {
          const fraction = 0.18 + (index % 4) * 0.16;
          const lateral = this.lane + (Math.floor(index / 4) - 1) * 1.35;
          this.placeObject(unit, at(fraction), lateral, 1.2 + (index % 3) * 0.34);
          unit.userData.basePosition = unit.position.clone();
        });
        this.placeObject(primitive.userData.mergeRing, at(0.88), this.lane, 3.8);
      } else if (name === "night") {
        const count = primitive.userData.pylons.length;
        primitive.userData.pylons.forEach((pylon, index) => {
          const lateral = this.lane + (index % 2 ? 1 : -1) * 7.4;
          this.placeObject(pylon, at((index + 0.5) / count), lateral, 0);
        });
      } else if (name === "drag") {
        const count = primitive.userData.gantries.length;
        primitive.userData.gantries.forEach((gantry, index) => this.placeObject(gantry, at(index / (count - 1)), 0, 0));
      } else if (name === "fuel") {
        this.placeObject(primitive, at(0.52), this.lane + 4.9, 0);
        primitive.userData.cells.forEach((cell, index) => {
          cell.position.set(-1.7 + (index % 4) * 0.55, 1.35 + Math.floor(index / 4) * 0.72, -3.7);
          cell.userData.basePosition = cell.position.clone();
        });
      } else if (name === "garage") {
        this.placeObject(primitive, at(0.58), this.lane, 0);
        primitive.userData.leftDoor.position.set(0, 2.55, -2.15);
        primitive.userData.rightDoor.position.set(0, 2.55, 2.15);
      }
    }

    update(progress, elapsed) {
      if (!this.activePrimitive) return;
      this.elapsed = elapsed;
      const pulse = 0.72 + Math.sin(elapsed * 6.2) * 0.22;
      if (this.activePrimitive === this.primitives.tunnel) {
        const visibleRings = this.activePrimitive.userData.rings.filter((ring) => ring.visible);
        const recallIndex = Math.min(visibleRings.length - 1, Math.floor(progress * visibleRings.length));
        this.activePrimitive.userData.rings.forEach((ring, index) => {
          if (!ring.visible) return;
          const isBeacon = index === recallIndex;
          ring.material.opacity = isBeacon ? 0.94 : 0.22 + pulse * 0.3;
          ring.material.emissiveIntensity = isBeacon ? 1.8 : 0.65;
          const spin = new this.THREE.Quaternion().setFromAxisAngle(ring.userData.tangent, elapsed * 0.45 + index * 0.08);
          ring.quaternion.copy(ring.userData.baseQuaternion).premultiply(spin);
          const scale = (isBeacon ? 1.08 : 0.9) + Math.sin(progress * Math.PI + index * 0.42) * 0.08;
          ring.scale.setScalar(scale);
        });
      } else if (this.activePrimitive === this.primitives.gate) {
        const visibleGates = this.activePrimitive.userData.gates.filter((gate) => gate.visible);
        this.activePrimitive.userData.gates.forEach((gate, index) => {
          if (!gate.visible) return;
          const gateProgress = Math.max(0, Math.min(1, progress * visibleGates.length - index));
          const eased = gateProgress * gateProgress * (3 - 2 * gateProgress);
          gate.children[0].position.z = -3 - eased * 1.7;
          gate.children[1].position.z = 3 + eased * 1.7;
          gate.children[2].position.y = 5.15 + eased * 0.75;
          gate.userData.plane.material.opacity = (1 - eased) * (0.05 + Math.max(0, Math.sin(elapsed * 5 - index)) * 0.18);
          gate.position.y = gate.userData.baseY + Math.sin(elapsed * 3 + index) * 0.035;
        });
      } else if (this.activePrimitive === this.primitives.ramp) {
        this.activePrimitive.userData.colorMaterials.forEach((material) => { material.emissiveIntensity = 0.2 + pulse * 0.35; });
      } else if (this.activePrimitive === this.primitives.drift) {
        const courseIndex = Math.min(this.activePrimitive.userData.cones.length - 1, Math.floor(progress * this.activePrimitive.userData.cones.length));
        this.activePrimitive.userData.cones.forEach((cone, index) => {
          const spin = new this.THREE.Quaternion().setFromAxisAngle(new this.THREE.Vector3(0, 1, 0), elapsed * 0.35 + index * 0.15);
          cone.quaternion.copy(cone.userData.baseQuaternion).premultiply(spin);
          const nearCar = Math.abs(index - courseIndex) <= 1;
          cone.material.emissiveIntensity = nearCar ? 0.95 : 0.08 + pulse * 0.2;
          cone.scale.setScalar(nearCar ? 1.18 : 1);
        });
      } else if (this.activePrimitive === this.primitives.prism) {
        const activeIndex = Math.min(this.activePrimitive.userData.frames.length - 1, Math.floor(progress * this.activePrimitive.userData.frames.length));
        this.activePrimitive.userData.frames.forEach((frame, index) => {
          const spin = new this.THREE.Quaternion().setFromAxisAngle(frame.userData.tangent, elapsed * 0.7 + index * 0.31);
          frame.quaternion.copy(frame.userData.baseQuaternion).premultiply(spin);
          frame.material.opacity = index === activeIndex ? 0.92 : 0.28 + pulse * 0.2;
          frame.material.emissiveIntensity = index === activeIndex ? 2.0 : 0.9;
        });
      } else if (this.activePrimitive === this.primitives.swarm) {
        const split = Math.sin(Math.PI * Math.min(1, progress * 1.25));
        this.activePrimitive.userData.units.forEach((unit, index) => {
          const angle = elapsed * 2.4 + index * Math.PI * 2 / this.activePrimitive.userData.units.length;
          unit.position.copy(unit.userData.basePosition);
          unit.position.y += Math.sin(angle * 1.7) * 0.35 * split;
          unit.position.x += Math.cos(angle) * 0.5 * split;
          unit.position.z += Math.sin(angle) * 0.5 * split;
          unit.rotation.x += 0.06;
          unit.rotation.y += 0.09;
        });
        this.activePrimitive.userData.mergeRing.material.opacity = progress > 0.62 ? 0.85 : 0.2;
        this.activePrimitive.userData.mergeRing.rotation.z = elapsed * 1.8;
      } else if (this.activePrimitive === this.primitives.night) {
        this.activePrimitive.userData.pylons.forEach((pylon, index) => {
          const on = progress > index / this.activePrimitive.userData.pylons.length * 0.75;
          pylon.userData.lamp.material.emissiveIntensity = on ? 2.4 + pulse : 0.1;
        });
      } else if (this.activePrimitive === this.primitives.drag) {
        const activeGantry = Math.min(this.activePrimitive.userData.gantries.length - 1, Math.floor(progress * this.activePrimitive.userData.gantries.length));
        this.activePrimitive.userData.gantries.forEach((gantry, index) => {
          gantry.userData.lights.forEach((light, lightIndex) => {
            const activeLight = index === activeGantry && lightIndex === Math.min(2, Math.floor(progress * 8) % 3);
            light.material.emissiveIntensity = activeLight ? 3.2 : 0.35;
            light.scale.setScalar(activeLight ? 1.35 : 1);
          });
        });
      } else if (this.activePrimitive === this.primitives.fuel) {
        this.activePrimitive.userData.cells.forEach((cell, index) => {
          cell.position.copy(cell.userData.basePosition);
          const loadProgress = Math.max(0, Math.min(1, progress * 2 - index * 0.08));
          cell.position.z += loadProgress * 3.25;
          cell.position.y += Math.sin(elapsed * 3 + index) * 0.08;
          cell.material.opacity = 0.35 + loadProgress * 0.6;
        });
      } else if (this.activePrimitive === this.primitives.garage) {
        const open = progress * progress * (3 - 2 * progress);
        this.activePrimitive.userData.leftDoor.position.z = -2.15 - open * 3.5;
        this.activePrimitive.userData.rightDoor.position.z = 2.15 + open * 3.5;
        this.activePrimitive.userData.frame.rotation.z = elapsed * 0.55;
        this.activePrimitive.userData.frame.material.opacity = 0.4 + pulse * 0.35;
      }
    }

    samplePath(type, progress) {
      const p = Math.max(0, Math.min(1, progress));
      const smooth = p * p * (3 - 2 * p);
      const arc = Math.sin(Math.PI * p);
      const result = { height: 0, lateral: 0, pitch: 0, roll: 0, yaw: 0 };
      if (type === "logic-leap") {
        result.height = arc * (2.9 + this.difficulty * 1.8);
        result.pitch = -Math.sin(Math.PI * 2 * p) * (0.2 + this.difficulty * 0.1);
      } else if (type === "code-drift") {
        result.lateral = Math.sin(Math.PI * 2 * p) * arc * (1.05 + this.difficulty * 0.95);
        result.yaw = Math.sin(Math.PI * 2 * p) * (0.38 + this.difficulty * 0.2);
        result.roll = -Math.sin(Math.PI * 2 * p) * (0.07 + this.difficulty * 0.06);
      } else if (type === "prism-roll") {
        result.height = arc * (1.25 + this.difficulty * 0.75);
        result.roll = Math.PI * 2 * smooth;
      } else if (type === "tool-swarm") {
        result.height = arc * (0.35 + this.difficulty * 0.3);
      } else if (type === "memory-helix") {
        result.height = arc * (1.55 + this.difficulty * 1.0);
        result.lateral = Math.sin(Math.PI * 4 * p) * arc * (0.45 + this.difficulty * 0.38);
        result.roll = Math.PI * 2 * smooth;
      } else if (type === "open-gate") {
        result.height = arc * 0.35;
      } else if (type === "agent-swarm") {
        result.height = arc * (0.35 + this.difficulty * 0.35);
        result.lateral = Math.sin(Math.PI * 2 * p) * arc * 0.3;
      } else if (type === "endurance-night") {
        result.roll = Math.sin(Math.PI * 6 * p) * 0.035;
      } else if (type === "drag-strip") {
        result.pitch = -Math.sin(Math.PI * p) * 0.055;
      } else if (type === "fuel-strategy") {
        result.lateral = Math.sin(Math.PI * p) * (3.2 + this.difficulty * 1.4);
        result.roll = -Math.sin(Math.PI * p) * 0.07;
      }
      return result;
    }

    hide() {
      Object.values(this.primitives).forEach((primitive) => { primitive.visible = false; });
      this.activePrimitive = null;
      this.activeType = null;
    }

    dispose() {
      this.root.traverse((node) => {
        if (node.geometry) node.geometry.dispose();
        if (node.material) {
          const materials = Array.isArray(node.material) ? node.material : [node.material];
          materials.forEach((material) => material.dispose());
        }
      });
      this.root.removeFromParent();
    }
  }

  window.MGPStuntFramework = { StuntFramework, TYPE_TO_PRIMITIVE };
})();
