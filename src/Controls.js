import { GameState, GameConstants } from "./GameState.js";
import { SetGameplayTarget } from "./UI/Gameplay.js";

const ControlConstants = {
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right",
  Select: "Select"
}

const initControls = () => {
  console.log('Hello Odin!');
  document.addEventListener('keyup', (e) => {
    console.log(e.code);
    switch (e.code) {
      case "ArrowUp":
        TargetUp(GameConstants.PlayerOne);
        break;
      case "ArrowDown":
        TargetDown(GameConstants.PlayerOne);
        break;
      case "ArrowLeft":
        TargetLeft(GameConstants.PlayerOne);
        break;
      case "ArrowRight":
        TargetRight(GameConstants.PlayerOne);
        break;
      case "Enter":
        TargetSelect(GameConstants.PlayerOne);
      case "KeyW":
        TargetUp(GameConstants.PlayerTwo);
        break;
      case "KeyS":
        TargetDown(GameConstants.PlayerTwo);
        break;
      case "KeyA":
        TargetLeft(GameConstants.PlayerTwo);
        break;
      case "KeyD":
        TargetRight(GameConstants.PlayerTwo);
        break;
      case "Space":
        TargetSelect(GameConstants.PlayerTwo);
        break;
    }
  });
}

const TargetUp = (player) => {
  switch (GameState.CurrentScreen)
  {
    case GameConstants.CurrentScreen.Gameplay:
      SetGameplayTarget(player, ControlConstants.Up);
      break;
  }
}

const TargetDown = (player) => {
  switch (GameState.CurrentScreen)
  {
    case GameConstants.CurrentScreen.Gameplay:
      break;
  }
}

const TargetLeft = (player) => {
  switch (GameState.CurrentScreen)
  {
    case GameConstants.CurrentScreen.Gameplay:
      break;
  }
}

const TargetRight = (player) => {
  switch (GameState.CurrentScreen)
  {
    case GameConstants.CurrentScreen.Gameplay:
      break;
  }
}

const TargetSelect = (player) => {
  switch (GameState.CurrentScreen)
  {
    case GameConstants.CurrentScreen.Gameplay:
      break;
  }
}

export { initControls, ControlConstants };