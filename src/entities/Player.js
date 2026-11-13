import Phaser from 'phaser';
import { PLAYER } from '../config/constants.js';

export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor( scene, x, y) {
        super(scene, x, y, 'erythrocyte');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5, 1);
        this.setCollideWorldBounds(true);

        this.isDucking = false;
    }

    jump() {
        if (!this.body.blocked.down) {
            return false;
        }

        this.setVelocityY(PLAYER.JUMP_VELOCITY);
        return true;
    }

    setDucking(value) {
        if (value === this.isDucking) {
            return;
        }

        this.isDucking = value;
        this.setScale(1, value ? PLAYER.DUCK_SCALE_Y : 1);
    }
}
