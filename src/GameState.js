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
    Seven: 7,
    Nine: 9
  },
  TimeAttackTimer: {
    Thirty: 30,
    Sixty: 60,
    Ninety: 90,
    OneTwenty: 120
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
    Lives: GameConstants.SurvivalLives.Five,
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
  CurrentPlayers: GameConstants.CurrentPlayers.Two,
  StartTime: 0,
  CurrentTimer: GameConstants.TimeAttackTimer.Sixty,
  GameOptions: {
    GameMode: GameConstants.GameMode.TwoPlayer,
    SecondPlayer: GameConstants.SecondPlayer.Human,
    SurvivalLives: GameConstants.SurvivalLives.Five,
    TimeAttackTimer: GameConstants.TimeAttackTimer.Sixty,
    TwoPlayerDecks: GameConstants.TwoPlayerDecks.Five,
    SelectedDecks: [DeckTypes.Primes, DeckTypes.Multiples, DeckTypes.Factors],
    Difficulty: GameConstants.Difficulty.Beginner
  },
  OnDeck: [],
  Players: [Player(GameConstants.PlayerOne), Player(GameConstants.PlayerTwo)],
};

const PlayerSetup = () => {
  GameState.CurrentPlayers =
    GameState.GameOptions.GameMode === GameConstants.GameMode.TwoPlayer ?
    GameConstants.CurrentPlayers.Two : GameConstants.CurrentPlayers.One;

  GameState.CurrentTimer = GameState.GameOptions.TimeAttackTimer;

  GameState.Players[0] = Player(GameConstants.PlayerOne);
  GameState.Players[1] = Player(GameConstants.PlayerTwo);

  GameState.Players[0].OnDeckCount = GameState.GameOptions.TwoPlayerDecks;
  GameState.Players[1].OnDeckCount = GameState.GameOptions.TwoPlayerDecks;

  GameState.Players[0].CurrentRemainingCorrect =
    GameState.OnDeck[GameState.Players[0].CurrentDeckIndex].CorrectCount;
  GameState.Players[1].CurrentRemainingCorrect =
    GameState.OnDeck[GameState.Players[1].CurrentDeckIndex].CorrectCount;

  GameState.Players[0].Lives = GameState.GameOptions.SurvivalLives;
  GameState.Players[1].Lives = GameState.GameOptions.SurvivalLives;
}

export { GameState, GameConstants, PlayerSetup };