document.addEventListener("DOMContentLoaded", () => {
    // Manejar el menú lateral
    const menuButton = document.getElementById("menu-btn");
    const sidebar = document.getElementById("sidebar");

    if (menuButton && sidebar) {
        menuButton.addEventListener("click", toggleMenu);
    }

    // Manejar clics en el sidebar
    const sidebarLinks = document.querySelectorAll("#sidebar a");
    if (sidebarLinks.length > 0) {
        sidebarLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute("href").substring(1);
                showSection(sectionId);
            });
        });
    }

    // Manejar clics en los contenedores
    const containerElements = document.querySelectorAll(".container");
    if (containerElements.length > 0) {
        containerElements.forEach(container => {
            container.addEventListener("click", () => {
                const contenedorId = container.getAttribute("data-contenedor");
                const sensorTitle = document.getElementById("sensor-title");
                if (sensorTitle) {
                    sensorTitle.innerText = `CONTENEDOR #${contenedorId}`;
                }
                showSection("sensores");
            });
        });
    }

    // WebSocket para datos en tiempo real
    const ws = new WebSocket("ws://localhost:1880/ws/sensores");
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data || "{}");
        if (data) {
            updateIndicators(data);
            addRecord(data);
        }
    };

    ws.onerror = (error) => console.error("WebSocket Error: ", error);
    ws.onclose = () => console.warn("WebSocket cerrado.");

    // Inicializar la primera sección activa (contenedores por defecto)
    showInitialSection();
});

// Función para inicializar la sección activa
function showInitialSection() {
    const activeSection = document.querySelector("section.active");
    if (activeSection) {
        activeSection.classList.remove("hidden");
    } else {
        // Por defecto muestra la sección de contenedores si no hay ninguna activa
        showSection("contenedores-info");
    }
}

// Función para mostrar una sección específica
function showSection(sectionId) {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.classList.add("hidden");
        section.classList.remove("active");
    });

    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.classList.remove("hidden");
        sectionToShow.classList.add("active");
    } else {
        console.error(`Sección "${sectionId}" no encontrada.`);
    }
}

// Función para actualizar indicadores principales
function updateIndicators(data) {
    document.getElementById("temp-value").innerText = `${data.temperatura || "-"}°C`;
    document.getElementById("capacidad-value").innerText = `${data.distancia || "-"}%`;
    document.getElementById("humedad-value").innerText = `${data.humedad || "-"}%`;
    document.getElementById("carga-value").innerText = data.luz || "Desconocida";
}

// Función para agregar un registro a la tabla
function addRecord(data) {
    const registros = document.getElementById("records-body");
    if (registros) {
        const now = new Date();
        const timestamp = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
        const nuevaFila = `
            <tr>
                <td>${timestamp}</td>
                <td>${data.temperatura || "-"}</td>
                <td>${data.distancia || "-"}</td>
                <td>${data.humedad || "-"}</td>
            </tr>
        `;
        registros.insertAdjacentHTML("afterbegin", nuevaFila);
    }
}

// Función para mostrar u ocultar el sidebar
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const menuButton = document.getElementById("menu-btn");

    if (sidebar && menuButton) {
        sidebar.classList.toggle("active");
        // Cambia el icono del botón (si es necesario)
        menuButton.innerHTML = sidebar.classList.contains("active") ? "✖" : "☰";
    }
}

