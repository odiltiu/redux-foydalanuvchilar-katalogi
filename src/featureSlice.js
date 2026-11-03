import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('/api/dummyjson/users');
  if (!response.ok) {
    throw new Error('Foydalanuvchilarni yuklab bo‘lmadi');
  }

  const result = await response.json();
  return result.users;
});

const featureSlice = createSlice({
  name: 'users',
  initialState: { data: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.isLoading = false;
      state.error ='Nimadir xatolik yuz berdi';
    });
  }
});

export default featureSlice.reducer;
