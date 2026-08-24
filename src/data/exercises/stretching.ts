import { defineExercise } from '../defineExercise'

export const stretching = [
  defineExercise(
    {
      id: 'hamstring-stretch', category: 'stretching', bodyParts: ['legs'],
      primaryMuscles: ['hamstrings'], secondaryMuscles: ['calves', 'lower_back'],
      difficulty: 'beginner', type: 'per_side', defaultDurationSeconds: 25,
      animationAsset: 'hamstring-stretch',
    },
    {
      en: {
        name: 'Standing Hamstring Stretch',
        description: 'Lengthens the back of the thigh after squats, lunges and running.',
        startingPosition: 'Stand tall, one heel forward on the floor with the toes lifted.',
        instructions: 'Hinge at the hips over the front leg with a flat back until you feel a stretch behind the thigh. Hold and breathe.',
        breathing: 'Slow breaths; let the stretch deepen on each exhale.',
        commonMistakes: ['Rounding the back to reach further', 'Bouncing into the stretch'],
        cues: ['Flat back', 'Hinge from the hips', 'Breathe into it'],
      },
      uk: {
        name: 'Розтяжка задньої поверхні стегна',
        description: 'Витягує задню поверхню стегна після присідань, випадів і бігу.',
        startingPosition: 'Стійте рівно, одна пʼята попереду на підлозі, носок піднятий.',
        instructions: 'Нахиліться від стегон над передньою ногою з рівною спиною, доки не відчуєте розтяг. Утримуйте й дихайте.',
        breathing: 'Повільні вдихи; поглиблюйте розтяг на кожному видиху.',
        commonMistakes: ['Округлення спини заради глибини', 'Пружинисті рухи в розтяжці'],
        cues: ['Спина рівна', 'Нахил від стегон', 'Дихайте в розтяг'],
      },
    },
  ),

  defineExercise(
    {
      id: 'quad-stretch', category: 'stretching', bodyParts: ['legs'],
      primaryMuscles: ['quadriceps'], secondaryMuscles: ['hip_flexors'],
      difficulty: 'beginner', type: 'per_side', defaultDurationSeconds: 25,
      animationAsset: 'quad-stretch',
    },
    {
      en: {
        name: 'Standing Quad Stretch',
        description: 'Releases the front of the thigh, the muscle squats work hardest.',
        startingPosition: 'Stand tall, one hand on a wall for balance.',
        instructions: 'Bend one knee and hold the ankle behind you, knees together and hips pushed slightly forward. Hold and breathe.',
        breathing: 'Slow, even breaths.',
        commonMistakes: ['Knee drifting out to the side', 'Arching the lower back'],
        cues: ['Knees together', 'Tuck the hips', 'Stand tall'],
      },
      uk: {
        name: 'Розтяжка квадрицепса стоячи',
        description: 'Розслабляє передню поверхню стегна — мʼяз, який найбільше працює в присіданнях.',
        startingPosition: 'Стійте рівно, однією рукою тримайтесь за стіну.',
        instructions: 'Зігніть коліно й візьміться за щиколотку позаду, коліна разом, таз трохи вперед. Утримуйте й дихайте.',
        breathing: 'Повільне рівне дихання.',
        commonMistakes: ['Коліно відводиться вбік', 'Прогин у попереку'],
        cues: ['Коліна разом', 'Підкрутіть таз', 'Тримайтесь рівно'],
      },
    },
  ),

  defineExercise(
    {
      id: 'child-pose', category: 'stretching', bodyParts: ['back'],
      primaryMuscles: ['lower_back', 'lats'], secondaryMuscles: ['glutes'],
      difficulty: 'beginner', type: 'hold', defaultDurationSeconds: 30,
      animationAsset: 'child-pose',
    },
    {
      en: {
        name: "Child's Pose",
        description: 'A resting stretch that decompresses the lower back and calms the breath.',
        startingPosition: 'Kneel, big toes together, knees apart, hips back toward the heels.',
        instructions: 'Reach your arms forward, let your chest sink toward the floor and rest your forehead down. Hold and breathe deeply.',
        breathing: 'Long, slow breaths into the back of the ribs.',
        commonMistakes: ['Tensing the shoulders', 'Holding the breath'],
        cues: ['Hips toward the heels', 'Long arms', 'Soften the shoulders'],
      },
      uk: {
        name: 'Поза дитини',
        description: 'Відновлювальна розтяжка: розвантажує поперек і заспокоює дихання.',
        startingPosition: 'Станьте на коліна, великі пальці ніг разом, коліна нарізно, таз назад до пʼят.',
        instructions: 'Витягніть руки вперед, опустіть груди до підлоги й покладіть лоб. Утримуйте й глибоко дихайте.',
        breathing: 'Довгі повільні вдихи в задню поверхню ребер.',
        commonMistakes: ['Напружені плечі', 'Затримка дихання'],
        cues: ['Таз до пʼят', 'Довгі руки', 'Розслабте плечі'],
      },
    },
  ),

  defineExercise(
    {
      id: 'chest-stretch', category: 'stretching', bodyParts: ['chest', 'shoulders'],
      primaryMuscles: ['chest'], secondaryMuscles: ['front_delts', 'biceps'],
      difficulty: 'beginner', type: 'per_side', defaultDurationSeconds: 25,
      animationAsset: 'chest-stretch',
    },
    {
      en: {
        name: 'Doorway Chest Stretch',
        description: 'Opens the chest after push-ups — and after a day of hunching over a screen.',
        startingPosition: 'Stand beside a doorway or wall corner, forearm against it at shoulder height.',
        instructions: 'Step forward gently and turn your chest away until you feel the stretch across the front of the shoulder. Hold and breathe.',
        breathing: 'Slow breaths, relaxing further on each exhale.',
        commonMistakes: ['Pushing into pain', 'Shrugging the shoulder up'],
        safetyTips: 'Ease off if you feel pinching at the front of the shoulder.',
        cues: ['Shoulder down', 'Turn the chest away', 'Gentle pressure only'],
      },
      uk: {
        name: 'Розтяжка грудних у дверному прорізі',
        description: 'Розкриває груди після віджимань — і після дня за екраном.',
        startingPosition: 'Станьте біля дверного прорізу чи кута стіни, передпліччя на поверхні на рівні плеча.',
        instructions: 'Мʼяко зробіть крок вперед і відверніть груди, доки не відчуєте розтяг спереду плеча. Утримуйте й дихайте.',
        breathing: 'Повільні вдихи, розслаблення на кожному видиху.',
        commonMistakes: ['Розтяг через біль', 'Плече піднімається до вуха'],
        safetyTips: 'Послабте натяг, якщо відчуваєте защемлення спереду плеча.',
        cues: ['Плече вниз', 'Відвертайте груди', 'Лише мʼякий натяг'],
      },
    },
  ),

  defineExercise(
    {
      id: 'figure-four-stretch', category: 'stretching', bodyParts: ['glutes'],
      primaryMuscles: ['glutes'], secondaryMuscles: ['lower_back', 'abductors'],
      difficulty: 'beginner', type: 'per_side', defaultDurationSeconds: 30,
      animationAsset: 'figure-four-stretch',
    },
    {
      en: {
        name: 'Figure-Four Stretch',
        description: 'The most direct glute stretch there is, done lying down.',
        startingPosition: 'Lie on your back, knees bent, feet flat.',
        instructions: 'Cross one ankle over the opposite knee, then pull that thigh toward your chest until you feel the stretch in the glute.',
        breathing: 'Deep, slow breaths.',
        commonMistakes: ['Lifting the head and shoulders', 'Pulling hard and fast'],
        cues: ['Head stays down', 'Gentle steady pull', 'Relax the jaw'],
      },
      uk: {
        name: 'Розтяжка «четвірка»',
        description: 'Найпряміша розтяжка сідничних мʼязів, виконується лежачи.',
        startingPosition: 'Ляжте на спину, коліна зігнуті, стопи на підлозі.',
        instructions: 'Покладіть щиколотку на протилежне коліно й підтягніть стегно до грудей, доки не відчуєте розтяг у сідниці.',
        breathing: 'Глибоке повільне дихання.',
        commonMistakes: ['Підйом голови й плечей', 'Різке сильне підтягування'],
        cues: ['Голова на підлозі', 'Мʼяке рівномірне натягування', 'Розслабте щелепу'],
      },
    },
  ),

  defineExercise(
    {
      id: 'cobra-stretch', category: 'stretching', bodyParts: ['core', 'back'],
      primaryMuscles: ['abs'], secondaryMuscles: ['chest', 'hip_flexors'],
      difficulty: 'beginner', type: 'hold', defaultDurationSeconds: 25,
      animationAsset: 'cobra-stretch',
    },
    {
      en: {
        name: 'Cobra Stretch',
        description: 'Extends the spine the opposite way to crunches — the natural counter to ab work.',
        startingPosition: 'Lie face down, hands under your shoulders, elbows close to the ribs.',
        instructions: 'Press gently through your hands to lift your chest, keeping your hips on the floor and your shoulders down.',
        breathing: 'Inhale as you lift, breathe steadily in the hold.',
        commonMistakes: ['Cranking the neck back', 'Hips lifting off the floor'],
        safetyTips: 'Come down if you feel pinching in the lower back.',
        cues: ['Hips stay down', 'Shoulders away from the ears', 'Gentle range'],
      },
      uk: {
        name: 'Поза кобри',
        description: 'Розгинає хребет у протилежний бік від скручувань — природний баланс після роботи на прес.',
        startingPosition: 'Ляжте на живіт, долоні під плечима, лікті притиснуті до ребер.',
        instructions: 'Мʼяко натисніть долонями й підніміть груди, залишаючи таз на підлозі, а плечі опущеними.',
        breathing: 'Вдих на підйомі, рівне дихання в утриманні.',
        commonMistakes: ['Різке закидання голови назад', 'Таз відривається від підлоги'],
        safetyTips: 'Опустіться, якщо відчуваєте защемлення в попереку.',
        cues: ['Таз на підлозі', 'Плечі від вух', 'Мʼяка амплітуда'],
      },
    },
  ),

  defineExercise(
    {
      id: 'calf-stretch', category: 'stretching', bodyParts: ['legs'],
      primaryMuscles: ['calves'], secondaryMuscles: ['hamstrings'],
      difficulty: 'beginner', type: 'per_side', defaultDurationSeconds: 25,
      animationAsset: 'calf-stretch',
    },
    {
      en: {
        name: 'Wall Calf Stretch',
        description: 'Restores ankle range — the quiet limit on how deep you can squat.',
        startingPosition: 'Hands on a wall, one foot back with the leg straight and heel down.',
        instructions: 'Press the back heel into the floor and lean forward until you feel the calf lengthen. Hold and breathe.',
        breathing: 'Slow, even breaths.',
        commonMistakes: ['Back heel lifting', 'Back foot turned outward'],
        cues: ['Heel down', 'Back leg straight', 'Toes facing forward'],
      },
      uk: {
        name: 'Розтяжка литки біля стіни',
        description: 'Повертає рухливість щиколотці — тихому обмежувачу глибини присідання.',
        startingPosition: 'Долоні на стіні, одна стопа позаду, нога пряма, пʼята на підлозі.',
        instructions: 'Притисніть задню пʼяту до підлоги й нахиліться вперед, доки не відчуєте видовження литки. Утримуйте й дихайте.',
        breathing: 'Повільне рівне дихання.',
        commonMistakes: ['Задня пʼята відривається', 'Задня стопа розвернута назовні'],
        cues: ['Пʼята на підлозі', 'Задня нога пряма', 'Носок прямо вперед'],
      },
    },
  ),

  defineExercise(
    {
      id: 'seated-twist-stretch', category: 'stretching', bodyParts: ['back', 'core'],
      primaryMuscles: ['obliques', 'lower_back'], secondaryMuscles: ['glutes'],
      difficulty: 'beginner', type: 'per_side', defaultDurationSeconds: 25,
      animationAsset: 'seated-twist-stretch',
    },
    {
      en: {
        name: 'Seated Spinal Twist',
        description: 'Rotational release for the spine at the end of a session.',
        startingPosition: 'Sit tall with legs extended, then cross one foot over the opposite thigh.',
        instructions: 'Turn your chest toward the crossed knee, using your arm as a gentle lever, and lengthen your spine on each inhale.',
        breathing: 'Inhale to lengthen, exhale to rotate a little further.',
        commonMistakes: ['Slumping the lower back', 'Forcing the twist with the arm'],
        cues: ['Sit tall first', 'Twist from the ribs', 'Never force it'],
      },
      uk: {
        name: 'Скручування сидячи',
        description: 'Ротаційне розслаблення хребта наприкінці тренування.',
        startingPosition: 'Сядьте рівно з випрямленими ногами, потім заведіть одну стопу за протилежне стегно.',
        instructions: 'Розверніть груди до зігнутого коліна, використовуючи руку як мʼякий важіль, і витягуйте хребет на кожному вдиху.',
        breathing: 'Вдих — витягнутись, видих — трохи глибше в поворот.',
        commonMistakes: ['Сутулий поперек', 'Форсування повороту рукою'],
        cues: ['Спершу витягніться', 'Повертайтесь від ребер', 'Ніколи не форсуйте'],
      },
    },
  ),
]
