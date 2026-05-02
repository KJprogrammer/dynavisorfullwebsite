'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { useStore } from '@/lib/store'

/* ── GLSL shaders ───────────────────────────────── */

const NODE_VERT = /* glsl */`
  uniform float uTime;
  attribute float aPhase;
  attribute float aSize;
  attribute float aGold;
  varying float vPulse;
  varying float vGold;

  void main() {
    float pulse = sin(uTime * 1.08 + aPhase) * 0.22 + 0.78;
    vPulse = pulse;
    vGold  = aGold;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * pulse * (300.0 / -mvPos.z);
    gl_PointSize = clamp(gl_PointSize, 0.5, 80.0);
    gl_Position  = projectionMatrix * mvPos;
  }
`

const NODE_FRAG = /* glsl */`
  varying float vPulse;
  varying float vGold;

  void main() {
    vec2  uv   = gl_PointCoord - 0.5;
    float r    = length(uv) * 2.0;
    float disc = pow(1.0 - smoothstep(0.0, 0.50, r), 1.4);
    float halo = pow(max(0.0, 1.0 - r * 0.82), 3.4) * 0.7;
    float a    = (disc * 0.92 + halo) * vPulse;
    if (a < 0.006) discard;

    vec3 gold   = vec3(0.80, 0.63, 0.37);
    vec3 silver = vec3(0.68, 0.75, 0.87);
    vec3 col    = mix(silver, gold, vGold);
    col += col * disc * 0.55;
    gl_FragColor = vec4(col, a);
  }
`

const LINE_VERT = /* glsl */`
  attribute vec3 aColor;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const LINE_FRAG = /* glsl */`
  varying vec3 vColor;
  void main() {
    float a = length(vColor) * 0.9;
    if (a < 0.02) discard;
    gl_FragColor = vec4(vColor, a);
  }
`

/* ── Cinematic color grade + vignette pass ── */
const CinematicShader = {
  uniforms: {
    tDiffuse:   { value: null as THREE.Texture | null },
    uVignette:  { value: 0.72 },
    uSaturation:{ value: 1.18 },
    uContrast:  { value: 1.08 },
    uBrightness:{ value: 0.04 },
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
  `,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float uVignette;
    uniform float uSaturation;
    uniform float uContrast;
    uniform float uBrightness;
    varying vec2 vUv;

    vec3 adjustSaturation(vec3 col, float sat) {
      float grey = dot(col, vec3(0.299, 0.587, 0.114));
      return mix(vec3(grey), col, sat);
    }

    void main() {
      vec4 tex = texture2D(tDiffuse, vUv);
      vec3 col = tex.rgb;

      /* brightness / contrast */
      col = (col - 0.5) * uContrast + 0.5 + uBrightness;

      /* warm gold tint in highlights */
      float lum = dot(col, vec3(0.299, 0.587, 0.114));
      vec3 warmth = vec3(0.04, 0.01, -0.03);
      col += warmth * smoothstep(0.4, 1.0, lum);

      /* saturation */
      col = adjustSaturation(col, uSaturation);
      col = clamp(col, 0.0, 1.0);

      /* radial vignette */
      vec2 uvc = vUv - 0.5;
      float vign = 1.0 - dot(uvc, uvc) * uVignette * 3.2;
      vign = clamp(vign, 0.0, 1.0);
      vign = pow(vign, 1.4);
      col *= vign;

      gl_FragColor = vec4(col, tex.a);
    }
  `,
}

/* ── Formation builders ─────────────────────────── */

function cloud(n: number) {
  const p = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    p[i*3]   = (Math.random()-0.5)*18
    p[i*3+1] = (Math.random()-0.5)*11
    p[i*3+2] = (Math.random()-0.5)*9
  }
  return p
}

function grid(n: number) {
  const p = new Float32Array(n * 3)
  const c = Math.ceil(Math.sqrt(n * 1.6))
  const r = Math.ceil(n / c)
  for (let i = 0; i < n; i++) {
    p[i*3]   = ((i%c)/(c-1)-0.5)*19
    p[i*3+1] = (Math.floor(i/c)/(r-1)-0.5)*11
    p[i*3+2] = (Math.random()-0.5)*0.6
  }
  return p
}

function sphere(n: number) {
  const p = new Float32Array(n * 3)
  const phi = Math.PI*(3-Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1-(i/(n-1))*2
    const rr = Math.sqrt(Math.max(0, 1-y*y))
    const t  = phi*i
    const R  = 5.0+(Math.random()-0.5)*0.6
    p[i*3]=Math.cos(t)*rr*R; p[i*3+1]=y*R; p[i*3+2]=Math.sin(t)*rr*R
  }
  return p
}

function layers(n: number) {
  const p = new Float32Array(n * 3)
  const L = 4, pL = Math.floor(n/L), c = Math.ceil(Math.sqrt(pL))
  for (let i = 0; i < n; i++) {
    const l = Math.min(Math.floor(i/pL), L-1)
    const k = i%pL
    p[i*3]   = ((k%c)/(c-1)-0.5)*16
    p[i*3+1] = (l/(L-1)-0.5)*9
    p[i*3+2] = (Math.floor(k/c)/c-0.5)*2+(Math.random()-0.5)*0.3
  }
  return p
}

function buildConnections(pos: Float32Array, n: number, maxConn: number) {
  const THRESH = 2.7*2.7
  const pairs: number[] = [], phases: number[] = []
  for (let i = 0; i < n && pairs.length/2 < maxConn; i++)
    for (let j = i+1; j < n && pairs.length/2 < maxConn; j++) {
      const dx=pos[i*3]-pos[j*3], dy=pos[i*3+1]-pos[j*3+1], dz=pos[i*3+2]-pos[j*3+2]
      if (dx*dx+dy*dy+dz*dz < THRESH) { pairs.push(i,j); phases.push(Math.random()*Math.PI*2) }
    }
  return { pairs: new Int32Array(pairs), phases: new Float32Array(phases), count: pairs.length/2 }
}

/* ── Cinematic camera keyframes ─────────────────── */
// Camera travels through the particle field as user scrolls 0→1
const CAM_KEYS = [
  { sc: 0.00, pos: [0.0,  0.0,  3.5] },   // hero — inside the cloud
  { sc: 0.20, pos: [2.5,  0.8,  5.5] },   // benchmark — orbiting right
  { sc: 0.42, pos: [-2.0, 0.5,  7.8] },   // platform — sweep left
  { sc: 0.65, pos: [0.0, -1.2,  9.5] },   // validation — tilt under
  { sc: 0.85, pos: [1.2,  0.6, 11.5] },   // solutions — wide pull-back
  { sc: 1.00, pos: [0.0,  0.0, 14.0] },   // full-out
]

function cinematicCam(sc: number) {
  let lo = CAM_KEYS[0], hi = CAM_KEYS[CAM_KEYS.length - 1]
  for (let i = 0; i < CAM_KEYS.length - 1; i++) {
    if (sc >= CAM_KEYS[i].sc && sc <= CAM_KEYS[i+1].sc) {
      lo = CAM_KEYS[i]; hi = CAM_KEYS[i+1]; break
    }
  }
  const t = lo.sc === hi.sc ? 0 : (sc - lo.sc) / (hi.sc - lo.sc)
  // smooth-step easing between keys
  const e = t * t * (3 - 2 * t)
  return {
    x: lo.pos[0] + (hi.pos[0] - lo.pos[0]) * e,
    y: lo.pos[1] + (hi.pos[1] - lo.pos[1]) * e,
    z: lo.pos[2] + (hi.pos[2] - lo.pos[2]) * e,
  }
}

/* ── Component ──────────────────────────────────── */

export default function DataFabricCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)
  const store    = useStore()

  const scrollRef = useRef(0)
  const phaseRef  = useRef<string>('hero')
  useEffect(()=>{ scrollRef.current = store.scrollProgress }, [store.scrollProgress])
  useEffect(()=>{ phaseRef.current  = store.canvasPhase   }, [store.canvasPhase])

  useEffect(() => {
    const el = mountRef.current
    if (!el) return
    const W = el.clientWidth, H = el.clientHeight
    const mobile = W < 768
    const N   = mobile ? 600 : 1600
    const HUB = mobile ? 0   : 14

    /* renderer — solid background so bloom composites correctly */
    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
    renderer.setSize(W, H)
    renderer.setClearColor(0x060810, 1)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    el.appendChild(renderer.domElement)

    /* scene / camera */
    const scene  = new THREE.Scene()
    scene.fog    = new THREE.FogExp2(0x060810, 0.028)
    const camera = new THREE.PerspectiveCamera(58, W/H, 0.1, 120)
    camera.position.set(0, 0, 3.5)

    /* ── Post-processing ── */
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(W, H),
      1.9,   // strength
      0.62,  // radius
      0.12   // threshold — low so particles glow bright
    )
    composer.addPass(bloomPass)

    const cinematicPass = new ShaderPass(CinematicShader)
    composer.addPass(cinematicPass)

    composer.addPass(new OutputPass())

    /* group that rotates with mouse */
    const group = new THREE.Group()
    scene.add(group)

    /* ── positions ── */
    const cloudPos  = cloud(N)
    const gridPos   = grid(N)
    const spherePos = sphere(N)
    const layerPos  = layers(N)
    const basePos   = new Float32Array(cloudPos)
    const curPos    = new Float32Array(cloudPos)

    /* drift params */
    const driftPh  = new Float32Array(N*3)
    const driftSpd = new Float32Array(N*3)
    for (let i=0; i<N*3; i++) { driftPh[i]=Math.random()*Math.PI*2; driftSpd[i]=0.15+Math.random()*0.25 }

    /* ── node attributes ── */
    const aPhase = new Float32Array(N)
    const aSize  = new Float32Array(N)
    const aGold  = new Float32Array(N)
    for (let i=0; i<N; i++) {
      aPhase[i] = Math.random()*Math.PI*2
      aSize[i]  = i < HUB ? 5.5+Math.random()*3.0 : 1.1+Math.random()*0.9
      aGold[i]  = i < HUB ? 1.0 : (Math.random()<0.15 ? 1.0 : 0.0)
    }

    /* ── Points geometry ── */
    const ptGeo = new THREE.BufferGeometry()
    const posAttr = new THREE.BufferAttribute(curPos, 3); posAttr.setUsage(THREE.DynamicDrawUsage)
    ptGeo.setAttribute('position', posAttr)
    ptGeo.setAttribute('aPhase',   new THREE.BufferAttribute(aPhase, 1))
    ptGeo.setAttribute('aSize',    new THREE.BufferAttribute(aSize,  1))
    ptGeo.setAttribute('aGold',    new THREE.BufferAttribute(aGold,  1))

    const ptMat = new THREE.ShaderMaterial({
      vertexShader: NODE_VERT, fragmentShader: NODE_FRAG,
      uniforms: { uTime: { value: 0 } },
      transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    group.add(new THREE.Points(ptGeo, ptMat))

    /* ── Connections ── */
    const MAX_CONN = 5500
    const conn  = buildConnections(cloudPos, N, MAX_CONN)
    const lineBuf   = new Float32Array(MAX_CONN * 6)
    const colorBuf  = new Float32Array(MAX_CONN * 6)
    const lineGeo   = new THREE.BufferGeometry()
    const linePosA  = new THREE.BufferAttribute(lineBuf,  3); linePosA.setUsage(THREE.DynamicDrawUsage)
    const lineColA  = new THREE.BufferAttribute(colorBuf, 3); lineColA.setUsage(THREE.DynamicDrawUsage)
    lineGeo.setAttribute('position', linePosA)
    lineGeo.setAttribute('aColor',   lineColA)
    lineGeo.setDrawRange(0, 0)

    const lineMat = new THREE.ShaderMaterial({
      vertexShader: LINE_VERT, fragmentShader: LINE_FRAG,
      transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    group.add(new THREE.LineSegments(lineGeo, lineMat))

    /* ── Phase geometry ── */
    const gridH = new THREE.GridHelper(28, 28, 0x1e2535, 0x111827)
    gridH.position.y = -4
    gridH.visible = false
    scene.add(gridH)

    const cageGeo = new THREE.SphereGeometry(5.2, 16, 12)
    const cageEdges = new THREE.EdgesGeometry(cageGeo)
    const cage = new THREE.LineSegments(cageEdges, new THREE.LineBasicMaterial({
      color: 0xb8975a, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending
    }))
    scene.add(cage)
    cageGeo.dispose()

    /* ── Input ── */
    const mouse = { nx: 0, ny: 0 }
    const rotG  = { x: 0, y: 0 }
    const camPos = { x: 0, y: 0, z: 3.5 }

    const onMouse = (e: MouseEvent) => {
      mouse.nx = e.clientX/innerWidth - 0.5
      mouse.ny = e.clientY/innerHeight - 0.5
      store.setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const onResize = () => {
      const W2=el.clientWidth, H2=el.clientHeight
      renderer.setSize(W2,H2)
      composer.setSize(W2,H2)
      bloomPass.setSize(W2,H2)
      camera.aspect=W2/H2; camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    /* ── RAF loop ── */
    let rafId: number
    let t0 = 0

    const getTarget = (ph: string) => {
      if (ph==='benchmark') return gridPos
      if (ph==='platform')  return layerPos
      if (ph==='validation')return spherePos
      return cloudPos
    }

    const lerp = (a: number, b: number, t: number) => a + (b-a)*t

    const animate = (now: number) => {
      rafId = requestAnimationFrame(animate)
      if (!t0) t0 = now
      const t   = (now - t0) * 0.001
      const sc  = scrollRef.current
      const ph  = phaseRef.current

      ptMat.uniforms.uTime.value = t

      /* group rotation — mouse driven */
      rotG.x = lerp(rotG.x, -mouse.ny * 0.28, 0.035)
      rotG.y = lerp(rotG.y,  mouse.nx * 0.34, 0.035)
      group.rotation.x = rotG.x
      group.rotation.y = rotG.y

      /* cinematic camera path — keyframe driven by scroll + micro-parallax from mouse */
      const orbit = t * 0.032
      const key = cinematicCam(sc)
      const targetX = key.x + Math.sin(orbit) * 0.8 + mouse.nx * 0.4
      const targetY = key.y + Math.cos(orbit * 0.7) * 0.4 - mouse.ny * 0.25
      const targetZ = key.z
      camPos.x = lerp(camPos.x, targetX, 0.028)
      camPos.y = lerp(camPos.y, targetY, 0.028)
      camPos.z = lerp(camPos.z, targetZ, 0.040)
      camera.position.set(camPos.x, camPos.y, camPos.z)
      camera.lookAt(0, 0, 0)

      /* bloom strength reacts to scroll — more intense at edges of the cloud */
      bloomPass.strength = lerp(bloomPass.strength, 1.7 + sc * 0.5, 0.05)

      /* positions */
      const target  = getTarget(ph)
      const lsp     = ph === 'hero' ? 0.007 : 0.022
      const dAmp    = ph === 'hero' ? 0.55  : 0.10

      for (let i=0; i<N; i++)
        for (let k=0; k<3; k++) {
          const idx = i*3+k
          basePos[idx] = lerp(basePos[idx], target[idx], lsp)
          curPos[idx]  = basePos[idx] + Math.sin(t*driftSpd[idx]+driftPh[idx])*dAmp
        }
      posAttr.needsUpdate = true

      /* connections */
      const { pairs, phases, count } = conn
      let vi = 0
      for (let c=0; c<count; c++) {
        const pulse = Math.abs(Math.sin(t*1.12+phases[c]))*0.55+0.10
        if (pulse < 0.14) continue
        const i = pairs[c*2], j = pairs[c*2+1]

        lineBuf[vi*3]  =curPos[i*3]; lineBuf[vi*3+1]=curPos[i*3+1]; lineBuf[vi*3+2]=curPos[i*3+2]
        lineBuf[vi*3+3]=curPos[j*3]; lineBuf[vi*3+4]=curPos[j*3+1]; lineBuf[vi*3+5]=curPos[j*3+2]

        const goldI = aGold[i], goldJ = aGold[j]
        const setColor = (off: number, gold: number) => {
          colorBuf[off]   = lerp(0.52, 0.73, gold) * pulse
          colorBuf[off+1] = lerp(0.58, 0.58, gold) * pulse
          colorBuf[off+2] = lerp(0.70, 0.34, gold) * pulse
        }
        setColor(vi*3, goldI); setColor(vi*3+3, goldJ)
        vi += 2
      }
      linePosA.needsUpdate = true; lineColA.needsUpdate = true
      lineGeo.setDrawRange(0, vi)

      /* phase-specific effects */
      const fadeIn  = (v: number, target: number) => lerp(v, target, 0.04)
      const fadeOut = (v: number)                 => lerp(v, 0,      0.04)

      if (ph === 'benchmark') {
        gridH.visible = true
        const m = gridH.material as THREE.LineBasicMaterial
        m.opacity = fadeIn(m.opacity, 0.28)
        gridH.position.y = lerp(gridH.position.y, -3.5, 0.03)
        gridH.rotation.y = t * 0.03
      } else {
        const m = gridH.material as THREE.LineBasicMaterial
        m.opacity = fadeOut(m.opacity)
        if (m.opacity < 0.01) gridH.visible = false
      }

      const cm = cage.material as THREE.LineBasicMaterial
      if (ph === 'validation') {
        cage.rotation.y = t * 0.12
        cage.rotation.x = t * 0.07
        cm.opacity = fadeIn(cm.opacity, 0.22)
      } else {
        cm.opacity = fadeOut(cm.opacity)
      }

      composer.render()
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      composer.dispose()
      renderer.dispose()
      ptGeo.dispose(); ptMat.dispose()
      lineGeo.dispose(); lineMat.dispose()
      cageEdges.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }}
    />
  )
}
