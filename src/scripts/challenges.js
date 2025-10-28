const MOCKAPI_DESAFIOS_URL = 'https://68f05b760b966ad50032a281.mockapi.io/Desafios';

let desafios = [];

const listaDesafios = document.getElementById('listaDesafios');
const loading = document.getElementById('loading');
const estadisticas = document.getElementById('estadisticas');
const buscarDesafio = document.getElementById('buscarDesafio');
const filtroCategoria = document.getElementById('filtroCategoria');
const filtroDificultad = document.getElementById('filtroDificultad');

async function obtenerDesafios() {
  try {
    loading.classList.remove('hidden');
    const response = await fetch(MOCKAPI_DESAFIOS_URL);
    if (!response.ok) throw new Error('Error al obtener desafíos');
    desafios = await response.json();
    loading.classList.add('hidden');
    renderizarDesafios();
    actualizarEstadisticas();
  } catch (error) {
    loading.classList.add('hidden');
    console.error('Error:', error);
    alert('Error al cargar los desafíos. Verifica tu conexión a MockAPI.');
  }
}

function renderizarDesafios() {
  const textoBusqueda = buscarDesafio.value.toLowerCase();
  const categoriaSeleccionada = filtroCategoria.value;
  const dificultadSeleccionada = filtroDificultad.value;

  const desafiosFiltrados = desafios.filter(d => {
    const cumpleBusqueda = d.nombre.toLowerCase().includes(textoBusqueda);
    const cumpleCategoria = categoriaSeleccionada === 'Todas' || d.categoria === categoriaSeleccionada;
    const cumpleDificultad = dificultadSeleccionada === 'Todas' || d.dificultad === dificultadSeleccionada;
    return cumpleBusqueda && cumpleCategoria && cumpleDificultad;
  });

  if (desafiosFiltrados.length === 0) {
    listaDesafios.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-white text-lg">No hay desafíos para mostrar</p>
      </div>
    `;
    return;
  }

  listaDesafios.innerHTML = desafiosFiltrados.map(desafio => `
    <div class="bg-[#5A3A2E] rounded-lg shadow-lg p-6 border-l-4 border-[#C19A6B] hover:shadow-xl transition-shadow desafio-card">
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-xl font-bold text-white flex-1">${desafio.nombre}</h3>
      </div>

      <div class="flex flex-wrap gap-2 mb-3">
        <span class="bg-[#714C3A] text-[#C19A6B] px-3 py-1 rounded-full text-sm font-semibold">${desafio.categoria}</span>
        <span class="bg-[#714C3A] text-white px-3 py-1 rounded-full text-sm font-semibold">${desafio.dificultad}</span>
        <span class="bg-[#714C3A] text-[#C19A6B] px-3 py-1 rounded-full text-sm font-semibold">⭐ ${desafio.puntos} pts</span>
      </div>

      <p class="text-gray-300 text-sm mb-4">${desafio.descripcion}</p>

      <button onclick="iniciarDesafio(${desafio.id})" class="w-full bg-[#C19A6B] hover:bg-[#D2B48C] text-[#5A3A2E] font-semibold py-2 rounded-lg transition-colors">
        Comenzar Desafío
      </button>
    </div>
  `).join('');

  // Aplicar efectos de zoom a las tarjetas
  aplicarEfectosZoom();
  actualizarEstadisticas();
}

function aplicarEfectosZoom() {
  const desafioCards = document.querySelectorAll('.desafio-card');

  desafioCards.forEach((card, index) => {
    // Aplicar transición suave para todas las transformaciones
    card.style.transition = 'all 0.6s ease-out';

    // Zoom al hacer hover 
    card.addEventListener('mouseenter', function() {
      // Agrandar la tarjeta
      this.style.transform = 'scale(1.1)';
      // Agregar sombra para efecto de "elevación"
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.6)';
      // Aumentar z-index para que se superponga a otras tarjetas
      this.style.zIndex = '10';
    });

    // Al quitar el cursor de la tarjeta 
    card.addEventListener('mouseleave', function() {
      // Volver al tamaño original
      this.style.transform = 'scale(1)';
      // Quitar sombra
      this.style.boxShadow = '';
      // Restaurar z-index
      this.style.zIndex = '1';
    });

    // Zoom al hacer clic
    card.addEventListener('click', function(e) {
      // Solo aplicar zoom si no se hace clic en el botón
      if (!e.target.closest('button')) {
        // Hacer un zoom más fuerte momentáneo
        this.style.transform = 'scale(1.15)';
        // Después de 200 ms, regresar a un estado de "hover" más suave
        setTimeout(() => {
          this.style.transform = 'scale(1.1)';
        }, 200);
      }
    });
  });
}

function actualizarEstadisticas() {
  if (desafios.length === 0) {
    estadisticas.classList.add('hidden');
    return;
  }

  estadisticas.classList.remove('hidden');
  
  const totalFaciles = desafios.filter(d => d.dificultad === 'Fácil').length;
  const totalIntermedios = desafios.filter(d => d.dificultad === 'Intermedio').length;
  const totalAvanzados = desafios.filter(d => d.dificultad === 'Difícil' || d.dificultad === 'Experto').length;

  document.getElementById('totalDesafios').textContent = desafios.length;
  document.getElementById('totalFaciles').textContent = totalFaciles;
  document.getElementById('totalIntermedios').textContent = totalIntermedios;
  document.getElementById('totalAvanzados').textContent = totalAvanzados;
}

function iniciarDesafio(id) {
  const desafio = desafios.find(d => d.id == id);
  if (!desafio) return;
  mostrarModalDesafio(desafio);
}

function mostrarModalDesafio(desafio) {
  const modal = document.createElement('div');
  modal.id = 'modalDesafio';
  modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
  modal.innerHTML = `
    <div class="bg-[#5A3A2E] rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
      <div class="bg-[#714C3A] p-6 border-b-2 border-[#C19A6B]">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-2xl font-bold text-white mb-2">${desafio.nombre}</h2>
            <div class="flex gap-2">
              <span class="bg-[#5A3A2E] text-[#C19A6B] px-3 py-1 rounded-full text-sm font-semibold">${desafio.categoria}</span>
              <span class="bg-[#5A3A2E] text-white px-3 py-1 rounded-full text-sm font-semibold">${desafio.dificultad}</span>
              <span class="bg-[#5A3A2E] text-[#C19A6B] px-3 py-1 rounded-full text-sm font-semibold">⭐ ${desafio.puntos} pts</span>
            </div>
          </div>
          <button onclick="cerrarModalDesafio()" class="text-white hover:text-[#C19A6B] transition-colors">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-6">
        <div class="mb-6">
          <h3 class="text-lg font-bold text-white mb-3">📋 Descripción del Desafío</h3>
          <p class="text-gray-300 whitespace-pre-wrap">${desafio.descripcion}</p>
        </div>

        <div class="mb-4">
          <h3 class="text-lg font-bold text-white mb-3">💻 Escribe tu código JavaScript</h3>
          <textarea 
            id="codigoUsuario" 
            class="w-full h-64 px-4 py-3 bg-[#714C3A] text-white rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#C19A6B] border border-[#C19A6B]"
            spellcheck="false"
            placeholder="// Escribe tu solución aquí...
function solucion() {
  // Tu código
  return resultado;
}

// Ejemplo:
// return 'Hola Mundo';"
          ></textarea>
        </div>

        <div id="resultadoEjecucion" class="hidden mb-4">
          <h3 class="text-lg font-bold text-white mb-3">📊 Resultado</h3>
          <div id="resultadoContenido" class="bg-[#714C3A] rounded-lg p-4 border-l-4"></div>
        </div>
      </div>

      <div class="bg-[#714C3A] p-6 border-t-2 border-[#C19A6B] flex gap-3">
        <button 
          onclick="ejecutarCodigo()" 
          class="flex-1 bg-[#C19A6B] hover:bg-[#D2B48C] text-[#5A3A2E] font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Ejecutar Código
        </button>
        <button 
          onclick="cerrarModalDesafio()" 
          class="bg-[#5A3A2E] hover:bg-[#A57E5A] text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

function cerrarModalDesafio() {
  const modal = document.getElementById('modalDesafio');
  if (modal) modal.remove();
}

function ejecutarCodigo() {
  const codigoUsuario = document.getElementById('codigoUsuario').value;
  const resultadoDiv = document.getElementById('resultadoEjecucion');

  if (!codigoUsuario.trim()) {
    mostrarResultado('💡 Escribe tu código JavaScript arriba y luego presiona "Ejecutar Código" para ver el resultado.', 'info');
    resultadoDiv.classList.remove('hidden');
    return;
  }

  resultadoDiv.classList.remove('hidden');

  try {
    let consoleOutput = [];
    const originalLog = console.log;
    console.log = function(...args) {
      consoleOutput.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
      originalLog.apply(console, args);
    };

    const resultado = eval(codigoUsuario);
    console.log = originalLog;

    let mensaje = '';
    
    if (consoleOutput.length > 0) {
      mensaje += '<div class="mb-3"><strong class="text-[#C19A6B]">🔍 Console output:</strong><pre class="mt-2 text-gray-300">' + consoleOutput.join('\n') + '</pre></div>';
    }
    
    if (resultado !== undefined) {
      mensaje += '<div><strong class="text-[#C19A6B]">✅ Resultado:</strong><pre class="mt-2 text-white font-mono">' + 
        (typeof resultado === 'object' ? JSON.stringify(resultado, null, 2) : String(resultado)) + 
        '</pre></div>';
    }

    if (!mensaje) {
      mensaje = '<p class="text-gray-300">Código ejecutado correctamente (sin output)</p>';
    }

    mostrarResultado(mensaje, 'success');

  } catch (error) {
    mostrarResultado(`<strong class="text-red-400">❌ Error:</strong><pre class="mt-2 text-white">${error.message}</pre>`, 'error');
  }

  // Scroll automático al resultado
  setTimeout(() => {
    const resultadoDiv = document.getElementById('resultadoEjecucion');
    resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, 100);
}

function mostrarResultado(mensaje, tipo) {
  const resultadoContenido = document.getElementById('resultadoContenido');
  
  if (tipo === 'success') {
    resultadoContenido.className = 'bg-[#714C3A] rounded-lg p-4 border-l-4 border-green-500';
  } else if (tipo === 'info') {
    resultadoContenido.className = 'bg-[#714C3A] rounded-lg p-4 border-l-4 border-blue-400';
  } else {
    resultadoContenido.className = 'bg-[#714C3A] rounded-lg p-4 border-l-4 border-red-500';
  }
  
  resultadoContenido.innerHTML = mensaje;
}

buscarDesafio.addEventListener('input', renderizarDesafios);
filtroCategoria.addEventListener('change', renderizarDesafios);
filtroDificultad.addEventListener('change', renderizarDesafios);

window.addEventListener('DOMContentLoaded', () => {
  obtenerDesafios();
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('modalDesafio')) {
      cerrarModalDesafio();
    }
  });
});

window.iniciarDesafio = iniciarDesafio;
window.cerrarModalDesafio = cerrarModalDesafio;
window.ejecutarCodigo = ejecutarCodigo;