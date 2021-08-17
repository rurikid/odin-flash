import { GameState, GameConstants } from "./GameState.js";
import { TitleControls } from "./UI/Title.js";
import { SetGameplayTarget, SelectGameplayTarget } from "./UI/Gameplay.js";
import { GameOverControls } from "./UI/GameOver.js";
import { MainMenuControls } from "./UI/MainMenu.js";
import { GameOptionsControls } from "./UI/GameOptions.js";
import { AudioEffects, PlayMusic, PlayEffect, StopMusic } from "./Audio.js";

const ControlConstants = {
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right",
  Select: "Select"
}

const InitControls = () => {
  document.addEventListener('keydown', (e) => {
    switch (GameState.CurrentScreen) {
      case GameConstants.CurrentScreen.Title:
        titleControls(e.code);
        break;
      case GameConstants.CurrentScreen.MainMenu:
        mainMenuControls(e.code);
        break;
      case GameConstants.CurrentScreen.GameOptions:
        gameOptionsControls(e.code);
        break;
      case GameConstants.CurrentScreen.Gameplay:
        gameplayControls(e.code);
        break;
      case GameConstants.CurrentScreen.Gameover:
        gameOverControls(e.code);
        break;
    }
  });
}

const titleControls = (keystroke) => {
  TitleControls(keystroke);
}

const mainMenuControls = (keystroke) => {
  switch (keystroke) {
    case "KeyW":
      PlayEffect(AudioEffects.Target);
      MainMenuControls(ControlConstants.Up);
      break;
    case "KeyS":
      PlayEffect(AudioEffects.Target);
      MainMenuControls(ControlConstants.Down);
      break;
    case "Space":
      PlayEffect(AudioEffects.Select);
      MainMenuControls(ControlConstants.Select);
      break;
  }
}

const gameOptionsControls = (keystroke) => {
  switch (keystroke) {
    case "KeyW":
      PlayEffect(AudioEffects.Target);
      GameOptionsControls(ControlConstants.Up);
      break;
    case "KeyS":
      PlayEffect(AudioEffects.Target);
      GameOptionsControls(ControlConstants.Down);
      break;
    case "KeyA":
      PlayEffect(AudioEffects.Target);
      GameOptionsControls(ControlConstants.Left);
      break;
    case "KeyD":
      PlayEffect(AudioEffects.Target);
      GameOptionsControls(ControlConstants.Right);
      break;
    case "Space":
      PlayEffect(AudioEffects.Select);
      GameOptionsControls(ControlConstants.Select);
      break;
  }
}

const gameplayControls = (keystroke) => {
  switch (keystroke) {
    case "ArrowUp":
      SetGameplayTarget(GameConstants.PlayerTwo, ControlConstants.Up,
                        GameState.GameOptions.GameMode);
      break;
    case "ArrowDown":
      SetGameplayTarget(GameConstants.PlayerTwo, ControlConstants.Down,
                        GameState.GameOptions.GameMode);
      break;
    case "ArrowLeft":
      SetGameplayTarget(GameConstants.PlayerTwo, ControlConstants.Left,
                        GameState.GameOptions.GameMode);
      break;
    case "ArrowRight":
      SetGameplayTarget(GameConstants.PlayerTwo, ControlConstants.Right,
                        GameState.GameOptions.GameMode);
      break;
    case "Enter":
      SelectGameplayTarget(GameConstants.PlayerTwo, GameState.GameOptions.GameMode);
      break;
    case "KeyW":
      SetGameplayTarget(GameConstants.PlayerOne, ControlConstants.Up,
                        GameState.GameOptions.GameMode);
      break;
    case "KeyS":
      SetGameplayTarget(GameConstants.PlayerOne, ControlConstants.Down,
                        GameState.GameOptions.GameMode);
      break;
    case "KeyA":
      SetGameplayTarget(GameConstants.PlayerOne, ControlConstants.Left,
                        GameState.GameOptions.GameMode);
      break;
    case "KeyD":
      SetGameplayTarget(GameConstants.PlayerOne, ControlConstants.Right,
                        GameState.GameOptions.GameMode);
      break;
    case "Space":
      SelectGameplayTarget(GameConstants.PlayerOne, GameState.GameOptions.GameMode);
      break;
  }
}

const gameOverControls = (keystroke) => {
  GameOverControls(keystroke);
}

export { InitControls, ControlConstants };