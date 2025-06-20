import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import GeneratedChip from "../components/GeneratedChip";

const ChipScene = () => {
  return (
    <div style={{ width: "50vw", height: "70vh", overflow: "visible" }} className=" overflow-visible mt-auto">
      <Canvas 
        camera={{ position: [0, 8, 8], fov: 50 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        <fog attach="fog" args={["#0f172a", 5, 15]} />

        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 5, 3]} intensity={1.2} />

        {/* Scene lighting environment (optional HDR) */}
        <Environment preset="city" />

        {/* 3D Chip */}
        <GeneratedChip />

        {/* Glow Effects */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={0.03} />
        </EffectComposer>

        {/* Mouse drag controls */}
        <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.2} />
      </Canvas>
    </div>
  );
};

export default ChipScene;
