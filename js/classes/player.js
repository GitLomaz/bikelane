class Player extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, 350, 505);
    this.setScale(LANE_POSITIONS[2].scale, LANE_POSITIONS[2].scale)
    this.speeds = ['slowdown', 'normal', 'sprint']
    this.setName("player");
    scene.add.existing(this);

    this.sprite = scene.add.sprite(0, 0, "bike")
    this.sprite.setOrigin(0, .5)

    scene.anims.create({
      key: 'normal',
      frames: scene.anims.generateFrameNumbers('bike', { start: 0, end: 14 }),
      frameRate: 15,
      repeat: -1
    });

    scene.anims.create({
      key: 'slowdownStart',
      frames: scene.anims.generateFrameNumbers('bike', { start: 24, end: 27 }),
      frameRate: 15,
      repeat: 0, 
    });

    scene.anims.create({
      key: 'slowdown',
      frames: scene.anims.generateFrameNumbers('bike', { start: 28, end: 33 }),
      frameRate: 15,
      repeat: -1
    });

    scene.anims.create({
      key: 'slowdownEnd',
      frames: scene.anims.generateFrameNumbers('bike', { start: 34, end: 39 }),
      frameRate: 15,
      repeat: 0, 
    });

    scene.anims.create({
      key: 'sprintStart',
      frames: scene.anims.generateFrameNumbers('bike', { start: 48, end: 54 }),
      frameRate: 15,
      repeat: 0, 
    });

    scene.anims.create({
      key: 'sprint',
      frames: scene.anims.generateFrameNumbers('bike', { start: 55, end: 64 }),
      frameRate: 15,
      repeat: -1
    });

    scene.anims.create({
      key: 'sprintEnd',
      frames: scene.anims.generateFrameNumbers('bike', { start: 65, end: 71 }),
      frameRate: 15,
      repeat: 0, 
    });

    scene.anims.create({
      key: 'hop-one',
      frames: scene.anims.generateFrameNumbers('bike', { start: 72, end: 85 }),
      frameRate: 15,
      repeat: 0, 
    });

    scene.anims.create({
      key: 'hop-two',
      frames: scene.anims.generateFrameNumbers('bike', { start: 103, end: 119 }),
      frameRate: 15,
      repeat: 0, 
    });

    this.sprite.play({ key: 'normal' });
    this.add(this.sprite)
    
    // Lane system
    this.lane = 2; // 1, 2, or 3
    this.switchingLane = false

    this.jumpState = 0 // 0, 1, 2
    this.jumpFrames = 0

    this.speedState = 1 // 0 slow, 1 normal, 2 fast
    
    // Movement system
    this.velocity = { x: 0, y: 0 };
    this.speed = 5; // Pixels per frame
    this.minX = 0;
    this.maxX = GAME_WIDTH - 50;
    
    this.setupInput();
    scene.events.on("update", () => this.update());

    this.playerBlip = new Blip(20, 40)
    this.playerBlip.setTintFill(0x00FF00)

    this.sprite.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE,
      (anim) => {
        switch (anim.key) {
          case "hop-one":
          case "hop-two":
            this.jumpState = 0
            this.jumpFrames = 0
            break;
        
          default:
            break;
        }
      }
    );
  }

  setupInput() {
    const keys = scene.input.keyboard.createCursorKeys();
    const wasdKeys = scene.input.keyboard.addKeys('W,A,S,D, ');
    this.keys = { ...keys, ...wasdKeys };
  }

  update() {
    if (this.keys.space.isDown && this.jumpState === 0 && this.jumpFrames < 4 * 4) {
      playWithChain(this.sprite, "hop-one", [this.speeds[this.speedState]]);
      this.jumpFrames++
    } else if (this.jumpFrames === 4 * 4 && this.jumpState === 0) {
      console.log("Long jump go!")
      playWithChain(this.sprite, "hop-two", [this.speeds[this.speedState]]);
      this.jumpState = 2
      this.jumpFrames = 0
    } else if (!this.keys.space.isDown && this.jumpFrames !== 0) {
      console.log("short jump go!")
      this.jumpState = 1
      this.jumpFrames = 0     
    }

    if (this.jumpState === 0) {
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
        if (this.speedState !== 0) {
          playWithChain(this.sprite, "slowdownStart", ["slowdown"]);
          // this.sprite.play('slowdownStart');
          // this.sprite.chain([ 'slowdown' ]);
          this.speedState = 0
        }
      } else if (this.keys.right.isDown || this.keys.D.isDown) {
        setSpeedMod(1.7)
        if (this.speedState !== 2) {
          playWithChain(this.sprite, "sprintStart", ["sprint"]);
          // this.sprite.play('sprintStart');
          // this.sprite.chain([ 'sprint' ]);
          this.speedState = 2
        }
      } else {
        if (this.speedState === 0) {
          playWithChain(this.sprite, "slowdownEnd", ["normal"]);
          // this.sprite.play({ key: "slowdownEnd"})
          // this.sprite.chain([ 'normal' ]);
          this.speedState = 1
        } else if (this.speedState === 2) {
          playWithChain(this.sprite, "sprintEnd", ["normal"]);
          // this.sprite.play({ key: "sprintEnd"})
          // this.sprite.chain([ 'normal' ]);
          this.speedState = 1
        }
        setSpeedMod(1)
      }
    }
    
    console.log(this.sprite.anims.currentAnim.key)
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

