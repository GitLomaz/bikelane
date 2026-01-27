const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const DEBUG = false;
const LANE_POSITIONS = {
  1: { y: 475, scale: 1 },
  2: { y: 505, scale: 1 },
  3: { y: 600, scale: 1 }
};
let speedMod = 1;
let bikeSpeed = 12;
let distance = 0;
let scene;
let submission = false
