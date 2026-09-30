import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Square-grid shader: draws thin lines along UV, no diagonals.
const fragmentShader = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform vec2 uCells;
  uniform float uLineWidth;
  uniform vec3 uColor;
  uniform float uOpacity;

  void main() {
    vec2 grid = fract(vUv * uCells);
    vec2 d = min(grid, 1.0 - grid);
    float line = min(d.x, d.y);
    float aa = fwidth(line);
    float alpha = 1.0 - smoothstep(uLineWidth, uLineWidth + aa, line);
    if (alpha <= 0.001) discard;
    gl_FragColor = vec4(uColor, alpha * uOpacity);
  }
`;

function WaveMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uCells: { value: new THREE.Vector2(80, 100) },
      uLineWidth: { value: 0.02 },
      uColor: { value: new THREE.Color("#ffffff") },
      uOpacity: { value: 0.35 },
    }),
    []
  );

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const geom = mesh.geometry as THREE.PlaneGeometry;
    const pos = geom.attributes.position as THREE.BufferAttribute;
    const t = clock.getElapsedTime();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z =
        Math.sin(x * 1.2 + t) * 0.15 +
        Math.cos(y * 1.5 + t * 0.8) * 0.15 +
        Math.sin((x + y) * 0.5 - t) * 0.2 +
        Math.cos(x * 0.4 - t * 0.6) * 0.1;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
      <planeGeometry args={[30, 40, 80, 100]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function WaveGrid() {
  return (
    <Canvas camera={{ position: [0, 1.33, 5], fov: 45 }} dpr={[1, 2]}>
      <WaveMesh />
    </Canvas>
  );
}
