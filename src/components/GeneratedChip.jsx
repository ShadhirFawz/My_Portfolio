import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { useSpring, a } from "@react-spring/three";
import ChipPathLine from "./ChipPathLine";
import * as THREE  from 'three'
import { RoundedBoxGeometry } from 'three-stdlib';
import { TextureLoader } from 'three';
import PathSparkle from "./PathSparkle";
import { generateGridPaths } from "../services/cron/generateGridPaths";

const Pin = ({ position, rotation }) => (
  <mesh position={position} rotation={rotation}>
    <boxGeometry args={[0.05, 0.05, 0.3]} />
    <meshStandardMaterial color="#ffd700" emissive="#ffaa00" emissiveIntensity={0.3} />
  </mesh>
);

const GeneratedChip = () => {
  const svgData = useLoader(SVGLoader, '/textures/amd-ryzen.svg');
  const profileTexture = useLoader(TextureLoader, '/profile/fulldp.png');
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const handleChipClick = () => setCardVisible(prev => !prev);

  const roundedBoxGeometry = useMemo(() => {
    return new RoundedBoxGeometry(4, 5, 0.1, 25, 0.3); // Increased segments to 16, radius to 0.3
  }, []);

  // Convert SVG paths into shapes
  // NEW: Proper SVG processing with true centering
  const { shapes, centerOffset, scale } = useMemo(() => {
    if (!svgData || !svgData.paths) return { shapes: [], centerOffset: new THREE.Vector2(0, 0), scale: 1 };

    // 1. Convert SVG paths to shapes
    const shapes = svgData.paths.flatMap(path => path.toShapes(true));
    
    // 2. Collect all points from all shapes
    const allPoints = [];
    shapes.forEach(shape => {
      shape.getPoints().forEach(point => {
        allPoints.push(new THREE.Vector2(point.x, point.y));
      });
    });

    // 3. Calculate bounding box
    const xVals = allPoints.map(p => p.x);
    const yVals = allPoints.map(p => p.y);
    const minX = Math.min(...xVals);
    const maxX = Math.max(...xVals);
    const minY = Math.min(...yVals);
    const maxY = Math.max(...yVals);
    
    // 4. Calculate center offset and scale
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const width = maxX - minX;
    const height = maxY - minY;
    
    // Scale to fit within chip dimensions (2.2 units wide)
    const targetSize = 1.8; // Leave margin
    const scale = targetSize / Math.max(width, height);
    
    return {
      shapes,
      centerOffset: new THREE.Vector2(-centerX, -centerY),
      scale
    };
  }, [svgData]);

  // Extrude settings
  const extrudeSettings = {
    depth: 0.4,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02
  };


  // Smooth idle rotation
  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.1;
  });

  // Hover animation
  const spring = useSpring({
    scale: hovered ? 1.03 : 1, // Reduced scale factor
    positionY: hovered ? 0.1 : 0, // Reduced hover lift
    emissiveIntensity: hovered ? 1.5 : 1,
    config: { mass: 1, tension: 180, friction: 12 },
  });

  const pins = [];
  const pinCount = 10;
  const spacing = 0.35;
  const offset = (pinCount - 1) * spacing / 2;
  const paths = generateGridPaths([0, 0, 0], 3, 1.2);

  for (let i = 0; i < pinCount; i++) {
    pins.push(<Pin key={`t-${i}`} position={[-offset + i * spacing, -0.25, -1.15]} />);
    pins.push(<Pin key={`b-${i}`} position={[-offset + i * spacing, -0.25, 1.15]} />);
    pins.push(<Pin key={`l-${i}`} position={[-1.15, -0.25, -offset + i * spacing]} rotation={[0, Math.PI / 2, 0]} />);
    pins.push(<Pin key={`r-${i}`} position={[1.15, -0.25, -offset + i * spacing]} rotation={[0, Math.PI / 2, 0]} />);
  }

  return (
    <a.group
      ref={groupRef}
      scale={spring.scale}
      position-y={spring.positionY}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleChipClick}
    >
      {/* Base chip */}
      <mesh>
        <boxGeometry args={[2.2, 0.4, 2.2]} />
        <meshStandardMaterial color="#111" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* NEW: Embossed square platform below logo */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.6, 0.05, 1.6]} />
        <meshStandardMaterial 
          color="#255362" 
          metalness={0.9}
          roughness={0.2}
          emissive="#333333"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Glowing core */}
      <mesh>
        <boxGeometry args={[1.2, 0.01, 1.2]} />
        <a.meshStandardMaterial
          color="#0ff"
          emissive="#00ffff"
          emissiveIntensity={spring.emissiveIntensity}
        />
      </mesh>

      {/* Pins */}
      {pins}

      <ChipPathLine points={[[0, 0, 0], [1, 0, 1], [2, 0.1, 1.5]]} />
      <PathSparkle points={[[0, 0, 0], [1, 0, 1], [2, 0.1, 1.5]]} active={cardVisible} />

      {paths.map((pts, idx) => (
        <React.Fragment key={idx}>
          <ChipPathLine points={pts} />
          <PathSparkle points={pts} speed={0.2 + Math.random() * 0.5} active={cardVisible} />
        </React.Fragment>
      ))}

      {cardVisible && (
        <mesh position={[0, 3, 0]}>
          <bufferGeometry attach="geometry" {...roundedBoxGeometry} />
          <meshBasicMaterial
            map={profileTexture} // Apply profile image texture
            color="#00ffff" // Base color
            side={THREE.DoubleSide} // Render both sides
          />
        </mesh>
      )}

      <group
        position={[0, 0.31, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[-scale * 0.8, scale * 0.8, 0.1]}
      >
        {shapes.map((shape, i) => (
          <group key={i} position={[centerOffset.x, centerOffset.y, 0]}>
            <mesh>
              <extrudeGeometry args={[shape, extrudeSettings]} />
              <meshStandardMaterial
                color="#4f7d8c"
                metalness={0.6}
                roughness={0.4}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}
      </group>
    </a.group>
  );
};

export default GeneratedChip;
