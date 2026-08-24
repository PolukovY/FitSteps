import { defineExercise } from '../defineExercise'

export const core = [
  defineExercise(
    {
      id: 'plank', category: 'strength', bodyParts: ['core'],
      primaryMuscles: ['abs'], secondaryMuscles: ['obliques', 'front_delts', 'glutes'],
      difficulty: 'beginner', type: 'hold', defaultDurationSeconds: 40,
      animationAsset: 'plank', easierAlternativeId: 'knee-plank', harderAlternativeId: 'plank-up-down',
      alternativeIds: ['side-plank', 'dead-bug'],
    },
    {
      en: {
        name: 'Plank',
        description: 'A hold that trains the core to keep your spine still under load.',
        startingPosition: 'Forearms on the floor, elbows under shoulders, legs straight, feet hip-width apart.',
        instructions: 'Lift your hips into a straight line from heels to head and hold, squeezing glutes and abs the whole time.',
        breathing: 'Breathe slowly and evenly — never hold your breath.',
        rangeOfMotion: 'No movement: the quality is in the line, not the duration.',
        commonMistakes: ['Hips sagging toward the floor', 'Hips piking up to rest', 'Holding the breath', 'Chin poking forward'],
        safetyTips: 'End the set when the line breaks, not when the timer does.',
        cues: ['Squeeze the glutes', 'Ribs down', 'Long neck', 'Breathe'],
      },
      uk: {
        name: 'Планка',
        description: 'Утримання, яке вчить корпус тримати хребет нерухомим під навантаженням.',
        startingPosition: 'Передпліччя на підлозі, лікті під плечима, ноги прямі, стопи на ширині тазу.',
        instructions: 'Підніміть таз у пряму лінію від пʼят до голови й утримуйте, постійно стискаючи сідниці та прес.',
        breathing: 'Дихайте повільно й рівно — ніколи не затримуйте дихання.',
        rangeOfMotion: 'Руху немає: якість — у лінії, а не в тривалості.',
        commonMistakes: ['Таз провисає до підлоги', 'Таз задирається для відпочинку', 'Затримка дихання', 'Підборіддя тягнеться вперед'],
        safetyTips: 'Завершуйте підхід, коли ламається лінія, а не коли дзвонить таймер.',
        cues: ['Стисніть сідниці', 'Ребра вниз', 'Довга шия', 'Дихайте'],
      },
    },
  ),

  defineExercise(
    {
      id: 'knee-plank', category: 'strength', bodyParts: ['core'],
      primaryMuscles: ['abs'], secondaryMuscles: ['obliques'],
      difficulty: 'beginner', type: 'hold', defaultDurationSeconds: 30,
      animationAsset: 'knee-plank', harderAlternativeId: 'plank',
    },
    {
      en: {
        name: 'Knee Plank',
        description: 'A shorter lever means less load, so the line stays honest for longer.',
        startingPosition: 'Forearms down, knees on the floor, body straight from knees to head.',
        instructions: 'Hold the line with the glutes and abs engaged, hips level.',
        breathing: 'Breathe evenly throughout.',
        commonMistakes: ['Sitting back toward the heels', 'Lower back sagging'],
        cues: ['Straight from knees to head', 'Ribs down', 'Steady breathing'],
      },
      uk: {
        name: 'Планка з колін',
        description: 'Коротший важіль — менше навантаження, тому правильна лінія тримається довше.',
        startingPosition: 'Передпліччя на підлозі, коліна на підлозі, тіло пряме від колін до голови.',
        instructions: 'Утримуйте лінію з напруженими сідницями й пресом, таз рівно.',
        breathing: 'Дихайте рівно протягом усього утримання.',
        commonMistakes: ['Таз відводиться назад до пʼят', 'Провисання попереку'],
        cues: ['Пряма від колін до голови', 'Ребра вниз', 'Рівне дихання'],
      },
    },
  ),

  defineExercise(
    {
      id: 'side-plank', category: 'strength', bodyParts: ['core'],
      primaryMuscles: ['obliques'], secondaryMuscles: ['abs', 'side_delts', 'glutes'],
      difficulty: 'intermediate', type: 'per_side', defaultDurationSeconds: 30,
      animationAsset: 'side-plank', easierAlternativeId: 'knee-plank',
    },
    {
      en: {
        name: 'Side Plank',
        description: 'Loads the side of the trunk that front planks leave alone.',
        startingPosition: 'Lie on one side, elbow under the shoulder, feet stacked or staggered.',
        instructions: 'Lift your hips until your body is a straight line from ankles to head, and hold.',
        breathing: 'Steady, even breaths.',
        commonMistakes: ['Hips drifting toward the floor', 'Rolling the chest forward'],
        cues: ['Stack the shoulders', 'Hips high', 'Reach the top arm up'],
      },
      uk: {
        name: 'Бічна планка',
        description: 'Навантажує бічну поверхню корпусу, яку фронтальна планка майже не чіпає.',
        startingPosition: 'Ляжте на бік, лікоть під плечем, стопи одна на одній або в розбіг.',
        instructions: 'Підніміть таз, доки тіло не стане прямою лінією від щиколоток до голови, і утримуйте.',
        breathing: 'Рівне спокійне дихання.',
        commonMistakes: ['Таз опускається до підлоги', 'Груди завалюються вперед'],
        cues: ['Плечі одне над одним', 'Таз високо', 'Тягніться верхньою рукою вгору'],
      },
    },
  ),

  defineExercise(
    {
      id: 'crunch', category: 'strength', bodyParts: ['core'],
      primaryMuscles: ['abs'], secondaryMuscles: ['obliques'],
      difficulty: 'beginner', type: 'repetitions', defaultReps: 15, tempo: '2-1-2',
      animationAsset: 'crunch', harderAlternativeId: 'bicycle-crunch',
    },
    {
      en: {
        name: 'Crunch',
        description: 'A short, controlled spinal flexion — the abs shorten, the neck does nothing.',
        startingPosition: 'Lie on your back, knees bent, feet flat, hands lightly behind your ears.',
        instructions: 'Curl your shoulder blades off the floor by shortening the abs, pause, then lower slowly.',
        breathing: 'Exhale as you curl up, inhale as you lower.',
        rangeOfMotion: 'Shoulder blades clear the floor — the lower back stays down.',
        commonMistakes: ['Pulling on the neck', 'Using momentum', 'Lifting the whole back off the floor'],
        cues: ['Chin off the chest', 'Ribs to hips', 'Slow on the way down'],
      },
      uk: {
        name: 'Скручування',
        description: 'Коротке підконтрольне згинання хребта — прес скорочується, шия не працює.',
        startingPosition: 'Ляжте на спину, коліна зігнуті, стопи на підлозі, руки легко за вухами.',
        instructions: 'Відірвіть лопатки від підлоги за рахунок скорочення преса, пауза — і повільно опустіться.',
        breathing: 'Видих на підйомі, вдих на опусканні.',
        rangeOfMotion: 'Лопатки відриваються від підлоги, поперек залишається притиснутим.',
        commonMistakes: ['Тягнете себе за шию', 'Робота по інерції', 'Відрив усієї спини від підлоги'],
        cues: ['Підборіддя не притискайте до грудей', 'Ребра до тазу', 'Повільно вниз'],
      },
    },
  ),

  defineExercise(
    {
      id: 'bicycle-crunch', category: 'strength', bodyParts: ['core'],
      primaryMuscles: ['obliques', 'abs'], secondaryMuscles: ['hip_flexors'],
      difficulty: 'intermediate', type: 'repetitions', defaultReps: 20,
      animationAsset: 'bicycle-crunch', easierAlternativeId: 'crunch',
    },
    {
      en: {
        name: 'Bicycle Crunch',
        description: 'Rotation plus flexion — the most complete unweighted ab exercise.',
        startingPosition: 'On your back, hands behind the ears, knees lifted to 90 degrees.',
        instructions: 'Bring one elbow toward the opposite knee while the other leg extends, then switch sides smoothly. Each side counts as one rep.',
        breathing: 'Exhale on each rotation.',
        commonMistakes: ['Yanking the head with the hands', 'Going fast and shallow', 'Lower back lifting off the floor'],
        cues: ['Rotate from the ribs', 'Long extended leg', 'Slow and deliberate'],
      },
      uk: {
        name: 'Велосипед',
        description: 'Скручування з ротацією — найповніша вправа на прес без обтяження.',
        startingPosition: 'На спині, руки за вухами, коліна підняті під 90 градусів.',
        instructions: 'Тягніться ліктем до протилежного коліна, водночас випрямляючи другу ногу, потім плавно змініть сторону. Кожна сторона — одне повторення.',
        breathing: 'Видих на кожному скручуванні.',
        commonMistakes: ['Тягнете голову руками', 'Швидко й неглибоко', 'Поперек відривається від підлоги'],
        cues: ['Скручуйтесь від ребер', 'Витягуйте пряму ногу', 'Повільно й усвідомлено'],
      },
    },
  ),

  defineExercise(
    {
      id: 'leg-raise', category: 'strength', bodyParts: ['core'],
      primaryMuscles: ['abs', 'hip_flexors'], secondaryMuscles: ['obliques'],
      difficulty: 'intermediate', type: 'repetitions', defaultReps: 12, tempo: '2-0-3',
      animationAsset: 'leg-raise', easierAlternativeId: 'dead-bug',
    },
    {
      en: {
        name: 'Lying Leg Raise',
        description: 'Loads the lower abs — the section that gives up first in most people.',
        startingPosition: 'Lie flat, legs straight, hands under the hips for support.',
        instructions: 'Lift both legs to vertical with the lower back pressed down, then lower slowly until just above the floor.',
        breathing: 'Exhale as you lift, inhale as you lower.',
        commonMistakes: ['Lower back arching off the floor', 'Dropping the legs fast', 'Bending the knees to cheat'],
        safetyTips: 'If your lower back lifts, shorten the range or bend the knees.',
        cues: ['Press the back down', 'Slow on the descent', 'Stop before the back arches'],
      },
      uk: {
        name: 'Підйом ніг лежачи',
        description: 'Навантажує нижню частину преса — ту, що здається першою у більшості людей.',
        startingPosition: 'Ляжте рівно, ноги прямі, долоні під тазом для опори.',
        instructions: 'Підніміть обидві ноги до вертикалі, тримаючи поперек притиснутим, потім повільно опустіть майже до підлоги.',
        breathing: 'Видих на підйомі, вдих на опусканні.',
        commonMistakes: ['Поперек відривається від підлоги', 'Швидке скидання ніг', 'Згинання колін для полегшення'],
        safetyTips: 'Якщо поперек відривається — зменште амплітуду або зігніть коліна.',
        cues: ['Притискайте поперек', 'Повільно вниз', 'Зупиняйтесь до прогину'],
      },
    },
  ),

  defineExercise(
    {
      id: 'dead-bug', category: 'strength', bodyParts: ['core'],
      primaryMuscles: ['abs'], secondaryMuscles: ['hip_flexors', 'obliques'],
      difficulty: 'beginner', type: 'repetitions', defaultReps: 16,
      animationAsset: 'dead-bug', harderAlternativeId: 'leg-raise',
    },
    {
      en: {
        name: 'Dead Bug',
        description: 'The safest way to load the core hard while the lower back stays supported.',
        startingPosition: 'On your back, arms straight up, knees over hips bent at 90 degrees, lower back flat.',
        instructions: 'Lower one arm overhead and the opposite leg toward the floor, keeping the back flat, then return and swap. Each side is one rep.',
        breathing: 'Exhale as you extend, inhale as you return.',
        commonMistakes: ['Lower back arching as the leg lowers', 'Moving too fast to control it'],
        cues: ['Back stays flat', 'Move opposite limbs', 'Stop where control ends'],
      },
      uk: {
        name: 'Мертвий жук',
        description: 'Найбезпечніший спосіб добре навантажити корпус, коли поперек залишається в опорі.',
        startingPosition: 'На спині, руки вгору, коліна над тазом зігнуті під 90 градусів, поперек притиснутий.',
        instructions: 'Опускайте одну руку за голову й протилежну ногу до підлоги, тримаючи поперек притиснутим, потім поверніться і змініть сторону. Кожна сторона — одне повторення.',
        breathing: 'Видих на витягуванні, вдих на поверненні.',
        commonMistakes: ['Прогин попереку при опусканні ноги', 'Занадто швидкий темп'],
        cues: ['Поперек притиснутий', 'Рухайте протилежні кінцівки', 'Зупиняйтесь там, де зникає контроль'],
      },
    },
  ),

  defineExercise(
    {
      id: 'russian-twist', category: 'strength', bodyParts: ['core'],
      primaryMuscles: ['obliques'], secondaryMuscles: ['abs', 'hip_flexors'],
      difficulty: 'intermediate', type: 'repetitions', defaultReps: 20,
      animationAsset: 'russian-twist', easierAlternativeId: 'bicycle-crunch',
    },
    {
      en: {
        name: 'Russian Twist',
        description: 'Rotation under load, trained in a stable seated position.',
        startingPosition: 'Sit with knees bent, heels down or lifted, torso leaning back about 45 degrees.',
        instructions: 'Rotate your torso to tap the floor beside your hip, then rotate to the other side. Each tap is one rep.',
        breathing: 'Exhale on each twist.',
        commonMistakes: ['Only moving the arms', 'Rounding the lower back'],
        cues: ['Turn from the ribs', 'Chest tall', 'Controlled tempo'],
      },
      uk: {
        name: 'Російські скручування',
        description: 'Ротація під навантаженням у стабільному положенні сидячи.',
        startingPosition: 'Сядьте, коліна зігнуті, пʼяти на підлозі або підняті, корпус відхилений назад приблизно на 45 градусів.',
        instructions: 'Повертайте корпус і торкайтесь підлоги біля стегна, потім в інший бік. Кожне торкання — одне повторення.',
        breathing: 'Видих на кожному повороті.',
        commonMistakes: ['Рухаються лише руки', 'Округлення попереку'],
        cues: ['Повертайтесь від ребер', 'Груди розкриті', 'Контрольований темп'],
      },
    },
  ),

  defineExercise(
    {
      id: 'flutter-kick', category: 'strength', bodyParts: ['core'],
      primaryMuscles: ['abs', 'hip_flexors'], secondaryMuscles: ['quadriceps'],
      difficulty: 'intermediate', type: 'timer', defaultDurationSeconds: 30,
      animationAsset: 'flutter-kick', easierAlternativeId: 'dead-bug',
    },
    {
      en: {
        name: 'Flutter Kicks',
        description: 'Small fast kicks that keep the lower abs under constant tension.',
        startingPosition: 'Lie on your back, hands under your hips, legs straight and lifted a few centimetres.',
        instructions: 'Alternate small up-and-down kicks without letting your feet touch the floor.',
        breathing: 'Breathe steadily; do not hold your breath.',
        commonMistakes: ['Lower back arching', 'Kicks getting bigger and slower'],
        cues: ['Press the back down', 'Small quick kicks', 'Legs long'],
      },
      uk: {
        name: 'Ножиці',
        description: 'Дрібні швидкі махи, що тримають низ преса під постійною напругою.',
        startingPosition: 'На спині, долоні під тазом, ноги прямі й підняті на кілька сантиметрів.',
        instructions: 'Виконуйте дрібні почергові махи вгору-вниз, не торкаючись підлоги стопами.',
        breathing: 'Дихайте рівно, не затримуйте дихання.',
        commonMistakes: ['Прогин у попереку', 'Махи стають ширшими й повільнішими'],
        cues: ['Притискайте поперек', 'Дрібні швидкі махи', 'Ноги прямі'],
      },
    },
  ),

  defineExercise(
    {
      id: 'hollow-hold', category: 'strength', bodyParts: ['core'],
      primaryMuscles: ['abs'], secondaryMuscles: ['hip_flexors', 'obliques'],
      difficulty: 'advanced', type: 'hold', defaultDurationSeconds: 30,
      animationAsset: 'hollow-hold', easierAlternativeId: 'dead-bug',
    },
    {
      en: {
        name: 'Hollow Hold',
        description: 'The gymnastics standard for a braced, connected midsection.',
        startingPosition: 'On your back, arms overhead, legs straight, lower back pressed into the floor.',
        instructions: 'Lift shoulders and legs a few centimetres and hold the dish shape without the back lifting.',
        breathing: 'Short, steady breaths through the hold.',
        commonMistakes: ['Lower back arching', 'Going too low too early'],
        safetyTips: 'Bend the knees or keep the arms by your sides to make it manageable.',
        cues: ['Back glued to the floor', 'Long body', 'Lower only as far as control allows'],
      },
      uk: {
        name: 'Утримання «човник»',
        description: 'Гімнастичний стандарт зібраного, напруженого центру тіла.',
        startingPosition: 'На спині, руки за головою, ноги прямі, поперек притиснутий до підлоги.',
        instructions: 'Підніміть плечі й ноги на кілька сантиметрів і утримуйте форму «човника», не відриваючи поперек.',
        breathing: 'Короткі рівні вдихи протягом утримання.',
        commonMistakes: ['Прогин у попереку', 'Занадто низьке положення на старті'],
        safetyTips: 'Зігніть коліна або тримайте руки вздовж тіла, щоб полегшити вправу.',
        cues: ['Поперек притиснутий', 'Тіло витягнуте', 'Опускайтесь лише в межах контролю'],
      },
    },
  ),

  defineExercise(
    {
      id: 'heel-touch', category: 'strength', bodyParts: ['core'],
      primaryMuscles: ['obliques'], secondaryMuscles: ['abs'],
      difficulty: 'beginner', type: 'repetitions', defaultReps: 20,
      animationAsset: 'heel-touch', harderAlternativeId: 'russian-twist',
    },
    {
      en: {
        name: 'Heel Touches',
        description: 'A gentle side-bend crunch — a good first oblique exercise.',
        startingPosition: 'Lie on your back, knees bent, feet flat, shoulders slightly lifted.',
        instructions: 'Reach one hand toward the same-side heel by bending sideways, then the other. Each touch is one rep.',
        breathing: 'Exhale on each reach.',
        commonMistakes: ['Shoulders dropping between reps', 'Reaching with the arms only'],
        cues: ['Keep shoulders lifted', 'Bend from the waist', 'Steady rhythm'],
      },
      uk: {
        name: 'Торкання пʼят',
        startingPosition: 'Ляжте на спину, коліна зігнуті, стопи на підлозі, плечі трохи підняті.',
        description: 'Мʼяке бічне скручування — гарна перша вправа на косі мʼязи.',
        instructions: 'Тягніться рукою до однойменної пʼяти, згинаючись убік, потім іншою. Кожне торкання — одне повторення.',
        breathing: 'Видих на кожному русі.',
        commonMistakes: ['Плечі опускаються між повтореннями', 'Тягнетесь лише руками'],
        cues: ['Тримайте плечі піднятими', 'Згинайтесь у талії', 'Рівний ритм'],
      },
    },
  ),
]
