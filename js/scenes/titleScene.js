let titleScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function gameScene() {
    Phaser.Scene.call(this, {
      key: "titleScene",
    });
  },

  preload: function () {
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
    
    this.load.image('radarHazard', 'images/radar_hazard.png');

    this.load.spritesheet('bench', 'images/bench.png', { frameWidth: 200, frameHeight: 100 });
    this.load.spritesheet('bike', 'images/bike-new.png', { frameWidth: 140, frameHeight: 200 });
    this.load.spritesheet('sidewalk', 'images/bg1.png', { frameWidth: 1280, frameHeight: 144 });

    this.load.spritesheet('radarAlert', 'images/radar_alert.png', { frameWidth: 17, frameHeight: 32 });
    this.load.spritesheet('radarBike', 'images/radar_bike.png', { frameWidth: 17, frameHeight: 32 });
    this.load.spritesheet('radarCar', 'images/radar_car.png', { frameWidth: 17, frameHeight: 32 });

    this.load.bitmapFont("darkNumbers", "fonts/font.png", "fonts/dark.fnt");
    this.load.bitmapFont("lightNumbers",  "fonts/font.png", "fonts/light.fnt");
    this.load.bitmapFont("normal",  "fonts/font.png", "fonts/normal.fnt");
    this.load.bitmapFont("large",  "fonts/font2.png", "fonts/large.fnt");
  },

  create: function () {
    scene = this;
    this.bg = new BG();
    this.player = new DemoPlayer();
    this.doodadSpawner = new DoodadSpawner()
    this.doodads = [];
    this.buildingScores = false
    this.version = this.add.bitmapText(10, 10, "normal", "v1.5.0", 16).setDepth(5)
    this.scores = new Button(1140, 675, "highscores-btn", () => {
      if (!this.buildingScores) {
        buildHighScores()
      }
    })
    this.start = new Button(60, 675, "play-btn", () => {
      scene.scene.start("gameScene")
    })
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

