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

// TODO: provide more robust card support, one value inadequate
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
        decks.push(GetMultipleSpread(difficulty));
        break;
      case DeckTypes.PeriodicTable:
        decks.push(GetPeriodicTableSpread(difficulty));
        break;
      case DeckTypes.Primes:
        decks.push(GetPrimeSpread(difficulty));
        break;
    }
  }

  return decks;
}

export { DeckTypes, DeckFactory, DifficultyConstants, DeckCategories };