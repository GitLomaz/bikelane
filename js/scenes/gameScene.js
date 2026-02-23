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


    this.load.image("submit", "images/submit.png");
    this.load.image("submit-over", "images/submit-over.png");
    this.load.image("back", "images/back.png");
    this.load.image("back-over", "images/back-over.png");


    this.load.spritesheet('bike', 'images/bike-new.png', { frameWidth: 140, frameHeight: 200 });
    this.load.spritesheet('sidewalk', 'images/bg1.png', { frameWidth: 1280, frameHeight: 144 });
    this.load.image('life', 'images/life.png');
  },

  create: function () {
    scene = this;
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
  },

  update: function () {
    this.bg.update()
    this.bikelaneSpawner.update()
    this.carSpawner.update()
    this.score.update()
    this.doodadSpawner.update()
    this.doodads.forEach((doodad) => {
      doodad.update()
    })
    
    // Update all enemies
    this.enemies.forEach((enemy, index) => {
      if (enemy.active) {
        enemy.update();
      } else {
        // Remove destroyed enemies from the list
        this.enemies.splice(index, 1);
      }
    });
  },
});
