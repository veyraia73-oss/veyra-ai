/*
  Regression tests for Veyra AI local browser fallback.
  Run from 02_WEB_COMERCIAL/tests with:
    node chat_local_regression.js
*/
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const appPath = path.join(__dirname, '..', 'assets', 'app.js');
const context = {
  console,
  window: { location: { hostname: 'localhost' } },
  localStorage: { getItem(){return null}, setItem(){} },
  document: {
    querySelector(){ return null; },
    createElement(){ return { appendChild(){}, addEventListener(){}, className:'', textContent:'', href:'', target:'', rel:'', dataset:{} }; }
  }
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(appPath, 'utf8'), context);

function say(sector, message) {
  return context.generateLocalResponse(sector, message).toLowerCase();
}

say('restauracion', 'quiero hacer una reserva');
const booking = say('restauracion', 'seria para el dia 25 de junio a las 10 de la mañana para 3 personas');
assert(booking.includes('personas: 3') || booking.includes('3 personas'), booking);
assert(!booking.includes('personas: 25'), booking);
assert(booking.includes('25 de junio'), booking);
assert(booking.includes('10:00'), booking);
assert(!booking.includes('menú: he dicho'), booking);
assert(booking.includes('no voy a pedir menú'), booking);

const correction = say('restauracion', 'he dicho 3 personas');
assert(correction.includes('personas: 3') || correction.includes('3 personas'), correction);
assert(!correction.includes('personas: 25'), correction);
assert(!correction.includes('menú: he dicho'), correction);

console.log('OK - chat local fallback regression passed.');
