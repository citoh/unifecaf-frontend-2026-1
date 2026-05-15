import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE } from '../../api';

export const fetchCursosAprovacao = createAsyncThunk('cursosAprovacao/fetch', async (curso) => {
  const url = new URL(`${API_BASE}/`);
  if (curso) url.searchParams.set('curso', curso);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Erro ao buscar aprovação por curso');
  return res.json();
});

const cursosAprovacaoSlice = createSlice({
  name: 'cursosAprovacao',
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCursosAprovacao.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCursosAprovacao.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCursosAprovacao.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cursosAprovacaoSlice.reducer;
