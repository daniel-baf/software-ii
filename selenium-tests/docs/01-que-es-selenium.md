# ¿Qué es Selenium?

## Introducción

**Selenium** es un framework open-source para automatizar pruebas de aplicaciones web. Permite controlar navegadores de forma programática, simulando las acciones de un usuario real (clic, escritura, navegación, etc.).

## Componentes de Selenium

```mermaid
graph TB
    subgraph SeleniumEcosystem["Ecosistema Selenium"]
        IDE["Selenium IDE<br/>Grabación y reproducción"]
        WebDriver["Selenium WebDriver<br/>API de control de navegadores"]
        Grid["Selenium Grid<br/>Distribución y paralelización"]
    end
    
    IDE --> WebDriver
    WebDriver --> Grid
    
    style IDE fill:#e1f5ff
    style WebDriver fill:#b3e5fc
    style Grid fill:#81d4fa
```

### 1. Selenium IDE
- Extensión de navegador para grabar y reproducir acciones
- Útil para prototipos rápidos
- No requiere programación

### 2. Selenium WebDriver
- **Componente principal** que usamos en este proyecto
- API para controlar navegadores desde código
- Soporta múltiples lenguajes (Java, Python, JavaScript, C#, Ruby, etc.)
- Comunicación directa con el navegador mediante protocolo W3C WebDriver

### 3. Selenium Grid
- Permite ejecutar pruebas en múltiples máquinas y navegadores
- Útil para pruebas paralelas y cross-browser
- Escalable para entornos CI/CD

## Arquitectura de Selenium WebDriver

```mermaid
sequenceDiagram
    participant Test as Test Script<br/>(JavaScript)
    participant WDIO as WebdriverIO
    participant JSON as JSON Wire Protocol
    participant Driver as ChromeDriver<br/>(Driver)
    participant Browser as Chrome Browser
    
    Test->>WDIO: browser.click('#button')
    WDIO->>JSON: Convierte a HTTP request
    JSON->>Driver: POST /session/{id}/element/{id}/click
    Driver->>Browser: Ejecuta acción nativa
    Browser-->>Driver: Resultado
    Driver-->>JSON: HTTP Response
    JSON-->>WDIO: Resultado parseado
    WDIO-->>Test: Promise resuelto
```

## Capacidades de Selenium

### ✅ Lo que Selenium PUEDE hacer

```mermaid
mindmap
    root((Selenium<br/>Capacidades))
        Navegación
            Ir a URLs
            Navegar hacia atrás/adelante
            Refrescar página
        Interacción
            Clics en elementos
            Escribir texto
            Seleccionar opciones
            Drag & Drop
        Formularios
            Llenar campos
            Enviar formularios
            Validar inputs
        Elementos
            Buscar por ID, clase, XPath, CSS
            Esperar a que aparezcan
            Verificar visibilidad
        Ventanas y Frames
            Cambiar entre ventanas
            Trabajar con iframes
            Manejar pop-ups
        Alerts y Modales
            Aceptar/rechazar alerts
            Escribir en prompts
            Cerrar modales
        Archivos
            Subir archivos
            Descargar archivos
        Cookies y Storage
            Gestionar cookies
            LocalStorage
            SessionStorage
        Screenshots
            Capturar pantalla completa
            Capturar elementos específicos
        JavaScript
            Ejecutar código JS
            Obtener valores de variables
```

### ❌ Lo que Selenium NO puede hacer

- **Aplicaciones de escritorio nativas** (solo web)
- **CAPTCHAs** (requieren intervención humana)
- **Pruebas de rendimiento** (usar herramientas especializadas)
- **Pruebas visuales avanzadas** (usar herramientas como Percy, Applitools)

## Protocolo WebDriver (W3C)

Selenium usa el protocolo estándar W3C WebDriver para comunicarse con los navegadores:

```mermaid
graph LR
    subgraph Client["Cliente (Test Script)"]
        API[WebDriver API]
    end
    
    subgraph Protocol["Protocolo"]
        HTTP[HTTP/JSON]
    end
    
    subgraph Server["Servidor (Driver)"]
        ChromeDriver[ChromeDriver]
        GeckoDriver[GeckoDriver]
        EdgeDriver[EdgeDriver]
    end
    
    subgraph Browser["Navegador"]
        Chrome[Chrome]
        Firefox[Firefox]
        Edge[Edge]
    end
    
    API -->|Comandos| HTTP
    HTTP -->|POST/GET| ChromeDriver
    HTTP -->|POST/GET| GeckoDriver
    HTTP -->|POST/GET| EdgeDriver
    ChromeDriver --> Chrome
    GeckoDriver --> Firefox
    EdgeDriver --> Edge
    
    style API fill:#e3f2fd
    style HTTP fill:#bbdefb
    style ChromeDriver fill:#90caf9
    style GeckoDriver fill:#90caf9
    style EdgeDriver fill:#90caf9
```

## Ventajas de Selenium

1. **Multi-navegador**: Chrome, Firefox, Edge, Safari
2. **Multi-lenguaje**: Java, Python, JavaScript, C#, Ruby, etc.
3. **Multi-plataforma**: Windows, macOS, Linux
4. **Open-source**: Gratuito y con gran comunidad
5. **Estándar W3C**: Protocolo oficial y bien documentado
6. **Extensible**: Integración con frameworks de testing

## Limitaciones

1. **Solo aplicaciones web**: No funciona con apps de escritorio o móviles nativas
2. **Dependiente de la UI**: Si cambia la interfaz, las pruebas pueden romperse
3. **Lento**: Más lento que pruebas unitarias o de API
4. **Mantenimiento**: Requiere actualizar selectores cuando cambia la UI
5. **No resuelve CAPTCHAs**: Requiere intervención manual

## Selenium vs Otras Herramientas

```mermaid
graph TB
    subgraph Tools["Herramientas de Automatización Web"]
        Selenium["Selenium<br/>✅ Multi-navegador<br/>✅ Multi-lenguaje<br/>✅ Estándar W3C"]
        Cypress["Cypress<br/>✅ Rápido<br/>✅ Buen DX<br/>❌ Solo Chrome"]
        Playwright["Playwright<br/>✅ Moderno<br/>✅ Rápido<br/>✅ Multi-navegador"]
        Puppeteer["Puppeteer<br/>✅ Rápido<br/>❌ Solo Chrome"]
    end
    
    style Selenium fill:#4caf50
    style Cypress fill:#ff9800
    style Playwright fill:#2196f3
    style Puppeteer fill:#9c27b0
```

## En este Proyecto

Este proyecto utiliza **WebdriverIO** como wrapper de Selenium WebDriver, que proporciona:

- API más moderna y fácil de usar
- Gestión automática de drivers
- Integración con frameworks de testing (Mocha, Jest, etc.)
- Mejor manejo de async/await
- Utilidades adicionales (screenshots, reportes, etc.)
