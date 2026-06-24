const fs = require('fs');
const vm = require('vm');
const path = require('path');

const appPath = path.join(__dirname, '..', 'assets', 'app.js');
const code = fs.readFileSync(appPath, 'utf8');
const context = {
  console,
  document: { querySelector: () => null, querySelectorAll: () => [] },
  window: { location: { href: '' }, addEventListener: () => {} },
  localStorage: { getItem: () => null, setItem: () => {} },
  fetch: async () => ({ ok: false }),
  crypto: { randomUUID: () => 'test-session' },
  setTimeout,
  clearTimeout
};
vm.createContext(context);
vm.runInContext(code, context);

function ask(sector, message) {
  return vm.runInContext(`generateLocalResponse(${JSON.stringify(sector)}, ${JSON.stringify(message)})`, context);
}

ask('dental', 'Me duele una muela, tengo la cara hinchada y necesito cita hoy.');
ask('dental', 'Desde hace 3 días.');
const previous = ask('dental', 'Hoy no puedo, mejor mañana por la tarde.');
const alternative = ask('dental', 'no podria ser otra fecha?');

if (!alternative.includes('Nuevas opciones')) throw new Error('No ofrece nuevas opciones ante petición de otra fecha.');
if (alternative.includes('mañana 09:30') || alternative.includes('mañana 12:00') || alternative.includes('mañana 16:30')) throw new Error('Repite la misma fecha rechazada cuando el usuario pidió otra fecha.');
if (alternative === previous) throw new Error('Respuesta repetida ante petición de alternativa.');
if (!alternative.includes('Datos que mantengo')) throw new Error('Pierde contexto al pedir alternativa.');

const secondAlternative = ask('dental', 'ninguna, otra opcion');
if (!secondAlternative.includes('jueves') && !secondAlternative.includes('viernes')) throw new Error('No rota a una segunda tanda de alternativas.');

console.log('OK - alternatives regression passed.');
