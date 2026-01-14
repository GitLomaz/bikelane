class Player extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, 200, 535);
    this.setScale(LANE_POSITIONS[2].scale, LANE_POSITIONS[2].scale)
    this.setName("player");
    scene.add.existing(this);
    this.image = scene.add.image(0, 0, "player");
    this.add(this.image);
    
    // Lane system
    this.lane = 2; // 1, 2, or 3
    this.switchingLane = false
    
    // Movement system
    this.velocity = { x: 0, y: 0 };
    this.speed = 5; // Pixels per frame
    this.minX = 0;
    this.maxX = GAME_WIDTH - 50;
    
    this.setupInput();
    scene.events.on("update", () => this.update());

    this.playerBlip = new Blip(GAME_WIDTH - (this.lane * 30) - 10, 207)
    this.playerBlip.setTintFill(0x00FF00)
  }

  setupInput() {
    const keys = scene.input.keyboard.createCursorKeys();
    const wasdKeys = scene.input.keyboard.addKeys('W,A,S,D');
    this.keys = { ...keys, ...wasdKeys };
  }

  update() {
    // Lane switching (up/down or w/s)
    if (this.keys.up.isDown || this.keys.W.isDown) {
      if (this.lane > 1) {
        this.switchLane(this.lane - 1);
      }
    }
    
    if (this.keys.down.isDown || this.keys.S.isDown) {
      if (this.lane < 3) {
        this.switchLane(this.lane + 1);
      }
    }
    
    // // Left/Right movement (smooth)
    // if (this.keys.left.isDown || this.keys.A.isDown) {
    //   this.velocity.x = -this.speed;
    // } else if (this.keys.right.isDown || this.keys.D.isDown) {
    //   this.velocity.x = this.speed;
    // } else {
    //   this.velocity.x = 0;
    // }
    
    // // Apply horizontal movement
    // this.x += this.velocity.x;
    
    // Clamp position to screen bounds
    // this.x = Phaser.Math.Clamp(this.x, this.minX, this.maxX);
  }

  switchLane(newLane) {
    if (this.switchingLane) {
      return
    }
    this.switchingLane = true
    const targetPosition = LANE_POSITIONS[newLane];
    
    scene.tweens.add({
      targets: this,
      y: targetPosition.y,
      scaleX: targetPosition.scale,
      scaleY: targetPosition.scale,
      duration: 300,
      ease: "Quad.easeInOut",
      onUpdate: (tween) => {
      if (tween.progress >= 0.5 && !tween.hasReachedMidpoint) {
        tween.hasReachedMidpoint = true;
        this.onLaneSwitchMidpoint(newLane);
      }
      },
      onComplete: () => {
      this.switchingLane = false;
      }
    });
    
    scene.tweens.add({
      targets: this.playerBlip,
      x: GAME_WIDTH - (newLane * 30) - 10,
      duration: 300,
      ease: "Quad.easeInOut",
    });
  }

  onLaneSwitchMidpoint(newLane) {
    this.lane = newLane
  }
}

