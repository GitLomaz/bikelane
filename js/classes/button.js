class Button extends Phaser.GameObjects.Container {
  constructor(x, y, buttonImage, callback) {
    super(scene, x, y);
    this.buttonImage = buttonImage;
    this.callback = callback;
    this.isHovered = false;
    this.isPressed = false;
  }

  draw(ctx) {
    if (this.buttonImage) {
      ctx.drawImage(this.buttonImage, this.x, this.y);
    }
  }

  handleMouseMove(mouseX, mouseY) {
    this.isHovered = this.isPointInside(mouseX, mouseY);
  }

  handleMouseDown(mouseX, mouseY) {
    if (this.isPointInside(mouseX, mouseY)) {
      this.isPressed = true;
    }
  }

  handleMouseUp(mouseX, mouseY) {
    if (this.isPressed && this.isPointInside(mouseX, mouseY)) {
      if (this.callback) {
        this.callback();
      }
    }
    this.isPressed = false;
  }

  isPointInside(x, y) {
    return this.buttonImage && 
         x >= this.x && 
         x <= this.x + this.buttonImage.width &&
         y >= this.y && 
         y <= this.y + this.buttonImage.height;
  }
}