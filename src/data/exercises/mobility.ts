import { defineExercise } from '../defineExercise'

export const mobility = [
  defineExercise(
    {
      id: 'arm-circle', category: 'mobility', bodyParts: ['shoulders'],
      primaryMuscles: ['side_delts', 'front_delts'], secondaryMuscles: ['traps'],
      difficulty: 'beginner', type: 'timer', defaultDurationSeconds: 30,
      animationAsset: 'arm-circle',
    },
    {
      en: {
        name: 'Arm Circles',
        description: 'Warms the shoulder joint through its full circle before any pressing.',
        startingPosition: 'Stand tall, arms out to the sides at shoulder height.',
        instructions: 'Draw small circles forward, growing them gradually, then reverse direction halfway through.',
        breathing: 'Relaxed, continuous breathing.',
        commonMistakes: ['Shrugging the shoulders', 'Starting with big fast circles'],
        cues: ['Small to large', 'Shoulders down', 'Reverse halfway'],
      },
      uk: {
        name: 'Кола руками',
        description: 'Розігріває плечовий суглоб по повному колу перед будь-якими жимами.',
        startingPosition: 'Стійте рівно, руки в сторони на рівні плечей.',
        instructions: 'Малюйте невеликі кола вперед, поступово збільшуючи, а на половині часу змініть напрямок.',
        breathing: 'Спокійне безперервне дихання.',
        commonMistakes: ['Плечі піднімаються до вух', 'Починаєте з великих швидких кіл'],
        cues: ['Від малих до великих', 'Плечі вниз', 'Зміна напрямку на половині'],
      },
    },
  ),

  defineExercise(
    {
      id: 'hip-rotation', category: 'mobility', bodyParts: ['legs', 'core'],
      primaryMuscles: ['hip_flexors', 'glutes'], secondaryMuscles: ['obliques'],
      difficulty: 'beginner', type: 'timer', defaultDurationSeconds: 30,
      animationAsset: 'hip-rotation',
    },
    {
      en: {
        name: 'Hip Rotation',
        description: 'Loosens the hip joint in the circle squats and lunges never reach.',
        startingPosition: 'Stand tall, hands on hips, weight on one leg.',
        instructions: 'Lift one knee to hip height and draw a slow circle outward with it, then swap sides halfway through.',
        breathing: 'Relaxed breathing throughout.',
        commonMistakes: ['Leaning the torso to gain range', 'Rushing the circle'],
        cues: ['Knee leads the circle', 'Torso still', 'Slow and wide'],
      },
      uk: {
        name: 'Обертання стегном',
        description: 'Розкриває тазостегновий суглоб по колу, до якого не дістають ані присідання, ані випади.',
        startingPosition: 'Стійте рівно, руки на поясі, вага на одній нозі.',
        instructions: 'Підніміть коліно до рівня тазу й повільно малюйте ним коло назовні, змінивши ногу на половині часу.',
        breathing: 'Спокійне дихання протягом вправи.',
        commonMistakes: ['Нахил корпусу заради амплітуди', 'Занадто швидке коло'],
        cues: ['Коліно веде коло', 'Корпус нерухомий', 'Повільно й широко'],
      },
    },
  ),

  defineExercise(
    {
      id: 'cat-cow', category: 'mobility', bodyParts: ['back', 'core'],
      primaryMuscles: ['lower_back'], secondaryMuscles: ['abs', 'traps'],
      difficulty: 'beginner', type: 'timer', defaultDurationSeconds: 40,
      animationAsset: 'cat-cow',
    },
    {
      en: {
        name: 'Cat-Cow',
        description: 'Segment-by-segment spinal movement — the best first minute of any session.',
        startingPosition: 'On all fours, hands under shoulders, knees under hips.',
        instructions: 'Round your back toward the ceiling and drop your head, then reverse: chest forward, tailbone up, eyes ahead.',
        breathing: 'Exhale as you round, inhale as you arch.',
        commonMistakes: ['Moving only the lower back', 'Rushing between positions'],
        cues: ['Move one vertebra at a time', 'Follow the breath', 'Full range both ways'],
      },
      uk: {
        name: 'Кішка-корова',
        description: 'Посегментний рух хребта — найкраща перша хвилина будь-якого тренування.',
        startingPosition: 'Упор на чотирьох, руки під плечима, коліна під тазом.',
        instructions: 'Округліть спину до стелі й опустіть голову, потім навпаки: груди вперед, куприк вгору, погляд перед собою.',
        breathing: 'Видих на округленні, вдих на прогині.',
        commonMistakes: ['Рухається лише поперек', 'Занадто швидка зміна положень'],
        cues: ['Рухайтесь хребець за хребцем', 'Слідуйте за диханням', 'Повна амплітуда в обидва боки'],
      },
    },
  ),

  defineExercise(
    {
      id: 'torso-twist', category: 'mobility', bodyParts: ['core', 'back'],
      primaryMuscles: ['obliques'], secondaryMuscles: ['lower_back'],
      difficulty: 'beginner', type: 'timer', defaultDurationSeconds: 30,
      animationAsset: 'torso-twist',
    },
    {
      en: {
        name: 'Standing Torso Twist',
        description: 'Wakes up rotation before any twisting or throwing movement.',
        startingPosition: 'Feet shoulder-width apart, knees soft, arms bent in front of your chest.',
        instructions: 'Rotate your upper body left and right, letting your arms follow, while your hips stay facing forward.',
        breathing: 'Exhale into each rotation.',
        commonMistakes: ['Hips turning with the shoulders', 'Swinging hard at end range'],
        cues: ['Hips forward', 'Turn from the ribs', 'Smooth, not forced'],
      },
      uk: {
        name: 'Повороти корпусу стоячи',
        description: 'Вмикає ротацію перед будь-якими скручуваннями чи кидковими рухами.',
        startingPosition: 'Ноги на ширині плечей, коліна мʼякі, руки зігнуті перед грудьми.',
        instructions: 'Повертайте верх тіла вліво й вправо, руки йдуть за корпусом, а таз залишається спрямованим вперед.',
        breathing: 'Видих на кожному повороті.',
        commonMistakes: ['Таз обертається разом із плечима', 'Різкі ривки в крайній точці'],
        cues: ['Таз вперед', 'Повертайтесь від ребер', 'Плавно, без ривків'],
      },
    },
  ),

  defineExercise(
    {
      id: 'leg-swing', category: 'mobility', bodyParts: ['legs'],
      primaryMuscles: ['hamstrings', 'hip_flexors'], secondaryMuscles: ['glutes'],
      difficulty: 'beginner', type: 'per_side', defaultDurationSeconds: 20,
      animationAsset: 'leg-swing',
    },
    {
      en: {
        name: 'Leg Swings',
        description: 'Dynamic range for the hips — better than static stretching before training.',
        startingPosition: 'Stand beside a wall, one hand on it for balance.',
        instructions: 'Swing one leg forward and back in a controlled arc, letting the range grow with each swing.',
        breathing: 'Relaxed, continuous breathing.',
        commonMistakes: ['Arching the lower back to swing higher', 'Uncontrolled momentum'],
        cues: ['Tall torso', 'Grow the range slowly', 'Stay relaxed'],
      },
      uk: {
        name: 'Махи ногою',
        description: 'Динамічна амплітуда для стегон — краще за статичну розтяжку перед тренуванням.',
        startingPosition: 'Станьте біля стіни, однією рукою тримайтесь за неї.',
        instructions: 'Виконуйте контрольовані махи ногою вперед-назад, поступово збільшуючи амплітуду.',
        breathing: 'Спокійне безперервне дихання.',
        commonMistakes: ['Прогин у попереку заради висоти маху', 'Неконтрольована інерція'],
        cues: ['Корпус рівно', 'Збільшуйте амплітуду поступово', 'Залишайтесь розслабленими'],
      },
    },
  ),

  defineExercise(
    {
      id: 'inchworm', category: 'mobility', bodyParts: ['full_body', 'core'],
      primaryMuscles: ['hamstrings', 'abs'], secondaryMuscles: ['front_delts', 'chest'],
      difficulty: 'intermediate', type: 'repetitions', defaultReps: 8,
      animationAsset: 'inchworm', easierAlternativeId: 'cat-cow',
    },
    {
      en: {
        name: 'Inchworm',
        description: 'One movement that stretches the hamstrings and loads the core and shoulders.',
        startingPosition: 'Stand tall, feet hip-width apart.',
        instructions: 'Hinge forward, place your hands on the floor and walk them out to a plank. Pause, then walk them back and stand.',
        breathing: 'Exhale as you walk out, inhale as you walk back.',
        commonMistakes: ['Hips sagging at the plank', 'Bouncing to reach the floor'],
        cues: ['Bend the knees if needed', 'Tight plank', 'Walk, do not jump'],
      },
      uk: {
        name: 'Гусениця',
        description: 'Один рух, що розтягує задню поверхню стегна й навантажує корпус і плечі.',
        startingPosition: 'Стійте рівно, ноги на ширині тазу.',
        instructions: 'Нахиліться, поставте долоні на підлогу й крокуйте руками до планки. Пауза — і поверніться руками назад, встаньте.',
        breathing: 'Видих на русі вперед, вдих на поверненні.',
        commonMistakes: ['Провисання тазу в планці', 'Пружинисті нахили до підлоги'],
        cues: ['За потреби зігніть коліна', 'Жорстка планка', 'Крокуйте, не стрибайте'],
      },
    },
  ),

  defineExercise(
    {
      id: 'neck-roll', category: 'mobility', bodyParts: ['shoulders'],
      primaryMuscles: ['neck'], secondaryMuscles: ['traps'],
      difficulty: 'beginner', type: 'timer', defaultDurationSeconds: 20,
      animationAsset: 'neck-roll',
    },
    {
      en: {
        name: 'Neck Rolls',
        description: 'Releases the neck and upper traps in twenty seconds.',
        startingPosition: 'Stand or sit tall, shoulders relaxed and down.',
        instructions: 'Drop one ear toward the shoulder and roll the chin slowly across the chest to the other side, then back.',
        breathing: 'Slow, deep breaths.',
        commonMistakes: ['Rolling the head backwards', 'Moving fast'],
        safetyTips: 'Never roll the head backwards — go ear to chest to ear only.',
        cues: ['Slow and small', 'Shoulders down', 'Front half only'],
      },
      uk: {
        name: 'Обертання шиєю',
        description: 'Знімає напругу з шиї та верхніх трапецій за двадцять секунд.',
        startingPosition: 'Стійте або сидіть рівно, плечі розслаблені й опущені.',
        instructions: 'Нахиліть вухо до плеча й повільно перекотіть підборіддя через груди до іншого плеча, потім назад.',
        breathing: 'Повільне глибоке дихання.',
        commonMistakes: ['Закидання голови назад', 'Швидкі рухи'],
        safetyTips: 'Ніколи не закидайте голову назад — рухайтесь лише від вуха через груди до вуха.',
        cues: ['Повільно й невелика амплітуда', 'Плечі вниз', 'Тільки передня півсфера'],
      },
    },
  ),
]
