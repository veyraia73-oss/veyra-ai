/*
  Coherence supervisor regression tests for Veyra AI local browser fallback.
  Run from 02_WEB_COMERCIAL/tests with:
    node chat_coherence_supervisor_regression.js
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

// Dental: pedir otra fecha no debe repetir el bloque ni ofrecer la misma fecha anterior.
reset('dental');
ask('dental', 'Me duele una muela, tengo la cara hinchada y necesito cita hoy.');
ask('dental', 'Desde hace 3 días.');
const previous = ask('dental', 'Hoy no puedo, mejor mañana por la tarde.');
const alternativeDate = ask('dental', 'no podria ser otra fecha?');
assert(alternativeDate.includes('Nuevas opciones de fecha'), alternativeDate);
assert(!alternativeDate.includes('Siento que estés con esa molestia'), alternativeDate);
assert(!alternativeDate.includes('mañana 09:30'), alternativeDate);
assert(!alternativeDate.includes('mañana 12:00'), alternativeDate);
assert(!alternativeDate.includes('mañana 16:30'), alternativeDate);
assert(/pasado mañana|jueves|viernes|lunes/.test(alternativeDate), alternativeDate);
assert.notStrictEqual(alternativeDate, previous, 'No debe repetir la respuesta previa.');

// Incluso si se perdió accidentalmente el flag awaitingSlot, debe interpretar la intención real.
reset('dental');
ask('dental', 'Me duele una muela, tengo la cara hinchada y necesito cita hoy.');
ask('dental', 'Desde hace 3 días.');
ask('dental', 'Hoy no puedo, mejor mañana por la tarde.');
vm.runInContext('getState("dental").awaitingSlot = false', context);
const alternativeWithoutFlag = ask('dental', '¿podría ser otra fecha distinta?');
assert(alternativeWithoutFlag.includes('Nuevas opciones de fecha'), alternativeWithoutFlag);
assert(!alternativeWithoutFlag.includes('Siento que estés con esa molestia'), alternativeWithoutFlag);

// Si pide otra hora, sí puede mantener la fecha y cambiar horario.
reset('dental');
ask('dental', 'Me duele una muela, tengo la cara hinchada y necesito cita hoy.');
ask('dental', 'Desde hace 3 días.');
ask('dental', 'Hoy no puedo, mejor mañana por la tarde.');
const alternativeTime = ask('dental', '¿y otra hora?');
assert(alternativeTime.includes('Nuevas opciones de horario'), alternativeTime);
assert(!alternativeTime.includes('mañana 09:30'), alternativeTime);
assert(!alternativeTime.includes('mañana 12:00'), alternativeTime);

// Restauración: fecha, hora y personas no pueden cruzarse.
reset('restauracion');
ask('restauracion', 'quiero hacer una reserva');
const booking = ask('restauracion', 'seria para el dia 25 de junio a las 10 de la mañana para 3 personas');
assert(booking.includes('personas: 3') || booking.includes('3 personas'), booking);
assert(!booking.includes('personas: 25'), booking);
assert(booking.includes('25 de junio'), booking);
assert(booking.includes('10:00'), booking);
assert(!booking.includes('menú: he dicho'), booking);

console.log('OK - coherence supervisor regression passed.');
