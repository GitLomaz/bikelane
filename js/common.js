function setSpeedMod(mod) {
  if (mod === speedMod) {
    return;
  }
  console.log(speedMod)
  speedMod = mod
  const currentFrame = scene.player.sprite.anims.currentFrame.index - 1;
  const sidewalkFrame = scene.bg.sidewalk.anims.currentFrame.index - 1;
  if (speedMod === 1) {
    // scene.player.sprite.anims.play({ key: "bike", frameRate: 15, startFrame: currentFrame})
    bikeSpeed = 12;
    scene.bg.sidewalk.anims.play({ key: "sidewalk", frameRate: 60, startFrame: sidewalkFrame})
  } else if (speedMod > 1) {
    // scene.player.sprite.anims.play({ key: "bike", frameRate: 25, startFrame: currentFrame})
    bikeSpeed = 12 * 1.5;
    scene.bg.sidewalk.anims.play({ key: "sidewalk", frameRate: 60 * 1.5, startFrame: sidewalkFrame})
  } else if (speedMod < 1) {
    // scene.player.sprite.anims.play({ key: "bike", frameRate: 10, startFrame: currentFrame})
    bikeSpeed = 12 * .75;
    scene.bg.sidewalk.anims.play({ key: "sidewalk", frameRate: 60 * .75, startFrame: sidewalkFrame})
  }
}

function playWithChain(sprite, startKey, chainKeys = []) {
  // Don't restart if already playing this start anim
  if (sprite.anims.currentAnim?.key === startKey && sprite.anims.isPlaying) return;

  // Clear any previous queued chain (important when interrupting)
  sprite.anims.chain(); // calling with no args clears the chain queue

  // Play start anim
  sprite.play(startKey);

  // Queue next anim(s)
  if (chainKeys.length) sprite.chain(chainKeys);
}