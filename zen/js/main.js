let config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: "wrapper",
  // scene: [titleScene, gameScene],
  scene: [gameScene],
  zoom: 2,
  render: {
    pixelArt: true,     // sets nearest-neighbor on supported textures
    antialias: false,   // extra safety
    roundPixels: true,  // rounds sprite render positions
  }
};

let game = new Phaser.Game(config);