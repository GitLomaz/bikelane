class Button extends Phaser.GameObjects.Container {
  constructor(x, y, textureKey, callback) {
    super(scene, x, y);

    this.callback = callback;
    this.texture = textureKey

    // Create the image
    this.image = scene.add.image(0, 0, textureKey);
    this.image.setOrigin(0, 0);

    // Add to container
    this.add(this.image);

    // Set size for input hit area
    this.setSize(this.image.width, this.image.height);

    // Enable input
    this.image.setInteractive();

    // Input events
    this.image.on('pointerover', () => {
      this.image.setTexture(this.texture + '-over')
    });

    this.image.on('pointerout', () => {
      this.image.setTexture(this.texture)
    });

    this.image.on('pointerdown', () => {
      if (this.callback) {
        this.callback();
      }
    });

    scene.add.existing(this);
  }
}