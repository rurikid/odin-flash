const CorrectCount = 8;

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
  let promptValue = Math.floor(Math.random() * 100) + 1;
  let answers = getAnswers(promptValue);

  if (answers.Correct.length <= 3) {
    return GetFactorSpread(difficulty);
  }

  let cardSpread = buildCardSpread(answers);

  let factorSpread = {
    PromptValue: promptValue,
    Prompt: `Factors of ${promptValue}`,
    CardSpread: cardSpread,
    CorrectCount: CorrectCount,
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