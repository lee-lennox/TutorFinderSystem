import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Loader2, AlertCircle, User } from 'lucide-react';
import { getAllUsers, type User as UserModel } from '../api';

export function UsersList() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch(() => setError('Failed to load users.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter(u => `${u.username} ${u.email}`.toLowerCase().includes(term));
  }, [users, search]);

  return (
    <div style={{ backgroundColor: '#F4F1BB', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#002A22' }} className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-widest mb-2" style={{ color: 'rgba(234,244,211,0.55)', fontWeight: 600 }}>
            Admin
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#EAF4D3', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Users
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by username or email"
            className="w-full px-4 py-3 rounded-xl text-sm"
            style={{ border: '1.5px solid rgba(0,42,34,0.18)', backgroundColor: '#fff', color: '#002A22' }}
          />
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 size={32} className="animate-spin" style={{ color: '#002A22', opacity: 0.4 }} />
            <p className="text-sm" style={{ color: 'rgba(0,42,34,0.5)' }}>Loading users…</p>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 px-5 py-4 rounded-xl mb-6 text-sm" style={{ backgroundColor: 'rgba(212,24,61,0.08)', color: '#d4183d', border: '1px solid rgba(212,24,61,0.2)' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-sm" style={{ color: 'rgba(0,42,34,0.55)' }}>No users found.</p>
        )}

        {!loading && filtered.length > 0 && (
          <div className="space-y-4">
            {filtered.map(u => (
              <Link
                key={u.id ?? `${u.username}-${u.email}`}
                to={u.id ? `/users/${u.id}` : '#'}
                className="block rounded-2xl p-5 transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.09)' }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold truncate" style={{ color: '#002A22' }}>{u.username}</p>
                    <p className="text-sm truncate" style={{ color: 'rgba(0,42,34,0.6)' }}>{u.email}</p>
                  </div>
                  <User size={16} style={{ color: 'rgba(0,42,34,0.35)' }} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
