import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import WidgetCard from './WidgetCard';

export default function ResumoWidget() {
  const { data, loading, error } = useSelector((state) => state.resumo);
  const curso = useSelector((state) => state.filter.curso);

  const stats = useMemo(() => {
    if (!data) return null;
    if (curso) return data.cursos?.find((c) => c.nome === curso) ?? null;
    return data;
  }, [data, curso]);

  return (
    <WidgetCard title="Resumo Geral" badge="KPIs" loading={loading} error={error}>
      {stats && (
        <div className="kpi-grid">
          <div className="kpi-card">
            <span className="kpi-label">Total de Alunos</span>
            <span className="kpi-value blue">{stats.total ?? 0}</span>
            <span className="kpi-sub">matriculados</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Aprovados</span>
            <span className="kpi-value green">{stats.totalAlunosAprovados ?? 0}</span>
            <span className="kpi-sub">{stats.porcentagemAprovacao ?? 0}% do total</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Reprovados</span>
            <span className="kpi-value red">{stats.totalAlunosReprovados ?? 0}</span>
            <span className="kpi-sub">{stats.porcentagemReprovacao ?? 0}% do total</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Média de Notas</span>
            <span className="kpi-value amber">{stats.mediaDeNotas ?? 0}</span>
            <span className="kpi-sub">pontos</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Mediana</span>
            <span className="kpi-value purple">{stats.medianaDeNotas ?? 0}</span>
            <span className="kpi-sub">pontos</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Idade Média</span>
            <span className="kpi-value">{stats.idadeMedia ?? 0}</span>
            <span className="kpi-sub">anos</span>
          </div>
        </div>
      )}
      {!stats && !loading && !error && (
        <div className="widget-empty">Sem dados para exibir</div>
      )}
    </WidgetCard>
  );
}
