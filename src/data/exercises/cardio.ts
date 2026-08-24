import { defineExercise } from '../defineExercise'

export const cardio = [
  defineExercise(
    {
      id: 'jumping-jack', category: 'cardio', bodyParts: ['full_body'],
      primaryMuscles: ['cardio'], secondaryMuscles: ['side_delts', 'calves', 'abductors'],
      difficulty: 'beginner', type: 'timer', defaultDurationSeconds: 40,
      animationAsset: 'jumping-jack', easierAlternativeId: 'step-jack',
      alternativeIds: ['step-jack', 'high-knees'],
    },
    {
      en: {
        name: 'Jumping Jacks',
        description: 'The classic full-body warm-up: raises the heart rate in seconds.',
        startingPosition: 'Stand tall, feet together, arms by your sides.',
        instructions: 'Jump your feet wide while sweeping your arms overhead, then jump back together. Keep a steady rhythm.',
        breathing: 'Find a rhythm — roughly one breath every two jumps.',
        commonMistakes: ['Landing flat and loud', 'Arms only going halfway up'],
        safetyTips: 'Downstairs neighbours? Use Step Jacks instead.',
        cues: ['Soft landings', 'Full arm sweep', 'Steady rhythm'],
      },
      uk: {
        name: 'Стрибки «зірочка»',
        description: 'Класична розминка на все тіло: піднімає пульс за лічені секунди.',
        startingPosition: 'Стійте рівно, стопи разом, руки вздовж тіла.',
        instructions: 'Стрибком розставте ноги, одночасно піднімаючи руки над головою, потім стрибком поверніться. Тримайте рівний ритм.',
        breathing: 'Тримайте ритм — приблизно один вдих на два стрибки.',
        commonMistakes: ['Жорстке гучне приземлення', 'Руки піднімаються лише наполовину'],
        safetyTips: 'Сусіди знизу? Використайте крокову «зірочку».',
        cues: ['Мʼяке приземлення', 'Повний мах руками', 'Рівний ритм'],
      },
    },
  ),

  defineExercise(
    {
      id: 'step-jack', category: 'cardio', bodyParts: ['full_body'],
      primaryMuscles: ['cardio'], secondaryMuscles: ['side_delts', 'abductors'],
      difficulty: 'beginner', type: 'timer', defaultDurationSeconds: 40,
      animationAsset: 'step-jack', harderAlternativeId: 'jumping-jack',
    },
    {
      en: {
        name: 'Step Jacks',
        description: 'Jumping jacks without the jump — quiet, joint-friendly, just as effective as a warm-up.',
        startingPosition: 'Stand tall, feet together, arms down.',
        instructions: 'Step one foot out to the side as your arms sweep up, return, then step the other foot out.',
        breathing: 'Breathe in rhythm with the arms.',
        commonMistakes: ['Small steps that stop the heart rate rising', 'Arms staying low'],
        cues: ['Wide step', 'Arms all the way up', 'Keep moving'],
      },
      uk: {
        name: 'Крокова «зірочка»',
        description: 'Та сама «зірочка», але без стрибка — тихо, щадно для суглобів і так само ефективно для розминки.',
        startingPosition: 'Стійте рівно, стопи разом, руки вниз.',
        instructions: 'Відставте одну стопу вбік, одночасно піднімаючи руки, поверніться, потім відставте другу.',
        breathing: 'Дихайте в ритмі рухів рук.',
        commonMistakes: ['Дрібні кроки, від яких пульс не зростає', 'Руки залишаються низько'],
        cues: ['Широкий крок', 'Руки повністю вгору', 'Не зупиняйтесь'],
      },
    },
  ),

  defineExercise(
    {
      id: 'high-knees', category: 'cardio', bodyParts: ['full_body', 'core'],
      primaryMuscles: ['cardio', 'hip_flexors'], secondaryMuscles: ['abs', 'calves'],
      difficulty: 'intermediate', type: 'timer', defaultDurationSeconds: 30,
      animationAsset: 'high-knees', easierAlternativeId: 'march-in-place',
    },
    {
      en: {
        name: 'High Knees',
        description: 'Running on the spot with intent — cardio plus hip flexor work.',
        startingPosition: 'Stand tall, arms bent at your sides, core braced.',
        instructions: 'Drive one knee up to hip height, then the other, staying on the balls of your feet.',
        breathing: 'Quick, rhythmic breathing.',
        commonMistakes: ['Leaning back', 'Knees barely lifting'],
        cues: ['Knees to hip height', 'Stay tall', 'Quick feet'],
      },
      uk: {
        name: 'Біг з високим підйомом колін',
        description: 'Біг на місці з наміром — кардіо плюс робота згиначів стегна.',
        startingPosition: 'Стійте рівно, руки зігнуті, корпус напружений.',
        instructions: 'Піднімайте коліно до рівня тазу, потім друге, залишаючись на подушечках стоп.',
        breathing: 'Швидке ритмічне дихання.',
        commonMistakes: ['Відхилення корпусу назад', 'Коліна майже не піднімаються'],
        cues: ['Коліна до рівня тазу', 'Тримайтесь рівно', 'Швидкі стопи'],
      },
    },
  ),

  defineExercise(
    {
      id: 'march-in-place', category: 'cardio', bodyParts: ['full_body'],
      primaryMuscles: ['cardio'], secondaryMuscles: ['hip_flexors'],
      difficulty: 'beginner', type: 'timer', defaultDurationSeconds: 40,
      animationAsset: 'march-in-place', harderAlternativeId: 'high-knees',
    },
    {
      en: {
        name: 'March in Place',
        description: 'Low-impact movement to raise the temperature before anything harder.',
        startingPosition: 'Stand tall, arms relaxed at your sides.',
        instructions: 'Lift one knee to about hip height while the opposite arm swings forward, then alternate at a walking pace.',
        breathing: 'Relaxed, even breathing.',
        commonMistakes: ['Shuffling instead of lifting', 'Slouching'],
        cues: ['Stand tall', 'Swing the arms', 'Lift the knee'],
      },
      uk: {
        name: 'Ходьба на місці',
        description: 'Низькоударний рух, щоб розігрітися перед складнішим.',
        startingPosition: 'Стійте рівно, руки вільно вздовж тіла.',
        instructions: 'Піднімайте коліно приблизно до рівня тазу, водночас виводячи протилежну руку вперед, і чергуйте в темпі ходьби.',
        breathing: 'Спокійне рівне дихання.',
        commonMistakes: ['Човгання замість підйому коліна', 'Сутула спина'],
        cues: ['Тримайтесь рівно', 'Працюйте руками', 'Піднімайте коліно'],
      },
    },
  ),

  defineExercise(
    {
      id: 'mountain-climber', category: 'cardio', bodyParts: ['core', 'full_body'],
      primaryMuscles: ['abs', 'cardio'], secondaryMuscles: ['front_delts', 'hip_flexors', 'quadriceps'],
      difficulty: 'intermediate', type: 'timer', defaultDurationSeconds: 30,
      animationAsset: 'mountain-climber', easierAlternativeId: 'plank', harderAlternativeId: 'burpee',
    },
    {
      en: {
        name: 'Mountain Climbers',
        description: 'A plank with moving legs — core, shoulders and heart rate all at once.',
        startingPosition: 'High plank, hands under shoulders, body in one line.',
        instructions: 'Drive one knee toward your chest, return it, then the other, keeping your hips low and level.',
        breathing: 'Short, steady breaths in rhythm with the legs.',
        commonMistakes: ['Hips bouncing up and down', 'Hands drifting behind the shoulders', 'Feet slapping the floor'],
        cues: ['Hips low', 'Shoulders over hands', 'Quiet feet'],
      },
      uk: {
        name: 'Скелелаз',
        description: 'Планка з рухом ніг — корпус, плечі й пульс одночасно.',
        startingPosition: 'Висока планка, руки під плечима, тіло в одну лінію.',
        instructions: 'Підтягніть коліно до грудей, поверніть назад, потім друге, тримаючи таз низько й рівно.',
        breathing: 'Короткі рівні вдихи в ритмі рухів ніг.',
        commonMistakes: ['Таз стрибає вгору-вниз', 'Долоні зміщуються за лінію плечей', 'Гучні удари стопами'],
        cues: ['Таз низько', 'Плечі над долонями', 'Тихі стопи'],
      },
    },
  ),

  defineExercise(
    {
      id: 'burpee', category: 'cardio', bodyParts: ['full_body'],
      primaryMuscles: ['cardio', 'quadriceps'], secondaryMuscles: ['chest', 'abs', 'front_delts'],
      difficulty: 'advanced', type: 'repetitions', defaultReps: 10,
      animationAsset: 'burpee', easierAlternativeId: 'squat-thrust',
    },
    {
      en: {
        name: 'Burpees',
        description: 'The hardest thing you can do with no equipment and two square metres.',
        startingPosition: 'Stand tall, feet hip-width apart.',
        instructions: 'Squat down, place your hands, jump your feet back to a plank, do a push-up, jump the feet in and finish with a jump.',
        breathing: 'Exhale on the push-up and the jump.',
        commonMistakes: ['Hips sagging in the plank', 'Skipping the full stand at the top'],
        safetyTips: 'Drop the push-up or the jump before you drop your form.',
        cues: ['Hands down, feet back', 'Tight plank', 'Stand all the way up'],
      },
      uk: {
        name: 'Берпі',
        description: 'Найважче, що можна зробити без інвентарю на двох квадратних метрах.',
        startingPosition: 'Стійте рівно, ноги на ширині тазу.',
        instructions: 'Присядьте, поставте долоні, стрибком відведіть ноги в планку, віджміться, стрибком підтягніть ноги і завершіть вистрибуванням.',
        breathing: 'Видих на віджиманні та на стрибку.',
        commonMistakes: ['Провисання тазу в планці', 'Неповне випрямлення вгорі'],
        safetyTips: 'Прибирайте віджимання або стрибок раніше, ніж техніку.',
        cues: ['Руки вниз, ноги назад', 'Жорстка планка', 'Повне випрямлення вгорі'],
      },
    },
  ),

  defineExercise(
    {
      id: 'squat-thrust', category: 'cardio', bodyParts: ['full_body'],
      primaryMuscles: ['cardio', 'quadriceps'], secondaryMuscles: ['abs', 'front_delts'],
      difficulty: 'intermediate', type: 'repetitions', defaultReps: 12,
      animationAsset: 'squat-thrust', harderAlternativeId: 'burpee',
    },
    {
      en: {
        name: 'Squat Thrust',
        description: 'A burpee without the push-up or the jump — most of the benefit, far less impact.',
        startingPosition: 'Stand tall, feet hip-width apart.',
        instructions: 'Squat, place your hands on the floor, step or jump your feet back to a plank, return them and stand.',
        breathing: 'Exhale as you stand.',
        commonMistakes: ['Hips high in the plank', 'Rounding the back on the way down'],
        cues: ['Flat plank', 'Feet land under the hips', 'Stand tall'],
      },
      uk: {
        name: 'Присід із виходом у планку',
        description: 'Берпі без віджимання і стрибка — майже вся користь при значно меншому ударному навантаженні.',
        startingPosition: 'Стійте рівно, ноги на ширині тазу.',
        instructions: 'Присядьте, поставте долоні на підлогу, кроком або стрибком відведіть ноги в планку, поверніть їх і встаньте.',
        breathing: 'Видих на підйомі.',
        commonMistakes: ['Таз задертий у планці', 'Округлення спини на опусканні'],
        cues: ['Рівна планка', 'Стопи приземляються під таз', 'Встаньте повністю'],
      },
    },
  ),

  defineExercise(
    {
      id: 'skater-hop', category: 'cardio', bodyParts: ['legs', 'full_body'],
      primaryMuscles: ['cardio', 'glutes'], secondaryMuscles: ['quadriceps', 'abductors', 'calves'],
      difficulty: 'intermediate', type: 'timer', defaultDurationSeconds: 30,
      animationAsset: 'skater-hop', easierAlternativeId: 'step-jack',
    },
    {
      en: {
        name: 'Skater Hops',
        description: 'Side-to-side bounds that train balance and the outer hip.',
        startingPosition: 'Stand on one leg with a soft knee, the other foot behind you.',
        instructions: 'Bound sideways onto the other leg, landing softly and holding balance for a beat before bounding back.',
        breathing: 'Steady rhythm, one breath per few hops.',
        commonMistakes: ['Landing stiff-legged', 'Rushing without balancing'],
        cues: ['Land soft', 'Hold the landing', 'Push off sideways'],
      },
      uk: {
        name: 'Ковзанярські стрибки',
        description: 'Бічні стрибки, що тренують баланс і зовнішню частину стегна.',
        startingPosition: 'Стійте на одній нозі з мʼяко зігнутим коліном, друга стопа позаду.',
        instructions: 'Стрибніть убік на другу ногу, приземліться мʼяко й утримайте баланс мить, перш ніж стрибнути назад.',
        breathing: 'Рівний ритм, один вдих на кілька стрибків.',
        commonMistakes: ['Приземлення на пряму ногу', 'Поспіх без утримання балансу'],
        cues: ['Мʼяке приземлення', 'Утримайте баланс', 'Відштовхуйтесь убік'],
      },
    },
  ),

  defineExercise(
    {
      id: 'butt-kick', category: 'cardio', bodyParts: ['legs', 'full_body'],
      primaryMuscles: ['cardio', 'hamstrings'], secondaryMuscles: ['calves'],
      difficulty: 'beginner', type: 'timer', defaultDurationSeconds: 30,
      animationAsset: 'butt-kick', harderAlternativeId: 'high-knees',
    },
    {
      en: {
        name: 'Butt Kicks',
        description: 'Running on the spot that wakes up the hamstrings before harder work.',
        startingPosition: 'Stand tall, arms bent, weight on the balls of your feet.',
        instructions: 'Flick your heels up toward your glutes one at a time, keeping your knees pointing down.',
        breathing: 'Quick rhythmic breathing.',
        commonMistakes: ['Knees drifting forward', 'Leaning forward from the waist'],
        cues: ['Heels to glutes', 'Knees down', 'Stay tall'],
      },
      uk: {
        name: 'Захлест гомілки',
        description: 'Біг на місці, що вмикає задню поверхню стегна перед складнішою роботою.',
        startingPosition: 'Стійте рівно, руки зігнуті, вага на подушечках стоп.',
        instructions: 'По черзі закидайте пʼяти до сідниць, тримаючи коліна спрямованими вниз.',
        breathing: 'Швидке ритмічне дихання.',
        commonMistakes: ['Коліна виходять вперед', 'Нахил корпусу вперед'],
        cues: ['Пʼяти до сідниць', 'Коліна вниз', 'Тримайтесь рівно'],
      },
    },
  ),
]
