import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE } from '../../api';

export const fetchDistribuicao = createAsyncThunk('distribuicao/fetch', async (curso) => {
  const url = new URL(`${API_BASE}/`);
  if (curso) url.searchParams.set('curso', curso);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Erro ao buscar distribuição por curso');
  return res.json();
});

const distribuicaoSlice = createSlice({
  name: 'distribuicao',
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistribuicao.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDistribuicao.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDistribuicao.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default distribuicaoSlice.reducer;
