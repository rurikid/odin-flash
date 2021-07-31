import { GameConstants, GameState } from "../GameState.js";
import { ControlConstants } from "../Controls.js";
import { ShuffleArray } from "../Utilities.js";
import { ScreenChange } from "../../index.js";
import { AudioEffects, PlayMusic, PlayEffect, StopMusic } from "../Audio.js";
import { DeckFactory } from "../DeckFactory/DeckFactory.js";

const GameplayStyles = {
  promptBase: "prompt-card",
  promptFace: "flex-center prompt-face",
  cardContainer: "card-container",
  card: "flex-center card",
  cardFaceBorder: "card-face-border",
  cardBackBorder: "card-back-border",
  cardFace: "flex-center card-face",
  cardBack: "flex-center card-back",
  onDeckBase: "on-deck-card",
  onDeckBack: "flex-center on-deck-back",
  vegvisir: "vegvisir",
  gameplayScreen: "flex-center flex-row gameplay-screen",
  playerOne: "flex-center flex-row player-one",
  playerTwo: "flex-center flex-row player-two",
  gameSpread: "flex-center flex-column",
  cardSpread: "flex-center flex-row card-spread",
  statusPanel: "flex-center flex-column status-panel",
  gameStatus: "flex-center flex-column game-status",
  onDeck: "flex-column on-deck",
  targeted: "targeted",  // generally appended
  incorrect: "incorrect",  // generally appended
  flipped: "flipped"  // generally appende
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

let lockout = true;

const GameplayScreen = (players, onDeck) => 
{
  lockout = true;
  setTimeout(function() { lockout = false; }, 2000);

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

  gameSpread.appendChild(GamePrompt(onDeck.Prompt));

  gameSpread.appendChild(cardSpread(onDeck.CardSpread, player));

  return gameSpread;
}

const cardSpread = (cardValues, player) => {
  let cardSpread = document.createElement("div");
  cardSpread.className = GameplayStyles.cardSpread;
  cardSpread.id = GameplayIDs.cardSpread;

  let values = ShuffleArray([...cardValues]);
  for (let i = 0; i < 16; i++) {
    cardSpread.appendChild(GameCard(values[i], GameplayStyles.cardBase, GameplayStyles.cardFace));
  }

  cardSpread.children[GameState.Players[player].TargetIndex]
    .children[0]
    .children[0].classList.toggle(GameplayStyles.targeted);
  cardSpread.children[GameState.Players[player].TargetIndex].id = GameplayStyles.targeted;

  flipSpread(cardSpread, false, false);
  setTimeout(function() { flipSpread(cardSpread, true) }, 1000)

  return cardSpread;
}

const flipSpread = (spread, isFaceUp, playEffect = true) => {
  if (playEffect) {
    PlayEffect(AudioEffects.NewDeck);
  }

  if (isFaceUp) {
    for (let index of spread.children) {
      index.children[0].classList.remove(GameplayStyles.flipped);
    }
  } else {
    for (let index of spread.children) {
      if (!index.children[0].classList.contains(GameplayStyles.flipped)) {
        index.children[0].classList.add(GameplayStyles.flipped);
      }
    }
  }
}

const GameCard = (value) => {
  let cardContainer = document.createElement('div');
  cardContainer.className = GameplayStyles.cardContainer;

  let gameCard = document.createElement('div');
  gameCard.className = GameplayStyles.card;

  let faceBorder = document.createElement('div');
  faceBorder.className = GameplayStyles.cardFaceBorder;

  let cardFace = document.createElement('div');
  cardFace.className = GameplayStyles.cardFace;
  cardFace.innerHTML = value;

  let backBorder = document.createElement('div');
  backBorder.className = GameplayStyles.cardBackBorder;

  let cardBack = document.createElement('div');
  cardBack.className = GameplayStyles.cardBack;

  let vegvisir = document.createElement("img");
  vegvisir.className = GameplayStyles.vegvisir;
  vegvisir.src = "./images/vegvisir.svg";

  cardBack.appendChild(vegvisir);

  faceBorder.appendChild(cardFace);
  backBorder.appendChild(cardBack);
  
  gameCard.appendChild(faceBorder);
  gameCard.appendChild(backBorder);

  cardContainer.appendChild(gameCard);

  return cardContainer;
}

const GamePrompt = (value) => {
  let base = document.createElement("div");
  base.className = GameplayStyles.promptBase;

  let face = document.createElement("div");
  face.className = GameplayStyles.promptFace;
  face.innerHTML = value;

  base.appendChild(face);
  return base;
}

const onDeckCard = () => {
  let base = document.createElement("div");
  base.className = GameplayStyles.onDeckBase;

  let face = document.createElement("div");
  face.className = GameplayStyles.onDeckBack;

  let vegvisir = document.createElement("img");
  vegvisir.className = GameplayStyles.vegvisir;
  vegvisir.src = "./images/vegvisir.svg";

  face.appendChild(vegvisir);

  base.appendChild(face);
  return base;
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
    onDeck.appendChild(onDeckCard());
  }

  return onDeck;
}

const GetGameplayTarget = (player) => {
  return getPlayerGame(player)
    .querySelector("#" + GameplayIDs.gameSpread)
    .querySelector("#" + GameplayIDs.cardSpread)
    .querySelector("#" + GameplayIDs.targeted);
}

const SetGameplayTarget = (player, direction) => {
  if (!GameState.Players[player].TimedOut && !lockout)
  {
    PlayEffect(AudioEffects.Target);

    let cardSpread = getPlayerGame(player)
    .querySelector("#" + GameplayIDs.gameSpread)
    .querySelector("#" + GameplayIDs.cardSpread);

    let currentIndex = GameState.Players[player].TargetIndex;
    let newIndex = findNewTargetIndex(currentIndex, direction);
    GameState.Players[player].TargetIndex = newIndex;

    // remove old targeting
    let oldTarget = cardSpread.querySelector("#" + GameplayIDs.targeted);

    if (oldTarget.children[0].classList.contains(GameplayStyles.flipped)) {
      oldTarget.children[0].children[1].classList.remove(GameplayStyles.targeted);
    } else {
      oldTarget.children[0].children[0].classList.remove(GameplayStyles.targeted);
    }

    oldTarget.removeAttribute('id');

    // add new targeting
    if (cardSpread.children[newIndex].children[0].classList.contains(GameplayStyles.flipped)) {
      cardSpread.children[newIndex].children[0].children[1]
        .classList.add(GameplayStyles.targeted);
    } else {
      cardSpread.children[newIndex].children[0].children[0]
        .classList.add(GameplayStyles.targeted);
    }

    cardSpread.children[newIndex].id = GameplayIDs.targeted;

  } else if (GameState.Players[player].TimedOut && lockout) {
    PlayEffect(AudioEffects.Incorrect);
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
  if (!GameState.Players[player].TimedOut && !lockout)
  {
    let selection = GetGameplayTarget(player);

    if (selection.children[0].children[0].children[0].innerHTML != "")
    {
      GameState.Players[player].SelectedCount++;

      if (GameState.OnDeck[GameState.Players[player].CurrentDeckIndex]
          .IsValidAnswer(selection.children[0].children[0].children[0].innerHTML))
      {
        PlayEffect(AudioEffects.Correct);
        GameState.Players[player].CorrectCount++;
        IncrementScore(player, 100);
        GameState.Players[player].CurrentRemainingCorrect--;
      }
      else
      {
        PlayEffect(AudioEffects.Incorrect);
        setPlayerTimeout(player);
      }
  
      selection.children[0].classList.add(GameplayStyles.flipped);
      selection.children[0].children[0].classList.remove(GameplayStyles.targeted)
      selection.children[0].children[1].classList.add(GameplayStyles.targeted)
      selection.children[0].children[0].children[0].innerHTML = "";
  
      if (GameState.Players[player].CurrentRemainingCorrect === 0)
      {
        GameState.Players[player].CompletedPrompts++;

        if (GameState.Players[player].PerfectSpread === true)
        {
          IncrementScore(player, 1000);
        }
        if (GameState.Players[player].OnDeckCount === 0)
        {
          ScreenChange(GameConstants.CurrentScreen.Gameover);
          return;
        }
        flipSpread(getPlayerGame(player).children[player].children[1], false, true);

        setTimeout(function() { IncrementSpread(player); }, 1000);
      }
    }
  }
}

const setPlayerTimeout = (player) => {
  GameState.Players[player].PerfectSpread = false;
  GameState.Players[player].TimedOut = true;

  let playerTarget = GetGameplayTarget(player);

  playerTarget.children[0].children[0].classList.remove(GameplayStyles.targeted);
  playerTarget.children[0].children[1].classList.add(GameplayStyles.incorrect);

  setTimeout(() => {endPlayerTimeout(player)}, 1000);
}

const endPlayerTimeout = (player) => {
  let playerTarget = GetGameplayTarget(player);

  playerTarget.children[0].children[1].classList.add(GameplayStyles.targeted);
  playerTarget.children[0].children[1].classList.remove(GameplayStyles.incorrect);

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

  GameState.Players[player].CurrentDeckIndex++;

  if (GameState.Players[player].CurrentDeckIndex >= GameState.OnDeck.length) {
    console.log('push');
    GameState.OnDeck.push(DeckFactory(
      GameState.GameOptions.SelectedDecks,
      GameState.GameOptions.Difficulty,
      1));
  }

  GameState.Players[player].CurrentRemainingCorrect =
    GameState.OnDeck[GameState.Players[player].CurrentDeckIndex].CorrectCount;
  GameState.Players[player].PerfectSpread = true;

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

  onDeck.appendChild(onDeckCard());
}

const dropOnDeck = (player) => {
  GameState.Players[player].OnDeckCount--;

  let onDeck = getPlayerGame(player)
    .querySelector("#" + GameplayIDs.statusPanel)
    .querySelector("#" + GameplayIDs.onDeck);

  onDeck.removeChild(onDeck.firstChild);
}

export { GameplayStyles, GameplayScreen, SetGameplayTarget, SelectGameplayTarget, GameCard, GamePrompt };