class LifeCounter {
  constructor() {
    this.lives = 3;
    this.lifeImages = [];

    for (let i = 0; i < this.lives; i++) {
      const lifeImage = scene.add.image(scene.cameras.main.width - 20 - i * 40, 20, 'life');
      lifeImage.setOrigin(1, 0);
      lifeImage.setScrollFactor(0);
      lifeImage.setDepth(1000)
      this.lifeImages.push(lifeImage);
    }
  }

  loseLife() {
    if (this.lives > 0) {
      this.lives--;
      const lostLifeImage = this.lifeImages.pop();
      lostLifeImage.destroy();
    }
  }

  resetLives() {
    this.lives = 3;
    this.lifeImages.forEach(image => image.destroy());
    this.lifeImages = [];

    for (let i = 0; i < this.lives; i++) {
      const lifeImage = scene.add.image(scene.cameras.main.width - 20 - i * 40, 20, 'life');
      lifeImage.setOrigin(1, 0);
      lifeImage.setScrollFactor(0);
      this.lifeImages.push(lifeImage);
    }
  }
}
