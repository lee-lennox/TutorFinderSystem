import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Loader2, AlertCircle, Save, Trash2, ArrowLeft } from 'lucide-react';
import { deleteUser, getUser, updateUser, type User } from '../api';

export function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = Number(id);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!userId) return;
    getUser(userId)
      .then(setUser)
      .catch(() => setError('Failed to load user.'))
      .finally(() => setLoading(false));
  }, [userId]);

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMsg('');
    setError('');
    try {
      const updated = await updateUser({ id: userId, username: user.username, email: user.email, password: user.password || undefined });
      setUser(updated);
      setMsg('User updated successfully.');
    } catch {
      setError('Failed to update user.');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!userId) return;
    if (!confirm('Delete this user?')) return;
    setDeleting(true);
    setError('');
    try {
      await deleteUser(userId);
      navigate('/users');
    } catch {
      setError('Failed to delete user.');
    } finally {
      setDeleting(false);
    }
  };

  if (!userId) {
    return <div className="p-8 text-sm" style={{ color: '#d4183d' }}>Invalid user id.</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-3" style={{ backgroundColor: '#F4F1BB' }}>
        <Loader2 size={22} className="animate-spin" style={{ color: '#002A22', opacity: 0.4 }} />
        <span className="text-sm" style={{ color: 'rgba(0,42,34,0.5)' }}>Loading user…</span>
      </div>
    );
  }

  if (!user) {
    return <div className="p-8 text-sm" style={{ color: '#d4183d' }}>User not found.</div>;
  }

  return (
    <div style={{ backgroundColor: '#F4F1BB', minHeight: '100vh' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/users" className="inline-flex items-center gap-2 text-sm mb-5" style={{ color: '#002A22' }}>
          <ArrowLeft size={14} /> Back to users
        </Link>

        <div className="rounded-2xl p-7" style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.09)' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#002A22', fontSize: '1.8rem', fontWeight: 700 }}>
            Edit User
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

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm"
                style={{ backgroundColor: '#002A22', color: '#EAF4D3', fontWeight: 600, opacity: saving ? 0.65 : 1 }}
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                Save Changes
              </button>

              <button
                type="button"
                onClick={onDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm"
                style={{ backgroundColor: 'rgba(212,24,61,0.12)', color: '#d4183d', fontWeight: 600, opacity: deleting ? 0.65 : 1 }}
              >
                {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Delete User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
