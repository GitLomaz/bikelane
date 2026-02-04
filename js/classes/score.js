class Score extends Phaser.GameObjects.Container {
  constructor() {
    // Define lane Y positions (matching player lanes)
    super(scene, GAME_WIDTH / 2, 50);
    this.score = 0
    this.scoreBonus = 0
    this.scoreBonusMod = 1
    this.scoreText = scene.add.text(0, 0, this.score, {
      fontFamily: 'myFont',
      fontSize: "32px",
      align: "center",
    })
    this.scoreText.setOrigin(1, 0)
    this.scoreBonusText = scene.add.text(10, 0, this.score, {
      fontFamily: 'myFont',
      fontSize: "32px",
      align: "center",
    })
    this.scoreBonusModText = scene.add.text(70, 0, this.score, {
      fontFamily: 'myFont',
      fontSize: "32px",
      align: "center",
    })
    this.add(this.scoreText)
    this.add(this.scoreBonusText)
    this.add(this.scoreBonusModText)
    scene.add.existing(this);
  }

  update() {
    this.scoreText.setText(this.score)
    this.scoreBonusText.setText("+ " + this.scoreBonus + " x" + this.scoreBonusMod)
    this.scoreBonusModText.setText()
    if (scene.player.lane === 3) {
      this.score += bikeSpeed
      this.scoreBonusText.setText("")
    } else if (scene.player.lane === 2) {
      this.scoreBonus += bikeSpeed
      this.scoreBonusMod = 1.25
    } else if (scene.player.lane === 1) {
      this.scoreBonus += bikeSpeed
      this.scoreBonusMod = 1.75
    }
  }

  cashInBonus() {
    const score = Math.floor(this.scoreBonus * this.scoreBonusMod)
    this.score += score
    this.floatNumber(score)
    this.scoreBonus = 0
  }

  resetBonus() {
    const score = Math.floor(this.scoreBonus * this.scoreBonusMod)
    this.floatNumber(score, false)
    this.scoreBonus = 0
  }

  floatNumber(value, up = true) {
    if (value === 0) {
      return
    }
    const floatText = scene.add.text(10, 0,value, {
      fontFamily: 'myFont',
      fontSize: "32px",
      align: "center",
      color: up ? '#00FF00' : '#FF0000'
    })
    this.add(floatText)
    scene.tweens.add({
      targets: floatText,
      y: up ? floatText.y - 50 :  floatText.y + 50,
      duration: 300,
      alpha: 0,
      ease: "Quad.easeOut",
      onComplete: () => {
        floatText.destroy()
      }
    });
    if (up) {
      scene.tweens.add({
        targets: this.scoreText,
        scale: 1.25,
        duration: 100,
        yoyo: true
      })
    }
  }
}