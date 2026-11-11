import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../config/constants.js';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    this.createVesselWallTexture();
    this.createEndotheliumTexture();
    this.createErythrocyteTexture();

    this.scene.start('GameScene');
  }

  createVesselWallTexture() {
    const g = this.make.graphics({ add: false });

    g.fillGradientStyle(0x6b1218, 0x6b1218, 0x2b0507, 0x2b0507, 1);
    g.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    g.fillStyle(0xffffff, 0.04);
    for (let y = 20; y < GAME_HEIGHT; y += 40) {
      g.fillRect(0, y, GAME_WIDTH, 8);
    }

    g.generateTexture('vessel_wall', GAME_WIDTH, GAME_HEIGHT);
    g.destroy();
  }

  createEndotheliumTexture() {
    const g = this.make.graphics({ add: false });

    g.fillStyle(0x7d2b2b, 1);
    g.fillRect(0, 0, 128, 40);

    for (let i = 0; i < 4; i += 1) {
      g.fillStyle(0xa14b4b, 1);
      g.fillRoundedRect(i * 32 + 2, 6, 28, 28, 6);
      g.lineStyle(2, 0x5c1a1a, 1);
      g.strokeRoundedRect(i * 32 + 2, 6, 28, 28, 6);
    }

    g.generateTexture('endothelium', 128, 40);
    g.destroy();
  }

  createErythrocyteTexture() {
    const g = this.make.graphics({ add: false });

    g.fillStyle(0xd94f4f, 1);
    g.fillCircle(24, 24, 22);

    g.fillStyle(0xb03a3a, 1);
    g.fillCircle(24, 24, 11);

    g.lineStyle(2, 0x7a1f1f, 1);
    g.strokeCircle(24, 24, 22);

    g.generateTexture('erythrocyte', 48, 48);
    g.destroy();
  }
}