import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { CHART_OPTIONS_BASE, CHART_SCALES } from '../../constants';
import WidgetCard from './WidgetCard';

export default function HistogramaWidget({ className }) {
  const { data, loading, error } = useSelector((state) => state.histograma);
  const curso = useSelector((state) => state.filter.curso);

  const stats = useMemo(() => {
    if (!data) return null;
    if (curso) return data.cursos?.find((c) => c.nome === curso) ?? null;
    return data;
  }, [data, curso]);

  const chartData = useMemo(() => {
    if (!stats) return null;
    const histogram = stats.histogramPorcentagemNotasPorPontos ?? {};
    const keys = Object.keys(histogram).sort((a, b) => Number(a) - Number(b));
    return {
      labels: keys.map((k) => `Nota ${k}`),
      datasets: [
        {
          label: 'Qtd. de Alunos',
          data: keys.map((k) => histogram[k].quantidade),
          backgroundColor: 'rgba(59,130,246,0.7)',
          borderColor: '#3b82f6',
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };
  }, [stats]);

  const options = {
    ...CHART_OPTIONS_BASE,
    ...CHART_SCALES,
    plugins: {
      ...CHART_OPTIONS_BASE.plugins,
      legend: { display: false },
      tooltip: {
        ...CHART_OPTIONS_BASE.plugins.tooltip,
        callbacks: {
          afterLabel: (ctx) => {
            const histogram = stats?.histogramPorcentagemNotasPorPontos ?? {};
            const keys = Object.keys(histogram).sort((a, b) => Number(a) - Number(b));
            const key = keys[ctx.dataIndex];
            return key ? `${histogram[key].porcentagem}% do total` : '';
          },
        },
      },
    },
  };

  return (
    <WidgetCard title="Histograma de Notas" badge="por pontuação" loading={loading} error={error} className={className}>
      {chartData && (
        <div className="chart-container">
          <Bar data={chartData} options={options} />
        </div>
      )}
      {!chartData && !loading && !error && (
        <div className="widget-empty">Sem dados para exibir</div>
      )}
    </WidgetCard>
  );
}
