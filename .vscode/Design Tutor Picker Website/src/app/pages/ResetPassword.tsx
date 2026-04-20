import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { resetPassword } from '../api';

export function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await resetPassword({ email, code, newPassword });
      setMessage(res.message || 'Password reset successful. Redirecting to login…');
      setTimeout(() => navigate('/login'), 1400);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-16" style={{ backgroundColor: '#F4F1BB', minHeight: 'calc(100vh - 64px)' }}>
      <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.1)' }}>
        <div className="px-8 pt-10 pb-8" style={{ backgroundColor: '#002A22' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#EAF4D3', fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.2 }}>
            Reset Password
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'rgba(234,244,211,0.65)' }}>
            Enter your email, reset code, and new password.
          </p>
        </div>

        <div className="px-8 py-8">
          {error && <p className="mb-4 text-sm" style={{ color: '#d4183d' }}>{error}</p>}
          {message && <p className="mb-4 text-sm" style={{ color: '#002A22' }}>{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl text-sm"
                style={{ border: '1.5px solid rgba(0,42,34,0.2)', backgroundColor: '#fff', color: '#002A22' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Reset Code</label>
              <input
                value={code}
                onChange={e => setCode(e.target.value)}
                required
                placeholder="Enter code from email"
                className="w-full px-4 py-3 rounded-xl text-sm"
                style={{ border: '1.5px solid rgba(0,42,34,0.2)', backgroundColor: '#fff', color: '#002A22' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 rounded-xl text-sm"
                style={{ border: '1.5px solid rgba(0,42,34,0.2)', backgroundColor: '#fff', color: '#002A22' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm transition-all duration-200 disabled:opacity-60"
              style={{ backgroundColor: '#002A22', color: '#EAF4D3', fontWeight: 600 }}
            >
              {loading ? 'Resetting…' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 text-sm">
            <Link to="/login" style={{ color: '#002A22' }}>Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
