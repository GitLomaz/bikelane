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


    this.load.spritesheet('bench', 'images/bench.png', { frameWidth: 200, frameHeight: 100 });
    this.load.spritesheet('bike', 'images/bike-new.png', { frameWidth: 140, frameHeight: 200 });
    this.load.spritesheet('sidewalk', 'images/bg1.png', { frameWidth: 1280, frameHeight: 144 });
  },

  create: function () {
    scene = this;
    this.bg = new BG();
    this.player = new DemoPlayer();
    this.carSpawner = new CarSpawner()
    this.enemies = [];
    this.scores = new Button(1050, 665, "highscore", () => {
      buildHighScores()
    })
    this.start = new Button(-10, 665, "play", () => {
      scene.scene.start("gameScene")
    })
    new StaticObject("bench")
  },

  update: function (time) {
    this.bg.update()
    this.carSpawner.update()
    if (this.staticObject) {
      this.staticObject.update()
    }
  },
});

function buildHighScores() {
  scene.loading = scene.add.text(400, 300, "Loading . . .", {
    fontFamily: 'myFont',
    fontSize: "32px",
    align: "center",
    stroke: '#330030',
    strokeThickness: 4
  });
  scene.loading.setOrigin(.5)  
  scene.scores = [] 
  if (submission) {
    $.ajax({
      type: "POST",
      url: "https://us-dev.nightscapes.io/scores/submitScores.php",
      data: { data: submission },
      dataType: "json",
      success: function (res) {
        scene.loading.visible = false
        res.scores.forEach(function (score, i) {
          let item = new ScoreItem(115, 150 + i * 30, i + 1, score.name, score.score);
          scene.scores.push(item);
          scene.add.existing(item);
        });
        if (res.position) {
          let item = new ScoreItem(115, 150 + 310, res.position, res.name, res.score)
          scene.scores.push(item)
          scene.add.existing(item);
        }
      },
    });
    submission = false
  } else {
    $.ajax({
      url: "https://us-dev.nightscapes.io/scores/submitScores.php?game=snowball",
      type: "GET",
      dataType: "json",
      success: function (res) {
        scene.loading.visible = false
        res.scores.forEach(function (score, i) {
          let item = new ScoreItem(
            115,
            150 + i * 30,
            i + 1,
            score.name,
            score.score
          );
          scene.add.existing(item);
          scene.scores.push(item);
        });
      },
    });
  }
}

