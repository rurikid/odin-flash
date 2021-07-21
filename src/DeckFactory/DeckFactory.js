import { GetFactorSpread } from "./Factors.js";

const DeckTypes = {
  // Antonyms: "Antonyms",
  Factors: "Factors",
  // Fractions: "Fractions",
  Multiples: "Multiples",
  PeriodicTable: "PeriodicTable",
  Primes: "Primes",
  // Synonyms: "Synonyms"
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
    }
  }

  return decks;
}

export { DeckTypes, DeckFactory, DifficultyConstants };