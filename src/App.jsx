import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './featureSlice.js';

function App() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">Foydalanuvchilar</h1>

        {isLoading && <p role="status">Ma’lumotlar yuklanmoqda...</p>}

        {error && (
          <div role="alert" className="rounded-lg bg-red-100 p-4 text-red-700">
            <p>{error}</p>
            <button
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
            <p className="mb-4 text-slate-600">
              Jami foydalanuvchilar: {data.length}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((user) => (
                <article key={user.id} className="rounded-xl bg-white p-5 shadow">
                  <img
                    src={user.image.replace('https://dummyjson.com', '/api/dummyjson')}
                    alt={`${user.firstName} ${user.lastName}`}
                    loading="lazy"
                    className="mb-4 h-48 w-full rounded-lg object-contain"
                  />
                  <h2 className="text-xl font-semibold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="mt-1 text-slate-500">@{user.username}</p>
                  <div className="mt-4 space-y-2 text-slate-600">
                    <p>Email: {user.email}</p>
                    <p>Telefon: {user.phone}</p>
                    <p>Yosh: {user.age} · Jinsi: {user.gender}</p>
                    <p>Shahar: {user.address.city}</p>
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
