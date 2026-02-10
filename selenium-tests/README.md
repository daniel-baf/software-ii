# Selenium Demo (WebdriverIO)

Proyecto local para probar Selenium con WebdriverIO sobre una app de demo
determinística. Incluye escenarios de login, tablas, modales, alerts, iframes,
drag & drop, file upload, múltiples ventanas y contenido dinámico.

## Requisitos

- Node.js 18+
- Google Chrome instalado
- Java (requerido por el servicio `selenium-standalone`)

## Instalar dependencias

```bash
npm install
```

## Levantar la app demo

```bash
npm start
```

La app quedará en `http://localhost:3000`.

## Ejecutar pruebas E2E

En otra terminal, con la app corriendo:

```bash
npm run test:e2e
```

Modo headless:

```bash
npm run test:e2e:headless
```

## Estructura

- `app/server.js`: servidor Express
- `app/public/`: páginas de demo
- `tests/e2e/pageobjects/`: Page Object Model
- `tests/e2e/specs/`: casos de prueba
- `tests/fixtures/`: archivos de prueba
- `wdio.conf.js`: configuración de WebdriverIO

## Escenarios cubiertos

- Login válido / inválido con cookie
- Tabla con filtro y ordenamiento
- Modal con open/close
- Alerts, confirm y prompt
- IFrame con acciones internas
- Drag & drop HTML5
- File upload con POST
- Múltiples ventanas/tabs
- Contenido dinámico con waits

## Evidencias

Screenshots de fallos en `artifacts/screenshots`.
