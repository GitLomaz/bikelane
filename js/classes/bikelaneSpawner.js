const grateFrequency = 4320
const baseFrequency = 5000
const minFrequency = 1000
const frequencyDegridation = .5

class BikelaneSpawner {
  constructor() {
    this.enemySpawnMilestone = grateFrequency;
    this.obsticleFrequency = baseFrequency
    this.nextObsticle = Random.between(baseFrequency / 4, baseFrequency)
  }

  update() {
    // this one goes by distance because they are very evenly spaced
    if (distance >= this.enemySpawnMilestone) {
      this.spawn(1);
      this.enemySpawnMilestone += grateFrequency;
    }
    if (distance >= this.nextObsticle) {
      this.spawn(Random.between(2, 4));
      console.log(this.obsticleFrequency)
      this.nextObsticle = distance + Random.between(this.obsticleFrequency / 4, this.obsticleFrequency)
    }
    if (this.obsticleFrequency > minFrequency) {
      this.obsticleFrequency -= frequencyDegridation
    }

  }

  spawn(enemyIndex) {
    const enemy = new Enemy(3, enemyIndex);
    scene.enemies.push(enemy);
  }
}