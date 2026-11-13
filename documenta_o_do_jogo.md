# Documento de Requisitos e Arquitetura (PRD)

## 1. Visão Geral do Projeto

* **Nome do Projeto:** CardioRunner (Nome Provisório)
* **Gênero:** Infinite Runner 2D Educativo
* **Público-Alvo:** Estudantes Universitários (Fisiologia / Saúde / Biologia)
* **Objetivo Pedagógico:** Ensinar conceitos de dinâmica do fluxo sanguíneo, resistência vascular periférica, trocas gasosas capilares e débito cardíaco durante o esforço através de mecânicas lúdicas e responsivas.

---

## 2. Stack Tecnológica e Ferramentas

* **Game Engine / Framework:** Phaser 3 (HTML5 / JavaScript ou TypeScript)
* **Linguagem:** JavaScript (ES6+) ou TypeScript
* **Estilização e UI Externa:** HTML5 / CSS3 (overlay de HUD e modais educativos)
* **Bundler / Dev Server:** Vite (recomendado para inicialização rápida)
* **Orquestração de Desenvolvimento:** OpenCode + GitNexus + ECC

---

## 3. Conceito do Jogo e Mecânicas Core

### 3.1 Loop Principal de Gameplay (Core Loop)
1. O jogador controla uma **hemácia (Glóbulo Vermelho)** navegando por vasos sanguíneos.
2. O cenário de fundo se move continuamente para a esquerda (efeito Parallax).
3. O jogador deve pular/abaixar para se desviar de obstáculos (Ateromas, Coágulos, Leucócitos em excesso).
4. O jogador deve coletar oxigênio ($O_2$) e Nutrientes para manter a saturação/energia em níveis adequados.
5. A cada ciclo de tempo, ocorre uma mudança de estado fisiológico (ex: "Exercício Físico" aumenta a velocidade do jogo e a exigência de oxigênio).
6. O jogo encerra quando a saturação atinge zero (Hipóxia Tecidual) ou quando o jogador colide repetidamente com placas arteriais gravemente restritivas.

### 3.2 Elementos de Jogo e Mapeamento Fisiológico

| Elemento do Jogo | Representação Fisiológica | Comportamento no Jogo |
| :--- | :--- | :--- |
| **Player (Hemácia)** | Eritrócito / Transporte de Gases | Possui física de pulo, abaixar e barra de saturação de $O_2$. |
| **Item $O_2$** | Oxigênio Alveolar / Capilar | Incrementa a barra de saturação e gera pontuação. |
| **Item Glicose** | Nutriente Metabólico | Fornece impulso temporário ou bônus de energia. |
| **Ateroma (Obstáculo)** | Placa de Gordura / Arteriosclerose | Diminui a velocidade do jogador e reduz a vida útil do vaso. |
| **Coágulo (Obstáculo)** | Trombose / Obstrução Vascular | Exige pulo perfeito; causa grande dano se atingido. |
| **Modo Exercício** | Aumento do Débito Cardíaco | Aumenta o ritmo dos batimentos (BPM) e a velocidade do scroll. |

---

## 4. Arquitetura do Sistema e Estrutura de Pastas

```text
cardio-runner/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.js                 # Boot e inicialização do Phaser.Game
    ├── config/
    │   └── gameConfig.js       # Resoluções, físicas (Arcade) e fontes
    ├── scenes/
    │   ├── BootScene.js        # Preload de assets
    │   ├── MenuScene.js        # Tela inicial do jogo
    │   ├── GameScene.js        # Cena principal com o loop de jogo
    │   └── GameOverScene.js    # Tela de pontuação e dicas educativas
    ├── entities/
    │   ├── Player.js           # Classe da Hemácia (movimentos e física)
    │   ├── ObstacleManager.js  # Gerenciador e spawner procedural
    │   └── CollectibleManager.js # Spawner de $O_2$ e Glicose
    └── ui/
        ├── HUD.js              # Contador de BPM, Saturação e Distância
        └── EducationalModal.js # Pop-ups conceituais de feedback
```

---

## 5. Implementação Técnica das Cenas principais (Exemplo Base)

### 5.1 Configuração do Jogo (`src/main.js`)
```javascript
import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scene: [BootScene, GameScene]
};

export default new Phaser.Game(config);
```

### 5.2 Lógica do Loop Principal (`src/scenes/GameScene.js`)
```javascript
import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.bpm = 75;
        this.oxygenLevel = 100;
        this.gameSpeed = 5;
    }

    create() {
        // Fundo infinito (Vaso Sanguíneo)
        this.vesselBackground = this.add.tileSprite(400, 225, 800, 450, 'vessel_wall');

        // Chão (Endotélio)
        this.ground = this.add.tileSprite(400, 430, 800, 40, 'endothelium');
        this.physics.add.existing(this.ground, true);

        // Jogador (Hemácia)
        this.player = this.physics.add.sprite(120, 350, 'erythrocyte');
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground);

        // Input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Timer de drenagem natural de O2 (metabolismo de repouso)
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.oxygenLevel = Math.max(0, this.oxygenLevel - 2);
                this.events.emit('updateHUD', { bpm: this.bpm, o2: this.oxygenLevel });
            },
            loop: true
        });
    }

    update() {
        // Deslocamento do cenário para ilusão de movimento
        this.vesselBackground.tilePositionX += this.gameSpeed;
        this.ground.tilePositionX += this.gameSpeed;

        // Movimento de Pulo
        if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.touching.down) {
            this.player.setVelocityY(-450);
        }
    }
}
```

---

## 6. Instruções para o Assistente de Código (IA)

Ao ajudar o desenvolvedor a implementar funcionalidades neste projeto:
1. Mantenha os métodos leves e focados nas classes de `entities` para garantir código modular.
2. Toda colisão com obstáculo deve emitir um feedback educativo (ex: *"Ateroma detectado: aumento da resistência vascular"*).
3. Utilize a biblioteca Arcade Physics padrão do Phaser 3 para garantir boa performance.
4. Garanta suporte para controles de teclado (Espaço / Setas) e toques simples em telas mobile/navegador.