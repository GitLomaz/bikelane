class BG extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, 0, 0)
    scene.add.existing(this);

    this.bg = scene.add.image(0, 0, "bg").setOrigin(0)

    this.bg5 = scene.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg5').setOrigin(0)
    this.bg4 = scene.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg4').setOrigin(0)
    this.bg3 = scene.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg3').setOrigin(0)
    this.bg2 = scene.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg2').setOrigin(0)

    this.bg5.tilePositionX -= GAME_WIDTH / 2
    this.bg4.tilePositionX -= GAME_WIDTH / 2
    this.bg3.tilePositionX -= GAME_WIDTH / 2
    this.bg2.tilePositionX -= GAME_WIDTH / 2

    this.sidewalk = scene.add.sprite(0, 497, "sidewalk")
    this.sidewalk.setOrigin(0)

    scene.anims.create({
        key: 'walk',
        frames: 'sidewalk',
        frameRate: 30,
        repeat: -1
    });

    this.sidewalk.play({ key: 'walk' });

    // ---- NEW (tiny): same % progress per update ----
    const w5 = scene.textures.get('bg5').getSourceImage().width
    const w4 = scene.textures.get('bg4').getSourceImage().width
    const w3 = scene.textures.get('bg3').getSourceImage().width
    const w2 = scene.textures.get('bg2').getSourceImage().width

    // choose how many pixels bg5 moves per frame (your original "1" feel)
    this.v5 = 1

    // same % progress => v / width is constant
    // so v4 = v5 * (w4/w5), etc.
    this.v4 = this.v5 * (w4 / w5)
    this.v3 = this.v5 * (w3 / w5)
    this.v2 = this.v5 * (w2 / w5)
  }

  update() {
    this.bg5.tilePositionX += this.v5
    this.bg4.tilePositionX += this.v4
    this.bg3.tilePositionX += this.v3
    this.bg2.tilePositionX += this.v2
  }
}