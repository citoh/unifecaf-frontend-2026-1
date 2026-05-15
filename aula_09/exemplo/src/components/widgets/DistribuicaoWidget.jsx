import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { CHART_OPTIONS_BASE, CHART_COLORS } from '../../constants';
import WidgetCard from './WidgetCard';

export default function DistribuicaoWidget() {
  const { data, loading, error } = useSelector((state) => state.distribuicao);
  const curso = useSelector((state) => state.filter.curso);

  const cursos = data?.cursos ?? [];

  const chartData = useMemo(() => {
    if (!cursos.length) return null;

    const bgColors = cursos.map((c, i) => {
      const base = CHART_COLORS[i % CHART_COLORS.length];
      return curso && c.nome === curso ? base : `${base}99`;
    });

    return {
      labels: cursos.map((c) => c.nome),
      datasets: [
        {
          data: cursos.map((c) => c.total),
          backgroundColor: bgColors,
          borderColor: '#1e293b',
          borderWidth: 2,
          hoverOffset: 6,
        },
      ],
    };
  }, [cursos, curso]);

  const options = {
    ...CHART_OPTIONS_BASE,
    plugins: {
      ...CHART_OPTIONS_BASE.plugins,
      legend: {
        ...CHART_OPTIONS_BASE.plugins.legend,
        position: 'bottom',
      },
    },
    cutout: '55%',
  };

  return (
    <WidgetCard title="Distribuição por Curso" badge="nº de alunos" loading={loading} error={error}>
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
