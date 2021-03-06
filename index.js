import { GameConstants, GameState, PlayerSetup } from "./src/GameState.js";
import { InitControls } from "./src/Controls.js";
import { TitleScreen } from "./src/UI/Title.js";
import { GameplayScreen } from "./src/UI/Gameplay.js";
import { DeckFactory } from "./src/DeckFactory/DeckFactory.js";
import { GameOverScreen } from "./src/UI/GameOver.js";
import { MainMenuScreen } from "./src/UI/MainMenu.js";
import { GameOptionsScreen } from "./src/UI/GameOptions.js";
import { InitAudio, AudioEffects, PlayMusic, TransitionMusic } from "./src/Audio.js";

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
      newScreen = GameOptionsScreen();
      break;
    case GameConstants.CurrentScreen.Gameplay:
      TransitionMusic(AudioEffects.GameplayMusic, true);

      // TODO: More elegant way to deal with starting decks/ondeck
      GameState.OnDeck = DeckFactory(GameState.GameOptions.SelectedDecks,
        GameState.GameOptions.Difficulty,
        GameState.GameOptions.TwoPlayerDecks + 1);

      PlayerSetup();

      newScreen = GameplayScreen(GameState.GameOptions.GameMode, GameState.OnDeck);
      break;
    case GameConstants.CurrentScreen.Gameover:
      TransitionMusic(AudioEffects.GameOverMusic, true);

      newScreen = 
        GameOverScreen(GameState.CurrentPlayers, GameState.Players, GameState.OnDeck);
      break;
  }

  GameState.CurrentScreen = screen;

  let gameCanvas = document.getElementById('gameCanvas');
  gameCanvas.innerHTML = '';
  gameCanvas.appendChild(newScreen);
}

InitAudio();
setTimeout(function() { PlayMusic(AudioEffects.TitleMusic, true); }, 500);

InitControls();

ScreenChange(GameConstants.CurrentScreen.Title);

export { ScreenChange };