import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { register } from '../api';
import { upsertTutorApplication } from '../tutorApplications';

const USERNAME_REGEX = /^[A-Za-z0-9]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{6,128}$/;

const USERNAME_MESSAGE = 'Username can only contain letters and numbers (no special characters).';
const EMAIL_MESSAGE = 'Email must include @ and be valid (e.g. name@example.com).';
const PASSWORD_MESSAGE =
  'Password must be 6-128 characters and include at least one number and one special character.';

const LOWERCASE = 'abcdefghjkmnpqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHJKMNPQRSTUVWXYZ';
const NUMBERS = '23456789';
const SPECIALS = '!@#$%^&*';
const ALL_PASSWORD_CHARS = `${LOWERCASE}${UPPERCASE}${NUMBERS}${SPECIALS}`;

const pickRandomChar = (source: string) => source[Math.floor(Math.random() * source.length)];

const generateStrongPassword = (length = 12) => {
  const chars = [
    pickRandomChar(LOWERCASE),
    pickRandomChar(UPPERCASE),
    pickRandomChar(NUMBERS),
    pickRandomChar(SPECIALS),
  ];

  while (chars.length < length) {
    chars.push(pickRandomChar(ALL_PASSWORD_CHARS));
  }

  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join('');
};

const generatePasswordSuggestions = (count = 3) =>
  Array.from({ length: count }, () => generateStrongPassword(12));

export function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [accountType, setAccountType] = useState<'student' | 'tutor'>('student');
  const [specialization, setSpecialization] = useState('');
  const [notes, setNotes] = useState('');
  const [passwordSuggestions, setPasswordSuggestions] = useState<string[]>(() => generatePasswordSuggestions());
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError('');

    const username = form.username.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;
    const confirm = form.confirm;

    if (!USERNAME_REGEX.test(username)) {
      setError(USERNAME_MESSAGE);
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError(EMAIL_MESSAGE);
      return;
    }

    if (accountType === 'tutor' && !specialization.trim()) {
      setError('Please add your specialization to request tutor access.');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (!PASSWORD_REGEX.test(password)) {
      setError(PASSWORD_MESSAGE);
      return;
    }
    setLoading(true);
    try {
      const res = await register({ username, email, password });
      const hasEmail = 'email' in res && Boolean(res.email);
      const isSuccess = 'success' in res ? res.success : hasEmail;

      if (isSuccess) {
        if (accountType === 'tutor') {
          upsertTutorApplication({
            username,
            email,
            specialization: specialization.trim(),
            notes: notes.trim(),
            status: 'pending',
            submittedAt: new Date().toISOString(),
          });
          setSuccess('Tutor registration submitted. Please wait for admin approval before tutor access is enabled. Redirecting…');
          setTimeout(() => navigate('/login'), 1800);
          return;
        }

        setSuccess((res.message || 'Account created successfully!') + ' Redirecting…');

        if (hasEmail) {
          localStorage.setItem('userEmail', res.email as string);
          if ('role' in res && res.role) localStorage.setItem('userRole', res.role);
          setTimeout(() => navigate('/'), 1500);
        } else {
          setTimeout(() => navigate('/login'), 1500);
        }
      } else {
        setError(res.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      if (err instanceof Error) {
        const message = err.message || '';
        const lower = message.toLowerCase();

        if (lower.includes('email already')) {
          setError('Email already exists. Please use another email or log in.');
        } else if (lower.includes('username already')) {
          setError('Username already exists. Please choose another username.');
        } else if (lower.includes('password') && (lower.includes('special') || lower.includes('number'))) {
          setError(PASSWORD_MESSAGE);
        } else if (
          lower === 'http 400' ||
          lower === '400 bad request' ||
          lower.includes('bad request')
        ) {
          setError('Registration failed. Check username, email, and password requirements.');
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
      {(error || success) && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4" role="alertdialog" aria-modal="true" aria-live="assertive">
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 42, 34, 0.35)', backdropFilter: 'blur(2px)' }} />
          <div
            className="relative w-full max-w-md rounded-2xl p-5 shadow-2xl"
            style={{
              backgroundColor: '#fff',
              border: error
                ? '1px solid rgba(212,24,61,0.25)'
                : '1px solid rgba(0,42,34,0.25)',
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 rounded-full p-2"
                style={{ backgroundColor: error ? 'rgba(212,24,61,0.12)' : 'rgba(0,42,34,0.12)' }}
              >
                {error ? (
                  <AlertCircle size={18} style={{ color: '#d4183d' }} />
                ) : (
                  <CheckCircle size={18} style={{ color: '#0F5132' }} />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: error ? '#8f1028' : '#0F5132' }}>
                  {error ? 'Registration failed' : 'Registration successful'}
                </p>
                <p className="mt-1 text-sm" style={{ color: '#3d4a46' }}>{error || success}</p>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setSuccess('');
                }}
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
      {success && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,560px)] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm"
          style={{ backgroundColor: '#fff', color: '#002A22', border: '1px solid rgba(0,42,34,0.25)' }}
          role="status"
          aria-live="polite"
        >
          <CheckCircle size={16} className="shrink-0" />
          {success}
        </div>
      )}
      <div className="w-full max-w-md">
        <div
          className="rounded-2xl shadow-2xl overflow-hidden"
          style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.1)' }}
        >
          {/* Header */}
          <div className="px-8 pt-10 pb-8" style={{ backgroundColor: '#002A22' }}>
            <div className="flex items-center gap-2 mb-6">
              <span style={{ fontFamily: 'Playfair Display, serif', color: '#EAF4D3', fontWeight: 700, fontSize: '1.1rem' }}>
                Tutor Finder
              </span>
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#EAF4D3', fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.2 }}>
              Create your account
            </h1>
            <p className="mt-2 text-sm" style={{ color: 'rgba(234,244,211,0.65)' }}>
              Join thousands of students finding their perfect tutor.
            </p>
          </div>

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
            {success && (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6 text-sm"
                style={{ backgroundColor: 'rgba(0,42,34,0.08)', color: '#002A22', border: '1px solid rgba(0,42,34,0.2)' }}
                role="status"
                aria-live="polite"
              >
                <CheckCircle size={16} className="shrink-0" />
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Register As</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'student', label: 'Student' },
                    { value: 'tutor', label: 'Tutor' },
                  ].map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setAccountType(option.value as 'student' | 'tutor')}
                      className="px-4 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
                      style={{
                        backgroundColor: accountType === option.value ? '#002A22' : 'rgba(0,42,34,0.08)',
                        color: accountType === option.value ? '#EAF4D3' : '#002A22',
                        border: '1px solid rgba(0,42,34,0.16)',
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {accountType === 'tutor' && (
                  <p className="mt-2 text-xs" style={{ color: 'rgba(0,42,34,0.6)' }}>
                    Tutor accounts require admin approval before tutor access is granted.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Username</label>
                <input
                  type="text"
                  value={form.username}
                  onChange={set('username')}
                  required
                  placeholder="Choose a username"
                  style={inputStyle}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#002A22'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,42,34,0.2)'}
                />
                <p className="mt-2 text-xs" style={{ color: 'rgba(0,42,34,0.55)' }}>
                  Letters and numbers only.
                </p>
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
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,42,34,0.2)'}
                />
                <p className="mt-2 text-xs" style={{ color: 'rgba(0,42,34,0.55)' }}>
                  Must include @ (example: name@example.com).
                </p>
              </div>

              {accountType === 'tutor' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Specialization</label>
                    <input
                      type="text"
                      value={specialization}
                      onChange={e => setSpecialization(e.target.value)}
                      required={accountType === 'tutor'}
                      placeholder="e.g. Mathematics, Physics, Accounting"
                      style={inputStyle}
                      onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#002A22'}
                      onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,42,34,0.2)'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Short Bio (Optional)</label>
                    <textarea
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      rows={3}
                      placeholder="Briefly describe your tutoring experience"
                      className="w-full px-4 py-3 rounded-xl text-sm resize-none"
                      style={{
                        border: '1.5px solid rgba(0,42,34,0.2)',
                        backgroundColor: '#fff',
                        color: '#002A22',
                        outline: 'none',
                        fontFamily: 'Inter, sans-serif',
                      }}
                      onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = '#002A22'}
                      onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(0,42,34,0.2)'}
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Password</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={set('password')}
                    required
                    placeholder="At least 6 characters"
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
                <p className="mt-2 text-xs" style={{ color: 'rgba(0,42,34,0.55)' }}>
                  Use 6-128 characters with at least one number and one special character.
                </p>
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs" style={{ color: 'rgba(0,42,34,0.6)' }}>
                      Suggested strong passwords:
                    </p>
                    <button
                      type="button"
                      className="text-xs font-semibold transition-opacity hover:opacity-75"
                      style={{ color: '#002A22' }}
                      onClick={() => setPasswordSuggestions(generatePasswordSuggestions())}
                    >
                      New suggestions
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {passwordSuggestions.map((suggestion, idx) => (
                      <button
                        key={`${suggestion}-${idx}`}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, password: suggestion, confirm: suggestion }))}
                        className="px-3 py-1.5 rounded-full text-xs font-mono transition-opacity hover:opacity-80"
                        style={{ backgroundColor: 'rgba(0,42,34,0.08)', color: '#002A22', border: '1px solid rgba(0,42,34,0.15)' }}
                        title="Click to use this password"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Confirm Password</label>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.confirm}
                  onChange={set('confirm')}
                  required
                  placeholder="Repeat your password"
                  style={inputStyle}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#002A22'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,42,34,0.2)'}
                />
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
                    Creating account…
                  </span>
                ) : (
                  <>Create Account <ArrowRight size={15} /></>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm" style={{ color: 'rgba(0,42,34,0.6)' }}>
              Already have an account?{' '}
              <Link to="/login" className="font-semibold transition-opacity hover:opacity-70" style={{ color: '#002A22' }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}