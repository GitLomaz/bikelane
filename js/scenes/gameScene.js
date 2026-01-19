let gameScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function gameScene() {
    Phaser.Scene.call(this, {
      key: "gameScene",
    });
  },

  preload: function () {
    this.load.image("radar", "images/radar.png");
    this.load.image("player", "images/player.png");
    this.load.image("blip", "images/blip.png");
    
    
    this.load.image("bg", "images/bg.png");
    this.load.image("bg2", "images/bg2.png");
    this.load.image("bg3", "images/bg3.png");
    this.load.image("bg4", "images/bg4.png");
    this.load.image("bg5", "images/bg5.png");


    this.load.spritesheet('bike', 'images/bike-new.png', { frameWidth: 140, frameHeight: 200 });
    this.load.spritesheet('sidewalk', 'images/bg1.png', { frameWidth: 1280, frameHeight: 144 });
  },

  create: function () {
    scene = this;
    this.bg = new BG();
    new Radar();
    this.player = new Player();
    this.manhole = new Manhole();
    
    // Enemy spawning system
    this.enemies = [];
    this.spawnTimer = 0;
    this.spawnInterval = 120; // Spawn an enemy every 120 frames (~2 seconds at 60 FPS)
    this.enemySpeed = 3; // Pixels per frame
  },

  update: function (time) {
    // Spawn enemies
    this.bg.update()
    this.manhole.update()
    this.spawnTimer++;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnEnemy();
      this.spawnTimer = 0;
    }
    
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

  spawnEnemy: function() {
    const randomLane = Phaser.Math.Between(1, 3);
    const enemy = new Enemy(randomLane, this.enemySpeed);
    this.enemies.push(enemy);
  }
});
