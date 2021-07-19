import { GameConstants, GameState } from "./src/GameState.js";
import { InitControls } from "./src/Controls.js";
import { TitleScreen } from "./src/UI/Title.js";
import { GameplayScreen, GameplayStyles } from "./src/UI/Gameplay.js";
import { DeckFactory } from "./src/DeckFactory/DeckFactory.js";

console.log('Hello Odin!');

const ScreenChange = (screen) => {
  let newScreen;
  switch (screen) {
    case GameConstants.CurrentScreen.Title:
      newScreen = TitleScreen();
      break;
    case GameConstants.CurrentScreen.Gameplay:
      // TODO: More elegant way to deal with starting decks/ondeck
      GameState.OnDeck = DeckFactory(GameState.GameOptions.SelectedDecks,
        GameState.GameOptions.Difficulty,
        GameState.GameOptions.StartingDecks + 1);
      newScreen = GameplayScreen(GameState.CurrentPlayers, GameState.OnDeck);
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