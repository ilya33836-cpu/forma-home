'use client'

import { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { Minus, Plus, RotateCcw } from 'lucide-react'

type RoomProps = {
  tone: string
  pieces: number
}

const WOODS = ['#8C7355', '#6B5B49', '#A98761']

function Room({ tone, pieces }: RoomProps) {
  const group = useRef<THREE.Group>(null)
  const chair = useRef<THREE.Group>(null)
  const orb = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (group.current) group.current.rotation.y = Math.sin(t * 0.06) * 0.1
    if (chair.current) chair.current.rotation.y = Math.sin(t * 0.22) * 0.28
    if (orb.current) orb.current.rotation.y += delta * 0.18
  })

  return (
    <group ref={group}>
      {/* пол */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#C7BEB0" roughness={0.85} />
      </mesh>

      {/* ковёр */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.15, 0.004, 0.2]} receiveShadow>
        <planeGeometry args={[3.6, 2.6]} />
        <meshStandardMaterial color="#E3DCD0" roughness={0.95} />
      </mesh>

      {/* задняя стена */}
      <mesh position={[0, 1.6, -2.6]} receiveShadow>
        <planeGeometry args={[10, 3.2]} />
        <meshStandardMaterial color={tone} roughness={0.95} />
      </mesh>
      {/* боковые стены */}
      <mesh position={[-2.9, 1.6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 3.2]} />
        <meshStandardMaterial color={tone} roughness={0.95} />
      </mesh>
      <mesh position={[2.9, 1.6, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 3.2]} />
        <meshStandardMaterial color={tone} roughness={0.95} />
      </mesh>

      {/* потолок */}
      <mesh position={[0, 3.2, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#EDE9E1" roughness={0.98} />
      </mesh>

      {/* оконный проём */}
      <mesh position={[-0.6, 1.65, -2.57]}>
        <planeGeometry args={[3.4, 2.5]} />
        <meshStandardMaterial
          color="#EFE9DE"
          emissive="#FFEFD6"
          emissiveIntensity={0.3}
          roughness={0.4}
        />
      </mesh>
      {[0.9, 2.05].map((y) => (
        <mesh key={y} position={[-0.6, y, -2.55]}>
          <boxGeometry args={[3.28, 0.04, 0.04]} />
          <meshStandardMaterial color="#2A2825" roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[-0.6, 1.62, -2.55]}>
        <boxGeometry args={[0.04, 2.32, 0.04]} />
        <meshStandardMaterial color="#2A2825" roughness={0.6} />
      </mesh>

      {/* деревянная панель */}
      <mesh position={[2.0, 1.35, -2.56]} receiveShadow>
        <planeGeometry args={[1.6, 2.3]} />
        <meshStandardMaterial color={WOODS[pieces % WOODS.length]} roughness={0.62} />
      </mesh>

      {/* кресло */}
      <group ref={chair} position={[0.55, 0, 0.15]}>
        <mesh position={[0, 0.21, 0]} castShadow>
          <boxGeometry args={[0.94, 0.42, 0.92]} />
          <meshStandardMaterial color="#DED7CA" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.46, 0]} castShadow>
          <boxGeometry args={[0.94, 0.12, 0.92]} />
          <meshStandardMaterial color="#EAE4D8" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.82, -0.42]} rotation={[-0.14, 0, 0]} castShadow>
          <boxGeometry args={[0.94, 0.78, 0.14]} />
          <meshStandardMaterial color="#EAE4D8" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.6, -0.2]} rotation={[-0.14, 0, 0]} castShadow>
          <boxGeometry args={[0.9, 0.5, 0.1]} />
          <meshStandardMaterial color="#D2CABC" roughness={0.9} />
        </mesh>
      </group>

      {/* приставной столик */}
      <group position={[-0.75, 0, 0.55]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.34, 0.34, 0.06, 48]} />
          <meshStandardMaterial color={tone} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 20]} />
          <meshStandardMaterial color="#33312D" metalness={0.7} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.26, 0.26, 0.04, 32]} />
          <meshStandardMaterial color="#33312D" metalness={0.7} roughness={0.35} />
        </mesh>
      </group>

      {/* ваза с ветвями на столике */}
      <group position={[-0.75, 0.66, 0.55]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.085, 0.11, 0.28, 32]} />
          <meshStandardMaterial color="#F7F5F0" roughness={0.45} />
        </mesh>
        {[-0.07, 0, 0.07].map((x, i) => (
          <mesh key={i} position={[x, 0.32 + i * 0.06, 0]} rotation={[0, 0, x * 2.6]} castShadow>
            <cylinderGeometry args={[0.005, 0.005, 0.44, 6]} />
            <meshStandardMaterial color="#ADA396" roughness={0.85} />
          </mesh>
        ))}
      </group>

      {/* подвесной светильник над столом */}
      <group position={[-0.75, 2.2, 0.55]}>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.44, 6]} />
          <meshStandardMaterial color="#2A2825" />
        </mesh>
        <mesh castShadow>
          <coneGeometry args={[0.2, 0.22, 36, 1, true]} />
          <meshStandardMaterial
            color="#2A2825"
            side={THREE.DoubleSide}
            metalness={0.5}
            roughness={0.45}
          />
        </mesh>
        <mesh position={[0, -0.09, 0]}>
          <sphereGeometry args={[0.055, 20, 20]} />
          <meshStandardMaterial color="#FFF2D8" emissive="#FFE7BC" emissiveIntensity={3} />
        </mesh>
      </group>

      {/* скульптурный объект на пьедестале */}
      <group position={[2.05, 0, -1.5]}>
        <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.48, 0.42]} />
          <meshStandardMaterial color={tone} roughness={0.8} />
        </mesh>
        <mesh ref={orb} position={[0, 0.72, 0]} castShadow>
          <icosahedronGeometry args={[0.22, 1]} />
          <meshStandardMaterial color="#2C2A25" roughness={0.32} metalness={0.45} flatShading />
        </mesh>
      </group>

      <ContactShadows
        position={[0, 0.006, 0]}
        opacity={0.4}
        scale={12}
        blur={2.6}
        far={4.2}
        resolution={512}
        color="#3A342C"
      />
    </group>
  )
}

function CameraRig({ zoom }: { zoom: number }) {
  const { camera } = useThree()
  useEffect(() => {
    camera.position.set(zoom * 0.6, 1.72, zoom * 0.76)
    camera.lookAt(0, 1.0, -0.2)
    camera.updateProjectionMatrix()
  }, [camera, zoom])
  return null
}

function Scene({ tone, pieces, zoom }: RoomProps & { zoom: number }) {
  return (
    <>
      <CameraRig zoom={zoom} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[-2.5, 4, -4]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[3.5, 3, 4]} intensity={0.35} color="#FFEBD2" />
      <pointLight position={[-0.75, 2.05, 0.55]} intensity={5} distance={5.5} color="#FFE7C0" />
      <Suspense fallback={null}>
        <Room tone={tone} pieces={pieces} />
        <Environment preset="apartment" />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={4}
        maxDistance={9}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 1.05, -0.2]}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  )
}

type Props = {
  tone?: string
  pieces?: number
  roomName?: string
  className?: string
  poster?: string
}

export default function RoomViewer({
  tone = '#DED7CB',
  pieces = 0,
  roomName = 'Гостиная',
  className = '',
  poster,
}: Props) {
  const [zoom, setZoom] = useState(5.8)
  const [ready, setReady] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-sand-200 ${className}`}>
      {poster && !ready && (
        <img
          src={poster}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover"
        />
      )}

      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [zoom * 0.6, 1.72, zoom * 0.76], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor('#E9E5DD', 0)
          requestAnimationFrame(() => setReady(true))
        }}
      >
        <Scene tone={tone} pieces={pieces} zoom={zoom} />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
        <p className="micro hidden rounded-soft bg-sand/80 px-3 py-2 text-ink/60 backdrop-blur-sm sm:inline-block">
          {roomName} · 3D-сборка
        </p>
        <div className="pointer-events-auto flex items-center gap-1 rounded-soft bg-sand/80 p-1 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Отдалить"
            onClick={() => setZoom((z) => Math.min(8.4, +(z + 0.5).toFixed(1)))}
            className="flex size-9 items-center justify-center rounded-soft text-ink/70 transition-colors hover:bg-ink/10"
          >
            <Minus className="size-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Приблизить"
            onClick={() => setZoom((z) => Math.max(4, +(z - 0.5).toFixed(1)))}
            className="flex size-9 items-center justify-center rounded-soft text-ink/70 transition-colors hover:bg-ink/10"
          >
            <Plus className="size-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Сбросить вид"
            onClick={() => setZoom(5.8)}
            className="flex size-9 items-center justify-center rounded-soft text-ink/70 transition-colors hover:bg-ink/10"
          >
            <RotateCcw className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
