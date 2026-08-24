import { defineExercise } from '../defineExercise'

export const upper = [
  defineExercise(
    {
      id: 'push-up', category: 'strength', bodyParts: ['chest', 'arms', 'shoulders'],
      primaryMuscles: ['chest', 'triceps'], secondaryMuscles: ['front_delts', 'abs'],
      difficulty: 'intermediate', type: 'repetitions', defaultReps: 10, tempo: '2-0-1',
      animationAsset: 'push-up', easierAlternativeId: 'knee-push-up', harderAlternativeId: 'diamond-push-up',
      alternativeIds: ['incline-push-up', 'wall-push-up'],
    },
    {
      en: {
        name: 'Push-ups',
        description: 'The most complete upper-body exercise you can do without equipment.',
        startingPosition: 'Hands slightly wider than shoulders, body in one line from head to heels, core braced.',
        instructions: 'Lower your chest toward the floor with elbows at roughly 45 degrees to your body, then press back up to full extension.',
        breathing: 'Inhale as you lower, exhale as you press up.',
        rangeOfMotion: 'Chest to about a fist above the floor.',
        commonMistakes: ['Hips sagging or piking up', 'Elbows flaring straight out', 'Head dropping toward the floor', 'Half repetitions'],
        cues: ['One straight line', 'Elbows back, not out', 'Squeeze the glutes', 'Full lockout'],
      },
      uk: {
        name: 'Віджимання',
        description: 'Найповніша вправа для верху тіла без будь-якого інвентарю.',
        startingPosition: 'Руки трохи ширше плечей, тіло в одну лінію від голови до пʼят, корпус напружений.',
        instructions: 'Опускайте груди до підлоги, лікті приблизно під 45 градусів до тулуба, потім потужно вижміться до повного випрямлення.',
        breathing: 'Вдих на опусканні, видих на підйомі.',
        rangeOfMotion: 'Груди приблизно на кулак від підлоги.',
        commonMistakes: ['Таз провисає або задирається', 'Лікті розведені строго вбік', 'Голова опускається вниз', 'Неповна амплітуда'],
        cues: ['Одна пряма лінія', 'Лікті назад, не вбік', 'Стисніть сідниці', 'Повне випрямлення'],
      },
    },
  ),

  defineExercise(
    {
      id: 'knee-push-up', category: 'strength', bodyParts: ['chest', 'arms'],
      primaryMuscles: ['chest', 'triceps'], secondaryMuscles: ['front_delts'],
      difficulty: 'beginner', type: 'repetitions', defaultReps: 10, tempo: '2-0-1',
      animationAsset: 'knee-push-up', harderAlternativeId: 'push-up',
    },
    {
      en: {
        name: 'Knee Push-ups',
        description: 'The same movement with less load — the honest way to build to full push-ups.',
        startingPosition: 'Knees on the floor, hands under the shoulders, body straight from knees to head.',
        instructions: 'Lower your chest toward the floor, keeping the line from knees to head, then press back up.',
        breathing: 'Inhale down, exhale up.',
        commonMistakes: ['Bending at the hips', 'Hands too far forward'],
        cues: ['Straight from knees to head', 'Elbows back', 'Full range'],
      },
      uk: {
        name: 'Віджимання з колін',
        description: 'Той самий рух із меншим навантаженням — чесний шлях до повних віджимань.',
        startingPosition: 'Коліна на підлозі, руки під плечима, тіло пряме від колін до голови.',
        instructions: 'Опускайте груди до підлоги, зберігаючи лінію від колін до голови, потім вижміться вгору.',
        breathing: 'Вдих вниз, видих вгору.',
        commonMistakes: ['Злам у тазостегновому суглобі', 'Руки надто далеко вперед'],
        cues: ['Лінія від колін до голови', 'Лікті назад', 'Повна амплітуда'],
      },
    },
  ),

  defineExercise(
    {
      id: 'wall-push-up', category: 'strength', bodyParts: ['chest', 'arms'],
      primaryMuscles: ['chest'], secondaryMuscles: ['triceps', 'front_delts'],
      difficulty: 'beginner', type: 'repetitions', defaultReps: 14,
      animationAsset: 'wall-push-up', harderAlternativeId: 'knee-push-up',
    },
    {
      en: {
        name: 'Wall Push-ups',
        description: 'The gentlest entry point to pressing — useful as a warm-up too.',
        startingPosition: 'Stand an arm’s length from a wall, hands at chest height slightly wider than shoulders.',
        instructions: 'Bend your elbows to bring your chest toward the wall, then press away until your arms are straight.',
        breathing: 'Inhale in, exhale away.',
        commonMistakes: ['Standing too close to the wall', 'Hips leading the movement'],
        cues: ['Body in one line', 'Slow in, strong out'],
      },
      uk: {
        name: 'Віджимання від стіни',
        description: 'Найлегший вхід у жимові рухи — підходить і як розминка.',
        startingPosition: 'Станьте на відстані витягнутої руки від стіни, долоні на рівні грудей трохи ширше плечей.',
        instructions: 'Згинайте лікті, наближаючи груди до стіни, потім відштовхніться до повного випрямлення рук.',
        breathing: 'Вдих до стіни, видих від стіни.',
        commonMistakes: ['Стоїте надто близько до стіни', 'Рух починається тазом'],
        cues: ['Тіло в одну лінію', 'Повільно до стіни, потужно від неї'],
      },
    },
  ),

  defineExercise(
    {
      id: 'incline-push-up', category: 'strength', bodyParts: ['chest', 'arms'],
      primaryMuscles: ['chest', 'triceps'], secondaryMuscles: ['front_delts', 'abs'],
      difficulty: 'beginner', type: 'repetitions', defaultReps: 12,
      animationAsset: 'incline-push-up', easierAlternativeId: 'wall-push-up', harderAlternativeId: 'push-up',
    },
    {
      en: {
        name: 'Incline Push-ups',
        description: 'Hands raised on a chair or sofa — most of the push-up, less of the load.',
        startingPosition: 'Hands on a stable raised surface, body in one line, feet together.',
        instructions: 'Lower your chest to the edge, then press back up without letting the hips drop.',
        breathing: 'Inhale down, exhale up.',
        commonMistakes: ['Unstable surface', 'Hips sagging'],
        safetyTips: 'Use something that cannot slide — a windowsill or a sofa arm, not a rolling chair.',
        cues: ['Stable surface', 'One straight line', 'Chest to the edge'],
      },
      uk: {
        name: 'Віджимання з підвищення',
        description: 'Руки на стільці чи дивані — майже повне віджимання, але з меншим навантаженням.',
        startingPosition: 'Руки на стійкій піднятій поверхні, тіло в одну лінію, стопи разом.',
        instructions: 'Опускайте груди до краю опори, потім вижміться вгору, не даючи тазу провисати.',
        breathing: 'Вдих вниз, видих вгору.',
        commonMistakes: ['Нестійка опора', 'Провисання тазу'],
        safetyTips: 'Використовуйте те, що не ковзає — підвіконня чи підлокітник дивана, не крісло на колесах.',
        cues: ['Стійка опора', 'Одна пряма лінія', 'Груди до краю'],
      },
    },
  ),

  defineExercise(
    {
      id: 'diamond-push-up', category: 'strength', bodyParts: ['arms', 'chest'],
      primaryMuscles: ['triceps', 'chest'], secondaryMuscles: ['front_delts', 'abs'],
      difficulty: 'advanced', type: 'repetitions', defaultReps: 8, tempo: '2-0-1',
      animationAsset: 'diamond-push-up', easierAlternativeId: 'push-up',
    },
    {
      en: {
        name: 'Diamond Push-ups',
        description: 'Hands close together shifts the work from chest to triceps.',
        startingPosition: 'Hands under the chest with index fingers and thumbs touching, body in one line.',
        instructions: 'Lower your chest to your hands with elbows tucked close to the ribs, then press up.',
        breathing: 'Inhale down, exhale up.',
        commonMistakes: ['Elbows flaring wide', 'Hips rising to cheat the press'],
        safetyTips: 'If your wrists complain, widen the hands slightly.',
        cues: ['Elbows tight to the ribs', 'Chest to the hands', 'Body locked straight'],
      },
      uk: {
        name: 'Алмазні віджимання',
        description: 'Вузька постановка рук зміщує навантаження з грудей на трицепс.',
        startingPosition: 'Долоні під грудьми, вказівні пальці й великі торкаються, тіло в одну лінію.',
        instructions: 'Опускайте груди до долонь, притискаючи лікті до ребер, потім вижміться вгору.',
        breathing: 'Вдих вниз, видих вгору.',
        commonMistakes: ['Лікті розводяться вбік', 'Таз піднімається, щоб полегшити жим'],
        safetyTips: 'Якщо болять запʼястя — трохи розширте постановку рук.',
        cues: ['Лікті до ребер', 'Груди до долонь', 'Тіло жорстко пряме'],
      },
    },
  ),

  defineExercise(
    {
      id: 'pike-push-up', category: 'strength', bodyParts: ['shoulders', 'arms'],
      primaryMuscles: ['front_delts', 'triceps'], secondaryMuscles: ['side_delts', 'chest'],
      difficulty: 'advanced', type: 'repetitions', defaultReps: 8,
      animationAsset: 'pike-push-up', easierAlternativeId: 'push-up',
    },
    {
      en: {
        name: 'Pike Push-ups',
        description: 'The bodyweight answer to an overhead press.',
        startingPosition: 'From a push-up position, walk your feet in and lift your hips into an inverted V.',
        instructions: 'Bend your elbows to lower the crown of your head toward the floor between your hands, then press back up.',
        breathing: 'Inhale down, exhale up.',
        commonMistakes: ['Hips dropping mid-rep', 'Head going forward instead of down'],
        safetyTips: 'Come out of it if you feel pressure in your head or neck.',
        cues: ['Hips high', 'Head between the hands', 'Press through the shoulders'],
      },
      uk: {
        name: 'Віджимання «пік»',
        description: 'Аналог жиму над головою з власною вагою.',
        startingPosition: 'З упору лежачи підійдіть стопами ближче й підніміть таз у перевернуту «V».',
        instructions: 'Згинайте лікті, опускаючи маківку до підлоги між долонями, потім вижміться вгору.',
        breathing: 'Вдих вниз, видих вгору.',
        commonMistakes: ['Таз опускається під час повторення', 'Голова йде вперед, а не вниз'],
        safetyTips: 'Виходьте з положення, якщо відчуваєте тиск у голові чи шиї.',
        cues: ['Таз високо', 'Голова між долонями', 'Тисніть плечима'],
      },
    },
  ),

  defineExercise(
    {
      id: 'shoulder-tap', category: 'strength', bodyParts: ['shoulders', 'core'],
      primaryMuscles: ['front_delts', 'abs'], secondaryMuscles: ['chest', 'obliques'],
      difficulty: 'intermediate', type: 'repetitions', defaultReps: 20,
      animationAsset: 'shoulder-tap', easierAlternativeId: 'plank',
    },
    {
      en: {
        name: 'Shoulder Taps',
        description: 'A plank that fights rotation — the shoulders hold, the core resists.',
        startingPosition: 'High plank, hands under shoulders, feet slightly wider than hips.',
        instructions: 'Tap one hand to the opposite shoulder without letting your hips rotate, then swap. Each tap is one rep.',
        breathing: 'Breathe steadily throughout.',
        commonMistakes: ['Hips swinging side to side', 'Rushing the taps'],
        cues: ['Hips still', 'Wide feet help', 'Slow and even'],
      },
      uk: {
        name: 'Торкання плечей у планці',
        description: 'Планка проти ротації: плечі тримають, корпус протидіє скручуванню.',
        startingPosition: 'Висока планка, руки під плечима, стопи трохи ширше тазу.',
        instructions: 'Торкніться однією рукою протилежного плеча, не даючи тазу обертатись, потім змініть руку. Кожне торкання — одне повторення.',
        breathing: 'Дихайте рівно протягом усього підходу.',
        commonMistakes: ['Таз хитається з боку в бік', 'Занадто швидкі торкання'],
        cues: ['Таз нерухомий', 'Ширші стопи — легше', 'Повільно й рівномірно'],
      },
    },
  ),

  defineExercise(
    {
      id: 'triceps-dip', category: 'strength', bodyParts: ['arms'],
      primaryMuscles: ['triceps'], secondaryMuscles: ['front_delts', 'chest'],
      difficulty: 'intermediate', type: 'repetitions', defaultReps: 12,
      animationAsset: 'triceps-dip', easierAlternativeId: 'knee-push-up', harderAlternativeId: 'diamond-push-up',
    },
    {
      en: {
        name: 'Triceps Dips',
        description: 'Chair dips load the triceps directly with nothing but your own weight.',
        startingPosition: 'Sit on the edge of a stable chair, hands beside your hips, feet forward.',
        instructions: 'Slide your hips off the edge and bend your elbows straight back until they reach about 90 degrees, then press up.',
        breathing: 'Inhale down, exhale up.',
        commonMistakes: ['Elbows flaring out', 'Shoulders shrugging to the ears', 'Going too deep'],
        safetyTips: 'Stop at 90 degrees — deeper dips stress the front of the shoulder.',
        cues: ['Elbows straight back', 'Shoulders down', 'Stay close to the chair'],
      },
      uk: {
        name: 'Зворотні віджимання',
        description: 'Віджимання від стільця навантажують трицепс напряму лише власною вагою.',
        startingPosition: 'Сядьте на край стійкого стільця, долоні біля стегон, стопи попереду.',
        instructions: 'Зсуньте таз з краю і згинайте лікті строго назад приблизно до 90 градусів, потім вижміться вгору.',
        breathing: 'Вдих вниз, видих вгору.',
        commonMistakes: ['Лікті розводяться вбік', 'Плечі піднімаються до вух', 'Занадто глибоке опускання'],
        safetyTips: 'Зупиняйтесь на 90 градусах — глибше навантажує передню частину плеча.',
        cues: ['Лікті строго назад', 'Плечі вниз', 'Тримайтесь близько до стільця'],
      },
    },
  ),

  defineExercise(
    {
      id: 'superman', category: 'strength', bodyParts: ['back'],
      primaryMuscles: ['lower_back'], secondaryMuscles: ['glutes', 'rear_delts'],
      difficulty: 'beginner', type: 'repetitions', defaultReps: 12, tempo: '2-1-2',
      animationAsset: 'superman', harderAlternativeId: 'bird-dog',
    },
    {
      en: {
        name: 'Superman',
        description: 'Strengthens the back of the body — the half that sitting all day weakens.',
        startingPosition: 'Lie face down, arms extended overhead, legs straight, forehead down.',
        instructions: 'Lift your arms, chest and legs a few centimetres off the floor, hold briefly, then lower under control.',
        breathing: 'Exhale as you lift, inhale as you lower.',
        commonMistakes: ['Yanking the head back', 'Lifting as high as possible instead of as controlled as possible'],
        cues: ['Long from fingertips to toes', 'Neck neutral', 'Small lift, strong squeeze'],
      },
      uk: {
        name: 'Супермен',
        description: 'Зміцнює задню поверхню тіла — саме ту, що слабшає від сидіння.',
        startingPosition: 'Ляжте на живіт, руки витягнуті вперед, ноги прямі, лоб на підлозі.',
        instructions: 'Підніміть руки, груди й ноги на кілька сантиметрів від підлоги, коротка пауза — і підконтрольно опустіть.',
        breathing: 'Видих на підйомі, вдих на опусканні.',
        commonMistakes: ['Різке закидання голови назад', 'Підйом «якнайвище» замість «якнайпідконтрольніше»'],
        cues: ['Витягніться від пальців рук до пальців ніг', 'Шия нейтральна', 'Малий підйом, сильне стиснення'],
      },
    },
  ),

  defineExercise(
    {
      id: 'bird-dog', category: 'strength', bodyParts: ['back', 'core'],
      primaryMuscles: ['lower_back', 'abs'], secondaryMuscles: ['glutes', 'rear_delts'],
      difficulty: 'beginner', type: 'per_side', defaultReps: 10,
      animationAsset: 'bird-dog', easierAlternativeId: 'superman',
    },
    {
      en: {
        name: 'Bird Dog',
        description: 'Trains the core to stay still while the limbs move — the point of a strong midsection.',
        startingPosition: 'On all fours, hands under shoulders, knees under hips, spine neutral.',
        instructions: 'Extend one arm forward and the opposite leg back until both are level with your torso. Hold a beat, return, then swap.',
        breathing: 'Exhale as you extend, inhale as you return.',
        commonMistakes: ['Lower back arching', 'Hips tilting as the leg lifts', 'Rushing the swap'],
        cues: ['Long, not high', 'Hips level', 'Move slowly'],
      },
      uk: {
        name: 'Птах-собака',
        description: 'Вчить корпус залишатися нерухомим, поки рухаються кінцівки — у цьому й суть сильного центру.',
        startingPosition: 'Упор на чотирьох, руки під плечима, коліна під тазом, хребет нейтральний.',
        instructions: 'Витягніть одну руку вперед і протилежну ногу назад до рівня корпусу. Коротка пауза, поверніться і змініть сторону.',
        breathing: 'Видих на витягуванні, вдих на поверненні.',
        commonMistakes: ['Прогин у попереку', 'Таз перекошується при підйомі ноги', 'Занадто швидка зміна сторін'],
        cues: ['Довго, а не високо', 'Таз рівно', 'Рухайтесь повільно'],
      },
    },
  ),

  defineExercise(
    {
      id: 'reverse-snow-angel', category: 'strength', bodyParts: ['back', 'shoulders'],
      primaryMuscles: ['traps', 'rear_delts'], secondaryMuscles: ['lower_back'],
      difficulty: 'beginner', type: 'repetitions', defaultReps: 12,
      animationAsset: 'reverse-snow-angel', harderAlternativeId: 'superman',
    },
    {
      en: {
        name: 'Reverse Snow Angel',
        description: 'Opens the chest and wakes up the upper back after hours at a desk.',
        startingPosition: 'Lie face down, arms by your sides, palms down, forehead resting on the floor.',
        instructions: 'Lift your arms slightly and sweep them overhead along the floor, then back to your sides, keeping them off the ground the whole time.',
        breathing: 'Exhale as the arms sweep up, inhale as they return.',
        commonMistakes: ['Letting the hands touch down', 'Shrugging the shoulders'],
        cues: ['Arms light and long', 'Shoulders away from the ears', 'Slow sweep'],
      },
      uk: {
        name: 'Зворотний «сніговий янгол»',
        description: 'Розкриває груди й вмикає верх спини після годин за столом.',
        startingPosition: 'Ляжте на живіт, руки вздовж тіла долонями вниз, лоб на підлозі.',
        instructions: 'Трохи підніміть руки й проведіть ними над головою вздовж підлоги, потім назад до стегон, не торкаючись підлоги.',
        breathing: 'Видих на русі вгору, вдих на поверненні.',
        commonMistakes: ['Руки торкаються підлоги', 'Плечі піднімаються до вух'],
        cues: ['Руки легкі й довгі', 'Плечі від вух', 'Повільний рух'],
      },
    },
  ),

  defineExercise(
    {
      id: 'wall-angel', category: 'mobility', bodyParts: ['shoulders', 'back'],
      primaryMuscles: ['traps', 'rear_delts'], secondaryMuscles: ['side_delts'],
      difficulty: 'beginner', type: 'repetitions', defaultReps: 10,
      animationAsset: 'wall-angel',
    },
    {
      en: {
        name: 'Wall Angel',
        description: 'A posture drill that shows you exactly how tight your shoulders are.',
        startingPosition: 'Stand with your back, head and hips against a wall, arms bent in a goalpost shape touching the wall.',
        instructions: 'Slide your arms up the wall as far as they will go without losing contact, then slide back down.',
        breathing: 'Exhale up, inhale down.',
        commonMistakes: ['Ribs flaring off the wall', 'Elbows leaving the wall'],
        cues: ['Ribs down', 'Keep contact', 'Only go as far as the wall allows'],
      },
      uk: {
        name: 'Ангел біля стіни',
        description: 'Вправа на поставу, яка одразу показує, наскільки затиснуті плечі.',
        startingPosition: 'Спина, потилиця й таз біля стіни, руки зігнуті «воротами» і торкаються стіни.',
        instructions: 'Ковзайте руками по стіні вгору настільки, наскільки можливо без втрати контакту, потім вниз.',
        breathing: 'Видих вгору, вдих вниз.',
        commonMistakes: ['Ребра відриваються від стіни', 'Лікті втрачають контакт зі стіною'],
        cues: ['Ребра вниз', 'Тримайте контакт', 'Рухайтесь лише в межах контакту'],
      },
    },
  ),

  defineExercise(
    {
      id: 'plank-up-down', category: 'strength', bodyParts: ['arms', 'core', 'chest'],
      primaryMuscles: ['triceps', 'abs'], secondaryMuscles: ['chest', 'front_delts'],
      difficulty: 'advanced', type: 'repetitions', defaultReps: 12,
      animationAsset: 'plank-up-down', easierAlternativeId: 'plank',
    },
    {
      en: {
        name: 'Up-Down Plank',
        description: 'Moving between forearm and high plank — triceps and core under constant tension.',
        startingPosition: 'Forearm plank, elbows under shoulders, feet slightly apart.',
        instructions: 'Press one hand then the other into a high plank, then lower back onto one forearm at a time. Alternate the leading arm.',
        breathing: 'Breathe steadily — do not hold your breath.',
        commonMistakes: ['Hips rocking with every press', 'Elbows drifting wide'],
        cues: ['Wide feet, still hips', 'Lead with alternating arms', 'Controlled tempo'],
      },
      uk: {
        name: 'Планка вгору-вниз',
        description: 'Перехід із планки на передпліччях у високу — трицепс і корпус під постійною напругою.',
        startingPosition: 'Планка на передпліччях, лікті під плечима, стопи трохи нарізно.',
        instructions: 'Поставте одну долоню, потім другу у високу планку, після чого опустіться по черзі на передпліччя. Чергуйте провідну руку.',
        breathing: 'Дихайте рівно, не затримуйте дихання.',
        commonMistakes: ['Таз хитається на кожному переході', 'Лікті розʼїжджаються'],
        cues: ['Ширші стопи — стабільніший таз', 'Чергуйте провідну руку', 'Контрольований темп'],
      },
    },
  ),
]
