import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Calendar, Trash2, Loader2, BookOpen, AlertCircle, LogIn } from 'lucide-react';
import { getMyBookings, deleteBooking, type Booking } from '../api';

export function MyBookings() {
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    if (!email) return;
    getMyBookings(email)
      .then(setBookings)
      .catch(() => setError('Failed to load bookings.'))
      .finally(() => setLoading(false));
  }, [email]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    setDeleting(id);
    try {
      await deleteBooking(id);
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch {
      setError('Failed to cancel booking. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString('en-ZA', {
        dateStyle: 'long',
        timeStyle: 'short',
      });
    } catch {
      return iso;
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F4F1BB' }}>
        <div
          className="rounded-2xl p-10 text-center max-w-sm w-full shadow-xl"
          style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.1)' }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: '#002A22' }}
          >
            <LogIn size={26} style={{ color: '#EAF4D3' }} />
          </div>
          <h2
            className="mb-2"
            style={{ fontFamily: 'Playfair Display, serif', color: '#002A22', fontWeight: 700, fontSize: '1.4rem' }}
          >
            Sign In Required
          </h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(0,42,34,0.6)' }}>
            Please sign in to view your bookings.
          </p>
          <Link
            to="/login"
            className="block py-3 rounded-xl text-sm transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#002A22', color: '#EAF4D3', fontWeight: 600 }}
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F4F1BB', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#002A22' }} className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-widest mb-2" style={{ color: 'rgba(234,244,211,0.55)', fontWeight: 600 }}>
            My Account
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#EAF4D3', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            My Bookings
          </h1>
          <p className="mt-3" style={{ color: 'rgba(234,244,211,0.65)' }}>
            Viewing sessions for <strong style={{ color: '#F4F1BB' }}>{email}</strong>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 size={32} className="animate-spin" style={{ color: '#002A22', opacity: 0.4 }} />
            <p className="text-sm" style={{ color: 'rgba(0,42,34,0.5)' }}>Loading your bookings…</p>
          </div>
        )}

        {error && (
          <div
            className="flex items-center gap-3 px-5 py-4 rounded-xl mb-6 text-sm"
            style={{ backgroundColor: 'rgba(212,24,61,0.08)', color: '#d4183d', border: '1px solid rgba(212,24,61,0.2)' }}
          >
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {!loading && bookings.length === 0 && !error && (
          <div className="text-center py-24">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: '#002A22' }}
            >
              <BookOpen size={32} style={{ color: '#EAF4D3' }} />
            </div>
            <h3
              className="mb-2"
              style={{ fontFamily: 'Playfair Display, serif', color: '#002A22', fontWeight: 700, fontSize: '1.3rem' }}
            >
              No Bookings Yet
            </h3>
            <p className="text-sm mb-6" style={{ color: 'rgba(0,42,34,0.55)' }}>
              You haven't booked any tutoring sessions. Find a tutor and get started!
            </p>
            <Link
              to="/tutors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm"
              style={{ backgroundColor: '#002A22', color: '#EAF4D3', fontWeight: 600 }}
            >
              Find a Tutor
            </Link>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm mb-6" style={{ color: 'rgba(0,42,34,0.5)' }}>
              {bookings.length} booking{bookings.length !== 1 ? 's' : ''} found
            </p>
            {bookings.map(b => (
              <div
                key={b.id}
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.09)', boxShadow: '0 2px 12px rgba(0,42,34,0.05)' }}
              >
                <div className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: '#002A22' }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'rgba(234,244,211,0.15)' }}
                    >
                      <Calendar size={16} style={{ color: '#EAF4D3' }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#EAF4D3' }}>
                        Session with {b.tutorName}
                      </p>
                      <p className="text-xs" style={{ color: 'rgba(234,244,211,0.55)' }}>
                        Booking #{b.id}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(b.id)}
                    disabled={deleting === b.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 hover:opacity-80 disabled:opacity-40"
                    style={{ backgroundColor: 'rgba(212,24,61,0.2)', color: '#ff8888' }}
                  >
                    {deleting === b.id ? (
                      <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 size={13} />
                    )}
                    Cancel
                  </button>
                </div>

                <div className="px-6 py-5 grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
                  {[
                    { label: 'Student', value: `${b.firstName} ${b.lastName}` },
                    { label: 'Email', value: b.email },
                    { label: 'Year of Study', value: b.yearOfStudy },
                    { label: 'Level', value: b.level },
                    { label: 'Campus', value: b.campus },
                    { label: 'Date & Time', value: formatDate(b.bookingDate) },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(0,42,34,0.4)' }}>
                        {label}
                      </p>
                      <p className="text-sm" style={{ color: '#002A22' }}>{value || '—'}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
