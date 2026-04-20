import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Users, BookOpen, ChevronRight, Loader2 } from 'lucide-react';
import { getCourse, getAllTutors, type Course, type Tutor } from '../api';

export function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [relatedTutors, setRelatedTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const numId = Number(id);
    Promise.all([getCourse(numId), getAllTutors()])
      .then(([c, tutors]) => {
        setCourse(c);
        const related = tutors.filter(t => {
          const course = t.course as any;
          return course?.id === numId || course === numId;
        });
        setRelatedTutors(related);
      })
      .catch(() => setError('Failed to load course details.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F4F1BB' }}>
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={32} className="animate-spin" style={{ color: '#002A22', opacity: 0.4 }} />
          <p className="text-sm" style={{ color: 'rgba(0,42,34,0.5)' }}>Loading course…</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F4F1BB' }}>
        <div className="text-center">
          <p className="text-sm mb-4" style={{ color: '#d4183d' }}>{error || 'Course not found.'}</p>
          <Link to="/courses" className="text-sm underline" style={{ color: '#002A22' }}>Back to courses</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F4F1BB', minHeight: '100vh' }}>
      {/* Hero banner */}
      <div
        className="relative"
        style={{ backgroundColor: '#002A22', minHeight: '320px', display: 'flex', alignItems: 'flex-end' }}
      >
        {course.imageUrl && (
          <>
            <img
              src={course.imageUrl}
              alt={course.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,42,34,0.95) 0%, rgba(0,42,34,0.5) 100%)' }} />
          </>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-70"
            style={{ color: 'rgba(234,244,211,0.7)' }}
          >
            <ArrowLeft size={16} /> Back to Courses
          </Link>

          <span
            className="inline-block px-3 py-1 rounded text-xs font-bold tracking-widest mb-4"
            style={{ backgroundColor: 'rgba(244,241,187,0.2)', color: '#F4F1BB' }}
          >
            {course.code}
          </span>

          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              color: '#EAF4D3',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: '700px',
            }}
          >
            {course.name}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Description */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl p-8 mb-8"
              style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.09)' }}
            >
              <h2
                className="mb-4"
                style={{ fontFamily: 'Playfair Display, serif', color: '#002A22', fontSize: '1.3rem', fontWeight: 700 }}
              >
                About This Course
              </h2>
              <p style={{ color: 'rgba(0,42,34,0.7)', lineHeight: 1.8 }}>
                {course.description || 'No description available.'}
              </p>
            </div>

            {/* Related Tutors */}
            <div>
              <h2
                className="mb-6"
                style={{ fontFamily: 'Playfair Display, serif', color: '#002A22', fontSize: '1.3rem', fontWeight: 700 }}
              >
                Tutors for This Course
              </h2>

              {relatedTutors.length === 0 ? (
                <div
                  className="rounded-2xl p-8 text-center"
                  style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.09)' }}
                >
                  <Users size={36} className="mx-auto mb-3 opacity-20" style={{ color: '#002A22' }} />
                  <p className="text-sm" style={{ color: 'rgba(0,42,34,0.5)' }}>
                    No tutors assigned to this course yet.
                  </p>
                  <Link
                    to="/tutors"
                    className="inline-flex items-center gap-1 mt-4 text-sm font-semibold"
                    style={{ color: '#002A22' }}
                  >
                    Browse all tutors <ChevronRight size={14} />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {relatedTutors.map(tutor => (
                    <Link
                      key={tutor.id}
                      to={`/tutors/${tutor.id}`}
                      className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.09)' }}
                    >
                      <div className="flex items-center gap-4 p-5">
                        <div
                          className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center shrink-0"
                          style={{ backgroundColor: '#002A22' }}
                        >
                          {tutor.imageUrl ? (
                            <img
                              src={tutor.imageUrl}
                              alt={tutor.name}
                              className="w-full h-full object-cover"
                              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                            />
                          ) : (
                            <span style={{ color: '#EAF4D3', fontWeight: 700, fontSize: '1.2rem' }}>
                              {tutor.name[0]}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3
                            className="truncate"
                            style={{ fontFamily: 'Playfair Display, serif', color: '#002A22', fontWeight: 700 }}
                          >
                            {tutor.name}
                          </h3>
                          <p className="text-sm truncate" style={{ color: 'rgba(0,42,34,0.6)' }}>
                            {tutor.specialization}
                          </p>
                          <p className="text-xs mt-1" style={{ color: 'rgba(0,42,34,0.45)' }}>
                            📍 {tutor.location}
                          </p>
                        </div>
                        <ChevronRight size={16} style={{ color: 'rgba(0,42,34,0.3)' }} className="shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl p-7 sticky top-24"
              style={{ backgroundColor: '#002A22', border: '1px solid rgba(0,42,34,0.1)' }}
            >
              <h3
                className="mb-5"
                style={{ fontFamily: 'Playfair Display, serif', color: '#EAF4D3', fontWeight: 700, fontSize: '1.1rem' }}
              >
                Quick Info
              </h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(234,244,211,0.5)' }}>Course Code</dt>
                  <dd className="text-sm font-semibold" style={{ color: '#EAF4D3' }}>{course.code}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(234,244,211,0.5)' }}>Course Name</dt>
                  <dd className="text-sm font-semibold" style={{ color: '#EAF4D3' }}>{course.name}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(234,244,211,0.5)' }}>Available Tutors</dt>
                  <dd className="text-sm font-semibold" style={{ color: '#EAF4D3' }}>{relatedTutors.length}</dd>
                </div>
              </dl>

              <div className="mt-8">
                <Link
                  to="/tutors"
                  className="block w-full text-center py-3 rounded-xl text-sm transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: '#EAF4D3', color: '#002A22', fontWeight: 600 }}
                >
                  Browse All Tutors
                </Link>
              </div>

              <div className="mt-3">
                <Link
                  to="/register"
                  className="block w-full text-center py-3 rounded-xl text-sm transition-all duration-200"
                  style={{ backgroundColor: 'rgba(234,244,211,0.1)', color: '#EAF4D3', border: '1px solid rgba(234,244,211,0.2)' }}
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
