import { GetFactorSpread } from "./Factors.js";
import { GetMultipleSpread } from "./Multiples.js";
import { GetPeriodicTableSpread } from "./PeriodicTable.js";
import { GetPrimeSpread } from "./Primes.js";

const DeckTypes = {
  // Antonyms: "Antonyms",
  Factors: "Factors",
  // Fractions: "Fractions",
  Multiples: "Multiples",
  PeriodicTable: "Periodic Table",
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

// TODO: DeckFactory should be better equipped to handle a count of 1
// TODO: provide more robust card support, one value inadequate
const DeckFactory = (selectedDecks, difficulty, count) => {
  let decks = [];

  for (let i = 0; i < count; i++) {
    let deckType = selectedDecks[
      Math.floor(Math.random() * selectedDecks.length)];

    switch (deckType) {
      case DeckTypes.Factors:
        if (count === 1) {
          return GetFactorSpread(difficulty);
        }
        decks.push(GetFactorSpread(difficulty));
        break;
      case DeckTypes.Multiples:
        if (count === 1) {
          return GetMultipleSpread(difficulty);
        }
        decks.push(GetMultipleSpread(difficulty));
        break;
      case DeckTypes.PeriodicTable:
        if (count === 1) {
          return GetPeriodicTableSpread(difficulty);
        }
        decks.push(GetPeriodicTableSpread(difficulty));
        break;
      case DeckTypes.Primes:
        if (count === 1) {
          return GetPrimeSpread(difficulty);
        }
        decks.push(GetPrimeSpread(difficulty));
        break;
    }
  }

  return decks;
}

export { DeckTypes, DeckFactory, DifficultyConstants, DeckCategories };