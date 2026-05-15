import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { CHART_OPTIONS_BASE, CHART_SCALES } from '../../constants';
import WidgetCard from './WidgetCard';

export default function CursosAprovacaoWidget() {
  const { data, loading, error } = useSelector((state) => state.cursosAprovacao);
  const curso = useSelector((state) => state.filter.curso);

  const cursos = data?.cursos ?? [];

  const chartData = useMemo(() => {
    if (!cursos.length) return null;
    return {
      labels: cursos.map((c) => c.nome),
      datasets: [
        {
          label: 'Taxa de Aprovação (%)',
          data: cursos.map((c) => c.porcentagemAprovacao),
          backgroundColor: cursos.map((c) =>
            curso && c.nome === curso ? 'rgba(245,158,11,0.8)' : 'rgba(59,130,246,0.7)'
          ),
          borderColor: cursos.map((c) =>
            curso && c.nome === curso ? '#f59e0b' : '#3b82f6'
          ),
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };
  }, [cursos, curso]);

  const options = {
    ...CHART_OPTIONS_BASE,
    indexAxis: 'y',
    scales: {
      x: {
        ...CHART_SCALES.scales.x,
        min: 0,
        max: 100,
        ticks: {
          ...CHART_SCALES.scales.x.ticks,
          callback: (v) => `${v}%`,
        },
      },
      y: { ...CHART_SCALES.scales.y },
    },
    plugins: {
      ...CHART_OPTIONS_BASE.plugins,
      legend: { display: false },
    },
  };

  return (
    <WidgetCard title="Aprovação por Curso" badge="horizontal" loading={loading} error={error}>
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
