const withTrafficBaseFrequency = 5000
const withTrafficMinFrequency = 1000
const withTrafficFrequencyDegradation = .5

class WithTrafficSpawner {
  constructor() {
    this.obstacleFrequency = withTrafficBaseFrequency
    this.nextObstacle = Random.between(withTrafficBaseFrequency / 4, withTrafficBaseFrequency)
  }

  update(deltaMultiplier = 1) {
    if (distance >= this.nextObstacle) {
      // Check if there's enough clearance from ALL vehicles in this lane
      let canSpawn = true
      const spawnX = GAME_WIDTH + 1000
      const minSpacing = 3 // 3 car lengths
      
      // Check all active enemies in lane 1
      for (let enemy of scene.enemies) {
        if (enemy.active && enemy.lane === 1) {
          const enemyRightEdge = enemy.x + (enemy.width / 2) * Math.abs(enemy.scaleX)
          const clearance = spawnX - enemyRightEdge
          
          // Need clearance of at least 3 car lengths
          if (clearance < enemy.width * minSpacing) {
            canSpawn = false
            break
          }
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
  }
}
