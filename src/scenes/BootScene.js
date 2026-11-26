import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.load.image('background_far', '/assets/background_far.png');
    this.load.image('endothelium', '/assets/endothelium.png');
    this.load.image('vignette', '/assets/vignette.png');
    this.load.image('heart', '/assets/heart.png');
    this.load.image('erythrocyte', '/assets/erythrocyte.png');
    this.load.image('erythrocyte_duck', '/assets/erythrocyte_duck.png');
    this.load.image('oxygen', '/assets/oxygen.png');
    this.load.image('glucose', '/assets/glucose.png');
    this.load.image('atheroma', '/assets/atheroma.png');
    this.load.image('clot', '/assets/clot.png');
    this.load.image('pathogen', '/assets/pathogen.png');
  }

  create() {
    this.scene.start('MenuScene');
  }
}
