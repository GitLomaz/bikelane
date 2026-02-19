class StaticObject extends Phaser.GameObjects.Container {
  constructor(image, position = 0) {
    super(scene, 2000, 680);
    this.position = position
    if (position === 1) { // Grass in front of stuff
      this.y = 680
      this.setDepth(50)
    } else if (position === 0) { // trees, anchor to top
      this.y = 0
      this.setDepth(50)
    } else if (position === 2) { // trees, anchor to top
      this.y = 0
      this.setDepth(10)
    }
    scene.add.existing(this);
    this.image = image
    this.sprite = scene.add.sprite(0, 0, image)
    this.sprite.setOrigin(0, position === 1 ? 1 : 0)
    this.add(this.sprite)
  }

  update() {
    switch (this.position) {
      case 1:
      case 0:
        this.x -= bikeSpeed * 1.15
         if (this.image === "bench") {
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
        }
        break;
      case 2:
        this.x -= bikeSpeed * .55
        break;
    
      default:
        break;
    }
   


    if (this.x < -1500) {
      this.destroy()
    }
  }
}
