class Score extends Phaser.GameObjects.Container {
  constructor() {
    // Define lane Y positions (matching player lanes)
    super(scene, GAME_WIDTH / 2, 10);
    this.score = 0
    this.scoreBonusOne = 0
    this.scoreBonusTwo = 0
    this.scoreBonusModOne = 2
    this.scoreBonusModTwo = 4

    this.scoreText = scene.add.bitmapText(0, 0, "large", this.score, 64);
    this.scoreText.setOrigin(.5, 0)
    this.scoreBonusText = scene.add.bitmapText(0, 30, "normal", this.score, 32);  
    this.scoreBonusText.setOrigin(.5, 0)  
    this.add(this.scoreText)
    this.add(this.scoreBonusText)
    this.setDepth(1000)
    scene.add.existing(this);
  }

  update() {
    this.scoreText.setText(displayNumber(this.score))
    if (!scene.player.alive) {
      this.resetBonus()
      this.scoreBonusText.setText("")
      return
    }
    let scoreString = ""
    if (this.scoreBonusOne > 0) {
      scoreString += "\r\n+ " + displayNumber(this.scoreBonusOne) + " %"
    }
    if (this.scoreBonusTwo > 0) {
      scoreString += "\r\n+ " + displayNumber(this.scoreBonusTwo) + " &"
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
    
    const floatText = scene.add.bitmapText(180, 0, up ? "lightNumbers" : "darkNumbers", value, 64); 
    this.add(floatText)
    scene.tweens.add({
      targets: floatText,
      y: up ? floatText.y - 50 :  floatText.y + 50,
      duration: 500,
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

  hopBonus(value) {
    if (value === 0) {
      return
    }
    this.score += value
    const floatText = scene.add.bitmapText(-360, 380, "lightNumbers", value, 32); 
    this.add(floatText)
    scene.tweens.add({
      targets: floatText,
      y: floatText.y - 50,
      duration: 500,
      alpha: 0,
      ease: "Quad.easeOut",
      onComplete: () => {
        floatText.destroy()
      }
    });
    scene.tweens.add({
      targets: this.scoreText,
      scale: 1.25,
      duration: 100,
      yoyo: true
    })
  }
}