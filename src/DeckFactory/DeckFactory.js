import { GetFactorSpread } from "./Factors.js";
import { GetPrimeSpread } from "./Primes.js";

const DeckTypes = {
  // Antonyms: "Antonyms",
  Factors: "Factors",
  // Fractions: "Fractions",
  Multiples: "Multiples",
  PeriodicTable: "PeriodicTable",
  Primes: "Primes",
  // Synonyms: "Synonyms"
}

const DeckCategories = {
  Mathematics: "Mathematics",
  Chemistry: "Chemistry"
}

const DifficultyConstants = {
  Beginner: "Beginner",
  Intermediate: "Intermediate",
  Advanced: "Advanced",
  Expert: "Expert"
}

// TODO: implement difficulties
const DeckFactory = (selectedDecks, difficulty, count) => {
  let decks = [];

  for (let i = 0; i < count; i++) {
    let deckType = selectedDecks[
      Math.floor(Math.random() * selectedDecks.length)];

    switch (deckType) {
      case DeckTypes.Factors:
        decks.push(GetFactorSpread(difficulty));
        break;
      case DeckTypes.Multiples:

        break;
      case DeckTypes.Primes:
        decks.push(GetPrimeSpread(difficulty));
        break;
    }
  }

  return decks;
}

export { DeckTypes, DeckFactory, DifficultyConstants, DeckCategories };