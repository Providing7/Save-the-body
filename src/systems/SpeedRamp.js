import { SPEED } from '../config/constants.js';

export function speedFor(distance) {
    const progress = Math.min(distance / SPEED.RAMP_DISTANCE, 1);

    return SPEED.BASE + (SPEED.MAX - SPEED.BASE) * progress;
}