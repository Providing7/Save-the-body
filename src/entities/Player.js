import Phaser from 'phaser';
import { PLAYER } from '../config/constants.js';

export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor( scene, x, y) {
        super(scene, x, y, 'erythrocyte');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5, 1);
        this.setCollideWorldBounds(true);
        this.setSize(PLAYER.BODY_WIDTH, this.height);

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
        this.setTexture(value ? 'erythrocyte_duck' : 'erythrocyte');

        const bodyHeight = value ? PLAYER.DUCK_BODY_HEIGHT : this.height;

        this.body.setSize(PLAYER.BODY_WIDTH, bodyHeight, false);
        this.body.setOffset(
            (this.width - PLAYER.BODY_WIDTH) / 2,
            this.height - bodyHeight,
        );
    }
}
