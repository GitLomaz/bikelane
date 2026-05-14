let gameScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function gameScene() {
    Phaser.Scene.call(this, {
      key: "gameScene",
    });
  },

  preload: function () {
    this.load.image("player", "images/player.png");
    this.load.image("blip", "images/blip.png");
    
    
    this.load.image("bg", "images/bg.png");
    this.load.image("bg2", "images/bg2.png");
    this.load.image("bg3", "images/bg3.png");
    this.load.image("bg4", "images/bg4.png");
    this.load.image("bg5", "images/bg5.png");


    this.load.image("vehicle1", "images/big1.png");
    this.load.image("vehicle2", "images/big2.png");
    this.load.image("vehicle3", "images/med1.png");
    this.load.image("vehicle4", "images/med2.png");
    this.load.image("vehicle5", "images/small1.png");
    this.load.image("vehicle6", "images/small2.png");
    this.load.image("vehicle7", "images/small3.png");


    this.load.image("grate1", "images/grate1.png");
    this.load.image("grate2", "images/grate2.png");
    this.load.image("kittens", "images/kittens.png");
    this.load.image("vinyl", "images/vinyl.png");
    this.load.image("vlc", "images/vlc.png");

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

    this.load.spritesheet('bike', 'images/bike-new.png', { frameWidth: 140, frameHeight: 200 });
    this.load.spritesheet('sidewalk', 'images/bg1.png', { frameWidth: 1280, frameHeight: 144 });
    this.load.image('life', 'images/life.png');
  },

  create: function () {
    scene = this;
    // this.textures.get('normal').setFilter(Phaser.Textures.FilterMode.NEAREST);
    this.bg = new BG();
    this.player = new Player();
    this.score = new Score();

    this.doodadSpawner = new DoodadSpawner()
    this.doodads = [];
    
    // Enemy spawning system
    this.enemies = [];

    this.bikelaneSpawner = new BikelaneSpawner()
    this.carSpawner = new CarSpawner()
    distance = 0;
    
    // Add mute button in top right corner
    this.muteButton = new MuteButton(1240, 40, "mute-btn");
  },

  update: function (time, delta) {
    // Normalize delta to 60fps (16.67ms per frame)
    // This makes the game run at consistent speed regardless of frame rate
    const deltaMultiplier = delta / 16.67;
    this.bg.update(deltaMultiplier)
    this.bikelaneSpawner.update(deltaMultiplier)
    this.carSpawner.update(deltaMultiplier)
    this.score.update(deltaMultiplier)
    this.doodadSpawner.update(deltaMultiplier)
    this.doodads.forEach((doodad) => {
      doodad.update(deltaMultiplier)
    })
    
    // Update all enemies
    this.enemies.forEach((enemy, index) => {
      if (enemy.active) {
        enemy.update(deltaMultiplier);
      } else {
        // Remove destroyed enemies from the list
        this.enemies.splice(index, 1);
      }
    });
  },
});
