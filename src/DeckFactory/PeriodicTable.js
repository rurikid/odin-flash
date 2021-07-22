import { Elements, Series, Groups } from "../../api/Elements.js";
import { DeckCategories, DifficultyConstants } from "./DeckFactory.js";

const Prompts = {
  ...Series,
  Metals: "Metals",
  Nonmetals: "Nonmetals"
}

const isValidAnswer = (value, prompt) => {

}

const getDifficultySettings = (difficulty) => {
  switch (difficulty) {
    case DifficultyConstants.Beginner:
      return {
        Prompts: [Prompts.Metals, Prompts.Nonmetals, Prompts.Metalloids],
        CorrectCount: 8
      };
    case DifficultyConstants.Intermediate:
      return {
        Prompts: [Prompts.Metals, Prompts.Nonmetals,
                  Prompts.Metalloids, Prompts.NobleGases],
        CorrectCount: 8
      };
    case DifficultyConstants.Advanced:
      return {
        Prompts: [...Prompts],
        CorrectCount: 8
      };
    case DifficultyConstants.Expert:
      return {
        Prompts: [...Prompts],
        CorrectCount: 6
      };
  }
}

const buildCardSpread = () => {
  let correct = [];
  let incorrect = [];
  let cardSpread = [];
}

const GetPeriodicTableSpread = (difficulty) => {
  let difficultySettings = getDifficultySettings(difficulty);

  let periodicTableSpread = {
    Category: DeckCategories.Chemistry,
    Prompt: prompt,
    CardSpread: cardSpread,
    CorrectCount: difficultySettings.CorrectCount,
    IsValidAnswer: function(value) {

    }
  }

  return periodicTableSpread;
}

export { GetPeriodicTableSpread };