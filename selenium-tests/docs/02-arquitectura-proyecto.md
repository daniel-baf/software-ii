# Arquitectura del Proyecto

## Estructura de Directorios

```mermaid
graph TD
    root[prueba-selenium/]
    
    root --> app[app/]
    root --> tests[tests/]
    root --> docs[docs/]
    root --> config[Archivos Config]
    
    app --> server[server.js<br/>Servidor Express]
    app --> public[public/<br/>Frontend HTML/CSS/JS]
    
    public --> pages[Páginas HTML<br/>login, dashboard, table, etc.]
    public --> assets[assets/<br/>CSS, JavaScript]
    
    tests --> e2e[e2e/]
    tests --> fixtures[fixtures/<br/>Datos de prueba]
    
    e2e --> specs[specs/<br/>Casos de prueba]
    e2e --> pageobjects[pageobjects/<br/>Page Objects]
    
    config --> package[package.json]
    config --> wdio[wdio.conf.js]
    config --> readme[README.md]
    
    style app fill:#e3f2fd
    style tests fill:#f3e5f5
    style config fill:#fff3e0
```

## Componentes Principales

### 1. Aplicación Demo (`app/`)

```mermaid
graph LR
    subgraph AppDemo["Aplicación Demo"]
        Server[server.js<br/>Express Server<br/>Puerto 3000]
        Static[Archivos Estáticos<br/>HTML, CSS, JS]
        Routes[Rutas HTTP<br/>/login, /dashboard, etc.]
    end
    
    Browser[Navegador<br/>localhost:3000] --> Server
    Server --> Static
    Server --> Routes
    
    style Server fill:#4caf50
    style Static fill:#81c784
    style Routes fill:#a5d6a7
```

**Propósito**: Proporcionar una aplicación web simple y determinística para probar todas las capacidades de Selenium.

**Páginas incluidas**:
- `index.html` - Página principal
- `login.html` - Autenticación
- `dashboard.html` - Panel después del login
- `table.html` - Tabla con filtros y ordenamiento
- `modal.html` - Modales y pop-ups
- `alerts.html` - Alertas del navegador
- `iframe.html` - Trabajo con iframes
- `dragdrop.html` - Drag and drop
- `upload.html` - Subida de archivos
- `windows.html` - Múltiples ventanas/tabs
- `dynamic.html` - Contenido dinámico

### 2. Suite de Pruebas (`tests/e2e/`)

```mermaid
graph TB
    subgraph TestSuite["Suite de Pruebas"]
        Specs[specs/<br/>Casos de Prueba]
        PageObjects[pageobjects/<br/>Page Object Model]
        Fixtures[fixtures/<br/>Datos de Prueba]
    end
    
    Specs -->|Usa| PageObjects
    Specs -->|Usa| Fixtures
    PageObjects -->|Hereda de| BasePage[BasePage.js]
    
    style Specs fill:#ff9800
    style PageObjects fill:#ffb74d
    style Fixtures fill:#ffcc80
```

**Estructura**:
- `specs/` - Archivos de prueba (`.spec.js`)
- `pageobjects/` - Clases que representan páginas
- `fixtures/` - Archivos de datos para pruebas

### 3. Configuración WebdriverIO (`wdio.conf.js`)

```mermaid
graph LR
    subgraph Config["Configuración WDIO"]
        Runner["Runner: local"]
        Specs["Specs: tests/e2e/specs/**"]
        Capabilities["Capabilities: Chrome"]
        Services["Services: vacío"]
        Framework["Framework: Mocha"]
        Reporters["Reporters: spec"]
    end
    
    Config --> Browser["Navegador Controlado"]
    
    style Config fill:#9c27b0
    style Browser fill:#ba68c8
```

## Flujo de Datos

```mermaid
sequenceDiagram
    participant Dev as Desarrollador
    participant NPM as npm scripts
    participant WDIO as WebdriverIO
    participant Driver as ChromeDriver
    participant Browser as Chrome Browser
    participant App as App Demo<br/>(Express)
    
    Dev->>NPM: npm run test:e2e
    NPM->>WDIO: wdio run wdio.conf.js
    WDIO->>WDIO: Lee configuración
    WDIO->>Driver: Inicia ChromeDriver
    Driver->>Browser: Abre navegador
    WDIO->>App: Verifica que app esté corriendo
    App-->>WDIO: OK (localhost:3000)
    
    loop Para cada test
        WDIO->>Browser: Navega a URL
        Browser->>App: GET /login
        App-->>Browser: HTML de login
        WDIO->>Browser: Busca elemento #username
        WDIO->>Browser: Escribe texto
        WDIO->>Browser: Click en botón
        Browser->>App: POST /login
        App-->>Browser: Redirige a /dashboard
        WDIO->>Browser: Verifica elemento
        Browser-->>WDIO: Resultado
    end
    
    WDIO->>WDIO: Genera reporte
    WDIO-->>Dev: Resultados de pruebas
```

## Interacción entre Componentes

```mermaid
graph TB
    subgraph TestLayer["Capa de Pruebas"]
        Spec[Test Spec<br/>auth.spec.js]
        PO[Page Object<br/>LoginPage.js]
    end
    
    subgraph WDIOLayer["Capa WebdriverIO"]
        WDIO[WebdriverIO<br/>API]
        Config[Configuración<br/>wdio.conf.js]
    end
    
    subgraph DriverLayer["Capa Driver"]
        ChromeDriver[ChromeDriver]
    end
    
    subgraph BrowserLayer["Capa Navegador"]
        Chrome[Chrome Browser]
    end
    
    subgraph AppLayer["Capa Aplicación"]
        Express[Express Server]
        HTML[HTML Pages]
    end
    
    Spec -->|Llama métodos| PO
    PO -->|Usa| WDIO
    WDIO -->|Comandos HTTP| ChromeDriver
    ChromeDriver -->|Protocolo WebDriver| Chrome
    Chrome -->|HTTP Requests| Express
    Express -->|HTML Response| Chrome
    Chrome -->|DOM| WDIO
    WDIO -->|Resultados| PO
    PO -->|Assertions| Spec
    
    style Spec fill:#ff9800
    style PO fill:#ffb74d
    style WDIO fill:#9c27b0
    style ChromeDriver fill:#2196f3
    style Chrome fill:#1976d2
    style Express fill:#4caf50
```

## Flujo de Ejecución de un Test

```mermaid
flowchart TD
    Start[Inicio: npm run test:e2e] --> LoadConfig[WebdriverIO carga wdio.conf.js]
    LoadConfig --> InitDriver[Inicializa ChromeDriver]
    InitDriver --> StartBrowser[Abre navegador Chrome]
    StartBrowser --> CheckApp{App corriendo?<br/>localhost:3000}
    
    CheckApp -->|No| Error[Error: App no disponible]
    CheckApp -->|Sí| LoadSpecs[Carga archivos .spec.js]
    
    LoadSpecs --> ForEachTest[Para cada test]
    ForEachTest --> BeforeEach[beforeEach: Limpia cookies]
    BeforeEach --> ExecuteTest[Ejecuta test]
    
    ExecuteTest --> OpenPage[Abre página]
    OpenPage --> Interact[Interactúa con elementos]
    Interact --> Assert[Verifica resultados]
    
    Assert --> TestPass{Test pasó?}
    TestPass -->|No| Screenshot[Captura screenshot]
    TestPass -->|Sí| NextTest[Siguiente test]
    Screenshot --> NextTest
    
    NextTest --> MoreTests{Más tests?}
    MoreTests -->|Sí| ForEachTest
    MoreTests -->|No| GenerateReport[Genera reporte]
    
    GenerateReport --> CloseBrowser[Cierra navegador]
    CloseBrowser --> End[Fin]
    Error --> End
    
    style Start fill:#4caf50
    style Error fill:#f44336
    style End fill:#4caf50
```

## Dependencias del Proyecto

```mermaid
graph LR
    subgraph Runtime["Runtime Dependencies"]
        Express["express<br/>Servidor web"]
        CookieParser["cookie-parser<br/>Manejo de cookies"]
        Multer["multer<br/>Upload de archivos"]
    end
    
    subgraph DevDeps["Dev Dependencies"]
        WDIO_CLI["@wdio/cli<br/>CLI de WebdriverIO"]
        WDIO_Globals["@wdio/globals<br/>APIs globales"]
        WDIO_Runner["@wdio/local-runner<br/>Ejecutor local"]
        WDIO_Mocha["@wdio/mocha-framework<br/>Framework Mocha"]
        WDIO_Reporter["@wdio/spec-reporter<br/>Reporter"]
        WebdriverIO["webdriverio<br/>Core library"]
    end
    
    Express --> App["App Demo"]
    CookieParser --> App
    Multer --> App
    
    WDIO_CLI --> Tests["Tests"]
    WDIO_Globals --> Tests
    WDIO_Runner --> Tests
    WDIO_Mocha --> Tests
    WDIO_Reporter --> Tests
    WebdriverIO --> Tests
    
    style Express fill:#4caf50
    style WebdriverIO fill:#9c27b0
```

## Ventajas de esta Arquitectura

1. **Separación de responsabilidades**: App demo separada de las pruebas
2. **Page Object Model**: Código reutilizable y mantenible
3. **Configuración centralizada**: Todo en `wdio.conf.js`
4. **Determinístico**: App demo controlada, sin dependencias externas
5. **Extensible**: Fácil agregar nuevas páginas y tests
