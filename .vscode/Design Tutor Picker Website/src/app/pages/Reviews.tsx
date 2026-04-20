import { useEffect, useState, FormEvent } from 'react';
import { Star, MessageSquare, Send, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { getAllReviews, createReview, getAllTutors, type Review, type Tutor } from '../api';

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState({ name: '', email: '', tutorId: '', feedback: '', rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMsg, setSubmitMsg] = useState('');

  const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) setForm(f => ({ ...f, email: savedEmail }));

    getAllReviews()
      .then(data => setReviews(asArray<Review>(data).filter(Boolean)))
      .catch(() => setError('Failed to load reviews.'))
      .finally(() => setLoading(false));

    getAllTutors()
      .then(data => setTutors(asArray<Tutor>(data).filter(t => Boolean(t) && Number.isFinite((t as Tutor).id))))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const tutorId = Number(form.tutorId);
    const feedback = form.feedback.trim();
    const rating = Number(form.rating);

    if (!name || !email || !feedback || !tutorId) {
      setSubmitStatus('error');
      setSubmitMsg('Please provide name, email, tutor, and feedback.');
      return;
    }

    if (tutors.length > 0 && !tutors.some(t => t.id === tutorId)) {
      setSubmitStatus('error');
      setSubmitMsg('Please select a valid tutor.');
      return;
    }

    setSubmitting(true);
    setSubmitStatus('idle');
    try {
      const newReview = await createReview({ name, email, tutorId, feedback, rating });
      setReviews(prev => [newReview, ...prev]);
      setSubmitStatus('success');
      setSubmitMsg('Thank you for rating your tutor!');
      setForm(f => ({ ...f, name: '', tutorId: '', feedback: '', rating: 5 }));
    } catch (err) {
      setSubmitStatus('error');
      setSubmitMsg(err instanceof Error ? err.message : 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const colors = ['#002A22', '#1a4a3a', '#0f3a2b', '#003830', '#012e24'];

  return (
    <div style={{ backgroundColor: '#F4F1BB', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#002A22' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-widest mb-2" style={{ color: 'rgba(234,244,211,0.55)', fontWeight: 600 }}>
            Student Voices
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#EAF4D3', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Student Reviews
          </h1>
          <p className="mt-3 max-w-xl" style={{ color: 'rgba(234,244,211,0.65)' }}>
            Hear from students who've found their perfect tutor on Tutor Finder.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Reviews feed */}
          <div className="lg:col-span-2">
            {loading && (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 size={32} className="animate-spin" style={{ color: '#002A22', opacity: 0.4 }} />
                <p className="text-sm" style={{ color: 'rgba(0,42,34,0.5)' }}>Loading reviews…</p>
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

            {!loading && !error && reviews.length === 0 && (
              <div className="text-center py-24">
                <MessageSquare size={48} className="mx-auto mb-4 opacity-25" style={{ color: '#002A22' }} />
                <p style={{ color: 'rgba(0,42,34,0.5)' }}>No reviews yet. Be the first to share your experience!</p>
              </div>
            )}

            {!loading && reviews.length > 0 && (
              <div className="space-y-5">
                <p className="text-sm mb-2" style={{ color: 'rgba(0,42,34,0.5)' }}>
                  {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </p>
                {reviews.map((review, idx) => (
                  <div
                    key={review.id ?? `${review.email ?? 'anon'}-${review.tutorId ?? 't'}-${idx}`}
                    className="rounded-2xl p-7 transition-all duration-200 hover:shadow-md"
                    style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.09)' }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold"
                        style={{ backgroundColor: colors[idx % colors.length], color: '#EAF4D3' }}
                      >
                        {review.name ? review.name[0].toUpperCase() : '?'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm" style={{ color: '#002A22' }}>{review.name}</p>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={`display-star-${review.id ?? idx}-${i}`}
                                size={13}
                                fill={i < (review.rating ?? 5) ? '#002A22' : 'transparent'}
                                style={{ color: '#002A22' }}
                              />
                            ))}
                          </div>
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: 'rgba(0,42,34,0.7)', lineHeight: 1.75 }}
                        >
                          "{review.feedback}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit form */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl overflow-hidden sticky top-24"
              style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.09)', boxShadow: '0 4px 24px rgba(0,42,34,0.07)' }}
            >
              <div className="px-7 py-6" style={{ backgroundColor: '#002A22' }}>
                <div className="flex items-center gap-2">
                  <MessageSquare size={17} style={{ color: '#EAF4D3' }} />
                  <h2
                    style={{ fontFamily: 'Playfair Display, serif', color: '#EAF4D3', fontWeight: 700, fontSize: '1.1rem' }}
                  >
                    Share Your Experience
                  </h2>
                </div>
                <p className="mt-2 text-sm" style={{ color: 'rgba(234,244,211,0.6)' }}>
                  Help other students by leaving a review.
                </p>
              </div>

              <div className="p-7">
                {submitStatus === 'success' && (
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5 text-sm"
                    style={{ backgroundColor: 'rgba(0,42,34,0.07)', color: '#002A22', border: '1px solid rgba(0,42,34,0.15)' }}
                  >
                    <CheckCircle size={16} className="shrink-0" />
                    {submitMsg}
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5 text-sm"
                    style={{ backgroundColor: 'rgba(212,24,61,0.08)', color: '#d4183d', border: '1px solid rgba(212,24,61,0.2)' }}
                  >
                    <AlertCircle size={16} className="shrink-0" />
                    {submitMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Your Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      style={{
                        border: '1.5px solid rgba(0,42,34,0.18)',
                        backgroundColor: '#fff',
                        color: '#002A22',
                        outline: 'none',
                        fontFamily: 'Inter, sans-serif',
                      }}
                      onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#002A22'}
                      onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,42,34,0.18)'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      style={{
                        border: '1.5px solid rgba(0,42,34,0.18)',
                        backgroundColor: '#fff',
                        color: '#002A22',
                        outline: 'none',
                        fontFamily: 'Inter, sans-serif',
                      }}
                      onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#002A22'}
                      onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,42,34,0.18)'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Tutor</label>
                    <select
                      value={form.tutorId}
                      onChange={e => setForm(f => ({ ...f, tutorId: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      style={{
                        border: '1.5px solid rgba(0,42,34,0.18)',
                        backgroundColor: '#fff',
                        color: '#002A22',
                        outline: 'none',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      <option value="">Select tutor</option>
                      {tutors.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#002A22' }}>Your Review</label>
                    <textarea
                      value={form.feedback}
                      onChange={e => setForm(f => ({ ...f, feedback: e.target.value }))}
                      required
                      rows={5}
                      placeholder="Share your tutoring experience…"
                      className="w-full px-4 py-3 rounded-xl text-sm resize-none"
                      style={{
                        border: '1.5px solid rgba(0,42,34,0.18)',
                        backgroundColor: '#fff',
                        color: '#002A22',
                        outline: 'none',
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: 1.6,
                      }}
                      onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = '#002A22'}
                      onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(0,42,34,0.18)'}
                    />
                  </div>

                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, rating: i + 1 }))}
                        className="p-0.5"
                        aria-label={`Set rating to ${i + 1}`}
                      >
                        <Star
                          size={18}
                          fill={i < form.rating ? '#002A22' : 'transparent'}
                          style={{ color: '#002A22' }}
                        />
                      </button>
                    ))}
                    <span className="text-xs ml-2" style={{ color: 'rgba(0,42,34,0.5)', alignSelf: 'center' }}>
                      {form.rating} star{form.rating !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-all duration-200 hover:opacity-90 hover:shadow-md disabled:opacity-60"
                    style={{ backgroundColor: '#002A22', color: '#EAF4D3', fontWeight: 600 }}
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Submitting…
                      </span>
                    ) : (
                      <>
                        <Send size={15} />
                        Submit Review
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
