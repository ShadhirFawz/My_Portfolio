import React, { useRef } from "react";
import { CatmullRomCurve3, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

const PathSparkle = ({ points, speed = 0.4, size = 0.04, color = "#00ffff", active = false }) => {
  const sparkleRef = useRef();
  const curve = new CatmullRomCurve3(points.map(p => new Vector3(...p)));

  useFrame((state) => {
    if (active && sparkleRef.current) {
      const time = state.clock.getElapsedTime() * speed % 1;
      const position = curve.getPointAt(time);
      sparkleRef.current.position.set(position.x, position.y, position.z);
    }
  });

  return active ? (
    <mesh ref={sparkleRef}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial emissive={color} emissiveIntensity={2} color={color} />
    </mesh>
  ) : null;
};

export default PathSparkle;
