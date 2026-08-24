/**
 * A single 2D athlete rig drives every exercise demonstration.
 *
 * Angles are absolute degrees, not joint-relative, because that is how a
 * coach describes a position ("thigh parallel to the floor") and it keeps
 * the pose tables readable. Zero points straight down the screen for limbs
 * and straight up for the torso; positive rotates toward +x (the direction
 * the athlete faces in side view).
 */
export interface Pose {
  /** Hip position in the 200x260 viewBox. */
  hip: [number, number]
  /** Torso lean from vertical. 0 upright, 90 horizontal, 180 upside down. */
  torso: number
  /** Head tilt relative to the torso. */
  head?: number
  /** Near arm: shoulder angle from straight-down, then elbow flexion. */
  armA: number
  armB?: number
  /** Near leg: hip angle from straight-down, then knee flexion. */
  legA: number
  legB?: number
  /** Far limbs; default to the near ones (both sides move together). */
  armA2?: number
  armB2?: number
  legA2?: number
  legB2?: number
  /** Foot angle from horizontal, relative to the shin. */
  foot?: number
  foot2?: number
  /** Keyframe position in the cycle, 0..1. */
  t: number
}

export type RigView = 'side' | 'front'

export interface Rig {
  view: RigView
  /** One full repetition, in milliseconds. */
  duration: number
  poses: Pose[]
  /** Isometric holds get a subtle breathing drift instead of a rep cycle. */
  isometric?: boolean
  /** Floor line height; omitted for lying/inverted exercises that need none. */
  ground?: number
  /** Optional prop drawn behind the athlete. */
  prop?: 'wall' | 'chair' | 'doorway'
}

export interface Segment {
  a: [number, number]
  b: [number, number]
  c: [number, number]
}

export interface Skeleton {
  hip: [number, number]
  shoulder: [number, number]
  headCenter: [number, number]
  headAngle: number
  nearArm: Segment
  farArm: Segment
  nearLeg: Segment
  farLeg: Segment
  nearFoot: [number, number]
  farFoot: [number, number]
}

const RAD = Math.PI / 180

export const DIMS = {
  torso: 56,
  neck: 16,
  headR: 13,
  upperArm: 25,
  foreArm: 23,
  thigh: 42,
  shin: 40,
  foot: 15,
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/** Smootherstep — movement eases at both ends the way a controlled rep does. */
function ease(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10)
}

function lerpPose(a: Pose, b: Pose, t: number): Pose {
  const e = ease(t)
  const pick = (ka: number | undefined, kb: number | undefined, fa: number, fb: number) =>
    lerp(ka ?? fa, kb ?? fb, e)
  return {
    t: 0,
    hip: [lerp(a.hip[0], b.hip[0], e), lerp(a.hip[1], b.hip[1], e)],
    torso: lerp(a.torso, b.torso, e),
    head: pick(a.head, b.head, 0, 0),
    armA: lerp(a.armA, b.armA, e),
    armB: pick(a.armB, b.armB, 0, 0),
    legA: lerp(a.legA, b.legA, e),
    legB: pick(a.legB, b.legB, 0, 0),
    armA2: pick(a.armA2, b.armA2, a.armA, b.armA),
    armB2: pick(a.armB2, b.armB2, a.armB ?? 0, b.armB ?? 0),
    legA2: pick(a.legA2, b.legA2, a.legA, b.legA),
    legB2: pick(a.legB2, b.legB2, a.legB ?? 0, b.legB ?? 0),
    foot: pick(a.foot, b.foot, 0, 0),
    foot2: pick(a.foot2, b.foot2, a.foot ?? 0, b.foot ?? 0),
  }
}

/** Samples the rig at a normalised cycle position, wrapping past the last key. */
export function samplePose(rig: Rig, progress: number): Pose {
  const poses = rig.poses
  if (poses.length === 1) return poses[0]
  const p = ((progress % 1) + 1) % 1
  for (let i = 0; i < poses.length - 1; i += 1) {
    const a = poses[i]
    const b = poses[i + 1]
    if (p >= a.t && p <= b.t) {
      const span = b.t - a.t
      return lerpPose(a, b, span === 0 ? 0 : (p - a.t) / span)
    }
  }
  // Tail of the cycle wraps back to the first pose so loops are seamless.
  const last = poses[poses.length - 1]
  const first = poses[0]
  const span = 1 - last.t + first.t
  return lerpPose(last, first, span === 0 ? 0 : (p - last.t) / span)
}

function project(
  origin: [number, number],
  angleDeg: number,
  length: number,
  flip: number,
): [number, number] {
  const a = angleDeg * RAD
  return [origin[0] + Math.sin(a) * length * flip, origin[1] + Math.cos(a) * length]
}

/**
 * In front view the far limb mirrors across the body's vertical axis, so the
 * same pose table describes both a jumping jack and a squat.
 */
export function buildSkeleton(pose: Pose, view: RigView): Skeleton {
  const farFlip = view === 'front' ? -1 : 1
  const hip = pose.hip
  const torsoRad = pose.torso * RAD
  const shoulder: [number, number] = [
    hip[0] + Math.sin(torsoRad) * DIMS.torso,
    hip[1] - Math.cos(torsoRad) * DIMS.torso,
  ]
  const headAngle = pose.torso + (pose.head ?? 0)
  const headRad = headAngle * RAD
  const headCenter: [number, number] = [
    shoulder[0] + Math.sin(headRad) * DIMS.neck,
    shoulder[1] - Math.cos(headRad) * DIMS.neck,
  ]

  const limb = (
    root: [number, number],
    a: number,
    b: number,
    l1: number,
    l2: number,
    flip: number,
  ): Segment => {
    const mid = project(root, a, l1, flip)
    const end = project(mid, a + b * flip, l2, flip)
    return { a: root, b: mid, c: end }
  }

  const nearArm = limb(shoulder, pose.armA, pose.armB ?? 0, DIMS.upperArm, DIMS.foreArm, 1)
  const farArm = limb(
    shoulder,
    (pose.armA2 ?? pose.armA) * farFlip,
    pose.armB2 ?? pose.armB ?? 0,
    DIMS.upperArm,
    DIMS.foreArm,
    farFlip,
  )
  const nearLeg = limb(hip, pose.legA, pose.legB ?? 0, DIMS.thigh, DIMS.shin, 1)
  const farLeg = limb(
    hip,
    (pose.legA2 ?? pose.legA) * farFlip,
    pose.legB2 ?? pose.legB ?? 0,
    DIMS.thigh,
    DIMS.shin,
    farFlip,
  )

  const nearShin = pose.legA + (pose.legB ?? 0)
  const farShin = (pose.legA2 ?? pose.legA) * farFlip + (pose.legB2 ?? pose.legB ?? 0) * farFlip
  const nearFoot = project(nearLeg.c, nearShin + 90 + (pose.foot ?? 0), DIMS.foot, 1)
  const farFoot = project(farLeg.c, farShin + 90 * farFlip + (pose.foot2 ?? pose.foot ?? 0), DIMS.foot, farFlip)

  return { hip, shoulder, headCenter, headAngle, nearArm, farArm, nearLeg, farLeg, nearFoot, farFoot }
}

export function segmentPath(s: Segment): string {
  return `M${s.a[0].toFixed(1)} ${s.a[1].toFixed(1)}L${s.b[0].toFixed(1)} ${s.b[1].toFixed(1)}L${s.c[0].toFixed(1)} ${s.c[1].toFixed(1)}`
}

export function linePath(a: [number, number], b: [number, number]): string {
  return `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`
}
