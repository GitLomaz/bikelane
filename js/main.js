let config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: "wrapper",
  // scene: [titleScene, gameScene],
  scene: [gameScene],
};

let game = new Phaser.Game(config);