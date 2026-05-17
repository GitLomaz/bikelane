let config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  scene: [titleScene, gameScene],
  // scene: [gameScene],
  audio: {
    disableWebAudio: false,
    noAudio: false
  }
};

let game = new Phaser.Game(config);

// Prevent sound from pausing when game loses focus
game.sound.pauseOnBlur = false;

// Initialize global stats
globalStats = new Stats();