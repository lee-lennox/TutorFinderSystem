import { FormEvent, useState } from 'react';
import { Link } from 'react-router';
import { requestPasswordReset } from '../api';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await requestPasswordReset({ email });
      setMessage(res.message || 'If the email exists, a reset code has been sent.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to request reset code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-16" style={{ backgroundColor: '#F4F1BB', minHeight: 'calc(100vh - 64px)' }}>
      <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.1)' }}>
        <div className="px-8 pt-10 pb-8" style={{ backgroundColor: '#002A22' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#EAF4D3', fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.2 }}>
            Forgot Password
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'rgba(234,244,211,0.65)' }}>
            Enter your email to receive a reset code.
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm transition-all duration-200 disabled:opacity-60"
              style={{ backgroundColor: '#002A22', color: '#EAF4D3', fontWeight: 600 }}
            >
              {loading ? 'Sending code…' : 'Send Reset Code'}
            </button>
          </form>

          <div className="mt-6 text-sm flex justify-between">
            <Link to="/login" style={{ color: '#002A22' }}>Back to Login</Link>
            <Link to="/reset-password" style={{ color: '#002A22' }}>Have a code?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
