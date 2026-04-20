import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import { login } from '../api';
import { getTutorApplicationByEmail } from '../tutorApplications';

export function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);
    try {
      const loginIdentifier = identifier.trim();
      const res = await login({ identifier: loginIdentifier, password });
      const email = 'email' in res ? res.email : undefined;
      const role = 'role' in res ? res.role : undefined;

      if (email) {
        localStorage.setItem('userEmail', email);
        if (role) localStorage.setItem('userRole', role);

        // Local tutor application flow: pending tutors wait for admin approval.
        if ((role || '').toLowerCase() !== 'admin') {
          const app = getTutorApplicationByEmail(email);
          if (app?.status === 'pending') {
            localStorage.setItem('userRole', 'tutor-pending');
          } else if (app?.status === 'approved') {
            localStorage.setItem('userRole', 'tutor');
          } else if (!role) {
            localStorage.setItem('userRole', 'student');
          }
        }

        navigate('/');
      } else {
        const message = (res.message || '').trim();
        if (!message) {
          setError('Wrong email/username or password.');
        } else {
          const lower = message.toLowerCase();
          if (
            lower.includes('invalid') ||
            lower.includes('bad credentials') ||
            lower.includes('wrong') ||
            lower.includes('unauthorized')
          ) {
            setError('Wrong email/username or password.');
          } else {
            setError(message);
          }
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        const message = err.message || '';
        const lower = message.toLowerCase();
        if (
          lower.includes('401') ||
          lower.includes('unauthorized') ||
          lower.includes('invalid') ||
          lower.includes('bad credentials') ||
          lower.includes('wrong') ||
          lower.includes('400 bad request')
        ) {
          setError('Wrong email/username or password.');
        } else {
          setError(message);
        }
      } else {
        setError('Unable to connect to the server. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1.5px solid rgba(0,42,34,0.2)',
    backgroundColor: '#fff',
    color: '#002A22',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.95rem',
    transition: 'border-color 0.2s',
  };

  return (
    <div
      className="flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: '#F4F1BB', minHeight: 'calc(100vh - 64px)' }}
    >
      {error && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4" role="alertdialog" aria-modal="true" aria-live="assertive">
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 42, 34, 0.35)', backdropFilter: 'blur(2px)' }} />
          <div
            className="relative w-full max-w-md rounded-2xl p-5 shadow-2xl"
            style={{ backgroundColor: '#fff', border: '1px solid rgba(212,24,61,0.25)' }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full p-2" style={{ backgroundColor: 'rgba(212,24,61,0.12)' }}>
                <AlertCircle size={18} style={{ color: '#d4183d' }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: '#8f1028' }}>Login failed</p>
                <p className="mt-1 text-sm" style={{ color: '#3d4a46' }}>{error}</p>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setError('')}
                className="rounded-full px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#0F5132', color: '#F4F1BB' }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,560px)] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm"
          style={{ backgroundColor: '#fff', color: '#d4183d', border: '1px solid rgba(212,24,61,0.3)' }}
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}
      <div className="w-full max-w-md">
        {/* Card */}
        <div
          className="rounded-2xl shadow-2xl overflow-hidden"
          style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.1)' }}
        >
          {/* Header band */}
          <div className="px-8 pt-10 pb-8" style={{ backgroundColor: '#002A22' }}>
            <div className="flex items-center gap-2 mb-6">
              <span style={{ fontFamily: 'Playfair Display, serif', color: '#EAF4D3', fontWeight: 700, fontSize: '1.1rem' }}>
                Tutor Finder
              </span>
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#EAF4D3', fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.2 }}>
              Welcome back
            </h1>
            <p className="mt-2 text-sm" style={{ color: 'rgba(234,244,211,0.65)' }}>
              Sign in to access your bookings and tutors.
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            {error && (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6 text-sm"
                style={{ backgroundColor: 'rgba(212,24,61,0.08)', color: '#d4183d', border: '1px solid rgba(212,24,61,0.2)' }}
                role="alert"
                aria-live="assertive"
              >
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>
                  Email or Username
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  required
                  placeholder="Enter your email or username"
                  style={inputStyle}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#002A22'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,42,34,0.2)'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    style={{ ...inputStyle, paddingRight: '48px' }}
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#002A22'}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,42,34,0.2)'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'rgba(0,42,34,0.4)' }}
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-all duration-200 hover:opacity-90 hover:shadow-lg disabled:opacity-60"
                style={{ backgroundColor: '#002A22', color: '#EAF4D3', fontWeight: 600 }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  <>Sign In <ArrowRight size={15} /></>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm" style={{ color: 'rgba(0,42,34,0.6)' }}>
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold transition-opacity hover:opacity-70" style={{ color: '#002A22' }}>
                Create one
              </Link>
            </p>

            <p className="mt-3 text-center text-sm" style={{ color: 'rgba(0,42,34,0.6)' }}>
              Forgot your password?{' '}
              <Link to="/forgot-password" className="font-semibold transition-opacity hover:opacity-70" style={{ color: '#002A22' }}>
                Reset it
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}