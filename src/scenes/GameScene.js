import Phaser from 'phaser';
import {
  COLLISION_MESSAGES,
  GAME_HEIGHT,
  GAME_WIDTH,
  GLUCOSE_BOOST,
  GROUND_HEIGHT,
  GROUND_TOP,
  HIT_INVULNERABILITY_MS,
  OBSTACLES,
  OXYGEN,
  PLAYER,
  SCORE,
  SCROLL_SPEED,
} from '../config/constants.js';
import { CollectibleManager } from '../entities/CollectibleManager.js';
import { ObstacleManager } from '../entities/ObstacleManager.js';
import { Player } from '../entities/Player.js';
import { VitalSigns } from '../systems/VitalSigns.js';
import { InputController } from '../systems/InputController.js';
import { HUD } from '../ui/HUD.js';
import { MessageBanner } from '../ui/MessageBanner.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.finished = false;
    this.boostUntil = 0;
    this.invulnerableUntil = 0;
    this.vitals = new VitalSigns();

    this.createBackground();
    this.createGround();

    this.player = new Player(this, PLAYER.START_X, GROUND_TOP);
    this.physics.add.collider(this.player, this.groundBody);

    this.collectibles = new CollectibleManager(this);
    this.obstacles = new ObstacleManager(this);
    this.physics.add.overlap(
      this.player,
      this.collectibles.group,
      this.onCollect,
      undefined,
      this,
    );
    this.physics.add.overlap(
      this.player,
      this.obstacles.group,
      this.onHit,
      undefined,
      this,
    );

    this.hud = new HUD(this);
    this.banner = new MessageBanner(this);
    this.inputs = new InputController(this);

    this.hud.update(this.vitals);
  }

  get isBoosting() {
    return this.time.now < this.boostUntil;
  }

  get currentSpeed() {
    return SCROLL_SPEED * (this.isBoosting ? GLUCOSE_BOOST.SPEED_FACTOR : 1);
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
    const speed = this.currentSpeed;

    this.scroll(delta, speed);
    this.vitals.update(delta, speed, this.isBoosting);

    this.collectibles.update(delta, speed, this.vitals.distance);
    this.obstacles.update(delta, speed, this.vitals.distance);
    this.hud.update(this.vitals);

    this.player.setDucking(this.inputs.duckHeld);

    if (this.inputs.consumeJump()) {
      this.player.jump();
    }

    if (this.vitals.isDead()) {
      this.finish();
    }
  }

  scroll(delta, speed) {
    const dx = (speed * delta) / 1000;

    this.vesselBackground.tilePositionX += dx;
    this.floor.tilePositionX += dx;
  }

  onCollect(_player, item) {
    const type = item.getData('type');

    if (type === 'oxygen') {
      this.vitals.addOxygen(OXYGEN.PICKUP_VALUE);
      this.vitals.addScore(SCORE.OXYGEN);
    } else {
      this.vitals.addScore(SCORE.GLUCOSE);
      this.startBoost();
    }

    item.destroy();
  }

  onHit(_player, obstacle) {
    if (this.time.now < this.invulnerableUntil) {
      return;
    }

    this.invulnerableUntil = this.time.now + HIT_INVULNERABILITY_MS;

    const kind = obstacle.getData('kind');
    const spec = OBSTACLES[kind];

    this.vitals.applyDamage(spec.damage);
    this.banner.show(COLLISION_MESSAGES[kind]);
    this.flashPlayer();

    obstacle.destroy();
  }

  flashPlayer() {
    this.player.setAlpha(0.35);
    this.time.delayedCall(200, () => {
      if (this.player.active) {
        this.player.setAlpha(1);
      }
    });
  }

  startBoost() {
    this.boostUntil = this.time.now + GLUCOSE_BOOST.DURATION_MS;
  }

  finish() {
    if (this.finished) {
      return;
    }

    this.finished = true;
    this.scene.start('GameOverScene', {
      distance: Math.round(this.vitals.distance),
      score: this.vitals.score,
      cause: this.vitals.causeOfDeath(),
    });
  }
}