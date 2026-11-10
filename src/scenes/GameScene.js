import Phaser from 'phaser';

const SCROLL_SPEED = 120;

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.scrollSpeed = SCROLL_SPEED;
  }

  create() {
    this.vesselBackground = this.add.tileSprite(400, 225, 800, 450, 'vessel_wall');
    this.floor = this.add.tileSprite(400, 430, 800, 40, 'endothelium');

    this.add
      .text(12, 12, 'M0 · vaso sanguíneo rolando', {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#f2c7c7',
      })
      .setAlpha(0.7);
  }

  update(_time, delta) {
    const dx = (this.scrollSpeed * delta) / 1000;

    this.vesselBackground.tilePositionX += dx;
    this.floor.tilePositionX += dx;
  }
}