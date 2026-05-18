const withTrafficBaseFrequency = 5000
const withTrafficMinFrequency = 1000
const withTrafficFrequencyDegradation = .5

class WithTrafficSpawner {
  constructor() {
    this.obstacleFrequency = withTrafficBaseFrequency
    this.nextObstacle = Random.between(withTrafficBaseFrequency / 4, withTrafficBaseFrequency)
    this.lastSpawnedEnemy = null
  }

  update(deltaMultiplier = 1) {
    if (distance >= this.nextObstacle) {
      // Check if there's enough clearance from the last spawned vehicle
      let canSpawn = true
      if (this.lastSpawnedEnemy && this.lastSpawnedEnemy.active) {
        const spawnX = GAME_WIDTH + 1000
        const prevRightEdge = this.lastSpawnedEnemy.x + (this.lastSpawnedEnemy.width / 2) * Math.abs(this.lastSpawnedEnemy.scaleX)
        // Need clearance of at least the previous vehicle's width
        if (spawnX - prevRightEdge < this.lastSpawnedEnemy.width) {
          canSpawn = false
        }
      }
      
      if (canSpawn) {
        this.spawn();
        // Adjust spawn frequency based on bikeSpeed - faster bike = less frequent spawns
        // since these cars are coming from behind (relative speed decreases)
        const speedFactor = bikeSpeed / 12 // normalize to base speed of 12
        const adjustedFrequency = this.obstacleFrequency * speedFactor
        this.nextObstacle = distance + Random.between(adjustedFrequency / 4, adjustedFrequency)
      }
    }
    if (this.obstacleFrequency > withTrafficMinFrequency) {
      this.obstacleFrequency -= withTrafficFrequencyDegradation * deltaMultiplier
    }
  }

  spawn() {
    const enemy = new Enemy(1); // Lane 1: traffic from behind
    scene.enemies.push(enemy);
    this.lastSpawnedEnemy = enemy;
  }
}
