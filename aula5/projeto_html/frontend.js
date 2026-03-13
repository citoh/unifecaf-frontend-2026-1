const API_URL = 'http://localhost:3000';

let alunos = [];
let estatisticas = null;
let graficoGeral = null;
let graficosCursos = {};

function mostrarMensagem(texto, erro = false) {
  const el = document.getElementById('message');
  el.textContent = texto;
  el.classList.add('show');
  el.style.background = erro ? '#fff1f1' : '#ffffff';
  el.style.borderColor = erro ? '#cc6666' : '#ddd';

  setTimeout(() => {
    el.classList.remove('show');
  }, 3000);
}

function limparFormulario() {
  document.getElementById('aluno-id').value = '';
  document.getElementById('nome').value = '';
  document.getElementById('curso').value = '';
  document.getElementById('dataNascimento').value = '';
  document.getElementById('mediaFinal').value = '';
}

function montarDadosGrafico(histograma) {
  const entradas = Object.entries(histograma || {}).sort(
    (a, b) => Number(a[0]) - Number(b[0])
  );

  return {
    labels: entradas.map(([nota]) => nota),
    quantidades: entradas.map(([, valor]) =>
      typeof valor === 'object' ? valor.quantidade : valor
    ),
    porcentagens: entradas.map(([, valor]) =>
      typeof valor === 'object' ? valor.porcentagem : null
    )
  };
}

async function buscarAlunos() {
  const response = await fetch(`${API_URL}/alunos`);
  if (!response.ok) throw new Error('Erro ao buscar alunos');
  return response.json();
}

async function buscarEstatisticas() {
  const response = await fetch(`${API_URL}/`);
  if (!response.ok) throw new Error('Erro ao buscar estatísticas');
  return response.json();
}

async function carregarDados() {
  try {
    const [listaAlunos, dadosEstatisticas] = await Promise.all([
      buscarAlunos(),
      buscarEstatisticas()
    ]);

    alunos = listaAlunos;
    estatisticas = dadosEstatisticas;

    renderTabelaAlunos();
    renderEstatisticasTotais();
    renderEstatisticasCursos();
  } catch (error) {
    console.error(error);
    mostrarMensagem('Erro ao carregar dados da aplicação.', true);
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function criarTextoDestacavel(texto, alunoNome) {
  return `<span class="stat-aluno-ref" data-aluno-nome="${escapeHtml(alunoNome)}">${escapeHtml(texto)}</span>`;
}

function aplicarHoverAluno(nomeAluno) {
  document.querySelectorAll('.stat-aluno-ref').forEach((el) => {
    const nomeRef = el.dataset.alunoNome;
    if (nomeRef === nomeAluno) {
      el.classList.add('highlight-aluno');
    }
  });
}

function removerHoverAluno() {
  document.querySelectorAll('.stat-aluno-ref').forEach((el) => {
    el.classList.remove('highlight-aluno');
  });
}

function renderTabelaAlunos() {
  const tbody = document.getElementById('alunos-tbody');
  tbody.innerHTML = '';

  alunos.forEach((aluno) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>
        <span
          class="aluno-nome-hover"
          data-aluno-hover="${escapeHtml(aluno.nome)}"
        >
          ${escapeHtml(aluno.nome ?? '-')}
        </span>
      </td>
      <td>${escapeHtml(aluno.curso ?? '-')}</td>
      <td>${escapeHtml(aluno.dataNascimentoFormatada ?? aluno.dataNascimento ?? '-')}</td>
      <td>${escapeHtml(aluno.idade ?? '-')}</td>
      <td>${escapeHtml(aluno.mediaFinal ?? '-')}</td>
      <td>
        <div class="icon-buttons">
          <button class="icon-btn btn-editar" data-id="${escapeHtml(aluno.id)}" title="Editar">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="icon-btn btn-excluir" data-id="${escapeHtml(aluno.id)}" title="Excluir">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.aluno-nome-hover').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      aplicarHoverAluno(el.dataset.alunoHover);
    });

    el.addEventListener('mouseleave', () => {
      removerHoverAluno();
    });
  });

  tbody.querySelectorAll('.btn-editar').forEach((btn) => {
    btn.addEventListener('click', () => editarAluno(btn.dataset.id));
  });

  tbody.querySelectorAll('.btn-excluir').forEach((btn) => {
    btn.addEventListener('click', () => excluirAluno(btn.dataset.id));
  });
}

function renderEstatisticasTotais() {
  if (!estatisticas) return;

  const container = document.getElementById('estatisticas-totais');

  container.innerHTML = `
    <div class="stat-card">
      <div class="stat-title">Quantidade total de alunos</div>
      <div class="stat-value">${estatisticas.total}</div>
    </div>

    <div class="stat-card">
      <div class="stat-title">Total de alunos aprovados</div>
      <div class="stat-value">${estatisticas.totalAlunosAprovados} (${estatisticas.porcentagemAprovacao}%)</div>
    </div>

    <div class="stat-card">
      <div class="stat-title">Total de alunos reprovados</div>
      <div class="stat-value">${estatisticas.totalAlunosReprovados} (${estatisticas.porcentagemReprovacao}%)</div>
    </div>

    <div class="stat-card">
      <div class="stat-title">Curso com maior aprovação</div>
      <div class="stat-value">${escapeHtml(estatisticas.nomeCursoMaiorPorcentagemAprovacao)}</div>
    </div>

    <div class="stat-card">
      <div class="stat-title">Curso com menor aprovação</div>
      <div class="stat-value">${escapeHtml(estatisticas.nomeCursoMenorPorcentagemAprovacao)}</div>
    </div>

    <div class="stat-card">
      <div class="stat-title">Média das notas</div>
      <div class="stat-value">${estatisticas.mediaDeNotas}</div>
    </div>

    <div class="stat-card">
      <div class="stat-title">Mediana das notas</div>
      <div class="stat-value">${estatisticas.medianaDeNotas}</div>
    </div>

    <div class="stat-card">
      <div class="stat-title">Idade média</div>
      <div class="stat-value">${estatisticas.idadeMedia}</div>
    </div>

    <div class="stat-card">
      <div class="stat-title">Aluno mais novo</div>
      <div class="stat-value">
        ${criarTextoDestacavel(
          `${estatisticas.nomeAlunoMaisNovo} (${estatisticas.idadeMaisNovo} anos)`,
          estatisticas.nomeAlunoMaisNovo
        )}
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-title">Aluno mais velho</div>
      <div class="stat-value">
        ${criarTextoDestacavel(
          `${estatisticas.nomeAlunoMaisVelho} (${estatisticas.idadeMaisVelho} anos)`,
          estatisticas.nomeAlunoMaisVelho
        )}
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-title">Faixa 17-20</div>
      <div class="stat-value">${estatisticas.faixasDeIdade?.['17-20'] ?? 0}</div>
    </div>

    <div class="stat-card">
      <div class="stat-title">Faixa 21-25</div>
      <div class="stat-value">${estatisticas.faixasDeIdade?.['21-25'] ?? 0}</div>
    </div>

    <div class="stat-card">
      <div class="stat-title">Faixa 26-30</div>
      <div class="stat-value">${estatisticas.faixasDeIdade?.['26-30'] ?? 0}</div>
    </div>

    <div class="stat-card">
      <div class="stat-title">Faixa 31+</div>
      <div class="stat-value">${estatisticas.faixasDeIdade?.['31+'] ?? 0}</div>
    </div>
  `;

  desenharGraficoGeral(estatisticas.histogramPorcentagemNotasPorPontos);
}

function desenharGraficoGeral(histograma) {
  const ctx = document.getElementById('grafico-geral');

  if (graficoGeral) {
    graficoGeral.destroy();
  }

  const dados = montarDadosGrafico(histograma);

  graficoGeral = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dados.labels,
      datasets: [{
        label: 'Quantidade de alunos',
        data: dados.quantidades
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            afterLabel: function(context) {
              const i = context.dataIndex;
              const p = dados.porcentagens[i];
              return p !== null ? `Porcentagem: ${p}%` : '';
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function destruirGraficosCursos() {
  Object.values(graficosCursos).forEach((grafico) => grafico.destroy());
  graficosCursos = {};
}

function renderEstatisticasCursos() {
  const container = document.getElementById('cursos-container');
  container.innerHTML = '';
  destruirGraficosCursos();

  (estatisticas.cursos || []).forEach((curso, index) => {
    const idCanvas = `grafico-curso-${index}`;
    const courseItem = document.createElement('div');
    courseItem.className = 'course-item';

    courseItem.innerHTML = `
      <div class="course-header">
        <strong>${escapeHtml(curso.nome)}</strong>
        <i class="fa-solid fa-chevron-down"></i>
      </div>

      <div class="course-content">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-title">Quantidade total de alunos</div>
            <div class="stat-value">${curso.total}</div>
          </div>

          <div class="stat-card">
            <div class="stat-title">Distribuição no total</div>
            <div class="stat-value">${curso.distribuicaoDeAlunos}%</div>
          </div>

          <div class="stat-card">
            <div class="stat-title">Aprovados</div>
            <div class="stat-value">${curso.totalAlunosAprovados} (${curso.porcentagemAprovacao}%)</div>
          </div>

          <div class="stat-card">
            <div class="stat-title">Reprovados</div>
            <div class="stat-value">${curso.totalAlunosReprovados} (${curso.porcentagemReprovacao}%)</div>
          </div>

          <div class="stat-card">
            <div class="stat-title">Média das notas</div>
            <div class="stat-value">${curso.mediaDeNotas}</div>
          </div>

          <div class="stat-card">
            <div class="stat-title">Mediana das notas</div>
            <div class="stat-value">${curso.medianaDeNotas}</div>
          </div>

          <div class="stat-card">
            <div class="stat-title">Idade média</div>
            <div class="stat-value">${curso.idadeMedia}</div>
          </div>

          <div class="stat-card">
            <div class="stat-title">Aluno mais novo</div>
            <div class="stat-value">
              ${criarTextoDestacavel(
                `${curso.nomeAlunoMaisNovo} (${curso.idadeMaisNovo} anos)`,
                curso.nomeAlunoMaisNovo
              )}
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-title">Aluno mais velho</div>
            <div class="stat-value">
              ${criarTextoDestacavel(
                `${curso.nomeAlunoMaisVelho} (${curso.idadeMaisVelho} anos)`,
                curso.nomeAlunoMaisVelho
              )}
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-title">Faixa 17-20</div>
            <div class="stat-value">${curso.faixasDeIdade?.['17-20'] ?? 0}</div>
          </div>

          <div class="stat-card">
            <div class="stat-title">Faixa 21-25</div>
            <div class="stat-value">${curso.faixasDeIdade?.['21-25'] ?? 0}</div>
          </div>

          <div class="stat-card">
            <div class="stat-title">Faixa 26-30</div>
            <div class="stat-value">${curso.faixasDeIdade?.['26-30'] ?? 0}</div>
          </div>

          <div class="stat-card">
            <div class="stat-title">Faixa 31+</div>
            <div class="stat-value">${curso.faixasDeIdade?.['31+'] ?? 0}</div>
          </div>
        </div>

        <div class="chart-box">
          <h3>Histograma de notas</h3>
          <canvas id="${idCanvas}"></canvas>
        </div>
      </div>
    `;

    const header = courseItem.querySelector('.course-header');
    header.addEventListener('click', () => {
      courseItem.classList.toggle('open');
    });

    container.appendChild(courseItem);

    const ctx = document.getElementById(idCanvas);
    const dados = montarDadosGrafico(curso.histogramPorcentagemNotasPorPontos);

    graficosCursos[idCanvas] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dados.labels,
        datasets: [{
          label: `Quantidade de alunos - ${curso.nome}`,
          data: dados.quantidades
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              afterLabel: function(context) {
                const i = context.dataIndex;
                const p = dados.porcentagens[i];
                return p !== null ? `Porcentagem: ${p}%` : '';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
}

async function salvarAluno(event) {
  event.preventDefault();

  const id = document.getElementById('aluno-id').value;
  const payload = {
    nome: document.getElementById('nome').value,
    curso: document.getElementById('curso').value,
    dataNascimento: document.getElementById('dataNascimento').value,
    mediaFinal: Number(document.getElementById('mediaFinal').value)
  };

  try {
    const response = await fetch(
      id ? `${API_URL}/alunos/${id}` : `${API_URL}/alunos`,
      {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      throw new Error('Falha ao salvar aluno');
    }

    limparFormulario();
    await carregarDados();
    mostrarMensagem(id ? 'Aluno atualizado com sucesso.' : 'Aluno cadastrado com sucesso.');
  } catch (error) {
    console.error(error);
    mostrarMensagem('Erro ao salvar aluno.', true);
  }
}

function editarAluno(id) {
  const aluno = alunos.find((item) => String(item.id) === String(id));
  if (!aluno) return;

  document.getElementById('aluno-id').value = aluno.id ?? '';
  document.getElementById('nome').value = aluno.nome ?? '';
  document.getElementById('curso').value = aluno.curso ?? '';
  document.getElementById('dataNascimento').value =
    aluno.dataNascimentoOriginal ?? aluno.dataNascimentoIso ?? aluno.dataNascimento ?? '';
  document.getElementById('mediaFinal').value = aluno.mediaFinal ?? '';
}

async function excluirAluno(id) {
  const confirmar = confirm('Deseja realmente excluir este aluno?');
  if (!confirmar) return;

  try {
    const response = await fetch(`${API_URL}/alunos/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Falha ao excluir aluno');
    }

    await carregarDados();
    mostrarMensagem('Aluno excluído com sucesso.');
  } catch (error) {
    console.error(error);
    mostrarMensagem('Erro ao excluir aluno.', true);
  }
}

document.getElementById('aluno-form').addEventListener('submit', salvarAluno);

document.getElementById('btn-cancelar').addEventListener('click', () => {
  limparFormulario();
});

carregarDados();