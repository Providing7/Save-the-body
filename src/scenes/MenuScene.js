import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH, MENU } from '../config/constants.js';
import { enterFullscreen } from '../systems/MobileLayout.js';

const TEXT_COLOR = '#f2c7c7';
const HIGHLIGHT_COLOR = '#fff2cc';
const MUTED_COLOR = '#d9a5a5';
const BUTTON_FILL = 0x5c1a1a;
const BUTTON_HOVER = 0x8a2a2a;
const BUTTON_STROKE = 0xd94f4f;
const BUTTON_WIDTH = 220;
const BUTTON_HEIGHT = 44;

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    this.starting = false;

    this.createBackground();
    this.createTitle();

    this.playButton = this.createButton(
      GAME_WIDTH / 2,
      250,
      MENU.PLAY,
      () => this.startGame(),
    );
    this.tutorialButton = this.createButton(
      GAME_WIDTH / 2,
      310,
      MENU.TUTORIAL,
      () => this.openTutorial(),
    );

    this.createHints();
    this.bindKeys();

    this.updateViewport(this.scale.width, this.scale.height);
    this.scale.on('resize', this.onResize, this);
    this.events.once('shutdown', this.cleanup, this);
  }

  createBackground() {
    this.background = this.add.tileSprite(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      this.scale.width,
      this.scale.height,
      'background_far',
    );
  }

  onResize(gameSize) {
    this.updateViewport(gameSize.width, gameSize.height);
  }

  updateViewport(width, height) {
    this.cameras.main.centerOn(GAME_WIDTH / 2, GAME_HEIGHT / 2);
    this.background?.setSize(width, height);
   }

  createTitle() {
    const centerX = GAME_WIDTH / 2;

    this.add
      .text(centerX, 92, MENU.TITLE, {
        fontFamily: 'monospace',
        fontSize: '48px',
        color: HIGHLIGHT_COLOR,
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, 142, MENU.SUBTITLE, {
        fontFamily: 'monospace',
        fontSize: '20px',
        color: TEXT_COLOR,
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, 176, MENU.TAGLINE, {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: MUTED_COLOR,
        align: 'center',
        wordWrap: { width: 600 },
      })
      .setOrigin(0.5);
  }

  createButton(x, y, label, onClick) {
    const background = this.add
      .rectangle(x, y, BUTTON_WIDTH, BUTTON_HEIGHT, BUTTON_FILL, 0.9)
      .setStrokeStyle(2, BUTTON_STROKE)
      .setInteractive({ useHandCursor: true });

    this.add
      .text(x, y, label, {
        fontFamily: 'monospace',
        fontSize: '18px',
        color: HIGHLIGHT_COLOR,
      })
      .setOrigin(0.5);

    background.on('pointerover', () => background.setFillStyle(BUTTON_HOVER, 1));
    background.on('pointerout', () => background.setFillStyle(BUTTON_FILL, 0.9));
    background.on('pointerdown', onClick);

    return background;
  }

  createHints() {
    const centerX = GAME_WIDTH / 2;
    const controls = this.sys.game.device.input.touch
      ? MENU.CONTROLS_TOUCH
      : MENU.CONTROLS;

    this.add
      .text(centerX, GAME_HEIGHT - 60, controls, {
        fontFamily: 'monospace',
        fontSize: '13px',
        color: TEXT_COLOR,
        align: 'center',
        wordWrap: { width: 720 },
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, GAME_HEIGHT - 30, MENU.FOOTER, {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: MUTED_COLOR,
      })
      .setOrigin(0.5);
  }

  bindKeys() {
    this.input.keyboard.on('keydown-ENTER', this.startGame, this);
    this.input.keyboard.on('keydown-SPACE', this.startGame, this);
    this.input.keyboard.on('keydown-T', this.openTutorial, this);
  }

  startGame() {
    if (this.starting) {
      return;
    }

    this.starting = true;

    if(this.sys.game.device.input.touch) {
      enterFullscreen();
    }
    
    this.scene.start('GameScene');
  }

  openTutorial() {
    if (this.starting) {
      return;
    }

    this.starting = true;
    this.scene.start('TutorialScene');
  }

  cleanup() {
   this.scale.off('resize', this.onResize, this);
   this.input.keyboard.off('keydown-ENTER', this.startGame, this);
   this.input.keyboard.off('keydown-SPACE', this.startGame, this);
   this.input.keyboard.off('keydown-T', this.openTutorial, this);
  }
}
