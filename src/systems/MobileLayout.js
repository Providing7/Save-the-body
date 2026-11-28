const PORTRAIT_QUERY = '(orientation: portrait)';
const ORIENTATION_SETTLE_MS = 200;

// Detecta se a página já está rodando como app instalado (sem chrome do navegador).
export function isStandalone() {
  return (
    window.matchMedia('(display-mode: fullscreen)').matches ||
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

function requestFullscreen() {
  const element = document.documentElement;
  const request =
    element.requestFullscreen ||
    element.webkitRequestFullscreen ||
    element.webkitRequestFullScreen;

    if (
      !request ||
      document.fullscreenElement ||
      document.webkitFullscreenElement
    ) {
      return Promise.resolve(false);
    }
  
    try {
      let result;
        try {
          result = request.call(element, { navigationUI: 'hide' });
        } catch {
      result = request.call(element);
    }
    return Promise.resolve(result)
      .then(() => true)
      .catch(() => false);
  } catch {
    return Promise.resolve(false);
  }
}

export function enterFullscreen() {
  // No iOS o Safari não permite fullscreen de página; só o app instalado
  // (Adicionar à Tela de Início) remove o chrome do navegador.
  if (isStandalone()) {
    return Promise.resolve(true);
  }

  return requestFullscreen().then((granted) => {
    if (granted && screen.orientation?.lock) {
      screen.orientation.lock('landscape').catch(() => {});
    }

    return granted;
  });
}

export function installMobilePause(scene) {
  if (!scene.sys.game.device.input.touch) {
    return () => {};
  }

  const portrait = window.matchMedia(PORTRAIT_QUERY);

  const sync = () => {
    const blocked = portrait.matches || document.hidden;

    if (blocked && scene.scene.isActive()) {
      scene.scene.pause();
      return;
    }

    if (!blocked && scene.scene.isPaused()) {
      scene.scene.resume();
    }
  };

  const onOrientationChange = () => {
    window.setTimeout(() => {
      scene.game.scale.refresh();
      sync();
    }, ORIENTATION_SETTLE_MS);
  };

  const onFullscreenChange = () => {
    window.setTimeout(() => {
      scene.game.scale.refresh();
    }, ORIENTATION_SETTLE_MS);
  };

  portrait.addEventListener?.('change', sync);
  document.addEventListener('visibilitychange', sync);
  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('webkitfullscreenchange', onFullscreenChange);
  window.addEventListener('orientationchange', onOrientationChange);

  scene.events.once('shutdown', () => {
    portrait.removeEventListener?.('change', sync);
    document.removeEventListener('visibilitychange', sync);
    document.removeEventListener('fullscreenchange', onFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
    window.removeEventListener('orientationchange', onOrientationChange);
  });

  // Pausar durante o create() é sobrescrito pelo Phaser; espera o primeiro frame.
  scene.time.delayedCall(0, sync);

  return sync;
}
