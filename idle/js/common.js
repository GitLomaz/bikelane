function setSpeedMod(mod) {
  console.log(speedMod)
  if (mod === speedMod) {
    return;
  }
  speedMod = mod
  const currentFrame = scene.player.sprite.anims.currentFrame.index - 1;
  if (speedMod === 1) {
    scene.player.sprite.anims.play({ key: "bike", frameRate: 15, startFrame: currentFrame})
  } else if (speedMod > 1) {
    scene.player.sprite.anims.play({ key: "bike", frameRate: 25, startFrame: currentFrame})
  } else if (speedMod < 1) {
    scene.player.sprite.anims.play({ key: "bike", frameRate: 10, startFrame: currentFrame})
  }
  // scene.enemies.forEach(e => {
  //   if (speedMod === 1) {
  //     e.speed = e.baseSpeed
  //     scene.bg.sidewalk
  //   } else if (speedMod === 1.7) {
  //     if (e.scaleX > 0) { // Moving Forward
  //       e.speed = e.speed + 2
  //     } else {
  //       e.speed = e.speed - 1
  //     }
  //   } else if (speedMod === .3) {
  //     if (e.scaleX > 0) { // Moving Forward
  //       e.speed = e.speed - 1
  //     } else {
  //       e.speed = e.speed + 2
  //     }
  //   }
  // });
}