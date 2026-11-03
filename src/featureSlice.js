import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Tuzatildi: oldin "/api/dummyjson" Vite proksisi orqali so'ralardi. Proksi faqat "npm run dev"da ishlaydi,
// build qilingan saytda (preview yoki hosting) har doim xatolik chiqardi. DummyJSON to'g'ridan-to'g'ri
// so'rovlarga ruxsat beradi. limit=0 — barcha foydalanuvchilar (oldin faqat birinchi 30 tasi kelardi).
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://dummyjson.com/users?limit=0');
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
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      // Haqiqiy sababini ko'rsatamiz (oldin har doim bir xil umumiy matn chiqardi)
      state.error = action.error.message || 'Nimadir xatolik yuz berdi';
    });
  }
});

export default featureSlice.reducer;
