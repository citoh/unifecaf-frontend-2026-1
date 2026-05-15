import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE } from '../../api';

export const fetchAprovacao = createAsyncThunk('aprovacao/fetch', async (curso) => {
  const url = new URL(`${API_BASE}/`);
  if (curso) url.searchParams.set('curso', curso);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Erro ao buscar aprovação');
  return res.json();
});

const aprovacaoSlice = createSlice({
  name: 'aprovacao',
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAprovacao.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAprovacao.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAprovacao.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default aprovacaoSlice.reducer;
