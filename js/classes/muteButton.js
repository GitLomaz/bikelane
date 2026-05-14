class MuteButton extends Phaser.GameObjects.Container {
  constructor(x, y, imageKey, callback) {
    super(scene, x, y);
    this.callback = callback;
    this.imageKey = imageKey;
    this.animating = false;

    // Create sprite from the image key
    this.sprite = scene.add.sprite(0, 0, imageKey);
    this.sprite.setOrigin(0.5);
    
    // Set initial frame based on mute state
    // Frame 0 = sound off (muted), last frame = sound on (unmuted)
    this.updateFrame();

    this.add(this.sprite);

    // Set container size based on sprite (32 wide x 24 high)
    this.setSize(32, 24);

    // Create toggle animation (frames 0-7)
    const toggleOnKey = `${imageKey}-toggle-on`;
    const toggleOffKey = `${imageKey}-toggle-off`;

    if (!scene.anims.exists(toggleOnKey)) {
      scene.anims.create({
        key: toggleOnKey,
        frames: scene.anims.generateFrameNumbers(imageKey, { start: 0, end: 7 }),
        frameRate: 30,
        repeat: 0
      });
    }

    if (!scene.anims.exists(toggleOffKey)) {
      scene.anims.create({
        key: toggleOffKey,
        frames: scene.anims.generateFrameNumbers(imageKey, { start: 7, end: 0 }),
        frameRate: 30,
        repeat: 0
      });
    }

    // Make the sprite interactive
    this.sprite.setInteractive({ useHandCursor: true });

    // Click event
    this.sprite.on("pointerdown", () => {
      if (!this.animating) {
        this.animating = true;
        
        // Toggle mute state
        window.soundManager.toggleMute();
        
        // Animate to new state
        const isMuted = window.soundManager.isMuted();
        const animKey = isMuted ? toggleOffKey : toggleOnKey;
        
        this.sprite.stop();
        this.sprite.off('animationcomplete');
        this.sprite.play(animKey);
        
        this.sprite.once('animationcomplete', () => {
          this.animating = false;
          this.updateFrame();
        });
        
        if (this.callback) {
          this.callback();
        }
      }
    });

    scene.add.existing(this);
    this.setDepth(1000);
  }

  updateFrame() {
    const isMuted = window.soundManager.isMuted();
    // Frame 0 = muted (off), frame 7 = unmuted (on)
    this.sprite.setFrame(isMuted ? 0 : 7);
  }
}
