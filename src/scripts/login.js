(function(){
      // Muestra la card con animación
      document.addEventListener('DOMContentLoaded', function(){
        const c = document.getElementById('loginCard');
        setTimeout(() => c.classList.add('show'), 80);
      });

      const loginForm = document.getElementById('loginForm');
      const errorMsg = document.getElementById('errorMsg');
      const passwordInput = document.getElementById('password');
      const passwordToggle = document.querySelector('.password-toggle');

      // CORRECCIÓN: separar base URL y recurso
      const API_BASE = 'https://68e7ebe8f2707e6128c96000.mockapi.io';
      const RESOURCE = 'create/registro'; // recurso en tu MockAPI

      // Función para alternar visibilidad de la contraseña
      passwordToggle.addEventListener('click', function() {
        const isPasswordVisible = passwordInput.type === 'text';
        passwordInput.type = isPasswordVisible ? 'password' : 'text';
        passwordToggle.setAttribute('aria-pressed', !isPasswordVisible);
        passwordToggle.setAttribute('aria-label', isPasswordVisible ? 'Mostrar contraseña' : 'Ocultar contraseña');
        passwordToggle.querySelector('svg').innerHTML = isPasswordVisible
          ? '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>'
          : '<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3-.17 0-.33.02-.49.04z"/>';
      });

      // Función que consulta MockAPI para obtener el usuario por nombre
      async function fetchUserByNombre(name) {
        const url = `${API_BASE}/${RESOURCE}?name=${encodeURIComponent(name)}`;
        console.debug('Fetching user from:', url);
        try {
          const resp = await fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });
          if (!resp.ok) {
            console.error('Network response not ok', resp.status, resp.statusText);
            throw new Error('Network response was not ok');
          }
          const data = await resp.json();
          console.debug('MockAPI response:', data);
          return data; // MockAPI normalmente devuelve un array
        } catch (err) {
          console.error('Fetch error:', err);
          throw err;
        }
      }

      // Manejo del submit: valida con la API si existe usuario y coincide la contraseña
      loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        errorMsg.classList.add('hidden');
        errorMsg.classList.remove('text-green-200', 'text-red-300');
        const u = document.getElementById('name').value.trim();
        const p = document.getElementById('password').value;

        if (!u || !p) {
          errorMsg.textContent = 'Por favor completa usuario y contraseña.';
          errorMsg.classList.remove('hidden');
          errorMsg.classList.add('text-red-300');
          return;
        }

        try {
          const users = await fetchUserByNombre(u);
          if (!Array.isArray(users) || users.length === 0) {
            errorMsg.textContent = 'Usuario o contraseña incorrectos.';
            errorMsg.classList.remove('hidden');
            errorMsg.classList.add('text-red-300');
            return;
          }

          const user = users[0];
          // AJUSTE: usar el campo correcto devuelto por tu MockAPI (aquí uso `name`)
          if (user.password && user.password === p) {
            localStorage.setItem('vulcano_auth', JSON.stringify({ id: user.id, name: user.name || user.username }));
            errorMsg.classList.remove('hidden');
            errorMsg.classList.add('text-green-200');
            errorMsg.textContent = 'Acceso correcto. Redirigiendo...';
            setTimeout(() => location.href = '../../public/usuario.html', 900); // redirige a la página de cuenta
          } else {
            errorMsg.textContent = 'Usuario o contraseña incorrectos.';
            errorMsg.classList.remove('hidden');
            errorMsg.classList.add('text-red-300');
          }
        } catch (err) {
          errorMsg.textContent = 'Error de conexión. Revisa la consola (CORS / URL).';
          errorMsg.classList.remove('hidden');
          errorMsg.classList.add('text-red-300');
        }
      });
    })();