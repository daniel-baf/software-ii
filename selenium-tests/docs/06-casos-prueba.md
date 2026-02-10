# Casos de Prueba

## Tipos de Pruebas Implementadas

Este proyecto incluye una suite completa de pruebas que demuestran las capacidades principales de Selenium/WebdriverIO.

## Mapa de Pruebas

```mermaid
graph TB
    subgraph TestSuites["Suites de Pruebas"]
        Auth[auth.spec.js<br/>Autenticación]
        Widgets[widgets.spec.js<br/>Widgets UI]
        Frames[frames_windows.spec.js<br/>Frames y Ventanas]
        Advanced[advanced.spec.js<br/>Avanzadas]
    end
    
    Auth --> LoginTests[Tests de Login/Logout]
    Auth --> InvalidTests[Tests de Credenciales Inválidas]
    
    Widgets --> TableTests[Tests de Tabla]
    Widgets --> ModalTests[Tests de Modal]
    Widgets --> DragDropTests[Tests de Drag & Drop]
    Widgets --> UploadTests[Tests de Upload]
    
    Frames --> IframeTests[Tests de Iframe]
    Frames --> WindowTests[Tests de Ventanas]
    
    Advanced --> AlertTests[Tests de Alerts]
    Advanced --> DynamicTests[Tests de Contenido Dinámico]
    
    style Auth fill:#4caf50
    style Widgets fill:#2196f3
    style Frames fill:#ff9800
    style Advanced fill:#9c27b0
```

## 1. Autenticación (auth.spec.js)

### Casos de Prueba

```mermaid
graph LR
    Auth[Autenticación] --> Invalid[Credenciales Inválidas]
    Auth --> Valid[Login Válido]
    Auth --> Logout[Logout]
    
    Invalid --> ErrorMsg[Verifica mensaje de error]
    Valid --> Dashboard[Verifica redirección a dashboard]
    Logout --> LoginPage[Verifica redirección a login]
    
    style Auth fill:#4caf50
    style Invalid fill:#f44336
    style Valid fill:#4caf50
    style Logout fill:#ff9800
```

### Flujo de Prueba: Login Válido

```mermaid
sequenceDiagram
    participant Test as Test
    participant LoginPage as LoginPage
    participant Browser as Browser
    participant App as App Demo
    participant DashboardPage as DashboardPage
    
    Test->>LoginPage: open()
    LoginPage->>Browser: Navega a /login
    Browser->>App: GET /login
    App-->>Browser: HTML de login
    
    Test->>LoginPage: login('demo', 'demo')
    LoginPage->>Browser: Escribe username
    LoginPage->>Browser: Escribe password
    LoginPage->>Browser: Click en botón login
    Browser->>App: POST /login
    App->>App: Valida credenciales
    App-->>Browser: Redirige a /dashboard (cookie)
    
    Test->>DashboardPage: Verifica welcomeText
    DashboardPage->>Browser: Busca .welcome-text
    Browser-->>DashboardPage: Elemento encontrado
    DashboardPage-->>Test: ✅ Test pasa
```

### Tests Incluidos

1. **Muestra error con credenciales inválidas**
   - Intenta login con credenciales incorrectas
   - Verifica que se muestra mensaje de error

2. **Permite login y logout**
   - Login con credenciales válidas
   - Verifica redirección a dashboard
   - Ejecuta logout
   - Verifica redirección a login

## 2. Widgets UI (widgets.spec.js)

### Tabla con Filtros y Ordenamiento

```mermaid
graph TB
    TableTest[Test de Tabla] --> Load[ carga tabla]
    Load --> Filter[Filtra por nombre]
    Filter --> VerifyFilter[Verifica resultados filtrados]
    VerifyFilter --> Sort[Ordena por columna]
    Sort --> VerifySort[Verifica ordenamiento]
    
    style TableTest fill:#2196f3
```

**Capacidades demostradas**:
- Búsqueda de elementos en tabla
- Interacción con inputs de filtro
- Verificación de contenido de celdas
- Ordenamiento de datos

### Modal

```mermaid
sequenceDiagram
    participant Test
    participant ModalPage
    participant Browser
    
    Test->>ModalPage: open()
    Test->>ModalPage: openModal()
    ModalPage->>Browser: Click en botón
    Browser->>Browser: Muestra modal
    Test->>ModalPage: Verifica que modal está visible
    Test->>ModalPage: closeModal()
    ModalPage->>Browser: Click en cerrar
    Browser->>Browser: Oculta modal
    Test->>ModalPage: Verifica que modal está oculto
```

**Capacidades demostradas**:
- Interacción con modales
- Verificación de visibilidad
- Cierre de modales

### Drag & Drop

```mermaid
graph LR
    DragDrop[Test Drag & Drop] --> Drag[Arrastra elemento]
    Drag --> Drop[Suelta en destino]
    Drop --> Verify[Verifica posición]
    
    style DragDrop fill:#ff9800
```

**Capacidades demostradas**:
- Drag and drop nativo
- Verificación de posición final
- Interacción con elementos arrastrables

### Upload de Archivos

```mermaid
sequenceDiagram
    participant Test
    participant UploadPage
    participant Browser
    participant App
    
    Test->>UploadPage: open()
    Test->>UploadPage: uploadFile('sample.txt')
    UploadPage->>Browser: Selecciona archivo
    Browser->>App: POST /upload (multipart)
    App->>App: Guarda archivo
    App-->>Browser: Confirma upload
    Test->>UploadPage: Verifica mensaje de éxito
```

**Capacidades demostradas**:
- Subida de archivos
- Manejo de input type="file"
- Verificación de upload exitoso

## 3. Frames y Ventanas (frames_windows.spec.js)

### Iframe

```mermaid
graph TB
    IframeTest[Test de Iframe] --> Switch[Cambia a iframe]
    Switch --> Interact[Interactúa dentro del iframe]
    Interact --> Verify[Verifica contenido]
    Verify --> SwitchBack[Vuelve al contexto principal]
    
    style IframeTest fill:#9c27b0
```

**Flujo detallado**:

```mermaid
sequenceDiagram
    participant Test
    participant IframePage
    participant Browser
    participant Iframe as Iframe Content
    
    Test->>IframePage: open()
    Test->>IframePage: switchToIframe()
    IframePage->>Browser: browser.switchToFrame(iframe)
    Browser->>Iframe: Cambia contexto
    Test->>IframePage: Interactúa con elementos del iframe
    IframePage->>Iframe: Busca elementos
    Iframe-->>IframePage: Elementos encontrados
    Test->>IframePage: switchToMain()
    IframePage->>Browser: browser.switchToParentFrame()
    Browser->>Browser: Vuelve al contexto principal
```

**Capacidades demostradas**:
- Cambio de contexto a iframe
- Interacción dentro de iframe
- Regreso al contexto principal

### Múltiples Ventanas

```mermaid
graph TB
    WindowTest[Test de Ventanas] --> Open[Abre nueva ventana]
    Open --> Switch[Cambia a nueva ventana]
    Switch --> Interact[Interactúa en nueva ventana]
    Interact --> Verify[Verifica contenido]
    Verify --> Close[Cierra ventana]
    Close --> SwitchBack[Vuelve a ventana original]
    
    style WindowTest fill:#ff9800
```

**Capacidades demostradas**:
- Manejo de múltiples ventanas/tabs
- Cambio entre ventanas
- Cierre de ventanas
- Verificación en diferentes ventanas

## 4. Pruebas Avanzadas (advanced.spec.js)

### Alerts del Navegador

```mermaid
sequenceDiagram
    participant Test
    participant AlertsPage
    participant Browser
    
    Test->>AlertsPage: open()
    Test->>AlertsPage: triggerAlert()
    AlertsPage->>Browser: Click en botón
    Browser->>Browser: Muestra alert
    Test->>AlertsPage: acceptAlert()
    AlertsPage->>Browser: browser.acceptAlert()
    Browser->>Browser: Cierra alert
    Test->>AlertsPage: Verifica resultado
```

**Tipos de alerts probados**:
- Alert simple (OK)
- Confirm (OK/Cancel)
- Prompt (con input)

**Capacidades demostradas**:
- Manejo de alertas nativas del navegador
- Aceptar/rechazar alerts
- Escribir en prompts

### Contenido Dinámico

```mermaid
graph TB
    DynamicTest[Test Dinámico] --> Wait[Espera elemento]
    Wait --> Appear[Elemento aparece]
    Appear --> Interact[Interactúa]
    Interact --> Disappear[Elemento desaparece]
    Disappear --> Verify[Verifica estado]
    
    style DynamicTest fill:#9c27b0
```

**Capacidades demostradas**:
- Esperas explícitas (waitForDisplayed)
- Manejo de contenido que aparece/desaparece
- Verificación de estados dinámicos

## Cobertura de Capacidades de Selenium

```mermaid
mindmap
    root((Capacidades<br/>Selenium))
        Navegación
            URL navigation
            Back/Forward
            Refresh
        Elementos
            Find by ID
            Find by CSS
            Find by XPath
            Multiple elements
        Interacción
            Click
            Type text
            Clear input
            Submit form
        Esperas
            Implicit wait
            Explicit wait
            waitForDisplayed
        Verificación
            isDisplayed
            getText
            getAttribute
        Avanzado
            Iframes
            Multiple windows
            Alerts
            Drag & Drop
            File upload
            Dynamic content
```

## Estructura de Archivos de Prueba

```mermaid
graph TB
    Specs[specs/] --> Auth[auth.spec.js]
    Specs --> Widgets[widgets.spec.js]
    Specs --> Frames[frames_windows.spec.js]
    Specs --> Advanced[advanced.spec.js]
    
    Auth --> AuthPO[Usa: LoginPage, DashboardPage]
    Widgets --> WidgetsPO[Usa: TablePage, ModalPage,<br/>DragDropPage, UploadPage]
    Frames --> FramesPO[Usa: IframePage, WindowsPage]
    Advanced --> AdvancedPO[Usa: AlertsPage, DynamicPage]
    
    style Specs fill:#ff9800
    style Auth fill:#4caf50
    style Widgets fill:#2196f3
    style Frames fill:#ff9800
    style Advanced fill:#9c27b0
```

## Ejecución de Pruebas

### Orden de Ejecución

```mermaid
flowchart TD
    Start[Inicio] --> Auth[1. auth.spec.js]
    Auth --> Widgets[2. widgets.spec.js]
    Widgets --> Frames[3. frames_windows.spec.js]
    Frames --> Advanced[4. advanced.spec.js]
    Advanced --> Report[Genera reporte]
    Report --> End[Fin]
    
    style Start fill:#4caf50
    style End fill:#4caf50
```

### Resultados Esperados

Cada suite de pruebas verifica:
- ✅ Funcionalidad correcta
- ✅ Manejo de errores
- ✅ Estados de UI
- ✅ Interacciones complejas

## Resumen

Este proyecto demuestra:

1. **Autenticación**: Login, logout, manejo de sesiones
2. **Widgets**: Tablas, modales, drag & drop, uploads
3. **Frames/Ventanas**: Iframes, múltiples ventanas
4. **Avanzado**: Alerts, contenido dinámico

**Total**: Más de 15 casos de prueba que cubren las capacidades principales de Selenium/WebdriverIO.
