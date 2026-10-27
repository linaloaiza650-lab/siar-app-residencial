// SIAR S.A.S. - prototipo académico. Los datos se guardan en el navegador actual.
const comunicados = [
  {
    titulo: "Bienvenidos a SIAR",
    fecha: "Comunicado de ejemplo",
    detalle: "Este espacio centraliza información importante para los residentes de la unidad."
  },
  {
    titulo: "Uso responsable de las zonas comunes",
    fecha: "Recordatorio de ejemplo",
    detalle: "Cuida los espacios compartidos y consulta con la administración las normas de reserva."
  },
  {
    titulo: "Canal para reportar novedades",
    fecha: "Información de ejemplo",
    detalle: "Utiliza el formulario para registrar daños, solicitudes o situaciones de convivencia."
  }
];

const claveSolicitudes = "siar_solicitudes_demo";
const listaComunicados = document.querySelector("#listaComunicados");
const listaSolicitudes = document.querySelector("#listaSolicitudes");
const formSolicitud = document.querySelector("#formSolicitud");
const mensajeFormulario = document.querySelector("#mensajeFormulario");

function mostrarComunicados() {
  listaComunicados.replaceChildren();
  comunicados.forEach((comunicado) => {
    const articulo = document.createElement("article");
    articulo.className = "comunicado";
    const titulo = document.createElement("h3");
    titulo.textContent = comunicado.titulo;
    const detalle = document.createElement("p");
    detalle.textContent = comunicado.detalle;
    const fecha = document.createElement("span");
    fecha.className = "fecha";
    fecha.textContent = comunicado.fecha;
    articulo.append(titulo, detalle, fecha);
    listaComunicados.append(articulo);
  });
  document.querySelector("#totalComunicados").textContent = comunicados.length;
}

function obtenerSolicitudes() {
  try {
    return JSON.parse(localStorage.getItem(claveSolicitudes)) || [];
  } catch {
    return [];
  }
}

function guardarSolicitudes(solicitudes) {
  localStorage.setItem(claveSolicitudes, JSON.stringify(solicitudes));
}

function mostrarSolicitudes() {
  const solicitudes = obtenerSolicitudes();
  listaSolicitudes.replaceChildren();
  document.querySelector("#totalSolicitudes").textContent = solicitudes.length;

  if (solicitudes.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.className = "vacio";
    mensaje.textContent = "Aún no hay solicitudes. Puedes registrar una con el formulario.";
    listaSolicitudes.append(mensaje);
    return;
  }

  solicitudes.slice().reverse().forEach((solicitud) => {
    const articulo = document.createElement("article");
    articulo.className = "solicitud";
    const cabecera = document.createElement("div");
    cabecera.className = "solicitud-cabecera";
    const datos = document.createElement("div");
    const titulo = document.createElement("h3");
    titulo.textContent = `${solicitud.tipo} · ${solicitud.nombre}`;
    const fecha = document.createElement("p");
    fecha.textContent = solicitud.fecha;
    const detalle = document.createElement("p");
    detalle.textContent = solicitud.detalle;
    const estado = document.createElement("span");
    estado.className = "estado";
    estado.textContent = "Recibida (demo)";
    datos.append(titulo, fecha);
    cabecera.append(datos, estado);
    articulo.append(cabecera, detalle);
    listaSolicitudes.append(articulo);
  });
}

formSolicitud.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const datos = new FormData(formSolicitud);
  const solicitud = {
    nombre: String(datos.get("nombre")).trim(),
    tipo: String(datos.get("tipo")),
    detalle: String(datos.get("detalle")).trim(),
    fecha: new Date().toLocaleString("es-CO", {
      dateStyle: "short",
      timeStyle: "short"
    })
  };

  if (!solicitud.nombre || !solicitud.tipo || !solicitud.detalle) {
    mensajeFormulario.textContent = "Completa todos los campos antes de enviar.";
    return;
  }

  const solicitudes = obtenerSolicitudes();
  solicitudes.push(solicitud);
  guardarSolicitudes(solicitudes);
  formSolicitud.reset();
  mensajeFormulario.textContent = "Solicitud registrada en esta demostración.";
  mostrarSolicitudes();
});

document.querySelector("#limpiarSolicitudes").addEventListener("click", () => {
  const confirmar = window.confirm("¿Deseas borrar las solicitudes de demostración guardadas en este navegador?");
  if (!confirmar) return;
  localStorage.removeItem(claveSolicitudes);
  mensajeFormulario.textContent = "Se limpiaron las solicitudes de demostración.";
  mostrarSolicitudes();
});

mostrarComunicados();
mostrarSolicitudes();
