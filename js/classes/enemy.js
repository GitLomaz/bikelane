class Enemy extends Phaser.GameObjects.Container {
  constructor(lane = 1, type = 1) {
    // Define lane Y positions (matching player lanes)
    super(scene, -100, LANE_POSITIONS[lane].y || 300);
    this.setScale(LANE_POSITIONS[lane].scale, LANE_POSITIONS[lane].scale)
    this.setDepth(LANE_POSITIONS[lane].depth)
    this.size = 4 // 4 == can't jump over
    scene.add.existing(this);
    let imageName = "vehicle" + Random.between(1, 7)
    switch (lane) {
      case 1:
          this.x = GAME_WIDTH + 1000;
          this.speed = 18
          this.scaleX = -1
          this.y += 15
        break;
      case 2:
          this.x = -GAME_WIDTH;
          this.speed = -18
          this.blip = new Blip(GAME_WIDTH - (lane * 30) - 10, LANE_POSITIONS[lane].y)
          this.blip.setTintFill(0xFF0000)
          this.y += 15
        break;
      case 3:
        this.x = GAME_WIDTH + 100;
        this.y += 6
        this.speed = 0
        switch (type) {
          case 1:
              imageName = "grate" + (Random.coinFlip() ? 1 : 2)
              this.size = 1
            break;    
          case 2:
              imageName = "kittens"
              this.size = 2
            break;    
          case 3:
              imageName = "vlc"
              this.size = 2
            break;    
          case 4:
              imageName = "vinyl"
              this.size = 2
            break;        
          default:

            break;
        }

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
        const smallHeights = [77,78,79,80,81,82,83,84,   105,106,   115,116,117]
        const MediumHeights = [107,108,109,110,111,112,113,114]
        const largeHeights = []
        const frame = player.sprite.anims.currentFrame.textureFrame
        switch (this.size) {
          case 1:
            if (![...smallHeights, ...MediumHeights, ...largeHeights].includes(frame)) {
              this.onCollisionWithPlayer();
            }
            break;
          case 2:
            if (![...MediumHeights, ...largeHeights].includes(frame)) {
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
    scene.player.takeDamage()
  }
}

