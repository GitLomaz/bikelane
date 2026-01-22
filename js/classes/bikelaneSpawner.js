const grateFrequency = 1000 // 4320

class BikelaneSpawner {
  constructor() {
    this.enemySpawnMilestone = grateFrequency;
  }

  update() {
    if (distance >= this.enemySpawnMilestone) {
      this.spawn(1);
      this.enemySpawnMilestone += grateFrequency;
    }
  }

  spawn(enemyIndex) {
    const enemy = new Enemy(3, enemyIndex);
    scene.enemies.push(enemy);
  }
}