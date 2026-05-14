class Button extends Phaser.GameObjects.Container {
  constructor(x, y, imageKey, callback) {
    super(scene, x, y);
    this.callback = callback;
    this.imageKey = imageKey;
    this.isHovering = false;
    this.animating = false;

    // Create sprite from the image key
    this.sprite = scene.add.sprite(0, 0, imageKey);
    this.sprite.setOrigin(0.5);
    this.sprite.setFrame(0); // Start at inactive state

    this.add(this.sprite);

    // Set container size based on sprite
    this.setSize(this.sprite.width, this.sprite.height);

    // Create animations for this button
    const hoverInKey = `${imageKey}-hover-in`;
    const hoverOutKey = `${imageKey}-hover-out`;

    // Hover in animation (frames 1-6)
    if (!scene.anims.exists(hoverInKey)) {
      scene.anims.create({
        key: hoverInKey,
        frames: scene.anims.generateFrameNumbers(imageKey, { start: 1, end: 6 }),
        frameRate: 30,
        repeat: 0
      });
    }

    // Hover out animation (frames 6-1, reverse)
    if (!scene.anims.exists(hoverOutKey)) {
      scene.anims.create({
        key: hoverOutKey,
        frames: scene.anims.generateFrameNumbers(imageKey, { start: 6, end: 1 }),
        frameRate: 30,
        repeat: 0
      });
    }

    // Make the sprite itself interactive to avoid container coordinate issues
    this.sprite.setInteractive({ useHandCursor: true });

    // Pointer over event
    this.sprite.on("pointerover", () => {
      if (!this.isHovering && !this.animating) {
        this.isHovering = true;
        this.animating = true;
        
        // Stop any existing animations and listeners
        this.sprite.stop();
        this.sprite.off('animationcomplete');
        
        this.sprite.play(hoverInKey);
      }
    });

    // Pointer out event
    this.sprite.on("pointerout", () => {
      if (this.isHovering) {
        this.isHovering = false;
        this.animating = true;
        
        // Stop any existing animations and listeners
        this.sprite.stop();
        this.sprite.off('animationcomplete');
        
        this.sprite.play(hoverOutKey);
        
        // When hover-out completes, return to frame 0
        this.sprite.once('animationcomplete', () => {
          this.animating = false;
          this.sprite.setFrame(0);
        });
      }
    });

    // Click event
    this.sprite.on("pointerdown", () => {
      if (this.callback) { 
        this.callback(); 
      }
    });

    scene.add.existing(this);
    
    this.setDepth(1000);
  }
}