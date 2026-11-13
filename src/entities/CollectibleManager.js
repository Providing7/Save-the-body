import Phaser from 'phaser';
import { GAME_WIDTH, ITEM_SPAWN, SPAWN } from '../config/constants.js';

export class CollectibleManager {
    constructor(scene) {
        this.scene = scene;
        this.group = scene.physics.add.group({ allowGravity: false});
        this.elapsed = 0;
        this.nextSpawn = SPAWN.COLLECTIBLE_START_MS;
    }

    update(delta, speed, distance) {
        this.elapsed += delta;

        if (this.elapsed >= this.nextSpawn) {
            this.elapsed = 0;
            this.nextSpawn = this.intervalFor(distance);
            this.spawn();
        }

        this.moveAll(speed);
        this.destroyOffscreen();
    }

    intervalFor(distance) {
        const progress = Phaser.Math.Clamp(distance / SPAWN.RAMP_DISTANCE, 0, 1);

        return Phaser.Math.Linear(
            SPAWN.COLLECTIBLE_START_MS,
            SPAWN.COLLECTIBLE_MIN_MS,
            progress,
        );
    }

    spawn() {
        const isOxygen = Math.random() < ITEM_SPAWN.OXYGEN_CHANCE;
        const type = isOxygen ? 'oxygen' : 'glucose';
        const y = Phaser.Math.Between(320, 385);

        const item = this.group.create(GAME_WIDTH + 40, y, type);
        item.setData('type', type);
        item.setDepth(6);
    }

    moveAll(speed) {
        this.group.getChildren().forEach((item) => {
            item.setVelocityX(-speed);
        });
    }

    destroyOffscreen() {
        const children = this.group.getChildren();

        for (let i = children.length - 1; i >= 0; i -= 1) {
            if (children[i].x < -60) {
                children[i].destroy();
            }
        }
    }
}