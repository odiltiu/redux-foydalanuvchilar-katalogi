import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './featureSlice.js';

function App() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.users);
  const [query, setQuery] = useState('');

  // Ism, familiya, username yoki shahar bo'yicha qidiruv
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((u) =>
      [u.firstName, u.lastName, u.username, u.address?.city]
        .some((field) => String(field || '').toLowerCase().includes(q))
    );
  }, [data, query]);

  const GENDER = { male: 'Erkak', female: 'Ayol' };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">Foydalanuvchilar</h1>

        {isLoading && <p role="status">Ma’lumotlar yuklanmoqda...</p>}

        {error && (
          <div role="alert" className="rounded-lg bg-red-100 p-4 text-red-700">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => dispatch(fetchUsers())}
              disabled={isLoading}
              className="mt-3 cursor-pointer rounded bg-red-700 px-4 py-2 text-white disabled:opacity-50"
            >
              Qayta urinish
            </button>
          </div>
        )}

        {!isLoading && !error && data.length === 0 && (
          <p>Foydalanuvchilar topilmadi.</p>
        )}

        {!isLoading && !error && (
          <section aria-label="Foydalanuvchilar">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-slate-600" aria-live="polite">
                {query ? `Topildi: ${filtered.length} / ${data.length}` : `Jami foydalanuvchilar: ${data.length}`}
              </p>
              <label className="sr-only" htmlFor="user-search">Foydalanuvchi qidirish</label>
              <input
                id="user-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ism, username yoki shahar..."
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-slate-500 sm:w-80"
              />
            </div>
            {filtered.length === 0 && <p className="text-slate-600">Hech kim topilmadi.</p>}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((user) => (
                <article key={user.id} className="rounded-xl bg-white p-5 shadow">
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    loading="lazy"
                    className="mb-4 h-48 w-full rounded-lg object-contain"
                  />
                  <h2 className="text-xl font-semibold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="mt-1 text-slate-500">@{user.username}</p>
                  <div className="mt-4 space-y-2 text-slate-600">
                    <p className="break-words">Email: <a className="text-slate-800 underline-offset-2 hover:underline" href={`mailto:${user.email}`}>{user.email}</a></p>
                    <p>Telefon: {user.phone}</p>
                    <p>Yosh: {user.age} · Jinsi: {GENDER[user.gender] || user.gender}</p>
                    <p>Shahar: {user.address?.city || '—'}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
