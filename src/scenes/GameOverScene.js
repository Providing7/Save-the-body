import { enterFullscreen } from '../systems/MobileLayout.js'
import Phaser from 'phaser';
import {
  GAME_HEIGHT,
  GAME_OVER,
  GAME_OVER_TIPS,
  GAME_WIDTH,
} from '../config/constants.js';

const TITLE_BY_CAUSE = {
  hypoxia: 'Hipóxia tecidual',
  obstruction: 'Obstrução vascular',
};

const TEXT_COLOR = '#f2c7c7';
const HIGHLIGHT_COLOR = '#fff2cc';
const MUTED_COLOR = '#d9a5a5';
const BUTTON_FILL = 0x5c1a1a;
const BUTTON_HOVER = 0x8a2a2a;
const BUTTON_STROKE = 0xd94f4f;

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.distance = data?.distance ?? 0;
    this.score = data?.score ?? 0;
    this.cause = data?.cause ?? 'hypoxia';
    this.restarting = false;
    this.leaving = false;
  }

  create() {
    const centerX = GAME_WIDTH / 2;

    this.inputReadyAt = this.time.now + GAME_OVER.INPUT_GUARD_MS;

    this.add
      .text(centerX, 90, TITLE_BY_CAUSE[this.cause], {
        fontFamily: 'monospace',
        fontSize: '36px',
        color: TEXT_COLOR,
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, 150, `${this.distance} m · ${this.score} pts`, {
        fontFamily: 'monospace',
        fontSize: '20px',
        color: MUTED_COLOR,
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, 230, GAME_OVER_TIPS[this.cause], {
        fontFamily: 'monospace',
        fontSize: '15px',
        color: HIGHLIGHT_COLOR,
        align: 'center',
        wordWrap: { width: 560 },
      })
      .setOrigin(0.5);

    const offset = GAME_OVER.BUTTON_WIDTH / 2 + GAME_OVER.BUTTON_GAP / 2;

    this.createButton(
      centerX - offset,
      GAME_OVER.BUTTON_Y,
      GAME_OVER.RESTART,
      () => this.restart(),
    );

    this.createButton(
      centerX + offset,
      GAME_OVER.BUTTON_Y,
      GAME_OVER.MENU,
      () => this.goToMenu(),
    );

    if (!this.sys.game.device.input.touch) {
      this.add
        .text(
          centerX,
          GAME_HEIGHT - 50,
          'ESPAÇO reinicia · M abre o menu',
          {
            fontFamily: 'monospace',
            fontSize: '14px',
            color: MUTED_COLOR,
          },
        )
        .setOrigin(0.5);
    }

    this.input.keyboard.on('keydown-SPACE', this.restart, this);
    this.input.keyboard.on('keydown-M', this.goToMenu, this);
    this.events.once('shutdown', this.cleanup, this);
    this.updateViewport();
    this.scale.on('resize', this.updateViewport, this);
  }

  updateViewport() {
    this.cameras.main.centerOn(GAME_WIDTH / 2, GAME_HEIGHT / 2);
  }

  createButton(x, y, label, onClick) {
    const background = this.add
      .rectangle(
        x,
        y,
        GAME_OVER.BUTTON_WIDTH,
        GAME_OVER.BUTTON_HEIGHT,
        BUTTON_FILL,
        0.9,
      )
      .setStrokeStyle(2, BUTTON_STROKE)
      .setInteractive({ useHandCursor: true });

    this.add
      .text(x, y, label, {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: HIGHLIGHT_COLOR,
      })
      .setOrigin(0.5);

    background.on('pointerover', () =>
      background.setFillStyle(BUTTON_HOVER, 1),
    );
    background.on('pointerout', () =>
      background.setFillStyle(BUTTON_FILL, 0.9),
    );
    background.on('pointerdown', onClick);
  }

  restart() {
    if (this.time.now < this.inputReadyAt || this.restarting || this.leaving) {
      return;
    }

    this.restarting = true;

    if(this.sys.game.device.input.touch) {
      enterFullscreen();
    }

    this.scene.start('GameScene');
  }

  goToMenu() {
    if (this.time.now < this.inputReadyAt || this.restarting || this.leaving) {
      return;
    }

    this.leaving = true;
    this.scene.start('MenuScene');
  }

  cleanup() {
    this.scale.off('resize', this.updateViewport, this);
    this.input.keyboard.off('keydown-SPACE', this.restart, this);
    this.input.keyboard.off('keydown-M', this.goToMenu, this);
  }
}