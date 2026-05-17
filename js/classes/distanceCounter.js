class DistanceCounter extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, 20, GAME_HEIGHT - 60);
    
    this.distanceText = scene.add.bitmapText(0, 0, "normal", "0m", 32);
    this.distanceText.setOrigin(0, 0);
    
    this.add(this.distanceText);
    this.setDepth(1000);
    scene.add.existing(this);
  }

  update() {
    if (!globalStats) return;
    
    const meters = globalStats.getCurrentDistanceMeters();
    
    if (meters === 0) { // game over
      return;
    }
    
    // Format distance with appropriate unit
    let displayText;
    if (meters >= 1000) {
      const km = (meters / 1000).toFixed(1);
      displayText = `${km}km`;
    } else {
      displayText = `${meters}m`;
    }
    
    this.distanceText.setText(displayText);
  }
}
