import { GameConstants, GameState } from "../GameState.js";
import { ControlConstants } from "../Controls.js";

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

const gameplayScreen = (players) => 
{
  let gameplayScreen = document.createElement("div");
  gameplayScreen.className = GameplayStyles.gameplayScreen;
  gameplayScreen.id = GameplayIDs.gameplayScreen;

  gameplayScreen.appendChild(playerGame(1));
  if (players > 1)
  {
    gameplayScreen.appendChild(playerGame(2));
  }

  return gameplayScreen;
}

const playerGame = (player) => {
  let playerArea = document.createElement("div");

  if (player === 1) {
    playerArea.className = GameplayStyles.playerOne;
    playerArea.id = GameplayIDs.playerOne;
    playerArea.appendChild(gameSpread());
    playerArea.appendChild(statusPanel());
  }
  else
  {
    playerArea.className = GameplayStyles.playerTwo;
    playerArea.id = GameplayIDs.playerTwo;
    playerArea.appendChild(statusPanel());
    playerArea.appendChild(gameSpread());
  }

  return playerArea;
}

const gameSpread = () => {
  let gameSpread = document.createElement("div");
  gameSpread.className = GameplayStyles.gameSpread;
  gameSpread.id = GameplayIDs.gameSpread;

  gameSpread.appendChild(
    gameCard('Test Card', GameplayStyles.promptBase, GameplayStyles.promptFace));

  gameSpread.appendChild(cardSpread());

  return gameSpread;
}

const cardSpread = () => {
  let cardSpread = document.createElement("div");
  cardSpread.className = GameplayStyles.cardSpread;
  cardSpread.id = GameplayIDs.cardSpread;

  for (let i = 0; i < 16; i++) {
    cardSpread.appendChild(gameCard('4', GameplayStyles.cardBase, GameplayStyles.cardFace));
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

const statusPanel = () => {
  let statusPanel = document.createElement('div');
  statusPanel.className = GameplayStyles.statusPanel;
  statusPanel.id = GameplayIDs.statusPanel;

  let gameStatus = document.createElement('div');
  gameStatus.className = GameplayStyles.gameStatus;
  gameStatus.innerHTML = "<h1>Score</h1><p>0</p>";

  statusPanel.appendChild(gameStatus);
  statusPanel.appendChild(onDeck());

  return statusPanel;
}

const onDeck = () => {
  let onDeck = document.createElement('div');
  onDeck.className = GameplayStyles.onDeckDecks;
  onDeck.id = GameplayIDs.onDeckDecks;

  onDeck.appendChild(
    gameCard('', GameplayStyles.onDeckBase, GameplayStyles.onDeckBack));

  return onDeck;
}

const addOnDeck = (player) => {

}

const dropOnDeck = (player) => {

}

const GetGameplayTarget = (player) => {
  return document.getElementById(
    player === GameConstants.PlayerOne ? GameplayIDs.playerOne : GameplayIDs.playerTwo)
    .querySelector("#" + GameplayIDs.gameSpread)
    .querySelector("#" + GameplayIDs.cardSpread)
    .children[player === GameConstants.PlayerOne ? 
      GameState.PlayerOne.TargetIndex : GameState.PlayerTwo.TargetIndex];
}

const SetGameplayTarget = (player, direction) => {
  let cardSpread = document.getElementById(
    player === GameConstants.PlayerOne ? GameplayIDs.playerOne : GameplayIDs.playerTwo)
    .querySelector("#" + GameplayIDs.gameSpread)
    .querySelector("#" + GameplayIDs.cardSpread);

  let currentIndex = -1;
  let newIndex = -1;

  if (player === GameConstants.PlayerOne)
  {
    currentIndex = GameState.PlayerOne.TargetIndex;
    newIndex = findNewTargetIndex(GameState.PlayerOne.TargetIndex, direction);
    GameState.PlayerOne.TargetIndex = newIndex;
  }
  else if (player === GameConstants.PlayerTwo)
  {
    currentIndex = GameState.PlayerTwo.TargetIndex;
    newIndex = findNewTargetIndex(GameState.PlayerTwo.TargetIndex, direction);
    GameState.PlayerTwo.TargetIndex = newIndex;
  }

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

  // validate card

  // flip card
  console.log(selection);
  selection.children[0].className = GameplayStyles.cardBack;
  selection.children[0].innerHTML = "";

  // validate spread
}



const setGameCard = (player, index, value, baseStyle, faceStyle) => {

}

export { GameplayStyles, gameplayScreen, SetGameplayTarget, SelectGameplayTarget };