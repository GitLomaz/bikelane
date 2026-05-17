let titleScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function gameScene() {
    Phaser.Scene.call(this, {
      key: "titleScene",
    });
  },

  preload: function () {
    // Create loading bar
    const width = 360;
    const height = 18;
    const x = GAME_WIDTH / 2;
    const y = GAME_HEIGHT / 2;
    const padding = 2;
    
    // Colors from staminaBar
    const borderColor = 0xaf3d45;
    const fillColor = 0xf78b6d;
    const emptyColor = 0x662a41;
    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(emptyColor, 1);
    progressBox.fillRect(x - width/2, y - height/2, width, height);
    progressBox.lineStyle(2, borderColor, 1);
    progressBox.strokeRect(x - width/2, y - height/2, width, height);
    
    // Loading text
    const loadingText = this.add.text(x, y - 40, 'LOADING', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#f78b6d'
    }).setOrigin(0.5);
    
    // Update progress bar
    this.load.on('progress', (value) => {
      progressBar.clear();
      const innerWidth = (width - padding * 2) * value;
      progressBar.fillStyle(fillColor, 1);
      progressBar.fillRect(x - width/2 + padding, y - height/2 + padding, innerWidth, height - padding * 2);
    });
    
    // Clean up when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });
    
    this.load.image("player", "images/player.png");
    
    
    this.load.image("bg", "images/bg.png");
    this.load.image("bg2", "images/bg2.png");
    this.load.image("bg3", "images/bg3.png");
    this.load.image("bg4", "images/bg4.png");
    this.load.image("bg5", "images/bg5.png");

    this.load.image("a-f-1", "images/a-f-1.png");
    this.load.image("a-n-1", "images/a-n-1.png");
    this.load.image("b-f-1", "images/b-f-1.png");
    this.load.image("b-n-1", "images/b-n-1.png");
    this.load.image("c-f-1", "images/c-f-1.png");
    this.load.image("c-n-1", "images/c-n-1.png");
    this.load.image("d-f-1", "images/d-f-1.png");
    this.load.image("d-f-2", "images/d-f-2.png");
    this.load.image("d-f-3", "images/d-f-3.png");
    this.load.image("d-n-1", "images/d-n-1.png");
    this.load.image("d-n-2", "images/d-n-2.png");
    this.load.image("d-n-3", "images/d-n-3.png");
    this.load.image("e-f-1", "images/e-f-1.png");
    this.load.image("e-f-2", "images/e-f-2.png");
    this.load.image("e-n-1", "images/e-n-1.png");
    this.load.image("e-n-2", "images/e-n-2.png");
    this.load.image("f-f-1", "images/f-f-1.png");
    this.load.image("f-f-2", "images/f-f-2.png");
    this.load.image("f-n-1", "images/f-n-1.png");
    this.load.image("f-n-2", "images/f-n-2.png");

    this.load.image("lamp", "images/lamp.png");
    this.load.image("tree1", "images/tree1.png");
    this.load.image("tree2", "images/tree2.png");
    this.load.image("tree3", "images/tree3.png");
    this.load.image("tree4", "images/tree4.png");
    this.load.image("tree5", "images/tree5.png");
    this.load.image("tree6", "images/tree6.png");
    this.load.image("tree7", "images/tree7.png");
    this.load.image("tree8", "images/tree8.png");
    this.load.image("tree9", "images/tree9.png");
    this.load.image("tree10", "images/tree10.png");
    this.load.image("tree11", "images/tree11.png");
    this.load.image("tree12", "images/tree12.png");

    // Load button spritesheets
    this.load.spritesheet('back-btn', 'images/back-btn.png', { frameWidth: 96, frameHeight: 32 });
    this.load.spritesheet('continue-btn', 'images/continue-btn.png', { frameWidth: 192, frameHeight: 32 });
    this.load.spritesheet('highscores-btn', 'images/highscores-btn.png', { frameWidth: 252, frameHeight: 32 });
    this.load.spritesheet('leaderboard-btn', 'images/leaderboard-btn.png', { frameWidth: 264, frameHeight: 32 });
    this.load.spritesheet('mainmenu-btn', 'images/mainmenu-btn.png', { frameWidth: 204, frameHeight: 32 });
    this.load.spritesheet('no-btn', 'images/no-btn.png', { frameWidth: 48, frameHeight: 32 });
    this.load.spritesheet('play-btn', 'images/play-btn.png', { frameWidth: 96, frameHeight: 32 });
    this.load.spritesheet('quit-btn', 'images/quit-btn.png', { frameWidth: 96, frameHeight: 32 });
    this.load.spritesheet('ride-btn', 'images/ride-btn.png', { frameWidth: 96, frameHeight: 32 });
    this.load.spritesheet('start-btn', 'images/start-btn.png', { frameWidth: 120, frameHeight: 32 });
    this.load.spritesheet('submit-btn', 'images/submit-btn.png', { frameWidth: 144, frameHeight: 32 });
    this.load.spritesheet('yes-btn', 'images/yes-btn.png', { frameWidth: 72, frameHeight: 32 });
    this.load.spritesheet('mute-btn', 'images/mute-btn.png', { frameWidth: 32, frameHeight: 24 });
    this.load.spritesheet('stats-btn', 'images/stats-btn.png', { frameWidth: 120, frameHeight: 32 });
    this.load.spritesheet('reset-btn', 'images/reset-btn.png', { frameWidth: 120, frameHeight: 32 });
    
    this.load.spritesheet('radarHazard', 'images/radar_hazard.png', { frameWidth: 28, frameHeight: 28 });

    this.load.spritesheet('bench', 'images/bench.png', { frameWidth: 200, frameHeight: 100 });
    this.load.spritesheet('bike', 'images/bike-new.png', { frameWidth: 140, frameHeight: 200 });
    this.load.spritesheet('sidewalk', 'images/bg1.png', { frameWidth: 1280, frameHeight: 144 });

    this.load.spritesheet('radarAlert', 'images/radar_alert.png', { frameWidth: 84/3, frameHeight: 100 });
    this.load.spritesheet('radarBike', 'images/radar_bike.png', { frameWidth: 28, frameHeight: 50 });
    this.load.spritesheet('radarCar', 'images/radar_car.png', { frameWidth: 28, frameHeight: 50 });

    this.load.bitmapFont("darkNumbers", "fonts/font.png", "fonts/dark.fnt");
    this.load.bitmapFont("lightNumbers",  "fonts/font.png", "fonts/light.fnt");
    this.load.bitmapFont("normal",  "fonts/font.png", "fonts/normal.fnt");
    this.load.bitmapFont("large",  "fonts/font2.png", "fonts/large.fnt");

    this.load.audio('cycle3', 'audio/cycle03.mp3');
  },

  create: function () {
    scene = this;
    this.bg = new BG();
    this.player = new DemoPlayer();
    this.doodadSpawner = new DoodadSpawner()
    this.doodads = [];
    this.buildingScores = false
    this.showingStats = false
    this.version = this.add.bitmapText(10, 10, "normal", VERSION, 16).setDepth(5)
    this.scores = new Button(1140, 675, "highscores-btn", () => {
      if (!this.buildingScores && !this.showingStats) {
        buildHighScores()
      }
    })
    this.statsBtn = new Button(GAME_WIDTH / 2, 675, "stats-btn", () => {
      if (!this.buildingScores && !this.showingStats) {
        buildStats()
      }
    })
    this.start = new Button(60, 675, "play-btn", () => {
      scene.scene.start("gameScene")
    })
    
    // Back button (hidden by default, shown in high scores/stats states)
    this.backButton = new Button(1140, 675, "back-btn", () => {
      clearHighScores();
      clearStats();
      showNormalButtons();
    });
    this.backButton.setVisible(false);
    
    // Initialize sound manager
    window.soundManager.init(this);
    
    // Add mute button in top right corner
    this.muteButton = new MuteButton(1240, 40, "mute-btn");
    
    if (submission) {
      buildHighScores()
    }
    distance = 0;
    
    // Auto-hide UI after 60 seconds of inactivity
    this.uiVisible = true;
    this.inactivityTimer = 0;
    this.inactivityDelay = 7 * 1000
    
    // Setup mouse movement listener
    this.input.on('pointermove', () => {
      this.resetInactivityTimer();
    });
  },
  
  resetInactivityTimer: function() {
    this.inactivityTimer = 0;
    if (!this.uiVisible) {
      this.showUI();
    }
  },
  
  hideUI: function() {
    if (this.uiVisible) {
      this.uiVisible = false;
      if (this.start) {
        this.tweens.add({
          targets: [this.start],
          alpha: 0,
          duration: 500,
          ease: 'Power2'
        });
      }
      if (this.scores) {
        this.tweens.add({
          targets: [this.scores],
          alpha: 0,
          duration: 500,
          ease: 'Power2'
        });
      }
      if (this.statsBtn) {
        this.tweens.add({
          targets: [this.statsBtn],
          alpha: 0,
          duration: 500,
          ease: 'Power2'
        });
      }
      if (this.backButton) {
        this.tweens.add({
          targets: [this.backButton],
          alpha: 0,
          duration: 500,
          ease: 'Power2'
        });
      }
      if (this.scoreItems) {
        this.tweens.add({
          targets: this.scoreItems,
          alpha: 0,
          duration: 500,
          ease: 'Power2'
        });
      }
      if (this.loading) {
        this.tweens.add({
          targets: this.loading,
          alpha: 0,
          duration: 500,
          ease: 'Power2'
        });
      }
    }
  },
  
  showUI: function() {
    if (!this.uiVisible) {
      this.uiVisible = true;
      if (this.start) {
        this.tweens.add({
          targets: [this.start],
          alpha: 1,
          duration: 500,
          ease: 'Power2'
        });
      }
      if (this.scores) {
        this.tweens.add({
          targets: [this.scores],
          alpha: 1,
          duration: 500,
          ease: 'Power2'
        });
      }
      if (this.statsBtn) {
        this.tweens.add({
          targets: [this.statsBtn],
          alpha: 1,
          duration: 500,
          ease: 'Power2'
        });
      }
      if (this.backButton) {
        this.tweens.add({
          targets: [this.backButton],
          alpha: 1,
          duration: 500,
          ease: 'Power2'
        });
      }
      if (this.scoreItems) {
        this.tweens.add({
          targets: this.scoreItems,
          alpha: 1,
          duration: 500,
          ease: 'Power2'
        });
      }
      if (this.loading) {
        this.tweens.add({
          targets: this.loading,
          alpha: 1,
          duration: 500,
          ease: 'Power2'
        });
      }
    }
  },

  update: function (time, delta) {
    // Normalize delta to 60fps (16.67ms per frame)
    const deltaMultiplier = delta / 16.67;
    
    distance += bikeSpeed * speedMod * deltaMultiplier
    this.doodadSpawner.update(deltaMultiplier)
    this.bg.update(deltaMultiplier)
    scene.doodads.forEach((doodad) => {
      doodad.update(deltaMultiplier)
    })
    
    // Check inactivity timer
    if (this.uiVisible) {
      this.inactivityTimer += delta;
      if (this.inactivityTimer >= this.inactivityDelay) {
        this.hideUI();
      }
    }
  },
});

function buildHighScores() {
  scene.buildingScores = true
  
  // Clear stats if they're showing
  if (scene.showingStats) {
    clearStats();
  }
  
  // Update button visibility
  hideNormalButtons();
  scene.backButton.setVisible(true);
  
  scene.loading = scene.add.bitmapText(
    700,
    200,
    "normal",
    "Loading . . .",
    64
  );
  scene.loading.setOrigin(.5)  
  if (scene.scoreItems) {
    scene.scoreItems.forEach((score) => {
      score.destroy()
    })
  } else {
    scene.scoreItems = [] 
  }
  if (submission) {
    $.ajax({
      type: "POST",
      url: "https://scores.lomazgames.com/scores",
      data: { data: submission },
      dataType: "json",
      success: function (res) {
        if (!scene.loading) {
          return
        }
        scene.loading.visible = false
        res.scores.forEach(function (score, i) {
          let item = new ScoreItem(415, 50 + i * 30, i + 1, score.name, score.score).setDepth(4);
          scene.scoreItems.push(item);
          scene.add.existing(item);
        });
        if (res.position) {
          let item = new ScoreItem(415, 50 + 310, res.position, res.name, res.score).setDepth(4)
          scene.scoreItems.push(item)
          scene.add.existing(item);
        }
        scene.buildingScores = false
      },
      finally: function() {
        scene.buildingScores = false
      }
    });
    submission = false
  } else {
    $.ajax({
      url: "https://scores.lomazgames.com/scores?game=bikelane",
      type: "GET",
      dataType: "json",
      success: function (res) {
        scene.loading.visible = false
        res.scores.forEach(function (score, i) {
          let item = new ScoreItem(
            415,
            50 + i * 30,
            i + 1,
            score.name,
            score.score
          ).setDepth(4);
          scene.add.existing(item);
          scene.scoreItems.push(item);
        });
        scene.buildingScores = false
      },
      finally: function() {
        scene.buildingScores = false
      }
    });
  }
}

function buildStats() {
  scene.showingStats = true;
  
  // Clear high scores if they're showing
  if (scene.scoreItems && scene.scoreItems.length > 0) {
    scene.scoreItems.forEach((item) => {
      item.destroy();
    });
    scene.scoreItems = [];
  }
  if (scene.loading) {
    scene.loading.destroy();
    scene.loading = null;
  }
  
  // Update button visibility
  hideNormalButtons();
  scene.backButton.setVisible(true);
  
  // Clear existing stat items if any
  if (scene.statItems) {
    scene.statItems.forEach((item) => {
      item.destroy();
    });
  } else {
    scene.statItems = [];
  }
  
  // Get formatted stats
  const stats = globalStats.getFormattedStats();
  
  // Create stat display items
  const startY = 100;
  const lineHeight = 40;
  let currentY = startY;
  
  // Title
  const title = scene.add.bitmapText(640, currentY, "large", "STATS", 64).setOrigin(0.5).setDepth(4);
  scene.statItems.push(title);
  currentY += 80;
  
  // Stat labels and values
  const statData = [
    { label: "Total Distance", value: `${stats.totalDistance}m` },
    { label: "Longest Ride", value: `${stats.longestRide}m` },
    { label: "Shortest Ride", value: `${stats.shortestRide}m` },
    { label: "Highest Score", value: displayNumber(stats.highestScore) },
    { label: "Total Objects Hopped", value: stats.totalObjectsHopped },
    { label: "Most Objects In A Row", value: stats.mostObjectsInRow },
    { label: "Time In Oncoming Traffic", value: stats.totalTimeInOncoming },
    { label: "Preferred Lane", value: stats.preferredLane }
  ];
  
  statData.forEach((stat) => {
    const label = scene.add.bitmapText(320, currentY, "normal", stat.label, 24).setOrigin(0, 0.5).setDepth(4);
    const value = scene.add.bitmapText(960, currentY, "normal", stat.value.toString(), 24).setOrigin(1, 0.5).setDepth(4);
    scene.statItems.push(label);
    scene.statItems.push(value);
    currentY += lineHeight;
  });
  
  // Reset button (centered)
  scene.statsResetButton = new Button(640, 675, "reset-btn", () => {
    showResetConfirmation();
  });
  scene.statItems.push(scene.statsResetButton);
}

function clearStats() {
  if (scene.statItems) {
    scene.statItems.forEach((item) => {
      item.destroy();
    });
    scene.statItems = [];
  }
  scene.showingStats = false;
}

function clearHighScores() {
  if (scene.scoreItems) {
    scene.scoreItems.forEach((item) => {
      item.destroy();
    });
    scene.scoreItems = [];
  }
  if (scene.loading) {
    scene.loading.destroy();
    scene.loading = null;
  }
  scene.buildingScores = false;
}

function hideNormalButtons() {
  if (scene.statsBtn) scene.statsBtn.setVisible(false);
  if (scene.scores) scene.scores.setVisible(false);
}

function showNormalButtons() {
  if (scene.statsBtn) scene.statsBtn.setVisible(true);
  if (scene.scores) scene.scores.setVisible(true);
  if (scene.backButton) scene.backButton.setVisible(false);
}

function showResetConfirmation() {
  scene.resetting = true;
  
  // Create confirmation dialog
  scene.resetItems = [];
  
  // Background overlay
  const overlay = scene.add.graphics();
  overlay.fillStyle(0x000000, 0.7);
  overlay.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  overlay.setDepth(100);
  scene.resetItems.push(overlay);
  
  // Confirmation text
  const confirmText = scene.add.bitmapText(640, 280, "normal", "Reset All Stats?", 48).setOrigin(0.5).setDepth(101);
  scene.resetItems.push(confirmText);
  
  const warningText = scene.add.bitmapText(640, 340, "normal", "This cannot be undone!", 24).setOrigin(0.5).setDepth(101);
  scene.resetItems.push(warningText);
  
  // Yes button
  const yesButton = new Button(540, 420, "yes-btn", () => {
    // Reset only the historical stats, not current ride
    globalStats.totalObjectsHopped = 0;
    globalStats.mostObjectsInRow = 0;
    globalStats.highestScore = 0;
    globalStats.totalTimeInOncoming = 0;
    globalStats.preferredLane = 3;
    globalStats.shortestRide = Infinity;
    globalStats.longestRide = 0;
    globalStats.totalDistance = 0;
    globalStats.saveStats();
    
    // Clear the confirmation dialog
    clearResetConfirmation();
    
    // Rebuild stats display to show zeros
    clearStats();
    buildStats();
    
    // Show a confirmation message
    const resetMsg = scene.add.bitmapText(640, 360, "normal", "Stats Reset!", 32).setOrigin(0.5).setDepth(5);
    scene.tweens.add({
      targets: resetMsg,
      alpha: 0,
      duration: 2000,
      delay: 1000,
      onComplete: () => {
        resetMsg.destroy();
      }
    });
  });
  yesButton.setDepth(101);
  scene.resetItems.push(yesButton);
  
  // No button
  const noButton = new Button(740, 420, "no-btn", () => {
    clearResetConfirmation();
  });
  noButton.setDepth(101);
  scene.resetItems.push(noButton);
}

function clearResetConfirmation() {
  if (scene.resetItems) {
    scene.resetItems.forEach((item) => {
      item.destroy();
    });
    scene.resetItems = [];
  }
  scene.resetting = false;
}

