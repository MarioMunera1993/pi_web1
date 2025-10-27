# Proyecto-Vulcan  
## Aprendizaje Interactivo a Través de la Gamificación  

**Vulcano App** es una plataforma de gamificación educativa diseñada para hacer del aprendizaje una experiencia interactiva y divertida.  
A través de juegos y desafíos, los estudiantes consolidan los conocimientos adquiridos en el primer semestre de la carrera técnica laboral en desarrollo de software, fortaleciendo su lógica y creatividad mientras juegan.

---

## 🎯 Objetivo del Proyecto  

Desarrollar e implementar una plataforma digital de gamificación académica para la carrera técnica laboral en desarrollo de software, con el fin de fortalecer el aprendizaje de los contenidos teóricos del primer semestre, promoviendo la interacción y motivación de los estudiantes a través de dinámicas lúdicas y desafíos educativos.

---

## 📌 Objetivos Específicos  

- Diseñar y planificar actividades lúdicas y dinámicas grupales e individuales dentro de la plataforma digital, que refuercen los conocimientos adquiridos en las materias del primer semestre.  
- Utilizar metodologías ágiles en el desarrollo de la plataforma web, asegurando la adaptación continua del proyecto y optimización de los procesos para mejorar la experiencia educativa de los estudiantes.  
- Evaluar y ajustar constantemente el funcionamiento de la plataforma, con el fin de mejorar la interacción entre los estudiantes y los contenidos.

---

## 💻 Desarrollo del Proyecto  

En el código que estamos construyendo en este repositorio, vamos a desarrollar nuestro proyecto integrador.  
Inicialmente vamos a trabajar únicamente con **HTML** y **CSS**.

---

## ⚙️ Características  

- Desarrollado inicialmente solo con HTML y CSS.  
- Se aplican estructuras semánticas utilizando correctamente las etiquetas HTML5.  
- Se destaca el uso de la metodología **BEM** para nombrar clases en CSS.  
- Organización de archivos y carpetas modulares para seguir buenas prácticas.

---

## 🧱 Estructura del Proyecto - Versión 1.0  

### Páginas Desarrolladas  

- **Inicio** (`index.html`): Página principal con secciones de hero, características principales del proyecto y llamada a la acción para involucrar visitantes.  
- **Nuestro Proyecto** (`acerca.html`): Información detallada sobre el proyecto, objetivos, propósito, historia del desarrollo y visión a futuro.  
- **Nuestro Equipo** (`nosotros.html`): Presentación de los miembros del equipo, roles, experiencia, biografías y contribuciones al proyecto.  
- **Multimedia** (`multimedia.html`): Galería de contenido visual y audiovisual relacionado con el proyecto: imágenes y videos.  
- **Contáctenos** (`contactenos.html`): Formulario de contacto, información de contacto con preferencias de privacidad y calificación de la APP.  
- **Login** (`login.html`): Formulario de inicio de sesión para usuarios registrados, con campos de usuario/email y contraseña, opciones de recuperación de cuenta.  
- **Registro** (`registro.html`): Formulario de registro para nuevos usuarios, con campos de información personal y creación de credenciales.

---

## 🎨 Personalización y Tipografía  

- **Tipo de letra:** Arial  

### 🎨 Paleta de Colores (CSS Variables)

```css
:root {
  --color-primary: #F2637E;
  --color-secondary: #41E1F2;
  --color-accent: #F2CB07;
  --color-dark: #D9593D;
  --color-light: #808C20;
  /* ... más variables ... */
}


---

## 🧠 Tecnologías JavaScript implementadas - Vulcado APP V2.0

En este proyecto se usan varios scripts JavaScript organizados por responsabilidad. A continuación encontrarás una explicación detallada de qué hace cada archivo, las funciones más importantes y cómo funcionan.

### 1) `src/scripts/ReviewForm.js` — Sistema de reseñas (CRUD)

- Propósito: gestionar reseñas de usuarios mediante peticiones a un endpoint mock (API REST). Permite crear, leer, editar y eliminar reseñas.
- Técnicas y APIs usadas: `fetch` (GET/POST/PUT/DELETE), `async/await`, manipulación del DOM, delegación de eventos.
- Funciones relevantes:
  - `fetchReviews()`: obtiene todas las reseñas desde la API y actualiza el estado local.
  - `renderReviews()`: construye las tarjetas de reseñas en el DOM, ordena por puntuación y adjunta listeners para editar y eliminar.
  - `openEditModal(id)` / `closeEditModal()`: muestran y ocultan el modal de edición rellenando los campos con los datos existentes.
  - `deleteReview(id)`: elimina una reseña en la API y actualiza la vista.
  - `escapeHtml(text)`: sanitiza texto para prevenir XSS antes de insertar en el DOM.

Detalles de funcionamiento: el archivo mantiene un arreglo `reviews` con el estado actual. Las operaciones mutan este arreglo y vuelven a renderizar la lista. Se valida la entrada del usuario antes de enviarla al servidor y se muestran mensajes de error en el UI.

### 2) `src/scripts/ourProject.js` — Controles de video y animaciones

- Propósito: controlar el comportamiento del video promocional y aplicar animaciones a las tarjetas de la sección "Nuestro Proyecto".
- Técnicas y APIs usadas: manipulación de estilo en línea, `IntersectionObserver`, eventos (`mouseenter`, `mouseleave`, `click`), `setInterval` para animaciones repetidas.
- Funciones/funcionalidades:
  - Configuración del video: activa controles, volumen inicial y permite play/pause al hacer click.
  - `IntersectionObserver`: detecta si el video está visible (umbral 50%) y reproduce/pausa automáticamente solo si el usuario ya lo activó (evita autoplay intrusivo).
  - Animaciones en tarjetas: transformaciones CSS (scale, box-shadow) gestionadas desde JS para efectos de hover y click.
  - Animación de iconos: rotación y escala periódica para dar dinamismo (retrasos por índice para escalonar efectos).

### 3) `src/scripts/hamburgerMenu.js` — Menú responsivo

- Propósito: alternar la visualización del menú en pantallas pequeñas.
- Técnica: toggling de clases en el DOM para mostrar/ocultar el menú y cambiar el estado visual del botón.
- Función principal: listener en el botón que hace `classList.toggle('close')` y `classList.toggle('show')` en el nav.

### 4) `src/scripts/currentYear.js` — Año dinámico en footer

- Propósito: insertar el año actual en el footer para que siempre muestre el año vigente.
- Implementación: `document.getElementById('CurrentYear').textContent = new Date().getFullYear();` — una sola línea simple y segura.

### 5) `src/scripts/register.js` — Registro de usuarios (cliente)

- Propósito: validar y enviar un formulario de registro a un endpoint mock.
- Técnicas: validaciones con expresiones regulares (email), manejo de `FormData`, feedback al usuario mediante mensajes en el DOM, `fetch` con `POST`.
- Flujo: validar campos → deshabilitar botón → enviar petición → mostrar resultado y resetear formulario.

### 6) `src/scripts/Class.js` — CRUD de citas

- Propósito: manejar la lógica de citas (crear, listar, editar, borrar) usando otra API mock.
- Técnicas: peticiones `fetch` para GET/POST/PUT/DELETE, uso de plantilla `<template>` para renderizado, funciones `loadAppts`, `createAppt`, `updateAppt`, `deleteAppt`, y `renderAppts`.

### 7) `src/scripts/challenges.js` — Gestión de desafíos y ejecutor de código

- Propósito: administrar los desafíos (listado, filtros, CRUD) y ofrecer un entorno donde el usuario puede escribir y ejecutar código para practicar.
- Técnicas y riesgos:
  - CRUD con fetch a MockAPI, renderizado dinámico y filtros.
  - Modal con un editor tipo textarea donde el usuario escribe JavaScript que se ejecuta con `eval()`.
  - Captura temporal de `console.log` para mostrar la salida al usuario.
  - Riesgo importante: `eval()` ejecuta código arbitrario. Está bien para ejercicios locales controlados, pero NO es seguro en producción sin aislamiento (sandboxing / iframe con CSP / webworker con restricciones).

### 8) `src/scripts/aboutus.js` y `src/main.js`

- `aboutus.js`: contiene utilidades (plugin Tailwind) para clases personalizadas (rotaciones 3D, preserve-3d, perspective, backface-hidden) que se usan en las cards del equipo.
- `main.js`: actualmente vacío, previsto como punto de entrada global para scripts compartidos.

## Buenas prácticas y recomendaciones

- Sanitizar siempre entradas que se rendericen en el DOM (`escapeHtml` ya se usa en reseñas).
- Evitar el uso de `eval()` o aislarlo con un sandbox si se mantiene la característica educativa.
- Validaciones del lado cliente (mejor UX) y, en producción, repetir validaciones en el servidor.
- Usar `IntersectionObserver` y lazy-loading para ahorrar recursos y mejorar rendimiento.

## Cómo probar localmente (rápido)

1. Abrir `index.html` en un navegador moderno (Chrome/Edge/Firefox) con JavaScript habilitado.
2. Ir a las secciones correspondientes: "Nuestro Proyecto", "Nuestro Equipo" y páginas como "Desafíos" y probar los formularios y videos.
3. Para la sección de reseñas: llenar el formulario en la página que tenga el sistema de reseñas y revisar que las operaciones CRUD funcionen (si el mock API está disponible).

---

Si quieres, puedo también mover esta documentación a un bloque específico dentro del README (por ejemplo una tabla de contenidos o anclas), o generar un archivo `DOCS/JS-ARCHITECTURE.md` más detallado con ejemplos y fragmentos de código.
¿