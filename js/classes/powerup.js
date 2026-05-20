class Powerup extends Phaser.GameObjects.Container {
  constructor(image, position = 0) {
    if (!scene.anims.exists(image)) {
      scene.anims.create({
        key: image,
        frames: scene.anims.generateFrameNumbers(image),
        frameRate: 30,
        repeat: -1,
        yoyo: true
      });
    }
    super(scene, 2000, 600);
    this.setDepth(LANE_POSITIONS[position].depth - 1)
    switch (position) {
      case 1:
          this.y = 545
          break;
      case 2:
          this.y = 580
          break;
      case 3:
          this.y = 600
          break;
    }
    this.position = position
    this.lane = position
    scene.add.existing(this);
    this.image = image
    this.sprite = scene.add.sprite(0, 0, image).setOrigin(0, 1).play(image)
    this.add(this.sprite)
  }

  update(deltaMultiplier = 1) {
    this.x -= bikeSpeed * deltaMultiplier
    this.checkCollisionWithPlayer()
    if (this.x < -1500) {
      this.destroy()
    }
  }

  checkCollisionWithPlayer() {
    const player = scene.player
    if (!player || !player.alive) {
      return
    }
    if (this.lane === player.lane) {
      const enemyLeft = this.x - this.width / 2 * Math.abs(this.scaleX);
      const enemyRight = this.x + this.width / 2 * Math.abs(this.scaleX);
      const playerLeft = player.x;
      const playerRight = player.x + player.sprite.displayWidth * player.scaleX;
      if (enemyLeft < playerRight && enemyRight > playerLeft) {
        this.onCollisionWithPlayer()
      }
    }
  }

  onCollisionWithPlayer() {
    this.destroy();
    switch (this.image) {
      case "powerup-1":
        scene.score.bonus(1000);
        break;
      default:
        break;
    }
  }
}
