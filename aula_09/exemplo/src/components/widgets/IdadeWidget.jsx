import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { CHART_OPTIONS_BASE, CHART_COLORS } from '../../constants';
import WidgetCard from './WidgetCard';

export default function IdadeWidget() {
  const { data, loading, error } = useSelector((state) => state.idade);
  const curso = useSelector((state) => state.filter.curso);

  const stats = useMemo(() => {
    if (!data) return null;
    if (curso) return data.cursos?.find((c) => c.nome === curso) ?? null;
    return data;
  }, [data, curso]);

  const chartData = useMemo(() => {
    if (!stats?.faixasDeIdade) return null;
    const faixas = stats.faixasDeIdade;
    return {
      labels: Object.keys(faixas).map((k) => `${k} anos`),
      datasets: [
        {
          data: Object.values(faixas),
          backgroundColor: CHART_COLORS.slice(0, 4).map((c) => `${c}cc`),
          borderColor: '#1e293b',
          borderWidth: 2,
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
  };

  return (
    <WidgetCard title="Faixas de Idade" badge="distribuição" loading={loading} error={error}>
      {chartData && (
        <div className="chart-container">
          <Pie data={chartData} options={options} />
        </div>
      )}
      {!chartData && !loading && !error && (
        <div className="widget-empty">Sem dados para exibir</div>
      )}
    </WidgetCard>
  );
}
