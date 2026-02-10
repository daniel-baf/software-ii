const page = document.body.dataset.page;

const byId = (id) => document.getElementById(id);

if (page === "login") {
  const params = new URLSearchParams(window.location.search);
  const message = byId("login-message");
  if (params.get("error") === "1") {
    message.textContent = "Credenciales inválidas. Usa demo/demo.";
    message.classList.remove("hidden");
  }
  if (params.get("logout") === "1") {
    message.textContent = "Sesión cerrada.";
    message.classList.remove("hidden");
  }
}

if (page === "table") {
  const filterInput = byId("filter-input");
  const rows = Array.from(document.querySelectorAll("tbody tr"));
  const sortButton = byId("sort-name");
  const tableBody = document.querySelector("tbody");
  let ascending = true;

  const applyFilter = () => {
    const value = filterInput.value.toLowerCase();
    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.classList.toggle("hidden", !text.includes(value));
    });
  };

  filterInput.addEventListener("input", applyFilter);

  sortButton.addEventListener("click", () => {
    ascending = !ascending;
    const sorted = [...rows].sort((a, b) => {
      const aText = a.querySelector("td").textContent;
      const bText = b.querySelector("td").textContent;
      return ascending
        ? aText.localeCompare(bText)
        : bText.localeCompare(aText);
    });
    tableBody.innerHTML = "";
    sorted.forEach((row) => tableBody.appendChild(row));
  });
}

if (page === "modal") {
  const openBtn = byId("open-modal");
  const closeBtn = byId("close-modal");
  const backdrop = byId("modal-backdrop");

  openBtn.addEventListener("click", () => {
    backdrop.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    backdrop.classList.add("hidden");
  });
}

if (page === "alerts") {
  const output = byId("alert-output");

  byId("alert-btn").addEventListener("click", () => {
    window.alert("Selenium puede manejar este alert");
    output.textContent = "Alert OK";
  });

  byId("confirm-btn").addEventListener("click", () => {
    const result = window.confirm("Confirmación?");
    output.textContent = result ? "Confirmado" : "Cancelado";
  });

  byId("prompt-btn").addEventListener("click", () => {
    const value = window.prompt("Escribe algo");
    output.textContent = value ? `Escribiste: ${value}` : "Sin texto";
  });
}

if (page === "dragdrop") {
  const draggable = byId("drag-item");
  const dropZone = byId("drop-zone");
  const status = byId("drop-status");

  draggable.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", "drag-item");
  });

  dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    if (data === "drag-item") {
      dropZone.appendChild(draggable);
      status.textContent = "Elemento soltado";
    }
  });
}

if (page === "upload") {
  const form = byId("upload-form");
  const output = byId("upload-output");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const response = await fetch("/upload", { method: "POST", body: data });
    const text = await response.text();
    output.textContent = text;
  });
}

if (page === "windows") {
  const output = byId("window-output");
  byId("open-window").addEventListener("click", () => {
    window.open("/new-window", "_blank", "noopener");
    output.textContent = "Nueva ventana abierta";
  });
}

if (page === "dynamic") {
  const button = byId("load-data");
  const output = byId("dynamic-output");
  const badge = byId("dynamic-badge");

  button.addEventListener("click", async () => {
    button.disabled = true;
    badge.textContent = "Cargando...";
    output.textContent = "";
    const response = await fetch("/api/delayed?delay=2000");
    const data = await response.json();
    output.textContent = data.message;
    badge.textContent = "Listo";
    button.disabled = false;
  });
}
