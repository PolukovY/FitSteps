import type { Pose, Rig } from './kinematics'

/**
 * Pose tables, not 62 hand-drawn animations. Every exercise is described as
 * two to four key positions of the same athlete; the kinematics module
 * interpolates between them. Adding an exercise costs a few numbers.
 *
 * Frame is 200x260. The floor sits at y=230, the standing hip at y=148.
 */
const GROUND = 230

type PoseInput = Omit<Pose, 't'> & { t: number }
const p = (pose: PoseInput): Pose => pose

const rig = (poses: Pose[], opts: Partial<Omit<Rig, 'poses'>> = {}): Rig => ({
  view: 'side',
  duration: 3000,
  ground: GROUND,
  ...opts,
  poses,
})

/** Same movement, adjusted position — variants stay in sync with their base. */
const variant = (base: Rig, map: (pose: Pose, index: number) => Pose, opts: Partial<Rig> = {}): Rig => ({
  ...base,
  ...opts,
  poses: base.poses.map(map),
})

const shift = (dx: number, dy: number) => (pose: Pose): Pose => ({
  ...pose,
  hip: [pose.hip[0] + dx, pose.hip[1] + dy],
})

/* ---------------------------------------------------------------- squats */

const squat = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 6, armA: 6, armB: -8, legA: 0, legB: 0 }),
    p({ t: 0.42, hip: [88, 196], torso: 36, armA: 74, armB: -14, legA: 84, legB: -125, foot: 8 }),
    p({ t: 0.56, hip: [88, 196], torso: 36, armA: 74, armB: -14, legA: 84, legB: -125, foot: 8 }),
  ],
  { duration: 3400 },
)

const chairSquat = variant(
  rig(
    [
      p({ t: 0, hip: [100, 148], torso: 6, armA: 60, armB: -20, legA: 0, legB: 0 }),
      p({ t: 0.44, hip: [92, 190], torso: 30, armA: 80, armB: -10, legA: 78, legB: -116, foot: 6 }),
      p({ t: 0.6, hip: [92, 190], torso: 30, armA: 80, armB: -10, legA: 78, legB: -116, foot: 6 }),
    ],
    { duration: 3400, prop: 'chair' },
  ),
  (x) => x,
)

const jumpSquat = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 6, armA: 10, armB: -10, legA: 0, legB: 0 }),
    p({ t: 0.3, hip: [92, 184], torso: 30, armA: -40, armB: -10, legA: 70, legB: -108, foot: 6 }),
    p({ t: 0.52, hip: [100, 108], torso: 2, armA: 150, armB: 8, legA: 4, legB: -6, foot: -22 }),
    p({ t: 0.76, hip: [94, 178], torso: 26, armA: 30, armB: -14, legA: 62, legB: -98, foot: 6 }),
  ],
  { duration: 2200 },
)

const sumoSquat = rig(
  [
    p({ t: 0, hip: [100, 150], torso: 2, armA: 8, armB: -30, armA2: 8, legA: 24, legB: 0, legA2: 24 }),
    p({ t: 0.44, hip: [100, 188], torso: 6, armA: 12, armB: -46, legA: 62, legB: -70, legA2: 62, legB2: -70 }),
    p({ t: 0.6, hip: [100, 188], torso: 6, armA: 12, armB: -46, legA: 62, legB: -70, legA2: 62, legB2: -70 }),
  ],
  { duration: 3200, view: 'front' },
)

const reverseLunge = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 4, armA: 6, armB: -20, legA: 0, legB: 0, legA2: 0 }),
    p({ t: 0.42, hip: [100, 186], torso: 10, armA: 8, armB: -24, legA: 26, legB: -56, legA2: -46, legB2: 92, foot2: 30 }),
    p({ t: 0.58, hip: [100, 186], torso: 10, armA: 8, armB: -24, legA: 26, legB: -56, legA2: -46, legB2: 92, foot2: 30 }),
  ],
  { duration: 3200 },
)

const splitSquat = rig(
  [
    p({ t: 0, hip: [100, 156], torso: 8, armA: 6, armB: -22, legA: 22, legB: -26, legA2: -40, legB2: 40, foot2: 26 }),
    p({ t: 0.42, hip: [100, 190], torso: 12, armA: 8, armB: -24, legA: 30, legB: -62, legA2: -48, legB2: 96, foot2: 32 }),
    p({ t: 0.58, hip: [100, 190], torso: 12, armA: 8, armB: -24, legA: 30, legB: -62, legA2: -48, legB2: 96, foot2: 32 }),
  ],
  { duration: 3000 },
)

const curtsyLunge = rig(
  [
    p({ t: 0, hip: [100, 150], torso: 2, armA: 20, armB: -60, armA2: 20, legA: 6, legB: 0, legA2: 6 }),
    p({ t: 0.44, hip: [100, 182], torso: 6, armA: 22, armB: -66, legA: 34, legB: -46, legA2: -26, legB2: 58 }),
    p({ t: 0.6, hip: [100, 182], torso: 6, armA: 22, armB: -66, legA: 34, legB: -46, legA2: -26, legB2: 58 }),
  ],
  { duration: 3200, view: 'front' },
)

const wallSit = rig(
  [
    p({ t: 0, hip: [64, 188], torso: 0, armA: 40, armB: -30, legA: 86, legB: -88, foot: 0 }),
    p({ t: 0.5, hip: [64, 190], torso: 0, armA: 40, armB: -30, legA: 86, legB: -88, foot: 0 }),
  ],
  { duration: 4000, isometric: true, prop: 'wall' },
)

const calfRaise = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 2, armA: 4, armB: 0, legA: 0, legB: 0, foot: 0 }),
    p({ t: 0.4, hip: [100, 130], torso: 2, armA: 4, armB: 0, legA: 0, legB: 0, foot: -40 }),
    p({ t: 0.56, hip: [100, 130], torso: 2, armA: 4, armB: 0, legA: 0, legB: 0, foot: -40 }),
  ],
  { duration: 2600 },
)

const goodMorning = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 4, armA: 170, armB: 60, legA: 0, legB: -6 }),
    p({ t: 0.44, hip: [112, 152], torso: 76, armA: 170, armB: 60, legA: -12, legB: -8 }),
    p({ t: 0.6, hip: [112, 152], torso: 76, armA: 170, armB: 60, legA: -12, legB: -8 }),
  ],
  { duration: 3400 },
)

/* --------------------------------------------------------------- glutes */

const gluteBridge = rig(
  [
    p({ t: 0, hip: [96, 216], torso: 96, armA: 96, armB: 0, legA: -74, legB: 132, foot: 0 }),
    p({ t: 0.4, hip: [96, 188], torso: 108, armA: 108, armB: 0, legA: -58, legB: 130, foot: 0 }),
    p({ t: 0.56, hip: [96, 188], torso: 108, armA: 108, armB: 0, legA: -58, legB: 130, foot: 0 }),
  ],
  { duration: 3000 },
)

const singleLegBridge = variant(gluteBridge, (pose, i) => ({
  ...pose,
  legA2: i === 0 ? -50 : -34,
  legB2: 6,
}))

const donkeyKick = rig(
  [
    p({ t: 0, hip: [112, 178], torso: 88, armA: -8, armB: 4, legA: -78, legB: 96, legA2: -78, legB2: 96 }),
    p({ t: 0.42, hip: [112, 178], torso: 88, armA: -8, armB: 4, legA: -128, legB: 104, legA2: -78, legB2: 96 }),
    p({ t: 0.58, hip: [112, 178], torso: 88, armA: -8, armB: 4, legA: -128, legB: 104, legA2: -78, legB2: 96 }),
  ],
  { duration: 2600 },
)

const fireHydrant = rig(
  [
    p({ t: 0, hip: [100, 178], torso: 90, armA: -6, armB: 0, legA: -84, legB: 92, legA2: -84, legB2: 92 }),
    p({ t: 0.42, hip: [100, 178], torso: 90, armA: -6, armB: 0, legA: -84, legB: 92, legA2: -40, legB2: 74 }),
    p({ t: 0.58, hip: [100, 178], torso: 90, armA: -6, armB: 0, legA: -84, legB: 92, legA2: -40, legB2: 74 }),
  ],
  { duration: 2600 },
)

/* ------------------------------------------------------------- pressing */

const pushUp = rig(
  [
    p({ t: 0, hip: [104, 178], torso: 82, armA: -6, armB: 4, legA: -86, legB: 2, foot: -30 }),
    p({ t: 0.4, hip: [104, 198], torso: 82, armA: -34, armB: 74, legA: -86, legB: 2, foot: -30 }),
    p({ t: 0.54, hip: [104, 198], torso: 82, armA: -34, armB: 74, legA: -86, legB: 2, foot: -30 }),
  ],
  { duration: 2800 },
)

const kneePushUp = variant(pushUp, (pose) => ({ ...pose, legA: -78, legB: 70, foot: -10 }))

const wallPushUp = rig(
  [
    p({ t: 0, hip: [86, 154], torso: 14, armA: 96, armB: 6, legA: -6, legB: 0, foot: 10 }),
    p({ t: 0.42, hip: [80, 154], torso: 18, armA: 92, armB: 62, legA: -8, legB: 0, foot: 12 }),
    p({ t: 0.56, hip: [80, 154], torso: 18, armA: 92, armB: 62, legA: -8, legB: 0, foot: 12 }),
  ],
  { duration: 2800, prop: 'wall' },
)

const inclinePushUp = variant(pushUp, shift(-6, -22), { prop: 'chair' })

const diamondPushUp = variant(pushUp, (pose, i) => ({
  ...pose,
  armB: i === 0 ? 4 : 88,
  armA: i === 0 ? -2 : -18,
}))

const pikePushUp = rig(
  [
    p({ t: 0, hip: [96, 132], torso: 128, armA: -34, armB: 6, legA: -34, legB: 6, foot: -24 }),
    p({ t: 0.42, hip: [96, 140], torso: 132, armA: -46, armB: 78, legA: -34, legB: 6, foot: -24 }),
    p({ t: 0.56, hip: [96, 140], torso: 132, armA: -46, armB: 78, legA: -34, legB: 6, foot: -24 }),
  ],
  { duration: 2800 },
)

const tricepsDip = rig(
  [
    p({ t: 0, hip: [120, 178], torso: 22, armA: -14, armB: 6, legA: 58, legB: -58, foot: 20 }),
    p({ t: 0.42, hip: [120, 198], torso: 22, armA: -18, armB: 74, legA: 62, legB: -62, foot: 20 }),
    p({ t: 0.56, hip: [120, 198], torso: 22, armA: -18, armB: 74, legA: 62, legB: -62, foot: 20 }),
  ],
  { duration: 2800, prop: 'chair' },
)

const plank = rig(
  [
    p({ t: 0, hip: [104, 184], torso: 80, armA: -18, armB: 76, legA: -84, legB: 2, foot: -28 }),
    p({ t: 0.5, hip: [104, 186], torso: 80, armA: -18, armB: 76, legA: -84, legB: 2, foot: -28 }),
  ],
  { duration: 4200, isometric: true },
)

const kneePlank = variant(plank, (pose) => ({ ...pose, legA: -76, legB: 72, foot: -8 }))

const plankUpDown = rig(
  [
    p({ t: 0, hip: [104, 184], torso: 80, armA: -18, armB: 76, legA: -84, legB: 2, foot: -28 }),
    p({ t: 0.34, hip: [104, 174], torso: 80, armA: -8, armB: 6, legA: -86, legB: 2, foot: -28 }),
    p({ t: 0.66, hip: [104, 184], torso: 80, armA: -18, armB: 76, legA: -84, legB: 2, foot: -28 }),
  ],
  { duration: 2800 },
)

const shoulderTap = rig(
  [
    p({ t: 0, hip: [104, 176], torso: 82, armA: -6, armB: 4, armA2: -6, armB2: 4, legA: -86, legB: 2, foot: -30 }),
    p({ t: 0.3, hip: [104, 176], torso: 82, armA: -6, armB: 4, armA2: 62, armB2: 96, legA: -86, legB: 2, foot: -30 }),
    p({ t: 0.6, hip: [104, 176], torso: 82, armA: -6, armB: 4, armA2: -6, armB2: 4, legA: -86, legB: 2, foot: -30 }),
  ],
  { duration: 2400 },
)

const sidePlank = rig(
  [
    p({ t: 0, hip: [100, 184], torso: 84, armA: -84, armB: 84, armA2: 96, armB2: 0, legA: -86, legB: 0, legA2: -86 }),
    p({ t: 0.5, hip: [100, 186], torso: 84, armA: -84, armB: 84, armA2: 96, armB2: 0, legA: -86, legB: 0, legA2: -86 }),
  ],
  { duration: 4200, isometric: true, view: 'front' },
)

/* ----------------------------------------------------------------- back */

const superman = rig(
  [
    p({ t: 0, hip: [104, 214], torso: 92, armA: 150, armB: 0, legA: -88, legB: 0, foot: -20 }),
    p({ t: 0.4, hip: [104, 210], torso: 84, armA: 160, armB: 0, legA: -102, legB: 0, foot: -16 }),
    p({ t: 0.56, hip: [104, 210], torso: 84, armA: 160, armB: 0, legA: -102, legB: 0, foot: -16 }),
  ],
  { duration: 3000 },
)

const birdDog = rig(
  [
    p({ t: 0, hip: [108, 178], torso: 88, armA: -6, armB: 0, armA2: -6, legA: -84, legB: 92, legA2: -84, legB2: 92 }),
    p({ t: 0.42, hip: [108, 178], torso: 88, armA: -6, armB: 0, armA2: 132, armB2: 0, legA: -92, legB: 4, legA2: -84, legB2: 92 }),
    p({ t: 0.58, hip: [108, 178], torso: 88, armA: -6, armB: 0, armA2: 132, armB2: 0, legA: -92, legB: 4, legA2: -84, legB2: 92 }),
  ],
  { duration: 3200 },
)

const reverseSnowAngel = rig(
  [
    p({ t: 0, hip: [100, 212], torso: 90, armA: 20, armB: 0, legA: -90, legB: 0, foot: -20 }),
    p({ t: 0.44, hip: [100, 212], torso: 90, armA: 156, armB: 0, legA: -90, legB: 0, foot: -20 }),
    p({ t: 0.6, hip: [100, 212], torso: 90, armA: 156, armB: 0, legA: -90, legB: 0, foot: -20 }),
  ],
  { duration: 3400, view: 'front' },
)

const wallAngel = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 0, armA: 118, armB: -84, legA: 0, legB: -4 }),
    p({ t: 0.44, hip: [100, 148], torso: 0, armA: 156, armB: -30, legA: 0, legB: -4 }),
    p({ t: 0.6, hip: [100, 148], torso: 0, armA: 156, armB: -30, legA: 0, legB: -4 }),
  ],
  { duration: 3200, view: 'front', prop: 'wall' },
)

/* ----------------------------------------------------------------- core */

const crunch = rig(
  [
    p({ t: 0, hip: [96, 214], torso: 96, armA: 140, armB: 84, legA: -70, legB: 128, foot: 0 }),
    p({ t: 0.4, hip: [96, 214], torso: 74, armA: 128, armB: 84, legA: -70, legB: 128, foot: 0 }),
    p({ t: 0.56, hip: [96, 214], torso: 74, armA: 128, armB: 84, legA: -70, legB: 128, foot: 0 }),
  ],
  { duration: 2800 },
)

const bicycleCrunch = rig(
  [
    p({ t: 0, hip: [96, 212], torso: 78, armA: 128, armB: 88, legA: -40, legB: 96, legA2: -108, legB2: 20 }),
    p({ t: 0.5, hip: [96, 212], torso: 78, armA: 128, armB: 88, legA: -108, legB: 20, legA2: -40, legB2: 96 }),
  ],
  { duration: 2000 },
)

const legRaise = rig(
  [
    p({ t: 0, hip: [92, 214], torso: 96, armA: 100, armB: 0, legA: -92, legB: 0, foot: -20 }),
    p({ t: 0.44, hip: [92, 214], torso: 96, armA: 100, armB: 0, legA: -178, legB: 0, foot: -20 }),
    p({ t: 0.58, hip: [92, 214], torso: 96, armA: 100, armB: 0, legA: -178, legB: 0, foot: -20 }),
  ],
  { duration: 3000 },
)

const deadBug = rig(
  [
    p({ t: 0, hip: [96, 212], torso: 92, armA: 178, armB: 0, armA2: 92, armB2: 0, legA: -178, legB: 88, legA2: -178, legB2: 88 }),
    p({ t: 0.44, hip: [96, 212], torso: 92, armA: 178, armB: 0, armA2: 4, armB2: 0, legA: -178, legB: 88, legA2: -112, legB2: 16 }),
    p({ t: 0.6, hip: [96, 212], torso: 92, armA: 178, armB: 0, armA2: 4, armB2: 0, legA: -178, legB: 88, legA2: -112, legB2: 16 }),
  ],
  { duration: 3000 },
)

const russianTwist = rig(
  [
    p({ t: 0, hip: [96, 202], torso: 42, armA: 76, armB: -50, armA2: 76, armB2: -50, legA: -34, legB: 92, legA2: -34, legB2: 92 }),
    p({ t: 0.5, hip: [96, 202], torso: 42, armA: -76, armB: 50, armA2: -76, armB2: 50, legA: -34, legB: 92, legA2: -34, legB2: 92 }),
  ],
  { duration: 2200, view: 'front' },
)

const flutterKick = rig(
  [
    p({ t: 0, hip: [92, 212], torso: 94, armA: 100, armB: 0, legA: -148, legB: 4, legA2: -118, legB2: 4 }),
    p({ t: 0.5, hip: [92, 212], torso: 94, armA: 100, armB: 0, legA: -118, legB: 4, legA2: -148, legB2: 4 }),
  ],
  { duration: 900 },
)

const hollowHold = rig(
  [
    p({ t: 0, hip: [96, 210], torso: 80, armA: 172, armB: 0, legA: -128, legB: 4, foot: -18 }),
    p({ t: 0.5, hip: [96, 212], torso: 78, armA: 172, armB: 0, legA: -126, legB: 4, foot: -18 }),
  ],
  { duration: 4000, isometric: true },
)

const heelTouch = rig(
  [
    p({ t: 0, hip: [96, 212], torso: 82, armA: 40, armB: 0, armA2: 40, armB2: 0, legA: -66, legB: 126, legA2: -66, legB2: 126 }),
    p({ t: 0.5, hip: [96, 212], torso: 96, armA: 40, armB: 0, armA2: 40, armB2: 0, legA: -66, legB: 126, legA2: -66, legB2: 126 }),
  ],
  { duration: 1800, view: 'front' },
)

/* --------------------------------------------------------------- cardio */

const jumpingJack = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 0, armA: 6, armB: 0, legA: 4, legB: 0 }),
    p({ t: 0.5, hip: [100, 142], torso: 0, armA: 165, armB: 0, legA: 26, legB: 0 }),
  ],
  { duration: 1000, view: 'front' },
)

const stepJack = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 0, armA: 6, armB: 0, legA: 4, legB: 0, legA2: 4 }),
    p({ t: 0.5, hip: [100, 148], torso: 0, armA: 150, armB: 0, legA: 4, legB: 0, legA2: 30 }),
  ],
  { duration: 1400, view: 'front' },
)

const highKnees = rig(
  [
    p({ t: 0, hip: [100, 146], torso: 4, armA: 40, armB: -80, armA2: -40, armB2: -80, legA: 84, legB: -90, legA2: -6, legB2: 0, foot: -20 }),
    p({ t: 0.5, hip: [100, 146], torso: 4, armA: -40, armB: -80, armA2: 40, armB2: -80, legA: -6, legB: 0, legA2: 84, legB2: -90 }),
  ],
  { duration: 700 },
)

const marchInPlace = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 2, armA: 26, armB: -50, armA2: -26, armB2: -50, legA: 56, legB: -80, legA2: -4, legB2: 0 }),
    p({ t: 0.5, hip: [100, 148], torso: 2, armA: -26, armB: -50, armA2: 26, armB2: -50, legA: -4, legB: 0, legA2: 56, legB2: -80 }),
  ],
  { duration: 1300 },
)

const mountainClimber = rig(
  [
    p({ t: 0, hip: [104, 176], torso: 80, armA: -6, armB: 4, legA: -86, legB: 4, legA2: -34, legB2: 88, foot: -30 }),
    p({ t: 0.5, hip: [104, 176], torso: 80, armA: -6, armB: 4, legA: -34, legB: 88, legA2: -86, legB2: 4, foot: -10 }),
  ],
  { duration: 800 },
)

const burpee = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 4, armA: 8, armB: 0, legA: 0, legB: 0 }),
    p({ t: 0.22, hip: [92, 190], torso: 48, armA: 84, armB: -10, legA: 78, legB: -116, foot: 6 }),
    p({ t: 0.42, hip: [104, 180], torso: 80, armA: -8, armB: 4, legA: -86, legB: 2, foot: -30 }),
    p({ t: 0.56, hip: [104, 198], torso: 80, armA: -34, armB: 74, legA: -86, legB: 2, foot: -30 }),
    p({ t: 0.72, hip: [92, 190], torso: 48, armA: 84, armB: -10, legA: 78, legB: -116, foot: 6 }),
    p({ t: 0.88, hip: [100, 112], torso: 2, armA: 152, armB: 6, legA: 2, legB: -4, foot: -24 }),
  ],
  { duration: 3200 },
)

const squatThrust = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 4, armA: 8, armB: 0, legA: 0, legB: 0 }),
    p({ t: 0.28, hip: [92, 190], torso: 48, armA: 84, armB: -10, legA: 78, legB: -116, foot: 6 }),
    p({ t: 0.5, hip: [104, 180], torso: 80, armA: -8, armB: 4, legA: -86, legB: 2, foot: -30 }),
    p({ t: 0.74, hip: [92, 190], torso: 48, armA: 84, armB: -10, legA: 78, legB: -116, foot: 6 }),
  ],
  { duration: 2600 },
)

const skaterHop = rig(
  [
    p({ t: 0, hip: [88, 162], torso: 14, armA: 60, armB: -40, armA2: -50, armB2: -20, legA: 16, legB: -44, legA2: -34, legB2: 70 }),
    p({ t: 0.5, hip: [112, 162], torso: -14, armA: -60, armB: -40, armA2: 50, armB2: -20, legA: -16, legB: -44, legA2: 34, legB2: 70 }),
  ],
  { duration: 1200, view: 'front' },
)

const buttKick = rig(
  [
    p({ t: 0, hip: [100, 146], torso: 4, armA: 34, armB: -70, armA2: -34, armB2: -70, legA: -12, legB: 132, legA2: -2, legB2: 6 }),
    p({ t: 0.5, hip: [100, 146], torso: 4, armA: -34, armB: -70, armA2: 34, armB2: -70, legA: -2, legB: 6, legA2: -12, legB2: 132 }),
  ],
  { duration: 700 },
)

/* ------------------------------------------------------------- mobility */

const armCircle = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 0, armA: 90, armB: 0, legA: 6, legB: 0 }),
    p({ t: 0.25, hip: [100, 148], torso: 0, armA: 160, armB: 0, legA: 6, legB: 0 }),
    p({ t: 0.5, hip: [100, 148], torso: 0, armA: 92, armB: 0, legA: 6, legB: 0 }),
    p({ t: 0.75, hip: [100, 148], torso: 0, armA: 20, armB: 0, legA: 6, legB: 0 }),
  ],
  { duration: 2200, view: 'front' },
)

const hipRotation = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 2, armA: 40, armB: -80, armA2: 40, armB2: -80, legA: 70, legB: -96, legA2: -2 }),
    p({ t: 0.33, hip: [100, 148], torso: 2, armA: 40, armB: -80, armA2: 40, armB2: -80, legA: 60, legB: -70, legA2: -2 }),
    p({ t: 0.66, hip: [100, 148], torso: 2, armA: 40, armB: -80, armA2: 40, armB2: -80, legA: 10, legB: -40, legA2: -2 }),
  ],
  { duration: 2600 },
)

const catCow = rig(
  [
    p({ t: 0, hip: [108, 176], torso: 82, armA: -6, armB: 0, legA: -84, legB: 92, legA2: -84, legB2: 92 }),
    p({ t: 0.44, hip: [108, 168], torso: 100, armA: -14, armB: 0, head: 26, legA: -78, legB: 92, legA2: -78, legB2: 92 }),
    p({ t: 0.62, hip: [108, 176], torso: 82, armA: -6, armB: 0, head: -22, legA: -84, legB: 92, legA2: -84, legB2: 92 }),
  ],
  { duration: 3600 },
)

const torsoTwist = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 0, armA: 76, armB: -80, armA2: 76, armB2: -80, legA: 10, legB: 0, legA2: 10 }),
    p({ t: 0.5, hip: [100, 148], torso: 0, armA: 108, armB: -60, armA2: 44, armB2: -100, legA: 10, legB: 0, legA2: 10, head: 22 }),
  ],
  { duration: 1800, view: 'front' },
)

const legSwing = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 2, armA: 100, armB: 0, armA2: 6, legA: 56, legB: -6, legA2: -2 }),
    p({ t: 0.5, hip: [100, 148], torso: 2, armA: 100, armB: 0, armA2: 6, legA: -34, legB: -6, legA2: -2 }),
  ],
  { duration: 1800, prop: 'wall' },
)

const inchworm = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 4, armA: 8, armB: 0, legA: 0, legB: 0 }),
    p({ t: 0.28, hip: [108, 158], torso: 78, armA: 12, armB: 0, legA: -6, legB: -6 }),
    p({ t: 0.54, hip: [104, 180], torso: 80, armA: -8, armB: 4, legA: -86, legB: 2, foot: -30 }),
    p({ t: 0.78, hip: [108, 158], torso: 78, armA: 12, armB: 0, legA: -6, legB: -6 }),
  ],
  { duration: 4000 },
)

const neckRoll = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 0, head: -32, armA: 6, armB: 0, legA: 6, legB: 0 }),
    p({ t: 0.5, hip: [100, 148], torso: 0, head: 32, armA: 6, armB: 0, legA: 6, legB: 0 }),
  ],
  { duration: 3000, view: 'front' },
)

/* ----------------------------------------------------------- stretching */

const hamstringStretch = rig(
  [
    p({ t: 0, hip: [104, 156], torso: 42, armA: 60, armB: -10, legA: 34, legB: -12, legA2: -14, legB2: 26, foot: -34 }),
    p({ t: 0.5, hip: [106, 156], torso: 52, armA: 66, armB: -10, legA: 34, legB: -12, legA2: -14, legB2: 26, foot: -34 }),
  ],
  { duration: 4200, isometric: true },
)

const quadStretch = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 2, armA: 96, armB: 0, armA2: -30, armB2: -110, legA: 2, legB: 0, legA2: 12, legB2: 138 }),
    p({ t: 0.5, hip: [100, 148], torso: 2, armA: 96, armB: 0, armA2: -34, armB2: -116, legA: 2, legB: 0, legA2: 16, legB2: 142 }),
  ],
  { duration: 4200, isometric: true, prop: 'wall' },
)

const childPose = rig(
  [
    p({ t: 0, hip: [124, 194], torso: 74, armA: 26, armB: 0, legA: -128, legB: 128, legA2: -128, legB2: 128 }),
    p({ t: 0.5, hip: [124, 196], torso: 72, armA: 26, armB: 0, legA: -128, legB: 128, legA2: -128, legB2: 128 }),
  ],
  { duration: 4400, isometric: true },
)

const chestStretch = rig(
  [
    p({ t: 0, hip: [100, 148], torso: 0, armA: 118, armB: -40, armA2: 10, armB2: 0, legA: 6, legB: 0, legA2: 6 }),
    p({ t: 0.5, hip: [102, 148], torso: -6, armA: 124, armB: -44, armA2: 10, armB2: 0, legA: 6, legB: 0, legA2: 6 }),
  ],
  { duration: 4200, isometric: true, view: 'front', prop: 'doorway' },
)

const figureFourStretch = rig(
  [
    p({ t: 0, hip: [96, 212], torso: 96, armA: 120, armB: -70, legA: -54, legB: 110, legA2: -18, legB2: 128 }),
    p({ t: 0.5, hip: [96, 212], torso: 96, armA: 124, armB: -76, legA: -62, legB: 116, legA2: -22, legB2: 130 }),
  ],
  { duration: 4400, isometric: true },
)

const cobraStretch = rig(
  [
    p({ t: 0, hip: [104, 214], torso: 60, armA: -34, armB: 24, legA: -90, legB: 0, foot: -18 }),
    p({ t: 0.5, hip: [104, 214], torso: 52, armA: -38, armB: 18, legA: -90, legB: 0, foot: -18 }),
  ],
  { duration: 4400, isometric: true },
)

const calfStretch = rig(
  [
    p({ t: 0, hip: [110, 154], torso: 26, armA: 84, armB: 6, legA: 16, legB: -18, legA2: -28, legB2: 8, foot2: 24 }),
    p({ t: 0.5, hip: [108, 154], torso: 30, armA: 86, armB: 4, legA: 16, legB: -18, legA2: -30, legB2: 8, foot2: 26 }),
  ],
  { duration: 4200, isometric: true, prop: 'wall' },
)

const seatedTwistStretch = rig(
  [
    p({ t: 0, hip: [96, 200], torso: 6, armA: 70, armB: -90, armA2: -60, armB2: 20, legA: -80, legB: 96, legA2: -84, legB2: 4 }),
    p({ t: 0.5, hip: [96, 200], torso: 10, armA: 78, armB: -96, armA2: -66, armB2: 24, legA: -80, legB: 96, legA2: -84, legB2: 4 }),
  ],
  { duration: 4400, isometric: true, view: 'front' },
)

export const RIGS: Record<string, Rig> = {
  squat,
  'chair-squat': chairSquat,
  'jump-squat': jumpSquat,
  'sumo-squat': sumoSquat,
  'reverse-lunge': reverseLunge,
  'split-squat': splitSquat,
  'curtsy-lunge': curtsyLunge,
  'wall-sit': wallSit,
  'calf-raise': calfRaise,
  'good-morning': goodMorning,
  'glute-bridge': gluteBridge,
  'single-leg-bridge': singleLegBridge,
  'donkey-kick': donkeyKick,
  'fire-hydrant': fireHydrant,
  'push-up': pushUp,
  'knee-push-up': kneePushUp,
  'wall-push-up': wallPushUp,
  'incline-push-up': inclinePushUp,
  'diamond-push-up': diamondPushUp,
  'pike-push-up': pikePushUp,
  'triceps-dip': tricepsDip,
  plank,
  'knee-plank': kneePlank,
  'plank-up-down': plankUpDown,
  'shoulder-tap': shoulderTap,
  'side-plank': sidePlank,
  superman,
  'bird-dog': birdDog,
  'reverse-snow-angel': reverseSnowAngel,
  'wall-angel': wallAngel,
  crunch,
  'bicycle-crunch': bicycleCrunch,
  'leg-raise': legRaise,
  'dead-bug': deadBug,
  'russian-twist': russianTwist,
  'flutter-kick': flutterKick,
  'hollow-hold': hollowHold,
  'heel-touch': heelTouch,
  'jumping-jack': jumpingJack,
  'step-jack': stepJack,
  'high-knees': highKnees,
  'march-in-place': marchInPlace,
  'mountain-climber': mountainClimber,
  burpee,
  'squat-thrust': squatThrust,
  'skater-hop': skaterHop,
  'butt-kick': buttKick,
  'arm-circle': armCircle,
  'hip-rotation': hipRotation,
  'cat-cow': catCow,
  'torso-twist': torsoTwist,
  'leg-swing': legSwing,
  inchworm,
  'neck-roll': neckRoll,
  'hamstring-stretch': hamstringStretch,
  'quad-stretch': quadStretch,
  'child-pose': childPose,
  'chest-stretch': chestStretch,
  'figure-four-stretch': figureFourStretch,
  'cobra-stretch': cobraStretch,
  'calf-stretch': calfStretch,
  'seated-twist-stretch': seatedTwistStretch,
}

export function getRig(id: string): Rig {
  return RIGS[id] ?? squat
}
