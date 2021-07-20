import { DeckFactory, DeckTypes } from "./DeckFactory/DeckFactory.js";

const GameConstants = {
  PlayerOne: 0,
  PlayerTwo: 1,
  CurrentPlayers: {
    One: 1,
    Two: 2
  },
  CurrentScreen: {
    Title: "Title",
    Gameplay: "Gameplay",
    Gameover: "Gameover"
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
    One: 1,
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
    Lives: GameConstants.StartingLives.Seven,
    CurrentDeckIndex: 0,
    CurrentRemainingCorrect: 8, // TODO: needs to be updated each spread
    OnDeckCount: 5, // TODO: needs to be instantiated
    PerfectSpread: true,
    TimedOut: false,
    TargetIndex: 15,
    CorrectCount: 0,
    SelectedCount: 0
  };
}

let GameState = {
  CurrentScreen: GameConstants.CurrentScreen.Title,
  CurrentGameMode: GameConstants.GameMode.TwoPlayer,
  CurrentPlayers: GameConstants.CurrentPlayers.Two,
  StartTime: 0,
  CurrentTimer: GameConstants.StartingTimer.Ninety,
  CurrentLives: GameConstants.StartingLives.Seven,
  GameOptions: {
    GameMode: GameConstants.GameMode.TwoPlayer,
    SecondPlayer: GameConstants.SecondPlayer.Human,
    StartingLives: GameConstants.StartingLives.Seven,
    StartingTimer: GameConstants.StartingTimer.Ninety,
    StartingDecks: GameConstants.StartingDecks.One,
    SelectedDecks: [DeckTypes.Factors],
    Difficulty: GameConstants.Difficulty.Beginner,
  },
  OnDeck: [],
  Players: [Player(), Player()],
};

export { GameState, GameConstants };