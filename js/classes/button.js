class Button extends Phaser.GameObjects.Container {
  constructor(x, y, text, callback) {
    super(scene, x, y);
    this.callback = callback;
    this.label = text;

    this.fontKey = "normal";
    this.fontSize = 32;

    // Create bitmap text
    this.textObj = scene.add.bitmapText(
      0,
      0,
      this.fontKey,
      this.label,
      this.fontSize
    );

    this.textObj.setOrigin(0.5);

    this.add(this.textObj);

    // Set container size based on text
    this.setSize(this.textObj.width, this.textObj.height);

    // Make container interactive
    this.setInteractive(
      new Phaser.Geom.Rectangle(
        -this.width / 2,
        -this.height / 2,
        this.width * 2,
        this.height * 2
      ),
      Phaser.Geom.Rectangle.Contains,
      { useHandCursor: true }
    );

    // Click event
    this.on("pointerdown", () => {
      if (this.callback) { this.callback(); }
    });

    scene.add.existing(this);
    
    this.setDepth(1000)
  }
}