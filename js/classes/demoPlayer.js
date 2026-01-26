class DemoPlayer extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, GAME_WIDTH / 2 - 125, LANE_POSITIONS[3].y);
    this.setScale(LANE_POSITIONS[3].scale, LANE_POSITIONS[3].scale)
    this.setName("player");
    scene.add.existing(this);

    this.sprite = scene.add.sprite(0, 0, "bike")
    this.sprite.setOrigin(0, 1)

    this.invincable = false

    scene.anims.create({
      key: 'normal',
      frames: scene.anims.generateFrameNumbers('bike', { start: 0, end: 14 }),
      frameRate: 15,
      repeat: -1
    });

    this.sprite.play({ key: 'normal' });
    this.add(this.sprite)
  }
}
