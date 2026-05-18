const oncomingBaseFrequency = 5000
const oncomingMinFrequency = 1000
const oncomingFrequencyDegradation = .5

class OncomingSpawner {
  constructor() {
    this.obstacleFrequency = oncomingBaseFrequency
    this.nextObstacle = Random.between(oncomingBaseFrequency / 4, oncomingBaseFrequency)
  }

  update(deltaMultiplier = 1) {
    if (distance >= this.nextObstacle) {
      // Check if there's enough clearance from ALL vehicles in this lane
      let canSpawn = true
      const spawnX = -GAME_WIDTH
      const minSpacing = 3 // 3 car lengths
      
      // Check all active enemies in lane 2
      for (let enemy of scene.enemies) {
        if (enemy.active && enemy.lane === 2) {
          const enemyLeftEdge = enemy.x - (enemy.width / 2) * Math.abs(enemy.scaleX)
          const clearance = enemyLeftEdge - spawnX
          
          // Need clearance of at least 3 car lengths
          if (clearance < enemy.width * minSpacing) {
            canSpawn = false
            break
          }
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
  }
}
