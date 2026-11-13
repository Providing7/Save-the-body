import Phaser from 'phaser';
import { GAME_OVER_TIPS, GAME_HEIGHT, GAME_WIDTH } from '../config/constants.js';

const TITLE_BY_CAUSE = {
  hypoxia: 'Hipóxia tecidual',
  obstruction: 'Obstrução vascular',
};

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.distance = data?.distance ?? 0;
    this.score = data?.score ?? 0;
    this.cause = data?.cause ?? 'hypoxia';
    this.restarting = false;
  }

  create() {
    const centerX = GAME_WIDTH / 2;

    this.add
      .text(centerX, 90, TITLE_BY_CAUSE[this.cause], {
        fontFamily: 'monospace',
        fontSize: '36px',
        color: '#f2c7c7',
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, 150, `${this.distance} m · ${this.score} pts`, {
        fontFamily: 'monospace',
        fontSize: '20px',
        color: '#d9a5a5',
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, 230, GAME_OVER_TIPS[this.cause], {
        fontFamily: 'monospace',
        fontSize: '15px',
        color: '#fff2cc',
        align: 'center',
        wordWrap: { width: 560 },
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, GAME_HEIGHT - 80, 'ESPAÇO ou toque para reiniciar', {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: '#f2c7c7',
      })
      .setOrigin(0.5);

    this.input.keyboard.on('keydown-SPACE', this.restart, this);
    this.input.on('pointerdown', this.restart, this);
    this.events.once('shutdown', this.cleanup, this);
  }

  restart() {
    if (this.restarting) {
      return;
    }

    this.restarting = true;
    this.scene.start('GameScene');
  }

  cleanup() {
    this.input.keyboard.off('keydown-SPACE', this.restart, this);
    this.input.off('pointerdown', this.restart, this);
  }
}