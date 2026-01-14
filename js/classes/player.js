class Player extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, 200, 400);
    this.setName("player");
    scene.add.existing(this);
    this.image = scene.add.image(0, 0, "player");
    this.add(this.image);
    
    // Lane system
    this.lane = 2; // 1, 2, or 3
    this.switchingLane = false
    this.lanePositions = {
      1: { y: 300, scale: 1 },
      2: { y: 400, scale: 1 },
      3: { y: 500, scale: 1 }
    };
    
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
    const targetPosition = this.lanePositions[newLane];
    
    scene.tweens.add({
      targets: this,
      y: targetPosition.y,
      scaleX: targetPosition.scale,
      scaleY: targetPosition.scale,
      duration: 300,
      ease: "Quad.easeInOut",
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
    
    this.lane = newLane;
  }
}

