import { initControls } from "./src/Controls.js";
import { gameplayScreen, GameplayStyles } from "./src/UI/Gameplay.js";

initControls();

let gameCanvas = document.getElementById('gameCanvas');
gameCanvas.appendChild(gameplayScreen(2));
