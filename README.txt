VEYRA AI - WEB COMERCIAL V4
===========================

Esta es la web del Modelo 04. El cambio importante está en la demo de chat.

La demo ya no funciona como una lista de frases fijas. Ahora tiene una capa local de razonamiento contextual en JavaScript:

- detecta saludos puros;
- detecta saludos con necesidad;
- clasifica intención por sector;
- extrae datos básicos;
- conserva memoria durante la conversación;
- evita repetir siempre el mismo bloque;
- corta temas fuera de ámbito;
- mantiene una sesión estable cuando se conecta a la API local.


CÓMO ABRIR LA WEB
=================

Opción rápida:

1. Entra en esta carpeta:

    02_WEB_COMERCIAL

2. Abre:

    index.html

Opción recomendada:

    python -m http.server 8080

Y abrir:

    http://localhost:8080


MODO DE FUNCIONAMIENTO
======================

1. Modo web estático
--------------------
No necesita API. La lógica vive en:

    assets/app.js

Sirve para enseñar la demo comercial sin instalar nada.

2. Modo API local
-----------------
Primero levanta la API:

    cd ../01_PLATAFORMA_CORE
    python -m uvicorn apps.api_server:app --reload

Después marca en la web:

    Usar API local si está levantada en http://127.0.0.1:8000

La web usa un identificador de sesión estable por sector, para que el backend recuerde el contexto.


PRUEBAS RÁPIDAS
===============

En “IA para formación/coaching” prueba:

    hola como estas

    Hola buenos días, necesito formación en ventas para un equipo de 12 comerciales este trimestre.

    para mi

    quiero saber que tengo de comer

    escríbeme un cuento

Resultado esperado:

- saludo lógico;
- oportunidad de formación bien clasificada;
- respuesta contextual a “para mí”;
- guardrail para comida;
- guardrail para cuento.
