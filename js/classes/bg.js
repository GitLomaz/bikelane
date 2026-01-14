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

    // ---- minimal addition: compute per-layer speeds that re-sync on bg5 loop ----
    const W5 = scene.textures.get('bg5').getSourceImage().width
    const W4 = scene.textures.get('bg4').getSourceImage().width
    const W3 = scene.textures.get('bg3').getSourceImage().width
    const W2 = scene.textures.get('bg2').getSourceImage().width

    // Your "base" 1/2/4/8 intent (relative wraps during one bg5 wrap)
    // Round to integers so seams line up when bg5 completes one cycle.
    const n4 = Math.max(1, Math.round((2 * W5) / W4))
    const n3 = Math.max(1, Math.round((4 * W5) / W3))
    const n2 = Math.max(1, Math.round((8 * W5) / W2))

    // Choose a slowest speed (pixels per frame). Keep your old "1" feel.
    this.v5 = 1

    // Make others move so that when bg5 moves W5, they move nX*WX (whole wraps)
    // => vX / v5 = (nX*WX) / W5
    this.v4 = this.v5 * (n4 * W4) / W5
    this.v3 = this.v5 * (n3 * W3) / W5
    this.v2 = this.v5 * (n2 * W2) / W5
  }

  update() {
    this.bg5.tilePositionX += this.v5
    this.bg4.tilePositionX += this.v4
    this.bg3.tilePositionX += this.v3
    this.bg2.tilePositionX += this.v2
  }
}