import { GAME_WIDTH } from '../config/constants.js';

const VISIBLE_MS = 1800;
const FADE_MS = 400;

export class MessageBanner {
    constructor(scene) {
        this.scene = scene;
        this.text = scene.add
           .text(GAME_WIDTH / 2, 300, '', {
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#fff2cc',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            padding: { x: 10, y: 6 },
            align: 'center',
            wordWrap: { width: 560 },
           })
           .setOrigin(0.5)
           .setDepth(20)
           .setAlpha(0);
    }

    show(message) {
        this.scene.tweens.killTweensOf(this.text);
        this.text.setText(message).setAlpha(1);
        this.scene.tweens.add({
            targets: this.text,
            alpha: 0,
            delay: VISIBLE_MS,
            duration: FADE_MS,
        });
    }
}