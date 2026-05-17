class Player extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, 250, LANE_POSITIONS[3].y);
    this.setScale(LANE_POSITIONS[3].scale, LANE_POSITIONS[3].scale)
    this.setName("player");
    scene.add.existing(this);
    this.setDepth(LANE_POSITIONS[3].depth - 1)
    this.sprite = scene.add.sprite(0, 0, "bike")
    this.sprite.setOrigin(0, 1)
    this.stamina = 100
    this.jumpedObjects = 0

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

    // Create radarHazard animation if it doesn't exist
    if (!scene.anims.exists('radarHazardAnim')) {
      scene.anims.create({
        key: 'radarHazardAnim',
        frames: scene.anims.generateFrameNumbers('radarHazard', { start: 0, end: -1 }),
        frameRate: 10,
        repeat: -1
      });
    }

    this.radarBG = scene.add.sprite(20, 60, 'radarBack').setScrollFactor(0).setDepth(1000).setScale(1, 2).setOrigin(.5, 0.25)
    this.playerBlip = scene.add.sprite(20, 60, 'radarBike').setScrollFactor(0).setDepth(1000)
    this.playerAlert = scene.add.sprite(20, 60, 'radarAlert').setScrollFactor(0).setDepth(1000).setFrame(2)
    this.playerHazard = scene.add.sprite(80, -160, 'radarHazard').setScrollFactor(0).setDepth(1000)
    this.playerHazard.play('radarHazardAnim')
    this.add(this.playerHazard)

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
    this.staminaBar = new StaminaBar();
  }

  setupInput() {
    const keys = scene.input.keyboard.createCursorKeys();
    const wasdKeys = scene.input.keyboard.addKeys('W,A,S,D, ');
    this.keys = { ...keys, ...wasdKeys };
  }

  update(deltaMultiplier = 1) {
    if (!this.alive) {
      return
    }
    const traveledThisFrame = bikeSpeed * speedMod * deltaMultiplier;
    distance += traveledThisFrame;
    
    // Update stats
    if (globalStats) {
      globalStats.updateDistance(traveledThisFrame);
      globalStats.updateLaneTime(this.lane, deltaMultiplier);
    }
    
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
      this.jumpFrames += deltaMultiplier
    } else if (this.jumpFrames >= 4 * 4 && this.jumpState === 0) {
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
      if (this.jumpedObjects > 0) {
        scene.score.hopBonus(this.jumpedObjects * 2500 + (250 * (globalStats.currentRide.currentObjectsInRow - 1)));
        this.jumpedObjects = 0
      }
      // Lane switching (up/down or w/s)
      if (this.keys.up.isDown || this.keys.W.isDown) {
        if (this.lane > 1) {
          this.switchLane(this.lane - 1);
        }
        if (globalStats) {
          globalStats.resetHopCombo();
        }
      }
      
      if (this.keys.down.isDown || this.keys.S.isDown) {
        if (this.lane < 3) {
          this.switchLane(this.lane + 1);
        }
      }
      
      // Left/Right movement (smooth)
      if (this.keys.left.isDown || this.keys.A.isDown) {
        this.stamina = Math.min(100, this.stamina + 0.15 * deltaMultiplier)
        setSpeedMod(.3)
        if (this.speedState !== 0) {
          playWithChain(this.sprite, "slowdownStart", ["slowdown"]);
          this.speedState = 0
        }
      } else if (this.keys.right.isDown || this.keys.D.isDown) {
        this.stamina = Math.max(0, this.stamina - 0.2 * deltaMultiplier)
        if (this.speedState !== 2 && this.stamina > 0) {
          setSpeedMod(1.7)
          playWithChain(this.sprite, "sprintStart", ["sprint"]);
          this.speedState = 2
        }  else if (this.stamina === 0 && this.speedState === 2) {
          playWithChain(this.sprite, "sprintEnd", ["normal"]);
          this.speedState = 1
          setSpeedMod(1)
        }
      } else {
        this.stamina = Math.min(100, this.stamina + 0.1 * deltaMultiplier)
        if (this.speedState === 0) {
          playWithChain(this.sprite, "slowdownEnd", ["normal"]);
          this.speedState = 1
        } else if (this.speedState === 2) {
          playWithChain(this.sprite, "sprintEnd", ["normal"]);
          this.speedState = 1
        }
        setSpeedMod(1)
      }
    
      if (this.staminaBar) this.staminaBar.update(this.stamina);
    }

    // Radar junk
    let closestBlipDistance = Infinity
    let closestEnemyDistance = Infinity
    scene.enemies.forEach(enemy => {
      if(enemy.blip && enemy.blip.y > 45) {
        closestBlipDistance = closestBlipDistance > Math.abs(enemy.blip.y - 45) ? Math.abs(enemy.blip.y - 45) : closestBlipDistance
      }
      if (enemy.lane === this.lane) {
        const distance = enemy.x - this.x
        if (distance > 0) {
          closestEnemyDistance = closestEnemyDistance > distance ? distance : closestEnemyDistance
        }
      }
    });
    if (this.lane === 2 && closestBlipDistance < 200) {  // player blip color
      this.playerBlip.setFrame(1)
    } else {
      this.playerBlip.setFrame(0)
    }

    if (closestBlipDistance < 400) {
      this.playerAlert.setAlpha(1)
    } else {
      this.playerAlert.setAlpha(0)
    }

    if (this.lane !== 2 && closestEnemyDistance !== Infinity) {
      this.playerHazard.setAlpha(1)
    } else {
      this.playerHazard.setAlpha(0)
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
      duration: 200,
      ease: "Quad.easeInOut",
      onUpdate: (tween) => {
      if (tween.progress >= 0.5 && !tween.hasReachedMidpoint) {
        tween.hasReachedMidpoint = true;
        this.onLaneSwitchMidpoint(newLane);
        this.playerAlert.setFrame(newLane - 1)
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
    this.jumpedObjects = 0
    if (this.invincable) {
      return;
    }
    if (globalStats) {
      globalStats.resetHopCombo();
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
    this.alive = false
    
    // Record stats for this ride
    if (globalStats) {
      globalStats.endRide(scene.score.score);
    }
    
    this.staminaBar.fadeOut()
    this.playerBlip.destroy()
    this.playerAlert.destroy()
    this.playerHazard.destroy()
    this.radarBG.destroy()
    scene.score.scoreText.setOrigin(.5)
    scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 200,
      ease: "Quad.easeInOut",
    });
    scene.tweens.add({
      targets: scene.score,
      x: GAME_WIDTH / 2,
      y: 140,
      scale: 2,
      duration: 1000,
      ease: "Quad.easeInOut",
    });
    scene.nameInput = new CanvasInput(GAME_WIDTH / 2, 300, 320, 50, {
      fontKey: "normal",
      value: animal,
      fontSize: 32,
      maxLength: 12,
      onEnter: () => {
        submission = btoa(
          '{ "game": "bikelane", "name": "' +
            animal +
            '", "score": ' +
            scene.score.score +
            "}"
        );
        scene.scene.stop('gameScene');
        scene.scene.start("titleScene")
      }
    }).focus();
    scene.input.keyboard.clearCaptures()
     new Button(GAME_WIDTH / 4 * 3, 400, "back-btn", () => {
      scene.scene.stop('gameScene');
      scene.scene.start("titleScene")
    })
    new Button(GAME_WIDTH / 4, 400, "submit-btn", () => {
        submission = btoa(
          '{ "game": "bikelane", "name": "' +
            animal +
            '", "score": ' +
            scene.score.score +
            "}"
        );
        scene.scene.stop('gameScene');
        scene.scene.start("titleScene")
    })
  }
}
