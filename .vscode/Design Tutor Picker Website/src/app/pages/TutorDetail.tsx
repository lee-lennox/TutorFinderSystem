import { useEffect, useState, FormEvent } from 'react';
import { useParams, Link } from 'react-router';
import {
  ArrowLeft, MapPin, Clock, BookOpen, CheckCircle, AlertCircle, Loader2, Calendar,
} from 'lucide-react';
import { getTutor, createBooking, type Tutor, type BookingPayload } from '../api';

const EMPTY_FORM: BookingPayload = {
  firstName: '',
  lastName: '',
  email: '',
  yearOfStudy: '',
  campus: '',
  level: '',
  bookingDate: '',
  tutorName: '',
  tutorId: 0,
};

export function TutorDetail() {
  const { id } = useParams<{ id: string }>();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState<BookingPayload>(EMPTY_FORM);
  const [booking, setBooking] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [bookingMsg, setBookingMsg] = useState('');

  useEffect(() => {
    if (!id) return;
    getTutor(Number(id))
      .then(t => {
        setTutor(t);
        setForm(f => ({ ...f, tutorName: t.name, tutorId: t.id }));
        const saved = localStorage.getItem('userEmail');
        if (saved) setForm(f => ({ ...f, email: saved }));
      })
      .catch(() => setError('Failed to load tutor details.'))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (key: keyof BookingPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const formatBookingDateForApi = (value: string) => {
    // datetime-local returns YYYY-MM-DDTHH:mm; backend commonly expects LocalDateTime shape.
    if (!value) return '';
    return value.length === 16 ? `${value}:00` : value;
  };

  const handleBook = async (e: FormEvent) => {
    e.preventDefault();
    setBooking('loading');
    setBookingMsg('');

    const resolvedTutorId = form.tutorId || tutor?.id || Number(id);

    const payload: BookingPayload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      yearOfStudy: form.yearOfStudy.trim(),
      campus: form.campus.trim(),
      level: form.level.trim(),
      bookingDate: formatBookingDateForApi(form.bookingDate),
      tutorName: form.tutorName.trim(),
      tutorId: resolvedTutorId,
    };

    if (!payload.bookingDate) {
      setBooking('error');
      setBookingMsg('Please choose a valid booking date and time.');
      return;
    }

    if (!payload.tutorId || Number.isNaN(payload.tutorId)) {
      setBooking('error');
      setBookingMsg('Unable to create booking: missing tutor ID. Please refresh and try again.');
      return;
    }

    try {
      await createBooking(payload);
      setBooking('success');
      setBookingMsg('Booking confirmed! You will receive further details via email.');
      setForm(f => ({ ...EMPTY_FORM, tutorName: f.tutorName, tutorId: f.tutorId, email: f.email }));
    } catch (err) {
      setBooking('error');
      if (err instanceof Error) {
        const lower = err.message.toLowerCase();
        if (lower.includes('400') || lower.includes('bad request')) {
          setBookingMsg(`Booking failed: ${err.message}`);
        } else {
          setBookingMsg(err.message || 'Booking failed. Please try again or contact support.');
        }
      } else {
        setBookingMsg('Booking failed. Please try again or contact support.');
      }
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '10px',
    border: '1.5px solid rgba(0,42,34,0.18)',
    backgroundColor: '#fff',
    color: '#002A22',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    transition: 'border-color 0.2s',
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F4F1BB' }}>
        <Loader2 size={32} className="animate-spin" style={{ color: '#002A22', opacity: 0.4 }} />
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F4F1BB' }}>
        <div className="text-center">
          <p className="mb-4" style={{ color: '#d4183d' }}>{error || 'Tutor not found.'}</p>
          <Link to="/tutors" className="text-sm underline" style={{ color: '#002A22' }}>Back to tutors</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F4F1BB', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative" style={{ backgroundColor: '#002A22', minHeight: '340px', display: 'flex', alignItems: 'flex-end' }}>
        {tutor.imageUrl && (
          <>
            <img
              src={tutor.imageUrl}
              alt={tutor.name}
              className="absolute inset-0 w-full h-full object-cover object-top"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,42,34,0.97) 0%, rgba(0,42,34,0.5) 100%)' }} />
          </>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <Link
            to="/tutors"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-70"
            style={{ color: 'rgba(234,244,211,0.7)' }}
          >
            <ArrowLeft size={16} /> Back to Tutors
          </Link>

          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              color: '#EAF4D3',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {tutor.name}
          </h1>
          <p className="mt-2 text-lg" style={{ color: 'rgba(234,244,211,0.7)' }}>{tutor.specialization}</p>

          <div className="flex flex-wrap gap-4 mt-4">
            {tutor.location && (
              <span className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(234,244,211,0.65)' }}>
                <MapPin size={14} /> {tutor.location}
              </span>
            )}
            {tutor.availableTime && (
              <span className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(234,244,211,0.65)' }}>
                <Clock size={14} /> Available: {tutor.availableTime}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — Info */}
          <div className="lg:col-span-2 space-y-6">
            <div
              className="rounded-2xl p-7"
              style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.09)' }}
            >
              <h2
                className="mb-4"
                style={{ fontFamily: 'Playfair Display, serif', color: '#002A22', fontWeight: 700, fontSize: '1.15rem' }}
              >
                About {tutor.name}
              </h2>
              <p style={{ color: 'rgba(0,42,34,0.7)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                {tutor.description || 'No bio provided.'}
              </p>
            </div>

            <div
              className="rounded-2xl p-7"
              style={{ backgroundColor: '#002A22', border: '1px solid rgba(0,42,34,0.1)' }}
            >
              <h3
                className="mb-5"
                style={{ fontFamily: 'Playfair Display, serif', color: '#EAF4D3', fontWeight: 700, fontSize: '1.05rem' }}
              >
                Tutor Details
              </h3>
              <dl className="space-y-4">
                {[
                  { label: 'Specialization', value: tutor.specialization },
                  { label: 'Location', value: tutor.location },
                  { label: 'Available', value: tutor.availableTime },
                  {
                    label: 'Course',
                    value: (tutor.course as any)?.name || (tutor.course as any)?.code || '—',
                  },
                ].map(({ label, value }) => value && (
                  <div key={label}>
                    <dt className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(234,244,211,0.45)' }}>{label}</dt>
                    <dd className="text-sm" style={{ color: '#EAF4D3' }}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right — Booking Form */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.09)', boxShadow: '0 4px 30px rgba(0,42,34,0.08)' }}
            >
              <div className="px-8 py-6" style={{ backgroundColor: '#002A22' }}>
                <div className="flex items-center gap-2">
                  <Calendar size={18} style={{ color: '#EAF4D3' }} />
                  <h2
                    style={{ fontFamily: 'Playfair Display, serif', color: '#EAF4D3', fontWeight: 700, fontSize: '1.2rem' }}
                  >
                    Book a Session with {tutor.name}
                  </h2>
                </div>
              </div>

              <div className="p-8">
                {booking === 'success' ? (
                  <div className="text-center py-10">
                    <CheckCircle size={48} className="mx-auto mb-4" style={{ color: '#002A22' }} />
                    <h3
                      className="mb-2"
                      style={{ fontFamily: 'Playfair Display, serif', color: '#002A22', fontWeight: 700, fontSize: '1.2rem' }}
                    >
                      Booking Confirmed!
                    </h3>
                    <p className="text-sm" style={{ color: 'rgba(0,42,34,0.65)' }}>{bookingMsg}</p>
                    <button
                      onClick={() => setBooking('idle')}
                      className="mt-6 px-6 py-3 rounded-xl text-sm transition-opacity hover:opacity-80"
                      style={{ backgroundColor: '#002A22', color: '#EAF4D3', fontWeight: 600 }}
                    >
                      Book Another Session
                    </button>
                  </div>
                ) : (
                  <>
                    {booking === 'error' && (
                      <div
                        className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6 text-sm"
                        style={{ backgroundColor: 'rgba(212,24,61,0.08)', color: '#d4183d', border: '1px solid rgba(212,24,61,0.2)' }}
                      >
                        <AlertCircle size={16} className="shrink-0" />
                        {bookingMsg}
                      </div>
                    )}

                    <form onSubmit={handleBook} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>First Name</label>
                          <input
                            type="text"
                            value={form.firstName}
                            onChange={set('firstName')}
                            required
                            placeholder="Jane"
                            style={inputStyle}
                            onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#002A22'}
                            onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,42,34,0.18)'}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Last Name</label>
                          <input
                            type="text"
                            value={form.lastName}
                            onChange={set('lastName')}
                            required
                            placeholder="Smith"
                            style={inputStyle}
                            onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#002A22'}
                            onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,42,34,0.18)'}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Email Address</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={set('email')}
                          required
                          placeholder="your@email.com"
                          style={inputStyle}
                          onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#002A22'}
                          onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,42,34,0.18)'}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Year of Study</label>
                          <select
                            value={form.yearOfStudy}
                            onChange={set('yearOfStudy')}
                            required
                            style={{ ...inputStyle, cursor: 'pointer' }}
                            onFocus={e => (e.target as HTMLSelectElement).style.borderColor = '#002A22'}
                            onBlur={e => (e.target as HTMLSelectElement).style.borderColor = 'rgba(0,42,34,0.18)'}
                          >
                            <option value="">Select year</option>
                            {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Honours', 'Masters', 'PhD'].map(y => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Level</label>
                          <select
                            value={form.level}
                            onChange={set('level')}
                            required
                            style={{ ...inputStyle, cursor: 'pointer' }}
                            onFocus={e => (e.target as HTMLSelectElement).style.borderColor = '#002A22'}
                            onBlur={e => (e.target as HTMLSelectElement).style.borderColor = 'rgba(0,42,34,0.18)'}
                          >
                            <option value="">Select level</option>
                            {['Undergraduate', 'Postgraduate', 'Professional'].map(l => (
                              <option key={l} value={l}>{l}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Campus</label>
                        <input
                          type="text"
                          value={form.campus}
                          onChange={set('campus')}
                          required
                          placeholder="e.g. Main Campus, Westville"
                          style={inputStyle}
                          onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#002A22'}
                          onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,42,34,0.18)'}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Preferred Date & Time</label>
                        <input
                          type="datetime-local"
                          value={form.bookingDate}
                          onChange={set('bookingDate')}
                          required
                          style={inputStyle}
                          onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#002A22'}
                          onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,42,34,0.18)'}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Tutor</label>
                        <input
                          type="text"
                          value={form.tutorName}
                          readOnly
                          style={{ ...inputStyle, backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={booking === 'loading'}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm transition-all duration-200 hover:opacity-90 hover:shadow-lg disabled:opacity-60"
                        style={{ backgroundColor: '#002A22', color: '#EAF4D3', fontWeight: 700 }}
                      >
                        {booking === 'loading' ? (
                          <>
                            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Confirming Booking…
                          </>
                        ) : (
                          <>
                            <BookOpen size={16} />
                            Confirm Booking
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
