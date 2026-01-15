class BG extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, 0, 0)
    scene.add.existing(this);

    this.bg = scene.add.image(0, 0, "bg").setOrigin(0)

    this.bg5 = scene.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg5').setOrigin(0)
    this.bg4 = scene.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg4').setOrigin(0)
    this.bg3 = scene.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg3').setOrigin(0)
    this.bg2 = scene.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg2').setOrigin(0)

    // -440.4117647059947 -373.8823529411329 -307.3529411763874 -240.82352941174202

    // this.bg5.tilePositionX -= GAME_WIDTH / 2 + 440
    // this.bg4.tilePositionX -= GAME_WIDTH / 2 + 373
    // this.bg3.tilePositionX -= GAME_WIDTH / 2 + 307
    // this.bg2.tilePositionX -= GAME_WIDTH / 2 + 240

    // this.bg5.tilePositionX -= GAME_WIDTH / 2
    // this.bg4.tilePositionX -= GAME_WIDTH / 2
    // this.bg3.tilePositionX -= GAME_WIDTH / 2
    // this.bg2.tilePositionX -= GAME_WIDTH / 2


    // this.bg5.tilePositionX = -440
    // this.bg4.tilePositionX = -373
    // this.bg3.tilePositionX = -307
    // this.bg2.tilePositionX = -240

    this.sidewalk = scene.add.sprite(0, 497, "sidewalk")
    this.sidewalk.setOrigin(0)

    scene.anims.create({
        key: 'walk',
        frames: 'sidewalk',
        frameRate: 60,
        repeat: -1
    });

    this.sidewalk.play({ key: 'walk' });

    // ---- NEW (tiny): same % progress per update ----
    const w5 = scene.textures.get('bg5').getSourceImage().width
    const w4 = scene.textures.get('bg4').getSourceImage().width
    const w3 = scene.textures.get('bg3').getSourceImage().width
    const w2 = scene.textures.get('bg2').getSourceImage().width

    // choose how many pixels bg5 moves per frame (your original "1" feel)
    this.v5 = 1 / 17

    // same % progress => v / width is constant
    // so v4 = v5 * (w4/w5), etc.
    this.v4 = this.v5 * (w4 / w5)
    this.v3 = this.v5 * (w3 / w5)
    this.v2 = this.v5 * (w2 / w5)

    
    const fps = 60
    const seconds = - 60
    const frames = fps * seconds

    const distance5 = frames * this.v5 

    this.start5 = -640 + distance5
    this.start4 = -640 + distance5 * (w4 / w5)
    this.start3 = -640 + distance5 * (w3 / w5)
    this.start2 = -640 + distance5 * (w2 / w5)

    this.bg5.tilePositionX = this.start5
    this.bg4.tilePositionX = this.start4
    this.bg3.tilePositionX = this.start3
    this.bg2.tilePositionX = this.start2

    this.bg5Rough = this.start5
    this.bg4Rough = this.start4
    this.bg3Rough = this.start3
    this.bg2Rough = this.start2
    
  }

  update() {
    this.bg5Rough += this.v5 * speedMod
    this.bg4Rough += this.v4 * speedMod
    this.bg3Rough += this.v3 * speedMod
    this.bg2Rough += this.v2 * speedMod

    this.bg5.tilePositionX = Math.floor(this.bg5Rough)
    this.bg4.tilePositionX = Math.floor(this.bg4Rough)
    this.bg3.tilePositionX = Math.floor(this.bg3Rough)
    this.bg2.tilePositionX = Math.floor(this.bg2Rough)

    // console.log(this.bg5.tilePositionX + ' ' + this.bg4.tilePositionX + ' ' + this.bg3.tilePositionX + ' ' + this.bg2.tilePositionX)
  }
}