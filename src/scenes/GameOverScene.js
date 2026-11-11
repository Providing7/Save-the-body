import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.distance = data?.distance ?? 0;
    this.restarting = false;
  }

  create() {
    const centerX = this.scale.width / 2;

    this.add
      .text(centerX, 180, 'Fim de jogo', {
        fontFamily: 'monospace',
        fontSize: '40px',
        color: '#f2c7c7',
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, 240, `Distância: ${this.distance} m`, {
        fontFamily: 'monospace',
        fontSize: '18px',
        color: '#d9a5a5',
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, 320, 'ESPAÇO ou toque para reiniciar', {
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