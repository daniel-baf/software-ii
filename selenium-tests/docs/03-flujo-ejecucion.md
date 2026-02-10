# Flujo de Ejecución Paso a Paso

## Visión General

Este documento explica detalladamente cómo se ejecuta una prueba desde que ejecutas el comando hasta que obtienes los resultados.

## Flujo Completo de Ejecución

```mermaid
flowchart TD
    Start[Usuario ejecuta:<br/>npm run test:e2e] --> ParseCmd[Shell parsea comando]
    ParseCmd --> NPM[NPM busca script en package.json]
    NPM --> FindScript{Encuentra<br/>test:e2e?}
    
    FindScript -->|No| Error1[Error: Script no encontrado]
    FindScript -->|Sí| Execute[Ejecuta: wdio run wdio.conf.js]
    
    Execute --> WDIO_CLI[WebdriverIO CLI inicia]
    WDIO_CLI --> LoadConfig[Carga wdio.conf.js]
    LoadConfig --> ParseConfig[Parsea configuración]
    
    ParseConfig --> InitRunner[Inicializa Local Runner]
    InitRunner --> CheckSpecs[Verifica archivos specs/**/*.spec.js]
    CheckSpecs --> SpecsFound{Archivos<br/>encontrados?}
    
    SpecsFound -->|No| Error2[Error: No se encontraron specs]
    SpecsFound -->|Sí| LoadFramework[Carga framework Mocha]
    
    LoadFramework --> InitDriver[Inicializa ChromeDriver]
    InitDriver --> DownloadDriver{ChromeDriver<br/>disponible?}
    
    DownloadDriver -->|No| AutoDownload[Descarga automática<br/>ChromeDriver compatible]
    DownloadDriver -->|Sí| StartDriver[Inicia proceso ChromeDriver]
    AutoDownload --> StartDriver
    
    StartDriver --> StartBrowser[Abre navegador Chrome]
    StartBrowser --> CheckApp[Verifica app en localhost:3000]
    CheckApp --> AppRunning{App<br/>respondiendo?}
    
    AppRunning -->|No| Error3[Error: App no disponible<br/>Ejecuta: npm start]
    AppRunning -->|Sí| CreateSession[Crea sesión WebDriver]
    
    CreateSession --> ForEachSpec[Para cada archivo .spec.js]
    ForEachSpec --> LoadSpec[Carga y parsea spec]
    LoadSpec --> ForEachTest[Para cada test en spec]
    
    ForEachTest --> BeforeEach[Ejecuta beforeEach hooks]
    BeforeEach --> ExecuteTest[Ejecuta test]
    
    ExecuteTest --> TestSteps[Ejecuta pasos del test]
    TestSteps --> AfterTest[Ejecuta afterTest hook]
    AfterTest --> ScreenshotCheck{Test<br/>falló?}
    
    ScreenshotCheck -->|Sí| TakeScreenshot[Captura screenshot<br/>en artifacts/screenshots/]
    ScreenshotCheck -->|No| NextTest[Siguiente test]
    TakeScreenshot --> NextTest
    
    NextTest --> MoreTests{Más tests<br/>en spec?}
    MoreTests -->|Sí| ForEachTest
    MoreTests -->|No| MoreSpecs{Más specs?}
    
    MoreSpecs -->|Sí| ForEachSpec
    MoreSpecs -->|No| GenerateReport[Genera reporte]
    
    GenerateReport --> CloseSession[Cierra sesión WebDriver]
    CloseSession --> StopDriver[Detiene ChromeDriver]
    StopDriver --> CloseBrowser[Cierra navegador]
    CloseBrowser --> End[Fin: Muestra resultados]
    
    Error1 --> End
    Error2 --> End
    Error3 --> End
    
    style Start fill:#4caf50
    style Error1 fill:#f44336
    style Error2 fill:#f44336
    error3 fill:#f44336
    style End fill:#4caf50
```

## Ejemplo Detallado: Test de Login

Vamos a seguir paso a paso cómo se ejecuta un test específico:

```mermaid
sequenceDiagram
    participant User as Usuario
    participant CLI as WebdriverIO CLI
    participant Runner as Local Runner
    participant Driver as ChromeDriver
    participant Browser as Chrome
    participant App as App Demo
    participant FS as File System
    
    User->>CLI: npm run test:e2e
    CLI->>Runner: Inicializa runner
    Runner->>Driver: Inicia proceso
    Driver->>Browser: Abre navegador
    
    Note over Runner,Browser: Test: "permite login y logout"
    
    Runner->>Browser: browser.deleteCookies()
    Browser-->>Runner: Cookies eliminadas
    
    Runner->>Browser: browser.url('/login')
    Browser->>App: GET http://localhost:3000/login
    App-->>Browser: HTML de login.html
    Browser-->>Runner: Página cargada
    
    Runner->>Browser: Busca elemento #username
    Browser-->>Runner: Elemento encontrado
    
    Runner->>Browser: Escribe "demo" en #username
    Browser-->>Runner: Texto escrito
    
    Runner->>Browser: Busca elemento #password
    Browser->>Browser: Escribe "demo" en #password
    Browser-->>Runner: Texto escrito
    
    Runner->>Browser: Click en botón #loginBtn
    Browser->>App: POST /login (con credenciales)
    App->>App: Valida credenciales
    App-->>Browser: Redirige a /dashboard (cookie de sesión)
    Browser->>App: GET /dashboard
    App-->>Browser: HTML de dashboard.html
    Browser-->>Runner: Navegación completada
    
    Runner->>Browser: Busca elemento .welcome-text
    Browser-->>Runner: Elemento encontrado
    
    Runner->>Runner: expect(welcomeText).toBeDisplayed()
    Runner->>Runner: Verifica que elemento esté visible
    Runner-->>Runner: ✅ Assertion pasa
    
    Runner->>Runner: expect(welcomeText).toHaveTextContaining("Bienvenido")
    Runner->>Browser: Obtiene texto del elemento
    Browser-->>Runner: "Bienvenido, demo!"
    Runner->>Runner: Verifica que contenga "Bienvenido"
    Runner-->>Runner: ✅ Assertion pasa
    
    Runner->>Browser: Click en .logout-btn
    Browser->>App: POST /logout
    App-->>Browser: Redirige a /login (elimina cookie)
    Browser-->>Runner: Navegación completada
    
    Runner->>Browser: Verifica mensaje de logout
    Browser-->>Runner: Mensaje encontrado
    Runner->>Runner: ✅ Todas las assertions pasan
    
    Runner->>FS: Guarda resultados
    Runner->>Browser: Cierra navegador
    Runner-->>User: ✅ Test pasó
```

## Ciclo de Vida de un Test

```mermaid
stateDiagram-v2
    [*] --> Inicializado: WebdriverIO inicia
    Inicializado --> DriverIniciado: ChromeDriver arranca
    DriverIniciado --> NavegadorAbierto: Navegador se abre
    NavegadorAbierto --> SesionCreada: Sesión WebDriver creada
    
    SesionCreada --> BeforeEach: Ejecuta beforeEach
    BeforeEach --> TestEjecutando: Inicia test
    
    TestEjecutando --> Interactuando: Interactúa con página
    Interactuando --> Esperando: Espera elementos
    Esperando --> Verificando: Verifica assertions
    Verificando --> Interactuando: Más interacciones
    Verificando --> TestCompletado: Test termina
    
    TestCompletado --> AfterTest: Ejecuta afterTest
    AfterTest --> Screenshot: Si falló, captura screenshot
    Screenshot --> SiguienteTest: Siguiente test
    AfterTest --> SiguienteTest: Si pasó
    
    SiguienteTest --> BeforeEach: Más tests
    SiguienteTest --> TodosCompletados: No más tests
    
    TodosCompletados --> SesionCerrada: Cierra sesión
    SesionCerrada --> NavegadorCerrado: Cierra navegador
    NavegadorCerrado --> DriverDetenido: Detiene driver
    DriverDetenido --> [*]: Fin
```

## Comandos WebDriver en Acción

Cuando ejecutas un comando como `browser.click('#button')`, esto es lo que sucede:

```mermaid
graph TB
    Start[Test: browser.click('#button')] --> Step1[1. WebdriverIO busca elemento]
    Step1 --> Step2[2. Espera a que elemento esté visible<br/>waitForDisplayed]
    Step2 --> Step3[3. Convierte a comando HTTP]
    Step3 --> Step4[4. POST /session/{id}/element/{id}/click]
    Step4 --> Step5[5. ChromeDriver recibe request]
    Step5 --> Step6[6. ChromeDriver ejecuta acción nativa]
    Step6 --> Step7[7. Chrome ejecuta click en DOM]
    Step7 --> Step8[8. Chrome dispara eventos JS]
    Step8 --> Step9[9. Respuesta HTTP 200 OK]
    Step9 --> Step10[10. WebdriverIO resuelve Promise]
    Step10 --> End[Test continúa]
    
    style Start fill:#4caf50
    style End fill:#4caf50
```

## Manejo de Errores

```mermaid
flowchart TD
    Test[Test ejecutándose] --> Error{Error<br/>ocurrió?}
    
    Error -->|No| Success[Test pasa]
    Error -->|Sí| ErrorType{Tipo de<br/>error?}
    
    ErrorType -->|Timeout| TimeoutError[Elemento no encontrado<br/>en tiempo esperado]
    ErrorType -->|Assertion| AssertionError[Assertion falló]
    ErrorType -->|Network| NetworkError[App no responde]
    ErrorType -->|JavaScript| JSError[Error en código JS]
    
    TimeoutError --> Screenshot[Captura screenshot]
    AssertionError --> Screenshot
    NetworkError --> LogError[Registra error]
    JSError --> LogError
    
    Screenshot --> AfterTestHook[Ejecuta afterTest hook]
    LogError --> AfterTestHook
    AfterTestHook --> MarkFailed[Marca test como fallido]
    MarkFailed --> Report[Agrega a reporte]
    
    Success --> Report
    Report --> Continue[Continúa con siguiente test]
    
    style Error fill:#ff9800
    style Success fill:#4caf50
    style MarkFailed fill:#f44336
```

## Tiempos y Esperas

WebdriverIO maneja diferentes tipos de esperas:

```mermaid
graph LR
    subgraph Waits["Tipos de Esperas"]
        Implicit[Implicit Wait<br/>waitforTimeout: 10000ms]
        Explicit[Explicit Wait<br/>waitForDisplayed]
        Fixed[Fixed Wait<br/>browser.pause]
    end
    
    Implicit --> UseCase1[Usado automáticamente<br/>en cada búsqueda]
    Explicit --> UseCase2[Usado manualmente<br/>cuando esperas algo específico]
    Fixed --> UseCase3[Usado raramente<br/>solo cuando es necesario]
    
    style Implicit fill:#e3f2fd
    style Explicit fill:#fff3e0
    style Fixed fill:#fce4ec
```

**Ejemplo de espera explícita**:
```javascript
// Espera hasta 10 segundos a que el elemento esté visible
await LoginPage.username.waitForDisplayed({ timeout: 10000 });
```

## Paralelización (Futuro)

Actualmente `maxInstances: 1`, pero se puede paralelizar:

```mermaid
graph TB
    subgraph Parallel["Ejecución Paralela"]
        Instance1[Instancia 1<br/>Test 1, 2, 3]
        Instance2[Instancia 2<br/>Test 4, 5, 6]
        Instance3[Instancia 3<br/>Test 7, 8, 9]
    end
    
    WDIO[WebdriverIO] --> Instance1
    WDIO --> Instance2
    WDIO --> Instance3
    
    Instance1 --> Driver1[ChromeDriver 1]
    Instance2 --> Driver2[ChromeDriver 2]
    Instance3 --> Driver3[ChromeDriver 3]
    
    Driver1 --> Browser1[Chrome 1]
    Driver2 --> Browser2[Chrome 2]
    Driver3 --> Browser3[Chrome 3]
    
    style Instance1 fill:#4caf50
    style Instance2 fill:#4caf50
    style Instance3 fill:#4caf50
```

## Resumen del Flujo

1. **Inicio**: Comando `npm run test:e2e`
2. **Configuración**: WebdriverIO carga `wdio.conf.js`
3. **Driver**: ChromeDriver se inicia automáticamente
4. **Navegador**: Chrome se abre
5. **Tests**: Cada test se ejecuta secuencialmente
6. **Interacción**: Comandos se envían al navegador vía protocolo WebDriver
7. **Verificación**: Assertions verifican resultados
8. **Reporte**: Resultados se muestran en consola
9. **Limpieza**: Navegador y driver se cierran
