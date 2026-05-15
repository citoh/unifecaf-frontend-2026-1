import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE } from '../../api';

export const fetchResumo = createAsyncThunk('resumo/fetch', async (curso) => {
  const url = new URL(`${API_BASE}/`);
  if (curso) url.searchParams.set('curso', curso);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Erro ao buscar resumo');
  return res.json();
});

const resumoSlice = createSlice({
  name: 'resumo',
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchResumo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default resumoSlice.reducer;
