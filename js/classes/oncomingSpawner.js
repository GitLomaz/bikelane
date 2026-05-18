const oncomingBaseFrequency = 5000
const oncomingMinFrequency = 1000
const oncomingFrequencyDegradation = .5

class OncomingSpawner {
  constructor() {
    this.obstacleFrequency = oncomingBaseFrequency
    this.nextObstacle = Random.between(oncomingBaseFrequency / 4, oncomingBaseFrequency)
    this.lastSpawnedEnemy = null
  }

  update(deltaMultiplier = 1) {
    if (distance >= this.nextObstacle) {
      // Check if there's enough clearance from the last spawned vehicle
      let canSpawn = true
      if (this.lastSpawnedEnemy && this.lastSpawnedEnemy.active) {
        const spawnX = -GAME_WIDTH
        const prevLeftEdge = this.lastSpawnedEnemy.x - (this.lastSpawnedEnemy.width / 2) * Math.abs(this.lastSpawnedEnemy.scaleX)
        // Need clearance of at least the previous vehicle's width
        if (prevLeftEdge - spawnX < this.lastSpawnedEnemy.width) {
          canSpawn = false
        }
      }
      
      if (canSpawn) {
        this.spawn();
        // Adjust spawn frequency based on bikeSpeed - faster bike = more frequent spawns
        // since these cars are oncoming (relative speed increases)
        const speedFactor = 12 / bikeSpeed // inverse: faster bike = smaller factor = more frequent
        const adjustedFrequency = this.obstacleFrequency * speedFactor
        this.nextObstacle = distance + Random.between(adjustedFrequency / 4, adjustedFrequency)
      }
    }
    if (this.obstacleFrequency > oncomingMinFrequency) {
      this.obstacleFrequency -= oncomingFrequencyDegradation * deltaMultiplier
    }
  }

  spawn() {
    const enemy = new Enemy(2); // Lane 2: oncoming traffic
    scene.enemies.push(enemy);
    this.lastSpawnedEnemy = enemy;
  }
}
