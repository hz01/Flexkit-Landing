import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, Suspense } from 'react'
import * as THREE from 'three'

function makeGearGeometry(outerR: number, innerR: number, teeth: number, thickness: number) {
  const shape = new THREE.Shape()
  const step = (Math.PI * 2) / teeth
  const half = step * 0.22

  for (let i = 0; i < teeth; i++) {
    const a = i * step
    const vx0 = Math.cos(a - half) * innerR
    const vy0 = Math.sin(a - half) * innerR
    const tx0 = Math.cos(a - half) * outerR
    const ty0 = Math.sin(a - half) * outerR
    const tx1 = Math.cos(a + half) * outerR
    const ty1 = Math.sin(a + half) * outerR
    const vx1 = Math.cos(a + half) * innerR
    const vy1 = Math.sin(a + half) * innerR
    if (i === 0) shape.moveTo(vx0, vy0)
    shape.lineTo(tx0, ty0)
    shape.lineTo(tx1, ty1)
    shape.lineTo(vx1, vy1)
  }
  shape.closePath()

  const hole = new THREE.Path()
  const holeR = innerR * 0.38
  for (let i = 0; i <= 32; i++) {
    const a = (i / 32) * Math.PI * 2
    if (i === 0) hole.moveTo(Math.cos(a) * holeR, Math.sin(a) * holeR)
    else hole.lineTo(Math.cos(a) * holeR, Math.sin(a) * holeR)
  }
  shape.holes.push(hole)

  return new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false })
}

interface GearProps {
  position: [number, number, number]
  outerR: number
  innerR: number
  teeth: number
  thickness: number
  color: string
  speed: number
  phase?: number
}

function Gear({ position, outerR, innerR, teeth, thickness, color, speed, phase = 0 }: GearProps) {
  const ref = useRef<THREE.Group>(null)
  const geometry = useMemo(
    () => makeGearGeometry(outerR, innerR, teeth, thickness),
    [outerR, innerR, teeth, thickness]
  )

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.z = clock.elapsedTime * speed + phase
  })

  return (
    <group ref={ref} position={position}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} transparent opacity={0.06} />
      </mesh>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} wireframe />
      </mesh>
    </group>
  )
}

function FloatGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.55) * 0.1
  })
  return <group ref={ref}>{children}</group>
}

function Particles() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const count = 700
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 18
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18
    }
    return arr
  }, [])
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.01
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#ffffff" transparent opacity={0.18} sizeAttenuation />
    </points>
  )
}

export default function HeroScene() {
  // G1 (blue):   13 teeth, pitch_r = 1.265
  // G2 (teal):    8 teeth, pitch_r = 0.785  — meshes with G1, dist = 2.05
  // G3 (purple):  5 teeth, pitch_r = 0.490  — meshes with G2, dist = 1.275
  //
  // Speed ratios (gear law: ω ∝ -1/teeth)
  const s1 =  0.22
  const s2 = -(s1 * 13 / 8)          // -0.358
  const s3 = -(s2 *  8 / 5)          // +0.572

  // Positions
  // G1 centre → G2 centre: +2.05 on X axis
  // G2 centre → G3 centre: -1.275 on Y axis (below)
  const g1x = -1.05
  const g1y =  0.35
  const g2x =  g1x + 2.05   //  1.00
  const g2y =  g1y           //  0.35
  const g3x =  g2x           //  1.00
  const g3y =  g2y - 1.275   // -0.925

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 48 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <FloatGroup>
          {/* G1 — large, blue */}
          <Gear
            position={[g1x, g1y, 0]}
            outerR={1.45} innerR={1.08} teeth={13} thickness={0.28}
            color="#4A6CF7" speed={s1}
            phase={0}
          />
          {/* G2 — medium, teal — meshes with G1 */}
          <Gear
            position={[g2x, g2y, 0]}
            outerR={0.90} innerR={0.67} teeth={8} thickness={0.28}
            color="#20C997" speed={s2}
            phase={Math.PI / 8}   // half-tooth offset to interlock with G1
          />
          {/* G3 — small, purple — meshes with G2 */}
          <Gear
            position={[g3x, g3y, 0]}
            outerR={0.56} innerR={0.42} teeth={5} thickness={0.28}
            color="#8B5CF6" speed={s3}
            phase={Math.PI / 5}   // half-tooth offset to interlock with G2
          />
        </FloatGroup>
        <Particles />
      </Suspense>
    </Canvas>
  )
}
