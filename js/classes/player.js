class Player extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, 350, 535);
    this.setScale(LANE_POSITIONS[2].scale, LANE_POSITIONS[2].scale)
    this.setName("player");
    scene.add.existing(this);

    this.sprite = scene.add.sprite(0, 0, "bike")
    this.sprite.setOrigin(1)

    scene.anims.create({
        key: 'bike',
        frames: 'bike',
        frameRate: 15,
        repeat: -1
    });

    this.sprite.play({ key: 'bike' });
    this.add(this.sprite)
    
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

    this.playerBlip = new Blip(20, 40)
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
    
    // Left/Right movement (smooth)
    if (this.keys.left.isDown || this.keys.A.isDown) {
      setSpeedMod(.3)
    } else if (this.keys.right.isDown || this.keys.D.isDown) {
      setSpeedMod(1.7)
    } else {
      setSpeedMod(1)
    }
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
  }

  onLaneSwitchMidpoint(newLane) {
    this.lane = newLane
  }
}

