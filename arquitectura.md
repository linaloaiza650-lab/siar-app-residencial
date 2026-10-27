# Documento de arquitectura — SIAR S.A.S.

## 1. Propósito
Describir la arquitectura inicial del prototipo web de SIAR S.A.S., una solución propuesta para apoyar la comunicación en unidades residenciales.

## 2. Alcance de esta versión
El prototipo permite consultar comunicados de ejemplo y registrar solicitudes desde un formulario. Las solicitudes se guardan en el almacenamiento local del navegador. Esta versión no transmite información a un servidor.

## 3. Stack tecnológico
- **HTML5:** define la estructura y los elementos del contenido.
- **CSS3:** define colores, distribución, tipografía y adaptación a pantallas pequeñas.
- **JavaScript:** presenta comunicados, valida el formulario y gestiona el registro de solicitudes.
- **LocalStorage:** conserva las solicitudes de demostración en el mismo navegador.

## 4. Componentes
1. **Interfaz de usuario (`index.html`):** contiene encabezado, comunicados, formulario y listado de solicitudes.
2. **Presentación (`css/estilos.css`):** aplica el diseño visual y las reglas responsive.
3. **Lógica de interfaz (`js/app.js`):** gestiona eventos, validaciones y representación de datos.
4. **Almacenamiento local:** permite que los datos de prueba permanezcan al cerrar y volver a abrir el navegador en el mismo dispositivo.

## 5. Flujo básico
1. El usuario abre `index.html`.
2. El navegador carga los estilos y el archivo JavaScript.
3. JavaScript presenta los comunicados de ejemplo y recupera solicitudes locales.
4. El residente completa el formulario.
5. La aplicación valida los campos y guarda la solicitud en LocalStorage.
6. El listado y el contador se actualizan en pantalla.

## 6. Justificación de la elección
HTML, CSS y JavaScript permiten construir una primera versión funcional sin instalar un servidor. LocalStorage es útil para demostrar el comportamiento del formulario en un entorno académico. No reemplaza una base de datos central para una aplicación real con múltiples usuarios.

## 7. Limitaciones y riesgos
- Los datos son visibles únicamente en el navegador donde se registran.
- No hay autenticación ni perfiles de usuario.
- Los comunicados son estáticos y de ejemplo.
- No se deben registrar datos personales reales en esta demostración.

## 8. Evolución futura
En una siguiente etapa se evaluará un backend, una base de datos central, autenticación y control de acceso, de acuerdo con los requisitos definidos y la orientación del instructor.
