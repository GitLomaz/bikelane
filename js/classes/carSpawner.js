const carBaseFrequency = 5000
const carMinFrequency = 1000
const carFrequencyDegridation = .5

class CarSpawner {
  constructor() {
    this.obsticleFrequency = carBaseFrequency
    this.nextObsticle = Random.between(carBaseFrequency / 4, carBaseFrequency)
  }

  update(deltaMultiplier = 1) {
    if (distance >= this.nextObsticle) {
      this.spawn();
      this.nextObsticle = distance + Random.between(this.obsticleFrequency / 4, this.obsticleFrequency)
    }
    if (this.obsticleFrequency > carMinFrequency) {
      this.obsticleFrequency -= carFrequencyDegridation * deltaMultiplier
    }
  }

  spawn() {
    const enemy = new Enemy(Random.between(1, 2));
    scene.enemies.push(enemy);
  }
}