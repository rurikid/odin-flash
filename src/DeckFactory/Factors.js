import { DeckCategories, DifficultyConstants } from "./DeckFactory.js";

const CorrectCount = 8;

const getDifficultySettings = (difficulty) => {
  switch (difficulty) {
    case DifficultyConstants.Beginner:
      return { Min: 1, Max: 50, MinFactors: 4 };
    case DifficultyConstants.Intermediate:
      return { Min: 51, Max: 100, MinFactors: 4 };
    case DifficultyConstants.Advanced:
      return { Min: 101, Max: 500, MinFactors: 6 };
    case DifficultyConstants.Expert:
      return { Min: 501, Max: 999, MinFactors: 8 };
  }
}

const getAnswers = (promptValue) => {
  let correct = [];
  let incorrect = [];
  for (let i = 1; i <= promptValue; i++) {
    if (promptValue % i === 0) {
      correct.push(i);
    }
    else {
      incorrect.push(i);
    }
  }
  return { Correct: correct, Incorrect: incorrect };
}

const buildCardSpread = (answers) => {
  let cardSpread = [];

  if (answers.Correct.length <= 8) {
    cardSpread.push(...answers.Correct);
  }

  let correct = [...answers.Correct];
  while (cardSpread.length < 8) {
    let index = Math.floor(Math.random() * correct.length);
    cardSpread.push(correct[index]);
    correct.splice(index, 1);
  }

  if (answers.Incorrect.length <= 8) {
    cardSpread.push(...answers.Incorrect);
  }

  while (cardSpread.length < 16) {
    let incorrect = [...answers.Incorrect];
    while (incorrect.length > 0 &&
           cardSpread.length < 16) {
      let index = Math.floor(Math.random() * incorrect.length);
      cardSpread.push(incorrect[index]);
      incorrect.splice(index, 1);
    }
  }

  return cardSpread;
}

const GetFactorSpread = (difficulty) => {
  let difficultySettings = getDifficultySettings(difficulty);
  let promptValue = 
    Math.floor(Math.random() * (difficultySettings.Max - difficultySettings.Min + 1) + difficultySettings.Min);
  let answers = getAnswers(promptValue);

  if (answers.Correct.length <= difficultySettings.MinFactors) {
    return GetFactorSpread(difficulty);
  }

  let cardSpread = buildCardSpread(answers);

  let factorSpread = {
    Category: DeckCategories.Mathematics,
    PromptValue: promptValue,
    Prompt: `Factors of ${promptValue}`,
    CardSpread: cardSpread,
    CorrectCount: CorrectCount,
    IsValidAnswer: function(value) {
      if (this.PromptValue % value === 0) {
        return true;
      }
      return false;
    }
  };

  return factorSpread;
}

export { GetFactorSpread };