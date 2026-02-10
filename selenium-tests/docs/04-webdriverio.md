# WebdriverIO

## ¿Qué es WebdriverIO?

**WebdriverIO** es un framework de automatización de pruebas para Node.js que actúa como un wrapper mejorado sobre Selenium WebDriver. Proporciona una API más moderna, fácil de usar y con mejores características que Selenium puro.

## WebdriverIO vs Selenium WebDriver

```mermaid
graph TB
    subgraph Selenium["Selenium WebDriver Puro"]
        SeleniumAPI[API más verbosa]
        SeleniumManual[Gestión manual de drivers]
        SeleniumBasic[Funcionalidades básicas]
    end
    
    subgraph WDIO["WebdriverIO"]
        WDIOSimple[API simplificada]
        WDIOAuto[Gestión automática de drivers]
        WDIOAdvanced[Funcionalidades avanzadas]
        WDIOSync[Async/Await nativo]
        WDIOUtils[Utilidades integradas]
    end
    
    Selenium --> WDIO
    WDIO -->|Mejora| Tests["Tests más fáciles de escribir"]
    
    style Selenium fill:#ff9800
    style WDIO fill:#9c27b0
    style Tests fill:#4caf50
```

## Arquitectura de WebdriverIO

```mermaid
graph TB
    subgraph TestLayer["Capa de Tests"]
        Specs[Test Specs<br/>.spec.js files]
        PageObjects[Page Objects]
    end
    
    subgraph WDIO["WebdriverIO Core"]
        CLI[CLI<br/>@wdio/cli]
        Runner[Runner<br/>@wdio/local-runner]
        Framework[Framework<br/>@wdio/mocha-framework]
        Reporter[Reporter<br/>@wdio/spec-reporter]
    end
    
    subgraph DriverLayer["Capa de Drivers"]
        ChromeDriver[ChromeDriver<br/>Auto-gestionado]
        GeckoDriver[GeckoDriver<br/>Auto-gestionado]
    end
    
    subgraph BrowserLayer["Navegadores"]
        Chrome[Chrome]
        Firefox[Firefox]
    end
    
    Specs --> CLI
    PageObjects --> CLI
    CLI --> Runner
    Runner --> Framework
    Framework --> Reporter
    Runner --> ChromeDriver
    Runner --> GeckoDriver
    ChromeDriver --> Chrome
    GeckoDriver --> Firefox
    
    style CLI fill:#9c27b0
    style Runner fill:#ba68c8
    style Framework fill:#ce93d8
    style Reporter fill:#e1bee7
```

## Componentes de WebdriverIO

### 1. @wdio/cli
Interfaz de línea de comandos para ejecutar pruebas.

```mermaid
flowchart LR
    User[Usuario] --> CLI[wdio CLI]
    CLI --> Parse[Parsea wdio.conf.js]
    Parse --> Init[Inicializa runner]
    Init --> Execute[Ejecuta tests]
    
    style CLI fill:#9c27b0
```

### 2. @wdio/local-runner
Ejecutor local que gestiona la ejecución de pruebas en tu máquina.

### 3. @wdio/mocha-framework
Integración con Mocha para estructura de tests (describe, it, beforeEach, etc.).

### 4. @wdio/globals
Proporciona APIs globales como `browser`, `$`, `$$`, `expect`.

### 5. @wdio/spec-reporter
Reporter que muestra resultados en consola.

## Configuración (wdio.conf.js)

```mermaid
graph TB
    Config[wdio.conf.js] --> Runner[runner: local]
    Config --> Specs[specs: archivos de test]
    Config --> Capabilities[capabilities: navegadores]
    Config --> Services[services: servicios]
    Config --> Framework[framework: mocha]
    Config --> Reporters[reporters: reportes]
    Config --> Hooks[hooks: eventos]
    
    Runner --> Execution[Ejecución]
    Specs --> Execution
    Capabilities --> Execution
    Services --> Execution
    Framework --> Execution
    Reporters --> Execution
    Hooks --> Execution
    
    style Config fill:#9c27b0
    style Execution fill:#4caf50
```

### Ejemplo de Configuración

```javascript
exports.config = {
  runner: "local",                    // Ejecutor local
  specs: ["./tests/**/*.spec.js"],    // Archivos de test
  capabilities: [{                    // Navegadores
    browserName: "chrome"
  }],
  services: [],                       // Servicios (vacío = auto)
  framework: "mocha",                 // Framework de testing
  reporters: ["spec"],                // Reporter
  baseUrl: "http://localhost:3000",   // URL base
  waitforTimeout: 10000,              // Timeout por defecto
};
```

## Comandos Principales de WebdriverIO

### Navegación

```mermaid
graph LR
    Navigate[Navegación] --> URL[browser.url]
    Navigate --> Back[browser.back]
    Navigate --> Forward[browser.forward]
    Navigate --> Refresh[browser.refresh]
    Navigate --> Title[browser.getTitle]
    
    style Navigate fill:#9c27b0
```

### Búsqueda de Elementos

```mermaid
graph TB
    Find[Buscar Elementos] --> Single["$ selector<br/>Un elemento"]
    Find --> Multiple["$$ selector<br/>Múltiples elementos"]
    Find --> Wait["waitForDisplayed<br/>Esperar elemento"]
    
    Single --> Actions[Acciones]
    Multiple --> Actions
    Wait --> Actions
    
    style Find fill:#9c27b0
    style Actions fill:#4caf50
```

### Interacción con Elementos

```mermaid
mindmap
    root((Interacción))
        Clics
            click
            doubleClick
            rightClick
        Texto
            setValue
            addValue
            clearValue
        Selección
            selectByIndex
            selectByVisibleText
            selectByAttribute
        Estado
            isDisplayed
            isEnabled
            isSelected
        Atributos
            getText
            getAttribute
            getCSSProperty
```

## Flujo de un Comando WebdriverIO

```mermaid
sequenceDiagram
    participant Test as Test Script
    participant WDIO as WebdriverIO
    participant Driver as ChromeDriver
    participant Browser as Chrome
    
    Test->>WDIO: await browser.click('#button')
    WDIO->>WDIO: Valida selector
    WDIO->>WDIO: Busca elemento
    WDIO->>WDIO: Espera que esté visible
    WDIO->>Driver: POST /session/{id}/element/{id}/click
    Driver->>Browser: Ejecuta click nativo
    Browser->>Browser: Dispara eventos JS
    Browser-->>Driver: Click ejecutado
    Driver-->>WDIO: HTTP 200 OK
    WDIO->>WDIO: Parsea respuesta
    WDIO-->>Test: Promise resuelto
```

## Ventajas de WebdriverIO

### 1. API Simplificada

**Selenium puro**:
```javascript
const element = await driver.findElement(By.id('username'));
await element.sendKeys('demo');
await element.submit();
```

**WebdriverIO**:
```javascript
await $('#username').setValue('demo');
await $('#username').submit();
```

### 2. Gestión Automática de Drivers

```mermaid
graph LR
    WDIO[WebdriverIO] --> Check{Driver<br/>disponible?}
    Check -->|No| Download[Descarga automática]
    Check -->|Sí| Use[Usa driver existente]
    Download --> Use
    Use --> Execute[Ejecuta tests]
    
    style WDIO fill:#9c27b0
    style Execute fill:#4caf50
```

### 3. Async/Await Nativo

WebdriverIO está diseñado desde cero para async/await, haciendo el código más limpio y legible.

### 4. Utilidades Integradas

- Screenshots automáticos
- Reportes visuales
- Integración con CI/CD
- Page Object Model simplificado

## Comparación: Selenium vs WebdriverIO

```mermaid
graph TB
    subgraph Comparison["Comparación"]
        Selenium["Selenium WebDriver<br/>❌ API verbosa<br/>❌ Gestión manual drivers<br/>✅ Estándar W3C<br/>✅ Multi-lenguaje"]
        WDIO["WebdriverIO<br/>✅ API simple<br/>✅ Auto-gestión drivers<br/>✅ Async/await nativo<br/>✅ Utilidades integradas<br/>❌ Solo JavaScript/TypeScript"]
    end
    
    Comparison --> Choice{¿Cuál elegir?}
    Choice -->|Multi-lenguaje| Selenium
    Choice -->|Solo JS/TS| WDIO
    
    style Selenium fill:#ff9800
    style WDIO fill:#9c27b0
```

## Hooks y Eventos

WebdriverIO proporciona hooks para personalizar el comportamiento:

```mermaid
graph TB
    Hooks[Hooks de WebdriverIO] --> OnPrepare[onPrepare<br/>Antes de tests]
    Hooks --> BeforeSuite[beforeSuite<br/>Antes de suite]
    Hooks --> BeforeTest[beforeTest<br/>Antes de test]
    Hooks --> AfterTest[afterTest<br/>Después de test]
    Hooks --> AfterSuite[afterSuite<br/>Después de suite]
    Hooks --> OnComplete[onComplete<br/>Al finalizar]
    
    OnPrepare --> Setup[Configuración inicial]
    BeforeTest --> TestSetup[Setup de test]
    AfterTest --> Screenshot[Captura si falla]
    OnComplete --> Cleanup[Limpieza]
    
    style Hooks fill:#9c27b0
```

## En este Proyecto

Este proyecto utiliza WebdriverIO porque:

1. **API más simple**: Código más legible y fácil de mantener
2. **Gestión automática**: No necesitas instalar drivers manualmente
3. **Integración Mocha**: Estructura de tests familiar
4. **Utilidades**: Screenshots automáticos en fallos
5. **Comunidad activa**: Buen soporte y documentación

## Comandos Útiles

```bash
# Ejecutar todos los tests
npm run test:e2e

# Ejecutar en modo headless
npm run test:e2e:headless

# Ejecutar un spec específico
npx wdio run wdio.conf.js --spec tests/e2e/specs/auth.spec.js

# Ejecutar en modo interactivo
npx wdio run wdio.conf.js --watch
```

## Recursos Adicionales

- [Documentación oficial de WebdriverIO](https://webdriver.io/)
- [Guía de mejores prácticas](https://webdriver.io/docs/bestpractices)
- [API Reference](https://webdriver.io/docs/api)
