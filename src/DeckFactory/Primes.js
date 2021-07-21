import { DeckCategories, DifficultyConstants } from "./DeckFactory.js";

const CorrectCount = 8;

const BeginnerPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
const IntermediatePrimes = [...BeginnerPrimes, 53, 59, 61, 67, 71, 73, 79, 83,
  89, 97];
const AdvancedPrimes = [...IntermediatePrimes, 101, 103, 107, 109, 113, 127,
  131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199,
  211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283,
  293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383,
  389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467,
  479, 487, 491, 499];
const ExpertPrimes = [...AdvancedPrimes, 503, 509, 521, 523, 541, 547, 557,
  563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643,
  647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743,
  751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853,
  857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953,
  967, 971, 977, 983, 991, 997];

const isValidAnswer = (value) => {
  return ExpertPrimes.includes(parseInt(value));
}

const getDifficultySettings = (difficulty) => {
  switch (difficulty) {
    case DifficultyConstants.Beginner:
      return { Array: BeginnerPrimes, Max: 50 };
    case DifficultyConstants.Intermediate:
      return { Array: IntermediatePrimes, Max: 100 };
    case DifficultyConstants.Advanced:
      return { Array: AdvancedPrimes, Max: 500 };
    case DifficultyConstants.Expert:
      return { Array: ExpertPrimes, Max: 999 };
  }
}

const buildCardSpread = (difficultySettings) => {
  let cardSpread = [];

  let primeArray = [...difficultySettings.Array];

  for (let i = 0; i <= CorrectCount; i++) {
    let primeIndex = Math.floor(Math.random() * (primeArray.length));
    cardSpread.push(primeArray[primeIndex]);
    primeArray.splice(primeIndex, 1);
  }

  while (cardSpread.length < 16) {
    let value = Math.floor(Math.random() * difficultySettings.Max);
    if (!isValidAnswer(value))
    {
      cardSpread.push(value);
    }
  }
  return cardSpread;
}

const GetPrimeSpread = (difficulty) => {
  let cardSpread = buildCardSpread(getDifficultySettings(difficulty));

  let primeSpread = {
    Category: DeckCategories.Mathematics,
    Prompt: 'Primes',
    CardSpread: cardSpread,
    CorrectCount: CorrectCount,
    IsValidAnswer: function(value) {
      return ExpertPrimes.includes(parseInt(value));
    }
  };
  console.log(primeSpread);
  return primeSpread;
}

export { GetPrimeSpread };