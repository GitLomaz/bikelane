class PowerupSpawner {
  constructor() {
    this.nextSpawn = 10
  }

  update(deltaMultiplier = 1) {
    if (distance >= this.nextSpawn) {
      this.spawn();
    }
  }

  spawn() {
    const powerup = new Powerup("powerup-1", Random.between(1, 3));
    scene.powerups.push(powerup);
    this.nextSpawn = distance + 1500
  }
}