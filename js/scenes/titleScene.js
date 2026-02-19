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
    this.doodadSpawner = new DoodadSpawner()
    this.doodads = [];
    this.scores = new Button(1050, 665, "highscore", () => {
      buildHighScores()
    })
    this.start = new Button(-10, 665, "play", () => {
      scene.scene.start("gameScene")
    })
    if (submission) {
      buildHighScores()
    }
  },

  update: function (time) {
    distance += bikeSpeed * speedMod
    this.doodadSpawner.update()
    this.bg.update()
    scene.doodads.forEach((doodad) => {
      doodad.update()
    })
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
          let item = new ScoreItem(415, 50 + i * 30, i + 1, score.name, score.score);
          scene.scores.push(item);
          scene.add.existing(item);
        });
        if (res.position) {
          let item = new ScoreItem(415, 50 + 310, res.position, res.name, res.score)
          scene.scores.push(item)
          scene.add.existing(item);
        }
      },
    });
    submission = false
  } else {
    $.ajax({
      url: "https://us-dev.nightscapes.io/scores/submitScores.php?game=bikelane",
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
          );
          scene.add.existing(item);
          scene.scores.push(item);
        });
      },
    });
  }
}

