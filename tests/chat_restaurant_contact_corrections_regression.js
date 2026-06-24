/*
  Restaurant contact + correction regression tests for Veyra AI local browser fallback.
  Run from 02_WEB_COMERCIAL/tests with:
    node chat_restaurant_contact_corrections_regression.js
*/
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const appPath = path.join(__dirname, '..', 'assets', 'app.js');
const context = {
  console,
  document: { querySelector: () => null, querySelectorAll: () => [], createElement: () => ({ appendChild(){}, addEventListener(){}, className:'', textContent:'', href:'', target:'', rel:'' }) },
  window: { location: { href: '', hostname: 'localhost' }, addEventListener: () => {} },
  localStorage: { getItem: () => null, setItem: () => {} },
  fetch: async () => ({ ok: false }),
  setTimeout,
  clearTimeout
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(appPath, 'utf8'), context);

function ask(sector, message) {
  return vm.runInContext(`generateLocalResponse(${JSON.stringify(sector)}, ${JSON.stringify(message)})`, context);
}
function reset(sector) {
  return vm.runInContext(`resetState(${JSON.stringify(sector)})`, context);
}

reset('restauracion');
let response = ask('restauracion', 'quiero hacer una reserva');
response = ask('restauracion', 'seria para el dia 25 de junio a las 10 de la mañana para 3 personas');
assert(response.includes('personas: 3'), response);
assert(response.includes('25 de junio'), response);
assert(response.includes('10:00'), response);
assert(response.includes('nombre y teléfono'), response);

response = ask('restauracion', 'nombre alejandro telefono 617022859');
assert(response.includes('Nombre: Alejandro'), response);
assert(response.includes('Teléfono: 617022859'), response);
assert(!/necesito aterrizarlo/i.test(response), response);
assert(!response.includes('Nombre: Nombre'), response);

response = ask('restauracion', 'cambia el nombre a maria');
assert(response.includes('Nombre: Maria'), response);
assert(response.includes('Teléfono: 617022859'), response);
assert(!/No repito la reserva anterior/i.test(response), response);

response = ask('restauracion', 'el telefono correcto es 617333444');
assert(response.includes('Nombre: Maria'), response);
assert(response.includes('Teléfono: 617333444'), response);
assert(!response.includes('Nombre: El'), response);

response = ask('restauracion', 'no es 25 de junio es 26 de junio');
assert(response.includes('Fecha: 26 de junio'), response);
assert(!response.includes('Fecha: 25 de junio'), response);

response = ask('restauracion', 'no es a las 10 es a las 11');
assert(response.includes('Hora: 11:00'), response);
assert(!response.includes('Hora: 10:00'), response);

response = ask('restauracion', 'no somos 3 son 5 personas');
assert(response.includes('Personas: 5'), response);
assert(response.includes('Fecha: 26 de junio'), response);
assert(response.includes('Hora: 11:00'), response);
assert(response.includes('Nombre: Maria'), response);

console.log('OK - restaurant contact and correction regression passed.');
