import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: { curso: '' },
  reducers: {
    setCurso: (state, action) => {
      state.curso = action.payload;
    },
  },
});

export const { setCurso } = filterSlice.actions;
export default filterSlice.reducer;
