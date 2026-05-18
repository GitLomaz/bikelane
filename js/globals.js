const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const DEBUG = false;
const VERSION = "v1.9.0";
const PIXELS_TO_METERS = 1/60;
const LANE_POSITIONS = {
  1: { y: 535, scale: 1, depth: 10 },
  2: { y: 570, scale: 1, depth: 20 },
  3: { y: 600, scale: 1, depth: 30 }
};
let speedMod = 1;
let bikeSpeed = 12;
let distance = 0;
let scene;
let submission = false;
let animal = animals[Phaser.Math.Between(0, 191)].toUpperCase();
let globalStats = null; // Global stats tracker

// Global sound manager
window.soundManager = {
  music: null,
  muted: false,
  
  init: function(scene) {
    // Check localStorage for saved mute state
    const savedMuteState = localStorage.getItem('bikelane_muted');
    this.muted = savedMuteState === 'true';
    
    // Load and play music if not already playing
    if (!this.music && scene.sound) {
      this.music = scene.sound.add('cycle3', { loop: true, volume: 0.5 });
      if (!this.muted) {
        this.music.play();
      }
    }
  },
  
  toggleMute: function() {
    this.muted = !this.muted;
    localStorage.setItem('bikelane_muted', this.muted);
    
    if (this.music) {
      if (this.muted) {
        this.music.pause();
      } else {
        // If music was never played (started muted), play it. Otherwise resume.
        if (!this.music.isPlaying && !this.music.isPaused) {
          this.music.play();
        } else {
          this.music.resume();
        }
      }
    }
  },
  
  isMuted: function() {
    return this.muted;
  }
};