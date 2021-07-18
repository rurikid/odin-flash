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

  if (answers.Correct.length <= 8) {
    cardSpread.push(...answers.Correct);
  }

  let cards = [...answers.Correct];
  for (let i = cardSpread.length; i < 8; i++) {
    let index = Math.floor(Math.random() * cards.length);
    cardSpread.push(cards[index]);
    cards = cards.splice(index, 1);
  }
  cards = [...answers.Incorrect]
  for (let i = cardSpread.length; i < 16; i++) {
    let index = Math.floor(Math.random() * cards.length);
    cardSpread.push(cards[index]);
    cards = cards.splice(index, 1);
  }
  console.log(cardSpread);

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