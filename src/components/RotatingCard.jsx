import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { RoundedBoxGeometry } from "three-stdlib";
import * as THREE from "three";
import { useSpring, a } from "@react-spring/three";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RotatingProfileCard = () => {
  const profileTexture = useLoader(TextureLoader, '/profile/fulldp.png');
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const roundedBoxGeometry = useMemo(() => {
    return new RoundedBoxGeometry(4, 6, 0.1, 25, 0.5);
  }, []);
  const imageGeometry = useMemo(() => {
    return new THREE.PlaneGeometry(5.3, 6);
  }, []);

  // Debug texture loading
  useEffect(() => {
    if (profileTexture) {
      console.log("Profile texture loaded successfully");
    } else {
      console.error("Profile texture failed to load");
    }
  }, [profileTexture]);

  // Dynamic rotation: speedup when front image moves out, slowdown when visible
  useFrame((_, delta) => {
    if (groupRef.current) {
      const angle = groupRef.current.rotation.y % (2 * Math.PI);
      const normalizedAngle = angle < 0 ? angle + 2 * Math.PI : angle;
      const fastSpeed = delta * 2.0;
      const slowSpeed = delta * 0.1;
      const speed =
        (normalizedAngle >= 0 && normalizedAngle < (2 * Math.PI) / 3) ||
        (normalizedAngle >= (4 * Math.PI) / 3 && normalizedAngle < 2 * Math.PI)
          ? fastSpeed
          : slowSpeed;
      groupRef.current.rotation.y += speed;
    }
  });

  // Hover animation
  const spring = useSpring({
    scale: hovered ? 1.05 : 1,
    positionY: hovered ? 0.2 : 0,
    emissiveIntensity: hovered ? 2 : 1,
    config: { mass: 1, tension: 180, friction: 12 },
  });

  return (
    <a.group
      ref={groupRef}
      scale={spring.scale}
      position-y={spring.positionY}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Original Card Mesh */}
      <mesh position={[0, 0, 0]}>
        <bufferGeometry attach="geometry" {...roundedBoxGeometry} />
        <a.meshStandardMaterial
          map={profileTexture}
          color="#007f7f"
          emissive="#00ffff"
          emissiveIntensity={spring.emissiveIntensity}
          metalness={0.9}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Front Image Mesh Overlay */}
      <mesh position={[0, 0, 0.06]}>
        <bufferGeometry attach="geometry" {...imageGeometry} />
        <meshBasicMaterial
          map={profileTexture}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Back Image Mesh Overlay */}
      <mesh position={[0, 0, -0.06]} rotation={[0, Math.PI, 0]}>
        <bufferGeometry attach="geometry" {...imageGeometry} />
        <meshBasicMaterial
          map={profileTexture}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </a.group>
  );
};

const RotatingCard = ({ isMobile }) => {
  return (
    <Link to='/tech'>
      <div className={`${isMobile ? 'w-auto' : 'w-[400px]'}  h-[560px] overflow-hidden`}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, preserveDrawingBuffer: true }}
          style={{ overflow: 'visible' }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <RotatingProfileCard />
        </Canvas>
      </div>
    </Link>
    
  );
};

export default RotatingCard;