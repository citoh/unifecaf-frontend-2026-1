import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import WidgetCard from './WidgetCard';

const PER_PAGE = 10;

export default function AlunosWidget({ className }) {
  const { data, loading, error } = useSelector((state) => state.alunos);
  const curso = useSelector((state) => state.filter.curso);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const list = data ?? [];
    return list
      .filter((a) => !curso || a.curso === curso)
      .filter((a) => !search || a.nome.toLowerCase().includes(search.toLowerCase()));
  }, [data, curso, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  return (
    <WidgetCard
      title="Lista de Alunos"
      badge={`${filtered.length} alunos`}
      loading={loading}
      error={error}
      className={className}
    >
      <div className="table-controls">
        <input
          className="table-search"
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Curso</th>
              <th>Data de Nasc.</th>
              <th>Idade</th>
              <th>Média Final</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((aluno) => {
              const aprovado = Number(aluno.mediaFinal) >= 7;
              return (
                <tr key={aluno.id ?? aluno.ra}>
                  <td>{aluno.nome}</td>
                  <td>{aluno.curso}</td>
                  <td>{aluno.dataNascimento}</td>
                  <td>{aluno.idade}</td>
                  <td>{Number(aluno.mediaFinal).toFixed(1)}</td>
                  <td>
                    <span className={`badge ${aprovado ? 'badge-success' : 'badge-danger'}`}>
                      {aprovado ? 'Aprovado' : 'Reprovado'}
                    </span>
                  </td>
                </tr>
              );
            })}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '24px' }}>
                  Nenhum aluno encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>
          {filtered.length === 0
            ? 'Nenhum resultado'
            : `Mostrando ${page * PER_PAGE + 1}–${Math.min((page + 1) * PER_PAGE, filtered.length)} de ${filtered.length}`}
        </span>
        <div className="pagination-controls">
          <button onClick={() => setPage(0)} disabled={page === 0}>«</button>
          <button onClick={() => setPage((p) => p - 1)} disabled={page === 0}>‹ Anterior</button>
          <button onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages - 1}>Próximo ›</button>
          <button onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1}>»</button>
        </div>
      </div>
    </WidgetCard>
  );
}
