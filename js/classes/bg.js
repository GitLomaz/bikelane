class BG extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, 0, 0)
    scene.add.existing(this);

    this.middlegroundCombos = [
      ["a-f-1", "a-n-1"],
      ["b-f-1", "b-n-1"],
      ["c-f-1", "c-n-1"],
      ["d-f-1", "d-n-1"],
      ["d-f-1", "d-n-2"],
      ["d-f-1", "d-n-3"],
      ["d-f-2", "d-n-1"],
      ["d-f-2", "d-n-2"],
      ["d-f-2", "d-n-3"],
      ["d-f-3", "d-n-1"],
      ["d-f-3", "d-n-2"],
      ["d-f-3", "d-n-3"],
      ["e-f-1", "e-n-1"],
      ["e-f-1", "e-n-2"],
      ["e-f-2", "e-n-1"],
      ["e-f-2", "e-n-2"],
      ["f-f-1", "f-n-1"],
      ["f-f-1", "f-n-2"],
      ["f-f-2", "f-n-1"],
      ["f-f-2", "f-n-2"],
    ]

    this.bg = scene.add.image(0, 0, "bg").setOrigin(0)

    this.bg5 = scene.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg5').setOrigin(0)
    this.bg4 = scene.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg4').setOrigin(0)
    this.bg3 = scene.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg3').setOrigin(0)
    this.bg2 = scene.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg2').setOrigin(0)

    // new rectangle of #101930
    this.bg13 = scene.add.rectangle(0, 415, GAME_WIDTH, 100, 0x101930).setOrigin(0)

    this.bg12 = scene.add.image(GAME_WIDTH, 225, "a-f-1").setOrigin(0)
    this.bg11 = scene.add.image(GAME_WIDTH + 110, 225, "a-n-1").setOrigin(0)

    this.sidewalk = scene.add.sprite(0, 497, "sidewalk")
    this.sidewalk.setOrigin(0)

    scene.anims.create({
        key: 'sidewalk',
        frames: 'sidewalk',
        frameRate: 60,
        repeat: -1
    });

    this.sidewalk.play({ key: 'sidewalk' });

    this.sidewalk.setDepth(3)

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

    this.v11 = (1280 + GAME_HEIGHT) / 630 
    this.v12 = (1280 + GAME_HEIGHT) / 740

    
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
    
  }

  update() {
    this.bg5.tilePositionX += this.v5 * speedMod
    this.bg4.tilePositionX += this.v4 * speedMod
    this.bg3.tilePositionX += this.v3 * speedMod
    this.bg2.tilePositionX += this.v2 * speedMod

    this.bg11.x -= this.v11 * speedMod
    this.bg12.x -= this.v12 * speedMod
    if (this.bg11.x < -1900) {
      this.resetMiddleground()
    }
  }

  resetMiddleground() {
    this.bg11.x = GAME_WIDTH + 110
    this.bg12.x = GAME_WIDTH
    const combo = Phaser.Utils.Array.GetRandom(this.middlegroundCombos)
    this.bg11.setTexture(combo[0])
    this.bg12.setTexture(combo[1])
    console.log("combo", combo)
    console.log(this.bg11.width, this.bg12.width)
  }
}