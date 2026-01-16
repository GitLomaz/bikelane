let config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: "wrapper",
  scene: [gameScene],
  zoom: 2,
};

let game = new Phaser.Game(config);