class Enemy extends Phaser.GameObjects.Container {
  constructor(lane = 1) {
    // Define lane Y positions (matching player lanes)
    super(scene, -100, LANE_POSITIONS[lane].y || 300);
    this.setScale(LANE_POSITIONS[lane].scale, LANE_POSITIONS[lane].scale)
    this.size = 4 // 4 == can't jump over
    scene.add.existing(this);
    let imageName = "player"
    switch (lane) {
      case 1:
          this.x = GAME_WIDTH + 100;
          this.speed = 18
          this.scaleX = -1
        break;
      case 2:
          this.x = -GAME_WIDTH;
          this.speed = -18
          this.blip = new Blip(GAME_WIDTH - (lane * 30) - 10, LANE_POSITIONS[lane].y)
          this.blip.setTintFill(0xFF0000)
        break;
      case 3:
        imageName = "kittens"
        this.x = GAME_WIDTH + 100;
        this.speed = 0
        this.size = 2
        // const direction = Random.coinFlip()
        // if (direction) {
        //   this.speed = 2
        //   this.scaleX = -LANE_POSITIONS[lane].scale
        // } else {
        //   this.speed = 1
        // }
        break;

      default:
        break;
    }

    this.image = scene.add.image(0, 0, imageName);
    this.image.setOrigin(.5, 1)
    this.add(this.image);
    
    this.lane = lane;
    this.width = this.image.displayWidth || 32;
    this.height = this.image.displayHeight || 32;
    this.baseSpeed = this.speed
  }

  update() {
    this.x -= this.speed + bikeSpeed
    
    // Check collision with player
    this.checkCollisionWithPlayer();
    if(this.blip) {
      this.blip.ping(this.x)
    }

    
    if (this.x < -GAME_WIDTH * 2) {
      if (this.blip) {
        this.blip.destroy();
      }
      this.destroy();
    }
  }

  checkCollisionWithPlayer() {
    if (this.height === 0) {
      return
    }
    const player = scene.player
    if (!player) return;
    if (this.lane === player.lane) {
      const enemyLeft = this.x - this.width / 2 * Math.abs(this.scaleX);
      const enemyRight = this.x + this.width / 2 * Math.abs(this.scaleX);
      const playerLeft = player.x;
      const playerRight = player.x + player.sprite.displayWidth * player.scaleX;
      if (enemyLeft < playerRight && enemyRight > playerLeft) {
        const smallHeights = [78,79,80,81,82,83,106,107,115,116,109,110,111,112,113,114]
        const MediumHeights = [109,110,111,112,113,114]
        // check height
        const frame = player.sprite.anims.currentFrame.textureFrame
        switch (this.size) {
          case 1:
            if (!smallHeights.includes(frame)) {
              this.onCollisionWithPlayer();
            }
            break;
          case 2:
            console.log(frame)
            if (!MediumHeights.includes(frame)) {
              console.log('boop')
              this.onCollisionWithPlayer();
            }
            break;
          case 3:
          case 4:
            this.onCollisionWithPlayer();
            break;
          default:
            break;
        }
      }
    }
  }

  onCollisionWithPlayer() {
    if(this.blip) {
      this.blip.destroy()
    }
    this.destroy();
  }
}

