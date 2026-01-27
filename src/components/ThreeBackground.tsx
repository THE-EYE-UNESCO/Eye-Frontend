"use client";

import * as React from "react";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// Added comment to trigger IDE type refresh
import * as THREE from "three";
import { useTheme } from "next-themes";

function Particles(props: any) {
  const ref = useRef<THREE.Points>(null!);
  const { theme } = useTheme();
  
  // Generate random points in a sphere
  const [positions, setPositions] = React.useState(() => {
    const count = 2000; // Number of particles
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Random distribution in spherical volume
        const r = 40 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta); // x
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); // y
        positions[i * 3 + 2] = r * Math.cos(phi); // z
    }
    return positions;
  });

  useFrame((state: any, delta: number) => {
    if (ref.current) {
        ref.current.rotation.x -= delta / 30; // Slow rotation
        ref.current.rotation.y -= delta / 45;
    }
  });

  const particleColor = theme === "light" ? "#0d9488" : "#1de9e6";
  const particleOpacity = theme === "light" ? 0.3 : 0.6;

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color={particleColor}
          size={0.07}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={particleOpacity}
        />
      </Points>
    </group>
  );
}

export default function ThreeBackground() {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40">
        {/* Set z-index to -1 to be behind everything */}
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Particles />
      </Canvas>
    </div>
  );
}
