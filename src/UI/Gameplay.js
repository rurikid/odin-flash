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
  onDeck: "flex-column on-deck",
  targeted: " targeted",  // generally appended
  incorrect: " incorrect",  // generally appended
};

// TODO: Add player specific IDs to simplify targeting
const GameplayIDs = {
  gameplayScreen: "gameplayScreen",
  playerOne: "playerOne",
  playerTwo: "playerTwo",
  gameSpread: "gameSpread",
  gamePrompt: "gamePrompt",
  cardSpread: "cardSpread",
  statusPanel: "statusPanel",
  onDeck: "onDeck",
  targeted: "targeted"
}

const GameplayScreen = (players, onDeck) => 
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
    playerArea.appendChild(gameSpread(onDeck[0], player));
    playerArea.appendChild(statusPanel(onDeck.length));
  }
  else
  {
    playerArea.className = GameplayStyles.playerTwo;
    playerArea.id = GameplayIDs.playerTwo;
    playerArea.appendChild(statusPanel(onDeck.length));
    playerArea.appendChild(gameSpread(onDeck[0], player));
  }

  return playerArea;
}

// TODO: Display controls to player
const gameSpread = (onDeck, player) => {
  let gameSpread = document.createElement("div");
  gameSpread.className = GameplayStyles.gameSpread;
  gameSpread.id = GameplayIDs.gameSpread;

  gameSpread.appendChild(
    gameCard(onDeck.Prompt, GameplayStyles.promptBase, GameplayStyles.promptFace));

  gameSpread.appendChild(cardSpread(onDeck.CardSpread, player));

  return gameSpread;
}

const cardSpread = (cardValues, player) => {
  let cardSpread = document.createElement("div");
  cardSpread.className = GameplayStyles.cardSpread;
  cardSpread.id = GameplayIDs.cardSpread;

  let values = ShuffleArray([...cardValues]);
  for (let i = 0; i < 16; i++) {
    cardSpread.appendChild(gameCard(values[i], GameplayStyles.cardBase, GameplayStyles.cardFace));
  }

  cardSpread.children[GameState.Players[player].TargetIndex].className += GameplayStyles.targeted;

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
  onDeck.className = GameplayStyles.onDeck;
  onDeck.id = GameplayIDs.onDeck;

  for (let i = 0; i < count - 1; i++) {
    onDeck.appendChild(
      gameCard('', GameplayStyles.onDeckBase, GameplayStyles.onDeckBack));
  }

  return onDeck;
}

const GetGameplayTarget = (player) => {
  return getPlayerGame(player)
    .querySelector("#" + GameplayIDs.gameSpread)
    .querySelector("#" + GameplayIDs.cardSpread)
    .children[GameState.Players[player].TargetIndex];
}

const SetGameplayTarget = (player, direction) => {
  if (!GameState.Players[player].TimedOut)
  {
    let cardSpread = getPlayerGame(player)
    .querySelector("#" + GameplayIDs.gameSpread)
    .querySelector("#" + GameplayIDs.cardSpread);

    let currentIndex = GameState.Players[player].TargetIndex;
    let newIndex = findNewTargetIndex(currentIndex, direction);
    GameState.Players[player].TargetIndex = newIndex;

    cardSpread.children[currentIndex].className = 
      cardSpread.children[currentIndex].className
      .replace(GameplayStyles.targeted, "");
    cardSpread.children[currentIndex].removeAttribute('id');
    cardSpread.children[newIndex].className += GameplayStyles.targeted;
    cardSpread.children[newIndex].id = GameplayIDs.targeted;
  }
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
  if (!GameState.Players[player].TimedOut)
  {
    let selection = GetGameplayTarget(player);

    if (selection.children[0].innerHTML != "")
    {
      if (GameState.OnDeck[GameState.Players[player].CurrentDeckIndex]
          .IsValidAnswer(selection.children[0].innerHTML))
      {
        IncrementScore(player, 100);
        GameState.Players[player].CurrentRemainingCorrect--;
      }
      else
      {
        setPlayerTimeout(player);
      }
  
      selection.children[0].className = GameplayStyles.cardBack;
      selection.children[0].innerHTML = "";
  
      if (GameState.Players[player].CurrentRemainingCorrect === 0)
      {
        if (GameState.Players[player].PerfectSpread === true)
        {
          IncrementScore(player, 1000);
        }
        if (GameState.Players[player].OnDeckCount === 0)
        {
          // game over?
          console.log("Game Over");
        }
        IncrementSpread(player);
      }
    }
  }
}

const setPlayerTimeout = (player) => {
  GameState.Players[player].PerfectSpread = false;
  GameState.Players[player].TimedOut = true;

  let playerTarget = GetGameplayTarget(player);
  playerTarget.className = 
    playerTarget.className
    .replace(GameplayStyles.targeted, GameplayStyles.incorrect);

  setTimeout(() => {endPlayerTimeout(player)}, 1000);
}

const endPlayerTimeout = (player) => {
  let playerTarget = GetGameplayTarget(player);
  playerTarget.className = 
    playerTarget.className
    .replace(GameplayStyles.incorrect, GameplayStyles.targeted);
  GameState.Players[player].TimedOut = false;
}

const getPlayerGame = (player) => {
  return document.getElementById(
    player === GameConstants.PlayerOne ? 
    GameplayIDs.playerOne : GameplayIDs.playerTwo
  );
}

const IncrementSpread = (player) => {
  dropOnDeck(player);
  addOnDeck(player === GameConstants.PlayerOne ? 
    GameConstants.PlayerTwo : GameConstants.PlayerOne);

  let playerGame = getPlayerGame(player);

  // TODO: Current remaining might depend on the deck
  GameState.Players[player].CurrentRemainingCorrect = 8;
  GameState.Players[player].CurrentDeckIndex++;
  GameState.Players[player].PerfectSpread = true;

  if (GameState.Players[player].CurrentDeckIndex > GameState.OnDeck.length) {
    GameState.OnDeck.push(DeckFactory(
      GameState.GameOptions.SelectedDecks,
      GameState.GameOptions.Difficulty,
      1));
  }

  // TODO: create a better way to do this, this is a coincidental hack
  let oldGameSpread = playerGame.children[player];
  let newGameSpread = gameSpread(
    GameState.OnDeck[GameState.Players[player].CurrentDeckIndex],
    player);

  playerGame.replaceChild(newGameSpread, oldGameSpread);
}

const IncrementScore = (player, value) => {
  GameState.Players[player].Score += value;

  getPlayerGame(player)
    .querySelector("#" + GameplayIDs.statusPanel).children[0]
    .children[1].innerHTML = GameState.Players[player].Score;
}

const addOnDeck = (player) => {
  GameState.Players[player].OnDeckCount++;

  let onDeck = getPlayerGame(player)
    .querySelector("#" + GameplayIDs.statusPanel)
    .querySelector("#" + GameplayIDs.onDeck);

  onDeck.appendChild(gameCard("", GameplayStyles.onDeckBase, GameplayStyles.onDeckBack));
}
// TODO: container resizes without a card
const dropOnDeck = (player) => {
  GameState.Players[player].OnDeckCount--;

  let onDeck = getPlayerGame(player)
    .querySelector("#" + GameplayIDs.statusPanel)
    .querySelector("#" + GameplayIDs.onDeck);

  onDeck.removeChild(onDeck.firstChild);
}

export { GameplayStyles, GameplayScreen, SetGameplayTarget, SelectGameplayTarget };