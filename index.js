import { GameState } from "./src/GameState.js";
import { initControls } from "./src/Controls.js";
import { gameplayScreen, GameplayStyles } from "./src/UI/Gameplay.js";

console.log('Hello Odin!');

initControls();

let gameCanvas = document.getElementById('gameCanvas');
gameCanvas.appendChild(gameplayScreen(GameState.CurrentPlayers));
