import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE } from '../../api';

export const fetchExtremos = createAsyncThunk('extremos/fetch', async (curso) => {
  const url = new URL(`${API_BASE}/`);
  if (curso) url.searchParams.set('curso', curso);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Erro ao buscar extremos');
  return res.json();
});

const extremosSlice = createSlice({
  name: 'extremos',
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExtremos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExtremos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchExtremos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default extremosSlice.reducer;
