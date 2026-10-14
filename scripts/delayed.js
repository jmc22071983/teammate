// add delayed functionality here

/**
 * Carga Adobe Target (at.js, self-hosted en /scripts/at.js) en la fase "delayed" (no bloquea
 * LCP/PageSpeed). Al cargar, at.js dispara automaticamente una peticion a "target-global-mbox",
 * suficiente para que cualquier Activity/Offer creada en Target se aplique sin tocar mas codigo
 * de bloque - salvo que la personalizacion apunte a un mbox propio (ver target__list_target_mboxes).
 *
 * PENDIENTE: el Client Code real de esta cuenta de Target (Target > Administration >
 * Implementation, o pidele al chat "dame la configuracion de atjs" -> target__get_atjs_settings).
 * at.js lee este valor de `window.targetGlobalSettings.clientCode` ANTES de ejecutarse - sin el,
 * la libreria carga pero no hace ninguna peticion real.
 */
function loadAdobeTarget() {
  const TARGET_CLIENT_CODE = 'seidoremeapartnersan'; // <- sin esto, at.js carga pero no pide ofertas a Target
  if (!TARGET_CLIENT_CODE) {
    // eslint-disable-next-line no-console
    console.warn('Adobe Target (at.js) no esta configurado: falta TARGET_CLIENT_CODE en scripts/delayed.js');
    return;
  }
  window.targetGlobalSettings = { clientCode: TARGET_CLIENT_CODE };
  const script = document.createElement('script');
  script.src = '/scripts/at.js';
  script.async = true;
  document.head.append(script);
}

loadAdobeTarget();

