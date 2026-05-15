import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { CHART_OPTIONS_BASE } from '../../constants';
import WidgetCard from './WidgetCard';

export default function AprovacaoWidget() {
  const { data, loading, error } = useSelector((state) => state.aprovacao);
  const curso = useSelector((state) => state.filter.curso);

  const stats = useMemo(() => {
    if (!data) return null;
    if (curso) return data.cursos?.find((c) => c.nome === curso) ?? null;
    return data;
  }, [data, curso]);

  const chartData = useMemo(() => {
    if (!stats) return null;
    return {
      labels: ['Aprovados', 'Reprovados'],
      datasets: [
        {
          data: [stats.totalAlunosAprovados ?? 0, stats.totalAlunosReprovados ?? 0],
          backgroundColor: ['rgba(34,197,94,0.8)', 'rgba(239,68,68,0.8)'],
          borderColor: ['#16a34a', '#dc2626'],
          borderWidth: 1,
          hoverOffset: 6,
        },
      ],
    };
  }, [stats]);

  const options = {
    ...CHART_OPTIONS_BASE,
    plugins: {
      ...CHART_OPTIONS_BASE.plugins,
      legend: {
        ...CHART_OPTIONS_BASE.plugins.legend,
        position: 'bottom',
      },
    },
    cutout: '65%',
  };

  const badge = stats
    ? `${stats.porcentagemAprovacao ?? 0}% aprovação`
    : undefined;

  return (
    <WidgetCard title="Aprovação vs Reprovação" badge={badge} loading={loading} error={error}>
      {chartData && (
        <div className="chart-container">
          <Doughnut data={chartData} options={options} />
        </div>
      )}
      {!chartData && !loading && !error && (
        <div className="widget-empty">Sem dados para exibir</div>
      )}
    </WidgetCard>
  );
}
