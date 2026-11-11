import Phaser from 'phaser';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  GROUND_HEIGHT,
  GROUND_TOP,
  PLAYER,
  SCROLL_SPEED,
} from '../config/constants.js';
import { Player } from '../entities/Player.js';
import { InputController } from '../systems/InputController.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.scrollSpeed = SCROLL_SPEED;
  }

  create() {
    this.createBackground();
    this.createGround();

    this.player = new Player(this, PLAYER.START_X, GROUND_TOP);
    this.physics.add.collider(this.player, this.groundBody);

    this.inputs = new InputController(this);

    this.input.keyboard.on('keydown-G', this.finish, this);
    this.events.once('shutdown', () => {
      this.input.keyboard.off('keydown-G', this.finish, this);
    });
  }

  createBackground() {
    this.vesselBackground = this.add.tileSprite(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      'vessel_wall',
    );
    
    this.floor = this.add.tileSprite(
      GAME_WIDTH / 2,
      GROUND_TOP + GROUND_HEIGHT / 2,
      GAME_WIDTH,
      GROUND_HEIGHT,
      'endothelium',
    );
  }

  createGround() {
    const groundCenterY = GROUND_TOP + GROUND_HEIGHT / 2;

    this.groundBody = this.add.rectangle(
      GAME_WIDTH / 2,
      groundCenterY,
      GAME_WIDTH,
      GROUND_HEIGHT,
      0x000000,
      0,
    );
    this.physics.add.existing(this.groundBody, true);
  }

  update(_time, delta) {
    this.scroll(delta);

    this.player.setDucking(this.inputs.duckHeld);

    if (this.inputs.consumeJump()) {
      this.player.jump();
    }
  }

  scroll(delta) {
    const dx = (this.scrollSpeed * delta) / 1000;

    this.vesselBackground.tilePositionX += dx;
    this.floor.tilePositionX += dx;
  }

  finish() {
    this.scene.start('GameOverScene', { distance: 0 });
  }
}