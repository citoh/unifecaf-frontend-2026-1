import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import resumoReducer from './slices/resumoSlice';
import aprovacaoReducer from './slices/aprovacaoSlice';
import histogramaReducer from './slices/histogramaSlice';
import idadeReducer from './slices/idadeSlice';
import cursosAprovacaoReducer from './slices/cursosAprovacaoSlice';
import metricasReducer from './slices/metricasSlice';
import distribuicaoReducer from './slices/distribuicaoSlice';
import extremosReducer from './slices/extremosSlice';
import alunosReducer from './slices/alunosSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    resumo: resumoReducer,
    aprovacao: aprovacaoReducer,
    histograma: histogramaReducer,
    idade: idadeReducer,
    cursosAprovacao: cursosAprovacaoReducer,
    metricas: metricasReducer,
    distribuicao: distribuicaoReducer,
    extremos: extremosReducer,
    alunos: alunosReducer,
  },
});
