# FitSteps

Guided home workouts as an offline-first PWA. No account, no equipment, no
backend — every workout, animation and statistic runs on the device, and all
progress stays in `localStorage`.

English and Ukrainian throughout, including exercise instructions and the
voice coach.

## Run it

```bash
npm install
npm run dev          # http://localhost:5173/fitSteps/
npm run build      # type-check + production bundle into dist/
npm run preview
```

## Deployment

`main` deploys to GitHub Pages through `.github/workflows/deploy.yml`. The
workflow sets `VITE_BASE` from the repository name, so the app works from
`https://<user>.github.io/<repo>/` with no local edits. Enable **Settings →
Pages → Source: GitHub Actions** once, and every push to `main` publishes.

Routing uses `HashRouter` so deep links survive Pages' static hosting; the
workflow also copies `index.html` to `404.html` as a belt-and-braces fallback.

## How it is put together

```
src/
  data/          exercise, workout and program definitions (the whole catalogue)
  components/    figure rig, muscle map, icons, shared UI
  engine/        workout state machine, voice, sound, haptics
  screens/       one file plus one stylesheet per screen
  store/         persisted settings and progress
  i18n/          registry, UI strings, locale detection
```

### Exercise animations

Every one of the 62 exercises is demonstrated by the same 2D athlete rig
(`components/figure/`). A rig is a table of two to four key poses in absolute
joint angles; `kinematics.ts` interpolates between them and
`ExerciseFigure.tsx` renders the result by mutating SVG attributes on refs, so
a running demo never re-renders the React tree next to a live timer.

Adding an exercise means adding a pose table, not drawing an animation.

### Progression

Program difficulty lives in per-day override tables in `data/programs.ts`
(`FULL_BODY_PROGRESSION` and friends). Week 3 of a program is the same workout
with different numbers — no screen contains progression logic.

### Copy and translations

`defineExercise` registers each exercise's English and Ukrainian copy under
generated `*Key` message ids. The exercise model keeps the key-based shape
while the text lives next to the definition it describes.

### Offline

`vite-plugin-pwa` precaches the entire bundle. Animations are SVG, sounds are
synthesised with the Web Audio API and the voice coach uses the Web Speech
API, so no workout asset is ever fetched at runtime. The voice layer sits
behind a `VoiceProvider` interface, ready for recorded audio later.
