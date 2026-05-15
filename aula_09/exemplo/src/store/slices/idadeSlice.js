import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE } from '../../api';

export const fetchIdade = createAsyncThunk('idade/fetch', async (curso) => {
  const url = new URL(`${API_BASE}/`);
  if (curso) url.searchParams.set('curso', curso);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Erro ao buscar distribuição de idade');
  return res.json();
});

const idadeSlice = createSlice({
  name: 'idade',
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIdade.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchIdade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default idadeSlice.reducer;
