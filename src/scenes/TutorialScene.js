import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH, TUTORIAL } from '../config/constants.js';

const BODY_X = 80;
const BODY_WIDTH = GAME_WIDTH - BODY_X * 2;
const SPRITE_Y = 128;
const SPRITE_GAP = 96;
const PAGE_TITLE_Y = 74;
const LINES_Y = 186;
const LINES_GAP = 8;
const NAV_Y = GAME_HEIGHT - 52;
const NAV_OFFSET = 230;
const BUTTON_WIDTH = 150;
const BUTTON_HEIGHT = 40;
const TEXT_COLOR = '#f2c7c7';
const HIGHLIGHT_COLOR = '#fff2cc';
const MUTED_COLOR = '#d9a5a5';
const BUTTON_FILL = 0x5c1a1a;
const BUTTON_HOVER = 0x8a2a2a;
const BUTTON_STROKE = 0xd94f4f;

export class TutorialScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TutorialScene' });
  }

  create() {
    this.pageIndex = 0;
    this.leaving = false;
    this.pageObjects = [];

    this.createBackground();
    this.createHeader();
    this.bindKeys();
    this.renderPage();

    this.events.once('shutdown', this.cleanup, this);
  }

  createBackground() {
    this.add.tileSprite(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      'background_far',
    );
  }

  createHeader() {
    this.add
      .text(GAME_WIDTH / 2, 34, TUTORIAL.TITLE, {
        fontFamily: 'monospace',
        fontSize: '24px',
        color: HIGHLIGHT_COLOR,
      })
      .setOrigin(0.5);
  }

  renderPage() {
    this.clearPage();

    const page = TUTORIAL.PAGES[this.pageIndex];

    this.pageObjects.push(
      this.add
        .text(GAME_WIDTH / 2, PAGE_TITLE_Y, page.title, {
          fontFamily: 'monospace',
          fontSize: '20px',
          color: HIGHLIGHT_COLOR,
        })
        .setOrigin(0.5),
    );

    this.pageObjects.push(
      this.add
        .text(
          GAME_WIDTH - 40,
          34,
          `${this.pageIndex + 1} / ${TUTORIAL.PAGES.length}`,
          {
            fontFamily: 'monospace',
            fontSize: '14px',
            color: MUTED_COLOR,
          },
        )
        .setOrigin(1, 0.5),
    );

    this.renderSprites(page.sprites);
    this.renderLines(page.lines);
    this.renderNavigation();
  }

  renderSprites(sprites = []) {
    if (sprites.length === 0) {
      return;
    }

    const startX = GAME_WIDTH / 2 - ((sprites.length - 1) * SPRITE_GAP) / 2;

    sprites.forEach((key, index) => {
      this.pageObjects.push(
        this.add
          .image(startX + index * SPRITE_GAP, SPRITE_Y, key)
          .setScale(1.3),
      );
    });
  }

  renderLines(lines = []) {
    let y = LINES_Y;

    lines.forEach((line) => {
      const text = this.add.text(BODY_X, y, line, {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: TEXT_COLOR,
        wordWrap: { width: BODY_WIDTH },
      });

      this.pageObjects.push(text);
      y += text.height + LINES_GAP;
    });
  }

  renderNavigation() {
    const isFirst = this.pageIndex === 0;
    const isLast = this.pageIndex === TUTORIAL.PAGES.length - 1;

    this.createButton(
      GAME_WIDTH / 2 - NAV_OFFSET,
      NAV_Y,
      TUTORIAL.PREV,
      () => this.prevPage(),
      isFirst,
    );

    this.createButton(
      GAME_WIDTH / 2,
      NAV_Y,
      TUTORIAL.MENU,
      () => this.goToMenu(),
      false,
    );

    this.createButton(
      GAME_WIDTH / 2 + NAV_OFFSET,
      NAV_Y,
      isLast ? TUTORIAL.PLAY : TUTORIAL.NEXT,
      () => this.nextPage(),
      false,
    );

    this.pageObjects.push(
      this.add
        .text(GAME_WIDTH / 2, GAME_HEIGHT - 18, TUTORIAL.HINT_NAV, {
          fontFamily: 'monospace',
          fontSize: '11px',
          color: MUTED_COLOR,
        })
        .setOrigin(0.5),
    );
  }

  createButton(x, y, label, onClick, disabled) {
    const background = this.add
      .rectangle(
        x,
        y,
        BUTTON_WIDTH,
        BUTTON_HEIGHT,
        BUTTON_FILL,
        disabled ? 0.35 : 0.9,
      )
      .setStrokeStyle(2, BUTTON_STROKE);

    const text = this.add
      .text(x, y, label, {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: HIGHLIGHT_COLOR,
      })
      .setOrigin(0.5)
      .setAlpha(disabled ? 0.4 : 1);

    this.pageObjects.push(background, text);

    if (disabled) {
      return;
    }

    background.setInteractive({ useHandCursor: true });
    background.on('pointerover', () => background.setFillStyle(BUTTON_HOVER, 1));
    background.on('pointerout', () => background.setFillStyle(BUTTON_FILL, 0.9));
    background.on('pointerdown', onClick);
  }

  prevPage() {
    if (this.pageIndex === 0 || this.leaving) {
      return;
    }

    this.pageIndex -= 1;
    this.renderPage();
  }

  nextPage() {
    if (this.leaving) {
      return;
    }

    if (this.pageIndex === TUTORIAL.PAGES.length - 1) {
      this.startGame();
      return;
    }

    this.pageIndex += 1;
    this.renderPage();
  }

  startGame() {
    if (this.leaving) {
      return;
    }

    this.leaving = true;
    this.scene.start('GameScene');
  }

  goToMenu() {
    if (this.leaving) {
      return;
    }

    this.leaving = true;
    this.scene.start('MenuScene');
  }

  bindKeys() {
    this.input.keyboard.on('keydown-LEFT', this.onPrevKey, this);
    this.input.keyboard.on('keydown-RIGHT', this.onNextKey, this);
    this.input.keyboard.on('keydown-SPACE', this.onNextKey, this);
    this.input.keyboard.on('keydown-ESC', this.goToMenu, this);
  }

  onPrevKey(event) {
    if (event.repeat) {
      return;
    }

    this.prevPage();
  }

  onNextKey(event) {
    if (event.repeat) {
      return;
    }

    this.nextPage();
  }

  clearPage() {
    this.pageObjects.forEach((object) => object.destroy());
    this.pageObjects = [];
  }

  cleanup() {
    this.input.keyboard.off('keydown-LEFT', this.onPrevKey, this);
    this.input.keyboard.off('keydown-RIGHT', this.onNextKey, this);
    this.input.keyboard.off('keydown-SPACE', this.onNextKey, this);
    this.input.keyboard.off('keydown-ESC', this.goToMenu, this);
  }
}
