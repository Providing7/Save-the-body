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
    this.createOxygenTexture();
    this.createGlucoseTexture();
    this.createAtheromaTexture();
    this.createClotTexture();
    this.createLeucocyteTexture();

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

  createOxygenTexture() {
    const g = this.make.graphics({ add: false });

    g.fillStyle(0x4fd0e0, 1);
    g.fillCircle(14, 14, 11);
    g.lineStyle(2, 0xeafcff, 1);
    g.strokeCircle(14, 14, 11);
    g.fillStyle(0xffffff, 0.55);
    g.fillCircle(10, 10, 3);

    g.generateTexture('oxygen', 28, 28);
    g.destroy();
  }

  createGlucoseTexture() {
    const g = this.make.graphics({ add: false });
    const points = [];

    for (let i = 0; i < 6; i += 1) {
      const angle = Phaser.Math.DegToRad(60 * i - 30);
      points.push({ x: 14 + 12 * Math.cos(angle), y: 14 + 12 * Math.sin(angle) });
    }

    g.fillStyle(0x3ecf6a, 1);
    g.fillPoints(points, true);
    g.lineStyle(2, 0xd6ffe2, 1);
    g.strokePoints(points, true);

    g.generateTexture('glucose', 28, 28);
    g.destroy();
  }

  createAtheromaTexture() {
    const g = this.make.graphics({ add: false });

    g.fillStyle(0xd9a327, 1);
    g.fillEllipse(18, 26, 34, 24);
    g.fillEllipse(38, 28, 30, 20);

    g.fillStyle(0xf2c94c, 1);
    g.fillEllipse(26, 22, 22, 14);

    g.lineStyle(2, 0x8a5a12, 1);
    g.strokeEllipse(18, 26, 34, 24);

    g.generateTexture('atheroma', 56, 40);
    g.destroy();
  }

  createClotTexture() {
    const g = this.make.graphics({ add: false });

    g.fillStyle(0x7a1f4f, 1);
    for (let i = 0; i < 8; i += 1) {
      const angle = Phaser.Math.DegToRad(45 * i);
      g.fillTriangle(
        24 + Math.cos(angle - 0.25) * 14,
        30 + Math.sin(angle - 0.25) * 18,
        24 + Math.cos(angle + 0.25) * 14,
        30 + Math.sin(angle + 0.25) * 18,
        24 + Math.cos(angle) * 20,
        30 + Math.sin(angle) * 26,
      );
    }

    g.fillStyle(0x8e2a63, 1);
    g.fillCircle(24, 30, 17);
    g.lineStyle(2, 0xd98bb8, 1);
    g.strokeCircle(24, 30, 17);

    g.generateTexture('clot', 48, 60);
    g.destroy();
  }

  createLeucocyteTexture() {
    const g = this.make.graphics({ add: false });

    g.fillStyle(0xe6d9f2, 1);
    g.fillCircle(22, 20, 18);
    g.fillStyle(0x8e6bb5, 1);
    g.fillCircle(22, 20, 9);
    g.lineStyle(2, 0xb9a3d6, 1);
    g.strokeCircle(22, 20, 18);

    g.generateTexture('leucocyte', 44, 40);
    g.destroy();
  }
}