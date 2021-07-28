import { DeckCategories, DifficultyConstants } from "./DeckFactory.js";

const CorrectCount = 8;

const getDifficultySettings = (difficulty) => {
  switch (difficulty) {
    case DifficultyConstants.Beginner:
      return { Min: 2, Max: 10, ScaleCap: 10 };
    case DifficultyConstants.Intermediate:
      return { Min: 11, Max: 20, ScaleCap: 10 };
    case DifficultyConstants.Advanced:
      return { Min: 21, Max: 50, ScaleCap: 10 };
    case DifficultyConstants.Expert:
      return { Min: 51, Max: 100, ScaleCap: 10 };
  }
}

const isValidAnswer = (value, prompt) => {
  return value % prompt === 0;
}

const getCardSpread = (prompt, scaleCap, maxValue) => {
  let correct = [];
  let cardSpread = [];

  for (let i = 2; i <= scaleCap; i++) {
    correct.push(prompt * i);
  }

  if (correct.length <= CorrectCount) {
    cardSpread.push(...correct);
  }

  while (cardSpread.length < CorrectCount) {
    let index = Math.floor(Math.random() * correct.length);
    cardSpread.push(correct[index]);
    correct.splice(index, 1);
  }

  while (cardSpread.length < 16) {
    let value = Math.floor((Math.random() * maxValue) + 1);
    if (!isValidAnswer(value) &&
        !cardSpread.includes(value)) {
      cardSpread.push(value);
    }
  }

  return cardSpread;
}

const GetMultipleSpread = (difficulty) => {
  let difficultySettings = getDifficultySettings(difficulty);
  let promptValue =
    Math.floor(Math.random() * (difficultySettings.Max - difficultySettings.Min + 1) + difficultySettings.Min);
  let cardSpread = 
    getCardSpread(promptValue, difficultySettings.ScaleCap, difficultySettings.Max);

  let multipleSpread = {
    Category: DeckCategories.Mathematics,
    PromptValue: promptValue,
    Prompt: `Multiples of ${promptValue}`,
    CardSpread: cardSpread,
    CorrectCount: CorrectCount,
    IsValidAnswer: function(value) {
      return value % this.PromptValue === 0;
    }
  }

  return multipleSpread;
}

export { GetMultipleSpread };