import { BPM, PHYSIO } from '../config/constants.js';

export class PhysioState {
    constructor() {
        this.isExercising = false;
        this.phaseElapsed = 0;
    }

    update(delta) {
        this.phaseElapsed += delta;

        while (this.phaseElapsed >= this.phaseDuration) {
            this.phaseElapsed -= this.phaseDuration;
            this.isExercising = !this.isExercising;
        }
    }

    get phaseDuration() {
        return this.isExercising ? PHYSIO.EXERCISE_MS : PHYSIO.REST_MS;
    }

    get bpm() {
        if (!this.isExercising) {
            return BPM.REST;
        }

        const ramp = Math.min(this.phaseElapsed / PHYSIO.BPM_RAMP_MS, 1);

        return BPM.REST + (BPM.EXERCISE - BPM.REST) * ramp;
    }

    bpmFor(isBoosting) {
        return this.bpm + (isBoosting ? BPM.BOOST_BONUS : 0);
    }

    get speedFactor() {
        return this.isExercising ? PHYSIO.SPEED_FACTOR : 1;
    }

    get oxygenFactor() {
        return this.isExercising ? PHYSIO.OXYGEN_FACTOR : 1;
    }
}