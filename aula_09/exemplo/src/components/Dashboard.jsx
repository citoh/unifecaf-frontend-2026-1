import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchResumo } from '../store/slices/resumoSlice';
import { fetchAprovacao } from '../store/slices/aprovacaoSlice';
import { fetchHistograma } from '../store/slices/histogramaSlice';
import { fetchIdade } from '../store/slices/idadeSlice';
import { fetchCursosAprovacao } from '../store/slices/cursosAprovacaoSlice';
import { fetchMetricas } from '../store/slices/metricasSlice';
import { fetchDistribuicao } from '../store/slices/distribuicaoSlice';
import { fetchExtremos } from '../store/slices/extremosSlice';
import { fetchAlunos } from '../store/slices/alunosSlice';

import GlobalFilter from './GlobalFilter';
import ResumoWidget from './widgets/ResumoWidget';
import AprovacaoWidget from './widgets/AprovacaoWidget';
import HistogramaWidget from './widgets/HistogramaWidget';
import IdadeWidget from './widgets/IdadeWidget';
import CursosAprovacaoWidget from './widgets/CursosAprovacaoWidget';
import MetricasWidget from './widgets/MetricasWidget';
import DistribuicaoWidget from './widgets/DistribuicaoWidget';
import ExtremosWidget from './widgets/ExtremosWidget';
import AlunosWidget from './widgets/AlunosWidget';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { curso } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchResumo(curso));
    dispatch(fetchAprovacao(curso));
    dispatch(fetchHistograma(curso));
    dispatch(fetchIdade(curso));
    dispatch(fetchCursosAprovacao(curso));
    dispatch(fetchMetricas(curso));
    dispatch(fetchDistribuicao(curso));
    dispatch(fetchExtremos(curso));
    dispatch(fetchAlunos(curso));
  }, [curso, dispatch]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard de Alunos</h1>
          <p className="dashboard-subtitle">Estatísticas acadêmicas em tempo real</p>
        </div>
        <GlobalFilter />
      </header>

      <main className="widgets-grid">
        <ResumoWidget />
        <AprovacaoWidget />
        <IdadeWidget />

        <CursosAprovacaoWidget />
        <DistribuicaoWidget />
        <MetricasWidget />

        <HistogramaWidget className="widget-span-2" />
        <ExtremosWidget />

        <AlunosWidget className="widget-span-3" />
      </main>
    </div>
  );
}
