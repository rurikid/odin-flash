import { GameConstants } from "../GameState.js";
import { GameCard, GameplayStyles } from "./Gameplay.js";
import { ScreenChange } from "../../index.js";

const GameOverScreenID = "gameOverScreen";
const TitlePromptID = "titlePrompt";
let timeout = false;

const GameOverScreen = (playerCount, players, onDeck) => {
  timeout = true;
  setTimeout(() => {endGameOverTimeout()}, 5000);

  let gameOverScreen = document.createElement("div");
  gameOverScreen.className = "flex-center flex-column game-over-screen";
  gameOverScreen.id = GameOverScreenID;

  let gameOverResults = document.createElement("div");
  gameOverResults.className = "flex-center flex-column";
  gameOverResults.id = "gameOverResults";

  let playerStats = document.createElement("div");
  playerStats.className = "player-stats";
  playerStats.id = "playerStats";

  playerStats.appendChild(playerResults(players[GameConstants.PlayerOne], onDeck));

  if (playerCount === GameConstants.CurrentPlayers.One)
  {
    gameOverResults.innerHTML = "<h1>Game Over</h1>";
  }
  else
  {
    gameOverResults.innerHTML =
      `<h1>Player ${players[0].Score > players[1].Score ? "One" : "Two"} Wins!</h1>`;
    playerStats.appendChild(playerResults(players[GameConstants.PlayerTwo], onDeck));
  }

  gameOverScreen.appendChild(gameOverResults);
  gameOverScreen.appendChild(playerStats);

  let titlePrompt = document.createElement("h4");
  titlePrompt.innerHTML = "Press any key to return to title.";
  titlePrompt.id = TitlePromptID;
  titlePrompt.style.visibility = 'hidden';

  gameOverScreen.appendChild(titlePrompt);

  return gameOverScreen;
}

const playerResults = (player, onDeck) => {
  let results = document.createElement("div");
  results.className = "flex-column flex-center player-results";

  let playerHeader = document.createElement("h2");
  playerHeader.innerHTML =
    `Player ${player.PlayerNumber == GameConstants.PlayerOne ? "One" : "Two"}`;

  results.appendChild(playerHeader);

  let score = document.createElement("h3");
  score.innerHTML = `Score: ${player.Score}`;

  results.appendChild(score);

  let accuracy = document.createElement("h3");
  if (player.SelectedCount > 0) {
    accuracy.innerHTML = 
      `Accuracy: ${((player.CorrectCount / player.SelectedCount) * 100).toFixed(2)}%`;
  }
  else {
    accuracy.innerHTML = `Accuracy: 0.00%`;
  }

  results.appendChild(accuracy);

  let completedPrompts = document.createElement("h3");
  completedPrompts.innerHTML = `Completed Prompts: ${player.CompletedPrompts}`;

  results.appendChild(completedPrompts);

  let promptList = document.createElement("div");
  promptList.className = "flex-column flex-center prompt-list";

  onDeck.forEach((deck) => {
    promptList.appendChild(
      GameCard(deck.Prompt, GameplayStyles.promptBase, GameplayStyles.promptFace));
  });

  results.appendChild(promptList);

  return results;
}

const GameOverControls = (keystroke) => {
  if (!timeout) {
    ScreenChange(GameConstants.CurrentScreen.Title);
  }
}

const endGameOverTimeout = () => {
  document.getElementById(TitlePromptID).style.visibility = "visible";

  timeout = false;
}

export { GameOverScreen, GameOverControls };