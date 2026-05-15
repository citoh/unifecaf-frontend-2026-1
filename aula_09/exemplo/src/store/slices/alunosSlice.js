import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE } from '../../api';

export const fetchAlunos = createAsyncThunk('alunos/fetch', async (curso) => {
  const url = new URL(`${API_BASE}/alunos`);
  if (curso) url.searchParams.set('curso', curso);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Erro ao buscar lista de alunos');
  return res.json();
});

const alunosSlice = createSlice({
  name: 'alunos',
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlunos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlunos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAlunos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default alunosSlice.reducer;
