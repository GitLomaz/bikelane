class BG extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, 0, 0)
    scene.add.existing(this);

    this.bg = scene.add.image(0, 0, "bg").setOrigin(0)

    this.bg5 = scene.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg5').setOrigin(0);
    this.bg4 = scene.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg4').setOrigin(0);
    this.bg3 = scene.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg3').setOrigin(0);
    this.bg2 = scene.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg2').setOrigin(0);

    this.sidewalk = scene.add.sprite(0, 497, "sidewalk")
    this.sidewalk.setOrigin(0)

    scene.anims.create({
        key: 'walk',
        frames: 'sidewalk',
        frameRate: 30,
        repeat: -1
    });

    this.sidewalk.play({ key: 'walk' });
  }

  update() {
    this.bg5.tilePositionX += 1 / 500;
    this.bg4.tilePositionX += 2 / 500;
    this.bg3.tilePositionX += 3 / 500;
    this.bg2.tilePositionX += 4 / 500;
  }
}

