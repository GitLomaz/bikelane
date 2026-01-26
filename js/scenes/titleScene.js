let titleScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function gameScene() {
    Phaser.Scene.call(this, {
      key: "titleScene",
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


    this.load.image("highscore", "images/highscore.png");
    this.load.image("highscore-over", "images/highscore-over.png");
    this.load.image("play", "images/play.png");
    this.load.image("play-over", "images/play-over.png");


    this.load.spritesheet('bike', 'images/bike-new.png', { frameWidth: 140, frameHeight: 200 });
    this.load.spritesheet('sidewalk', 'images/bg1.png', { frameWidth: 1280, frameHeight: 144 });
  },

  create: function () {
    scene = this;
    this.bg = new BG();
    this.player = new DemoPlayer();
    console.log('title?!')
  },

  update: function (time) {
    this.bg.update()
  },
});
