import { GameState } from "../GameState.js";

const DeckTypes = {
  Antonyms: "Antonyms",
  Factors: "Factors",
  Fractions: "Fractions",
  Multiples: "Multiples",
  PeriodicTable: "PeriodicTable",
  Primes: "Primes",
  Synonyms: "Synonyms"
}

const Difficulties = {
  Beginner: "Beginner",
  Intermediate: "Intermediate",
  Advanced: "Advanced",
  Expert: "Expert"
}

const DeckFactory = () => {
  let deckType = GameState.GameOptions.DeckSelection[
    Math.floor(Math.random() * GameState.GameOptions.DeckSelection.length) + 1];

  let deck;

  switch (deckType) {
    case DeckNames.Factors:
      deck = GetFactorSpread();
      break;
  }

  return deck;
}

export { DeckTypes, DeckFactory };