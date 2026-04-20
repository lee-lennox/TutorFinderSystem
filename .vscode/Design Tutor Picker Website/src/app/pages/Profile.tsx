import { FormEvent, useEffect, useState } from 'react';
import { Loader2, AlertCircle, Save } from 'lucide-react';
import { getAllUsers, updateUser, type User } from '../api';

export function Profile() {
  const email = localStorage.getItem('userEmail');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    getAllUsers()
      .then(users => {
        const found = users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
        setUser(found);
      })
      .catch(() => setError('Failed to load profile.'))
      .finally(() => setLoading(false));
  }, [email]);

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setMsg('');
    setError('');

    try {
      const updated = await updateUser(user);
      setUser(updated);
      localStorage.setItem('userEmail', updated.email);
      setMsg('Profile updated successfully.');
    } catch {
      setError('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (!email) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm" style={{ color: '#d4183d' }}>Sign in to view your profile.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center gap-3">
        <Loader2 size={18} className="animate-spin" style={{ color: '#002A22', opacity: 0.45 }} />
        <span className="text-sm" style={{ color: 'rgba(0,42,34,0.6)' }}>Loading profile…</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm" style={{ color: '#d4183d' }}>Profile record not found for {email}.</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F4F1BB', minHeight: '100vh' }}>
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl p-7" style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.09)' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#002A22', fontWeight: 700, fontSize: '1.8rem' }}>
            Edit Profile
          </h1>

          {error && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl mt-5 text-sm" style={{ backgroundColor: 'rgba(212,24,61,0.08)', color: '#d4183d', border: '1px solid rgba(212,24,61,0.2)' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {msg && (
            <div className="px-4 py-3 rounded-xl mt-5 text-sm" style={{ backgroundColor: 'rgba(0,42,34,0.08)', color: '#002A22', border: '1px solid rgba(0,42,34,0.2)' }}>
              {msg}
            </div>
          )}

          <form className="mt-6 space-y-5" onSubmit={onSave}>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Username</label>
              <input
                value={user.username}
                onChange={e => setUser(prev => (prev ? { ...prev, username: e.target.value } : prev))}
                className="w-full px-4 py-3 rounded-xl text-sm"
                style={{ border: '1.5px solid rgba(0,42,34,0.18)', backgroundColor: '#fff', color: '#002A22' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Email</label>
              <input
                type="email"
                value={user.email}
                onChange={e => setUser(prev => (prev ? { ...prev, email: e.target.value } : prev))}
                className="w-full px-4 py-3 rounded-xl text-sm"
                style={{ border: '1.5px solid rgba(0,42,34,0.18)', backgroundColor: '#fff', color: '#002A22' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>New Password (optional)</label>
              <input
                type="password"
                value={user.password ?? ''}
                onChange={e => setUser(prev => (prev ? { ...prev, password: e.target.value } : prev))}
                className="w-full px-4 py-3 rounded-xl text-sm"
                style={{ border: '1.5px solid rgba(0,42,34,0.18)', backgroundColor: '#fff', color: '#002A22' }}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm"
              style={{ backgroundColor: '#002A22', color: '#EAF4D3', fontWeight: 600, opacity: saving ? 0.65 : 1 }}
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
