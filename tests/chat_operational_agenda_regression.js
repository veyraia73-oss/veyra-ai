/*
  Operational agenda regression tests for Veyra AI local browser fallback.
  Covers availability questions, occupied slots, date-change flow and cross-sector agenda questions.
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
  crypto: { randomUUID: () => 'test-session' },
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
ask('restauracion', 'quiero hacer una reserva');
ask('restauracion', 'seria para el dia 25 de junio por la noche para 3 personas');
ask('restauracion', 'nombre alejandro telefono 617022859');
let response = ask('restauracion', 'me podria decir a que hora estaria disponible?');
assert(response.includes('agenda de reservas'), response);
assert(response.includes('25 de junio'), response);
assert(response.includes('20:30'), response);
assert(response.includes('22:00'), response);
assert(!/necesito aterrizarlo/i.test(response), response);

response = ask('restauracion', 'hay a las 21:00?');
assert(/ocupado|no lo pondría|fuera de los huecos/i.test(response), response);
assert(response.includes('20:30'), response);
assert(response.includes('22:00'), response);
assert(!response.includes('- Hora: 21:00'), response);

response = ask('restauracion', '2');
assert(response.includes('Hora: 22:00'), response);
assert(response.includes('Fecha: 25 de junio'), response);

response = ask('restauracion', 'y si cambiamos de fecha?');
assert(response.includes('Dime qué nueva fecha'), response);
assert(!/necesito aterrizarlo/i.test(response), response);

response = ask('restauracion', '26 de junio por la noche');
assert(response.includes('26 de junio'), response);
assert(response.includes('21:00'), response);
assert(response.includes('22:00'), response);
assert(!/necesito aterrizarlo/i.test(response), response);

response = ask('restauracion', 'confirmo 22:00');
assert(response.includes('Fecha: 26 de junio'), response);
assert(response.includes('Hora: 22:00'), response);
assert(response.includes('Nombre: Alejandro'), response);

reset('dental');
ask('dental', 'Me duele una muela, tengo la cara hinchada y necesito cita hoy.');
ask('dental', 'Desde hace 3 días.');
response = ask('dental', 'me dices horarios disponibles mañana por la tarde?');
assert(response.includes('agenda de clínica'), response);
assert(response.includes('mañana'), response);
assert(response.includes('16:30'), response);
assert(!/necesito aterrizarlo/i.test(response), response);

reset('formacion');
ask('formacion', 'Necesito formación en ventas para 12 comerciales.');
response = ask('formacion', 'qué huecos hay para diagnóstico esta semana?');
assert(response.includes('agenda de diagnóstico'), response);
assert(/09:30|16:00|17:30/.test(response), response);
assert(!/necesito aterrizarlo/i.test(response), response);

console.log('OK - operational agenda regression passed.');
