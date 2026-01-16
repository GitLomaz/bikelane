class Blip extends Phaser.GameObjects.Image {
  constructor(x, y) {
    super(scene, 20, y, "blip")
    scene.add.existing(this)
    this.setDepth(101)
  }

  ping(y) {
    // Map y from range [inputMin, inputMax] to [outputMax, outputMin]
    const inputMin = -1280
    const inputMax = 400
    const outputMin = 0
    const outputMax = 720
    y = outputMax - ((y - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin)
    this.y = y
  }
}