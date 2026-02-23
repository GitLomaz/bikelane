class CanvasInput extends Phaser.GameObjects.Container {
  constructor(x, y, width, height, config = {}) {
    super(scene, x, y);

    this.w = width;
    this.h = height;

    this.value = config.value ?? "";
    this.maxLength = config.maxLength ?? 20;

    // Use your bitmap font (srLight / srDark etc.)
    this.fontKey = config.fontKey ?? "srLight";
    this.fontSize = config.fontSize ?? 32;

    this.placeholder = config.placeholder ?? "";
    this.onEnter = config.onEnter ?? null;
    this.onChange = config.onChange ?? null;
    this.allowed = config.allowed ?? null; // optional regex: /^[A-Z0-9 ]$/ etc.
    this.value = config.value ?? null;

    // --- Palette (picked to match your screenshot vibe) ---
    this.COL = {
      fill: 0x0b1630,        // deep navy
      fill2: 0x121c3a,       // slightly lighter navy (inner)
      teal: 0x4fb7c9,        // neon teal
      tealDim: 0x2c6f86,     // dim teal
      orange: 0xff9b6a,      // sunset orange
      orangeDim: 0xb35b3a,   // dim orange
      text: 0xe8f6ff,        // pale cyan-white
      placeholder: 0x7aa9b6, // muted teal
      scan: 0x000000         // scanline color w/ low alpha
    };

    // --- Frame layers (all Phaser shapes, no DOM) ---
    // Outer frame
    this.outer = scene.add.rectangle(0, 0, width, height, this.COL.fill)
      .setOrigin(0.5);

    // Inner bevel
    this.inner = scene.add.rectangle(0, 0, width - 6, height - 6, this.COL.fill2)
      .setOrigin(0.5);

    // Top accent line (orange horizon vibe)
    this.accentTop = scene.add.rectangle(
      0,
      -height / 2 + 3,
      width - 10,
      2,
      this.COL.orange
    ).setOrigin(0.5);

    // Stroke graphics (teal frame + subtle inner stroke)
    this.frameGfx = scene.add.graphics();
    this.drawFrame(false);

    // Scanlines overlay (subtle)
    this.scanGfx = scene.add.graphics();
    this.drawScanlines();

    this.add([this.outer, this.inner, this.accentTop, this.frameGfx, this.scanGfx]);

    // --- Text ---
    this.text = scene.add.bitmapText(
      -width / 2 + 12,
      1, // slight vertical nudge like your UI
      this.fontKey,
      "",
      this.fontSize
    ).setOrigin(0, 0.5);

    // If you want your bitmap font to tint (some do), you can do:
    // this.text.setTint(this.COL.text);

    this.add(this.text);

    // --- Caret ---
    this.caret = scene.add.rectangle(
      this.text.x,
      1,
      2,
      Math.max(10, this.fontSize - 6),
      this.COL.teal
    ).setOrigin(0, 0.5);

    this.add(this.caret);

    // --- Interaction / Focus ---
    this.focused = false;

    this.setSize(width, height);
    this.setInteractive(
      new Phaser.Geom.Rectangle(-width / 2, -height / 2, width * 2, height * 2),
      Phaser.Geom.Rectangle.Contains
    );

    this.on("pointerdown", () => this.focus());

    // Blur when clicking elsewhere
    scene.input.on("pointerdown", (p, objs) => {
      // if click hit *this* container, keep focus
      if (objs && objs.includes(this)) return;
      // also if click hits a child (rare), keep focus
      if (objs && objs.some(o => o && o.parentContainer === this)) return;
      this.blur();
    });

    // Keyboard
    this._keyHandler = (event) => this.handleKey(event);
    scene.input.keyboard.on("keydown", this._keyHandler);

    // Caret blink
    this._blink = scene.time.addEvent({
      delay: 450,
      loop: true,
      callback: () => {
        this.caret.visible = this.focused ? !this.caret.visible : false;
      }
    });

    scene.add.existing(this);
    this.setDepth(1000)
    this.updateText();
  }

  drawFrame(focused) {
    this.frameGfx.clear();

    const w = this.w;
    const h = this.h;

    // Outer teal stroke
    this.frameGfx.lineStyle(2, focused ? this.COL.teal : this.COL.tealDim, 1);
    this.frameGfx.strokeRect(-w / 2 + 1, -h / 2 + 1, w - 2, h - 2);

    // Inner subtle stroke
    this.frameGfx.lineStyle(1, 0x000000, 0.35);
    this.frameGfx.strokeRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8);

    // Tiny orange corner ticks (retro HUD vibe)
    const tick = 10;
    this.frameGfx.lineStyle(2, focused ? this.COL.orange : this.COL.orangeDim, 0.9);

    // TL
    this.frameGfx.beginPath();
    this.frameGfx.moveTo(-w / 2 + 6, -h / 2 + 6);
    this.frameGfx.lineTo(-w / 2 + 6 + tick, -h / 2 + 6);
    this.frameGfx.moveTo(-w / 2 + 6, -h / 2 + 6);
    this.frameGfx.lineTo(-w / 2 + 6, -h / 2 + 6 + tick);
    this.frameGfx.strokePath();

    // BR
    this.frameGfx.beginPath();
    this.frameGfx.moveTo(w / 2 - 6, h / 2 - 6);
    this.frameGfx.lineTo(w / 2 - 6 - tick, h / 2 - 6);
    this.frameGfx.moveTo(w / 2 - 6, h / 2 - 6);
    this.frameGfx.lineTo(w / 2 - 6, h / 2 - 6 - tick);
    this.frameGfx.strokePath();
  }

  drawScanlines() {
    this.scanGfx.clear();
    this.scanGfx.fillStyle(this.COL.scan, 0.08);

    const top = -this.h / 2 + 6;
    const bottom = this.h / 2 - 6;

    // every 4px
    for (let y = top; y < bottom; y += 4) {
      this.scanGfx.fillRect(-this.w / 2 + 6, y, this.w - 12, 1);
    }
  }

  focus() {
    if (this.focused) return;
    this.focused = true;
    this.caret.visible = true;
    this.caret.fillColor = this.COL.teal;
    this.drawFrame(true);
  }

  blur() {
    if (!this.focused) return;
    this.focused = false;
    this.caret.visible = false;
    this.drawFrame(false);
  }

  handleKey(event) {
    if (!this.focused) return;

    if (event.key === "Backspace") {
      this.value = this.value.slice(0, -1);
      this.updateText();
      this.onChange?.(this.value);
      return;
    }

    if (event.key === "Enter") {
      this.onEnter?.(this.value);
      return;
    }

    // Ignore modifier keys
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    // Printable single char
    if (event.key.length === 1) {
      const ch = event.key;

      if (this.allowed && !this.allowed.test(ch)) return;
      if (this.value.length >= this.maxLength) return;

      this.value += ch;
      this.updateText();
      this.onChange?.(this.value);
    }
  }

  updateText() {
    const display = this.value.length > 0 ? this.value : this.placeholder;

    this.text.setText(display);

    // Optional: tint placeholder differently (only works if your bitmap font supports tinting well)
    if (this.value.length === 0 && this.placeholder) {
      this.text.setTint(this.COL.placeholder);
    } else {
      this.text.clearTint();
    }

    // Keep caret at end of actual value (even when showing placeholder)
    const caretBaseText = this.value.length > 0 ? this.text : this.text;
    this.caret.x = this.text.x + Math.max(0, caretBaseText.width) + 2;
  }

  getValue() {
    return this.value;
  }

  setValue(v) {
    this.value = String(v ?? "");
    this.updateText();
    this.onChange?.(this.value);
  }

  destroy(fromScene) {
    scene.input.keyboard.off("keydown", this._keyHandler);
    scene.input.off("pointerdown"); // ok if you don't have many instances; otherwise store handler ref & remove only that
    if (this._blink) this._blink.remove();
    super.destroy(fromScene);
  }
}