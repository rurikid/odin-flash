const GameConstants = {
  PlayerOne: "PlayerOne",
  PlayerTwo: "PlayerTwo",
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
  }
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
    StartingTimer: GameConstants.StartingTimer.Ninety
  },
  PlayerOne: {
    Score: 0,
    Lives: 9,
    OnDeckCount: 5,
    CurrentPrompt: "Factors of 16",
    CurrentSpread: [0, 1, 3, 4, 14, 15, 17, 73, 84, 23, 15, 123, 34, 45, 67, 89],
    TargetIndex: 16,
    IncorrectTime: -1,
  },
  PlayerTwo: {
    Score: 0,
    Lives: 9,
    OnDeckCount: 5,
    CurrentPrompt: "Multiples of 16",
    CurrentSpread: [0, 1, 3, 4, 14, 15, 17, 73, 84, 23, 15, 123, 34, 45, 67, 89],
    TargetIndex: 16,
    IncorrectTime: -1,
  }
};


export { GameState, GameConstants };