import { GameConstants, GameState } from "./src/GameState.js";
import { InitControls } from "./src/Controls.js";
import { TitleScreen } from "./src/UI/Title.js";
import { GameplayScreen } from "./src/UI/Gameplay.js";
import { DeckFactory } from "./src/DeckFactory/DeckFactory.js";
import { GameOverScreen } from "./src/UI/GameOver.js";
import { MainMenuScreen } from "./src/UI/MainMenu.js";

console.log('Hello Odin!');

const ScreenChange = (screen) => {
  let newScreen;
  switch (screen) {
    case GameConstants.CurrentScreen.Title:
      newScreen = TitleScreen();
      break;
    case GameConstants.CurrentScreen.MainMenu:
      newScreen = MainMenuScreen();
      break;
    case GameConstants.CurrentScreen.GameOptions:

      break;
    case GameConstants.CurrentScreen.Gameplay:
      // TODO: More elegant way to deal with starting decks/ondeck
      GameState.OnDeck = DeckFactory(GameState.GameOptions.SelectedDecks,
        GameState.GameOptions.Difficulty,
        GameState.GameOptions.StartingDecks + 1);

      // TODO: this needs to be instantiated in game options
      GameState.Players[0].OnDeckCount = 1;
      GameState.Players[1].OnDeckCount = 1;
      // TODO: move this to a better spot
      GameState.Players[0].CurrentRemainingCorrect =
        GameState.OnDeck[GameState.Players[0].CurrentDeckIndex].CorrectCount;
      GameState.Players[1].CurrentRemainingCorrect =
        GameState.OnDeck[GameState.Players[1].CurrentDeckIndex].CorrectCount;

        newScreen = GameplayScreen(GameState.CurrentPlayers, GameState.OnDeck);
      break;
    case GameConstants.CurrentScreen.Gameover:
        newScreen = 
          GameOverScreen(GameState.CurrentPlayers, GameState.Players, GameState.OnDeck);
      break;
  }

  GameState.CurrentScreen = screen;

  let gameCanvas = document.getElementById('gameCanvas');
  gameCanvas.innerHTML = '';
  gameCanvas.appendChild(newScreen);
}

InitControls();

ScreenChange(GameConstants.CurrentScreen.Title);

export { ScreenChange };