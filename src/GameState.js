import { DeckTypes } from "./DeckFactory/DeckFactory.js";

// TODO: Expand this to be more robust
const GameConstants = {
  PlayerOne: 0,
  PlayerTwo: 1,
  CurrentPlayers: {
    One: 1,
    Two: 2
  },
  CurrentScreen: {
    Title: "Title",
    MainMenu: "MainMenu",
    GameOptions: "GameOptions",
    Gameplay: "Gameplay",
    Gameover: "Gameover"
  },
  GameMode: {
    Survival: "Survival",
    TimeAttack: "Time Attack",
    TwoPlayer: "Two Player",
  },
  SecondPlayer: {
    Human: "Human",
    AI: "AI"
  },
  SurvivalLives: {
    Three: 3,
    Five: 5,
    Seven: 7
  },
  TimeAttackTimer: {
    Thirty: 30,
    Sixty: 60,
    Ninety: 90
  },
  TwoPlayerDecks: {
    // One: 1,
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

const Player = (player) => {
  return {
    PlayerNumber: player,
    Score: 0,
    // Lives: GameConstants.SurvivalLives.Seven,
    CurrentDeckIndex: 0,
    CurrentRemainingCorrect: 8,
    OnDeckCount: 5, // TODO: needs to be instantiated
    PerfectSpread: true,
    TimedOut: false,
    TargetIndex: 15,
    CorrectCount: 0,
    SelectedCount: 0,
    CompletedPrompts: 0,
  };
}

let GameState = {
  CurrentScreen: GameConstants.CurrentScreen.Title,
  CurrentGameMode: null,
  CurrentPlayers: GameConstants.CurrentPlayers.Two,
  StartTime: 0,
  CurrentTimer: GameConstants.TimeAttackTimer.Sixty,
  CurrentLives: GameConstants.SurvivalLives.Five,
  GameOptions: {
    GameMode: null,
    SecondPlayer: GameConstants.SecondPlayer.Human,
    // SurvivalLives: GameConstants.SurvivalLives.Five,
    // TimeAttackTimer: GameConstants.TimeAttackTimer.Sixty,
    TwoPlayerDecks: GameConstants.TwoPlayerDecks.Three,
    SelectedDecks: [DeckTypes.Primes, DeckTypes.Multiples, DeckTypes.Factors],
    Difficulty: GameConstants.Difficulty.Beginner
  },
  OnDeck: [],
  Players: [Player(GameConstants.PlayerOne), Player(GameConstants.PlayerTwo)],
};

export { GameState, GameConstants };