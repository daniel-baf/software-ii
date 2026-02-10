# Page Object Model (POM)

## ¿Qué es el Page Object Model?

El **Page Object Model (POM)** es un patrón de diseño que organiza el código de pruebas separando la lógica de interacción con la página web de los casos de prueba. Cada página web se representa como una clase.

## Concepto

```mermaid
graph TB
    subgraph WithoutPOM["Sin POM (Mal)"]
        Test1[Test 1] --> Code1[Código de interacción<br/>mezclado con lógica de test]
        Test2[Test 2] --> Code2[Código duplicado<br/>de interacción]
        Test3[Test 3] --> Code3[Más código duplicado]
    end
    
    subgraph WithPOM["Con POM (Bien)"]
        TestA[Test A] --> PageObject[Page Object]
        TestB[Test B] --> PageObject
        TestC[Test C] --> PageObject
        PageObject --> ReusableCode[Código reutilizable<br/>y mantenible]
    end
    
    style WithoutPOM fill:#ffebee
    style WithPOM fill:#e8f5e9
    style PageObject fill:#4caf50
```

## Arquitectura POM en este Proyecto

```mermaid
graph TB
    subgraph Tests["Tests (Specs)"]
        AuthSpec[auth.spec.js]
        WidgetsSpec[widgets.spec.js]
        FramesSpec[frames_windows.spec.js]
        AdvancedSpec[advanced.spec.js]
    end
    
    subgraph PageObjects["Page Objects"]
        BasePage[BasePage.js<br/>Clase base]
        LoginPage[LoginPage.js]
        DashboardPage[DashboardPage.js]
        TablePage[TablePage.js]
        ModalPage[ModalPage.js]
        AlertsPage[AlertsPage.js]
        IframePage[IframePage.js]
        DragDropPage[DragDropPage.js]
        UploadPage[UploadPage.js]
        WindowsPage[WindowsPage.js]
        DynamicPage[DynamicPage.js]
    end
    
    AuthSpec --> LoginPage
    AuthSpec --> DashboardPage
    WidgetsSpec --> TablePage
    WidgetsSpec --> ModalPage
    WidgetsSpec --> AlertsPage
    WidgetsSpec --> DragDropPage
    WidgetsSpec --> UploadPage
    FramesSpec --> IframePage
    FramesSpec --> WindowsPage
    AdvancedSpec --> DynamicPage
    
    LoginPage -->|hereda| BasePage
    DashboardPage -->|hereda| BasePage
    TablePage -->|hereda| BasePage
    ModalPage -->|hereda| BasePage
    AlertsPage -->|hereda| BasePage
    IframePage -->|hereda| BasePage
    DragDropPage -->|hereda| BasePage
    UploadPage -->|hereda| BasePage
    WindowsPage -->|hereda| BasePage
    DynamicPage -->|hereda| BasePage
    
    style BasePage fill:#9c27b0
    style Tests fill:#ff9800
    style PageObjects fill:#4caf50
```

## Estructura de un Page Object

```mermaid
graph TB
    subgraph PageObject["Page Object Structure"]
        Class[Clase Page Object]
        Selectors[Selectores<br/>getters]
        Methods[Métodos<br/>acciones]
        Base[Herencia de BasePage]
    end
    
    Class --> Selectors
    Class --> Methods
    Class --> Base
    
    Selectors --> Elements[Elementos de la página]
    Methods --> Actions[Acciones del usuario]
    Base --> Common[Funcionalidad común]
    
    style Class fill:#9c27b0
    style Selectors fill:#2196f3
    style Methods fill:#4caf50
```

## Ejemplo: LoginPage

### Estructura

```mermaid
classDiagram
    class BasePage {
        +open(path)
    }
    
    class LoginPage {
        -get username()
        -get password()
        -get loginBtn()
        -get message()
        +open()
        +login(username, password)
    }
    
    BasePage <|-- LoginPage
    
    note for LoginPage "Representa la página de login<br/>Encapsula selectores y acciones"
```

### Implementación

```javascript
class LoginPage extends BasePage {
  // Selectores como getters
  get username() {
    return $('#username');
  }
  
  get password() {
    return $('#password');
  }
  
  get loginBtn() {
    return $('#loginBtn');
  }
  
  get message() {
    return $('.message');
  }
  
  // Métodos de acción
  async open() {
    await super.open('/login');
  }
  
  async login(username, password) {
    await this.username.setValue(username);
    await this.password.setValue(password);
    await this.loginBtn.click();
  }
}
```

## Flujo de Uso

```mermaid
sequenceDiagram
    participant Test as Test Spec
    participant PO as Page Object
    participant WDIO as WebdriverIO
    participant Browser as Browser
    
    Test->>PO: LoginPage.open()
    PO->>PO: super.open('/login')
    PO->>WDIO: browser.url('/login')
    WDIO->>Browser: Navega a /login
    Browser-->>WDIO: Página cargada
    WDIO-->>PO: Promise resuelto
    PO-->>Test: Listo
    
    Test->>PO: LoginPage.login('demo', 'demo')
    PO->>PO: this.username.setValue('demo')
    PO->>WDIO: $('#username').setValue('demo')
    WDIO->>Browser: Escribe en input
    Browser-->>WDIO: Texto escrito
    WDIO-->>PO: Listo
    
    PO->>PO: this.password.setValue('demo')
    PO->>WDIO: $('#password').setValue('demo')
    WDIO->>Browser: Escribe en input
    Browser-->>WDIO: Texto escrito
    WDIO-->>PO: Listo
    
    PO->>PO: this.loginBtn.click()
    PO->>WDIO: $('#loginBtn').click()
    WDIO->>Browser: Click en botón
    Browser-->>WDIO: Click ejecutado
    WDIO-->>PO: Listo
    PO-->>Test: Login completado
```

## Ventajas del POM

```mermaid
mindmap
    root((Ventajas POM))
        Mantenibilidad
            Cambios en UI
            Un solo lugar para actualizar
            Menos código duplicado
        Reutilización
            Métodos compartidos
            Selectores centralizados
            Lógica encapsulada
        Legibilidad
            Tests más claros
            Intención clara
            Fácil de entender
        Escalabilidad
            Fácil agregar páginas
            Estructura consistente
            Organización clara
```

## BasePage: Funcionalidad Común

```mermaid
graph TB
    BasePage[BasePage] --> Open[open path<br/>Navegar a URL]
    
    LoginPage --> BasePage
    DashboardPage --> BasePage
    TablePage --> BasePage
    OtherPages[Otras páginas] --> BasePage
    
    BasePage --> Common[Funcionalidad común<br/>reutilizable]
    
    style BasePage fill:#9c27b0
    style Common fill:#4caf50
```

**BasePage.js**:
```javascript
class BasePage {
  open(path) {
    return browser.url(path);
  }
}
```

Todas las páginas heredan de `BasePage` para tener acceso a métodos comunes.

## Patrón de Selectores

```mermaid
graph LR
    Selector[Selector] --> Getter[Getter en Page Object]
    Getter --> Element[Elemento WebdriverIO]
    Element --> Action[Acción]
    
    style Selector fill:#ff9800
    style Getter fill:#2196f3
    style Element fill:#4caf50
    style Action fill:#9c27b0
```

**Ventajas de usar getters**:
- Lazy evaluation: El elemento se busca solo cuando se usa
- Reutilizable: Se puede usar múltiples veces
- Mantenible: Cambio en un solo lugar

## Ejemplo Completo: Test con POM

### Sin POM (Mal)

```javascript
describe('Login', () => {
  it('should login', async () => {
    await browser.url('/login');
    await $('#username').setValue('demo');
    await $('#password').setValue('demo');
    await $('#loginBtn').click();
    await expect($('.welcome')).toBeDisplayed();
  });
});
```

**Problemas**:
- Selectores duplicados en múltiples tests
- Si cambia el selector, hay que actualizar todos los tests
- Difícil de mantener

### Con POM (Bien)

```javascript
const LoginPage = require('../pageobjects/LoginPage');
const DashboardPage = require('../pageobjects/DashboardPage');

describe('Login', () => {
  it('should login', async () => {
    await LoginPage.open();
    await LoginPage.login('demo', 'demo');
    await expect(DashboardPage.welcomeText).toBeDisplayed();
  });
});
```

**Ventajas**:
- Código más legible
- Selectores centralizados
- Fácil de mantener
- Reutilizable

## Relación entre Tests y Page Objects

```mermaid
graph TB
    subgraph TestFile["auth.spec.js"]
        Test1[Test 1: Login válido]
        Test2[Test 2: Login inválido]
        Test3[Test 3: Logout]
    end
    
    subgraph PageObjects["Page Objects Usados"]
        LoginPage[LoginPage]
        DashboardPage[DashboardPage]
    end
    
    Test1 --> LoginPage
    Test1 --> DashboardPage
    Test2 --> LoginPage
    Test3 --> DashboardPage
    Test3 --> LoginPage
    
    style TestFile fill:#ff9800
    style PageObjects fill:#4caf50
```

## Mejores Prácticas

### 1. Un Page Object por Página

```mermaid
graph LR
    Page[Página Web] --> PO[Page Object]
    LoginPage[login.html] --> LoginPO[LoginPage.js]
    DashboardPage[dashboard.html] --> DashboardPO[DashboardPage.js]
    
    style Page fill:#e3f2fd
    style PO fill:#4caf50
```

### 2. Métodos que Representan Acciones del Usuario

```mermaid
graph TB
    UserAction[Acción del Usuario] --> Method[Método en Page Object]
    UserAction1["Usuario hace login"] --> LoginMethod["login(username, password)"]
    UserAction2["Usuario busca producto"] --> SearchMethod["searchProduct(query)"]
    UserAction3["Usuario agrega al carrito"] --> AddMethod["addToCart(productId)"]
    
    style UserAction fill:#ff9800
    style Method fill:#4caf50
```

### 3. Selectores como Getters

```javascript
// ✅ Bien
get username() {
  return $('#username');
}

// ❌ Mal (no usar propiedades directas)
username = $('#username');
```

### 4. No Incluir Assertions en Page Objects

```mermaid
graph TB
    PO[Page Object] --> Actions[Acciones]
    PO --> Selectors[Selectores]
    PO -.->|NO| Assertions[Assertions]
    
    Test[Test Spec] --> PO
    Test --> Assertions
    
    style PO fill:#4caf50
    style Test fill:#ff9800
    style Assertions fill:#2196f3
```

**Razón**: Los Page Objects deben ser agnósticos a las verificaciones. Las assertions pertenecen a los tests.

## Resumen

El Page Object Model en este proyecto:

1. **Organiza el código**: Cada página tiene su clase
2. **Facilita mantenimiento**: Cambios en UI se hacen en un solo lugar
3. **Mejora legibilidad**: Tests más claros y expresivos
4. **Promueve reutilización**: Métodos compartidos entre tests
5. **Escalable**: Fácil agregar nuevas páginas y tests
