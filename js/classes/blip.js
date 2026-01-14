class Blip extends Phaser.GameObjects.Image {
  constructor(x, y) {
    super(scene, x, y, "blip")
    scene.add.existing(this)
    this.setDepth(101)
  }

  ping(y) {
    y = y * GAME_HEIGHT / GAME_WIDTH // scale width to height
    y = y / 4 // scale down to 1/4
    y = y + (GAME_HEIGHT / 4) // shift by 1/4
    this.y = y
  }
}