let config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  scene: [titleScene, gameScene],
  audio: {
    disableWebAudio: false,
    noAudio: false
  }
};

let game

window.addEventListener('DOMContentLoaded', () => {
    game = new Phaser.Game(config);
    game.sound.pauseOnBlur = false;
    window.game = game;
});

globalStats = new Stats();