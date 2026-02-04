class Score extends Phaser.GameObjects.Container {
  constructor() {
    // Define lane Y positions (matching player lanes)
    super(scene, GAME_WIDTH / 2, 50);
    this.score = 0
    this.scoreBonusOne = 0
    this.scoreBonusTwo = 0
    this.scoreBonusModOne = 1.25
    this.scoreBonusModTwo = 1.75
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
    this.add(this.scoreText)
    this.add(this.scoreBonusText)
    scene.add.existing(this);
  }

  update() {
    this.scoreText.setText(this.score)
    let scoreString = ""
    if (this.scoreBonusOne > 0) {
      scoreString += "+ " + this.scoreBonusOne + " x" + this.scoreBonusModOne
    }
    if (this.scoreBonusTwo > 0) {
      scoreString += "+ " + this.scoreBonusTwo + " x" + this.scoreBonusModTwo
    }
    this.scoreBonusText.setText(scoreString)
    if (scene.player.lane === 3) {
      this.score += bikeSpeed
      this.scoreBonusText.setText("")
    } else if (scene.player.lane === 2) {
      this.scoreBonusOne += bikeSpeed
    } else if (scene.player.lane === 1) {
      this.scoreBonusTwo += bikeSpeed
    }
  }

  cashInBonus() {
    const score = Math.floor(this.scoreBonusOne * this.scoreBonusModOne + this.scoreBonusTwo * this.scoreBonusModTwo)
    this.score += score
    this.floatNumber(score)
    this.scoreBonusOne = 0
    this.scoreBonusTwo = 0
  }

  resetBonus() {
    const score = Math.floor(this.scoreBonusOne * this.scoreBonusModOne + this.scoreBonusTwo * this.scoreBonusModTwo)
    this.floatNumber(score, false)
    this.scoreBonusOne = 0
    this.scoreBonusTwo = 0
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