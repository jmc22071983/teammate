/**
 * Personalizacion via Adobe Target Delivery API (fetch directo, sin at.js/Web SDK) - mismo
 * patron probado en el proyecto hermano poc-unir. Se llama una vez desde la fase "delayed" y
 * aplica el contenido devuelto (una oferta JSON) al primer <h1> de la pagina.
 *
 * Requiere que la Activity en Target use una oferta JSON (NO "Default Content"/HTML) apuntando
 * al mbox TARGET_MBOX de aqui abajo - ver guia de personalizacion con Target en el handoff del
 * equipo. La ubicacion (mbox) no aparece seleccionable en el compositor de Target hasta que
 * Target reciba al menos una peticion real con ese nombre - desplegar este codigo primero.
 */

const TARGET_CLIENT = 'seidoremeapartnersan';
// Staging - cambiar si no devuelve "options" (ver README/handoff)
const TARGET_ENVIRONMENT_ID = 2062;
const TARGET_PROPERTY_TOKEN = '5b2414c1-65e6-637e-212a-973ac4cffb18'; // "EDS Property" en Target
const TARGET_MBOX = 'teammate-title-personalization';
const REQUEST_TIMEOUT_MS = 1000;

const TNT_ID_STORAGE_KEY = 'teammate-tnt';
const SESSION_ID_STORAGE_KEY = 'teammate-tnt-session';

function getOrCreateId(storage, key) {
  let value = storage.getItem(key);
  if (!value) {
    value = crypto.randomUUID();
    storage.setItem(key, value);
  }
  return value;
}

/**
 * Valida que el contenido devuelto por Target tiene la forma esperada antes de usarlo.
 * @param {unknown} content
 * @returns {string|null} el titulo si es valido, o null
 */
function readTitle(content) {
  if (!content || typeof content !== 'object') return null;
  const { title } = content;
  if (typeof title !== 'string' || !title.trim() || title.length > 200) return null;
  return title;
}

/**
 * Pide una decision a Target para TARGET_MBOX y, si hay una oferta JSON valida con un campo
 * `title`, lo aplica al primer <h1> de la pagina via textContent (nunca innerHTML - el contenido
 * de Target se trata como texto, no como HTML de confianza).
 */
export default async function personalize() {
  const sessionId = getOrCreateId(sessionStorage, SESSION_ID_STORAGE_KEY);
  const tntId = getOrCreateId(localStorage, TNT_ID_STORAGE_KEY);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(
      `https://${TARGET_CLIENT}.tt.omtrdc.net/rest/v1/delivery?client=${TARGET_CLIENT}&sessionId=${sessionId}`,
      {
        method: 'POST',
        credentials: 'omit',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          context: { channel: 'web', address: { url: window.location.href } },
          environmentId: TARGET_ENVIRONMENT_ID,
          property: { token: TARGET_PROPERTY_TOKEN },
          id: { tntId },
          execute: { mboxes: [{ index: 0, name: TARGET_MBOX, parameters: {} }] },
        }),
      },
    );
  } catch (error) {
    // Timeout, red caida, etc. - la pagina se queda con el titulo por defecto, sin romper nada.
    return;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) return;

  let data;
  try {
    data = await response.json();
  } catch (error) {
    return;
  }

  if (data?.id?.tntId) {
    localStorage.setItem(TNT_ID_STORAGE_KEY, data.id.tntId);
  }

  const options = data?.execute?.mboxes?.[0]?.options || [];
  const jsonOption = options.find((option) => option.type === 'json');
  const title = readTitle(jsonOption?.content);
  if (!title) return;

  const heading = document.querySelector('h1');
  if (heading) {
    heading.textContent = title;
  }
}
