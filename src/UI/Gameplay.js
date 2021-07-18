import { GameConstants, GameState } from "../GameState.js";
import { ControlConstants } from "../Controls.js";
import { ShuffleArray } from "../Utilities.js";

const GameplayStyles = {
  promptBase: "prompt-card",
  promptFace: "flex-center prompt-face",
  cardBase: "card",
  cardFace: "flex-center card-face",
  cardBack: "flex-center card-back",
  onDeckBase: "card on-deck-deck",
  onDeckBack: "card-back",
  gameplayScreen: "flex-center flex-row gameplay-screen",
  playerOne: "flex-center flex-row player-one",
  playerTwo: "flex-center flex-row player-two",
  gameSpread: "flex-center flex-column",
  cardSpread: "flex-center flex-row card-spread",
  statusPanel: "flex-center flex-column status-panel",
  gameStatus: "flex-center flex-column game-status",
  onDeckDecks: "flex-column on-deck-decks",
};

const GameplayIDs = {
  gameplayScreen: "gameplayScreen",
  playerOne: "playerOne",
  playerTwo: "playerTwo",
  gameSpread: "gameSpread",
  gamePrompt: "gamePrompt",
  cardSpread: "cardSpread",
  statusPanel: "statusPanel",
  onDeckDecks: "onDeckDecks",
  targeted: "targeted"
}

const gameplayScreen = (players, onDeck) => 
{
  let gameplayScreen = document.createElement("div");
  gameplayScreen.className = GameplayStyles.gameplayScreen;
  gameplayScreen.id = GameplayIDs.gameplayScreen;

  gameplayScreen.appendChild(playerGame(GameConstants.PlayerOne, onDeck));
  if (players > 1)
  {
    gameplayScreen.appendChild(playerGame(GameConstants.PlayerTwo, onDeck));
  }

  return gameplayScreen;
}

const playerGame = (player, onDeck) => {
  let playerArea = document.createElement("div");

  if (player === GameConstants.PlayerOne) {
    playerArea.className = GameplayStyles.playerOne;
    playerArea.id = GameplayIDs.playerOne;
    playerArea.appendChild(gameSpread(onDeck[0]));
    playerArea.appendChild(statusPanel(onDeck.length));
  }
  else
  {
    playerArea.className = GameplayStyles.playerTwo;
    playerArea.id = GameplayIDs.playerTwo;
    playerArea.appendChild(statusPanel(onDeck.length));
    playerArea.appendChild(gameSpread(onDeck[0]));
  }

  return playerArea;
}

const gameSpread = (onDeck) => {
  let gameSpread = document.createElement("div");
  gameSpread.className = GameplayStyles.gameSpread;
  gameSpread.id = GameplayIDs.gameSpread;

  gameSpread.appendChild(
    gameCard(onDeck.Prompt, GameplayStyles.promptBase, GameplayStyles.promptFace));

  gameSpread.appendChild(cardSpread(onDeck.CardSpread));

  return gameSpread;
}

const cardSpread = (cardValues) => {
  console.log(cardValues.CardSpread);
  let cardSpread = document.createElement("div");
  cardSpread.className = GameplayStyles.cardSpread;
  cardSpread.id = GameplayIDs.cardSpread;

  let values = ShuffleArray([...cardValues]);
  for (let i = 0; i < 16; i++) {
    cardSpread.appendChild(gameCard(values[i], GameplayStyles.cardBase, GameplayStyles.cardFace));
  }

  cardSpread.children[15].className += " targeted";

  return cardSpread;
}

const gameCard = (value, baseStyle, faceStyle) => {
  let gameCard = document.createElement('div');
  gameCard.className = baseStyle;

  let cardFace = document.createElement('div');
  cardFace.className = faceStyle;
  cardFace.innerHTML = value;

  gameCard.appendChild(cardFace);

  return gameCard;
}

const statusPanel = (onDeckCount) => {
  let statusPanel = document.createElement('div');
  statusPanel.className = GameplayStyles.statusPanel;
  statusPanel.id = GameplayIDs.statusPanel;

  let gameStatus = document.createElement('div');
  gameStatus.className = GameplayStyles.gameStatus;
  gameStatus.innerHTML = "<h1>Score</h1><p>0</p>";

  statusPanel.appendChild(gameStatus);
  statusPanel.appendChild(onDeck(onDeckCount));

  return statusPanel;
}

const onDeck = (count) => {
  let onDeck = document.createElement('div');
  onDeck.className = GameplayStyles.onDeckDecks;
  onDeck.id = GameplayIDs.onDeckDecks;

  for (let i = 0; i < count - 1; i++) {
    onDeck.appendChild(
      gameCard('', GameplayStyles.onDeckBase, GameplayStyles.onDeckBack));
  }

  return onDeck;
}

const GetGameplayTarget = (player) => {
  return document.getElementById(
    player === GameConstants.PlayerOne ? GameplayIDs.playerOne : GameplayIDs.playerTwo)
    .querySelector("#" + GameplayIDs.gameSpread)
    .querySelector("#" + GameplayIDs.cardSpread)
    .children[GameState.Players[player].TargetIndex];
}

const SetGameplayTarget = (player, direction) => {
  let cardSpread = document.getElementById(
    player === GameConstants.PlayerOne ? GameplayIDs.playerOne : GameplayIDs.playerTwo)
    .querySelector("#" + GameplayIDs.gameSpread)
    .querySelector("#" + GameplayIDs.cardSpread);

  let currentIndex = -1;
  let newIndex = -1;

  currentIndex = GameState.Players[player].TargetIndex;
  newIndex = findNewTargetIndex(currentIndex, direction);
  GameState.Players[player].TargetIndex = newIndex;

  cardSpread.children[currentIndex].className = cardSpread.children[currentIndex].className.replace(" targeted", "");
  cardSpread.children[currentIndex].removeAttribute('id');
  cardSpread.children[newIndex].className += " targeted";
  cardSpread.children[newIndex].id = GameplayIDs.targeted;
}

const findNewTargetIndex = (index, direction) => {
  switch (direction) {
    case ControlConstants.Up:
      return index - 4 < 0 ? index : index - 4;
    case ControlConstants.Down:
      return index + 4 > 15 ? index : index + 4;
    case ControlConstants.Left:
      return index % 4 === 0 ? index : index - 1;
    case ControlConstants.Right:
      return (index + 1) % 4 === 0 ? index : index + 1;
  }
}

const SelectGameplayTarget = (player) => {
  let selection = GetGameplayTarget(player);

  // validate selection
  if (selection.children[0].innerHTML != "")
  {
    if (GameState.OnDeck[GameState.Players[player].CurrentDeckIndex]
        .IsValidAnswer(selection.children[0].innerHTML))
      {
        IncrementScore(player, 100);
        GameState.Players[player].CurrentRemainingCorrect--;
      }

    selection.children[0].className = GameplayStyles.cardBack;
    selection.children[0].innerHTML = "";

    if (GameState.Players[player].CurrentRemainingCorrect === 0)
    {
      if (GameState.Players[player].OnDeckCount === 0)
      {
        // game over?
      }
      // validate game
      // increment spread
      // decrement onDeck
    }
  }
}

const IncrementScore = (player, value) => {
  GameState.Players[player].Score += value;
  let playerSpread = document.getElementById(player === GameConstants.PlayerOne ?
    GameplayIDs.playerOne : GameplayIDs.playerTwo);
  playerSpread.querySelector("#" + GameplayIDs.statusPanel).children[0]
    .children[1].innerHTML = GameState.Players[player].Score;
}

const setGameCard = (player, index, value, baseStyle, faceStyle) => {

}

const addOnDeck = (player) => {

}

const dropOnDeck = (player) => {

}

export { GameplayStyles, gameplayScreen, SetGameplayTarget, SelectGameplayTarget };