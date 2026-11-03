# 👥 Redux Toolkit — Users Directory

Ushbu loyiha **Redux Toolkit** va **createAsyncThunk** yordamida asinxron ma'lumotlarni boshqarish (Async Data Fetching) amaliyoti sifatida yaratilgan. DummyJSON API orqali foydalanuvchilar ma'lumotlari tortib olinadi va ekranda kartalar ko'rinishida ko'rsatiladi.

## 🚀 Texnologiyalar

- **React 19**
- **Redux Toolkit (`createSlice`, `createAsyncThunk`)**
- **React-Redux**
- **Tailwind CSS v4**
- **Vite**

## 📦 Loyihaning tuzilishi

- `src/featureSlice.js` — Foydalanuvchilar uchun async thunk va Redux slice (loading, data, error holatlari).
- `src/store.js` — Redux configureStore sozlamasi.
- `src/App.jsx` — Asosiy komponent: loading, xatolikni qayta urinish va foydalanuvchilar kartalari.
- Qidiruv: ism, familiya, username yoki shahar bo'yicha.

## 💻 Ishga tushirish

```bash
# Kutubxonalarni o'rnatish
npm install

# Loyihani dev rejimida ishga tushirish
npm run dev

# Production uchun yig'ish (build)
npm run build
```

---
Dasturchi: [Odil Husayn](https://github.com/odiltiu)
