import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import WidgetCard from './WidgetCard';

export default function ExtremosWidget() {
  const { data, loading, error } = useSelector((state) => state.extremos);
  const curso = useSelector((state) => state.filter.curso);

  const stats = useMemo(() => {
    if (!data) return null;
    if (curso) return data.cursos?.find((c) => c.nome === curso) ?? null;
    return data;
  }, [data, curso]);

  const melhorCurso = data?.nomeCursoMaiorPorcentagemAprovacao;
  const piorCurso = data?.nomeCursoMenorPorcentagemAprovacao;

  return (
    <WidgetCard title="Destaques" badge="extremos" loading={loading} error={error}>
      {stats && (
        <div className="extremos-grid">
          <div className="extremo-card info">
            <span className="extremo-card-label">Aluno Mais Novo</span>
            <span className="extremo-card-value">{stats.nomeAlunoMaisNovo ?? '-'}</span>
            <span className="extremo-card-sub">{stats.idadeMaisNovo ?? 0} anos</span>
          </div>
          <div className="extremo-card warning">
            <span className="extremo-card-label">Aluno Mais Velho</span>
            <span className="extremo-card-value">{stats.nomeAlunoMaisVelho ?? '-'}</span>
            <span className="extremo-card-sub">{stats.idadeMaisVelho ?? 0} anos</span>
          </div>
          {!curso && (
            <>
              <div className="extremo-card success">
                <span className="extremo-card-label">Maior Aprovação</span>
                <span className="extremo-card-value">{melhorCurso ?? '-'}</span>
                <span className="extremo-card-sub">
                  {data?.cursos?.find((c) => c.nome === melhorCurso)?.porcentagemAprovacao ?? 0}%
                </span>
              </div>
              <div className="extremo-card danger">
                <span className="extremo-card-label">Menor Aprovação</span>
                <span className="extremo-card-value">{piorCurso ?? '-'}</span>
                <span className="extremo-card-sub">
                  {data?.cursos?.find((c) => c.nome === piorCurso)?.porcentagemAprovacao ?? 0}%
                </span>
              </div>
            </>
          )}
          {curso && (
            <>
              <div className="extremo-card success">
                <span className="extremo-card-label">Aprovados</span>
                <span className="extremo-card-value">{stats.totalAlunosAprovados ?? 0}</span>
                <span className="extremo-card-sub">{stats.porcentagemAprovacao ?? 0}%</span>
              </div>
              <div className="extremo-card danger">
                <span className="extremo-card-label">Reprovados</span>
                <span className="extremo-card-value">{stats.totalAlunosReprovados ?? 0}</span>
                <span className="extremo-card-sub">{stats.porcentagemReprovacao ?? 0}%</span>
              </div>
            </>
          )}
        </div>
      )}
      {!stats && !loading && !error && (
        <div className="widget-empty">Sem dados para exibir</div>
      )}
    </WidgetCard>
  );
}
