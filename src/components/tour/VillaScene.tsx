"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  Html,
  RoundedBox,
  useTexture,
  MeshReflectorMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import type { TourHotspot } from "@/lib/tour";

type HotspotProps = {
  hotspot: TourHotspot;
  active: boolean;
  onSelect: (id: string) => void;
  isMobile?: boolean;
};

function HotspotMarker({
  hotspot,
  active,
  onSelect,
  isMobile = false,
}: HotspotProps) {
  const ring = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (!ring.current) return;
    ring.current.rotation.z += dt * (isMobile ? 0.55 : 0.85);
  });

  const visualR = isMobile ? 0.14 : 0.1;
  const hitR = isMobile ? 0.42 : 0.18;
  const ringR = isMobile ? 0.28 : 0.2;

  return (
    <group position={hotspot.position}>
      <Float
        speed={isMobile ? 1.4 : 2}
        rotationIntensity={0.12}
        floatIntensity={isMobile ? 0.18 : 0.3}
      >
        {/* Invisible larger hit target for touch */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelect(hotspot.id);
          }}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
          }}
        >
          <sphereGeometry args={[hitR, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        <mesh raycast={() => null}>
          <sphereGeometry args={[visualR, isMobile ? 18 : 28, isMobile ? 18 : 28]} />
          <meshStandardMaterial
            color={active ? "#9ae84a" : "#2a929b"}
            emissive={active ? "#7ed321" : "#2a7a9b"}
            emissiveIntensity={active ? 1.5 : 0.9}
            roughness={0.22}
            metalness={0.4}
          />
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]} raycast={() => null}>
          <torusGeometry args={[ringR, isMobile ? 0.016 : 0.012, 10, isMobile ? 40 : 56]} />
          <meshBasicMaterial
            color={active ? "#9ae84a" : "#7ed321"}
            transparent
            opacity={active ? 0.95 : 0.55}
          />
        </mesh>
      </Float>
      <Html
        center
        distanceFactor={isMobile ? 11 : 9}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div
          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide shadow-lg backdrop-blur-md ${
            active
              ? "bg-[var(--lime)] text-[var(--navy)]"
              : "bg-black/55 text-white"
          }`}
        >
          {hotspot.title}
        </div>
      </Html>
    </group>
  );
}

function useTiledMaps(
  paths: [string, string, string],
  repeat: [number, number],
) {
  const [map, normalMap, roughnessMap] = useTexture(paths);
  useMemo(() => {
    for (const t of [map, normalMap, roughnessMap]) {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(repeat[0], repeat[1]);
      t.colorSpace = THREE.SRGBColorSpace;
    }
    normalMap.colorSpace = THREE.NoColorSpace;
    roughnessMap.colorSpace = THREE.NoColorSpace;
  }, [map, normalMap, roughnessMap, repeat]);
  return { map, normalMap, roughnessMap };
}

function LuxuryVilla() {
  const wood = useTiledMaps(
    [
      "/tour/tex/wood_color.jpg",
      "/tour/tex/wood_normal.jpg",
      "/tour/tex/wood_rough.jpg",
    ],
    [4.5, 4.5],
  );
  const plaster = useTiledMaps(
    [
      "/tour/tex/plaster_color.jpg",
      "/tour/tex/plaster_normal.jpg",
      "/tour/tex/plaster_rough.jpg",
    ],
    [3.2, 2.2],
  );
  const stone = useTiledMaps(
    [
      "/tour/tex/stone_color.jpg",
      "/tour/tex/stone_normal.jpg",
      "/tour/tex/stone_rough.jpg",
    ],
    [2.4, 2.4],
  );
  const deckMap = useTexture("/tour/tex/deck_color.jpg");
  useMemo(() => {
    deckMap.wrapS = deckMap.wrapT = THREE.RepeatWrapping;
    deckMap.repeat.set(6, 6);
    deckMap.colorSpace = THREE.SRGBColorSpace;
  }, [deckMap]);

  return (
    <group>
      {/* —— Ground / landscape —— */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1, -0.02, 4]} receiveShadow>
        <planeGeometry args={[36, 36]} />
        <meshStandardMaterial color="#3f5c45" roughness={0.95} />
      </mesh>

      {/* Exterior stone patio */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.8, 0.01, 9.2]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial
          map={stone.map}
          normalMap={stone.normalMap}
          roughnessMap={stone.roughnessMap}
          roughness={0.85}
        />
      </mesh>

      {/* Pool basin */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.8, 0.04, 11.6]} receiveShadow>
        <planeGeometry args={[7.2, 4.2]} />
        <meshStandardMaterial color="#0c3a4a" roughness={0.35} metalness={0.1} />
      </mesh>
      {/* Pool water */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.8, 0.12, 11.6]}>
        <planeGeometry args={[6.8, 3.8]} />
        <meshPhysicalMaterial
          color="#3db8d0"
          transmission={0.55}
          thickness={0.6}
          roughness={0.08}
          metalness={0.05}
          transparent
          opacity={0.85}
          ior={1.33}
        />
      </mesh>
      {/* Pool rim */}
      <RoundedBox args={[7.4, 0.12, 4.4]} radius={0.04} position={[0.8, 0.08, 11.6]}>
        <meshStandardMaterial
          map={stone.map}
          normalMap={stone.normalMap}
          roughness={0.7}
        />
      </RoundedBox>

      {/* Outdoor lounge */}
      <RoundedBox args={[2.4, 0.45, 1.1]} radius={0.08} position={[-2.6, 0.35, 8.6]} castShadow>
        <meshStandardMaterial color="#d9d3c8" roughness={0.85} />
      </RoundedBox>
      <RoundedBox args={[0.7, 0.08, 0.7]} radius={0.04} position={[-2.6, 0.42, 9.6]}>
        <meshStandardMaterial color="#8a7358" roughness={0.5} />
      </RoundedBox>

      {/* —— Interior floor (reflective wood) —— */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.8, 0.02, 1.2]} receiveShadow>
        <planeGeometry args={[13.5, 11]} />
        <MeshReflectorMaterial
          blur={[300, 80]}
          resolution={512}
          mixBlur={0.85}
          mixStrength={0.35}
          roughness={0.55}
          depthScale={0.6}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#c4a882"
          metalness={0.08}
          mirror={0.15}
        />
      </mesh>
      {/* Wood overlay detail strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.8, 0.025, 1.2]}>
        <planeGeometry args={[13.4, 10.9]} />
        <meshStandardMaterial
          map={wood.map}
          normalMap={wood.normalMap}
          roughnessMap={wood.roughnessMap}
          transparent
          opacity={0.92}
          roughness={0.55}
        />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0.8, 3.35, 1.2]}>
        <planeGeometry args={[13.5, 11]} />
        <meshStandardMaterial
          map={plaster.map}
          normalMap={plaster.normalMap}
          roughnessMap={plaster.roughnessMap}
          color="#f7f5f1"
          roughness={0.9}
        />
      </mesh>

      {/* Recessed ceiling lights */}
      {[
        [-2.2, 0.2],
        [0.8, 0.2],
        [3.8, 0.2],
        [-2.2, 2.6],
        [0.8, 2.6],
        [3.8, 2.6],
        [-2.2, 4.8],
        [3.8, 4.8],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 3.3, z]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.09, 24]} />
            <meshStandardMaterial
              color="#fff8e8"
              emissive="#ffe6b0"
              emissiveIntensity={2.2}
            />
          </mesh>
          <pointLight
            intensity={4.5}
            distance={5.5}
            decay={2}
            color="#fff1d6"
            castShadow={i < 3}
          />
        </group>
      ))}

      {/* Recessed speakers */}
      {[
        [-1.5, -1.4],
        [2.8, -1.4],
        [0.6, 2.1],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 3.28, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.04, 32]} />
          <meshStandardMaterial color="#e6e8ec" roughness={0.45} metalness={0.15} />
        </mesh>
      ))}

      {/* Back media wall */}
      <RoundedBox
        args={[10.5, 3.35, 0.28]}
        radius={0.02}
        position={[0.3, 1.67, -3.9]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#151c26" roughness={0.55} />
      </RoundedBox>

      {/* TV */}
      <RoundedBox args={[3.1, 1.75, 0.08]} radius={0.03} position={[0.3, 1.85, -3.72]}>
        <meshStandardMaterial
          color="#070b10"
          metalness={0.7}
          roughness={0.18}
        />
      </RoundedBox>
      <mesh position={[0.3, 1.85, -3.67]}>
        <planeGeometry args={[2.85, 1.55]} />
        <meshStandardMaterial
          color="#163247"
          emissive="#1f6f88"
          emissiveIntensity={0.45}
        />
      </mesh>

      {/* Fireplace slot */}
      <RoundedBox args={[2.6, 0.2, 0.14]} radius={0.02} position={[0.3, 0.55, -3.72]}>
        <meshStandardMaterial
          color="#0a0f16"
          emissive="#7ed321"
          emissiveIntensity={0.55}
        />
      </RoundedBox>

      {/* Left plaster wall + stone entrance cladding */}
      <RoundedBox
        args={[0.28, 3.35, 8.2]}
        radius={0.02}
        position={[-5.7, 1.67, 0.6]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={plaster.map}
          normalMap={plaster.normalMap}
          roughnessMap={plaster.roughnessMap}
          color="#f2efe9"
        />
      </RoundedBox>
      <RoundedBox
        args={[0.22, 2.7, 2.1]}
        radius={0.02}
        position={[-5.45, 1.4, 0.55]}
        castShadow
      >
        <meshStandardMaterial
          map={stone.map}
          normalMap={stone.normalMap}
          roughnessMap={stone.roughnessMap}
          roughness={0.9}
        />
      </RoundedBox>

      {/* Glass intercom */}
      <RoundedBox args={[0.06, 0.48, 0.3]} radius={0.012} position={[-5.3, 1.45, 0.55]}>
        <meshPhysicalMaterial
          color="#0b1220"
          metalness={0.85}
          roughness={0.12}
          clearcoat={1}
          emissive="#2a929b"
          emissiveIntensity={0.55}
        />
      </RoundedBox>

      {/* Right wall + rack niche */}
      <RoundedBox
        args={[0.28, 3.35, 7.2]}
        radius={0.02}
        position={[7.5, 1.67, 1.2]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={plaster.map}
          normalMap={plaster.normalMap}
          roughnessMap={plaster.roughnessMap}
          color="#f2efe9"
        />
      </RoundedBox>
      <RoundedBox args={[1.05, 2.35, 0.7]} radius={0.04} position={[8.35, 1.25, 1.4]} castShadow>
        <meshStandardMaterial color="#0f1724" roughness={0.4} metalness={0.35} />
      </RoundedBox>
      {[-0.7, -0.2, 0.3, 0.8].map((y, i) => (
        <RoundedBox
          key={y}
          args={[0.82, 0.28, 0.52]}
          radius={0.02}
          position={[8.35, 1.25 + y, 1.4]}
        >
          <meshStandardMaterial
            color="#1a2433"
            emissive={i % 2 === 0 ? "#2a929b" : "#7ed321"}
            emissiveIntensity={0.55}
            roughness={0.3}
            metalness={0.45}
          />
        </RoundedBox>
      ))}

      {/* Rear side wall pieces (frame glass opening) */}
      <RoundedBox args={[2.2, 3.35, 0.22]} radius={0.02} position={[-4.3, 1.67, 6.5]} castShadow>
        <meshStandardMaterial
          map={plaster.map}
          normalMap={plaster.normalMap}
          color="#f4f1eb"
        />
      </RoundedBox>
      <RoundedBox args={[2.2, 3.35, 0.22]} radius={0.02} position={[5.9, 1.67, 6.5]} castShadow>
        <meshStandardMaterial
          map={plaster.map}
          normalMap={plaster.normalMap}
          color="#f4f1eb"
        />
      </RoundedBox>

      {/* Floor-to-ceiling glass toward pool */}
      <mesh position={[0.8, 1.65, 6.55]}>
        <planeGeometry args={[8.2, 3.1]} />
        <meshPhysicalMaterial
          color="#dceaf2"
          transmission={0.92}
          thickness={0.35}
          roughness={0.05}
          metalness={0.05}
          transparent
          opacity={0.35}
          ior={1.45}
          reflectivity={0.6}
        />
      </mesh>
      {/* Glass frame mullions */}
      {[-3.1, -1.05, 1.05, 3.1].map((x) => (
        <RoundedBox key={x} args={[0.06, 3.15, 0.08]} radius={0.01} position={[0.8 + x, 1.65, 6.56]}>
          <meshStandardMaterial color="#1c2430" metalness={0.7} roughness={0.3} />
        </RoundedBox>
      ))}

      {/* Exterior facade volume (luxury villa massing) */}
      <RoundedBox
        args={[14.5, 3.7, 0.55]}
        radius={0.04}
        position={[0.8, 1.85, -4.35]}
        castShadow
      >
        <meshStandardMaterial color="#f5f2ec" roughness={0.82} />
      </RoundedBox>
      <RoundedBox
        args={[4.2, 1.4, 3.2]}
        radius={0.05}
        position={[5.8, 4.1, -2.4]}
        castShadow
      >
        <meshStandardMaterial color="#f7f4ee" roughness={0.8} />
      </RoundedBox>
      {/* Wood accent cladding */}
      <RoundedBox args={[0.35, 3.5, 4.8]} radius={0.03} position={[7.95, 1.8, 3.2]} castShadow>
        <meshStandardMaterial map={deckMap} roughness={0.65} />
      </RoundedBox>

      {/* Sofa set */}
      <RoundedBox args={[3.6, 0.52, 1.25]} radius={0.1} position={[0.4, 0.42, 2.1]} castShadow>
        <meshStandardMaterial color="#cfc7bb" roughness={0.88} />
      </RoundedBox>
      <RoundedBox args={[3.6, 0.72, 0.32]} radius={0.1} position={[0.4, 0.9, 1.55]} castShadow>
        <meshStandardMaterial color="#c4bbb0" roughness={0.88} />
      </RoundedBox>
      <RoundedBox args={[1.05, 0.55, 1.05]} radius={0.1} position={[3.1, 0.45, 3.3]} castShadow>
        <meshStandardMaterial color="#b7a898" roughness={0.86} />
      </RoundedBox>
      {/* Coffee table */}
      <RoundedBox args={[1.35, 0.1, 0.78]} radius={0.04} position={[0.45, 0.4, 3.45]} castShadow>
        <meshPhysicalMaterial
          color="#ebe7e0"
          roughness={0.15}
          metalness={0.05}
          clearcoat={0.8}
        />
      </RoundedBox>
      <mesh position={[0.45, 0.2, 3.45]}>
        <cylinderGeometry args={[0.08, 0.1, 0.35, 16]} />
        <meshStandardMaterial color="#2a323c" metalness={0.6} roughness={0.35} />
      </mesh>

      {/* Sideboard */}
      <RoundedBox args={[2.6, 0.58, 0.55]} radius={0.05} position={[3.1, 0.38, -3.2]} castShadow>
        <meshStandardMaterial map={deckMap} roughness={0.55} />
      </RoundedBox>

      {/* Smart wall tablet */}
      <RoundedBox args={[0.08, 0.48, 0.72]} radius={0.02} position={[-4.15, 1.45, 0.7]}>
        <meshPhysicalMaterial
          color="#0b1220"
          metalness={0.65}
          roughness={0.18}
          clearcoat={1}
          emissive="#1f5f78"
          emissiveIntensity={0.7}
        />
      </RoundedBox>
      <mesh position={[-4.1, 1.45, 0.7]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.58, 0.36]} />
        <meshStandardMaterial
          color="#102433"
          emissive="#2a929b"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Area rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.45, 0.035, 2.7]}>
        <planeGeometry args={[4.2, 2.8]} />
        <meshStandardMaterial color="#e4ddd2" roughness={1} />
      </mesh>

      {/* Planters */}
      {[
        [-4.8, 8.2],
        [6.4, 8.2],
        [-3.8, 13.4],
        [5.4, 13.4],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <RoundedBox args={[0.7, 0.55, 0.7]} radius={0.04} position={[0, 0.28, 0]} castShadow>
            <meshStandardMaterial color="#2a323c" roughness={0.6} />
          </RoundedBox>
          <mesh position={[0, 0.85, 0]} castShadow>
            <sphereGeometry args={[0.38, 18, 18]} />
            <meshStandardMaterial color="#2f6b3a" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

type VillaSceneProps = {
  hotspots: TourHotspot[];
  activeHotspotId: string | null;
  onSelectHotspot: (id: string) => void;
  isMobile?: boolean;
};

export default function VillaScene({
  hotspots,
  activeHotspotId,
  onSelectHotspot,
  isMobile = false,
}: VillaSceneProps) {
  const shadowSize = isMobile ? 512 : 2048;

  return (
    <>
      <hemisphereLight intensity={0.35} color="#f3f7ff" groundColor="#3a4638" />
      <directionalLight
        castShadow={!isMobile}
        position={[8, 14, 6]}
        intensity={isMobile ? 1.45 : 1.65}
        shadow-mapSize-width={shadowSize}
        shadow-mapSize-height={shadowSize}
        shadow-camera-far={40}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
        color="#fff4e5"
      />
      <directionalLight position={[-6, 6, -4]} intensity={0.35} color="#9ec9ff" />
      <pointLight position={[0.3, 2.2, -3.2]} intensity={10} distance={7} color="#7ed321" />
      <pointLight position={[-5.2, 2, 0.6]} intensity={7} distance={5} color="#2a929b" />
      <pointLight position={[8.3, 1.7, 1.4]} intensity={8} distance={4.5} color="#9ae84a" />

      <LuxuryVilla />

      {hotspots.map((h) => (
        <HotspotMarker
          key={h.id}
          hotspot={h}
          active={activeHotspotId === h.id}
          onSelect={onSelectHotspot}
          isMobile={isMobile}
        />
      ))}
    </>
  );
}
