import Phaser from 'phaser';
import { GAME_WIDTH, OXYGEN } from '../config/constants.js';

const TEXT_STYLE = {
    fontFamily: 'monospace',
    fontSize: '16px',
    color: '#f2c7c7',
};

const BAR_WIDTH = 180;

export class HUD {
    constructor(scene) {
        this.scene = scene;

        this.bpmText = scene.add.text(16, 12, '', TEXT_STYLE).setDepth(10);
        this.oxygenLabel = scene.add
           .text(16, 40, 'Saturação', { ...TEXT_STYLE, fontSize: '12px'})
           .setDepth(10);

        this.barBackground = scene.add
           .rectangle(16, 66, BAR_WIDTH, 14, 0x3a0a0d)
           .setOrigin(0, 0.5)
           .setDepth(10);

        this.barFill = scene.add
           .rectangle(16, 66, BAR_WIDTH, 14, 0xd94f4f)
           .setOrigin(0, 0.5)
           .setDepth(10);
        
        this.scoreText = scene.add
           .text(GAME_WIDTH - 16, 12, '',TEXT_STYLE)
           .setOrigin(1, 0)
           .setDepth(10);

        this.distanceText = scene.add
           .text(GAME_WIDTH - 16, 34, '',TEXT_STYLE)
           .setOrigin(1, 0)
           .setDepth(10);
    }

    update(vitals) {
        const oxygenRatio = Phaser.Math.Clamp(vitals.oxygen / OXYGEN.MAX, 0, 1);

        this.bpmText.setText(`${vitals.bpm} bpm`);
        this.oxygenLabel.setText(`Saturação ${Math.round(vitals.oxygen)}%`);
        this.barFill.setScale(oxygenRatio, 1);
        this.barFill.setFillStyle(oxygenRatio < 0.25 ? 0xff4d4d : 0xd94f4f);

        this.scoreText.setText(`${vitals.score} pts`);
        this.distanceText.setText(`${Math.round(vitals.distance)} m`);
    }
}