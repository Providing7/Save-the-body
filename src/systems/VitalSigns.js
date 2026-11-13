import { BPM, DAMAGE, OXYGEN, PIXEL_PER_METER } from '../config/constants.js';

export class VitalSigns {
  constructor() {
    this.oxygen = OXYGEN.MAX;
    this.damage = 0;
    this.distance = 0;
    this.score = 0;
    this.bpm = BPM.REST;
  }

  update(delta, speed, isBoosting) {
    const seconds = delta / 1000;

    this.oxygen = Math.max(0, this.oxygen - OXYGEN.DRAIN_PER_SECOND * seconds);
    this.distance += (speed * seconds) / PIXEL_PER_METER;
    this.bpm = isBoosting ? BPM.EXERCISE : BPM.REST;
  }

  addOxygen(value) {
    this.oxygen = Math.min(OXYGEN.MAX, this.oxygen + value);
  }

  addScore(value) {
    this.score += value;
  }

  applyDamage(value) {
    this.damage += value;
  }

  isHypoxic() {
    return this.oxygen <= 0;
  }

  isObstructed() {
    return this.damage >= DAMAGE.MAX;
  }

  isDead() {
    return this.isHypoxic() || this.isObstructed();
  }

  causeOfDeath() {
    return this.isHypoxic() ? 'hypoxia' : 'obstruction';
  }
}