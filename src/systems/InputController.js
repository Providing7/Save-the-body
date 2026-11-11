export class InputController {
  constructor(scene) {
    this.scene = scene;
    this.jumpRequested = false;

    this.keys = scene.input.keyboard.addKeys('UP,DOWN,SPACE');

    this.onJump = () => {
      this.jumpRequested = true;
    };

    scene.input.keyboard.on('keydown-UP', this.onJump);
    scene.input.keyboard.on('keydown-SPACE', this.onJump);
    scene.input.on('pointerdown', this.onJump);

    scene.events.once('shutdown', this.destroy, this);
  }

  get duckHeld() {
    return this.keys.DOWN.isDown;
  }

  consumeJump() {
    if (!this.jumpRequested) {
      return false;
    }

    this.jumpRequested = false;
    return true;
  }

  destroy() {
    this.scene.input.keyboard.off('keydown-UP', this.onJump);
    this.scene.input.keyboard.off('keydown-SPACE', this.onJump);
    this.scene.input.off('pointerdown', this.onJump);
  }
}