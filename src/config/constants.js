export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 450;
export const GRAVITY_Y = 900;

export const GROUND_TOP = 410;
export const GROUND_HEIGHT = 40;

export const PIXEL_PER_METER = 10;

export const PLAYER = {
  START_X: 120,
  JUMP_VELOCITY: -600,
  BODY_WIDTH: 40,
  DUCK_BODY_HEIGHT: 24,
};

export const SPEED = {
  BASE: 120,
  MAX: 200,
  RAMP_DISTANCE: 1200,
};

export const OXYGEN = {
  MAX: 100,
  DRAIN_PER_METER: 1 / 6,
  PICKUP_VALUE: 15,
};

export const BPM = {
  REST: 75,
  EXERCISE: 140,
  BOOST_BONUS: 20,
};

export const PHYSIO = {
  REST_MS: 10000,
  EXERCISE_MS: 15000,
  BPM_RAMP_MS: 3000,
  SPEED_FACTOR: 1.15,
  OXYGEN_FACTOR: 1.3,
  LABELS: {
    REST: 'repouso',
    EXERCISE: 'exercício',
  },
};

export const DAMAGE = {
  MAX: 3,
};

export const SCORE = {
  OXYGEN: 50,
  GLUCOSE: 200,
};

export const GLUCOSE_BOOST = {
  DURATION_MS: 3000,
  SPEED_FACTOR: 1.3,
};

export const SPAWN = {
  OBSTACLE_START_MS: 2000,
  OBSTACLE_MIN_MS: 1600,
  COLLECTIBLE_START_MS: 1400,
  COLLECTIBLE_MIN_MS: 800,
  RAMP_DISTANCE: 2000,
};

export const ITEM_SPAWN = {
  OXYGEN_CHANCE: 0.7,
};

export const OBSTACLE_SPAWN = {
  CLOT_CHANCE: 0.3,
  PATHOGEN_CHANCE: 0.25,
};

export const OBSTACLES = {
  atheroma: { key: 'atheroma', y: 392, damage: 1 },
  clot: { key: 'clot', y: 380, damage: 2 },
  pathogen: { key: 'pathogen', y: 348, damage: 1 },
};

export const OBSTACLE_BODY = {
  WIDTH_FACTOR: 0.7,
};

export const HIT_INVULNERABILITY_MS = 800;

export const COLLISION_MESSAGES = {
  atheroma:
    'Ateroma detectado: a placa aumenta a resistência vascular e reduz o fluxo.',
  clot: 'Trombo! A obstrução eleva a pressão a montante e reduz a perfusão.',
  pathogen:
    'Patógeno em excesso: a resposta inflamatória pode lesar o endotélio.',
};

export const GAME_OVER_TIPS = {
  hypoxia:
    'Hipóxia tecidual: sem O2, a cadeia respiratória para e a célula não produz ATP.',
  obstruction:
    'Obstrução vascular: ateromas e trombos aumentam a resistência periférica total.',
};

export const MENU = {
  TITLE: 'SUPER CARDIO BROS',
  SUBTITLE: 'CardioRunner',
  TAGLINE: 'Oxigênio, glicose e obstáculos dentro da corrente sanguínea',
  PLAY: 'JOGAR',
  TUTORIAL: 'COMO JOGAR',
  CONTROLS: 'Espaço / ↑ pula · ↓ abaixa · clique ou toque também pula',
  FOOTER: 'Projeto educativo · Fisiologia cardiovascular',
};

export const TUTORIAL = {
  TITLE: 'Guia do jogador',
  HINT_NAV: '← → navegar · ESC volta ao menu',
  PREV: '← Anterior',
  NEXT: 'Próximo →',
  PLAY: 'JOGAR',
  MENU: 'MENU',
  PAGES: [
    {
      title: 'Como jogar',
      lines: [
        'Você é uma hemácia dentro de um vaso sanguíneo.',
        'Desvie das ameaças e colete oxigênio e glicose.',
        `Controles: ${MENU.CONTROLS}.`,
        'Sua vida tem duas regras independentes:',
        '• Saturação de O₂ em 0 → hipóxia tecidual.',
        `• Acumular ${DAMAGE.MAX} pontos de dano → obstrução vascular.`,
      ],
    },
    {
      title: 'Você e os itens',
      sprites: ['erythrocyte', 'oxygen', 'glucose'],
      lines: [
        'Hemácia - você. Pule e abaixe para passar pelos vãos.',
        `Oxigênio - +${OXYGEN.PICKUP_VALUE} de saturação e ${SCORE.OXYGEN} pts.`,
        `Glicose - +${SCORE.GLUCOSE} pts e boost de ${GLUCOSE_BOOST.DURATION_MS / 1000}s.`,
      ],
    },
    {
      title: 'Ameaças',
      sprites: ['atheroma', 'clot', 'pathogen'],
      lines: [
        `Ateroma — ${OBSTACLES.atheroma.damage} dano. A placa aumenta a resistência vascular e reduz o fluxo.`,
        `Coágulo — ${OBSTACLES.clot.damage} danos. A obstrução eleva a pressão a montante e reduz a perfusão.`,
        `Patógeno — ${OBSTACLES.pathogen.damage} dano. A resposta inflamatória pode lesar o endotélio.`,
        `Após um impacto, você fica invulnerável por ${HIT_INVULNERABILITY_MS} ms.`,
      ],
    },
    {
      title: 'Repouso e exercício',
      lines: [
        `${PHYSIO.REST_MS / 1000}s de repouso alternam com ${PHYSIO.EXERCISE_MS / 1000}s de exercício.`,
        `Em exercício: BPM ${BPM.REST} → ${BPM.EXERCISE}, velocidade ×${PHYSIO.SPEED_FACTOR}.`,
        `O₂ por metro ×${PHYSIO.OXYGEN_FACTOR}: o esforço cobra mais saturação.`,
      ],
    },
  ],
};

export const INTEGRITY = {
  LABEL: 'Integridade',
  ICON_SIZE: 22,
  ICON_GAP: 6,
  FULL_TINT: 0xff5d5d,
  LOST_TINT: 0x5c1414,
};

export const PARALLAX = {
  FAR: 0.35,
};

export const VIGNETTE = {
  DEPTH: 9,
};