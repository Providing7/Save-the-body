export class InputController {
  constructor(scene) {
    this.scene = scene;
    this.jumpRequested = false;
    this.touchDuck = false;
    this.duckPointerId = null;
    this.isTouch = scene.sys.game.device.input.touch;

    this.keys = scene.input.keyboard.addKeys('UP,DOWN,SPACE');

    this.onJumpKey = () => {
      this.jumpRequested = true;
    };

    this.onPointerDown = (pointer) => {
      // Só divide a tela em zonas quando o toque vem do dedo.
      // Mouse (inclusive em notebook com tela touch) continua pulando em qualquer lugar.
      if (this.isTouch && pointer.wasTouch && pointer.x < this.scene.scale.width / 2) {
        this.touchDuck = true;
        this.duckPointerId = pointer.id;
        return;
      }

      this.jumpRequested = true;
    };

    this.onPointerUp = (pointer) => {
      if (pointer.id === this.duckPointerId) {
        this.resetDuck();
      }
    };

    this.resetDuck = () => {
      this.touchDuck = false;
      this.duckPointerId = null;
    };

    scene.input.keyboard.on('keydown-UP', this.onJumpKey);
    scene.input.keyboard.on('keydown-SPACE', this.onJumpKey);
    scene.input.on('pointerdown', this.onPointerDown);
    scene.input.on('pointerup', this.onPointerUp);
    scene.input.on('pointerupoutside', this.onPointerUp);
    scene.game.events.on('blur', this.resetDuck);

    scene.events.once('shutdown', this.destroy, this);
  }

  get duckHeld() {
    return this.keys.DOWN.isDown || this.touchDuck;
  }

  consumeJump() {
    if (!this.jumpRequested) {
      return false;
    }

    this.jumpRequested = false;
    return true;
  }

  destroy() {
    this.scene.input.keyboard.off('keydown-UP', this.onJumpKey);
    this.scene.input.keyboard.off('keydown-SPACE', this.onJumpKey);
    this.scene.input.off('pointerdown', this.onPointerDown);
    this.scene.input.off('pointerup', this.onPointerUp);
    this.scene.input.off('pointerupoutside', this.onPointerUp);
    this.scene.game.events.off('blur', this.resetDuck);
  }
}