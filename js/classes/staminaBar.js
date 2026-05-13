class StaminaBar {
  constructor() {
    this.width = 360;
    this.height = 18;
    this.x = GAME_WIDTH / 2;
    this.y = GAME_HEIGHT - 20;
    this.padding = 2;

    this.borderColor = 0xaf3d45; // af3d45
    this.fillColor = 0xf78b6d; // f78b6d
    this.emptyColor = 0x662a41; // 662a41

    this.graphics = scene.add.graphics();
    this.graphics.setScrollFactor(0);
    this.graphics.setDepth(1000);

    this.label = scene.add.bitmapText(this.x, this.y - 20, "normal", "STAMINA", 24).setOrigin(0.5).setDepth(1000);

    this.lastValue = -1;
    this.draw(100);
  }

  fadeOut() {
    this.graphics.clear();
    scene.tweens.add({
      targets: this.label,
      alpha: 0,
      duration: 200,
      ease: "Quad.easeInOut",
    });
  }

  draw(value) {
    const g = this.graphics;
    g.clear();

    const left = Math.round(this.x - this.width / 2);
    const top = Math.round(this.y - this.height / 2);

    // Background (empty)
    g.fillStyle(this.emptyColor, 1);
    g.fillRect(left, top, this.width, this.height);

    // Filled portion
    const innerLeft = left + this.padding;
    const innerTop = top + this.padding;
    const innerWidth = this.width - this.padding * 2;
    const innerHeight = this.height - this.padding * 2;
    const pct = Phaser.Math.Clamp(value / 100, 0, 1);
    const filledW = Math.round(innerWidth * pct);

    if (filledW > 0) {
      g.fillStyle(this.fillColor, 1);
      g.fillRect(innerLeft, innerTop, filledW, innerHeight);
    }

    // Border
    g.lineStyle(2, this.borderColor, 1);
    g.strokeRect(left, top, this.width, this.height);
  }

  update(value) {
    // only redraw when value changes noticeably
    if (this.lastValue !== Math.round(value)) {
      this.lastValue = Math.round(value);
      this.draw(value);
    }
  }

  destroy() {
    if (this.graphics) {
      this.graphics.destroy();
      this.graphics = null;
    }
  }
}
