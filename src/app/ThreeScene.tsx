"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneInitialized = useRef(false);

  useEffect(() => {
    if (!mountRef.current || sceneInitialized.current) return;
    sceneInitialized.current = true;

    const width = mountRef.current.clientWidth;
    const height = 400;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // transparent
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Main enclosing circle (background for the eye)
const circleGeom = new THREE.CircleGeometry(2.4, 64);
// Glowing circle with strong neon effect
const circleMat = new THREE.MeshBasicMaterial({ color: 0x1de9e6, transparent: true, opacity: 0.18 });
const circleMesh = new THREE.Mesh(circleGeom, circleMat);
circleMesh.position.z = 0.05;
scene.add(circleMesh);
// Extra glow using a larger, blurrier circle
const glowGeom = new THREE.CircleGeometry(2.9, 64);
const glowMat = new THREE.MeshBasicMaterial({ color: 0x5ef0ff, transparent: true, opacity: 0.10 });
const glowMesh = new THREE.Mesh(glowGeom, glowMat);
glowMesh.position.z = 0.01;
scene.add(glowMesh);

// Eye group
const eyeGroup = new THREE.Group();
// Top arc (upper eyelid)
const topArcShape = new THREE.Shape();
topArcShape.moveTo(-1.5, 0);
topArcShape.quadraticCurveTo(0, 1.1, 1.5, 0);
const topArcGeom = new THREE.BufferGeometry().setFromPoints(topArcShape.getPoints(50));
const topArcMat = new THREE.LineBasicMaterial({ color: 0x1de9e6, linewidth: 4 });
const topArc = new THREE.Line(topArcGeom, topArcMat);
eyeGroup.add(topArc);
// Bottom arc (lower eyelid)
const botArcShape = new THREE.Shape();
botArcShape.moveTo(-1.5, 0);
botArcShape.quadraticCurveTo(0, -1.1, 1.5, 0);
const botArcGeom = new THREE.BufferGeometry().setFromPoints(botArcShape.getPoints(50));
const botArcMat = new THREE.LineBasicMaterial({ color: 0x1de9e6, linewidth: 4 });
const botArc = new THREE.Line(botArcGeom, botArcMat);
eyeGroup.add(botArc);
// Iris (filled circle)
const irisGeom = new THREE.CircleGeometry(0.5, 32);
const irisMat = new THREE.MeshBasicMaterial({ color: 0x1de9e6 });
const irisMesh = new THREE.Mesh(irisGeom, irisMat);
irisMesh.position.z = 0.1;
irisMesh.name = "iris";
eyeGroup.add(irisMesh);
// Pupil (smaller dark circle)
const pupilGeom = new THREE.CircleGeometry(0.18, 32);
const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0a192f });
const pupilMesh = new THREE.Mesh(pupilGeom, pupilMat);
pupilMesh.position.z = 0.2;
eyeGroup.add(pupilMesh);
scene.add(eyeGroup);

    // Glowing Rings
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x1de9e6, transparent: true, opacity: 0.25 });
    const outerRingGeom = new THREE.RingGeometry(2.6, 3, 128);
    const outerRing = new THREE.Mesh(outerRingGeom, ringMaterial.clone());
    outerRing.position.z = 0;
    scene.add(outerRing);

    const midRingGeom = new THREE.RingGeometry(2.1, 2.35, 128);
    const midRing = new THREE.Mesh(midRingGeom, ringMaterial.clone());
    midRing.position.z = 0;
    scene.add(midRing);

    // Side glowing dots
    const dotGeom = new THREE.CircleGeometry(0.22, 32);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x1de9e6, transparent: true, opacity: 0.5 });
    const leftDot = new THREE.Mesh(dotGeom, dotMat);
    leftDot.position.set(-3.5, 1.3, 0);
    scene.add(leftDot);
    const rightDot = new THREE.Mesh(dotGeom, dotMat);
    rightDot.position.set(3.2, -1.1, 0);
    scene.add(rightDot);

    // Animation: slow rotation and pulsing glow
    let t = 0;
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      t += 0.02;
      // Animate glow: pulse scale and opacity
      const glowPulse = 1 + 0.07 * Math.sin(t * 1.1);
      glowMesh.scale.set(glowPulse, glowPulse, 1);
      glowMat.opacity = 0.12 + 0.10 * Math.abs(Math.cos(t * 1.1));
      // Animate iris: subtle scanning
      const iris = eyeGroup.getObjectByName("iris") as THREE.Mesh | undefined;
      if (iris) {
        iris.position.x = 0.08 * Math.sin(t * 0.8);
        iris.position.y = 0.08 * Math.cos(t * 0.9);
      }
      // Animate rings as before
      outerRing.scale.set(1 + 0.04 * Math.sin(t), 1 + 0.04 * Math.sin(t), 1);
      midRing.scale.set(1 + 0.02 * Math.cos(t), 1 + 0.02 * Math.cos(t), 1);
      eyeGroup.rotation.z = 0.04 * Math.sin(t / 2);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      sceneInitialized.current = false;
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center" style={{ minHeight: 400 }}>
      <div ref={mountRef} style={{ width: 380, height: 380 }} />
    </div>
  );
}

