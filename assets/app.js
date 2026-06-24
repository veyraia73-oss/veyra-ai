const menuBtn = document.querySelector('[data-menu-btn]');
const mobile = document.querySelector('[data-mobile]');
if (menuBtn && mobile) {
  menuBtn.addEventListener('click', () => mobile.classList.toggle('open'));
}

const DEMOS = {
  inmobiliaria: {
    name: 'InmoAgent',
    tenant: 'demo-inmo',
    category: 'inmobiliaria',
    mission: 'compra, venta, valoración, alquiler, visitas, inversión y seguimiento comercial inmobiliario',
    capabilities: ['valorar una vivienda de forma orientativa', 'cualificar compradores y vendedores', 'preparar visitas', 'detectar urgencia o motivación', 'agendar valoración o llamada'],
    samples: [
      'Necesito una cita para valorar mi piso en Alicante centro. Tiene 95 m2, 3 habitaciones y está reformado.',
      'Quiero vender mi casa en El Campello por traslado y necesito saber precio orientativo.',
      'Busco comprar vivienda en Playa de San Juan hasta 350.000 euros y tengo hipoteca aprobada.',
      'Quiero visitar un piso con terraza mañana por la tarde.'
    ]
  },
  dental: {
    name: 'DentIA',
    tenant: 'demo-dental',
    category: 'clínica dental',
    mission: 'urgencias dentales, citas, revisiones, presupuestos, tratamientos y cambios de agenda',
    capabilities: ['priorizar una posible urgencia', 'recoger síntomas relevantes sin diagnosticar', 'orientar sobre tratamientos y presupuesto', 'cambiar o proponer cita', 'avisar a recepción'],
    samples: [
      'Me duele una muela desde hace 3 días, tengo la cara hinchada y necesito cita urgente.',
      'Quiero saber precio de implantes y opciones de financiación.',
      'Necesito una revisión y limpieza la semana que viene por la tarde.',
      'Tengo cita el jueves y necesito cambiarla a mañana.'
    ]
  },
  estetica: {
    name: 'BeautyAgent',
    tenant: 'demo-estetica',
    category: 'estética y medicina estética',
    mission: 'tratamientos estéticos, precios orientativos, seguridad básica, valoración y agenda',
    capabilities: ['cualificar tratamiento y zona', 'detectar contraindicaciones básicas', 'explicar límites de una valoración online', 'agendar valoración', 'reactivar presupuestos'],
    samples: [
      'Quiero una cita de valoración para bótox en frente y patas de gallo. Sería mi primera vez.',
      '¿Cuánto cuesta láser para manchas en la cara?',
      'Me interesa ácido hialurónico en labios y quiero saber si puedo financiarlo.',
      'Necesito cambiar mi valoración del jueves al viernes por la tarde.'
    ]
  },
  legal: {
    name: 'LexAgent',
    tenant: 'demo-legal',
    category: 'despacho legal',
    mission: 'clasificación inicial de asuntos legales, recogida de datos, plazos, documentos y agenda de consulta',
    capabilities: ['clasificar el asunto', 'detectar urgencia por plazo', 'pedir documentos clave', 'agendar consulta', 'derivar al abogado adecuado sin dar dictamen definitivo'],
    samples: [
      'Tengo un problema de herencia con mis hermanos, hay testamento y necesito consulta esta semana.',
      'Soy propietario y el inquilino no paga desde hace 3 meses.',
      'Me han despedido, tengo carta de despido y quiero saber qué documentos llevar.',
      'Necesito una llamada con un abogado por un asunto de alquiler urgente.'
    ]
  },
  formacion: {
    name: 'CoachAgent',
    tenant: 'demo-formacion',
    category: 'formación, coaching y consultoría',
    mission: 'diagnóstico de necesidades, programas de coaching/formación, equipos, objetivos, precio orientativo y agenda de sesión',
    capabilities: ['diagnosticar objetivo', 'diferenciar programa individual o de equipo', 'recoger tamaño del equipo', 'valorar urgencia e impacto esperado', 'proponer sesión de diagnóstico'],
    samples: [
      'Necesito formación en ventas para un equipo de 12 comerciales este trimestre.',
      'Quiero coaching individual de alto rendimiento para mejorar foco y productividad en 90 días.',
      'Quiero un programa de liderazgo para gerentes y mandos intermedios.',
      '¿Cuánto cuesta un programa para mi empresa si somos 18 personas?'
    ]
  },
  restauracion: {
    name: 'ReservaAgent',
    tenant: 'demo-restauracion',
    category: 'restaurante y reservas',
    mission: 'reservas, grupos, eventos, menús, alergias, cambios de reserva y ocupación de huecos',
    capabilities: ['recoger fecha, hora y número de personas', 'detectar alergias o preferencias', 'separar reserva normal de evento', 'proponer turnos', 'avisar al responsable de sala'],
    samples: [
      'Quiero reservar mesa para 6 este sábado por la noche y uno es celíaco.',
      'Somos 25 para cena de empresa y queremos menú cerrado.',
      'Necesito cambiar mi reserva de hoy a mañana por la noche.',
      '¿Tenéis opciones sin gluten y terraza para comer el domingo?'
    ]
  }
};

DEMOS.auto = {
  name: 'Veyra AI Nexus',
  tenant: 'demo-veyra',
  category: 'meta-agente comercial',
  mission: 'recomendar el agente IA adecuado, cualificar el caso, detectar sector, resolver objeciones y llevar a demo, WhatsApp, llamada o compra',
  capabilities: ['detectar intención y sector', 'recordar datos durante la sesión', 'recomendar agente vertical', 'explicar planes confirmados', 'proponer CTA dinámico'],
  samples: [
    '¿Qué agente me conviene? Tengo una empresa y pierdo muchas consultas por WhatsApp.',
    'Tengo una inmobiliaria y pierdo muchos leads de portales por no contestar rápido.',
    'Necesito formación en ventas para 12 comerciales este trimestre.',
    '¿Cuánto cuesta y cuál debería contratar?',
    'Quiero contratarlo.'
  ]
};

const DOMAIN_RULES = {
  inmobiliaria: {
    terms: ['piso', 'casa', 'vivienda', 'chalet', 'atico', 'ático', 'local', 'alquiler', 'comprar', 'compra', 'vender', 'venta', 'valoracion', 'valoración', 'tasacion', 'tasación', 'visita', 'cita', 'llamada', 'reunion', 'reunión', 'agenda', 'agendar', 'hueco', 'asesor', 'inmueble', 'propietario', 'comprador', 'hipoteca', 'presupuesto', 'zona', 'metros', 'habitaciones', 'dormitorios', 'garaje', 'piscina'],
    intents: {
      vendedor: ['vender', 'vendo', 'venta', 'mi piso', 'mi casa', 'propietario', 'traslado', 'herencia', 'divorcio', 'quiero sacar al mercado'],
      valoracion: ['valorar', 'valoracion', 'valoración', 'tasar', 'tasacion', 'tasación', 'cuanto vale', 'cuánto vale', 'precio de mi vivienda'],
      estimacion_compra: ['cuanto costaria', 'cuánto costaría', 'precio de una casa', 'precio de un piso', 'valor aproximado', 'costaria una', 'costaría una'],
      comprador: ['comprar', 'busco', 'quiero comprar', 'hipoteca aprobada', 'presupuesto', 'hasta', 'necesito vivienda'],
      visita: ['visitar', 'visita', 'ver un piso', 'ver una casa'],
      alquiler: ['alquilar', 'alquiler', 'rentar'],
      inversor: ['invertir', 'inversion', 'inversión', 'rentabilidad', 'roi'],
      cita: ['cita', 'llamada', 'reunion', 'reunión', 'agenda', 'agendar', 'hablar con asesor', 'necesito cita', 'quiero cita']
    },
    required: {
      vendedor: ['zone', 'property_type', 'sqm'],
      valoracion: ['zone', 'property_type', 'sqm'],
      estimacion_compra: ['zone', 'property_type', 'sqm'],
      comprador: ['zone', 'budget', 'need'],
      visita: ['property', 'availability'],
      alquiler: ['zone', 'budget'],
      inversor: ['budget', 'target_return'],
      cita: ['operation', 'availability']
    },
    questions: {
      zone: '¿En qué zona exacta está o buscas el inmueble?',
      property_type: '¿Es piso, casa, ático, local u otro tipo de inmueble?',
      sqm: '¿Cuántos metros cuadrados aproximados tiene?',
      budget: '¿Qué presupuesto máximo manejas?',
      need: '¿Qué necesitas sí o sí: dormitorios, terraza, garaje, colegios, playa, rentabilidad?',
      property: '¿Qué inmueble concreto quieres visitar?',
      availability: '¿Qué día y franja horaria te viene bien?',
      target_return: '¿Buscas rentabilidad por alquiler, revalorización o ambas?',
      operation: '¿La cita es para vender, comprar, alquilar, visitar un inmueble o valorar una vivienda?'
    }
  },
  dental: {
    terms: ['diente', 'muela', 'encia', 'encía', 'dolor', 'implante', 'ortodoncia', 'brackets', 'invisalign', 'limpieza', 'revision', 'revisión', 'caries', 'cita', 'consulta', 'agenda', 'agendar', 'hueco', 'hora', 'clinica', 'clínica', 'presupuesto', 'financiacion', 'financiación', 'urgencia', 'sangrado', 'hinchazon', 'hinchazón'],
    intents: {
      urgencia: ['dolor', 'muela', 'hinchada', 'hinchazon', 'hinchazón', 'fiebre', 'sangrado', 'urgente', 'no puedo dormir', 'insoportable'],
      presupuesto: ['precio', 'presupuesto', 'cuanto cuesta', 'cuánto cuesta', 'implante', 'ortodoncia', 'financiacion', 'financiación'],
      revision: ['revision', 'revisión', 'limpieza', 'chequeo', 'primera visita'],
      reagendar: ['cambiar cita', 'modificar cita', 'cancelar cita', 'reagendar', 'no puedo ir'],
      cita: ['cita', 'consulta', 'agenda', 'agendar', 'hueco', 'necesito cita', 'quiero cita']
    },
    required: {
      urgencia: ['symptoms_time', 'red_flags', 'availability'],
      presupuesto: ['treatment', 'first_visit'],
      revision: ['availability'],
      reagendar: ['current_appointment', 'new_preference'],
      cita: ['appointment_reason', 'availability']
    },
    questions: {
      symptoms_time: '¿Desde cuándo tienes la molestia?',
      red_flags: '¿Hay fiebre, hinchazón, sangrado o dolor muy fuerte?',
      availability: '¿Puedes acudir hoy si la clínica tiene hueco?',
      treatment: '¿Sobre qué tratamiento quieres información?',
      first_visit: '¿Ya eres paciente de la clínica o sería primera visita?',
      current_appointment: '¿Qué día y hora tenías la cita actual?',
      new_preference: '¿Qué nueva franja te vendría mejor?',
      appointment_reason: '¿La cita es por dolor/urgencia, revisión, limpieza, tratamiento o presupuesto?'
    }
  },
  estetica: {
    terms: ['botox', 'bótox', 'laser', 'láser', 'manchas', 'acido', 'ácido', 'hialuronico', 'hialurónico', 'depilacion', 'depilación', 'tratamiento', 'estetica', 'estética', 'valoracion', 'valoración', 'arrugas', 'labios', 'piel', 'precio'],
    intents: {
      tratamiento: ['tratamiento', 'botox', 'bótox', 'laser', 'láser', 'manchas', 'labios', 'piel', 'arrugas', 'hialuronico', 'hialurónico'],
      precio: ['precio', 'cuanto cuesta', 'cuánto cuesta', 'tarifa', 'presupuesto'],
      cita: ['cita', 'valoracion', 'valoración', 'esta semana', 'hueco']
    },
    required: {
      tratamiento: ['service', 'zone_or_goal', 'first_time'],
      precio: ['service', 'zone_or_goal'],
      cita: ['availability']
    },
    questions: {
      service: '¿Qué tratamiento te interesa exactamente?',
      zone_or_goal: '¿Qué zona o resultado quieres mejorar?',
      first_time: '¿Sería tu primera vez con este tratamiento?',
      availability: '¿Qué día y franja te vendría bien para valoración?'
    }
  },
  legal: {
    terms: ['herencia', 'testamento', 'divorcio', 'custodia', 'inquilino', 'alquiler', 'despido', 'contrato', 'demanda', 'juicio', 'abogado', 'legal', 'documentos', 'plazo', 'notificacion', 'notificación', 'consulta', 'cita', 'llamada', 'reunion', 'reunión', 'agenda'],
    intents: {
      herencia: ['herencia', 'testamento', 'legitima', 'legítima', 'hermanos', 'sucesion', 'sucesión'],
      alquiler: ['inquilino', 'arrendador', 'alquiler', 'impago', 'no paga', 'desahucio'],
      laboral: ['despido', 'finiquito', 'nomina', 'nómina', 'empresa', 'trabajo', 'contrato laboral'],
      familia: ['divorcio', 'custodia', 'pension', 'pensión', 'pareja'],
      cita: ['cita', 'consulta', 'llamada', 'reunion', 'reunión', 'agenda', 'hablar con abogado']
    },
    required: {
      herencia: ['province', 'documents', 'deadline'],
      alquiler: ['role', 'months', 'documents'],
      laboral: ['date', 'documents'],
      familia: ['matter', 'deadline'],
      cita: ['matter', 'deadline']
    },
    questions: {
      province: '¿En qué provincia se tramita el asunto?',
      documents: '¿Tienes documentación o notificación recibida?',
      deadline: '¿Hay algún plazo o fecha límite?',
      role: '¿Actúas como propietario, inquilino o tercero afectado?',
      months: '¿Desde cuándo ocurre?',
      date: '¿Qué fecha aparece en la carta o comunicación?',
      matter: '¿El asunto es divorcio, custodia, pensión u otro tema familiar?'
    }
  },
  formacion: {
    terms: ['formacion', 'formación', 'coaching', 'curso', 'programa', 'mentor', 'mentoria', 'mentoría', 'equipo', 'empresa', 'ventas', 'liderazgo', 'gerentes', 'comerciales', 'alto rendimiento', 'diagnostico', 'diagnóstico', 'objetivo', 'hábitos', 'habitos', 'productividad', 'cultura', 'consultoria', 'consultoría', 'sesion', 'sesión', 'cita', 'llamada', 'reunion', 'reunión', 'agenda'],
    intents: {
      empresa: ['empresa', 'equipo', 'comerciales', 'gerentes', 'mandos', 'ventas', 'in company', 'grupo', 'plantilla'],
      individual: ['para mi', 'para mí', 'individual', 'personal', 'yo solo', 'alto rendimiento', 'coaching personal', 'desarrollo personal'],
      precio: ['precio', 'cuanto cuesta', 'cuánto cuesta', 'tarifa', 'presupuesto', 'coste', 'inversion', 'inversión'],
      programa: ['programa', 'coaching', 'formacion', 'formación', 'curso', 'liderazgo', 'ventas', 'alto rendimiento'],
      cita: ['cita', 'sesion', 'sesión', 'llamada', 'reunion', 'reunión', 'diagnostico', 'diagnóstico', 'agenda']
    },
    required: {
      empresa: ['audience', 'team_size', 'objective', 'timeframe'],
      individual: ['audience', 'objective', 'timeframe'],
      precio: ['audience', 'team_size_or_scope', 'objective'],
      programa: ['audience', 'objective', 'timeframe'],
      cita: ['audience', 'objective']
    },
    questions: {
      audience: '¿Es para ti de forma individual o para un equipo/empresa?',
      team_size: '¿Cuántas personas participarían?',
      team_size_or_scope: '¿Hablamos de programa individual, equipo pequeño o empresa completa?',
      objective: '¿Qué objetivo medible quieres conseguir: ventas, liderazgo, foco, hábitos, cultura o productividad?',
      timeframe: '¿Qué plazo manejas para ver resultados?',
      impact: '¿Qué impacto económico o de rendimiento esperas conseguir?',
      availability: '¿Qué día y franja horaria te vendría bien para hablar?'
    }
  },
  restauracion: {
    terms: ['mesa', 'reserva', 'reservar', 'comer', 'cenar', 'cena', 'restaurante', 'menu', 'menú', 'terraza', 'sin gluten', 'celiaco', 'celíaco', 'alergia', 'grupo', 'evento', 'cumpleaños', 'empresa', 'hora', 'horario', 'hueco', 'turno', 'disponible', 'disponibilidad', 'ocupado', 'libre', 'cambiar', 'cambio', 'modificar'],
    intents: {
      reserva: ['reservar', 'reserva', 'mesa', 'comer', 'cenar', 'terraza'],
      grupo: ['grupo', '25', '20', 'empresa', 'menú cerrado', 'menu cerrado', 'cena de empresa'],
      alergias: ['sin gluten', 'celiaco', 'celíaco', 'alergia', 'intolerancia'],
      evento: ['evento', 'cumpleaños', 'celebracion', 'celebración', 'comida empresa']
    },
    required: {
      reserva: ['date', 'time', 'people'],
      grupo: ['date', 'people', 'menu_type'],
      alergias: ['allergy', 'people'],
      evento: ['date', 'people', 'event_type']
    },
    questions: {
      date: '¿Para qué día sería?',
      time: '¿Qué hora prefieres?',
      people: '¿Para cuántas personas?',
      menu_type: '¿Queréis carta, menú cerrado o propuesta de evento?',
      allergy: '¿Qué alergia o intolerancia tenemos que tener en cuenta?',
      event_type: '¿Qué tipo de evento es?',
      contact_name: '¿A qué nombre dejamos la reserva?',
      contact_phone: '¿Qué teléfono de contacto anotamos?'
    }
  }
};

const OUT_OF_SCOPE_RULES = [
  { id: 'creativo', keywords: ['cuento', 'poema', 'novela', 'cancion', 'canción', 'ensayo', 'redaccion', 'redacción', 'historia inventada', 'chiste', 'inventame', 'invéntame'], label: 'crear contenido general' },
  { id: 'programacion', keywords: ['codigo', 'código', 'python', 'javascript', 'html', 'sql', 'programa en', 'app en', 'script'], label: 'programación o soporte técnico ajeno al servicio' },
  { id: 'deberes', keywords: ['deberes', 'examen', 'tarea', 'tareas', 'tarea escolar', 'deber', 'resumen de libro', 'trabajo de clase', 'trabajo escolar', 'hazme la tarea', 'hacer la tarea'], label: 'tareas escolares o académicas' },
  { id: 'comida', keywords: ['que tengo de comer', 'qué tengo de comer', 'que hay de comer', 'que como', 'qué como', 'que ceno', 'qué ceno', 'receta', 'dieta', 'desayuno', 'almuerzo'], label: 'comida, recetas o dieta' },
  { id: 'actualidad', keywords: ['capital de', 'quien es', 'quién es', 'resultado del partido', 'bitcoin', 'bolsa', 'noticias', 'horoscopo', 'horóscopo', 'tiempo hace', 'clima'], label: 'preguntas generales o de actualidad' },
  { id: 'medico_generico', keywords: ['dolor de cabeza', 'medicamento', 'pastilla', 'diagnostico medico', 'diagnóstico médico'], label: 'consulta médica no cubierta por este agente' }
];

const GENERIC_TASK_VERBS = ['hazme', 'hacerme', 'resuelveme', 'resuélveme', 'escribeme', 'escríbeme', 'redactame', 'redáctame', 'preparame', 'prepárame', 'inventame', 'invéntame', 'creame', 'créame', 'dime una receta', 'traduceme', 'tradúceme'];
const GENERIC_TASK_OBJECTS = ['tarea', 'deberes', 'examen', 'redaccion', 'redacción', 'cuento', 'poema', 'codigo', 'código', 'receta', 'dieta', 'historia', 'resumen', 'trabajo de clase', 'presentacion escolar'];

const CORRECTION_MARKERS = [
  'perdon', 'perdón', 'me he equivocado', 'me equivoque', 'me equivoqué', 'rectifico', 'corrige',
  'corrijo', 'quise decir', 'queria decir', 'quería decir', 'en realidad', 'realmente', 'mejor',
  'no era', 'no es', 'no queria', 'no quería', 'no hoy', 'hoy no', 'no mañana', 'manana no', 'mañana no'
];

const WEEKDAY_WORDS = ['hoy', 'mañana', 'manana', 'lunes', 'martes', 'miercoles', 'miércoles', 'jueves', 'viernes', 'sabado', 'sábado', 'domingo', 'tarde', 'mañana por la mañana', 'manana por la manana', 'noche', 'mediodia', 'mediodía'];

const STOPWORDS = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'al', 'a', 'en', 'por', 'para', 'con', 'sin', 'y', 'o', 'que', 'qué', 'me', 'mi', 'mis', 'tu', 'tus', 'su', 'sus', 'es', 'soy', 'somos', 'quiero', 'necesito', 'tengo', 'hay', 'este', 'esta', 'estos', 'estas', 'como', 'cómo', 'buenos', 'buenas', 'dias', 'días', 'tardes', 'noches', 'hola']);

const sectorSelect = document.querySelector('[data-sector]');
const promptBox = document.querySelector('[data-prompt]');
const sampleList = document.querySelector('[data-samples]');
const runBtn = document.querySelector('[data-run-demo]');
const chatLog = document.querySelector('[data-chat-log]');
const chatInput = document.querySelector('[data-chat-input]');
const chatSend = document.querySelector('[data-chat-send]');
const chatAgentName = document.querySelector('[data-agent-name]');
const apiToggle = document.querySelector('[data-use-api]');

const memory = {};

function norm(text) {
  return (text || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/¿|\?|!|¡|\.|,|;|:/g, ' ').replace(/\s+/g, ' ').trim();
}

function tokens(text) {
  return norm(text).split(' ').filter(t => t && !STOPWORDS.has(t));
}

function stem(token) {
  const t = norm(token);
  return t.length > 6 ? t.slice(0, 6) : t;
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function containsPhrase(text, phrase) {
  return norm(text).includes(norm(phrase));
}

function containsAny(text, words) {
  return words.some(w => containsPhrase(text, w));
}

function escapeRegExp(text) {
  return String(text || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isCorrectionText(text) {
  const clean = norm(text);
  if (!clean) return false;
  const exactMarkers = [
    'perdon', 'perdón', 'me he equivocado', 'me equivoque', 'me equivoqué', 'rectifico', 'corrige',
    'corrijo', 'quise decir', 'queria decir', 'quería decir', 'en realidad', 'realmente',
    'no era', 'no es', 'no queria', 'no quería', 'no hoy', 'hoy no', 'no mañana', 'manana no', 'mañana no'
  ];
  if (exactMarkers.some(m => clean.includes(norm(m)))) return true;
  // Evita el falso positivo: "mejorar ventas" no es una corrección; "mejor mañana" sí.
  if (/\bmejor\b/.test(clean) && /\b(no|sino|prefiero|seria|sería|opcion|opción|hoy|manana|mañana|lunes|martes|miercoles|miércoles|jueves|viernes|sabado|sábado|domingo|tarde|noche)\b/.test(clean)) return true;
  if (/\bno\s+(?:somos|son|seremos|eramos|éramos|es|era)?\s*\d{1,4}\s*(?:personas|pax|comensales)?\s*(?:somos|son|seremos|es|era|sino|mejor)\s+\d{1,4}\b/.test(clean)) return true;
  if (/\bno\s+[^.?!,;]{1,40}\s+(sino|mejor|queria|quería|quiero|es|era)\b/.test(clean)) return true;
  if (/\b(no|mejor)\s+(hoy|manana|mañana|lunes|martes|miercoles|miércoles|jueves|viernes|sabado|sábado|domingo|tarde|noche)\b/.test(clean)) return true;
  return false;
}
function hasNegated(clean, word) {
  const w = norm(word);
  return new RegExp(`\\b(no|nada de|no es|no era|no quiero|no queria|no quería)\\s+(?:para\\s+)?${w}\\b`).test(clean);
}

function hasTomorrowDateReference(text) {
  // En español, “mañana” puede ser tomorrow o morning. Esta función evita
  // que “a las 10 de la mañana” se convierta en fecha “mañana”.
  let clean = norm(text);
  clean = clean
    .replace(/\b(?:a\s+las?|las?|sobre\s+las?)?\s*(?:[01]?\d|2[0-3])(?:[:.][0-5]\d)?\s*(?:h|horas)?\s*(?:de\s+la\s+|por\s+la\s+)?manana\b/g, ' ')
    .replace(/\b(?:por|de|a|en)\s+la\s+manana\b/g, ' ');
  return /\bmanana\b/.test(clean);
}

function hasMorningPeriod(text) {
  const clean = norm(text);
  return /\b(?:por|de|a|en)\s+la\s+manana\b/.test(clean) || /\b(?:[01]?\d|2[0-3])(?:[:.][0-5]\d)?\s*(?:h|horas)?\s*(?:de\s+la\s+)?manana\b/.test(clean);
}

function extractAvailabilityPreference(text) {
  const clean = norm(text);
  const hasToday = /\bhoy\b/.test(clean);
  const hasTomorrow = hasTomorrowDateReference(text);
  const hasAfternoon = /\btarde\b/.test(clean);
  const hasMorning = hasMorningPeriod(text);
  const hasNight = /\bnoche\b/.test(clean);
  const hasMidday = clean.includes('mediodia') || clean.includes('mediodía') || clean.includes('comida');

  if ((/no\s+puedo.*hoy/.test(clean) || /hoy.*no\s+puedo/.test(clean) || /hoy\s+no/.test(clean) || /no\s+hoy/.test(clean)) && hasTomorrow) {
    return hasAfternoon ? 'no puede hoy; prefiere mañana por la tarde' : hasMorning ? 'no puede hoy; prefiere mañana por la mañana' : 'no puede hoy; prefiere mañana';
  }
  if ((/no\s+puedo.*manana/.test(clean) || /manana.*no\s+puedo/.test(clean) || /manana\s+no/.test(clean) || /no\s+manana/.test(clean)) && hasToday) {
    return hasAfternoon ? 'no puede mañana; prefiere hoy por la tarde' : 'no puede mañana; prefiere hoy';
  }
  if ((/mejor.*manana/.test(clean) || /prefiero.*manana/.test(clean) || /queria.*manana/.test(clean) || /quería.*mañana/.test(clean)) && hasTomorrow) {
    return hasAfternoon ? 'prefiere mañana por la tarde' : hasMorning ? 'prefiere mañana por la mañana' : 'prefiere mañana';
  }
  if (/mejor.*hoy/.test(clean) || /prefiero.*hoy/.test(clean)) return hasAfternoon ? 'prefiere hoy por la tarde' : 'prefiere hoy';
  if (/no\s+puedo.*hoy/.test(clean) || /hoy.*no\s+puedo/.test(clean) || /hoy\s+imposible/.test(clean) || /no\s+hoy/.test(clean)) return 'no puede acudir hoy';
  if ((/no\s+puedo.*manana/.test(clean) || /manana.*no\s+puedo/.test(clean) || /no\s+manana/.test(clean)) && hasTomorrow) return 'no puede mañana';
  if (hasTomorrow) return hasAfternoon ? 'mañana por la tarde' : hasMorning ? 'mañana por la mañana' : 'mañana';
  if (hasToday) return hasAfternoon ? 'hoy por la tarde' : hasNight ? 'hoy por la noche' : hasMidday ? 'hoy a mediodía' : 'hoy';
  if (hasAfternoon) return 'prefiere tarde';
  if (hasNight) return 'prefiere noche';
  if (hasMidday) return 'prefiere mediodía';
  return '';
}


function extractCorrectedNumber(text) {
  const clean = norm(text);
  const patterns = [
    /\bno\s+(?:son|somos|serian|serían|es|era)?\s*\d{1,4}\s*(?:personas|pax|comensales)?\s*(?:son|somos|serian|serían|mejor|sino|es|era)\s+(\d{1,4})\b/,
    /(?:he\s+dicho|dije|corregido|correcto\s+es|correcta\s+es|realmente|en\s+realidad|mejor|somos|son|serian|serían|seria|sería)\s+(\d{1,4})\b/
  ];
  for (const p of patterns) {
    const m = clean.match(p);
    if (m) return Number(m[1]);
  }
  return null;
}


function extractPeopleCount(text, allowBareNumber = false) {
  const clean = norm(text);
  const raw = text || '';
  const correction = extractCorrectedNumber(text);
  if (correction && correction > 0 && correction <= 300 && /\b(personas|pax|comensales|somos|son|seremos|serian|serían|mesa|reserva|grupo|he dicho|dije)\b/.test(clean)) {
    return correction;
  }
  const patterns = [
    /\bno\s+\d{1,3}\s*(?:personas|pax|comensales)?\s*(?:son|somos|serian|serían|mejor|sino|es|era)\s+(\d{1,3})\b/i,
    /\b(?:he\s+dicho|dije|somos|son|seremos|serian|serían|seria|sería|mesa\s+para|reserva\s+para|grupo\s+de|comensales?)\s+(\d{1,3})\s*(?:personas|pax|comensales)?\b/i,
    /\bpara\s+(\d{1,3})\s*(?:personas|pax|comensales)?\b/i,
    /\b(\d{1,3})\s*(?:personas|pax|comensales)\b/i
  ];
  for (const p of patterns) {
    const flags = p.flags.includes('g') ? p.flags : p.flags + 'g';
    const re = new RegExp(p.source, flags);
    const rawMatches = [...raw.matchAll(re)];
    const cleanMatches = rawMatches.length ? rawMatches : [...clean.matchAll(new RegExp(p.source, flags))];
    const selected = isCorrectionText(text) && cleanMatches.length ? cleanMatches[cleanMatches.length - 1] : cleanMatches[0];
    if (selected) {
      const n = Number(selected[1]);
      if (Number.isFinite(n) && n > 0 && n <= 300) return n;
    }
  }
  if (allowBareNumber && /^\d{1,3}$/.test(clean)) {
    const n = Number(clean);
    if (n > 0 && n <= 300) return n;
  }
  return null;
}


function titleCaseName(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function cleanContactNameCandidate(value) {
  let name = String(value || '').trim();
  name = name.replace(/\b(?:telefono|teléfono|tel|movil|móvil|whatsapp|numero|número|contacto)\b.*$/i, '').trim();
  name = name.replace(/\b(?:para|personas|comensales|pax|fecha|dia|día|hora|reserva|mesa|menu|menú|alergia)\b.*$/i, '').trim();
  name = name.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]/g, ' ').replace(/\s+/g, ' ').trim();
  const blocked = new Set(['nombre', 'telefono', 'teléfono', 'contacto', 'reserva', 'mesa', 'personas', 'menu', 'menú', 'el', 'la', 'los', 'las', 'mi', 'mis', 'su', 'sus']);
  const parts = name.split(' ').filter(p => p.length >= 2 && !blocked.has(norm(p))).slice(0, 4);
  if (!parts.length) return '';
  return titleCaseName(parts.join(' '));
}

function extractPhoneNumber(text) {
  const raw = String(text || '');
  const matches = [...raw.matchAll(/(?:\+?34[\s.-]*)?(?:[6789][\s.-]*\d[\s.-]*\d[\s.-]*\d[\s.-]*\d[\s.-]*\d[\s.-]*\d[\s.-]*\d[\s.-]*\d)/g)]
    .map(m => m[0].replace(/\D/g, ''))
    .map(num => num.startsWith('34') && num.length === 11 ? num.slice(2) : num)
    .filter(num => /^[6789]\d{8}$/.test(num));
  if (!matches.length) return '';
  return matches[matches.length - 1];
}

function isAwaitingContact(state = {}) {
  const pending = state.pendingFields || [];
  const last = norm(state.lastBotResponse || '');
  return Boolean(state.awaitingContact)
    || pending.includes('contact_name')
    || pending.includes('contact_phone')
    || (/\b(solo falta|falta|confirmar|confirma|necesito|faltaria|faltaría)\b/.test(last) && /\bnombre\b/.test(last) && /\b(telefono|teléfono|contacto)\b/.test(last));
}

function extractContactDetails(text, state = {}) {
  const raw = String(text || '').trim();
  const clean = norm(raw);
  const contact = {};
  const phone = extractPhoneNumber(raw);
  if (phone) contact.contact_phone = phone;

  const explicitNamePatterns = [
    /(?:mi\s+nombre\s+es|nombre\s*(?:es|:)?|me\s+llamo|a\s+nombre\s+de|se\s+llama)\s+([A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]{2,60})/i,
    /(?:cambia|cambiar|corrige|rectifica|actualiza|modifica).{0,25}\bnombre\b\s*(?:a|por|es)?\s*([A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]{2,60})/i,
    /\b(?:no\s+(?:soy|es|era)\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]{2,30}\s+(?:soy|es|era|sino)\s+)([A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]{2,60})/i
  ];
  for (const p of explicitNamePatterns) {
    const matches = [...raw.matchAll(new RegExp(p.source, p.flags.includes('g') ? p.flags : p.flags + 'g'))];
    if (!matches.length) continue;
    const candidate = cleanContactNameCandidate(matches[matches.length - 1][1]);
    if (candidate) { contact.contact_name = candidate; break; }
  }

  if (!contact.contact_name && isAwaitingContact(state) && !/^\s*(?:cambia|cambiar|corrige|corregir|actualiza|actualizar|modifica|modificar|el|la|los|las|mi|mis|su|sus)\b/i.test(raw) && !/^\s*(?:el|la|los|las|mi|mis|su|sus)\s+(?:telefono|teléfono|tel|movil|móvil|whatsapp|numero|número)/i.test(raw)) {
    const pendingInline = raw.match(/^\s*([A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]{2,45})\s+(?:telefono|teléfono|tel|movil|móvil|whatsapp|\+?34|[6789]\d)/i);
    if (pendingInline) contact.contact_name = cleanContactNameCandidate(pendingInline[1]);
    if (!contact.contact_name) {
      const soy = raw.match(/^\s*(?:soy|me\s+llamo)\s+([A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]{2,45})\s*$/i);
      if (soy) contact.contact_name = cleanContactNameCandidate(soy[1]);
    }
  }

  if (!contact.contact_name && /\bnombre\b/.test(clean)) {
    const afterName = raw.split(/nombre\s*(?:es|:)?/i).pop();
    const candidate = cleanContactNameCandidate(afterName || '');
    if (candidate) contact.contact_name = candidate;
  }
  return contact;
}

function contactMissingFields(context = {}) {
  const missing = [];
  if (!context.contact_name) missing.push('contact_name');
  if (!context.contact_phone) missing.push('contact_phone');
  return missing;
}

function formatMissingContact(missing = []) {
  if (missing.includes('contact_name') && missing.includes('contact_phone')) return 'nombre y teléfono de contacto';
  if (missing.includes('contact_name')) return 'nombre de la reserva';
  if (missing.includes('contact_phone')) return 'teléfono de contacto';
  return '';
}

function hasCompleteRestaurantCore(context = {}) {
  return Boolean(context.people && context.date && context.time);
}

function hasExplicitMenuType(text) {
  return containsAny(text, ['menu cerrado', 'menú cerrado', 'carta', 'propuesta de evento', 'propuesta para evento', 'menú degustación', 'menu degustacion']);
}

function inferMenuType(text) {
  if (containsAny(text, ['menu cerrado', 'menú cerrado'])) return 'menú cerrado';
  if (containsAny(text, ['menú degustación', 'menu degustacion'])) return 'menú degustación';
  if (containsAny(text, ['carta'])) return 'carta';
  if (containsAny(text, ['propuesta de evento', 'propuesta para evento'])) return 'propuesta de evento';
  return '';
}

function normalizeRestaurantIntent(intent, context = {}, text = '') {
  const clean = norm(text);
  const people = Number(context.people || 0);
  const hasGroupSignal = containsAny(clean, ['grupo', 'empresa', 'evento', 'cumpleaños', 'celebracion', 'celebración', 'menu cerrado', 'menú cerrado', 'comida de empresa', 'cena de empresa']);
  if ((intent === 'grupo' || intent === 'evento') && people > 0 && people <= 12 && !hasGroupSignal && !context.menu_type && !context.event_type) {
    return 'reserva';
  }
  if (people >= 10 || hasGroupSignal || context.menu_type || context.event_type) {
    return intent === 'evento' ? 'evento' : 'grupo';
  }
  return intent || 'reserva';
}

function sanitizeEntities(sector, text, entities, state) {
  const e = { ...(entities || {}) };
  if (sector !== 'restauracion') return e;
  const clean = norm(text);
  const explicitPeople = extractPeopleCount(text, false);
  if (explicitPeople) e.people = explicitPeople;
  if (e.people && !explicitPeople && /\b(?:dia|día)\s+\d{1,2}\b/.test(clean)) delete e.people;
  if (e.menu_type && !hasExplicitMenuType(text)) delete e.menu_type;
  if (e.event_type && !containsAny(text, ['evento', 'cumpleaños', 'celebracion', 'celebración', 'empresa', 'comunion', 'comunión'])) delete e.event_type;
  const exactTime = extractTimeAnswer(text);
  if (exactTime) e.time = exactTime;
  if (e.time === 'mañana' && /\b(?:[01]?\d|2[0-3])\b/.test(clean)) delete e.time;
  return e;
}

function correctionFieldsFor(sector, context) {
  const base = {
    inmobiliaria: ['operation', 'zone', 'property_type', 'sqm', 'bedrooms', 'budget', 'availability'],
    dental: ['symptoms_time', 'availability', 'red_flags', 'treatment', 'appointment_reason'],
    estetica: ['service', 'zone_or_goal', 'first_time', 'availability'],
    legal: ['matter', 'province', 'documents', 'deadline', 'availability'],
    formacion: ['audience', 'team_size', 'objective', 'timeframe', 'availability'],
    restauracion: ['people', 'date', 'time', 'allergy', 'menu_type', 'event_type', 'contact_name', 'contact_phone', 'availability']
  };
  return base[sector] || Object.keys(context);
}

function countPhraseHits(text, words) {
  const clean = norm(text);
  return words.reduce((acc, w) => acc + (clean.includes(norm(w)) ? 1 : 0), 0);
}

function scoreKeywordSet(text, keywords) {
  const clean = norm(text);
  const userTokens = tokens(clean).map(stem);
  let score = 0;
  keywords.forEach(k => {
    const nk = norm(k);
    if (!nk) return;
    if (clean.includes(nk)) {
      score += nk.includes(' ') ? 3 : 2;
      return;
    }
    const parts = tokens(nk).map(stem);
    if (parts.length && parts.some(p => userTokens.includes(p))) score += 1;
  });
  return score;
}

function getState(sector) {
  if (!memory[sector]) {
    memory[sector] = {
      sector,
      context: {},
      lastIntent: '',
      pendingFields: [],
      awaitingSlot: false,
      awaitingContact: false,
      awaitingAgendaDate: false,
      pendingAgendaDate: '',
      pendingAgendaWindow: '',
      offeredSlots: [],
      offeredSlotHistory: [],
      turn: 0,
      lastQuestion: '',
      lastUserText: '',
      lastBotResponse: ''
    };
  }
  return memory[sector];
}

function resetState(sector) {
  memory[sector] = {
    sector,
    context: {},
    lastIntent: '',
    pendingFields: [],
    awaitingSlot: false,
    awaitingContact: false,
    awaitingAgendaDate: false,
    pendingAgendaDate: '',
    pendingAgendaWindow: '',
    offeredSlots: [],
    offeredSlotHistory: [],
    turn: 0,
    lastQuestion: '',
    lastUserText: '',
    lastBotResponse: ''
  };
  return memory[sector];
}

function isPureGreeting(text) {
  const clean = norm(text);
  if (!clean) return false;
  const greetingPhrases = ['hola', 'buenas', 'buenos dias', 'buen dia', 'buenos días', 'buenas tardes', 'buenas noches', 'hey', 'que tal', 'qué tal', 'como estas', 'cómo estás'];
  const hasGreeting = greetingPhrases.some(g => clean.includes(norm(g)));
  if (!hasGreeting) return false;
  const meaningful = tokens(clean).filter(t => !['hola', 'buenas', 'buenos', 'dias', 'dia', 'tardes', 'noches', 'hey', 'tal', 'como', 'estas', 'esta', 'va', 'todo'].includes(t));
  return meaningful.length === 0;
}

function hasGreetingPrefix(text) {
  const clean = norm(text);
  return ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'hey'].some(g => clean.startsWith(norm(g)));
}

function detectOutOfScope(sector, text) {
  const clean = norm(text);
  const selectedDomainScore = scoreKeywordSet(text, DOMAIN_RULES[sector].terms);
  const allDomainScore = Object.values(DOMAIN_RULES).reduce((max, rules) => Math.max(max, scoreKeywordSet(text, rules.terms)), 0);

  const directRule = OUT_OF_SCOPE_RULES.find(r => containsAny(clean, r.keywords));
  if (directRule) {
    if (sector === 'restauracion' && directRule.id === 'comida') {
      const reservationSignal = scoreKeywordSet(text, DOMAIN_RULES.restauracion.terms);
      if (reservationSignal >= 2 && containsAny(text, ['reservar', 'mesa', 'restaurante', 'menu', 'menú', 'terraza', 'sin gluten', 'grupo'])) return null;
    }
    if (sector === 'dental' && directRule.id === 'medico_generico' && containsAny(text, ['diente', 'muela', 'encia', 'encía'])) return null;
    return directRule;
  }

  // Filtro semántico simple: si el usuario pide una tarea genérica y no aporta señales del negocio,
  // no se arrastra el contexto anterior. Ejemplo: después de hablar de una muela, "hazme la tarea"
  // debe salir del ámbito, no volver a mostrar huecos de clínica.
  const asksGenericTask = containsAny(clean, GENERIC_TASK_VERBS) || containsAny(clean, GENERIC_TASK_OBJECTS);
  const hasGenericObject = containsAny(clean, GENERIC_TASK_OBJECTS);
  if (asksGenericTask && hasGenericObject && selectedDomainScore === 0) {
    return { id: 'tarea_general', label: 'peticiones generales que no pertenecen al servicio' };
  }

  const veryShort = tokens(text).length <= 5;
  const hasActionVerb = containsAny(clean, ['hazme', 'dime', 'cuentame', 'cuéntame', 'resuelve', 'explicame', 'explícame']);
  if (veryShort && hasActionVerb && selectedDomainScore === 0 && allDomainScore === 0) {
    return { id: 'accion_generica', label: 'peticiones generales sin relación con el negocio' };
  }

  return null;
}

function isYesNoAnswer(text) {
  const clean = norm(text);
  return /^(si|sí|no|vale|ok|correcto|claro|puedo|no puedo)(\s|$)/.test(clean);
}

function isLikelyFieldAnswer(sector, text, state) {
  const pending = state.pendingFields || [];
  if (!pending.length) return false;
  const clean = norm(text);
  const wordCount = tokens(text).length;
  const pureNumber = /^\d{1,4}$/.test(clean);
  const hasNumber = /\b\d{1,4}\b/.test(clean);
  const has = (words) => containsAny(clean, words);

  return pending.some(field => {
    if (field === 'contact_name') return /\b(nombre|me llamo|soy)\b/.test(clean) || (wordCount >= 1 && wordCount <= 4 && !hasNumber);
    if (field === 'contact_phone') return Boolean(extractPhoneNumber(text));
    if (field === 'audience') return has(['para mi', 'para mí', 'individual', 'yo', 'personal', 'equipo', 'empresa', 'grupo', 'comerciales', 'gerentes']);
    if (field === 'team_size' || field === 'team_size_or_scope' || field === 'people') return hasNumber || has(['personas', 'comerciales', 'equipo', 'empresa', 'grupo', 'somos']);
    if (field === 'objective' || field === 'need' || field === 'zone_or_goal') return wordCount >= 2 && !has(['hazme', 'tarea', 'deberes', 'cuento', 'codigo', 'código', 'receta']);
    if (field === 'timeframe' || field === 'date' || field === 'deadline') return has(['hoy', 'mañana', 'semana', 'mes', 'trimestre', 'dias', 'días', 'urgente', 'lunes', 'martes', 'miercoles', 'miércoles', 'jueves', 'viernes', 'sabado', 'sábado', 'domingo', 'plazo']);
    if (field === 'symptoms_time') return has(['desde', 'hace', 'ayer', 'dias', 'días', 'semana', 'horas', 'mes']);
    if (field === 'red_flags') return isYesNoAnswer(text) || has(['fiebre', 'hinchazon', 'hinchazón', 'sangrado', 'dolor fuerte', 'insoportable', 'no puedo dormir', 'no puedo tragar']);
    if (field === 'availability' || field === 'new_preference') return isYesNoAnswer(text) || has(['puedo', 'no puedo', 'hoy', 'mañana', 'manana', 'tarde', 'semana', 'hora', 'horario', 'mejor', 'prefiero', 'viernes', 'jueves']);
    if (field === 'operation') return has(['vender', 'venta', 'comprar', 'compra', 'alquiler', 'alquilar', 'visita', 'visitar', 'valoracion', 'valoración', 'tasacion', 'tasación']);
    if (field === 'appointment_reason') return has(['dolor', 'urgencia', 'revision', 'revisión', 'limpieza', 'tratamiento', 'presupuesto', 'implante', 'ortodoncia', 'cita']);
    if (field === 'matter') return has(['herencia', 'divorcio', 'custodia', 'alquiler', 'inquilino', 'despido', 'laboral', 'contrato', 'demanda', 'consulta']);
    if (field === 'budget') return hasNumber || has(['euros', '€', 'presupuesto', 'hasta', 'mil']);
    if (field === 'sqm') return hasNumber || has(['metros', 'm2', 'm²']);
    if (field === 'property_type') return has(['piso', 'casa', 'atico', 'ático', 'local', 'chalet']);
    if (field === 'zone') return wordCount >= 1 && !has(['hazme', 'tarea', 'cuento', 'codigo', 'código']);
    if (field === 'treatment' || field === 'service') return wordCount >= 1;
    return wordCount > 0 && wordCount <= 12;
  });
}

function classifyIntent(sector, text, state) {
  const rules = DOMAIN_RULES[sector];
  let bestIntent = 'consulta';
  let bestScore = 0;
  Object.entries(rules.intents).forEach(([intent, keywords]) => {
    const score = scoreKeywordSet(text, keywords);
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  });
  const domainScore = scoreKeywordSet(text, rules.terms);
  const fieldAnswer = isLikelyFieldAnswer(sector, text, state);
  if (bestScore === 0 && fieldAnswer) bestIntent = state.lastIntent || 'consulta';
  return { intent: bestIntent, intentScore: bestScore, domainScore, fieldAnswer, inScope: bestScore > 0 || domainScore > 0 || fieldAnswer };
}

function extractNumber(pattern, text) {
  const m = (text || '').match(pattern);
  return m ? Number(String(m[1]).replace('.', '').replace(',', '.')) : null;
}

function extractBudget(text) {
  const clean = norm(text);
  const raw = text || '';
  const patterns = [
    /(?:presupuesto|maximo|máximo|tope|limite|límite|hasta|no mas de|no más de|máx|max)\s*(?:de\s*)?(\d{1,3}(?:[\.\s]\d{3})+|\d{2,7})\s*(k|mil|€|eur|euros)?/i,
    /(\d{1,3}(?:[\.\s]\d{3})+|\d{4,7})\s*(€|eur|euros)/i,
    /(\d{2,4})\s*(k|mil)/i,
    /(?:entre\s+)?(\d{2,7})\s*(?:€|eur|euros)/i
  ];
  for (const p of patterns) {
    const m = raw.match(p) || clean.match(p);
    if (!m) continue;
    const value = parseMoneyNumber(m[1], m[2] || '');
    if (value) return value;
  }
  return null;
}

function extractTimeframe(text) {
  const clean = norm(text);
  const availability = extractAvailabilityPreference(text);
  if (availability && /hoy|mañana|manana|tarde|noche|mediod/.test(norm(availability))) return availability;
  const phrases = ['esta semana', 'este mes', 'este trimestre', 'trimestre', '90 dias', '90 días', '30 dias', '30 días', 'urgente', 'antes de verano', 'septiembre', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'octubre', 'noviembre', 'diciembre', 'hoy', 'mañana'];
  const found = phrases.find(p => clean.includes(norm(p)));
  return found || '';
}


function parseMoneyNumber(rawNumber, suffix = '') {
  if (!rawNumber) return null;
  const suffixClean = norm(suffix || '');
  const original = String(rawNumber).trim();
  let n = Number(original.replace(/[\.\s]/g, '').replace(',', '.'));
  if (!Number.isFinite(n) || n <= 0) return null;
  const hasThousandsSeparator = /\d[\.\s]\d{3}/.test(original);
  if (suffixClean === 'k' || suffixClean === 'mil') return n * 1000;
  if (hasThousandsSeparator) return n;
  // Sin divisa, "350" en inmobiliaria suele significar 350.000; con "euros", 2000 euros son 2.000.
  if (!suffixClean && n >= 30 && n <= 999) return n * 1000;
  return n;
}

function extractExplicitNumber(text) {
  const clean = norm(text);
  const m = clean.match(/\b(\d{1,7})\b/);
  return m ? Number(m[1]) : null;
}

function extractZoneAnswer(text) {
  const raw = (text || '').trim();
  const clean = norm(raw);
  if (!raw || clean.length < 3) return '';
  if (/\d/.test(clean) && !/(zona|barrio|urbanizacion|urbanización|en|por)/i.test(raw)) return '';
  const explicit = raw.match(/(?:en|por|zona|barrio|urbanización|urbanizacion)\s+([a-záéíóúñ0-9\s\-]{3,50}?)(?:,|\.|;|\?|$|\s+con\s+|\s+de\s+\d|\s+hasta\s+|\s+maximo\s+|\s+máximo\s+)/i);
  if (explicit) return explicit[1].trim();
  const blocked = ['si', 'sí', 'no', 'vale', 'ok', 'presupuesto', 'euros', 'm2', 'metros', 'habitaciones', 'dormitorios', 'hazme', 'tarea', 'cuento'];
  if (blocked.some(w => clean.includes(norm(w)))) return '';
  if (tokens(raw).length >= 1 && tokens(raw).length <= 6) return raw.replace(/[.?!,;:]+$/g, '').trim();
  return '';
}


function extractDateAnswer(text) {
  const clean = norm(text);
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
  const monthPattern = months.join('|');
  const naturalRe = new RegExp(`\\b(?:para\\s+el\\s+)?(?:dia\\s+)?(\\d{1,2})\\s*(?:de\\s+)?(${monthPattern})(?:\\s+de\\s+(\\d{2,4}))?\\b`, 'g');
  const naturalMatches = [...clean.matchAll(naturalRe)];
  if (naturalMatches.length) {
    const natural = isCorrectionText(text) ? naturalMatches[naturalMatches.length - 1] : naturalMatches[0];
    return `${Number(natural[1])} de ${natural[2]}${natural[3] ? ` de ${natural[3]}` : ''}`;
  }
  const isoMatches = [...clean.matchAll(/\b(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?\b/g)];
  if (isoMatches.length) return (isCorrectionText(text) ? isoMatches[isoMatches.length - 1] : isoMatches[0])[0];
  const known = ['hoy', 'lunes', 'martes', 'miercoles', 'miércoles', 'jueves', 'viernes', 'sabado', 'sábado', 'domingo', 'esta semana', 'semana que viene', 'proxima semana', 'próxima semana'];
  if (hasTomorrowDateReference(text)) return 'mañana';
  const found = known.find(w => clean.includes(norm(w)));
  if (found) return found === 'sabado' ? 'sábado' : found === 'miercoles' ? 'miércoles' : found;
  return '';
}


function extractTimeAnswer(text) {
  const raw = text || '';
  const clean = norm(raw);
  const explicitPatterns = [
    /\b(?:a\s+las?|las?|sobre\s+las?|hora\s*)\s*([01]?\d|2[0-3])(?:[:.]([0-5]\d))?\s*(?:h|horas)?\s*(?:de\s+la\s+|por\s+la\s+)?(manana|tarde|noche)?\b/ig,
    /\b([01]?\d|2[0-3])[:.]([0-5]\d)\s*(?:h|horas)?\b/ig,
    /\b([01]?\d|2[0-3])\s*(h|horas)\b/ig
  ];
  for (const pattern of explicitPatterns) {
    const matches = [...raw.matchAll(pattern)];
    if (!matches.length) continue;
    const explicit = isCorrectionText(text) ? matches[matches.length - 1] : matches[0];
    let hour = Number(explicit[1]);
    const minute = explicit[2] && /^\d{2}$/.test(explicit[2]) ? explicit[2] : '00';
    const period = norm(explicit[3] || '');
    if (period === 'tarde' && hour >= 1 && hour <= 11) hour += 12;
    if (period === 'noche' && hour >= 1 && hour <= 11) hour += 12;
    return `${String(hour).padStart(2, '0')}:${minute}`;
  }
  if (clean.includes('noche')) return 'noche';
  if (clean.includes('tarde')) return 'tarde';
  if (clean.includes('mediodia') || clean.includes('comida')) return 'mediodía';
  if (hasMorningPeriod(text)) return 'mañana';
  return '';
}

function isOnlyBudgetLike(text) {
  const clean = norm(text);
  const withoutBudgetWords = clean
    .replace(/\b(presupuesto|maximo|máximo|tope|limite|límite|hasta|de|euros|eur|€|k|mil|seria|sería|es|son|mi)\b/g, ' ')
    .replace(/[0-9\.\,\s]+/g, ' ')
    .trim();
  return extractBudget(text) && withoutBudgetWords.length <= 2;
}

function extractPreferenceNeed(text) {
  const clean = norm(text);
  const preferenceWords = ['dormitorio', 'dormitorios', 'habitacion', 'habitaciones', 'terraza', 'garaje', 'parking', 'colegio', 'colegios', 'playa', 'rentabilidad', 'piscina', 'ascensor', 'jardin', 'jardín', 'trastero', 'luminoso', 'reformado', 'obra nueva', 'centro', 'transporte'];
  if (containsAny(clean, preferenceWords)) return (text || '').trim();
  if (!isOnlyBudgetLike(text) && tokens(text).length >= 2 && tokens(text).length <= 18 && !containsAny(clean, ['hazme', 'tarea', 'cuento', 'codigo', 'código', 'receta'])) return (text || '').trim();
  return '';
}

function answerBoolean(text) {
  const clean = norm(text);
  if (/^(si|sí|claro|correcto|vale|ok|afirmativo)(\s|$)/.test(clean)) return true;
  if (/^(no|negativo|para nada)(\s|$)/.test(clean)) return false;
  return null;
}

function extractPendingAnswers(sector, text, state, baseEntities = {}) {
  const pending = state.pendingFields || [];
  const clean = norm(text);
  const e = {};
  if (!pending.length) return e;
  const has = (words) => containsAny(clean, words);
  const number = extractExplicitNumber(text);
  const bool = answerBoolean(text);
  const budget = extractBudget(text);
  const availability = extractAvailabilityPreference(text);
  const dateAnswer = extractDateAnswer(text);
  const timeAnswer = extractTimeAnswer(text);
  const wordCount = tokens(text).length;
  const pureNumber = /^\d{1,4}$/.test(clean);
  const peopleCount = extractPeopleCount(text, pureNumber && pending.length === 1 && pending[0] === 'people');
  const contact = extractContactDetails(text, state);

  pending.forEach(field => {
    if (field === 'contact_name') {
      if (contact.contact_name) e.contact_name = contact.contact_name;
      return;
    }
    if (field === 'contact_phone') {
      if (contact.contact_phone) e.contact_phone = contact.contact_phone;
      return;
    }
    if (field === 'budget') {
      if (budget) e.budget = budget;
      return;
    }
    if (field === 'zone') {
      const zone = extractZoneAnswer(text);
      if (zone) e.zone = zone;
      return;
    }
    if (field === 'sqm') {
      const sqm = extractNumber(/(\d{2,4})\s*(?:m2|m²|metros|metro)/i, text);
      if (sqm) e.sqm = sqm;
      else if (wordCount <= 3 && number && number >= 20 && number <= 1000 && !has(['euro', 'euros', '€', 'presupuesto', 'maximo', 'máximo'])) e.sqm = number;
      return;
    }
    if (field === 'bedrooms') {
      const bedrooms = extractNumber(/(\d{1,2})\s*(?:dormitorios|habitaciones|hab|cuartos)/i, text);
      if (bedrooms) e.bedrooms = bedrooms;
      else if (wordCount <= 3 && number && number >= 1 && number <= 10) e.bedrooms = number;
      return;
    }
    if (field === 'property_type') {
      if (has(['piso', 'apartamento'])) e.property_type = 'piso';
      else if (has(['casa', 'chalet', 'adosado', 'villa'])) e.property_type = 'casa/chalet';
      else if (has(['atico', 'ático'])) e.property_type = 'ático';
      else if (has(['local', 'nave'])) e.property_type = 'local';
      return;
    }
    if (field === 'operation') {
      if (has(['vender', 'venta', 'vendo'])) { e.operation = 'vender'; e.intent_override = 'vendedor'; }
      else if (has(['comprar', 'compra', 'busco'])) { e.operation = 'comprar'; e.intent_override = 'comprador'; }
      else if (has(['alquiler', 'alquilar'])) { e.operation = 'alquiler'; e.intent_override = 'alquiler'; }
      else if (has(['visita', 'visitar', 'ver'])) { e.operation = 'visita'; e.intent_override = 'visita'; }
      else if (has(['valorar', 'valoracion', 'valoración', 'tasar'])) { e.operation = 'valoración'; e.intent_override = 'valoracion'; }
      return;
    }
    if (field === 'need') {
      const need = extractPreferenceNeed(text);
      if (need) e.need = need;
      return;
    }
    if (field === 'availability' || field === 'new_preference') {
      if (availability) e[field === 'new_preference' ? 'new_preference' : 'availability'] = availability;
      else if (dateAnswer || timeAnswer) e[field === 'new_preference' ? 'new_preference' : 'availability'] = [dateAnswer, timeAnswer].filter(Boolean).join(' ');
      else if (bool === true) e[field === 'new_preference' ? 'new_preference' : 'availability'] = 'sí puede';
      else if (bool === false) {
        const talksAvailability = /^(no|negativo)$/.test(clean) || has(['puedo', 'acudir', 'ir', 'hoy', 'mañana', 'manana', 'franja', 'hora', 'horario']);
        const talksSymptoms = has(['fiebre', 'sangrado', 'hinchazon', 'hinchazón', 'dolor', 'tragar', 'respirar']);
        if (talksAvailability && !talksSymptoms) e[field === 'new_preference' ? 'new_preference' : 'availability'] = 'no puede / necesita alternativa';
      }
      return;
    }
    if (field === 'symptoms_time') {
      if (has(['desde', 'hace', 'ayer', 'semana', 'dias', 'días', 'horas'])) {
        if (clean.includes('semana')) e.symptoms_time = 'desde la semana pasada';
        else if (clean.includes('ayer')) e.symptoms_time = 'desde ayer';
        else {
          const days = clean.match(/(?:hace\s*)?(\d{1,2})\s*(?:dias?|días?|horas?)/);
          if (days) e.symptoms_time = clean.includes('hora') ? `desde hace ${days[1]} horas` : `desde hace ${days[1]} días`;
          else e.symptoms_time = (text || '').trim();
        }
      }
      return;
    }
    if (field === 'red_flags') {
      const redSignals = ['fiebre', 'hinchazon', 'hinchazón', 'sangrado', 'sangra', 'dolor fuerte', 'insoportable', 'no puedo dormir', 'no puedo tragar', 'no puedo respirar'];
      const negatedRed = /\b(no|sin)\b.{0,30}(fiebre|hinchazon|hinchazón|sangrado|sangra|dolor fuerte)/.test(clean);
      if (negatedRed && has(['hinchazon', 'hinchazón', 'hinchada', 'ninguna', 'ningun', 'ningún'])) e.red_flags = false;
      else if (negatedRed) { /* no actualiza: negar fiebre/sangrado no elimina una hinchazón previa */ }
      else if (bool === false) e.red_flags = false;
      else if (has(redSignals) || bool === true) e.red_flags = true;
      return;
    }
    if (field === 'appointment_reason') {
      if (has(['dolor', 'urgencia', 'muela', 'diente'])) e.appointment_reason = 'dolor/urgencia';
      else if (has(['revision', 'revisión', 'limpieza'])) e.appointment_reason = 'revisión/limpieza';
      else if (has(['presupuesto', 'precio', 'implante', 'ortodoncia', 'tratamiento'])) e.appointment_reason = 'presupuesto/tratamiento';
      else if (wordCount >= 1 && wordCount <= 10) e.appointment_reason = (text || '').trim();
      return;
    }
    if (field === 'treatment' || field === 'service') {
      if (has(['implante'])) e[field] = 'implantes';
      else if (has(['ortodoncia', 'brackets', 'invisalign'])) e[field] = 'ortodoncia';
      else if (has(['limpieza'])) e[field] = 'limpieza';
      else if (has(['botox', 'bótox'])) e[field] = 'bótox';
      else if (has(['laser', 'láser'])) e[field] = 'láser';
      else if (has(['hialuronico', 'hialurónico', 'labios'])) e[field] = 'ácido hialurónico/labios';
      else if (wordCount >= 1 && wordCount <= 10 && !containsAny(clean, ['hazme', 'tarea', 'cuento', 'codigo', 'código'])) e[field] = (text || '').trim();
      return;
    }
    if (field === 'first_visit' || field === 'first_time') {
      if (has(['primera vez', 'nuevo', 'nunca', 'no soy paciente'])) e[field] = 'sí';
      else if (has(['ya soy paciente', 'ya he ido', 'repetir'])) e[field] = 'no, ya es cliente/paciente';
      else if (bool !== null) e[field] = bool ? 'sí' : 'no';
      return;
    }
    if (field === 'audience') {
      if (has(['para mi', 'para mí', 'individual', 'yo solo', 'personal'])) e.audience = 'individual';
      else if (has(['equipo', 'empresa', 'grupo', 'comerciales', 'gerentes', 'mandos', 'plantilla'])) e.audience = 'equipo/empresa';
      return;
    }
    if (field === 'team_size' || field === 'team_size_or_scope' || field === 'people') {
      if (field === 'people') {
        if (peopleCount) e.people = peopleCount;
      } else if (number) {
        e.team_size = number;
      } else if (has(['individual', 'para mi', 'para mí'])) e.audience = 'individual';
      else if (has(['equipo', 'empresa'])) e.audience = 'equipo/empresa';
      return;
    }
    if (field === 'objective' || field === 'zone_or_goal') {
      const objectives = [];
      if (has(['ventas', 'comercial', 'captacion', 'captación', 'cerrar mas', 'cerrar más'])) objectives.push('ventas');
      if (has(['liderazgo', 'gerentes', 'mandos', 'direccion', 'dirección'])) objectives.push('liderazgo');
      if (has(['alto rendimiento', 'foco', 'productividad', 'habitos', 'hábitos', 'disciplina'])) objectives.push('alto rendimiento/productividad');
      if (has(['manchas', 'frente', 'patas de gallo', 'cara', 'piel', 'labios', 'arrugas'])) objectives.push('zona/objetivo indicado');
      if (objectives.length) e[field] = unique(objectives).join(', ');
      else if (wordCount >= 2 && wordCount <= 18 && !containsAny(clean, ['hazme', 'tarea', 'cuento', 'codigo', 'código', 'receta'])) e[field] = (text || '').trim();
      return;
    }
    if (field === 'timeframe' || field === 'deadline' || field === 'date') {
      const tf = field === 'date' ? dateAnswer : extractTimeframe(text);
      if (tf) e[field] = tf;
      else if (dateAnswer) e[field] = dateAnswer;
      else if (field === 'deadline' && bool === false) e.deadline = 'sin plazo indicado';
      else if (field === 'deadline' && bool === true) e.deadline = 'hay plazo posible';
      return;
    }
    if (field === 'time') {
      if (!(sector === 'restauracion' && pending.includes('people') && pureNumber) && timeAnswer) e.time = timeAnswer;
      return;
    }
    if (field === 'matter') {
      if (has(['herencia', 'testamento'])) e.matter = 'herencia';
      else if (has(['divorcio', 'custodia', 'pension', 'pensión'])) e.matter = 'familia';
      else if (has(['alquiler', 'inquilino', 'desahucio', 'impago'])) e.matter = 'alquiler';
      else if (has(['despido', 'laboral', 'finiquito', 'nomina', 'nómina'])) e.matter = 'laboral';
      else if (wordCount >= 1 && wordCount <= 12) e.matter = (text || '').trim();
      return;
    }
    if (field === 'province') {
      const zone = extractZoneAnswer(text);
      if (zone) e.province = zone;
      else if (wordCount >= 1 && wordCount <= 5 && !/\d/.test(clean)) e.province = (text || '').trim();
      return;
    }
    if (field === 'documents') {
      if (has(['testamento', 'contrato', 'carta', 'notificacion', 'notificación', 'documento', 'documentacion', 'documentación'])) e.documents = 'documentación mencionada';
      else if (bool !== null) e.documents = bool ? 'sí tiene documentación' : 'no tiene documentación todavía';
      return;
    }
    if (field === 'role') {
      if (has(['propietario', 'dueño', 'arrendador'])) e.role = 'propietario/arrendador';
      else if (has(['inquilino', 'arrendatario'])) e.role = 'inquilino';
      else if (wordCount >= 1 && wordCount <= 8) e.role = (text || '').trim();
      return;
    }
    if (field === 'months') {
      const months = extractNumber(/(\d{1,2})\s*(?:meses|años|anos)/i, text);
      if (months) e.months = months;
      else if (number) e.months = number;
      return;
    }
    if (field === 'allergy') {
      if (has(['sin gluten', 'celiaco', 'celíaco', 'alergia', 'intolerancia'])) e.allergy = (text || '').trim();
      else if (bool === false) e.allergy = 'sin alergias indicadas';
      return;
    }
    if (field === 'menu_type') {
      const menu = inferMenuType(text);
      if (menu) e.menu_type = menu;
      return;
    }
    if (field === 'event_type') {
      if (has(['cumpleaños', 'empresa', 'evento', 'comunion', 'comunión'])) e.event_type = (text || '').trim();
      return;
    }
  });

  // Si el usuario contesta algo útil del negocio aunque no sea exactamente la primera pregunta pendiente,
  // lo aceptamos: responde a "otra cosa del caso" y el agente avanza con esa información.
  if (!e.budget && budget && ['inmobiliaria', 'formacion', 'estetica', 'dental'].includes(sector)) e.budget = budget;
  if (sector === 'restauracion' && pending.includes('people') && pureNumber && e.people) delete e.time;
  if (!e.availability && availability) e.availability = availability;
  return Object.fromEntries(Object.entries(e).filter(([, v]) => v !== null && v !== '' && v !== undefined));
}

function extractEntities(sector, text, state) {
  const clean = norm(text);
  const e = {};
  Object.assign(e, extractContactDetails(text, state));
  const correction = isCorrectionText(text);
  const availabilityPreference = extractAvailabilityPreference(text);
  const correctedNumber = extractCorrectedNumber(text);
  if (availabilityPreference) e.availability = availabilityPreference;
  const budget = extractBudget(text);
  if (budget) e.budget = budget;
  const timeframe = extractTimeframe(text);
  if (timeframe) e.timeframe = timeframe;

  if (sector === 'formacion') {
    const saysIndividual = containsAny(text, ['para mi', 'para mí', 'individual', 'yo solo', 'personal', 'solo para mi', 'solo para mí']);
    const saysTeam = containsAny(text, ['equipo', 'empresa', 'comerciales', 'gerentes', 'grupo', 'plantilla', 'mandos']);
    const negatesTeam = hasNegated(clean, 'equipo') || hasNegated(clean, 'empresa') || clean.includes('no es para equipo') || clean.includes('no para equipo');
    const negatesIndividual = clean.includes('no es para mi') || clean.includes('no para mi') || clean.includes('no individual');
    if ((saysIndividual && !negatesIndividual) || (correction && negatesTeam && saysIndividual)) e.audience = 'individual';
    if ((saysTeam && !negatesTeam) || (correction && negatesIndividual && saysTeam)) e.audience = 'equipo/empresa';
    let people = extractNumber(/(?:equipo\s+de|grupo\s+de|somos|participan|para)\s*(\d{1,4})/i, text) || extractNumber(/(\d{1,4})\s*(?:personas|comerciales|gerentes|mandos|participantes|alumnos)/i, text);
    if (correctedNumber) people = correctedNumber;
    if (people && e.audience !== 'individual' && state.context.audience !== 'individual') e.team_size = people;
    const objectives = [];
    if (containsAny(text, ['ventas', 'comercial', 'cerrar mas', 'cerrar más', 'captacion', 'captación'])) objectives.push('ventas');
    if (containsAny(text, ['liderazgo', 'gerentes', 'mandos', 'direccion', 'dirección'])) objectives.push('liderazgo');
    if (containsAny(text, ['alto rendimiento', 'foco', 'productividad', 'habitos', 'hábitos', 'disciplina'])) objectives.push('alto rendimiento/productividad');
    if (containsAny(text, ['cultura', 'motivacion', 'motivación', 'cohesion', 'cohesión'])) objectives.push('cultura/equipo');
    if (objectives.length) e.objective = unique(objectives).join(', ');
    if (!e.audience && state.pendingFields.includes('audience') && containsAny(text, ['yo solo', 'para mi', 'para mí', 'personal'])) e.audience = 'individual';
  }

  if (sector === 'inmobiliaria') {
    const negComprar = hasNegated(clean, 'comprar') || clean.includes('no quiero comprar') || clean.includes('no es para comprar');
    const negVender = hasNegated(clean, 'vender') || clean.includes('no quiero vender') || clean.includes('no es para vender');
    const negAlquilar = hasNegated(clean, 'alquilar') || hasNegated(clean, 'alquiler') || clean.includes('no es alquiler');
    if (containsAny(text, ['vender', 'vendo', 'venta', 'valorar para vender']) && !negVender) { e.operation = 'vender'; e.intent_override = 'vendedor'; }
    if (containsAny(text, ['comprar', 'compra', 'busco vivienda', 'busco piso', 'quiero comprar']) && !negComprar) { e.operation = 'comprar'; e.intent_override = 'comprador'; }
    if (containsAny(text, ['alquilar', 'alquiler']) && !negAlquilar) { e.operation = 'alquiler'; e.intent_override = 'alquiler'; }
    if (containsAny(text, ['visitar', 'visita', 'ver un piso', 'ver una casa']) && !hasNegated(clean, 'visita')) { e.operation = 'visita'; e.intent_override = 'visita'; }
    if (containsAny(text, ['valorar', 'valoracion', 'valoración', 'tasar', 'tasacion', 'tasación']) && !hasNegated(clean, 'valorar')) { e.operation = 'valoración'; e.intent_override = 'valoracion'; }

    let sqm = extractNumber(/(\d{2,4})\s*(?:m2|m²|metros|metro)/i, text);
    if (correctedNumber && (state.pendingFields.includes('sqm') || containsAny(text, ['m2', 'm²', 'metros']))) sqm = correctedNumber;
    if (sqm) e.sqm = sqm;
    let bedrooms = extractNumber(/(\d{1,2})\s*(?:dormitorios|habitaciones|hab|cuartos)/i, text);
    if (correctedNumber && containsAny(text, ['dormitorios', 'habitaciones', 'hab'])) bedrooms = correctedNumber;
    if (bedrooms) e.bedrooms = bedrooms;
    if (containsAny(text, ['piso', 'apartamento']) && !hasNegated(clean, 'piso')) e.property_type = 'piso';
    if (containsAny(text, ['casa', 'chalet', 'adosado', 'villa']) && !hasNegated(clean, 'casa')) e.property_type = 'casa/chalet';
    if (containsAny(text, ['atico', 'ático']) && !hasNegated(clean, 'atico')) e.property_type = 'ático';
    if (containsAny(text, ['local', 'nave']) && !hasNegated(clean, 'local')) e.property_type = 'local';
    if (containsAny(text, ['reformado', 'renovado'])) e.condition = 'reformado';
    if (containsAny(text, ['obra nueva', 'a estrenar'])) e.condition = 'obra nueva';
    if (containsAny(text, ['para reformar', 'origen', 'antiguo'])) e.condition = 'para reformar';
    const zoneMatch = (text || '').match(/(?:en|por|zona|barrio|urbanización|urbanizacion)\s+([a-záéíóúñ0-9\s\-]{3,45}?)(?:,|\.|;|\?|$|\s+con\s+|\s+de\s+\d|\s+hasta\s+)/i);
    if (zoneMatch) e.zone = zoneMatch[1].trim();
    if (!e.zone && containsAny(text, ['playa de san juan', 'pau 5'])) e.zone = 'Playa de San Juan';
    if (!e.zone && containsAny(text, ['alicante centro'])) e.zone = 'Alicante centro';
    if (!e.zone && containsAny(text, ['el campello', 'muchavista'])) e.zone = 'El Campello';
    const extras = ['piscina', 'garaje', 'parking', 'terraza', 'ascensor', 'jardin', 'jardín', 'vistas', 'trastero'].filter(x => containsAny(text, [x]));
    if (extras.length) e.extras = unique(extras);
  }

  if (sector === 'dental') {
    if (containsAny(text, ['implante', 'ortodoncia', 'brackets', 'invisalign', 'limpieza', 'revision', 'revisión', 'caries'])) e.treatment = containsAny(text, ['implante']) ? 'implantes' : containsAny(text, ['ortodoncia', 'brackets', 'invisalign']) ? 'ortodoncia' : containsAny(text, ['limpieza']) ? 'limpieza' : 'tratamiento dental';
    const dentalUrgencySignal = containsAny(text, ['dolor', 'muela', 'diente', 'encia', 'encía', 'molestia', 'urgente', 'hinchada', 'hinchazon', 'hinchazón', 'fiebre', 'sangrado', 'no puedo dormir', 'insoportable']);
    if (containsAny(text, ['dolor', 'muela', 'diente', 'encia', 'encía', 'molestia'])) { e.symptom = 'molestia dental'; e.appointment_reason = 'dolor/urgencia'; }
    if (dentalUrgencySignal && !containsAny(text, ['solo presupuesto', 'precio de implante', 'precio implante'])) e.intent_override = 'urgencia';
    if (!e.appointment_reason && containsAny(text, ['revision', 'revisión', 'limpieza'])) e.appointment_reason = 'revisión/limpieza';
    if (!e.appointment_reason && containsAny(text, ['presupuesto', 'precio', 'implante', 'ortodoncia'])) e.appointment_reason = 'presupuesto/tratamiento';
    if (containsAny(text, ['desde hace', 'hace 1 dia', 'hace 1 día', 'hace 2 dias', 'hace 2 días', 'hace 3 dias', 'hace 3 días', 'semana pasada', 'desde la semana', 'ayer', 'desde ayer', 'varios dias', 'varios días', 'hace una semana'])) {
      if (clean.includes('semana')) e.symptoms_time = 'desde la semana pasada';
      else if (clean.includes('ayer')) e.symptoms_time = 'desde ayer';
      else {
        const days = clean.match(/hace\s+(\d{1,2})\s+dias?/);
        e.symptoms_time = days ? `desde hace ${days[1]} días` : 'desde hace varios días';
      }
    }
    const negatedDentalRed = /\b(no|sin)\b.{0,35}(fiebre|hinchazon|hinchazón|sangrado|sangra|dolor fuerte)/.test(clean);
    if (negatedDentalRed && containsAny(text, ['hinchazon', 'hinchazón', 'hinchada', 'ninguna', 'ningun', 'ningún'])) e.red_flags = false;
    else if (negatedDentalRed) delete e.red_flags;
    else if (containsAny(text, ['fiebre', 'hinchada', 'hinchazon', 'hinchazón', 'sangrado', 'sangra', 'no puedo dormir', 'no puedo tragar', 'no puedo respirar', 'no puedo abrir', 'insoportable', 'dolor muy fuerte', 'dolor fuerte'])) e.red_flags = true;
    if (availabilityPreference) e.availability = availabilityPreference;
    else if (containsAny(text, ['hoy no puedo', 'no puedo hoy', 'hoy imposible', 'no puedo acudir hoy'])) e.availability = 'no puede acudir hoy';
    else if (containsAny(text, ['no puedo acudir', 'no puedo ir', 'no me viene bien'])) e.availability = 'necesita otra franja';
    else if (containsAny(text, ['puedo ir', 'puedo acudir', 'hoy', 'mañana', 'manana', 'esta tarde'])) e.availability = availabilityPreference || 'pendiente de confirmar';
  }

  if (sector === 'estetica') {
    if (containsAny(text, ['botox', 'bótox'])) e.service = 'bótox';
    if (containsAny(text, ['laser', 'láser'])) e.service = 'láser';
    if (containsAny(text, ['hialuronico', 'hialurónico', 'labios'])) e.service = 'ácido hialurónico/labios';
    if (containsAny(text, ['manchas', 'frente', 'patas de gallo', 'cara', 'piel', 'labios'])) e.zone_or_goal = 'zona/objetivo indicado';
    if (containsAny(text, ['primera vez', 'nunca'])) e.first_time = 'sí';
  }

  if (sector === 'legal') {
    if (containsAny(text, ['herencia', 'testamento', 'sucesion', 'sucesión'])) e.matter = 'herencia';
    if (containsAny(text, ['divorcio', 'custodia', 'pension', 'pensión'])) e.matter = 'familia';
    if (containsAny(text, ['inquilino', 'alquiler', 'impago', 'desahucio'])) e.matter = 'alquiler';
    if (containsAny(text, ['despido', 'laboral', 'finiquito', 'nomina', 'nómina'])) e.matter = 'laboral';
    if (containsAny(text, ['provincia', 'alicante', 'madrid', 'valencia', 'murcia', 'barcelona'])) e.province = 'indicada en mensaje';
    if (containsAny(text, ['testamento', 'contrato', 'carta', 'notificacion', 'notificación', 'documento'])) e.documents = 'documentación mencionada';
    const months = extractNumber(/(\d{1,2})\s*(?:meses|años|anos)/i, text);
    if (months) e.months = months;
    if (timeframe || containsAny(text, ['plazo', 'juicio', 'esta semana'])) e.deadline = timeframe || 'hay plazo posible';
  }

  if (sector === 'restauracion') {
    const people = extractPeopleCount(text, false);
    if (people) e.people = people;
    const date = extractDateAnswer(text);
    if (date) e.date = date;
    const time = extractTimeAnswer(text);
    if (time) e.time = time;
    if (containsAny(text, ['sin gluten', 'celiaco', 'celíaco', 'alergia', 'intolerancia'])) e.allergy = 'alergia/intolerancia indicada';
    const menu = inferMenuType(text);
    if (menu) e.menu_type = menu;
    if (containsAny(text, ['cumpleaños', 'empresa', 'evento', 'celebracion', 'celebración'])) e.event_type = 'evento/grupo';
  }

  return sanitizeEntities(sector, text, e, state);
}


function shouldStartNewCase(sector, text, state, entities, correction) {
  if (correction || sector !== 'restauracion') return false;
  const clean = norm(text);
  const ctx = state.context || {};
  const hasPriorReservation = Boolean(ctx.people || ctx.date || ctx.time || ctx.allergy || ctx.menu_type || ctx.event_type);
  if (!hasPriorReservation) return false;
  if (state.pendingFields && state.pendingFields.length) return false;
  const newPeople = entities.people && ctx.people && Number(entities.people) !== Number(ctx.people);
  const startsReservation = containsAny(clean, ['quiero reservar', 'hacer una reserva', 'reservar mesa', 'mesa para', 'somos', 'grupo de', 'cena de empresa', 'comida de empresa', 'evento']);
  return Boolean(startsReservation && (newPeople || containsAny(clean, ['cena de empresa', 'comida de empresa', 'evento', 'cumpleaños', 'grupo'])));
}

function qualityGateLocalResponse(sector, text, response, state, analysis) {
  if (sector !== 'restauracion') return response;
  const c = state.context || {};
  let fixed = false;
  const explicitPeople = extractPeopleCount(text, false);
  const explicitDate = extractDateAnswer(text);
  const explicitTime = extractTimeAnswer(text);

  if (explicitPeople && Number(c.people) !== Number(explicitPeople)) { c.people = explicitPeople; fixed = true; }
  if (explicitDate && c.date !== explicitDate) { c.date = explicitDate; fixed = true; }
  if (explicitTime && c.time !== explicitTime) { c.time = explicitTime; fixed = true; }
  const contact = extractContactDetails(text, state);
  if (contact.contact_name && c.contact_name !== contact.contact_name) { c.contact_name = contact.contact_name; fixed = true; }
  if (contact.contact_phone && c.contact_phone !== contact.contact_phone) { c.contact_phone = contact.contact_phone; fixed = true; }
  if (c.menu_type && /\b(he dicho|dicho|persona|personas|somos|son)\b/.test(norm(String(c.menu_type)))) { delete c.menu_type; fixed = true; }
  if (c.people && c.date && c.time && c.people <= 12 && !c.event_type && !c.menu_type && /grupo\/evento/.test(response)) fixed = true;
  if (fixed) {
    state.context = c;
    return buildRestauracionResponse(analysis || { intent: state.lastIntent || 'reserva' }, state, text);
  }
  return response;
}


function mergeContext(state, entities) {
  const cleanEntities = Object.fromEntries(Object.entries(entities).filter(([, v]) => v !== null && v !== '' && v !== undefined));
  state.context = { ...state.context, ...cleanEntities };
  // Si el usuario corrige el alcance a individual, eliminamos datos incompatibles de un turno anterior.
  if (cleanEntities.audience === 'individual') {
    delete state.context.team_size;
  }
  if (state.sector === 'restauracion' && hasCompleteRestaurantCore(state.context) && state.context.contact_name && state.context.contact_phone) {
    state.awaitingContact = false;
    state.pendingFields = [];
  }
}

function missingFields(sector, intent, context) {
  const rules = DOMAIN_RULES[sector];
  const required = rules.required[intent] || [];
  return required.filter(f => {
    if (f === 'team_size_or_scope') return !(context.team_size || context.audience);
    return context[f] === undefined || context[f] === '' || context[f] === null;
  });
}

function questionsFor(sector, missing, limit = 3) {
  const rules = DOMAIN_RULES[sector];
  return missing.slice(0, limit).map(f => rules.questions[f]).filter(Boolean);
}

function euros(value) {
  const rounded = Math.round(value / 5000) * 5000;
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(rounded);
}

function formatContext(context, fields) {
  const pairs = [];
  const labels = {
    audience: 'alcance', team_size: 'participantes', objective: 'objetivo', timeframe: 'plazo', availability: 'disponibilidad', operation: 'operación', zone: 'zona', property_type: 'tipo', sqm: 'metros', bedrooms: 'dormitorios', budget: 'presupuesto', need: 'necesidad', treatment: 'tratamiento', first_visit: 'primera visita', appointment_reason: 'motivo de cita', symptoms_time: 'duración', red_flags: 'señales de prioridad', service: 'servicio', zone_or_goal: 'zona/objetivo', first_time: 'primera vez', matter: 'asunto', province: 'provincia', documents: 'documentos', role: 'rol', months: 'tiempo', deadline: 'plazo', people: 'personas', date: 'fecha', time: 'hora', allergy: 'alergia', menu_type: 'menú', event_type: 'evento', contact_name: 'nombre', contact_phone: 'teléfono'
  };
  fields.forEach(f => {
    if (context[f] !== undefined && context[f] !== '' && context[f] !== null) {
      let value = context[f];
      if (f === 'budget' && typeof value === 'number') value = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
      else if (Array.isArray(value)) value = value.join(', ');
      else if (value === true) value = 'sí';
      else if (value === false) value = 'no';
      pairs.push(`${labels[f] || f}: ${value}`);
    }
  });
  return pairs.length ? pairs.join(' · ') : 'datos todavía incompletos';
}



function isAlternativeRequest(text) {
  const clean = norm(text);
  const asksAlternative = /\b(otra|otro|alternativa|alternativo|distinta|distinto|diferente|mas opciones|más opciones|otra opcion|otra opción|no me encaja|no encaja|no puedo|imposible|ninguna|ninguno|no podria|no podría|podria ser otra|podría ser otra|puede ser otra|otro dia|otro día|otra fecha|otro horario|otra hora)\b/.test(clean);
  const mentionsAgenda = /\b(fecha|dia|día|hora|horario|hueco|turno|opcion|opción|agenda|cita|reserva|mesa|ser|puede|podria|podría|encaja|disponible|disponibilidad)\b/.test(clean);
  return asksAlternative && mentionsAgenda;
}

function isNewDateRequest(text) {
  const clean = norm(text);
  if (!isAlternativeRequest(text)) return false;
  const asksDate = /\b(otra fecha|otro dia|otro día|distinta fecha|fecha distinta|diferente fecha|no podria ser otra|no podría ser otra|podria ser otra fecha|podría ser otra fecha|puede ser otra fecha|otra cita|otra reserva)\b/.test(clean)
    || (/\b(fecha|dia|día)\b/.test(clean) && /\b(otra|otro|distinta|distinto|diferente|alternativa|no podria|no podría)\b/.test(clean));
  const onlyTime = /\b(otra hora|otro horario|distinta hora|diferente hora|mas tarde|más tarde|antes|horario)\b/.test(clean) && !/\b(fecha|dia|día)\b/.test(clean);
  return asksDate && !onlyTime;
}

function isNewTimeRequest(text) {
  const clean = norm(text);
  return isAlternativeRequest(text) && /\b(otra hora|otro horario|distinta hora|diferente hora|mas tarde|más tarde|antes|horario)\b/.test(clean) && !isNewDateRequest(text);
}

function slotDayKey(slot) {
  const clean = norm(slot || '');
  if (!clean) return '';
  if (clean.startsWith('pasado manana') || clean.startsWith('pasado mañana')) return 'pasado mañana';
  const days = ['hoy', 'mañana', 'manana', 'lunes', 'martes', 'miercoles', 'miércoles', 'jueves', 'viernes', 'sabado', 'sábado', 'domingo'];
  const found = days.find(d => clean.startsWith(norm(d)));
  if (!found) return '';
  if (found === 'manana') return 'mañana';
  if (found === 'miercoles') return 'miércoles';
  if (found === 'sabado') return 'sábado';
  return found;
}

function slotTimeKey(slot) {
  const m = String(slot || '').match(/\b([01]?\d|2[0-3])[:.]([0-5]\d)\b/);
  return m ? `${String(Number(m[1])).padStart(2, '0')}:${m[2]}` : '';
}

function hasRecentSlotProposal(state = {}) {
  if (state.awaitingSlot) return true;
  if ((state.offeredSlots || []).length) return true;
  if ((state.offeredSlotHistory || []).length) return true;
  return /\b(huecos|turnos|opciones|horarios|responde con el numero|responde con el número)\b/i.test(state.lastBotResponse || '');
}

function rememberOfferedSlots(state, slots = []) {
  if (!state) return;
  state.offeredSlotHistory = state.offeredSlotHistory || [];
  slots.forEach(slot => {
    if (slot && !state.offeredSlotHistory.some(prev => norm(prev) === norm(slot))) {
      state.offeredSlotHistory.push(slot);
    }
  });
  if (state.offeredSlotHistory.length > 30) {
    state.offeredSlotHistory = state.offeredSlotHistory.slice(-30);
  }
}

function setOfferedSlots(state, slots = []) {
  state.awaitingSlot = Boolean(slots && slots.length);
  state.offeredSlots = slots || [];
  rememberOfferedSlots(state, state.offeredSlots);
  return state.offeredSlots;
}

function refusedDayKeysFromText(text) {
  const clean = norm(text);
  const refused = new Set();
  const rules = [
    ['hoy', /\b(no|imposible|descarta|descartar|ninguna)\b.{0,35}\bhoy\b|\bhoy\b.{0,20}\b(no|imposible|no puedo)\b/],
    ['mañana', /\b(no|imposible|descarta|descartar|ninguna)\b.{0,35}\bmanana\b|\bmanana\b.{0,20}\b(no|imposible|no puedo)\b/],
    ['jueves', /\b(no|imposible|descarta|descartar|ninguna)\b.{0,35}\bjueves\b|\bjueves\b.{0,20}\b(no|imposible|no puedo)\b/],
    ['viernes', /\b(no|imposible|descarta|descartar|ninguna)\b.{0,35}\bviernes\b|\bviernes\b.{0,20}\b(no|imposible|no puedo)\b/],
    ['sábado', /\b(no|imposible|descarta|descartar|ninguna)\b.{0,35}\bsabado\b|\bsabado\b.{0,20}\b(no|imposible|no puedo)\b/],
    ['domingo', /\b(no|imposible|descarta|descartar|ninguna)\b.{0,35}\bdomingo\b|\bdomingo\b.{0,20}\b(no|imposible|no puedo)\b/]
  ];
  rules.forEach(([key, pattern]) => { if (pattern.test(clean)) refused.add(key); });
  return refused;
}

function alternativeSlotsFor(sector, context = {}, state = {}, text = '') {
  const history = unique([...(state.offeredSlotHistory || []), ...(state.offeredSlots || [])]);
  const previous = new Set(history.map(s => norm(s)));
  const previousDays = new Set(history.map(slotDayKey).filter(Boolean));
  const refusedDays = refusedDayKeysFromText(text);
  const cleanAvailability = norm(String(context.availability || ''));
  const banks = {
    inmobiliaria: ['jueves 09:30', 'jueves 18:00', 'viernes 11:30', 'lunes 16:30', 'martes 10:00', 'miércoles 12:00'],
    dental: ['mañana 16:30', 'pasado mañana 10:15', 'pasado mañana 18:00', 'jueves 09:45', 'jueves 13:30', 'viernes 12:00', 'lunes 10:30'],
    estetica: ['viernes 12:30', 'lunes 16:00', 'martes 10:45', 'miércoles 18:15', 'jueves 13:00'],
    legal: ['jueves 10:00', 'viernes 13:00', 'lunes 17:30', 'martes 09:30', 'miércoles 11:00'],
    formacion: ['martes 09:30', 'miércoles 16:00', 'viernes 12:30', 'lunes 18:00', 'jueves 10:30'],
    restauracion: ['viernes 21:00', 'sábado 14:30', 'domingo 15:00', 'martes 20:30', 'jueves 21:30']
  };
  let selected = (banks[sector] || ['pasado mañana 10:00', 'jueves 12:00', 'viernes 17:00', 'lunes 11:30'])
    .filter(s => !previous.has(norm(s)));

  if (isNewDateRequest(text) && previousDays.size) {
    selected = selected.filter(s => !previousDays.has(slotDayKey(s)));
  }
  if (isNewTimeRequest(text) && previousDays.size) {
    const sameDay = selected.filter(s => previousDays.has(slotDayKey(s)));
    if (sameDay.length) selected = sameDay;
  }
  selected = selected.filter(s => !refusedDays.has(slotDayKey(s)));

  if (sector === 'dental') {
    if (cleanAvailability.includes('no puede hoy') || cleanAvailability.includes('no puede acudir hoy')) selected = selected.filter(s => slotDayKey(s) !== 'hoy');
    if (cleanAvailability.includes('no puede manana') || cleanAvailability.includes('no puede mañana')) selected = selected.filter(s => slotDayKey(s) !== 'mañana');
  }
  return selected.slice(0, 3);
}

function buildAlternativeSlotsResponse(sector, text, state) {
  const c = state.context || {};
  const slots = alternativeSlotsFor(sector, c, state, text);
  setOfferedSlots(state, slots);
  const clean = norm(text);
  const dateOrTime = isNewTimeRequest(text) ? 'horario' : isNewDateRequest(text) ? 'fecha' : 'fecha/hora';
  const introBySector = {
    dental: isNewDateRequest(text)
      ? 'Sí, claro. Te doy otra fecha y no repito el bloque de urgencia completo.'
      : 'Sí, claro. Te doy otra alternativa compatible con lo que ya has dicho.',
    restauracion: 'Sí. Te propongo otra opción sin cambiar los datos de la reserva ya captados.',
    inmobiliaria: 'Sí. Te propongo otros huecos sin perder el contexto del caso.',
    estetica: 'Sí. Te propongo otras opciones de valoración.',
    legal: 'Sí. Te propongo otros huecos de consulta.',
    formacion: 'Sí. Te propongo otros huecos para diagnóstico.'
  };
  const intro = introBySector[sector] || 'Sí. Te propongo otras opciones.';
  const summaryFields = {
    dental: ['appointment_reason', 'symptoms_time', 'red_flags', 'availability'],
    restauracion: ['people', 'date', 'time', 'allergy', 'menu_type', 'event_type'],
    inmobiliaria: ['operation', 'zone', 'property_type', 'budget', 'need'],
    estetica: ['service', 'zone_or_goal', 'first_time'],
    legal: ['matter', 'province', 'deadline', 'documents'],
    formacion: ['audience', 'team_size', 'objective', 'timeframe']
  }[sector] || Object.keys(c);
  const summary = formatContext(c, summaryFields);
  const safety = sector === 'dental'
    ? '\n\nMantengo el aviso sanitario: no puedo diagnosticar por chat; si la hinchazón avanza, hay fiebre alta, sangrado abundante o dificultad para tragar/respirar, contacta con urgencias o con la clínica.'
    : '';
  if (!slots.length) {
    return `${intro}\n\nDatos que mantengo: ${summary}.\n\nNo tengo más huecos simulados fiables para otra ${dateOrTime}. Lo coherente es pedir una preferencia concreta —día y franja— o pasarlo a revisión humana.${safety}`;
  }
  return `${intro}\n\nDatos que mantengo: ${summary}.\n\nNuevas opciones de ${dateOrTime}:\n${slots.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nResponde con el número de la opción o dime una fecha/franja concreta.${safety}`;
}



const AGENDA_SLOT_BANKS = {
  inmobiliaria: {
    label: 'agenda del asesor inmobiliario',
    windows: {
      mañana: ['09:30', '11:00', '12:30'],
      tarde: ['16:30', '18:00', '19:00'],
      noche: ['18:30', '19:30'],
      mediodía: ['12:30', '13:30'],
      general: ['09:30', '11:00', '16:30', '18:00']
    },
    booked: { 'jueves': ['11:00'], '25 de junio': ['18:00'] }
  },
  dental: {
    label: 'agenda de clínica/recepción',
    windows: {
      mañana: ['09:30', '10:15', '12:00'],
      tarde: ['16:30', '18:00', '19:00'],
      noche: ['18:00', '19:00'],
      mediodía: ['12:00', '13:30'],
      general: ['09:30', '12:00', '16:30', '18:00']
    },
    booked: { 'hoy': ['17:15'], 'mañana': ['09:30'], '25 de junio': ['16:30'] }
  },
  estetica: {
    label: 'agenda de valoración estética',
    windows: {
      mañana: ['10:00', '11:30', '12:30'],
      tarde: ['16:00', '17:30', '18:30'],
      noche: ['18:30', '19:30'],
      mediodía: ['12:30', '13:30'],
      general: ['10:00', '11:30', '16:00', '17:30']
    },
    booked: { 'viernes': ['12:30'], '25 de junio': ['17:30'] }
  },
  legal: {
    label: 'agenda de consulta legal',
    windows: {
      mañana: ['09:30', '10:30', '12:00'],
      tarde: ['16:30', '17:30', '18:30'],
      noche: ['18:30'],
      mediodía: ['12:00', '13:00'],
      general: ['10:00', '12:00', '16:30', '17:30']
    },
    booked: { 'jueves': ['10:00'], '25 de junio': ['12:00'] }
  },
  formacion: {
    label: 'agenda de diagnóstico',
    windows: {
      mañana: ['09:30', '10:30', '12:00'],
      tarde: ['16:00', '17:30', '18:30'],
      noche: ['18:30'],
      mediodía: ['12:00', '13:00'],
      general: ['09:30', '12:00', '16:00', '17:30']
    },
    booked: { 'martes': ['09:30'], '25 de junio': ['16:00'] }
  },
  restauracion: {
    label: 'agenda de reservas del restaurante',
    windows: {
      mañana: ['10:00', '11:00', '12:00'],
      mediodía: ['13:30', '14:30', '15:30'],
      tarde: ['17:30', '18:30', '19:30'],
      noche: ['20:30', '21:00', '22:00', '22:30'],
      general: ['13:30', '14:30', '20:30', '22:00']
    },
    booked: {
      '25 de junio': ['21:00', '22:30'],
      '26 de junio': ['20:30'],
      'sábado': ['22:00'],
      'domingo': ['14:00']
    }
  }
};

function canonicalDateKey(date) {
  const clean = norm(date || '');
  if (!clean) return '';
  return clean.replace('manana', 'mañana').replace('miercoles', 'miércoles').replace('sabado', 'sábado');
}

function isExactClock(value) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(String(value || ''));
}

function windowFromTimeValue(value) {
  const clean = norm(value || '');
  if (!clean) return '';
  if (clean.includes('mediodia') || clean.includes('comida')) return 'mediodía';
  if (clean.includes('noche') || clean.includes('cena')) return 'noche';
  if (clean.includes('tarde')) return 'tarde';
  if (clean.includes('manana') || clean.includes('mañana')) return 'mañana';
  const m = String(value || '').match(/^([01]\d|2[0-3]):([0-5]\d)$/);
  if (m) {
    const hour = Number(m[1]);
    if (hour < 12) return 'mañana';
    if (hour < 16) return 'mediodía';
    if (hour < 20) return 'tarde';
    return 'noche';
  }
  return '';
}

function defaultWindowForSector(sector, context = {}) {
  const fromContext = windowFromTimeValue(context.time || context.availability || context.new_preference || '');
  if (fromContext) return fromContext;
  if (sector === 'restauracion') return 'noche';
  return 'general';
}

function sectorAgendaLabel(sector) {
  return (AGENDA_SLOT_BANKS[sector] && AGENDA_SLOT_BANKS[sector].label) || 'agenda disponible';
}

function bookedSlotsFor(sector, date) {
  const bank = AGENDA_SLOT_BANKS[sector] || {};
  const booked = bank.booked || {};
  const key = canonicalDateKey(date);
  return new Set([...(booked[key] || []), ...(booked.general || [])]);
}

function availableSlotsFor(sector, date, window = 'general') {
  const bank = AGENDA_SLOT_BANKS[sector] || AGENDA_SLOT_BANKS.formacion;
  const windows = bank.windows || {};
  const win = window && windows[window] ? window : 'general';
  const booked = bookedSlotsFor(sector, date);
  const slots = (windows[win] || windows.general || []).filter(time => !booked.has(time));
  if (slots.length) return slots;
  return (windows.general || []).filter(time => !booked.has(time));
}

function formatDatedSlot(date, time) {
  return `${date} ${time}`.trim();
}

function agendaSummaryFields(sector) {
  return {
    dental: ['appointment_reason', 'symptoms_time', 'red_flags', 'availability'],
    restauracion: ['people', 'date', 'time', 'allergy', 'menu_type', 'event_type', 'contact_name', 'contact_phone'],
    inmobiliaria: ['operation', 'zone', 'property_type', 'budget', 'need', 'availability'],
    estetica: ['service', 'zone_or_goal', 'first_time', 'availability'],
    legal: ['matter', 'province', 'deadline', 'documents', 'availability'],
    formacion: ['audience', 'team_size', 'objective', 'timeframe', 'availability']
  }[sector] || Object.keys((getState(sector) || {}).context || {});
}

function isAvailabilityQuestion(text) {
  const clean = norm(text);
  return Boolean(
    /\b(a que hora|a qué hora|que horas|qué horas|cuales horas|cuáles horas|horas disponibles|horarios disponibles|huecos disponibles|disponibilidad|disponible|libre|libres|ocupado|ocupada)\b/.test(clean)
    || (/\b(hay|teneis|tenéis|tienes|me podrias|me podrías|podrias|podrías|puedes|dime|decirme|mirame|mírame|busca|buscar)\b/.test(clean) && /\b(hora|horas|horario|horarios|hueco|huecos|turno|turnos|opcion|opción|opciones|agenda)\b/.test(clean))
  );
}

function isScheduleChangeRequest(text) {
  const clean = norm(text);
  return Boolean(
    /\b(cambiar|cambiamos|cambio|modificar|modificamos|mover|movemos|pasar|pasamos|trasladar|trasladamos)\b.{0,40}\b(fecha|dia|día|hora|horario|cita|reserva|turno)\b/.test(clean)
    || /\b(y si|si)\s+(cambiamos|cambio|movemos|pasamos)\b/.test(clean)
    || isAlternativeRequest(text)
  );
}

function isExplicitDateChangeRequest(text) {
  const clean = norm(text);
  return Boolean(
    /\b(cambiar|cambiamos|cambio|modificar|modificamos|mover|movemos|pasar|pasamos|trasladar|trasladamos)\b.{0,40}\b(fecha|dia|día)\b/.test(clean)
    || /\b(y si|si)\s+(cambiamos|cambio|movemos|pasamos)\b.{0,30}\b(fecha|dia|día)?\b/.test(clean)
  );
}

function isSpecificSlotAvailabilityQuestion(text) {
  const time = extractTimeAnswer(text);
  return isExactClock(time) && (isAvailabilityQuestion(text) || /\b(hay|puede|podria|podría|posible|cabria|cabría|confirmo|reserva|reservar|quiero|pon|ponlo|dejalo|déjalo)\b/.test(norm(text)));
}

function shouldApplySpecificSlot(text) {
  const clean = norm(text);
  return /\b(confirmo|confirmar|reserva|reservar|reservalo|resérvalo|quiero|me quedo|pon|ponlo|dejalo|déjalo|cambia|cambiar|actualiza|modifica)\b/.test(clean);
}

function currentDataQuestionField(text) {
  if (isCorrectionText(text)) return '';
  const clean = norm(text);
  if (/\b(que datos|qué datos|datos tienes|has anotado|resumen|resumeme|resúmeme|como va|cómo va)\b/.test(clean)) return 'summary';
  if (/\b(nombre|a nombre)\b/.test(clean) && /\b(que|qué|cual|cuál|tienes|anotado|puesto|figura|va)\b/.test(clean)) return 'contact_name';
  if (/\b(telefono|teléfono|movil|móvil|numero|número)\b/.test(clean) && /\b(que|qué|cual|cuál|tienes|anotado|puesto|figura)\b/.test(clean)) return 'contact_phone';
  if (/\b(cuantas personas|cuántas personas|personas|comensales)\b/.test(clean) && /\b(que|qué|cuantas|cuántas|tienes|anotado|puesto|somos)\b/.test(clean)) return 'people';
  if (/\b(fecha|dia|día)\b/.test(clean) && /\b(que|qué|cual|cuál|tienes|anotado|puesto|figura)\b/.test(clean) && !isAvailabilityQuestion(text)) return 'date';
  if (/\b(hora|horario)\b/.test(clean) && /\b(que|qué|cual|cuál|tienes|anotado|puesto|figura)\b/.test(clean) && !isAvailabilityQuestion(text)) return 'time';
  if (/\b(presupuesto)\b/.test(clean) && /\b(que|qué|cual|cuál|tienes|anotado|puesto|figura)\b/.test(clean)) return 'budget';
  return '';
}

function buildCurrentDataQuestionResponse(sector, text, state) {
  const c = state.context || {};
  const field = currentDataQuestionField(text);
  const labels = { contact_name: 'nombre', contact_phone: 'teléfono', people: 'personas', date: 'fecha', time: 'hora', budget: 'presupuesto' };
  if (field && field !== 'summary') {
    const value = c[field];
    if (value !== undefined && value !== '' && value !== null) {
      return `Tengo anotado ${labels[field] || field}: ${field === 'budget' && typeof value === 'number' ? new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value) : value}.\n\nSi quieres cambiarlo, dímelo de forma directa, por ejemplo: “cambia ${labels[field] || field} a ...”.`;
    }
    return `Todavía no tengo anotado ${labels[field] || field}. Dímelo y lo incorporo sin reiniciar la conversación.`;
  }
  const fields = agendaSummaryFields(sector);
  return `Tengo este contexto activo y no lo pierdo:\n\n${formatContext(c, fields)}.\n\nPuedes pedirme cambiar un dato concreto, consultar disponibilidad o revisar el siguiente paso.`;
}

function requestedAgendaDate(text, context = {}) {
  const explicit = extractDateAnswer(text);
  if (explicit) return explicit;
  if (context.date) return context.date;
  const fromAvailability = extractDateAnswer(String(context.availability || context.new_preference || ''));
  return fromAvailability || '';
}

function requestedAgendaWindow(text, context = {}) {
  const fromText = windowFromTimeValue(extractTimeAnswer(text));
  if (fromText) return fromText;
  return defaultWindowForSector(context.sector || '', context);
}

function applySelectedSlotToContext(sector, selected, state) {
  const c = state.context || {};
  const date = extractDateAnswer(selected);
  const time = extractTimeAnswer(selected);
  if (date) c.date = date;
  if (time) {
    if (sector === 'restauracion') c.time = time;
    else c.availability = [date, time].filter(Boolean).join(' ');
  }
  state.context = c;
  state.pendingAgendaDate = '';
  state.pendingAgendaWindow = '';
}

function buildSpecificSlotCheckResponse(sector, text, state, date, time, window) {
  const c = state.context || {};
  const booked = bookedSlotsFor(sector, date);
  const slots = availableSlotsFor(sector, date, window);
  const summary = formatContext(c, agendaSummaryFields(sector));
  const label = sectorAgendaLabel(sector);
  if (booked.has(time) || !slots.includes(time)) {
    const alternatives = slots.filter(s => s !== time).slice(0, 3);
    setOfferedSlots(state, alternatives.map(s => formatDatedSlot(date, s)));
    state.awaitingAgendaDate = false;
    return `He revisado la ${label}: ${date} a las ${time} no lo pondría porque figura ocupado o fuera de los huecos disponibles.\n\nDatos que mantengo: ${summary}.\n\nOpciones libres cercanas para esa fecha/franja:\n${alternatives.map((s, i) => `${i + 1}. ${date} ${s}`).join('\n') || '- No tengo alternativas libres en esa franja.'}\n\nSi quieres otra fecha, dime el día y la franja y vuelvo a buscar.`;
  }
  if (shouldApplySpecificSlot(text)) {
    if (sector === 'restauracion') {
      c.date = date;
      c.time = time;
      state.context = c;
      state.awaitingAgendaDate = false;
      state.pendingAgendaDate = '';
      state.pendingAgendaWindow = '';
      state.awaitingSlot = false;
      state.offeredSlots = [];
      return buildRestauracionResponse({ intent: state.lastIntent || 'reserva' }, state, text);
    }
    c.availability = `${date} ${time}`;
    state.context = c;
    state.awaitingAgendaDate = false;
    state.pendingAgendaDate = '';
    state.pendingAgendaWindow = '';
    return `Sí, ${date} a las ${time} aparece libre en la ${label}. Lo actualizo como preferencia.\n\nDatos actualizados: ${formatContext(c, agendaSummaryFields(sector))}.`;
  }
  setOfferedSlots(state, [formatDatedSlot(date, time)]);
  return `Sí, ${date} a las ${time} aparece libre en la ${label}.\n\nMantengo tus datos actuales: ${summary}.\n\nSi quieres cambiarlo a esa hora, dime “confirmo ${time}” o responde con 1.`;
}

function buildAvailabilityQueryResponse(sector, text, state) {
  const c = state.context || {};
  const dateInText = extractDateAnswer(text);
  const timeInText = extractTimeAnswer(text);
  const exactTime = isExactClock(timeInText) ? timeInText : '';
  const date = dateInText || ((exactTime || state.awaitingSlot) && state.pendingAgendaDate ? state.pendingAgendaDate : '') || requestedAgendaDate(text, c);
  const window = windowFromTimeValue(timeInText) || state.pendingAgendaWindow || defaultWindowForSector(sector, c);
  const summary = formatContext(c, agendaSummaryFields(sector));
  const summaryLabel = (dateInText && c.date && canonicalDateKey(dateInText) !== canonicalDateKey(c.date))
    ? 'Datos que mantengo de momento hasta que confirmes el cambio'
    : 'Datos que mantengo';
  const label = sectorAgendaLabel(sector);

  if (isAlternativeRequest(text) && !dateInText && !exactTime && !isExplicitDateChangeRequest(text) && hasRecentSlotProposal(state)) {
    return buildAlternativeSlotsResponse(sector, text, state);
  }

  if (isExplicitDateChangeRequest(text) && !dateInText && !exactTime) {
    state.awaitingAgendaDate = true;
    state.awaitingSlot = false;
    return `Sí, podemos cambiar la fecha. Mantengo el contexto y no reinicio la conversación.\n\nDatos que mantengo: ${summary}.\n\nDime qué nueva fecha quieres y, si tienes preferencia, la franja —mañana, mediodía, tarde o noche—. En cuanto me la digas reviso la ${label} y te paso solo horarios libres.`;
  }

  if (!date) {
    state.awaitingAgendaDate = true;
    return `Puedo revisar horarios, pero necesito el día para no inventar disponibilidad.\n\nDatos que mantengo: ${summary}.\n\nDime la fecha y la franja aproximada —por ejemplo, jueves por la tarde o 25 de junio por la noche— y busco huecos libres.`;
  }

  if (exactTime && isSpecificSlotAvailabilityQuestion(text)) {
    return buildSpecificSlotCheckResponse(sector, text, state, date, exactTime, window);
  }

  const slots = availableSlotsFor(sector, date, window);
  state.pendingAgendaDate = date;
  state.pendingAgendaWindow = window;
  setOfferedSlots(state, slots.map(time => formatDatedSlot(date, time)));
  state.awaitingAgendaDate = false;
  const windowLabel = window && window !== 'general' ? ` por la ${window}` : '';
  const occupied = [...bookedSlotsFor(sector, date)].filter(Boolean);
  const occupiedLine = occupied.length ? `\n\nHe descartado como ocupados/no disponibles: ${occupied.join(', ')}.` : '';
  return `He revisado la ${label} para ${date}${windowLabel}.\n\n${summaryLabel}: ${summary}.\n\nHorarios libres:\n${slots.map((s, i) => `${i + 1}. ${date} ${s}`).join('\n') || '- No tengo huecos libres en esa franja.'}${occupiedLine}\n\nResponde con el número para escoger una opción, dime una hora concreta para comprobarla o propón otra fecha.`;
}

function shouldHandleOperationalQuestion(sector, text, state) {
  if (sector === 'auto') return false;
  const c = state.context || {};
  const hasContext = Object.keys(c).some(k => !['messages', 'asked_fields'].includes(k));
  if (state.awaitingAgendaDate && (extractDateAnswer(text) || isAvailabilityQuestion(text))) return true;
  if (currentDataQuestionField(text) && hasContext) return true;
  if ((isSpecificSlotAvailabilityQuestion(text) && (hasContext || state.awaitingSlot || /\b(hay|disponible|libre|ocupado|confirmo|posible)\b/.test(norm(text)))) || (state.awaitingSlot && isExactClock(extractTimeAnswer(text)))) return true;
  if (isAvailabilityQuestion(text) && (hasContext || ['dental', 'restauracion', 'estetica', 'legal', 'formacion', 'inmobiliaria'].includes(sector))) return true;
  if (isScheduleChangeRequest(text) && (hasContext || hasRecentSlotProposal(state))) return true;
  return false;
}

function buildOperationalQuestionResponse(sector, text, state) {
  if (currentDataQuestionField(text) && !isAvailabilityQuestion(text)) {
    return buildCurrentDataQuestionResponse(sector, text, state);
  }
  if (isSpecificSlotAvailabilityQuestion(text) || (state.awaitingSlot && isExactClock(extractTimeAnswer(text))) || isAvailabilityQuestion(text) || isScheduleChangeRequest(text) || state.awaitingAgendaDate) {
    return buildAvailabilityQueryResponse(sector, text, state);
  }
  return '';
}

function responseLooksRepeated(response, state) {
  if (!state.lastBotResponse) return false;
  const a = norm(response).replace(/\s+/g, ' ').trim();
  const b = norm(state.lastBotResponse).replace(/\s+/g, ' ').trim();
  if (!a || !b) return false;
  if (a === b) return true;
  const shorter = Math.min(a.length, b.length);
  const prefix = 180;
  return shorter > 220 && a.slice(0, prefix) === b.slice(0, prefix);
}

function buildNonRepeatedClarificationResponse(sector, text, state) {
  const c = state.context || {};
  const fields = correctionFieldsFor(sector, c);
  const summary = formatContext(c, fields);
  if (sector === 'dental') {
    return `No te repito el bloque anterior.\n\nMantengo el caso dental con estos datos: ${summary}.\n\nTu último mensaje no añade un dato clínico nuevo; parece una aclaración o una preferencia de agenda. Dime solo una cosa: ¿quieres otra fecha, otro horario o que lo deje como aviso para recepción?`;
  }
  if (sector === 'restauracion') {
    return `No repito la reserva anterior.\n\nDatos que mantengo: ${summary}.\n\nPara avanzar con sentido común, dime si quieres cambiar fecha, hora, número de personas o dejarla preparada con nombre y teléfono.`;
  }
  return `No repito el bloque anterior.\n\nDatos que mantengo: ${summary}.\n\nDime el cambio concreto que quieres hacer —fecha, horario, presupuesto, alcance o siguiente paso— y lo actualizo sin arrastrar datos incorrectos.`;
}

function finalCoherenceReview(sector, text, response, state) {
  if (shouldHandleOperationalQuestion(sector, text, state) && /necesito aterrizarlo dentro del ambito|necesito aterrizarlo dentro del ámbito/i.test(response || '')) {
    const operational = buildOperationalQuestionResponse(sector, text, state);
    if (operational) return operational;
  }
  if (sector === 'restauracion') {
    const contact = extractContactDetails(text, state);
    const hasContact = Boolean(contact.contact_name || contact.contact_phone);
    const ambiguous = /necesito aterrizarlo dentro del ambito|necesito aterrizarlo dentro del ámbito/i.test(response || '');
    if (hasContact && ambiguous) {
      return buildRestauracionResponse({ intent: state.lastIntent || 'reserva' }, state, text);
    }
    if ((hasContact || isCorrectionText(text)) && hasCompleteRestaurantCore(state.context || {})) {
      return response;
    }
  }
  if (isAlternativeRequest(text) && hasRecentSlotProposal(state)) {
    return buildAlternativeSlotsResponse(sector, text, state);
  }
  if (isAlternativeRequest(text) && responseLooksRepeated(response, state)) {
    return buildAlternativeSlotsResponse(sector, text, state);
  }
  if (responseLooksRepeated(response, state)) {
    return buildNonRepeatedClarificationResponse(sector, text, state);
  }
  return response;
}

function slotsFor(sector, context = {}) {
  const slots = {
    inmobiliaria: ['mañana 10:30', 'mañana 17:00', 'jueves 12:15'],
    dental: ['hoy 17:15', 'mañana 09:30', 'mañana 12:00'],
    estetica: ['miércoles 11:30', 'jueves 17:00', 'viernes 10:15'],
    legal: ['mañana 12:00', 'jueves 16:30', 'viernes 09:45'],
    formacion: ['lunes 10:00', 'martes 17:30', 'jueves 12:15'],
    restauracion: ['sábado 20:30', 'sábado 22:00', 'domingo 14:00']
  };
  let selected = slots[sector] || ['mañana 10:00', 'jueves 12:00', 'viernes 17:00'];
  if (sector === 'dental') {
    const av = norm(String(context.availability || ''));
    if (av.includes('no puede acudir hoy') || av.includes('no puede hoy')) selected = selected.filter(s => !s.startsWith('hoy'));
    if (av.includes('manana') || av.includes('mañana')) selected = selected.filter(s => norm(s).includes('manana'));
  }
  if (sector === 'restauracion') {
    const pref = norm(`${context.time || ''} ${context.availability || ''}`);
    if (pref.includes('mediodia') || pref.includes('comida')) {
      selected = ['sábado 14:00', 'domingo 14:00', 'domingo 15:00'];
    } else if (pref.includes('noche') || pref.includes('cena')) {
      selected = ['sábado 20:30', 'sábado 22:00', 'domingo 21:00'];
    }
  }
  return selected;
}


function offerSlots(sector, label = 'huecos', context = {}, slotsOverride = null) {
  const slots = slotsOverride || slotsFor(sector, context);
  return `\n\n${label}:\n${slots.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nResponde con el número si quieres que lo deje preparado como siguiente paso.`;
}

function canOfferSlots(sector, intent, context, missing) {
  if (sector === 'formacion') return missing.length <= 1 && (context.objective || context.audience || intent === 'empresa' || intent === 'cita');
  if (sector === 'inmobiliaria') {
    if (intent === 'cita') return missing.length <= 1 && (context.operation || context.availability);
    if (intent === 'comprador') return Boolean(context.budget) && missing.length <= 1;
    return ['vendedor', 'valoracion', 'estimacion_compra', 'visita', 'alquiler'].includes(intent) && missing.length <= 2;
  }
  if (sector === 'dental') return ['urgencia', 'revision', 'reagendar', 'presupuesto', 'cita'].includes(intent) && (intent !== 'presupuesto' || context.treatment || context.appointment_reason);
  if (sector === 'estetica') return missing.length <= 2;
  if (sector === 'legal') return missing.length <= 2;
  if (sector === 'restauracion') {
    // No proponer turnos genéricos si la persona ya dio fecha/hora/personas: sería contradictorio.
    if (context.date || context.time || context.people) return false;
    return false;
  }
  return false;
}

function buildGreeting(sector) {
  const d = DEMOS[sector];
  return `Hola, encantado. Soy ${d.name}, especialista en ${d.category}.\n\nPuedo ayudarte con ${d.mission}.\n\nCuéntame qué necesitas y lo convierto en el siguiente paso útil: cualificar, orientar, agendar o avisar al equipo.`;
}

function buildGuardrail(sector, rule) {
  const d = DEMOS[sector];
  return `Puedo ayudarte, pero no con esa petición desde este agente.\n\nLo que me pides parece relacionado con ${rule?.label || 'un tema general'}, y ${d.name} no está diseñado para resolver conversaciones generales, hacer deberes, crear cuentos, recomendar comida ni actuar como asistente universal.\n\n${d.name} está especializado en ${d.mission}.\n\nSí puedo hacer esto:\n- ${d.capabilities.join('\n- ')}\n\nSi tu necesidad va por ese camino, escríbemela con tus datos y te respondo dentro del negocio.`;
}

function buildAmbiguous(sector, text) {
  const d = DEMOS[sector];
  return `Te leo, pero necesito aterrizarlo dentro del ámbito de ${d.category}.\n\n${d.name} no debe inventar una respuesta si no entiende si hablas de ${d.mission}.\n\nDime en una frase qué necesitas dentro de este servicio. Por ejemplo: “quiero precio”, “necesito cita”, “quiero valorar un caso”, “es para mí” o “es para un equipo”.`;
}


function buildCorrectionResponse(sector, analysis, state) {
  const d = DEMOS[sector];
  const c = state.context;
  const intent = analysis.intent && analysis.intent !== 'consulta' ? analysis.intent : (state.lastIntent || analysis.intent || 'consulta');
  const fields = correctionFieldsFor(sector, c);
  let response = `Perfecto, corrijo el dato. No repito lo anterior ni fuerzo la conversación: actualizo el caso y sigo desde la nueva información.

Datos actualizados para ${d.name}: ${formatContext(c, fields)}.`;

  if (sector === 'dental') {
    state.awaitingSlot = true;
    const slots = setOfferedSlots(state, slotsFor('dental', c));
    const label = String(c.availability || '').includes('no puede hoy') ? 'Huecos alternativos de urgencia' : 'Huecos disponibles';
    response += offerSlots('dental', label, c, slots);
    response += `\n\nImportante: no puedo diagnosticar por chat. Si hay fiebre alta, hinchazón que avanza, sangrado abundante o dificultad para tragar/respirar, contacta con urgencias o con la clínica de inmediato.`;
    return response;
  }

  if (sector === 'restauracion') {
    return buildRestauracionResponse({ intent }, state, '');
  }

  const missing = missingFields(sector, intent, c);
  state.pendingFields = missing;
  const qs = questionsFor(sector, missing, 2);
  if (qs.length) {
    response += `

Para dejarlo fino después de la corrección, necesito:
${qs.map(q => `- ${q}`).join('\n')}`;
  } else {
    response += `\n\nCon la corrección ya tengo una base suficiente para preparar el siguiente paso.`;
  }

  if (canOfferSlots(sector, intent, c, missing)) {
    state.awaitingSlot = true;
    const slots = setOfferedSlots(state, slotsFor(sector, c));
    const labels = {
      inmobiliaria: 'Huecos para llamada o valoración',
      estetica: 'Huecos de valoración',
      legal: 'Huecos de consulta',
      formacion: 'Huecos para sesión de diagnóstico',
      restauracion: 'Turnos sugeridos'
    };
    response += offerSlots(sector, labels[sector] || 'Huecos disponibles', c, slots);
  }
  return response;
}


function buildSlotConfirmation(sector, selected, state) {
  state.awaitingSlot = false;
  state.awaitingAgendaDate = false;
  state.offeredSlots = [];
  applySelectedSlotToContext(sector, selected, state);
  const d = DEMOS[sector];
  if (sector === 'restauracion') {
    if (hasCompleteRestaurantCore(state.context)) {
      const missingContact = contactMissingFields(state.context);
      if (missingContact.length) {
        state.pendingFields = missingContact;
        state.awaitingContact = true;
        return `Perfecto. Anoto el turno ${selected}.\n\nResumen de reserva: ${formatContext(state.context, ['people', 'date', 'time', 'allergy', 'menu_type', 'event_type'])}.\n\nPara dejarlo preparado falta ${formatMissingContact(missingContact)}.`;
      }
      return buildRestauracionResponse({ intent: state.lastIntent || 'reserva' }, state, selected);
    }
  }
  return `Perfecto. Dejo preparado el siguiente paso para ${selected}.\n\nResumen para el equipo: ${state.lastIntent || 'consulta'} · ${formatContext(state.context, Object.keys(state.context))}.\n\n${d.name} no solo responde: registra intención, contexto y prioridad para que una persona pueda cerrar la oportunidad con más velocidad.`;
}

function estimateInmo(context) {
  if (!context.sqm) return null;
  const zoneClean = norm(context.zone || 'alicante');
  const refs = [
    { name: 'Playa de San Juan', keys: ['playa de san juan', 'san juan', 'pau 5'], m2: 3350 },
    { name: 'Alicante centro', keys: ['alicante centro', 'centro'], m2: 2850 },
    { name: 'El Campello', keys: ['campello', 'muchavista'], m2: 2450 },
    { name: 'San Vicente del Raspeig', keys: ['san vicente'], m2: 1850 },
    { name: 'Alicante ciudad', keys: ['alicante'], m2: 2200 }
  ];
  const ref = refs.find(r => r.keys.some(k => zoneClean.includes(k))) || refs[4];
  let m2 = ref.m2;
  const adjustments = [];
  if (context.property_type === 'casa/chalet') { m2 *= 1.08; adjustments.push('+8% por tipología casa/chalet'); }
  if (context.property_type === 'ático') { m2 *= 1.12; adjustments.push('+12% por ático'); }
  if (context.condition === 'reformado') { m2 *= 1.08; adjustments.push('+8% por reforma'); }
  if (context.condition === 'obra nueva') { m2 *= 1.15; adjustments.push('+15% por obra nueva'); }
  if (context.condition === 'para reformar') { m2 *= 0.88; adjustments.push('-12% por reforma pendiente'); }
  if (context.extras?.length) { const premium = Math.min(context.extras.length * 0.025, 0.10); m2 *= (1 + premium); adjustments.push(`prima por extras: ${context.extras.slice(0, 4).join(', ')}`); }
  const center = context.sqm * m2;
  return { ref, low: center * 0.92, high: center * 1.08, center, adjustments };
}

function buildInmoResponse(analysis, state, text, isFollowUp) {
  const c = state.context;
  const missing = missingFields('inmobiliaria', analysis.intent, c);
  state.pendingFields = missing;
  const estimate = estimateInmo(c);
  const intro = isFollowUp ? 'Perfecto, actualizo el caso con lo que acabas de decir.' : 'Entendido. Lo trato como una oportunidad inmobiliaria, no como una conversación genérica.';

  if (['estimacion_compra', 'valoracion', 'vendedor'].includes(analysis.intent) && estimate && c.sqm && c.property_type) {
    state.awaitingSlot = true;
    const slots = setOfferedSlots(state, slotsFor('inmobiliaria'));
    return `${intro}\n\nDatos interpretados: ${formatContext(c, ['zone', 'property_type', 'sqm', 'bedrooms', 'condition'])}${c.extras ? ` · extras: ${c.extras.join(', ')}` : ''}.\n\nRango orientativo: ${euros(estimate.low)} - ${euros(estimate.high)}.\nPunto medio estimado: ${euros(estimate.center)}.\n\nRazonamiento: parto de una referencia aproximada en ${estimate.ref.name} y ajusto por tipología, estado y extras. ${estimate.adjustments.length ? 'Ajustes: ' + estimate.adjustments.join('; ') + '.' : 'Sin ajustes fuertes detectados.'}\n\nLímite profesional: esto no es tasación oficial ni sustituye una valoración con testigos reales vendidos, dirección exacta, altura, orientación y estado real.${offerSlots('inmobiliaria', 'Huecos para valoración o llamada', {}, slots)}`;
  }

  const questions = questionsFor('inmobiliaria', missing, 3);
  let response = `${intro}\n\nClasificación: ${analysis.intent}.\nDatos captados: ${formatContext(c, ['zone', 'property_type', 'sqm', 'bedrooms', 'budget', 'need'])}.`;
  if (missing.length > 0) {
    response += `\n\nPara avanzar sin inventar ni perder tiempo necesito:\n${questions.map(q => `- ${q}`).join('\n')}`;
  } else {
    response += `\n\nYa tengo una base suficiente para preparar el siguiente paso sin volver a preguntarte lo mismo.`;
  }
  if (canOfferSlots('inmobiliaria', analysis.intent, c, missing)) {
    state.awaitingSlot = true;
    const slots = setOfferedSlots(state, slotsFor('inmobiliaria'));
    response += offerSlots('inmobiliaria', 'Huecos disponibles', {}, slots);
  }
  return response;
}

function buildDentalResponse(analysis, state, text, isFollowUp) {
  const c = state.context;
  const missing = missingFields('dental', analysis.intent, c);
  state.pendingFields = missing;

  if (analysis.intent === 'urgencia') {
    const red = c.red_flags ? ' Además, has mencionado señales que conviene revisar con prioridad.' : '';
    const when = c.symptoms_time ? `\n\nAnoto duración: ${c.symptoms_time}.` : '';
    const availabilityNote = c.availability ? `\nDisponibilidad interpretada: ${c.availability}.` : '';
    const remainingQuestions = questionsFor('dental', missing, 3);

    let response = `Siento que estés con esa molestia. Lo trato como posible urgencia dental, no como una consulta informativa.${red}${when}${availabilityNote}\n\n`;

    if (remainingQuestions.length > 0) {
      response += `Para que recepción o clínica actúe con criterio, todavía necesito:\n${remainingQuestions.map(q => `- ${q}`).join('\n')}`;
    } else {
      response += 'Ya tengo lo mínimo para preparar el aviso: motivo, duración, señales de prioridad y disponibilidad.';
    }

    const canPropose = missing.length <= 1 || c.red_flags || c.symptoms_time;
    if (canPropose) {
      state.awaitingSlot = true;
      const slots = setOfferedSlots(state, slotsFor('dental', c));
      const label = String(c.availability || '').includes('no puede acudir hoy') ? 'Huecos alternativos de urgencia' : 'Huecos de urgencia';
      response += offerSlots('dental', label, c, slots);
    }

    response += `\n\nImportante: no puedo diagnosticar por chat. Si hay fiebre alta, hinchazón que avanza, sangrado abundante o dificultad para tragar/respirar, contacta con urgencias o con la clínica de inmediato.`;
    return response;
  }

  if (analysis.intent === 'presupuesto') {
    const questions = questionsFor('dental', missing, 3);
    return `Entendido. Lo enfoco como consulta de tratamiento/presupuesto.\n\nDatos captados: ${formatContext(c, ['treatment', 'budget'])}.\n\nAntes de hablar de precio con seriedad necesito:\n${questions.map(q => `- ${q}`).join('\n') || '- Confirmar si quieres valoración o llamada de recepción.'}\n\nLa cifra final dependerá de valoración clínica, diagnóstico y plan de tratamiento.`;
  }

  return `He clasificado tu mensaje como ${analysis.intent}.\n\nMi función es recoger motivo, prioridad y preferencia horaria, sin diagnosticar por chat.\n\nPara hacerlo bien:\n${questionsFor('dental', missing, 3).map(q => `- ${q}`).join('\n') || '- Dime si quieres cita, revisión, presupuesto o cambiar una cita.'}`;
}

function buildEsteticaResponse(analysis, state) {
  const c = state.context;
  const missing = missingFields('estetica', analysis.intent, c);
  state.pendingFields = missing;
  let response = `Entendido. Lo enfoco como consulta estética profesional.\n\nDatos captados: ${formatContext(c, ['service', 'zone_or_goal', 'first_time', 'timeframe'])}.\n\nAntes de recomendar o agendar, necesito:\n${questionsFor('estetica', missing, 3).map(q => `- ${q}`).join('\n') || '- Confirmar si buscas precio orientativo o cita de valoración.'}\n\nLímite profesional: la indicación final debe validarla el profesional en consulta.`;
  if (canOfferSlots('estetica', analysis.intent, c, missing)) {
    state.awaitingSlot = true;
    const slots = setOfferedSlots(state, slotsFor('estetica'));
    response += offerSlots('estetica', 'Huecos de valoración', {}, slots);
  }
  return response;
}

function buildLegalResponse(analysis, state) {
  const c = state.context;
  const missing = missingFields('legal', analysis.intent, c);
  state.pendingFields = missing;
  let response = `He clasificado tu caso como ${analysis.intent}.\n\nNo doy asesoramiento jurídico definitivo por chat. Mi función es preparar bien la consulta: tipo de asunto, urgencia, documentos y plazo.\n\nDatos captados: ${formatContext(c, ['province', 'documents', 'deadline', 'months'])}.\n\nPara avanzar necesito:\n${questionsFor('legal', missing, 3).map(q => `- ${q}`).join('\n') || '- Confirmar documentación y urgencia.'}`;
  if (canOfferSlots('legal', analysis.intent, c, missing)) {
    state.awaitingSlot = true;
    const slots = setOfferedSlots(state, slotsFor('legal'));
    response += offerSlots('legal', 'Huecos de consulta', {}, slots);
  }
  return response;
}

function buildFormationResponse(analysis, state, text, isFollowUp) {
  const c = state.context;
  let intent = analysis.intent;
  if (c.audience === 'individual' && ['empresa', 'programa'].includes(intent)) intent = 'individual';
  if (c.audience === 'equipo/empresa' && ['individual', 'programa'].includes(intent)) intent = 'empresa';
  state.lastIntent = intent;
  const missing = missingFields('formacion', intent, c);
  state.pendingFields = missing;
  const questions = questionsFor('formacion', missing, 2);
  const intro = isFollowUp ? 'Perfecto, ya no repito el bloque anterior: incorporo tu respuesta y sigo afinando.' : 'Lo trato como oportunidad de formación/coaching, no como simple información.';

  if (isFollowUp && c.audience === 'individual' && !c.objective) {
    return `${intro}\n\nEntonces lo enfoco como programa individual.\n\nPara proponerte algo útil, la siguiente pregunta no es “qué curso quieres”, sino qué resultado quieres provocar.\n\nDime una de estas opciones o escríbelo a tu manera:\n- vender más o comunicar mejor\n- liderar con más foco\n- mejorar hábitos y productividad\n- desbloquear una etapa profesional\n\nDespués te diré qué formato encaja mejor y si merece sesión de diagnóstico.`;
  }

  if (isFollowUp && c.audience === 'equipo/empresa' && !c.team_size) {
    return `${intro}\n\nEntonces lo enfoco como proyecto para equipo/empresa.\n\nPara dimensionarlo bien, dime cuántas personas participarían y qué cambio concreto queréis ver: más ventas, liderazgo, foco, cultura comercial o productividad.`;
  }

  let response = `${intro}\n\nDatos interpretados: ${formatContext(c, ['audience', 'team_size', 'objective', 'timeframe', 'budget'])}.\n\nRazonamiento: primero separo si es programa individual o de equipo; después miro objetivo, número de personas, plazo e impacto económico antes de proponer formato o precio.`;

  if (analysis.intent === 'precio' && missing.length > 0) {
    response += `\n\nSobre precio: aún no sería serio darte una cifra cerrada. Un programa individual, una formación puntual y un acompañamiento para equipo no se presupuestan igual.\n\nPara darte rango responsable necesito:\n${questions.map(q => `- ${q}`).join('\n')}`;
    return response;
  }

  if (missing.length > 0) {
    response += `\n\nPara afinar sin sonar a robot, respóndeme solo a esto:\n${questions.map(q => `- ${q}`).join('\n')}`;
  } else {
    response += `\n\nCon esta información ya tiene sentido pasar a diagnóstico y diseñar propuesta. Siguiente paso: sesión breve para concretar formato, indicadores y calendario.`;
  }

  if (canOfferSlots('formacion', intent, c, missing)) {
    state.awaitingSlot = true;
    const slots = setOfferedSlots(state, slotsFor('formacion'));
    response += offerSlots('formacion', 'Huecos para sesión de diagnóstico', {}, slots);
  }
  return response;
}


function buildRestauracionResponse(analysis, state, text = '') {
  const c = state.context;
  const intent = normalizeRestaurantIntent(analysis.intent, c, text);
  state.lastIntent = intent;
  const missingCore = missingFields('restauracion', intent, c);
  const kind = intent === 'grupo' || intent === 'evento' ? 'grupo/evento' : 'reserva';
  const capturedFields = ['people', 'date', 'time', 'allergy', 'menu_type', 'event_type', 'contact_name', 'contact_phone'];
  const captured = formatContext(c, capturedFields);
  let response = `Lo gestiono como solicitud de ${kind}.\n\nDatos captados: ${captured}.`;

  if (missingCore.length > 0) {
    state.pendingFields = missingCore;
    state.awaitingContact = false;
    const questions = questionsFor('restauracion', missingCore, 3);
    response += `\n\nPara cerrar bien la solicitud necesito:\n${questions.map(q => `- ${q}`).join('\n')}`;
    return response;
  }

  if (hasCompleteRestaurantCore(c)) {
    const missingContact = contactMissingFields(c);
    if (missingContact.length) {
      state.pendingFields = missingContact;
      state.awaitingContact = true;
      if (c.people && c.date && c.time && !c.menu_type && !c.event_type) {
        response += `\n\nHe leído ${c.date} como fecha, ${c.time} como hora y ${c.people} personas como comensales. No voy a pedir menú porque no lo has mencionado.`;
      }
      response += `\n\nPara dejarlo preparado solo falta confirmar ${formatMissingContact(missingContact)}.`;
      return response;
    }

    state.pendingFields = [];
    state.awaitingContact = false;
    return `Perfecto, ahora sí: dejo la solicitud de ${kind} preparada con datos coherentes.\n\nResumen final:\n- Fecha: ${c.date}\n- Hora: ${c.time}\n- Personas: ${c.people}${c.allergy ? `\n- Alergia/intolerancia: ${c.allergy}` : ''}${c.menu_type ? `\n- Menú: ${c.menu_type}` : ''}${c.event_type ? `\n- Tipo: ${c.event_type}` : ''}\n- Nombre: ${c.contact_name}\n- Teléfono: ${c.contact_phone}\n\nSiguiente paso: el equipo podría confirmar disponibilidad real y cerrar la reserva. Si quieres cambiar nombre, teléfono, fecha, hora o personas, dímelo y lo actualizo sin reiniciar la conversación.`;
  }

  state.pendingFields = missingCore;
  const questions = questionsFor('restauracion', missingCore, 3);
  if (questions.length) {
    response += `\n\nPara cerrar bien la solicitud necesito:\n${questions.map(q => `- ${q}`).join('\n')}`;
  } else {
    response += `\n\nTengo información parcial. Dime fecha, hora y número de personas para dejarlo preparado.`;
  }
  return response;
}

function buildBusinessResponse(sector, analysis, state, text, isFollowUp) {
  state.lastIntent = analysis.intent || state.lastIntent || 'consulta';
  if (sector === 'inmobiliaria') return buildInmoResponse(analysis, state, text, isFollowUp);
  if (sector === 'dental') return buildDentalResponse(analysis, state, text, isFollowUp);
  if (sector === 'estetica') return buildEsteticaResponse(analysis, state, text, isFollowUp);
  if (sector === 'legal') return buildLegalResponse(analysis, state, text, isFollowUp);
  if (sector === 'formacion') return buildFormationResponse(analysis, state, text, isFollowUp);
  if (sector === 'restauracion') return buildRestauracionResponse(analysis, state, text);
  return buildAmbiguous(sector, text);
}


function detectNexusSectorLocal(text, state = {}) {
  const clean = norm(text);
  const rules = {
    inmobiliaria: ['inmobiliaria', 'piso', 'casa', 'vivienda', 'portal', 'idealista', 'comprar', 'vender', 'valoracion', 'valoración', 'visita', 'garaje', 'terraza'],
    dental: ['dental', 'dentista', 'muela', 'diente', 'implante', 'ortodoncia', 'clinica dental', 'clínica dental', 'dolor', 'hinchada'],
    estetica: ['estetica', 'estética', 'botox', 'bótox', 'laser', 'láser', 'hialuronico', 'hialurónico', 'labios', 'manchas'],
    legal: ['legal', 'abogado', 'despacho', 'herencia', 'testamento', 'divorcio', 'despido', 'inquilino', 'contrato'],
    formacion: ['formacion', 'formación', 'coaching', 'curso', 'consultoria', 'consultoría', 'ventas', 'liderazgo', 'comerciales', 'equipo', 'alto rendimiento'],
    restauracion: ['restaurante', 'reserva', 'mesa', 'reservar', 'menu', 'menú', 'alergia', 'sin gluten', 'grupo', 'cena de empresa'],
    personalizado: ['personalizado', 'a medida', 'custom', 'otro sector', 'no encaja', 'mi negocio']
  };
  let best = { sector: state.sector || 'desconocido', score: 0 };
  Object.entries(rules).forEach(([sector, words]) => {
    const score = scoreKeywordSet(clean, words);
    if (score > best.score) best = { sector, score };
  });
  return best.score ? best.sector : (state.sector || 'desconocido');
}

function agentNameForNexusSector(sector) {
  return {
    inmobiliaria: 'InmoAgent',
    dental: 'DentIA',
    estetica: 'BeautyAgent',
    legal: 'LexAgent',
    formacion: 'CoachAgent',
    restauracion: 'ReservaAgent',
    personalizado: 'Agente personalizado',
    desconocido: 'Veyra AI Nexus'
  }[sector] || 'Agente personalizado';
}

function detectNexusIntentLocal(text) {
  const clean = norm(text);
  if (OUT_OF_SCOPE_RULES.find(r => containsAny(clean, r.keywords))) return 'fuera_alcance';
  if (containsAny(clean, ['que agente me conviene', 'qué agente me conviene', 'que agente necesito', 'cual me conviene', 'recomiendame un agente', 'recomiéndame un agente'])) return 'recomendador';
  if (containsAny(clean, ['cuanto cuesta', 'cuánto cuesta', 'precio', 'planes', 'tarifa', 'mensual', 'setup', 'coste'])) return 'precio';
  if (containsAny(clean, ['quiero contratar', 'contratarlo', 'comprar', 'pagar', 'activar', 'alta'])) return 'compra';
  if (containsAny(clean, ['demo', 'probar', 'simular', 'verlo funcionando'])) return 'demo';
  if (containsAny(clean, ['caro', 'privacidad', 'rgpd', 'miedo', 'funciona', 'garantia', 'garantía', 'complicado', 'crm'])) return 'objecion';
  if (containsAny(clean, ['cita', 'llamada', 'reunion', 'reunión', 'whatsapp', 'hueco', 'agenda', 'mañana', 'manana', 'jueves', 'viernes'])) return 'agenda';
  if (isPureGreeting(text)) return 'saludo';
  return 'consulta_vertical';
}

function extractNexusBudget(text) {
  const clean = norm(text);
  const match = clean.match(/(?:hasta|maximo|max|presupuesto|inversion|invertir|unos|sobre)?\s*(\d{1,3}(?:[\.\s]\d{3})+|\d{3,7})(?:\s*(k|mil))?\s*(?:€|euros|eur)?/);
  if (!match) return '';
  let value = Number(match[1].replace(/[\.\s]/g, ''));
  if (match[2]) value *= 1000;
  if (!Number.isFinite(value) || value < 300) return '';
  return `${value.toLocaleString('es-ES')} €`;
}

function updateNexusLocalState(state, text, sector, intent) {
  const clean = norm(text);
  state.turn = (state.turn || 0) + 1;
  state.messages = state.messages || [];
  state.messages.push({ role: 'user', text });
  if (state.messages.length > 12) state.messages.shift();
  if (sector && sector !== 'desconocido') state.sector = sector;
  state.intent = intent;
  state.agent = agentNameForNexusSector(state.sector || sector);
  const budget = extractNexusBudget(text);
  if (budget) state.budget = budget;
  if (containsAny(clean, ['urgente', 'hoy', 'esta semana', 'ya', 'cuanto antes'])) state.urgency = 'alta';
  if (containsAny(clean, ['para mi', 'para mí', 'individual', 'no es para equipo'])) {
    state.audience = 'individual';
    delete state.teamSize;
  }
  const team = clean.match(/\b(\d{1,3})\s+(comerciales|personas|vendedores|gerentes|mandos)\b/);
  if (team && !containsAny(clean, ['no es para equipo', 'para mi', 'para mí'])) {
    state.audience = 'equipo';
    state.teamSize = team[1];
  }
  if (containsAny(clean, ['mañana', 'manana', 'hoy', 'jueves', 'viernes', 'tarde', 'noche'])) state.lastAvailability = text;
  if (containsAny(clean, ['pierdo', 'necesito', 'busco', 'quiero', 'dolor', 'no paga', 'leads', 'reservas', 'presupuestos'])) state.problem = text;
  return state;
}

function nexusTemperatureLocal(text, state, intent) {
  const clean = norm(text);
  let score = 15;
  if (state.sector && state.sector !== 'desconocido') score += 15;
  if (['precio', 'compra'].includes(intent)) score += 30;
  if (['demo', 'agenda'].includes(intent)) score += 25;
  if (containsAny(clean, ['urgente', 'hoy', 'ya', 'cuanto antes', 'cara hinchada'])) score += 22;
  if (containsAny(clean, ['pierdo', 'leads', 'presupuestos', 'dolor', 'no paga', 'plazo'])) score += 15;
  if (state.budget) score += 12;
  if (score >= 80) return 'prioritario';
  if (score >= 60) return 'caliente';
  if (score >= 35) return 'templado';
  return 'frío';
}

function generateNexusLocalResponse(text) {
  const state = getState('auto');
  const intent = detectNexusIntentLocal(text);
  const sector = detectNexusSectorLocal(text, state.context || {});
  state.context = updateNexusLocalState(state.context || {}, text, sector, intent);
  const currentSector = state.context.sector || sector;
  const agent = agentNameForNexusSector(currentSector);
  const temp = nexusTemperatureLocal(text, state.context, intent);

  if (intent === 'saludo') {
    return 'Hola, soy Veyra AI Nexus. Te ayudo a elegir el agente IA adecuado, cualificar el caso y avanzar hacia demo, WhatsApp, llamada o compra. Dime tu sector y qué conversación estás perdiendo: leads, citas, reservas, presupuestos o seguimiento.';
  }
  if (intent === 'fuera_alcance') {
    return 'Puedo ayudarte con agentes IA de negocio, no con tareas generales como cuentos, deberes, código o consultas ajenas a Veyra AI. Si me dices tu sector y el cuello de botella comercial, te recomiendo el agente adecuado.';
  }
  if (intent === 'recomendador' && currentSector === 'desconocido') {
    return 'Te lo recomiendo sin marearte. Necesito una foto mínima: ¿qué tipo de negocio tienes y qué se pierde hoy por no responder o no hacer seguimiento: leads, citas, reservas, presupuestos o soporte inicial?';
  }
  if (intent === 'precio') {
    const planHint = state.context.sector && state.context.sector !== 'desconocido' ? ' Con el contexto actual miraría primero Starter o Growth según volumen e integraciones.' : '';
    return `Los precios confirmados son Starter 497 €/mes, Growth 997 €/mes y Pro 1.997 €/mes. Setup recomendado: 1.500 € a 5.000 €, según integraciones, flujos y personalización.${planHint} No cerraría precio final sin revisar sector, canal, volumen y alcance.`;
  }
  if (intent === 'compra') {
    return 'Perfecto. Puedes ir a la sección de planes y abrir Stripe Checkout desde Starter, Growth o Pro. Si el alcance no está claro, mejor pedir diagnóstico por WhatsApp antes de pagar: así no compras una configuración corta para un problema grande.';
  }
  if (intent === 'objecion') {
    return 'Buena objeción. La IA no debe venderse como magia, sino como un flujo medible: tiempo de respuesta, citas generadas, presupuestos recuperados o leads cualificados. Empezaría con un piloto controlado, límites claros y revisión humana donde haya riesgo.';
  }
  if (currentSector !== 'desconocido') {
    const budget = state.context.budget ? ` Presupuesto guardado: ${state.context.budget}.` : '';
    const audience = state.context.audience === 'individual' ? ' He corregido el alcance a individual.' : state.context.teamSize ? ` He guardado equipo de ${state.context.teamSize} personas.` : '';
    const availability = state.context.lastAvailability ? ` Sobre agenda, tomo como preferencia: “${state.context.lastAvailability}”.` : '';
    return `Por lo que cuentas, el encaje natural es ${agent}. Nexus lo recomendaría para convertir conversaciones en acciones medibles: cualificar, priorizar, agendar y derivar al equipo humano.${budget}${audience}${availability}\n\nSiguiente paso: probar una demo con un caso real o pedir diagnóstico por WhatsApp. Lead ${temp}.`;
  }
  return 'No tengo aún suficiente contexto para recomendar sin inventar. Dime sector, tipo de cliente y problema principal: leads sin atender, citas, reservas, presupuestos, soporte inicial o seguimiento.';
}

function generateLocalResponse(sector, text) {
  const state = getState(sector);
  const clean = norm(text);
  if (!clean) return 'Escríbeme una frase con lo que necesitas y te respondo dentro del ámbito del agente.';
  if (sector === 'auto') return generateNexusLocalResponse(text);
  state.turn += 1;

  if (isPureGreeting(text)) {
    state.awaitingSlot = false;
    state.pendingFields = [];
    return buildGreeting(sector);
  }

  const out = detectOutOfScope(sector, text);
  if (out) {
    state.pendingFields = [];
    state.awaitingSlot = false;
    return buildGuardrail(sector, out);
  }

  if (shouldHandleOperationalQuestion(sector, text, state)) {
    const operational = buildOperationalQuestionResponse(sector, text, state);
    if (operational) {
      state.lastBotResponse = operational;
      return operational;
    }
  }

  // Si el usuario pide otra fecha/hora después de haber visto huecos, no debe reiniciarse
  // ni repetir el bloque clínico/comercial. Primero respondemos a la intención real del turno.
  if (!state.awaitingSlot && hasRecentSlotProposal(state) && isAlternativeRequest(text)) {
    const alternative = buildAlternativeSlotsResponse(sector, text, state);
    state.lastBotResponse = alternative;
    return alternative;
  }

  if (state.awaitingSlot) {
    const selected = parseSlotSelection(text, state.offeredSlots);
    if (selected) {
      const confirmation = buildSlotConfirmation(sector, selected, state);
      state.lastBotResponse = confirmation;
      return confirmation;
    }
    if (isAlternativeRequest(text)) {
      const alternative = buildAlternativeSlotsResponse(sector, text, state);
      state.lastBotResponse = alternative;
      return alternative;
    }
    // Si el usuario no elige número, lo tratamos como nueva información y no como error.
    // Pero no dejamos que cualquier frase corta herede el contexto: se reanaliza con la puerta de ámbito.
    state.awaitingSlot = false;
  }

  let analysis = classifyIntent(sector, text, state);
  const entities = extractEntities(sector, text, state);
  const pendingEntities = extractPendingAnswers(sector, text, state, entities);
  Object.assign(entities, pendingEntities);
  Object.assign(entities, sanitizeEntities(sector, text, entities, state));
  const answeredPendingQuestion = Object.keys(pendingEntities).length > 0;
  if (answeredPendingQuestion) {
    analysis = { ...analysis, inScope: true, fieldAnswer: true, intent: state.lastIntent || analysis.intent || 'consulta' };
  }
  if (entities.intent_override) {
    analysis = { ...analysis, intent: entities.intent_override, inScope: true, intentScore: Math.max(analysis.intentScore || 0, 2) };
    delete entities.intent_override;
  }
  const correction = isCorrectionText(text);
  const hasBusinessEntity = Object.keys(entities).length > 0;
  if (analysis.intent === 'consulta' && state.lastIntent && hasBusinessEntity) {
    analysis = { ...analysis, intent: state.lastIntent, inScope: true };
  }
  const isFollowUp = correction || analysis.fieldAnswer || (hasBusinessEntity && state.lastIntent);

  if (!analysis.inScope && !hasBusinessEntity) {
    return buildAmbiguous(sector, text);
  }

  const hadPreviousContext = Boolean(state.lastIntent || Object.keys(state.context || {}).length);
  if (shouldStartNewCase(sector, text, state, entities, correction)) {
    state.context = {};
    state.pendingFields = [];
    state.awaitingSlot = false;
    state.awaitingContact = false;
    state.offeredSlots = [];
    state.lastIntent = '';
  }
  mergeContext(state, entities);
  state.lastUserText = text;

  let response = (correction && hadPreviousContext)
    ? buildCorrectionResponse(sector, analysis, state)
    : buildBusinessResponse(sector, analysis, state, text, isFollowUp);
  response = qualityGateLocalResponse(sector, text, response, state, analysis);
  response = finalCoherenceReview(sector, text, response, state);
  if (hasGreetingPrefix(text) && !response.startsWith('Hola') && !isFollowUp) {
    response = `Hola, encantado. ${response}`;
  }
  state.lastBotResponse = response;
  return response;
}

function parseSlotSelection(text, slots) {
  const clean = norm(text);
  if (!slots || !slots.length) return null;

  // Importante: no vale detectar cualquier número suelto.
  // "lo tengo desde hace 3 días" NO es escoger la opción 3.
  let match = clean.match(/^([1-9])$/);
  if (!match) match = clean.match(/^(opcion|opción|numero|número|elijo|escojo|prefiero|quiero|reservo|reservar|me quedo con|la|el)\s+([1-9])$/);
  if (!match) return null;

  const raw = match[2] || match[1];
  const idx = Number(raw) - 1;
  return slots[idx] || null;
}

function getSessionPhone(sector) {
  const key = `veyra_demo_session_${sector}`;
  let phone = '';
  try { phone = localStorage.getItem(key) || ''; } catch (e) { phone = ''; }
  if (!phone) {
    phone = '+34999000' + Math.floor(Math.random() * 999999).toString().padStart(6, '0');
    try { localStorage.setItem(key, phone); } catch (e) { /* noop */ }
  }
  return phone;
}


function getNexusSessionId() {
  const key = 'veyra_nexus_session_id';
  let id = '';
  try { id = localStorage.getItem(key) || ''; } catch (e) { id = ''; }
  if (!id) {
    id = 'web_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
    try { localStorage.setItem(key, id); } catch (e) { /* noop */ }
  }
  return id;
}

function appendCtaBubble(cta) {
  if (!chatLog || !cta || !cta.label || !cta.url || cta.type === 'none') return;
  const wrap = document.createElement('div');
  wrap.className = 'bubble bot cta-bubble';
  const link = document.createElement('a');
  link.className = 'btn btn-primary btn-small';
  link.href = cta.url;
  link.textContent = cta.label;
  if (!cta.url.startsWith('#')) {
    link.target = '_blank';
    link.rel = 'noopener';
  }
  wrap.appendChild(link);
  chatLog.appendChild(wrap);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function appendBubble(text, type = 'bot') {
  if (!chatLog) return;
  const el = document.createElement('div');
  el.className = `bubble ${type}`;
  el.textContent = text;
  chatLog.appendChild(el);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function resetChat() {
  if (!chatLog || !sectorSelect) return;
  const sector = sectorSelect.value;
  resetState(sector);
  chatLog.innerHTML = '';
  appendBubble(`Hola, soy ${DEMOS[sector].name}. Soy un agente de negocio: leo intención, contexto y límites. Pruébame con una consulta real o con un saludo normal.`, 'bot');
  if (chatAgentName) chatAgentName.textContent = DEMOS[sector].name;
}

function renderSamples() {
  if (!sampleList || !sectorSelect || !promptBox) return;
  const sector = sectorSelect.value;
  sampleList.innerHTML = '';
  DEMOS[sector].samples.forEach(sample => {
    const btn = document.createElement('button');
    btn.className = 'sample-btn';
    btn.type = 'button';
    btn.textContent = sample;
    btn.addEventListener('click', () => {
      promptBox.value = sample;
      if (chatInput) chatInput.value = sample;
    });
    sampleList.appendChild(btn);
  });
  promptBox.value = DEMOS[sector].samples[0];
  if (chatInput) chatInput.value = DEMOS[sector].samples[0];
  resetChat();
}

async function tryApiResponse(sector, text) {
  const useApi = apiToggle && apiToggle.checked;
  if (!useApi) return null;

  try {
    const nexusApiBase = window.VEYRA_NEXUS_API || (['localhost', '127.0.0.1'].includes(window.location.hostname) ? 'http://127.0.0.1:8000' : '');
    const res = await fetch(`${nexusApiBase}/api/nexus/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: getNexusSessionId(),
        tenant_id: 'demo-veyra',
        sector,
        body: text,
        channel: 'web-demo-nexus',
        profile_name: 'Visitante Web'
      })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.text) return data;
    }
  } catch (e) {
    // Si Nexus no está levantado, cae al endpoint antiguo o al modo local.
  }

  if (sector === 'auto') return null;
  try {
    const res = await fetch('http://127.0.0.1:8000/api/demo/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tenant_id: DEMOS[sector].tenant,
        phone: getSessionPhone(sector),
        body: text,
        channel: 'web-demo-v6-fallback',
        profile_name: 'Visitante Web'
      })
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.text ? { text: data.text, cta: null } : null;
  } catch (e) {
    return null;
  }
}

async function runDemo(text) {
  if (!sectorSelect || !text.trim()) return;
  const sector = sectorSelect.value;
  appendBubble(text, 'user');
  appendBubble('Leyendo mensaje, contexto y límites del agente...', 'bot');
  const last = chatLog?.lastElementChild;
  const apiPayload = await tryApiResponse(sector, text);
  const response = (apiPayload && apiPayload.text) || generateLocalResponse(sector, text);
  if (last) last.textContent = response;
  if (apiPayload && apiPayload.cta) appendCtaBubble(apiPayload.cta);
}

if (sectorSelect) {
  sectorSelect.addEventListener('change', renderSamples);
  renderSamples();
}
if (runBtn && promptBox) {
  runBtn.addEventListener('click', () => runDemo(promptBox.value));
}
if (chatSend && chatInput) {
  chatSend.addEventListener('click', () => {
    const value = chatInput.value;
    chatInput.value = '';
    runDemo(value);
  });
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const value = chatInput.value;
      chatInput.value = '';
      runDemo(value);
    }
  });
}
