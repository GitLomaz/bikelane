const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const DEBUG = false;
const LANE_POSITIONS = {
  1: { y: 475, scale: .65 },
  2: { y: 505, scale: .75 },
  3: { y: 520, scale: .8 }
};
let speedMod = 1;
let bikeSpeed = 12;
let scene;

