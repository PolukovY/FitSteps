import { registerMessages } from './registry'
import en from './ui.en'
import uk from './ui.uk'

registerMessages('en', en)
registerMessages('uk', uk)

// Importing the data modules registers their exercise, workout and program
// copy; without this the dictionaries are empty until a screen happens to
// import them.
import '../data/exercises'
import '../data/workouts'
import '../data/programs'
