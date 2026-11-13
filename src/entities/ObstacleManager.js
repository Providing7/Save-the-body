import Phaser from 'phaser';
import { GAME_WIDTH, OBSTACLES, OBSTACLE_SPAWN, SPAWN } from '../config/constants.js';

export class ObstacleManager {
    constructor(scene) {
        this.scene = scene;
        this.group = scene.physics.add.group({ allowGravity: false});
        this.elapsed = 0;
        this.nextSpawn = SPAWN.OBSTACLE_START_MS;
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
            SPAWN.OBSTACLE_START_MS,
            SPAWN.OBSTACLE_MIN_MS,
            progress,
        );
    }

    spawn() {
        const kind = this.pickKind();
        const spec = OBSTACLES[kind];

        const obstacle = this.group.create(GAME_WIDTH + 60, spec.y, spec.key);
        obstacle.setData('kind', kind);
        obstacle.setDepth(5);
    }

    pickKind() {
        const roll = Math.random();

        if (roll < OBSTACLE_SPAWN.CLOT_CHANCE) {
            return 'clot';
        }

        if (roll < OBSTACLE_SPAWN.CLOT_CHANCE + OBSTACLE_SPAWN.LEUCOCYTE_CHANCE) {
            return 'leucocyte';
        }

        return 'atheroma';
    }

    moveAll(speed) {
        this.group.getChildren().forEach((item) => {
            item.setVelocityX(-speed);
        });
    }

    destroyOffscreen() {
        const children = this.group.getChildren();

        for (let i = children.length - 1; i >= 0; i -= 1) {
            if (children[i].x < -80) {
                children[i].destroy();
            }
        }
    }
}