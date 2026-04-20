import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle, Loader2, Trash2 } from 'lucide-react';
import { deleteUser, getAllTutors, getAllUsers, updateTutor, type Tutor, type User } from '../api';
import {
  listTutorApplications,
  type TutorApplication,
  updateTutorApplicationStatus,
} from '../tutorApplications';

const APPROVALS_KEY = 'approvedTutorsForAds';

function loadLocalApprovals(): Record<number, boolean> {
  try {
    const raw = localStorage.getItem(APPROVALS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<number, boolean>;
  } catch {
    return {};
  }
}

export function Admin() {
  const role = (localStorage.getItem('userRole') || '').toLowerCase();
  const isAdmin = role === 'admin';

  const [users, setUsers] = useState<User[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [tutorApplications, setTutorApplications] = useState<TutorApplication[]>([]);
  const [approvals, setApprovals] = useState<Record<number, boolean>>(loadLocalApprovals);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [busyUserId, setBusyUserId] = useState<number | null>(null);
  const [busyTutorId, setBusyTutorId] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([getAllUsers(), getAllTutors()])
      .then(([usersRes, tutorsRes]) => {
        setUsers(usersRes);
        setTutors(tutorsRes);
        setTutorApplications(listTutorApplications());
      })
      .catch(() => setError('Failed to load admin data.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem(APPROVALS_KEY, JSON.stringify(approvals));
  }, [approvals]);

  const tutorApprovalState = useMemo(() => {
    return tutors.reduce<Record<number, boolean>>((acc, tutor) => {
      const fromApi = typeof tutor.approvedForAdvertising === 'boolean' ? tutor.approvedForAdvertising : undefined;
      acc[tutor.id] = fromApi ?? approvals[tutor.id] ?? false;
      return acc;
    }, {});
  }, [tutors, approvals]);

  const onDeleteUser = async (userId?: number) => {
    if (!userId) return;
    if (!confirm('Delete this user?')) return;

    setBusyUserId(userId);
    setError('');
    setMsg('');
    try {
      await deleteUser(userId);
      setUsers(prev => prev.filter(u => u.id !== userId));
      setMsg('User deleted successfully.');
    } catch {
      setError('Failed to delete user.');
    } finally {
      setBusyUserId(null);
    }
  };

  const onToggleTutorApproval = async (tutor: Tutor) => {
    const nextApproved = !tutorApprovalState[tutor.id];
    setBusyTutorId(tutor.id);
    setError('');
    setMsg('');

    // Always persist local approval state for advertising UI control.
    setApprovals(prev => ({ ...prev, [tutor.id]: nextApproved }));

    try {
      const updated = await updateTutor({ ...tutor, approvedForAdvertising: nextApproved });
      setTutors(prev => prev.map(t => (t.id === tutor.id ? updated : t)));
      setMsg(`Tutor ${nextApproved ? 'approved' : 'removed'} for advertising.`);
    } catch {
      // Keep local approval as a fallback if backend doesn't support this field yet.
      setMsg(`Tutor ${nextApproved ? 'approved' : 'removed'} locally for advertising.`);
    } finally {
      setBusyTutorId(null);
    }
  };

  const onReviewApplication = (email: string, status: 'approved' | 'rejected') => {
    setError('');
    setMsg('');

    const updated = updateTutorApplicationStatus(email, status);
    setTutorApplications(updated);
    setMsg(`Tutor application ${status}.`);
  };

  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm" style={{ color: '#d4183d' }}>Admin access required.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center gap-3">
        <Loader2 size={18} className="animate-spin" style={{ color: '#002A22', opacity: 0.45 }} />
        <span className="text-sm" style={{ color: 'rgba(0,42,34,0.6)' }}>Loading admin panel…</span>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F4F1BB', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#002A22', fontWeight: 700, fontSize: '2rem' }}>
          Admin Panel
        </h1>

        {error && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl mt-5 text-sm" style={{ backgroundColor: 'rgba(212,24,61,0.08)', color: '#d4183d', border: '1px solid rgba(212,24,61,0.2)' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {msg && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl mt-5 text-sm" style={{ backgroundColor: 'rgba(0,42,34,0.08)', color: '#002A22', border: '1px solid rgba(0,42,34,0.2)' }}>
            <CheckCircle size={16} /> {msg}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
          <section className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.09)' }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#002A22' }}>Users</h2>
            <div className="space-y-3 max-h-[560px] overflow-auto pr-1">
              {users.map(u => (
                <div key={u.id ?? `${u.username}-${u.email}`} className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: 'rgba(0,42,34,0.03)' }}>
                  <div className="min-w-0">
                    <p className="font-semibold truncate" style={{ color: '#002A22' }}>{u.username}</p>
                    <p className="text-sm truncate" style={{ color: 'rgba(0,42,34,0.6)' }}>{u.email}</p>
                  </div>
                  <button
                    onClick={() => onDeleteUser(u.id)}
                    disabled={!u.id || busyUserId === u.id}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                    style={{ backgroundColor: 'rgba(212,24,61,0.12)', color: '#d4183d', fontWeight: 600, opacity: busyUserId === u.id ? 0.65 : 1 }}
                  >
                    {busyUserId === u.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.09)' }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#002A22' }}>Tutor Advertising Approvals</h2>
            <div className="space-y-3 max-h-[560px] overflow-auto pr-1">
              {tutors.map(t => {
                const approved = tutorApprovalState[t.id];
                return (
                  <div key={t.id} className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: 'rgba(0,42,34,0.03)' }}>
                    <div className="min-w-0">
                      <p className="font-semibold truncate" style={{ color: '#002A22' }}>{t.name}</p>
                      <p className="text-sm truncate" style={{ color: 'rgba(0,42,34,0.6)' }}>{t.specialization}</p>
                    </div>
                    <button
                      onClick={() => onToggleTutorApproval(t)}
                      disabled={busyTutorId === t.id}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                      style={{
                        backgroundColor: approved ? 'rgba(0,42,34,0.14)' : 'rgba(0,42,34,0.08)',
                        color: '#002A22',
                        fontWeight: 700,
                        opacity: busyTutorId === t.id ? 0.65 : 1,
                      }}
                    >
                      {busyTutorId === t.id && <Loader2 size={12} className="animate-spin" />}
                      {approved ? 'Approved' : 'Approve'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <section className="rounded-2xl p-6 mt-8" style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.09)' }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#002A22' }}>Tutor Registration Requests</h2>

          {tutorApplications.length === 0 ? (
            <p className="text-sm" style={{ color: 'rgba(0,42,34,0.6)' }}>No tutor applications submitted yet.</p>
          ) : (
            <div className="space-y-3 max-h-[460px] overflow-auto pr-1">
              {tutorApplications
                .slice()
                .sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1))
                .map(app => (
                  <div key={`${app.email}-${app.submittedAt}`} className="px-4 py-3 rounded-xl" style={{ backgroundColor: 'rgba(0,42,34,0.03)' }}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-semibold truncate" style={{ color: '#002A22' }}>{app.username}</p>
                        <p className="text-sm truncate" style={{ color: 'rgba(0,42,34,0.6)' }}>{app.email}</p>
                        <p className="text-sm mt-1" style={{ color: 'rgba(0,42,34,0.75)' }}>
                          Specialization: {app.specialization || 'Not provided'}
                        </p>
                        {app.notes && (
                          <p className="text-xs mt-1" style={{ color: 'rgba(0,42,34,0.55)' }}>{app.notes}</p>
                        )}
                        <p className="text-xs mt-2" style={{ color: 'rgba(0,42,34,0.45)' }}>
                          Submitted: {new Date(app.submittedAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="shrink-0 flex flex-col items-end gap-2">
                        <span
                          className="px-2 py-1 rounded text-xs font-semibold"
                          style={{
                            backgroundColor:
                              app.status === 'approved'
                                ? 'rgba(0,42,34,0.12)'
                                : app.status === 'rejected'
                                  ? 'rgba(212,24,61,0.12)'
                                  : 'rgba(190,138,0,0.15)',
                            color:
                              app.status === 'approved'
                                ? '#0F5132'
                                : app.status === 'rejected'
                                  ? '#d4183d'
                                  : '#7a5a00',
                          }}
                        >
                          {app.status.toUpperCase()}
                        </span>

                        {app.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onReviewApplication(app.email, 'approved')}
                              className="px-3 py-2 rounded-lg text-xs font-semibold"
                              style={{ backgroundColor: 'rgba(0,42,34,0.12)', color: '#002A22' }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => onReviewApplication(app.email, 'rejected')}
                              className="px-3 py-2 rounded-lg text-xs font-semibold"
                              style={{ backgroundColor: 'rgba(212,24,61,0.12)', color: '#d4183d' }}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
