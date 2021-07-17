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

const buildCardSpread = (promptValue) => {
  let answers = getAnswers(promptValue);
  let cardSpread = [];
  for (let i = 0; i < 8; i++) {
    cardSpread.push(Math.floor(Math.random() * answers.Correct.length) + 1);
  }
  for (let i = 0; i < 8; i++) {
    cardSpread.push(Math.floor(Math.random() * answers.Incorrect.length) + 1);
  }
  return cardSpread;
}

const GetFactorSpread = (difficulty) => {
  let promptValue = Math.floor(Math.random() * 100) + 1;
  let cardSpread = buildCardSpread(promptValue);

  let factorSpread = {
    PromptValue: promptValue,
    Prompt: `Factors of ${promptValue}`,
    CardSpread: cardSpread,
    IsValidAnswer: function(value) {
      if (this.PromptValue % value === 0) {
        this.CorrectRemaining--;
        return true;
      }
      return false;
    }
  }

  return factorSpread;
}

export { GetFactorSpread };