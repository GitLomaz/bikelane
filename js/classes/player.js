class Player extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, 250, LANE_POSITIONS[3].y);
    this.setScale(LANE_POSITIONS[3].scale, LANE_POSITIONS[3].scale)
    this.setName("player");
    scene.add.existing(this);
    this.setDepth(LANE_POSITIONS[3].depth - 1)
    this.sprite = scene.add.sprite(0, 0, "bike")
    this.sprite.setOrigin(0, 1)

    this.invincable = false
    this.alive = true

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
      key: 'hopOne',
      frames: scene.anims.generateFrameNumbers('bike', { start: 72, end: 85 }),
      frameRate: 15,
      repeat: 0, 
    });

    scene.anims.create({
      key: 'hopTwo',
      frames: scene.anims.generateFrameNumbers('bike', { start: 96, end: 119 }),
      frameRate: 15,
      repeat: 0, 
    });

    scene.anims.create({
      key: 'hopTwoShort',
      frames: scene.anims.generateFrameNumbers('bike', { frames: [103, 105, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119] }),
      frameRate: 15,
      repeat: 0, 
    });

    this.sprite.play({ key: 'normal' });
    this.add(this.sprite)
    
    // Lane system
    this.lane = 3; // 1, 2, or 3
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
          case "hopOne":
          case "hopTwo":
          case "hopTwoShort":
            this.jumpState = 0
            this.jumpFrames = 0
            break;
        
          default:
            break;
        }
      }
    );

    this.lifeCounter = new LifeCounter();
  }

  setupInput() {
    const keys = scene.input.keyboard.createCursorKeys();
    const wasdKeys = scene.input.keyboard.addKeys('W,A,S,D, ');
    this.keys = { ...keys, ...wasdKeys };
  }

  update() {
    if (!this.alive) {
      return
    }
    distance += bikeSpeed * speedMod
    if (this.keys.space.isDown && this.jumpState === 0 && this.jumpFrames < 4 * 4) {
      switch (this.speedState) {
        case 0:
          playWithChain(this.sprite, "hopOne", ['slowdownStart', 'slowdown']);
          break;        
        case 1:
          playWithChain(this.sprite, "hopOne", ['normal']);
          break;
        case 2:
          playWithChain(this.sprite, "hopOne", ['sprintStart', 'sprint']);
          break;
        default:
          break;
      }
      this.jumpFrames++
    } else if (this.jumpFrames === 4 * 4 && this.jumpState === 0) {
      switch (this.speedState) {
        case 0:
          playWithChain(this.sprite, "hopTwoShort", ['slowdownStart', 'slowdown']);
          break;        
        case 1:
          playWithChain(this.sprite, "hopTwoShort", ['normal']);
          break;
        case 2:
          playWithChain(this.sprite, "hopTwoShort", ['sprintStart', 'sprint']);
          break;
        default:
          break;
      }
      this.jumpState = 2
      this.jumpFrames = 0
    } else if (!this.keys.space.isDown && this.jumpFrames !== 0) {
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
    this.setDepth(LANE_POSITIONS[newLane].depth - 1)
    if (newLane === 3) {
      scene.score.cashInBonus()
    }
  }

  takeDamage() {
    if (this.invincable) {
      return;
    }
    this.invincable = true;
    this.lifeCounter.loseLife();
    scene.score.resetBonus();

    if (this.lifeCounter.lives === 0) {
      this.die();
      return;
    }

    scene.tweens.add({
      targets: this,
      alpha: 0.2,
      duration: 200,
      ease: "Quad.easeInOut",
      yoyo: true,
      repeat: 2,
      onComplete: () => {
        this.invincable = false;
      },
    });
  }

  die() {
    console.log("game over")
    this.alive = false
    scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 200,
      ease: "Quad.easeInOut",
    });
    
    $('#user').fadeIn(1000)
    $('#user').val(animal)
    scene.input.keyboard.clearCaptures()
     new Button(1050 - 200, 665 - 110, "back", () => {
      scene.scene.stop('gameScene');
      scene.scene.start("titleScene")
      $('#user').hide()
    })
    new Button(-10 + 200, 665 - 110, "submit", () => {
      submission = btoa(
        '{ "game": "bikelane", "name": "' +
          $("#user").val().toUpperCase() +
          '", "score": ' +
          scene.score.score +
          "}"
      );
      animal = $("#user").val().toUpperCase();
      scene.scene.stop('gameScene');
      scene.scene.start("titleScene")
      $('#user').hide()
    })
  }
}
