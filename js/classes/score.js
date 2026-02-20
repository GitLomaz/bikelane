class Score extends Phaser.GameObjects.Container {
  constructor() {
    // Define lane Y positions (matching player lanes)
    super(scene, GAME_WIDTH / 2, 50);
    this.score = 0
    this.scoreBonusOne = 0
    this.scoreBonusTwo = 0
    this.scoreBonusModOne = 2
    this.scoreBonusModTwo = 4

    this.scoreText = scene.add.bitmapText(0, 0, "normal", this.score, 32);
    this.scoreText.setOrigin(1, 0)
    this.scoreBonusText = scene.add.bitmapText(10, 0, "normal", this.score, 32);    
    this.add(this.scoreText)
    this.add(this.scoreBonusText)
    this.setDepth(1000)
    scene.add.existing(this);
  }

  update() {
    this.scoreText.setText(this.score)
    if (!scene.player.alive) {
      this.resetBonus()
      this.scoreBonusText.setText("")
      return
    }
    let scoreString = ""
    if (this.scoreBonusOne > 0) {
      scoreString += "+ " + this.scoreBonusOne + " %"
    }
    if (this.scoreBonusTwo > 0) {
      scoreString += "+ " + this.scoreBonusTwo + " &"
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
    
    const floatText = scene.add.bitmapText(10, 0, up ? "lightNumbers" : "darkNumbers", value, 32); 
    // const floatText = scene.add.text(10, 0,value, {
    //   fontFamily: 'myFont',
    //   fontSize: "32px",
    //   align: "center",
    //   color: up ? '#00FF00' : '#FF0000'
    // })
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