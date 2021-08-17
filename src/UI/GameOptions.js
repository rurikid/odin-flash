import { ControlConstants } from "../Controls.js";
import { GameConstants, GameState } from "../GameState.js";
import { ScreenChange } from "../../index.js";
import { DeckTypes } from "../DeckFactory/DeckFactory.js";
import { Elements } from "../../api/Elements.js";

const GameOptionsScreenID = "gameOptionsScreen";
const ReturnMainMenu = "returnMainMenu";

const GameOptions = {
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
  SurvivalLives: {
    StateKey: "SurvivalLives",
    Title: "Survival Lives",
    Strings: {
      Three: "Three",
      Five: "Five",
      Seven: "Seven",
      Nine: "Nine"
    },
    Values : {
      ...GameConstants.SurvivalLives
    }
  },
  TimeAttackTimer: {
    StateKey: "TimeAttackTimer",
    Title: "Time Attack Timer",
    Strings: {
      Thirty: "Thirty",
      Sixty: "Sixty",
      Ninety: "Ninety",
      OneTwenty: "One-Twenty"
    },
    Values : {
      ...GameConstants.TimeAttackTimer
    }
  },
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

let targetIndices = {
  vertical: 1,
  verticalMin: 1,
  verticalMax: Object.keys(GameOptions).length + 1,
  horizontal: 0,
  horizontalMin: 0,
  horizontalMax: 0
}

const getGameOptionList = (options) => {
  let container = document.createElement('div');
  container.className = "flex-center flex-column";

  let header = document.createElement('h2');
  header.innerHTML = options.Title;

  container.appendChild(header);

  let list = document.createElement('ul');
  list.className = "flex-center flex-row";
  list.id = options.StateKey;
  for (let option in options.Strings) {
    let listItem = document.createElement('li');
    listItem.innerHTML = options.Strings[option];
    listItem.id = option;

    if (options.Values[option] === GameState.GameOptions[options.StateKey]) {
      listItem.className = "selected";
    }

    // TODO: This is acting wonky with Difficulty key
    if (GameState.GameOptions[options.StateKey].length > 0) {
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
  console.log(GameState.GameOptions);

  targetIndices.vertical = 1;
  targetIndices.horizontal = 0;

  let gameOptionsScreen = document.createElement("div");
  gameOptionsScreen.className = "flex-center flex-column game-options-screen";
  gameOptionsScreen.id = GameOptionsScreenID;

  let gameOptions = document.createElement("h1");
  gameOptions.innerHTML = "Game Options";
  gameOptionsScreen.appendChild(gameOptions);

  for (var option in GameOptions) {
    gameOptionsScreen.appendChild(getGameOptionList(GameOptions[option]));
  }

  let mainMenuSelect = document.createElement('h3');
  mainMenuSelect.innerHTML = "Return to Main Menu";
  mainMenuSelect.id = ReturnMainMenu;
  gameOptionsScreen.appendChild(mainMenuSelect);

  gameOptionsScreen.children[1].children[1].children[0].className += " targeted";
  targetIndices.horizontalMax = gameOptionsScreen.children[1].children[1].children.length - 1;

  return gameOptionsScreen;
}

const setTarget = (keystroke) => {
  let gameOptionsScreen = document.getElementById(GameOptionsScreenID);

  gameOptionsScreen.getElementsByClassName("targeted")[0].className =
    (gameOptionsScreen.getElementsByClassName("targeted")[0].className)
      .split('targeted').join('').trim();

  switch (keystroke) {
    case ControlConstants.Up:
      targetIndices.vertical = targetIndices.vertical === targetIndices.verticalMin ?
        targetIndices.verticalMin : targetIndices.vertical - 1;
      break;
    case ControlConstants.Down:
      targetIndices.vertical = targetIndices.vertical === targetIndices.verticalMax ?
        targetIndices.verticalMax : targetIndices.vertical + 1;
      break;
    case ControlConstants.Left:
      targetIndices.horizontal = targetIndices.horizontal === targetIndices.horizontalMin ?
        targetIndices.horizontalMin : targetIndices.horizontal - 1;
      break;
    case ControlConstants.Right:
      targetIndices.horizontal = targetIndices.horizontal === targetIndices.horizontalMax ?
        targetIndices.horizontalMax : targetIndices.horizontal + 1;
      break;
  }

  // TODO: fix " selected" class name
  if (targetIndices.vertical === targetIndices.verticalMax) {
    gameOptionsScreen.children[targetIndices.vertical].className += " targeted";
  } else {
    gameOptionsScreen.children[targetIndices.vertical]
      .children[1].children[targetIndices.horizontal].className += " targeted";
    targetIndices.horizontalMax = 
      gameOptionsScreen
        .children[targetIndices.vertical]
        .children[1]
        .children.length - 1;
  }
}

const selectTarget = () => {
  let target = document.getElementsByClassName("targeted")[0];

  // TODO: perform check that SelectedDecks.length > 0
  if (target.id === ReturnMainMenu) {
    ScreenChange(GameConstants.CurrentScreen.MainMenu);
    return;
  }

  let targetParent = target.parentElement;

  switch (targetParent.id) {
    case GameOptions.Difficulty.StateKey:
    case GameOptions.SurvivalLives.StateKey:
    case GameOptions.TimeAttackTimer.StateKey:
    case GameOptions.TwoPlayerDecks.StateKey:
      targetParent
        .getElementsByClassName('selected')[0]
        .removeAttribute('class');
      target.className = ('selected targeted');

      if (target.innerHTML === GameOptions.TimeAttackTimer.Strings.OneTwenty) {
        GameState.GameOptions[targetParent.id] =
          GameOptions[targetParent.id].Values["OneTwenty"];
      } else {
        GameState.GameOptions[targetParent.id] = 
          GameOptions[targetParent.id].Values[target.innerHTML];
      }
      break;
    case GameOptions.DeckTypes.StateKey:
      if (target.classList.contains('selected')) {
        target.className = (target.className).split('selected').join('').trim();

        GameState.GameOptions.SelectedDecks =
          GameState.GameOptions.SelectedDecks.filter(deck => deck !== target.innerHTML);
      }
      else {
        target.className += " selected";
        GameState.GameOptions.SelectedDecks.push(target.innerHTML);
      }
      break;
  }
}

const GameOptionsControls = (keystroke) => {
  if (keystroke === ControlConstants.Select) {
    selectTarget();
    return;
  }
  setTarget(keystroke);
}

export { GameOptionsScreen, GameOptionsControls };