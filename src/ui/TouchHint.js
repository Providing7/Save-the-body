import { TOUCH } from '../config/constants.js';

const FADE_MS = 600;
const TEXT_STYLE = {
  fontFamily: 'monospace',
  fontSize: '14px',
  color: '#fff2cc',
  align: 'center',
};

export class TouchHint {
  constructor(scene) {
    this.scene = scene;
    this.objects = [];
    this.timer = null;

    if (
      !scene.sys.game.device.input.touch ||
      scene.registry.get('touchHintShown')
    ) {
      return;
    }

    scene.registry.set('touchHintShown', true);
    this.build();

    this.timer = scene.time.delayedCall(
      TOUCH.HINT_MS,
      this.fadeOut,
      undefined,
      this,
    );
    scene.events.once('shutdown', this.destroy, this);
  }

  build() {
    const width = this.scene.scale.width;
    const height = this.scene.scale.height;
    const half = width / 2;

    this.objects.push(
      this.scene.add
        .rectangle(half / 2, height / 2, half, height, 0x000000, 0.28)
        .setDepth(TOUCH.HINT_DEPTH),
      this.scene.add
        .rectangle(
          half + half / 2,
          height / 2,
          half,
          height,
          0x000000,
          0.12,
        )
        .setDepth(TOUCH.HINT_DEPTH),
      this.scene.add
        .text(half / 2, height - 110, '▼\nsegure para abaixar', TEXT_STYLE)
        .setOrigin(0.5)
        .setDepth(TOUCH.HINT_DEPTH + 1),
      this.scene.add
        .text(
          half + half / 2,
          height - 110,
          '▲\ntoque para pular',
          TEXT_STYLE,
        )
        .setOrigin(0.5)
        .setDepth(TOUCH.HINT_DEPTH + 1),
    );
  }

  fadeOut() {
    this.scene.tweens.add({
      targets: this.objects,
      alpha: 0,
      duration: FADE_MS,
      onComplete: () => this.destroy(),
    });
  }

  destroy() {
    if (this.timer) {
      this.timer.remove(false);
      this.timer = null;
    }

    this.scene.tweens.killTweensOf(this.objects);
    this.objects.forEach((object) => object.destroy());
    this.objects = [];
    this.scene.events.off('shutdown', this.destroy, this);
  }
}
