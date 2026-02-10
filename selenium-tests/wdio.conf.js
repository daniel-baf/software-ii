const fs = require("fs");
const path = require("path");
const http = require("http");

const headless = process.env.HEADLESS === "1";
const artifactsDir = path.join(__dirname, "artifacts", "screenshots");

// Objeto para rastrear resultados por archivo
const testResults = {};

// Función para verificar que el servidor esté disponible
const waitForServer = (url, maxAttempts = 30, delay = 1000) => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const checkServer = () => {
      attempts++;
      const req = http.get(url, (res) => {
        console.log(`\n✅ Servidor disponible en ${url}\n`);
        resolve();
      });
      
      req.on('error', (err) => {
        if (attempts >= maxAttempts) {
          console.error(`❌ Servidor no disponible después de ${maxAttempts} intentos`);
          reject(new Error(`Servidor no disponible en ${url}. Asegúrate de ejecutar 'npm start' primero.`));
        } else {
          console.log(`⏳ Esperando servidor... (intento ${attempts}/${maxAttempts})`);
          setTimeout(checkServer, delay);
        }
      });
      
      req.setTimeout(2000, () => {
        req.destroy();
        if (attempts >= maxAttempts) {
          reject(new Error(`Timeout esperando servidor en ${url}`));
        } else {
          setTimeout(checkServer, delay);
        }
      });
    };
    checkServer();
  });
};

exports.config = {
  runner: "local",
  specs: ["./tests/e2e/specs/**/*.spec.js"],
  maxInstances: 1,
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: headless
          ? ["--headless=new", "--disable-gpu", "--window-size=1280,800"]
          : ["--window-size=1280,800"],
      },
      "goog:loggingPrefs": {
        browser: "ALL",
      },
    },
  ],
  logLevel: "info", // Cambiado de "error" a "info" para ver más detalles
  bail: 0,
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,
  services: [],
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
  onPrepare: async () => {
    if (!fs.existsSync(artifactsDir)) {
      fs.mkdirSync(artifactsDir, { recursive: true });
    }
    
    // Verificar que el servidor esté disponible antes de iniciar los tests
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    console.log(`\n🔍 Verificando que el servidor esté disponible en ${baseUrl}...`);
    try {
      await waitForServer(baseUrl);
    } catch (error) {
      console.error(`\n❌ Error: ${error.message}`);
      console.error(`\n💡 Solución: Ejecuta 'npm start' en otra terminal antes de correr los tests.\n`);
      process.exit(1);
    }
  },
  beforeSuite: function (suite) {
    const specFile = suite.file || suite.title || "";
    const fileName = path.basename(specFile);
    if (specFile && !testResults[specFile]) {
      testResults[specFile] = {
        file: fileName,
        passed: 0,
        failed: 0,
        total: 0,
        tests: [],
      };
    }
  },
  afterTest: async function (test, context, { passed }) {
    // Obtener el archivo del test o del contexto
    const specFile = test.file || context.file || test.parent?.file || "";
    const fileName = path.basename(specFile);
    
    // Si no existe en testResults, crearlo
    if (specFile && !testResults[specFile]) {
      testResults[specFile] = {
        file: fileName,
        passed: 0,
        failed: 0,
        total: 0,
        tests: [],
      };
    }
    
    if (specFile && testResults[specFile]) {
      testResults[specFile].total++;
      if (passed) {
        testResults[specFile].passed++;
      } else {
        testResults[specFile].failed++;
        testResults[specFile].tests.push({
          title: test.title,
          status: "failed",
        });
      }
    }

    if (!passed) {
      const fileSafe = test.title.replace(/\s+/g, "-").toLowerCase();
      const fileName = `${Date.now()}-${fileSafe}.png`;
      await browser.saveScreenshot(path.join(artifactsDir, fileName));
    }
  },
  onComplete: function (exitCode, config, capabilities, results) {
    const lines = [];
    lines.push("");
    lines.push("=".repeat(80));
    lines.push("📊 RESUMEN DETALLADO DE TESTS POR ARCHIVO");
    lines.push("=".repeat(80));
    lines.push("");

    let totalPassed = 0;
    let totalFailed = 0;
    let totalTests = 0;

    // Si hay resultados de WebdriverIO, usarlos; si no, usar testResults
    const resultsToShow = Object.keys(testResults).length > 0 
      ? testResults 
      : (results?.suites || {});

    // Procesar resultados del objeto testResults
    Object.keys(resultsToShow).forEach((file) => {
      const result = resultsToShow[file];
      
      // Manejar diferentes formatos de resultados
      const passed = result.passed || 0;
      const failed = result.failed || 0;
      const total = result.total || (passed + failed);
      const fileName = result.file || path.basename(file);
      const tests = result.tests || [];

      totalPassed += passed;
      totalFailed += failed;
      totalTests += total;

      const statusIcon = failed === 0 ? "✅" : "❌";
      const statusText = failed === 0 ? "PASSED" : "FAILED";

      lines.push(`${statusIcon} ${fileName}`);
      lines.push(`   Total: ${total} | Pasados: ${passed} | Fallidos: ${failed} | Estado: ${statusText}`);

      if (failed > 0 && tests.length > 0) {
        lines.push(`   Tests fallidos:`);
        tests.forEach((test) => {
          const testTitle = typeof test === 'string' ? test : (test.title || test);
          lines.push(`      ✗ ${testTitle}`);
        });
      }
      lines.push("");
    });

    lines.push("=".repeat(80));
    lines.push("📈 RESUMEN GENERAL");
    lines.push("=".repeat(80));
    lines.push(`Total de archivos: ${Object.keys(resultsToShow).length}`);
    lines.push(`Total de tests: ${totalTests}`);
    lines.push(`✅ Pasados: ${totalPassed}`);
    lines.push(`❌ Fallidos: ${totalFailed}`);
    if (totalTests > 0) {
      lines.push(`📊 Tasa de éxito: ${((totalPassed / totalTests) * 100).toFixed(1)}%`);
    }
    lines.push("=".repeat(80));
    lines.push("");

    const summary = lines.join("\n");
    console.log(summary);
    
    // Guardar en archivo
    fs.writeFileSync(path.join(__dirname, 'test-results.txt'), summary);
  },
};
