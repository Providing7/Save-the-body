export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 450;
export const GRAVITY_Y = 1000;

export const GROUND_TOP = 410;
export const GROUND_HEIGHT = 40;

export const SCROLL_SPEED = 120;
export const PIXEL_PER_METER = 10;

export const PLAYER = {
  START_X: 120,
  JUMP_VELOCITY: -450,
  DUCK_SCALE_Y: 0.5,
};

export const OXYGEN = {
  MAX: 100,
  DRAIN_PER_SECOND: 2,
  PICKUP_VALUE: 15,
};

export const BPM = {
  REST: 75,
  EXERCISE: 110,
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
  OBSTACLE_START_MS: 1600,
  OBSTACLE_MIN_MS: 900,
  COLLECTIBLE_START_MS: 1400,
  COLLECTIBLE_MIN_MS: 800,
  RAMP_DISTANCE: 2000,
};

export const ITEM_SPAWN = {
  OXYGEN_CHANCE: 0.7,
};

export const OBSTACLE_SPAWN = {
  CLOT_CHANCE: 0.3,
  LEUCOCYTE_CHANCE: 0.25,
};

export const OBSTACLES = {
  atheroma: { key: 'atheroma', y: 390, damage: 1 },
  clot: { key: 'clot', y: 380, damage: 2},
  leucocyte: { key: 'leucocyte', y: 360, damage: 1 },
};

export const HIT_INVULNERABILITY_MS = 800;

export const COLLISION_MESSAGES = {
  atheroma:
    'Ateroma detectado: a placa aumenta a resistência vascular e reduz o fluxo.',
  clot: 'Trombo! A obstrução eleva a pressão a montante e reduz a perfusão.',
  leucocyte:
    'Leucócito em excesso: a resposta inflamatória pode lesar o endotélio.',
};

export const GAME_OVER_TIPS = {
  hypoxia:
    'Hipóxia tecidual: sem O2, a cadeia respiratória para e a célula não produz ATP.',
  obstruction:
    'Obstrução vascular: ateromas e trombos aumentam a resistência periférica total.',
};