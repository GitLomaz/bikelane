class Manhole extends Phaser.GameObjects.Image {
  constructor() {
    super(scene, 1500, 600, "blip")
    scene.add.existing(this)
    this.setDepth(101)
  }

  update() {
    this.x -= bikeSpeed
    if (this.x < 0) {
      this.destroy()
    }
  }
}