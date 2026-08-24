import { useEffect, useRef } from 'react'
import { buildSkeleton, linePath, samplePose, segmentPath, type Rig } from './kinematics'
import { getRig } from './rigs'

interface Props {
  /** Exercise `animationAsset` id. */
  rig: string
  size?: number
  playing?: boolean
  /** Cycles per second multiplier; rest previews run slower than live demos. */
  speed?: number
  className?: string
}

const VIEW_W = 200
const VIEW_H = 260

/**
 * Renders the rig by mutating SVG attributes on refs rather than re-rendering.
 * A 60fps React tree update next to a running workout timer is exactly the
 * kind of jank that makes an app feel like a web page.
 */
export function ExerciseFigure({ rig, size = 240, playing = true, speed = 1, className }: Props) {
  const def = getRig(rig)
  const refs = {
    farLeg: useRef<SVGPathElement>(null),
    farArm: useRef<SVGPathElement>(null),
    farFoot: useRef<SVGPathElement>(null),
    torso: useRef<SVGPathElement>(null),
    hipBand: useRef<SVGPathElement>(null),
    head: useRef<SVGCircleElement>(null),
    face: useRef<SVGPathElement>(null),
    nearLeg: useRef<SVGPathElement>(null),
    nearArm: useRef<SVGPathElement>(null),
    nearFoot: useRef<SVGPathElement>(null),
    shadow: useRef<SVGEllipseElement>(null),
  }

  useEffect(() => {
    let frame = 0
    let start: number | null = null
    const reduce =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

    const draw = (progress: number) => {
      const pose = samplePose(def, progress)
      const s = buildSkeleton(pose, def.view)

      refs.farLeg.current?.setAttribute('d', segmentPath(s.farLeg))
      refs.farArm.current?.setAttribute('d', segmentPath(s.farArm))
      refs.farFoot.current?.setAttribute('d', linePath(s.farLeg.c, s.farFoot))
      refs.nearLeg.current?.setAttribute('d', segmentPath(s.nearLeg))
      refs.nearArm.current?.setAttribute('d', segmentPath(s.nearArm))
      refs.nearFoot.current?.setAttribute('d', linePath(s.nearLeg.c, s.nearFoot))
      refs.torso.current?.setAttribute('d', linePath(s.hip, s.shoulder))
      refs.hipBand.current?.setAttribute(
        'd',
        linePath(s.hip, [
          s.hip[0] + (s.shoulder[0] - s.hip[0]) * 0.3,
          s.hip[1] + (s.shoulder[1] - s.hip[1]) * 0.3,
        ]),
      )
      refs.head.current?.setAttribute('cx', s.headCenter[0].toFixed(1))
      refs.head.current?.setAttribute('cy', s.headCenter[1].toFixed(1))

      // A short nose stroke reads as a face direction without drawing features.
      const noseRad = ((s.headAngle + 90) * Math.PI) / 180
      refs.face.current?.setAttribute(
        'd',
        linePath(s.headCenter, [
          s.headCenter[0] + Math.sin(noseRad) * 15,
          s.headCenter[1] + Math.cos(noseRad) * 15,
        ]),
      )

      if (refs.shadow.current && def.ground != null) {
        const lift = Math.max(0, def.ground - Math.max(s.nearLeg.c[1], s.farLeg.c[1]))
        refs.shadow.current.setAttribute('rx', String(42 - Math.min(18, lift * 0.5)))
        refs.shadow.current.setAttribute('opacity', String(0.5 - Math.min(0.34, lift * 0.012)))
      }
    }

    if (!playing || reduce) {
      // Parked at the working position — the pose that explains the exercise.
      draw(reduce ? 0.45 : 0)
      return
    }

    const tick = (now: number) => {
      if (start == null) start = now
      const cycle = def.duration / Math.max(0.2, speed)
      draw(((now - start) % cycle) / cycle)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [def, playing, speed])

  const strokeBase = { strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as const

  return (
    <svg
      className={className}
      width={size}
      height={(size * VIEW_H) / VIEW_W}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      fill="none"
      aria-hidden="true"
    >
      {def.ground != null && (
        <>
          <ellipse
            ref={refs.shadow}
            cx="100"
            cy={def.ground + 6}
            rx="42"
            ry="6"
            fill="var(--accent)"
            opacity="0.5"
          />
          <path
            d={`M20 ${def.ground + 6}h160`}
            stroke="var(--line-strong)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
      {def.prop === 'wall' && <path d="M12 20v220" stroke="var(--line-strong)" strokeWidth="3" strokeLinecap="round" />}
      {def.prop === 'chair' && (
        <path
          d="M132 196h44M132 196v44M176 196v44M176 196v-46"
          stroke="var(--line-strong)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}
      {def.prop === 'doorway' && <path d="M150 16v228" stroke="var(--line-strong)" strokeWidth="3" strokeLinecap="round" />}

      <g opacity="0.42">
        <path ref={refs.farLeg} {...strokeBase} stroke="#8E97A3" strokeWidth="15" />
        <path ref={refs.farFoot} {...strokeBase} stroke="#8E97A3" strokeWidth="9" />
        <path ref={refs.farArm} {...strokeBase} stroke="#8E97A3" strokeWidth="10" />
      </g>

      <path ref={refs.torso} {...strokeBase} stroke="#E9EEF4" strokeWidth="21" />
      <path ref={refs.hipBand} {...strokeBase} stroke="var(--accent)" strokeWidth="21" />
      <circle ref={refs.head} r="13" fill="#E9EEF4" />
      <path ref={refs.face} {...strokeBase} stroke="#E9EEF4" strokeWidth="6" />

      <path ref={refs.nearLeg} {...strokeBase} stroke="#E9EEF4" strokeWidth="16" />
      <path ref={refs.nearFoot} {...strokeBase} stroke="#E9EEF4" strokeWidth="10" />
      <path ref={refs.nearArm} {...strokeBase} stroke="#CBD3DC" strokeWidth="11" />
    </svg>
  )
}

export type { Rig }
