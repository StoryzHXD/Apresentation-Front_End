// =========================================================
// 1. NAVEGAÇÃO ENTRE ABAS PRINCIPAIS
// =========================================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabButtons.forEach((b) => b.classList.remove('active'));
    tabPanels.forEach((p) => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(`tab-${target}`).classList.add('active');
  });
});

// =========================================================
// 2. ABA 1: COMPONENTIZAÇÃO & PROPS
// =========================================================
const inputNome = document.getElementById('prop-nome');
const inputCargo = document.getElementById('prop-cargo');
const colorButtons = document.querySelectorAll('.color-btn');
const cardsContainer = document.getElementById('cards-container');
const codePropsPreview = document.getElementById('code-props-preview');
const btnAddCard = document.getElementById('btn-add-card');
const btnResetCards = document.getElementById('btn-reset-cards');

let selectedTheme = 'cyan';
let extraCards = [
  { nome: 'Lucas Mendes', cargo: 'Engenheiro de UI', corTema: 'emerald' }
];

function createProfileCardHTML({ nome, cargo, corTema }, isMain = false) {
  const safeName = nome.trim() || 'Usuário Sem Nome';
  const safeRole = cargo.trim() || 'Cargo não definido';
  const initials = safeName
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() || '')
    .join('');

  return `
    <article class="profile-card theme-${corTema}">
      <div class="profile-info">
        <div class="avatar">${initials || '?'}</div>
        <div>
          <h4>${safeName}</h4>
          <p style="font-size: 0.84rem; color: #94a3b8;">${safeRole}</p>
        </div>
      </div>
      <span class="profile-tag">${isMain ? 'Props Editáveis' : 'Instância .map()'}</span>
    </article>
  `;
}

function renderPropsDemo() {
  const mainProps = {
    nome: inputNome.value,
    cargo: inputCargo.value,
    corTema: selectedTheme
  };

  codePropsPreview.textContent =
`<PerfilCard
  nome="${mainProps.nome || 'Usuário Sem Nome'}"
  cargo="${mainProps.cargo || 'Cargo não definido'}"
  corTema="${mainProps.corTema}"
/>`;

  const allCardsHTML = [
    createProfileCardHTML(mainProps, true),
    ...extraCards.map((card) => createProfileCardHTML(card, false))
  ].join('');

  cardsContainer.innerHTML = allCardsHTML;
}

inputNome.addEventListener('input', renderPropsDemo);
inputCargo.addEventListener('input', renderPropsDemo);

colorButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    colorButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    selectedTheme = btn.dataset.color;
    renderPropsDemo();
  });
});

const sampleUsers = [
  { nome: 'Mariana Costa', cargo: 'Tech Lead Front-End', corTema: 'purple' },
  { nome: 'Rafael Souza', cargo: 'UX/UI Designer', corTema: 'amber' },
  { nome: 'Beatriz Lima', cargo: 'Desenvolvedora React', corTema: 'cyan' }
];

btnAddCard.addEventListener('click', () => {
  const randomUser = sampleUsers[extraCards.length % sampleUsers.length];
  extraCards.push(randomUser);
  renderPropsDemo();
});

btnResetCards.addEventListener('click', () => {
  extraCards = [];
  renderPropsDemo();
});

renderPropsDemo();

// =========================================================
// 3. ABA 2: ROTAS SPA (SINGLE PAGE APPLICATION)
// =========================================================
const spaLinks = document.querySelectorAll('.spa-link');
const spaUrlPath = document.getElementById('spa-url-path');
const spaViewport = document.getElementById('spa-viewport');

const spaRoutes = {
  '/home': {
    title: '🏠 Página Inicial (/home)',
    body: 'Bem-vindo à aplicação SPA! Observe que a barra superior e o contador de reloads (0) permanecem intactos enquanto o conteúdo muda instantaneamente.'
  },
  '/sobre': {
    title: '📘 Sobre o Projeto (/sobre)',
    body: 'Em sistemas multi-página tradicionais (MPA), cada link baixa um novo arquivo HTML do servidor. Na SPA, o roteador apenas substitui o componente ativo.'
  },
  '/contato': {
    title: '✉️ Fale Conosco (/contato)',
    body: 'Formulários e estados de navegação ficam muito mais rápidos e fluidos, entregando experiência próxima a de um aplicativo nativo.'
  }
};

function navigateSPA(route) {
  spaLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.route === route);
  });

  spaUrlPath.textContent = route;
  const view = spaRoutes[route];

  spaViewport.innerHTML = `
    <h3 style="margin-bottom: 10px; color: #38bdf8;">${view.title}</h3>
    <p style="color: #cbd5e1; max-width: 640px;">${view.body}</p>
  `;
}

spaLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navigateSPA(link.dataset.route);
  });
});

navigateSPA('/home');

// =========================================================
// 4. ABA 3: ESTADO REATIVO (useState)
// =========================================================
let countState = 0;
let likedState = false;

const countDisplay = document.getElementById('state-count-display');
const likeText = document.getElementById('state-like-text');
const btnLike = document.getElementById('btn-like');
const codeStatePreview = document.getElementById('code-state-preview');

function triggerCycleAnimation() {
  const steps = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3')
  ];

  steps.forEach((s) => s.classList.remove('lit'));

  steps.forEach((step, idx) => {
    setTimeout(() => {
      step.classList.add('lit');
    }, idx * 180);
  });
}

function updateStateUI(animate = true) {
  countDisplay.textContent = countState;
  likeText.textContent = likedState ? 'Curtido pelo usuário ❤️' : 'Não curtido';

  btnLike.classList.toggle('liked', likedState);
  btnLike.textContent = likedState ? '❤️ Curtido' : '🤍 Curtir';

  codeStatePreview.textContent =
`const [contador, setContador] = useState(${countState});
const [curtido, setCurtido] = useState(${likedState});

// Estado atual renderizado no DOM:
// contador === ${countState}
// curtido  === ${likedState}`;

  if (animate) {
    triggerCycleAnimation();
  }
}

document.getElementById('btn-inc').addEventListener('click', () => {
  countState += 1;
  updateStateUI(true);
});

document.getElementById('btn-dec').addEventListener('click', () => {
  countState -= 1;
  updateStateUI(true);
});

document.getElementById('btn-reset-count').addEventListener('click', () => {
  countState = 0;
  updateStateUI(true);
});

btnLike.addEventListener('click', () => {
  likedState = !likedState;
  updateStateUI(true);
});

updateStateUI(false);

// =========================================================
// 5. ABA 4: CONSUMO DE API (FETCH / ASYNC / LOADING / ERROR)
// =========================================================
const apiStatusHeader = document.getElementById('api-status-header');
const apiJsonOutput = document.getElementById('api-json-output');
const apiUiOutput = document.getElementById('api-ui-output');

function simulateFetch(shouldFail = false) {
  // Estado 1: LOADING
  apiStatusHeader.textContent = 'Status: ⏳ Carregando (Promise Pending)...';
  apiJsonOutput.textContent = '// Aguardando resposta do servidor...';
  apiUiOutput.innerHTML = `
    <div class="spinner-box">
      <div class="spinner"></div>
      <span>Buscando dados na API...</span>
    </div>
  `;

  setTimeout(() => {
    if (shouldFail) {
      // Estado 3: ERROR (catch)
      const errorPayload = {
        status: 500,
        error: 'Internal Server Error',
        message: 'Falha ao conectar com o banco de dados.'
      };
      apiStatusHeader.textContent = 'Status: ❌ 500 Internal Server Error';
      apiJsonOutput.textContent = JSON.stringify(errorPayload, null, 2);
      apiUiOutput.innerHTML = `
        <div class="error-banner">
          <strong>⚠️ Erro ao carregar dados!</strong>
          <p style="font-size: 0.86rem; margin-top: 4px;">
            Capturado pelo bloco <code>try / catch</code>. Tente novamente mais tarde.
          </p>
        </div>
      `;
      return;
    }

    // Estado 2: SUCCESS (200 OK)
    const mockResponse = [
      { id: 1, aluno: 'Carlos Eduardo', modulo: 'Front-End', nota: 9.5 },
      { id: 2, aluno: 'Fernanda Alves', modulo: 'Mobile', nota: 10.0 },
      { id: 3, aluno: 'João Pedro', modulo: 'IA', nota: 9.0 }
    ];

    apiStatusHeader.textContent = 'Status: ✅ 200 OK (JSON Recebido)';
    apiJsonOutput.textContent = JSON.stringify(mockResponse, null, 2);

    apiUiOutput.innerHTML = mockResponse
      .map(
        (item) => `
        <div class="api-user-item">
          <div>
            <strong>${item.aluno}</strong>
            <div style="font-size: 0.8rem; color: #94a3b8;">Módulo: ${item.modulo}</div>
          </div>
          <span class="badge badge-cyan">Nota ${item.nota}</span>
        </div>
      `
      )
      .join('');
  }, 900);
}

document.getElementById('btn-fetch-ok').addEventListener('click', () => simulateFetch(false));
document.getElementById('btn-fetch-err').addEventListener('click', () => simulateFetch(true));
document.getElementById('btn-fetch-clear').addEventListener('click', () => {
  apiStatusHeader.textContent = 'Status: Aguardando requisição...';
  apiJsonOutput.textContent = '// Clique em um dos botões acima para disparar o fetch()';
  apiUiOutput.innerHTML = '<p class="muted-center">Nenhuma requisição executada ainda.</p>';
});

// =========================================================
// 6. MODAL ROTEIRO DA APRESENTAÇÃO
// =========================================================
const modalRubrica = document.getElementById('modal-rubrica');

document.getElementById('btn-rubrica').addEventListener('click', () => {
  modalRubrica.classList.remove('hidden');
});

document.getElementById('btn-close-modal').addEventListener('click', () => {
  modalRubrica.classList.add('hidden');
});

modalRubrica.addEventListener('click', (e) => {
  if (e.target === modalRubrica) {
    modalRubrica.classList.add('hidden');
  }
});
