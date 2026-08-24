import { defineExercise } from '../defineExercise'

export const legs = [
  defineExercise(
    {
      id: 'squat', category: 'strength', bodyParts: ['legs', 'glutes'],
      primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['hamstrings', 'abs'],
      difficulty: 'beginner', type: 'repetitions', defaultReps: 12, tempo: '3-1-1',
      animationAsset: 'squat', easierAlternativeId: 'chair-squat', harderAlternativeId: 'jump-squat',
      alternativeIds: ['sumo-squat', 'wall-sit'],
    },
    {
      en: {
        name: 'Bodyweight Squat',
        description: 'The foundation of lower-body training: hips and knees bend together under control.',
        startingPosition: 'Stand with feet shoulder-width apart, toes turned out slightly, chest tall and core braced.',
        instructions: 'Push your hips back and bend your knees until your thighs reach roughly parallel to the floor. Keep your weight over your mid-foot, then drive up through the whole foot to stand.',
        breathing: 'Inhale as you lower, exhale as you stand back up.',
        rangeOfMotion: 'Thighs to parallel, or as deep as you can go without the lower back rounding.',
        commonMistakes: ['Knees collapsing inward', 'Lower back rounding at the bottom', 'Heels lifting off the floor', 'Dropping down too fast'],
        safetyTips: 'If your knees hurt, reduce depth before reducing reps.',
        cues: ['Chest up', 'Knees track over toes', 'Push the floor away', 'Brace your core'],
      },
      uk: {
        name: 'Присідання',
        description: 'Базова вправа для низу тіла: стегна й коліна згинаються синхронно й підконтрольно.',
        startingPosition: 'Стійте, ноги на ширині плечей, носки трохи назовні, груди розкриті, корпус напружений.',
        instructions: 'Відведіть таз назад і згинайте коліна, доки стегна не будуть приблизно паралельні підлозі. Вага — на середині стопи, потім потужно виштовхніться вгору всією стопою.',
        breathing: 'Вдих на опусканні, видих на підйомі.',
        rangeOfMotion: 'Стегна до паралелі або настільки глибоко, наскільки поперек не округлюється.',
        commonMistakes: ['Коліна завалюються всередину', 'Поперек округлюється внизу', 'Пʼяти відриваються від підлоги', 'Занадто швидке опускання'],
        safetyTips: 'Якщо болять коліна — спершу зменшуйте глибину, а не кількість повторень.',
        cues: ['Груди вгору', 'Коліна за носками', 'Відштовхуйте підлогу', 'Напружте корпус'],
      },
    },
  ),

  defineExercise(
    {
      id: 'chair-squat', category: 'strength', bodyParts: ['legs', 'glutes'],
      primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['hamstrings'],
      difficulty: 'beginner', type: 'repetitions', defaultReps: 10, tempo: '3-1-1',
      animationAsset: 'chair-squat', harderAlternativeId: 'squat',
    },
    {
      en: {
        name: 'Chair Squat',
        description: 'A squat with a target behind you — the chair sets the depth and removes the fear of falling.',
        startingPosition: 'Stand in front of a chair, feet shoulder-width apart, arms forward for balance.',
        instructions: 'Sit back until you lightly touch the seat, then stand straight up without rocking forward.',
        breathing: 'Inhale as you sit back, exhale as you stand.',
        commonMistakes: ['Dropping onto the seat', 'Leaning far forward to stand up'],
        cues: ['Sit back, not down', 'Touch, do not rest', 'Stand tall'],
      },
      uk: {
        name: 'Присідання до стільця',
        description: 'Присідання з орієнтиром позаду — стілець задає глибину і прибирає страх падіння.',
        startingPosition: 'Станьте перед стільцем, ноги на ширині плечей, руки вперед для балансу.',
        instructions: 'Сідайте назад, доки легко не торкнетесь сидіння, потім встаньте без розгойдування вперед.',
        breathing: 'Вдих на опусканні, видих на підйомі.',
        commonMistakes: ['Падіння на сидіння', 'Сильний нахил вперед на підйомі'],
        cues: ['Таз назад, не вниз', 'Торкнутись, не сідати', 'Встаньте рівно'],
      },
    },
  ),

  defineExercise(
    {
      id: 'jump-squat', category: 'cardio', bodyParts: ['legs', 'glutes'],
      primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['calves', 'hamstrings'],
      difficulty: 'advanced', type: 'repetitions', defaultReps: 12,
      animationAsset: 'jump-squat', easierAlternativeId: 'squat',
    },
    {
      en: {
        name: 'Jump Squat',
        description: 'An explosive squat that adds power and raises the heart rate fast.',
        startingPosition: 'Feet shoulder-width apart, arms at your sides, core braced.',
        instructions: 'Drop into a half squat, then jump as high as you can. Land softly on the balls of your feet and flow straight into the next rep.',
        breathing: 'Exhale on the jump, inhale as you reset.',
        commonMistakes: ['Landing with straight legs', 'Loud, heavy landings', 'Knees caving on landing'],
        safetyTips: 'Skip this one on hard floors without shoes, or if your knees are sensitive.',
        cues: ['Land soft', 'Absorb through the hips', 'Reset before the next jump'],
      },
      uk: {
        name: 'Присідання зі стрибком',
        description: 'Вибухове присідання: додає потужність і швидко піднімає пульс.',
        startingPosition: 'Ноги на ширині плечей, руки вздовж тіла, корпус напружений.',
        instructions: 'Опустіться в напівприсід і вистрибніть якнайвище. Приземляйтесь мʼяко на подушечки стоп і одразу переходьте в наступне повторення.',
        breathing: 'Видих на стрибку, вдих під час повернення.',
        commonMistakes: ['Приземлення на прямі ноги', 'Гучне важке приземлення', 'Коліна завалюються при приземленні'],
        safetyTips: 'Пропустіть цю вправу на твердій підлозі без взуття або якщо коліна чутливі.',
        cues: ['Мʼяке приземлення', 'Амортизуйте стегнами', 'Стабілізуйтесь перед стрибком'],
      },
    },
  ),

  defineExercise(
    {
      id: 'sumo-squat', category: 'strength', bodyParts: ['legs', 'glutes'],
      primaryMuscles: ['quadriceps', 'adductors'], secondaryMuscles: ['glutes', 'abs'],
      difficulty: 'beginner', type: 'repetitions', defaultReps: 12, tempo: '3-1-1',
      animationAsset: 'sumo-squat', easierAlternativeId: 'chair-squat',
    },
    {
      en: {
        name: 'Sumo Squat',
        description: 'A wide-stance squat that shifts load onto the inner thighs and glutes.',
        startingPosition: 'Feet wider than shoulders, toes turned out about 45 degrees.',
        instructions: 'Lower straight down between your heels, keeping your torso upright, then squeeze your glutes to stand.',
        breathing: 'Inhale down, exhale up.',
        commonMistakes: ['Knees rolling inward', 'Leaning forward instead of sinking down'],
        cues: ['Knees out', 'Torso upright', 'Squeeze at the top'],
      },
      uk: {
        name: 'Присідання сумо',
        description: 'Присідання в широкій стійці — навантаження зміщується на внутрішню поверхню стегна й сідниці.',
        startingPosition: 'Ноги ширше плечей, носки розвернуті приблизно на 45 градусів.',
        instructions: 'Опускайтесь строго вниз між пʼятами, тримаючи корпус вертикально, потім встаньте, стиснувши сідниці.',
        breathing: 'Вдих вниз, видих вгору.',
        commonMistakes: ['Коліна завалюються всередину', 'Нахил вперед замість опускання вниз'],
        cues: ['Коліна назовні', 'Корпус вертикально', 'Стисніть сідниці вгорі'],
      },
    },
  ),

  defineExercise(
    {
      id: 'reverse-lunge', category: 'strength', bodyParts: ['legs', 'glutes'],
      primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['hamstrings', 'abs'],
      difficulty: 'beginner', type: 'per_side', defaultReps: 10, tempo: '2-1-1',
      animationAsset: 'reverse-lunge', harderAlternativeId: 'split-squat',
      alternativeIds: ['squat', 'glute-bridge'],
    },
    {
      en: {
        name: 'Reverse Lunge',
        description: 'Stepping back is kinder to the knees than stepping forward, and easier to balance.',
        startingPosition: 'Stand tall, feet hip-width apart, hands on hips.',
        instructions: 'Step one foot back and lower until both knees are near 90 degrees. Push through the front heel to return to standing.',
        breathing: 'Inhale as you step back, exhale as you return.',
        rangeOfMotion: 'Back knee close to the floor without banging into it.',
        commonMistakes: ['Front knee sliding past the toes', 'Torso collapsing forward', 'Landing the back foot too close'],
        cues: ['Long step back', 'Chest proud', 'Drive through the front heel'],
      },
      uk: {
        name: 'Зворотний випад',
        description: 'Крок назад щадить коліна більше, ніж крок вперед, і легше утримувати баланс.',
        startingPosition: 'Стійте рівно, ноги на ширині тазу, руки на поясі.',
        instructions: 'Зробіть крок назад і опустіться, доки обидва коліна не будуть близько 90 градусів. Виштовхніться передньою пʼятою назад у стійку.',
        breathing: 'Вдих на кроці назад, видих на поверненні.',
        rangeOfMotion: 'Заднє коліно майже торкається підлоги, але без удару.',
        commonMistakes: ['Переднє коліно виходить за носок', 'Корпус завалюється вперед', 'Занадто короткий крок назад'],
        cues: ['Довгий крок назад', 'Груди розкриті', 'Тисніть передньою пʼятою'],
      },
    },
  ),

  defineExercise(
    {
      id: 'split-squat', category: 'strength', bodyParts: ['legs', 'glutes'],
      primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['hamstrings', 'abs'],
      difficulty: 'intermediate', type: 'per_side', defaultReps: 10, tempo: '3-1-1',
      animationAsset: 'split-squat', easierAlternativeId: 'reverse-lunge',
    },
    {
      en: {
        name: 'Split Squat',
        description: 'A lunge held in place — more load per leg, no stepping to manage.',
        startingPosition: 'Take a long stride, back heel lifted, both feet pointing forward.',
        instructions: 'Lower straight down until the back knee nearly touches, then push back up without moving your feet.',
        breathing: 'Inhale down, exhale up.',
        commonMistakes: ['Stance too short', 'Torso leaning over the front knee'],
        cues: ['Straight up and down', 'Weight in the front leg', 'Hips square'],
      },
      uk: {
        name: 'Спліт-присідання',
        description: 'Випад на місці — більше навантаження на ногу і не треба керувати кроком.',
        startingPosition: 'Зробіть довгий крок, задня пʼята піднята, обидві стопи дивляться вперед.',
        instructions: 'Опускайтесь строго вниз, доки заднє коліно майже не торкнеться підлоги, потім піднімайтесь, не рухаючи стопами.',
        breathing: 'Вдих вниз, видих вгору.',
        commonMistakes: ['Занадто коротка стійка', 'Нахил корпусу на переднє коліно'],
        cues: ['Строго вгору-вниз', 'Вага на передній нозі', 'Таз рівно'],
      },
    },
  ),

  defineExercise(
    {
      id: 'curtsy-lunge', category: 'strength', bodyParts: ['legs', 'glutes'],
      primaryMuscles: ['glutes', 'quadriceps'], secondaryMuscles: ['abductors', 'abs'],
      difficulty: 'intermediate', type: 'per_side', defaultReps: 10,
      animationAsset: 'curtsy-lunge', easierAlternativeId: 'reverse-lunge',
    },
    {
      en: {
        name: 'Curtsy Lunge',
        description: 'A crossing lunge that loads the side of the glute most squats miss.',
        startingPosition: 'Stand tall, hands at your chest, feet hip-width apart.',
        instructions: 'Step one foot diagonally behind the other and bend both knees, then return to standing.',
        breathing: 'Inhale as you cross back, exhale as you return.',
        commonMistakes: ['Hips rotating with the step', 'Front knee caving inward'],
        cues: ['Hips stay square', 'Front knee out', 'Controlled cross'],
      },
      uk: {
        name: 'Реверанс-випад',
        description: 'Перехресний випад, що навантажує бічну частину сідниці, яку присідання майже не чіпають.',
        startingPosition: 'Стійте рівно, руки біля грудей, ноги на ширині тазу.',
        instructions: 'Зробіть крок по діагоналі назад за іншу ногу, зігніть обидва коліна, потім поверніться.',
        breathing: 'Вдих на кроці, видих на поверненні.',
        commonMistakes: ['Таз розвертається за кроком', 'Переднє коліно завалюється всередину'],
        cues: ['Таз рівно', 'Переднє коліно назовні', 'Контрольований крок'],
      },
    },
  ),

  defineExercise(
    {
      id: 'wall-sit', category: 'strength', bodyParts: ['legs'],
      primaryMuscles: ['quadriceps'], secondaryMuscles: ['glutes', 'calves'],
      difficulty: 'beginner', type: 'hold', defaultDurationSeconds: 40,
      animationAsset: 'wall-sit', harderAlternativeId: 'squat',
    },
    {
      en: {
        name: 'Wall Sit',
        description: 'An isometric hold that builds quad endurance with zero impact.',
        startingPosition: 'Back flat against a wall, feet a step forward, hip-width apart.',
        instructions: 'Slide down until your thighs are parallel to the floor and hold, knees stacked over ankles.',
        breathing: 'Breathe steadily — never hold your breath in an isometric.',
        commonMistakes: ['Hips higher than knees', 'Hands resting on the thighs', 'Holding the breath'],
        cues: ['Thighs parallel', 'Back flat on the wall', 'Keep breathing'],
      },
      uk: {
        name: 'Стільчик біля стіни',
        description: 'Ізометричне утримання: розвиває витривалість квадрицепса без ударного навантаження.',
        startingPosition: 'Спина щільно до стіни, стопи на крок вперед, на ширині тазу.',
        instructions: 'Зісковзніть вниз, доки стегна не стануть паралельні підлозі, і утримуйте; коліна над щиколотками.',
        breathing: 'Дихайте рівно — в ізометрії не затримуйте дихання.',
        commonMistakes: ['Таз вище колін', 'Руки спираються на стегна', 'Затримка дихання'],
        cues: ['Стегна паралельно', 'Спина щільно до стіни', 'Дихайте'],
      },
    },
  ),

  defineExercise(
    {
      id: 'glute-bridge', category: 'strength', bodyParts: ['glutes', 'legs'],
      primaryMuscles: ['glutes'], secondaryMuscles: ['hamstrings', 'lower_back'],
      difficulty: 'beginner', type: 'repetitions', defaultReps: 15, tempo: '2-1-2',
      animationAsset: 'glute-bridge', harderAlternativeId: 'single-leg-bridge',
    },
    {
      en: {
        name: 'Glute Bridge',
        description: 'The simplest way to teach the glutes to fire instead of the lower back.',
        startingPosition: 'Lie on your back, knees bent, feet flat and hip-width apart, arms by your sides.',
        instructions: 'Press through your heels and lift your hips until your body forms a straight line from knees to shoulders. Pause, then lower under control.',
        breathing: 'Exhale as you lift, inhale as you lower.',
        commonMistakes: ['Arching the lower back at the top', 'Pushing through the toes', 'Rushing the lowering phase'],
        cues: ['Squeeze the glutes', 'Ribs down', 'Push through the heels'],
      },
      uk: {
        name: 'Сідничний міст',
        description: 'Найпростіший спосіб навчити сідниці працювати замість попереку.',
        startingPosition: 'Ляжте на спину, коліна зігнуті, стопи на підлозі на ширині тазу, руки вздовж тіла.',
        instructions: 'Тисніть пʼятами і піднімайте таз, доки тіло не утворить пряму лінію від колін до плечей. Пауза — і підконтрольно опустіться.',
        breathing: 'Видих на підйомі, вдих на опусканні.',
        commonMistakes: ['Прогин у попереку вгорі', 'Тиск носками замість пʼят', 'Швидке опускання'],
        cues: ['Стисніть сідниці', 'Ребра вниз', 'Тисніть пʼятами'],
      },
    },
  ),

  defineExercise(
    {
      id: 'single-leg-bridge', category: 'strength', bodyParts: ['glutes', 'legs'],
      primaryMuscles: ['glutes'], secondaryMuscles: ['hamstrings', 'abs'],
      difficulty: 'intermediate', type: 'per_side', defaultReps: 10,
      animationAsset: 'single-leg-bridge', easierAlternativeId: 'glute-bridge',
    },
    {
      en: {
        name: 'Single-Leg Glute Bridge',
        description: 'One leg does the work, so side-to-side differences stop hiding.',
        startingPosition: 'Lie on your back, one knee bent with the foot planted, the other leg extended.',
        instructions: 'Drive through the planted heel to lift your hips level, hold briefly, then lower without dropping.',
        breathing: 'Exhale up, inhale down.',
        commonMistakes: ['Hips tilting to one side', 'Arching the lower back'],
        cues: ['Level hips', 'Ribs down', 'Slow on the way down'],
      },
      uk: {
        name: 'Сідничний міст на одній нозі',
        description: 'Працює одна нога — різниця між сторонами одразу стає помітною.',
        startingPosition: 'Ляжте на спину, одне коліно зігнуте зі стопою на підлозі, друга нога випрямлена.',
        instructions: 'Тисніть опорною пʼятою, піднімаючи таз рівно, коротка пауза — і підконтрольне опускання.',
        breathing: 'Видих вгору, вдих вниз.',
        commonMistakes: ['Таз перекошується вбік', 'Прогин у попереку'],
        cues: ['Таз рівно', 'Ребра вниз', 'Повільно вниз'],
      },
    },
  ),

  defineExercise(
    {
      id: 'donkey-kick', category: 'strength', bodyParts: ['glutes'],
      primaryMuscles: ['glutes'], secondaryMuscles: ['hamstrings', 'lower_back'],
      difficulty: 'beginner', type: 'per_side', defaultReps: 12,
      animationAsset: 'donkey-kick', harderAlternativeId: 'single-leg-bridge',
    },
    {
      en: {
        name: 'Donkey Kick',
        description: 'A small, precise glute movement — quality beats range here.',
        startingPosition: 'On all fours, hands under shoulders, knees under hips, back flat.',
        instructions: 'Keeping the knee bent, press one heel toward the ceiling until the thigh is in line with your torso, then lower.',
        breathing: 'Exhale as you press up, inhale as you lower.',
        commonMistakes: ['Arching the lower back to gain height', 'Rotating the hips open'],
        cues: ['Heel to the ceiling', 'Hips square', 'Small range, hard squeeze'],
      },
      uk: {
        name: 'Мах ногою назад',
        description: 'Невеликий точний рух для сідниць — тут якість важливіша за амплітуду.',
        startingPosition: 'Упор на чотирьох, руки під плечима, коліна під тазом, спина рівна.',
        instructions: 'Не розгинаючи коліна, тисніть пʼяту до стелі, доки стегно не стане в лінію з корпусом, потім опустіть.',
        breathing: 'Видих на підйомі, вдих на опусканні.',
        commonMistakes: ['Прогин у попереку заради висоти', 'Розворот тазу'],
        cues: ['Пʼята до стелі', 'Таз рівно', 'Мала амплітуда, сильне стиснення'],
      },
    },
  ),

  defineExercise(
    {
      id: 'fire-hydrant', category: 'strength', bodyParts: ['glutes'],
      primaryMuscles: ['glutes', 'abductors'], secondaryMuscles: ['abs'],
      difficulty: 'beginner', type: 'per_side', defaultReps: 12,
      animationAsset: 'fire-hydrant', harderAlternativeId: 'curtsy-lunge',
    },
    {
      en: {
        name: 'Fire Hydrant',
        description: 'Targets the side glute that stabilises the hip when you walk and run.',
        startingPosition: 'On all fours, spine neutral, core lightly braced.',
        instructions: 'Lift one knee out to the side, keeping it bent, until you feel the outer hip working. Lower without touching down.',
        breathing: 'Exhale as you lift, inhale as you lower.',
        commonMistakes: ['Leaning away to lift higher', 'Letting the back sag'],
        cues: ['Open from the hip', 'Shoulders level', 'Controlled lift'],
      },
      uk: {
        name: 'Відведення стегна в упорі',
        description: 'Навантажує бічну сідницю, яка стабілізує таз при ходьбі та бігу.',
        startingPosition: 'Упор на чотирьох, спина нейтральна, корпус злегка напружений.',
        instructions: 'Піднімайте зігнуте коліно вбік, доки не відчуєте роботу зовнішньої частини стегна. Опускайте, не торкаючись підлоги.',
        breathing: 'Видих на підйомі, вдих на опусканні.',
        commonMistakes: ['Нахил корпусу заради висоти', 'Провисання спини'],
        cues: ['Відкривайте від стегна', 'Плечі рівно', 'Контрольований підйом'],
      },
    },
  ),

  defineExercise(
    {
      id: 'calf-raise', category: 'strength', bodyParts: ['legs'],
      primaryMuscles: ['calves'], secondaryMuscles: [],
      difficulty: 'beginner', type: 'repetitions', defaultReps: 20, tempo: '2-1-2',
      animationAsset: 'calf-raise',
    },
    {
      en: {
        name: 'Calf Raise',
        description: 'Strengthens the ankles and calves that absorb every landing.',
        startingPosition: 'Stand tall, feet hip-width apart, fingertips on a wall for balance.',
        instructions: 'Rise onto the balls of your feet as high as you can, pause at the top, then lower slowly until the heels touch.',
        breathing: 'Exhale up, inhale down.',
        commonMistakes: ['Bouncing through the reps', 'Rolling onto the outside of the foot'],
        cues: ['All the way up', 'Pause at the top', 'Slow heels down'],
      },
      uk: {
        name: 'Підйом на носки',
        description: 'Зміцнює литки й щиколотки, які амортизують кожне приземлення.',
        startingPosition: 'Стійте рівно, ноги на ширині тазу, пальці рук торкаються стіни для балансу.',
        instructions: 'Піднімайтесь на подушечки стоп якомога вище, пауза вгорі, потім повільно опускайтесь, доки пʼяти не торкнуться підлоги.',
        breathing: 'Видих вгору, вдих вниз.',
        commonMistakes: ['Пружинисті повторення', 'Завалювання на зовнішній край стопи'],
        cues: ['До максимуму вгору', 'Пауза вгорі', 'Повільно вниз'],
      },
    },
  ),

  defineExercise(
    {
      id: 'good-morning', category: 'strength', bodyParts: ['legs', 'back'],
      primaryMuscles: ['hamstrings', 'lower_back'], secondaryMuscles: ['glutes'],
      difficulty: 'intermediate', type: 'repetitions', defaultReps: 12, tempo: '3-0-2',
      animationAsset: 'good-morning', easierAlternativeId: 'glute-bridge',
    },
    {
      en: {
        name: 'Good Morning',
        description: 'A hip hinge that teaches you to bend from the hips, not the spine.',
        startingPosition: 'Feet hip-width apart, knees softly bent, hands behind your head.',
        instructions: 'Push your hips back and lower your chest toward the floor with a flat back, until you feel a stretch in the hamstrings. Squeeze your glutes to stand.',
        breathing: 'Inhale as you hinge, exhale as you stand.',
        commonMistakes: ['Rounding the back', 'Bending the knees instead of the hips'],
        safetyTips: 'Stop the descent the moment your back starts to round.',
        cues: ['Hips back', 'Flat back', 'Feel the hamstrings'],
      },
      uk: {
        name: 'Нахил «доброго ранку»',
        description: 'Тазостегновий шарнір, який вчить нахилятися від стегон, а не від хребта.',
        startingPosition: 'Ноги на ширині тазу, коліна злегка зігнуті, руки за головою.',
        instructions: 'Відводьте таз назад і опускайте груди до підлоги з рівною спиною, доки не відчуєте розтяг задньої поверхні стегна. Встаньте, стиснувши сідниці.',
        breathing: 'Вдих на нахилі, видих на підйомі.',
        commonMistakes: ['Округлення спини', 'Згинання колін замість роботи тазом'],
        safetyTips: 'Зупиняйте нахил, щойно спина починає округлюватись.',
        cues: ['Таз назад', 'Спина рівна', 'Відчуйте задню поверхню стегна'],
      },
    },
  ),
]
