import { ControlConstants } from "../Controls.js";
import { GameConstants, GameState } from "../GameState.js";
import { ScreenChange } from "../../index.js";
import { DeckTypes } from "../DeckFactory/DeckFactory.js";

const GameOptions = {
  // GameMode: {
    // StateKey: "GameMode",
  //   Title: "Game Mode",
  //   Strings: {
  //     Survival: "Survival",
  //     TimeAttack: "Time Attack",
  //     TwoPlayer: "Two Player"
  //   },
  //   Values : {
  //     ...GameState.GameMode
  //   }
  // },
  Difficulty: {
    StateKey: "Difficulty",
    Title: "Difficulty",
    Strings: {
      Beginner: "Beginner",
      Intermediate: "Intermediate",
      Advanced: "Advanced",
      Expert: "Expert"
    },
    Values : {
      ...GameConstants.Difficulty
    }
  },
  // SurvivalLives: {
    // StateKey: "SurvivalLives",
  //   Title: "Survival Lives",
  //   Strings: {
  //     Three: "Three",
  //     Five: "Five",
  //     Seven: "Seven"
  //   },
  //   Values : {
  //     ...GameState.SurvivalLives
  //   }
  // },
  // TimeAttackTimer: {
      // StateKey: "TimeAttackTimer",
  //   Title: "Time Attack Timer",
  //   Strings: {
  //     Thirty: "Thirty",
  //     Sixty: "Sixty",
  //     Ninety: "Ninety"
  //   },
  //   Values : {
  //     ...GameState.TimeAttackTimer
  //   }
  // },
  TwoPlayerDecks: {
    StateKey: "TwoPlayerDecks",
    Title: "Two Player Decks",
    Strings: {
      // One: "One",
      Three: "Three",
      Five: "Five",
      Seven: "Seven",
      Ten: "Ten"
    },
    Values : {
      ...GameConstants.TwoPlayerDecks
    }
  },
  DeckTypes: {
    StateKey: "SelectedDecks",
    Title: "Deck Types",
    Strings: {
      ...DeckTypes
    },
    Values : {
      ...DeckTypes
    }
  }
}

// TODO: rename options.Options[option]; ridiculous
const getGameOptionList = (options) => {
  let container = document.createElement('div');
  container.className = "flex-center flex-column";

  let header = document.createElement('h2');
  header.innerHTML = options.Title;

  container.appendChild(header);

  let list = document.createElement('ul');
  list.className = "flex-center flex-row";
  list.id = options.Title;
  for (var option in options.Strings) {
    let listItem = document.createElement('li');
    listItem.innerHTML = options.Strings[option];
    listItem.id = option;

    if (options.Values[option] === GameState.GameOptions[options.StateKey]) {
      listItem.className = "selected";
    }

    // TODO: This is acting wonky with Difficulty key
    if (GameState.GameOptions[options.StateKey].length > 0) {
      // console.log(options.StateKey);
      // console.log(GameState.GameOptions[options.StateKey]);
      if (GameState.GameOptions[options.StateKey].includes(options.Values[option])) {
        listItem.className = "selected";
      }
    }

    list.appendChild(listItem);
  }

  container.appendChild(list);

  return container;
}

const GameOptionsScreen = () => {
  let gameOptionsScreen = document.createElement("div");
  gameOptionsScreen.className = "flex-center flex-column game-options-screen";
  gameOptionsScreen.id = "gameOptionsScreen";

  let gameOptions = document.createElement("h1");
  gameOptions.innerHTML = "Game Options";
  gameOptionsScreen.appendChild(gameOptions);

  for (var option in GameOptions) {
    gameOptionsScreen.appendChild(getGameOptionList(GameOptions[option]));
  }

  let mainMenuSelect = document.createElement('h3');
  mainMenuSelect.innerHTML = "Return to Main Menu";
  gameOptionsScreen.appendChild(mainMenuSelect);

  gameOptionsScreen.children[1].children[1].children[0].className += " targeted";

  return gameOptionsScreen;
}

const GameOptionsControls = (keystroke) => {

}

export { GameOptionsScreen, GameOptionsControls };