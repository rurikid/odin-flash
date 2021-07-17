import { DeckFactory, DeckTypes } from "./DeckFactory/DeckFactory.js";

const GameConstants = {
  PlayerOne: 0,
  PlayerTwo: 1,
  CurrentScreen: {
    Title: "Title",
    Gameplay: "Gameplay",
  },
  GameMode: {
    TwoPlayer: "TwoPlayer",
  },
  SecondPlayer: {
    Human: "Human",
    AI: "AI"
  },
  StartingLives: {
    Three: 3,
    Five: 5,
    Seven: 7
  },
  StartingTimer: {
    Thirty: 30,
    Sixty: 60,
    Ninety: 90
  },
  StartingDecks: {
    Three: 3,
    Five: 5,
    Seven: 7,
    Ten: 10
  },
  Difficulty: {
    Beginner: "Beginner",
    Intermediate: "Intermediate",
    Advanced: "Advanced",
    Expert: "Expert"
  }
}

const Player = () => {
  return {
    Score: 0,
    Lives: 9,
    CurrentDeckIndex: 0,
    CurrentRemainingCorrect: 8,
    PerfectSpread: true,
    TargetIndex: 15,
    IncorrectTime: -1,
  };
}

let GameState = {
  CurrentScreen: GameConstants.CurrentScreen.Gameplay,
  CurrentGameMode: GameConstants.GameMode.TwoPlayer,
  CurrentPlayers: 2,
  StartTime: 0,
  CurrentTimer: 90,
  CurrentLives: 7,
  GameOptions: {
    GameMode: GameConstants.GameMode.TwoPlayer,
    SecondPlayer: GameConstants.SecondPlayer.Human,
    StartingLives: GameConstants.StartingLives.Seven,
    StartingTimer: GameConstants.StartingTimer.Ninety,
    StartingDecks: GameConstants.StartingDecks.Five,
    SelectedDecks: [DeckTypes.Factors],
    Difficulty: GameConstants.Difficulty.Beginner,
  },
  OnDeck: [],
  Players: [Player(), Player()],
};

export { GameState, GameConstants };