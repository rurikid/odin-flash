import { GameConstants, GameState } from "./src/GameState.js";
import { InitControls } from "./src/Controls.js";
import { TitleScreen } from "./src/UI/Title.js";
import { GameplayScreen } from "./src/UI/Gameplay.js";
import { DeckFactory } from "./src/DeckFactory/DeckFactory.js";
import { GameOverScreen } from "./src/UI/GameOver.js";
import { MainMenuScreen } from "./src/UI/MainMenu.js";
import { GameOptionsScreen } from "./src/UI/GameOptions.js";
import { InitAudio, AudioEffects, PlayAudio, StopAudio } from "./src/Audio.js";

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
      // TODO: More elegant way to deal with starting decks/ondeck
      GameState.OnDeck = DeckFactory(GameState.GameOptions.SelectedDecks,
        GameState.GameOptions.Difficulty,
        GameState.GameOptions.TwoPlayerDecks + 1);

      // TODO: this needs to be instantiated in game options
      GameState.Players[0].OnDeckCount = GameState.GameOptions.TwoPlayerDecks;
      GameState.Players[1].OnDeckCount = GameState.GameOptions.TwoPlayerDecks;

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

InitAudio();
setTimeout(function() { PlayAudio(AudioEffects.TitleMusic, true); }, 500);
setTimeout(function() { StopAudio(AudioEffects.TitleMusic); }, 5000);
InitControls();

ScreenChange(GameConstants.CurrentScreen.Title);

export { ScreenChange };