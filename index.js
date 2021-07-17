import { GameState } from "./src/GameState.js";
import { initControls } from "./src/Controls.js";
import { gameplayScreen, GameplayStyles } from "./src/UI/Gameplay.js";
import { DeckFactory } from "./src/DeckFactory/DeckFactory.js";

console.log('Hello Odin!');

initControls();
GameState.OnDeck = DeckFactory(GameState.GameOptions.SelectedDecks,
                               GameState.GameOptions.Difficulty,
                               GameState.GameOptions.StartingDecks + 1);

let gameCanvas = document.getElementById('gameCanvas');
gameCanvas.appendChild(
  gameplayScreen(GameState.CurrentPlayers, GameState.OnDeck));
