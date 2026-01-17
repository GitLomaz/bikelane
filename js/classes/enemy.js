class Enemy extends Phaser.GameObjects.Container {
  constructor(lane = 1) {
    // Define lane Y positions (matching player lanes)
    super(scene, -100, LANE_POSITIONS[lane].y || 300);
    this.setScale(LANE_POSITIONS[lane].scale, LANE_POSITIONS[lane].scale)
    scene.add.existing(this);
    switch (lane) {
      case 1:
          this.x = GAME_WIDTH * 3;
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
        this.x = GAME_WIDTH * 3;
        const direction = Random.coinFlip()
        if (direction) {
          this.speed = 2
          this.scaleX = -LANE_POSITIONS[lane].scale
        } else {
          this.speed = 1
        }
        break;

      default:
        break;
    }

    this.image = scene.add.image(0, -20, "player");
    this.image.setTint(0xff0000);
    this.image.setOrigin(.5, 0)
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
    const player = scene.player
    if (!player) return;
    if (this.lane === player.lane) {
      const enemyLeft = this.x - this.width / 2 * Math.abs(this.scaleX);
      const enemyRight = this.x + this.width / 2 * Math.abs(this.scaleX);
      const playerLeft = player.x;
      const playerRight = player.x + player.sprite.displayWidth * player.scaleX;
      if (enemyLeft < playerRight && enemyRight > playerLeft) {
        this.onCollisionWithPlayer();
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

