class StaticObject extends Phaser.GameObjects.Container {
  constructor(image) {
    super(scene, 2000, LANE_POSITIONS[3].y + 50);
    scene.add.existing(this);
    this.image = image
    this.sprite = scene.add.sprite(0, 0, image)
    this.sprite.setOrigin(0, 1)
    this.add(this.sprite)
    scene.staticObject = this
  }

  update() {
    this.x -= bikeSpeed * 1.1
    if (this.x > GAME_WIDTH / 5 * 4) {
      this.sprite.setFrame(0)
    } else if (this.x > GAME_WIDTH / 5 * 3) {
      this.sprite.setFrame(1)
    } else if (this.x > GAME_WIDTH / 5 * 2) {
      this.sprite.setFrame(2)
    } else if (this.x > GAME_WIDTH / 5 * 1) {
      this.sprite.setFrame(3)
    } else {
      this.sprite.setFrame(4)
    }

    if (this.x < -500) {
      new StaticObject(this.image)
      this.destroy()
    }
  }
}
