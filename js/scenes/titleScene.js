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
    this.scores = new Button(1050, 665, "highscore", () => {
      buildHighScores()
    })
    this.start = new Button(-10, 665, "play", () => {
      scene.scene.start("gameScene")
    })
  },

  update: function (time) {
    this.bg.update()
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
  scene.loading.setOrigin(.5);
  scene.scores = [];

  const url = submission
    ? "https://us-dev.nightscapes.io/scores/submitScores.php"
    : "https://us-dev.nightscapes.io/scores/submitScores.php?game=snowball";

  const options = submission
    ? {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: submission }),
      }
    : { method: "GET" };

  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((res) => {
      scene.loading.visible = false;
      res.scores.forEach((score, i) => {
        const item = new ScoreItem(115, 150 + i * 30, i + 1, score.name, score.score);
        scene.scores.push(item);
        scene.add.existing(item);
      });

      if (res.position) {
        const item = new ScoreItem(115, 150 + 310, res.position, res.name, res.score);
        scene.scores.push(item);
        scene.add.existing(item);
      }
    })
    .catch((error) => {
      console.error("Error fetching high scores:", error);
      scene.loading.setText("Failed to load scores.");
    });

  submission = false;
}

