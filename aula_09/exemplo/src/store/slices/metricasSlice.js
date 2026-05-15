import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE } from '../../api';

export const fetchMetricas = createAsyncThunk('metricas/fetch', async (curso) => {
  const url = new URL(`${API_BASE}/`);
  if (curso) url.searchParams.set('curso', curso);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Erro ao buscar métricas');
  return res.json();
});

const metricasSlice = createSlice({
  name: 'metricas',
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetricas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMetricas.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMetricas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default metricasSlice.reducer;
