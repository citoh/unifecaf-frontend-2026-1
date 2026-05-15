const API_URL = 'http://localhost:3000';

let alunos = [];
let estatisticas = null;
let graficoGeral = null;
let graficosCursos = {};
let alunoSelecionadoNome = null;

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

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function obterAlunoSelecionado() {
  if (!alunoSelecionadoNome) return null;
  return alunos.find(aluno => aluno.nome === alunoSelecionadoNome) || null;
}

function obterNotaInteiraAluno(aluno) {
  if (!aluno) return null;
  return Math.trunc(Number(aluno.mediaFinal) || 0);
}

function obterCorBarras(labels, notaSelecionada) {
  return labels.map(label =>
    Number(label) === Number(notaSelecionada)
      ? 'green'
      : 'rgba(54, 162, 235, 0.7)'
  );
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

function obterFaixaIdade(idade) {
  if (idade >= 17 && idade <= 20) return '17-20';
  if (idade >= 21 && idade <= 25) return '21-25';
  if (idade >= 26 && idade <= 30) return '26-30';
  if (idade >= 31) return '31+';
  return null;
}

function alunoEstaAprovado(aluno) {
  return Number(aluno.mediaFinal) >= 7;
}

function criarTextoDestacavel(texto, alunoNome) {
  return `<span class="stat-aluno-ref" data-aluno-nome="${escapeHtml(alunoNome)}">${escapeHtml(texto)}</span>`;
}

function criarClasseHighlight(condicao) {
  return condicao ? 'highlight-aluno' : '';
}

function atualizarDestaquesEstatisticas() {
  document.querySelectorAll('.stat-aluno-ref').forEach((el) => {
    const nomeRef = el.dataset.alunoNome;
    if (nomeRef === alunoSelecionadoNome) {
      el.classList.add('highlight-aluno');
    } else {
      el.classList.remove('highlight-aluno');
    }
  });

  document.querySelectorAll('.aluno-nome-click').forEach((el) => {
    if (el.dataset.alunoNome === alunoSelecionadoNome) {
      el.classList.add('aluno-selecionado');
    } else {
      el.classList.remove('aluno-selecionado');
    }
  });
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

    if (alunoSelecionadoNome && !alunos.some(aluno => aluno.nome === alunoSelecionadoNome)) {
      alunoSelecionadoNome = null;
    }

    renderTabelaAlunos();
    renderEstatisticasTotais();
    renderEstatisticasCursos();
    atualizarDestaquesEstatisticas();
  } catch (error) {
    console.error(error);
    mostrarMensagem('Erro ao carregar dados da aplicação.', true);
  }
}

function alternarSelecaoAluno(nomeAluno) {
  if (alunoSelecionadoNome === nomeAluno) {
    alunoSelecionadoNome = null;
  } else {
    alunoSelecionadoNome = nomeAluno;
  }

  renderTabelaAlunos();
  renderEstatisticasTotais();
  renderEstatisticasCursos();
  atualizarDestaquesEstatisticas();
}

function renderTabelaAlunos() {
  const tbody = document.getElementById('alunos-tbody');
  tbody.innerHTML = '';

  alunos.forEach((aluno) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>
        <span
          class="aluno-nome-click ${alunoSelecionadoNome === aluno.nome ? 'aluno-selecionado' : ''}"
          data-aluno-nome="${escapeHtml(aluno.nome)}"
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

  tbody.querySelectorAll('.aluno-nome-click').forEach((el) => {
    el.addEventListener('click', () => {
      alternarSelecaoAluno(el.dataset.alunoNome);
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

  const aluno = obterAlunoSelecionado();
  const faixaIdadeAluno = aluno ? obterFaixaIdade(Number(aluno.idade)) : null;
  const cursoAluno = aluno?.curso ?? null;
  const ehMaisNovo = aluno && aluno.nome === estatisticas.nomeAlunoMaisNovo;
  const ehMaisVelho = aluno && aluno.nome === estatisticas.nomeAlunoMaisVelho;

  const container = document.getElementById('estatisticas-totais');

  container.innerHTML = `
    <div class="stat-card">
      <div class="stat-title">Quantidade total de alunos</div>
      <div class="stat-value">${estatisticas.total}</div>
    </div>

    <div class="stat-card ${criarClasseHighlight(aluno && alunoEstaAprovado(aluno))}">
      <div class="stat-title">Total de alunos aprovados</div>
      <div class="stat-value">${estatisticas.totalAlunosAprovados} (${estatisticas.porcentagemAprovacao}%)</div>
    </div>

    <div class="stat-card ${criarClasseHighlight(aluno && !alunoEstaAprovado(aluno))}">
      <div class="stat-title">Total de alunos reprovados</div>
      <div class="stat-value">${estatisticas.totalAlunosReprovados} (${estatisticas.porcentagemReprovacao}%)</div>
    </div>

    <div class="stat-card ${criarClasseHighlight(cursoAluno && cursoAluno === estatisticas.nomeCursoMaiorPorcentagemAprovacao)}">
      <div class="stat-title">Curso com maior aprovação</div>
      <div class="stat-value">${escapeHtml(estatisticas.nomeCursoMaiorPorcentagemAprovacao)}</div>
    </div>

    <div class="stat-card ${criarClasseHighlight(cursoAluno && cursoAluno === estatisticas.nomeCursoMenorPorcentagemAprovacao)}">
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

    <div class="stat-card ${criarClasseHighlight(ehMaisNovo)}">
      <div class="stat-title">Aluno mais novo</div>
      <div class="stat-value">
        ${criarTextoDestacavel(
          `${estatisticas.nomeAlunoMaisNovo} (${estatisticas.idadeMaisNovo} anos)`,
          estatisticas.nomeAlunoMaisNovo
        )}
      </div>
    </div>

    <div class="stat-card ${criarClasseHighlight(ehMaisVelho)}">
      <div class="stat-title">Aluno mais velho</div>
      <div class="stat-value">
        ${criarTextoDestacavel(
          `${estatisticas.nomeAlunoMaisVelho} (${estatisticas.idadeMaisVelho} anos)`,
          estatisticas.nomeAlunoMaisVelho
        )}
      </div>
    </div>

    <div class="stat-card ${criarClasseHighlight(faixaIdadeAluno === '17-20')}">
      <div class="stat-title">Faixa 17-20</div>
      <div class="stat-value">${estatisticas.faixasDeIdade?.['17-20'] ?? 0}</div>
    </div>

    <div class="stat-card ${criarClasseHighlight(faixaIdadeAluno === '21-25')}">
      <div class="stat-title">Faixa 21-25</div>
      <div class="stat-value">${estatisticas.faixasDeIdade?.['21-25'] ?? 0}</div>
    </div>

    <div class="stat-card ${criarClasseHighlight(faixaIdadeAluno === '26-30')}">
      <div class="stat-title">Faixa 26-30</div>
      <div class="stat-value">${estatisticas.faixasDeIdade?.['26-30'] ?? 0}</div>
    </div>

    <div class="stat-card ${criarClasseHighlight(faixaIdadeAluno === '31+')}">
      <div class="stat-title">Faixa 31+</div>
      <div class="stat-value">${estatisticas.faixasDeIdade?.['31+'] ?? 0}</div>
    </div>
  `;

  desenharGraficoGeral(estatisticas.histogramPorcentagemNotasPorPontos);

  const chartBoxGeral = document.getElementById('chart-box-geral');
  if (aluno) {
    chartBoxGeral.classList.add('highlight-aluno');
  } else {
    chartBoxGeral.classList.remove('highlight-aluno');
  }
}

function desenharGraficoGeral(histograma) {
  const ctx = document.getElementById('grafico-geral');
  const dados = montarDadosGrafico(histograma);
  const alunoSelecionado = obterAlunoSelecionado();
  const notaSelecionada = obterNotaInteiraAluno(alunoSelecionado);

  if (graficoGeral) {
    graficoGeral.destroy();
  }

  graficoGeral = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dados.labels,
      datasets: [{
        label: 'Quantidade de alunos',
        data: dados.quantidades,
        backgroundColor: obterCorBarras(dados.labels, notaSelecionada)
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

  const aluno = obterAlunoSelecionado();
  const faixaIdadeAluno = aluno ? obterFaixaIdade(Number(aluno.idade)) : null;
  const aprovado = aluno ? alunoEstaAprovado(aluno) : null;

  (estatisticas.cursos || []).forEach((curso, index) => {
    const idCanvas = `grafico-curso-${index}`;
    const ehCursoDoAluno = aluno && aluno.curso === curso.nome;
    const ehMaisNovoCurso = ehCursoDoAluno && aluno.nome === curso.nomeAlunoMaisNovo;
    const ehMaisVelhoCurso = ehCursoDoAluno && aluno.nome === curso.nomeAlunoMaisVelho;
    const notaSelecionada = ehCursoDoAluno ? obterNotaInteiraAluno(aluno) : null;

    const courseItem = document.createElement('div');
    courseItem.className = `course-item ${ehCursoDoAluno ? 'open' : ''}`;

    courseItem.innerHTML = `
      <div class="course-header ${criarClasseHighlight(ehCursoDoAluno)}">
        <strong>${escapeHtml(curso.nome)}</strong>
        <i class="fa-solid fa-chevron-down"></i>
      </div>

      <div class="course-content">
        <div class="stats-grid">
          <div class="stat-card ${criarClasseHighlight(ehCursoDoAluno)}">
            <div class="stat-title">Quantidade total de alunos</div>
            <div class="stat-value">${curso.total}</div>
          </div>

          <div class="stat-card ${criarClasseHighlight(ehCursoDoAluno)}">
            <div class="stat-title">Distribuição no total</div>
            <div class="stat-value">${curso.distribuicaoDeAlunos}%</div>
          </div>

          <div class="stat-card ${criarClasseHighlight(ehCursoDoAluno && aprovado === true)}">
            <div class="stat-title">Aprovados</div>
            <div class="stat-value">${curso.totalAlunosAprovados} (${curso.porcentagemAprovacao}%)</div>
          </div>

          <div class="stat-card ${criarClasseHighlight(ehCursoDoAluno && aprovado === false)}">
            <div class="stat-title">Reprovados</div>
            <div class="stat-value">${curso.totalAlunosReprovados} (${curso.porcentagemReprovacao}%)</div>
          </div>

          <div class="stat-card ${criarClasseHighlight(ehCursoDoAluno)}">
            <div class="stat-title">Média das notas</div>
            <div class="stat-value">${curso.mediaDeNotas}</div>
          </div>

          <div class="stat-card ${criarClasseHighlight(ehCursoDoAluno)}">
            <div class="stat-title">Mediana das notas</div>
            <div class="stat-value">${curso.medianaDeNotas}</div>
          </div>

          <div class="stat-card ${criarClasseHighlight(ehCursoDoAluno)}">
            <div class="stat-title">Idade média</div>
            <div class="stat-value">${curso.idadeMedia}</div>
          </div>

          <div class="stat-card ${criarClasseHighlight(ehMaisNovoCurso)}">
            <div class="stat-title">Aluno mais novo</div>
            <div class="stat-value">
              ${criarTextoDestacavel(
                `${curso.nomeAlunoMaisNovo} (${curso.idadeMaisNovo} anos)`,
                curso.nomeAlunoMaisNovo
              )}
            </div>
          </div>

          <div class="stat-card ${criarClasseHighlight(ehMaisVelhoCurso)}">
            <div class="stat-title">Aluno mais velho</div>
            <div class="stat-value">
              ${criarTextoDestacavel(
                `${curso.nomeAlunoMaisVelho} (${curso.idadeMaisVelho} anos)`,
                curso.nomeAlunoMaisVelho
              )}
            </div>
          </div>

          <div class="stat-card ${criarClasseHighlight(ehCursoDoAluno && faixaIdadeAluno === '17-20')}">
            <div class="stat-title">Faixa 17-20</div>
            <div class="stat-value">${curso.faixasDeIdade?.['17-20'] ?? 0}</div>
          </div>

          <div class="stat-card ${criarClasseHighlight(ehCursoDoAluno && faixaIdadeAluno === '21-25')}">
            <div class="stat-title">Faixa 21-25</div>
            <div class="stat-value">${curso.faixasDeIdade?.['21-25'] ?? 0}</div>
          </div>

          <div class="stat-card ${criarClasseHighlight(ehCursoDoAluno && faixaIdadeAluno === '26-30')}">
            <div class="stat-title">Faixa 26-30</div>
            <div class="stat-value">${curso.faixasDeIdade?.['26-30'] ?? 0}</div>
          </div>

          <div class="stat-card ${criarClasseHighlight(ehCursoDoAluno && faixaIdadeAluno === '31+')}">
            <div class="stat-title">Faixa 31+</div>
            <div class="stat-value">${curso.faixasDeIdade?.['31+'] ?? 0}</div>
          </div>
        </div>

        <div class="chart-box ${criarClasseHighlight(ehCursoDoAluno)}">
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
          data: dados.quantidades,
          backgroundColor: obterCorBarras(dados.labels, notaSelecionada)
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
    aluno.dataNascimentoOriginal ?? aluno.dataNascimentoIso ?? '';
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

    if (alunos.some(aluno => String(aluno.id) === String(id) && aluno.nome === alunoSelecionadoNome)) {
      alunoSelecionadoNome = null;
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