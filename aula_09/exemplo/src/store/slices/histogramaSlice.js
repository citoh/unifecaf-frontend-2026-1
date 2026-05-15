import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE } from '../../api';

export const fetchHistograma = createAsyncThunk('histograma/fetch', async (curso) => {
  const url = new URL(`${API_BASE}/`);
  if (curso) url.searchParams.set('curso', curso);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Erro ao buscar histograma');
  return res.json();
});

const histogramaSlice = createSlice({
  name: 'histograma',
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistograma.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistograma.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHistograma.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default histogramaSlice.reducer;
