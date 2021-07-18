import { GameState, GameConstants } from "./GameState.js";
import { SetGameplayTarget, SelectGameplayTarget } from "./UI/Gameplay.js";

const ControlConstants = {
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right",
  Select: "Select"
}

const initControls = () => {
  document.addEventListener('keydown', (e) => {
     switch (e.code) {
      case "ArrowUp":
        SetTarget(GameConstants.PlayerTwo, ControlConstants.Up);
        break;
      case "ArrowDown":
        SetTarget(GameConstants.PlayerTwo, ControlConstants.Down);
        break;
      case "ArrowLeft":
        SetTarget(GameConstants.PlayerTwo, ControlConstants.Left);
        break;
      case "ArrowRight":
        SetTarget(GameConstants.PlayerTwo, ControlConstants.Right);
        break;
      case "Enter":
        SelectTarget(GameConstants.PlayerTwo, ControlConstants.Select);
        break;
      case "KeyW":
        SetTarget(GameConstants.PlayerOne, ControlConstants.Up);
        break;
      case "KeyS":
        SetTarget(GameConstants.PlayerOne, ControlConstants.Down);
        break;
      case "KeyA":
        SetTarget(GameConstants.PlayerOne, ControlConstants.Left);
        break;
      case "KeyD":
        SetTarget(GameConstants.PlayerOne, ControlConstants.Right);
        break;
      case "Space":
        SelectTarget(GameConstants.PlayerOne, ControlConstants.Select);
        break;
    }
  });
}

const SetTarget = (player, direction) => {
  if (!GameState.Players[player].TimedOut)
  {
    switch (GameState.CurrentScreen)
    {
      case GameConstants.CurrentScreen.Gameplay:
        SetGameplayTarget(player, direction);
        break;
    }
  }
}

const SelectTarget = (player) => {
  if (!GameState.Players[player].TimedOut)
  {
    switch (GameState.CurrentScreen)
    {
      case GameConstants.CurrentScreen.Gameplay:
        SelectGameplayTarget(player);
        break;
    }
  }
}

export { initControls, ControlConstants };