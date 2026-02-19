class DoodadSpawner {
  constructor() {
    this.benchCooldown = 7000
    this.treeCooldown = 3000
    this.farTreeCooldown = 3000
  }

  update() {
    if (distance >= this.benchCooldown) {
      this.spawn("bench", 1);
      this.benchCooldown += 7000;
      console.log('spawning bnehc')
      if (Random.oneIn(2)) {
        const lamp = this.spawn("lamp", 1)
        if (Random.oneIn(2)) {
          lamp.x += 200
        } else {
          lamp.x -= 50
        }
      } 
    }
    if (distance >= this.treeCooldown) {
      this.spawn("tree" + Phaser.Math.Between(1, 6), 0);
      this.treeCooldown += 3000;
      if (Random.oneIn(3)) {
        const tree = this.spawn("tree" + Phaser.Math.Between(1, 6), 0);
        tree.x += 500
        if (Random.oneIn(3)) {
          const tree3 = this.spawn("tree" + Phaser.Math.Between(1, 6), 0);
          tree3.x += 1000
        } 
      } 
    }
    if (distance >= this.farTreeCooldown) {
      this.spawn("tree" + Phaser.Math.Between(7, 12), 2);
      this.farTreeCooldown += 3000;
      if (Random.oneIn(2)) {
        const tree = this.spawn("tree" + Phaser.Math.Between(7, 12), 2);
        tree.x += 300
        if (Random.oneIn(2)) {
          const treee = this.spawn("tree" + Phaser.Math.Between(7, 12), 2);
          treee.x += 600
        } 
      } 
    }
  }

  spawn(image, position) {
    const doodad = new StaticObject(image, position);
    scene.doodads.push(doodad);
    return doodad
  }
}