import { Elements, Series, Groups } from "../../api/Elements.js";
import { DeckCategories, DifficultyConstants } from "./DeckFactory.js";

const Prompts = {
  ...Series,
  Metals: "Metals",
  Nonmetals: "Nonmetals"
}

// TODO: likely a better way to do this
const isValidAnswer = (value, prompt) => {
  let element = Elements.find((index) => index.Symbol === value);

  switch (prompt) {
    case Prompts.AlkaliMetals:
      return element.Series === Series.AlkaliMetals;
    case Prompts.AlkalineEarthMetals:
      return element.Series === Series.AlkalineEarthMetals;
    case Prompts.Lanthanoids:
      return element.Series === Series.Lanthanoids;
    case Prompts.Actinoids:
      return element.Series === Series.Actinoids;
    case Prompts.TransitionMetals:
      return element.Series === Series.TransitionMetals;
    case Prompts.PostTransitionMetals:
      return element.Series === Series.AlkaliMetals;
    case Prompts.Metalloids:
      return element.Series === Series.Metalloids;
    case Prompts.ReactiveNonmetals:
      return element.Series === Series.ReactiveNonmetals;
    case Prompts.NobleGases:
      return element.Series === Series.NobleGases;
    case Prompts.Metals:
      return (element.Series === Series.AlkaliMetals ||
        element.Series === Series.AlkalineEarthMetals ||
        element.Series === Series.Lanthanoids ||
        element.Series === Series.Actinoids ||
        element.Series === Series.TransitionMetals ||
        element.Series === Series.PostTransitionMetals);
    case Prompts.Nonmetals:
      return (element.Series === Series.ReactiveNonmetals ||
        element.Series === Series.NobleGases);
  }
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

const getCorrect = (prompt) => {
  switch (prompt) {
    case Prompts.AlkaliMetals:
      return Elements.filter(element => element.Series === Series.AlkaliMetals);
    case Prompts.AlkalineEarthMetals:
      return Elements.filter(element => element.Series === Series.AlkalineEarthMetals);
    case Prompts.Lanthanoids:
      return Elements.filter(element => element.Series === Series.Lanthanoids);
    case Prompts.Actinoids:
      return Elements.filter(element => element.Series === Series.Actinoids);
    case Prompts.TransitionMetals:
      return Elements.filter(element => element.Series === Series.TransitionMetals);
    case Prompts.PostTransitionMetals:
      return Elements.filter(element => element.Series === Series.AlkaliMetals);
    case Prompts.Metalloids:
      return Elements.filter(element => element.Series === Series.Metalloids);
    case Prompts.ReactiveNonmetals:
      return Elements.filter(element => element.Series === Series.ReactiveNonmetals);
    case Prompts.NobleGases:
      return Elements.filter(element => element.Series === Series.NobleGases);
    case Prompts.Metals:
      return Elements.filter(element =>
        element.Series === Series.AlkaliMetals ||
        element.Series === Series.AlkalineEarthMetals ||
        element.Series === Series.Lanthanoids ||
        element.Series === Series.Actinoids ||
        element.Series === Series.TransitionMetals ||
        element.Series === Series.PostTransitionMetals);
    case Prompts.Nonmetals:
      return Elements.filter(element =>
        element.Series === Series.ReactiveNonmetals ||
        element.Series === Series.NobleGases);
  }
}

const getIncorrect = (prompt) => {
  switch (prompt) {
    case Prompts.AlkaliMetals:
      return Elements.filter(element => element.Series !== Series.AlkaliMetals);
    case Prompts.AlkalineEarthMetals:
      return Elements.filter(element => element.Series !== Series.AlkalineEarthMetals);
    case Prompts.Lanthanoids:
      return Elements.filter(element => element.Series !== Series.Lanthanoids);
    case Prompts.Actinoids:
      return Elements.filter(element => element.Series !== Series.Actinoids);
    case Prompts.TransitionMetals:
      return Elements.filter(element => element.Series !== Series.TransitionMetals);
    case Prompts.PostTransitionMetals:
      return Elements.filter(element => element.Series !== Series.AlkaliMetals);
    case Prompts.Metalloids:
      return Elements.filter(element => element.Series !== Series.Metalloids);
    case Prompts.ReactiveNonmetals:
      return Elements.filter(element => element.Series !== Series.ReactiveNonmetals);
    case Prompts.NobleGases:
      return Elements.filter(element => element.Series !== Series.NobleGases);
    case Prompts.Metals:
      return Elements.filter(element =>
        element.Series === Series.ReactiveNonmetals ||
        element.Series === Series.NobleGases ||
        element.Series === Series.Metalloids);
    case Prompts.Nonmetals:
      return Elements.filter(element =>
        element.Series === Series.AlkaliMetals ||
        element.Series === Series.AlkalineEarthMetals ||
        element.Series === Series.Lanthanoids ||
        element.Series === Series.Actinoids ||
        element.Series === Series.TransitionMetals ||
        element.Series === Series.PostTransitionMetals ||
        element.Series === Series.Metalloids);
  }
}

// TODO: rework when a deck can implement custom cards
const buildCardSpread = (prompt, settings) => {
  let correct = getCorrect(prompt);
  let incorrect = getIncorrect(prompt);
  let cardSpread = [];

  if (correct.length <= settings.CorrectCount) {
    correct.forEach(element => cardSpread.push(element.Symbol));
  }

  let tempCorrect = [...correct];
  while (cardSpread.length < settings.CorrectCount) {
    let index = Math.floor(Math.random() * tempCorrect.length);
    cardSpread.push(tempCorrect[index].Symbol);
    tempCorrect.splice(index, 1);
  }

  let tempIncorrect = [...incorrect]
  while (cardSpread.length < 16) {
    let index = Math.floor(Math.random() * tempIncorrect.length);
    cardSpread.push(tempIncorrect[index].Symbol);
    tempIncorrect.splice(index, 1);
  }

  return cardSpread;
}

const GetPeriodicTableSpread = (difficulty) => {
  let difficultySettings = getDifficultySettings(difficulty);
  let prompt = 
    difficultySettings.Prompts[
      Math.floor(Math.random() * difficultySettings.Prompts.length)];
  let cardSpread = buildCardSpread(prompt, difficultySettings);

  let periodicTableSpread = {
    Category: DeckCategories.Chemistry,
    Prompt: prompt,
    CardSpread: cardSpread,
    CorrectCount: difficultySettings.CorrectCount,
    IsValidAnswer: function(value) {
      return isValidAnswer(value, prompt);
    }
  }

  return periodicTableSpread;
}

export { GetPeriodicTableSpread };