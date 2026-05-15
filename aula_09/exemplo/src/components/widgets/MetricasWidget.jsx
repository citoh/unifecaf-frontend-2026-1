import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { CHART_OPTIONS_BASE, CHART_SCALES } from '../../constants';
import WidgetCard from './WidgetCard';

export default function MetricasWidget() {
  const { data, loading, error } = useSelector((state) => state.metricas);
  const curso = useSelector((state) => state.filter.curso);

  const chartData = useMemo(() => {
    if (!data) return null;
    const cursos = data.cursos ?? [];

    if (curso) {
      const c = cursos.find((x) => x.nome === curso);
      if (!c) return null;
      return {
        labels: ['Média', 'Mediana'],
        datasets: [
          {
            label: curso,
            data: [c.mediaDeNotas, c.medianaDeNotas],
            backgroundColor: ['rgba(59,130,246,0.8)', 'rgba(34,197,94,0.8)'],
            borderColor: ['#3b82f6', '#22c55e'],
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      };
    }

    return {
      labels: cursos.map((c) => c.nome),
      datasets: [
        {
          label: 'Média',
          data: cursos.map((c) => c.mediaDeNotas),
          backgroundColor: 'rgba(59,130,246,0.7)',
          borderColor: '#3b82f6',
          borderWidth: 1,
          borderRadius: 4,
        },
        {
          label: 'Mediana',
          data: cursos.map((c) => c.medianaDeNotas),
          backgroundColor: 'rgba(34,197,94,0.7)',
          borderColor: '#22c55e',
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };
  }, [data, curso]);

  const options = {
    ...CHART_OPTIONS_BASE,
    ...CHART_SCALES,
    scales: {
      ...CHART_SCALES.scales,
      y: {
        ...CHART_SCALES.scales.y,
        min: 0,
        max: 10,
      },
    },
    plugins: {
      ...CHART_OPTIONS_BASE.plugins,
      legend: {
        ...CHART_OPTIONS_BASE.plugins.legend,
        position: 'top',
      },
    },
  };

  return (
    <WidgetCard title="Média vs Mediana" badge="por curso" loading={loading} error={error}>
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
