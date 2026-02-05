const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const DEBUG = false;
const LANE_POSITIONS = {
  1: { y: 535, scale: 1, depth: 10 },
  2: { y: 570, scale: 1, depth: 20 },
  3: { y: 600, scale: 1, depth: 30 }
};
let speedMod = 1;
let bikeSpeed = 12;
let distance = 0;
let scene;
let submission = false
let animal = animals[Phaser.Math.Between(0, 191)].toUpperCase();