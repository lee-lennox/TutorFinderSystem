import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, BookOpen, Users, Star, Award, CheckCircle, ChevronRight } from 'lucide-react';
import heroImage from '../../assets/05d307bff48b562882571143cc5fff17216dae46.png';
import { getAllCourses, getAllTutors, getAllReviews, type Course, type Tutor, type Review } from '../api';

export function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

  useEffect(() => {
    getAllCourses().then(data => setCourses(asArray<Course>(data))).catch(() => setCourses([]));
    getAllTutors().then(data => setTutors(asArray<Tutor>(data))).catch(() => setTutors([]));
    getAllReviews().then(data => setReviews(asArray<Review>(data))).catch(() => setReviews([]));
  }, []);

  const featuredCourses = courses.slice(0, 3);
  const featuredTutors = tutors.slice(0, 3);
  const featuredReviews = reviews.slice(0, 3);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: '92vh' }}
      >
        {/* Background image */}
        <img
          src={heroImage}
          alt="Graduation"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(0,42,34,0.92) 0%, rgba(0,42,34,0.78) 60%, rgba(0,42,34,0.65) 100%)' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8"
            style={{ backgroundColor: 'rgba(234,244,211,0.15)', color: '#EAF4D3', border: '1px solid rgba(234,244,211,0.25)' }}
          >
            <Award size={14} />
            South Africa's Premier Tutoring Platform
          </div>

          <h1
            className="mb-6"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              color: '#EAF4D3',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Find the Perfect Tutor <br />
            <span style={{ color: '#F4F1BB' }}>for Your Success</span>
          </h1>

          <p
            className="max-w-2xl mx-auto mb-10 text-lg"
            style={{ color: 'rgba(234,244,211,0.8)', lineHeight: 1.7 }}
          >
            Connect with qualified, experienced tutors across all academic disciplines.
            Book sessions, track progress, and achieve your academic goals with confidence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/tutors"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm transition-all duration-200 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: '#EAF4D3', color: '#002A22', fontWeight: 700 }}
            >
              Find a Tutor <ArrowRight size={16} />
            </Link>
            <Link
              to="/courses"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: 'rgba(234,244,211,0.12)', color: '#EAF4D3', border: '1px solid rgba(234,244,211,0.3)', fontWeight: 600 }}
            >
              Browse Courses <BookOpen size={16} />
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: `${tutors.length || '—'}`, label: 'Expert Tutors' },
              { value: `${courses.length || '—'}`, label: 'Courses Available' },
              { value: `${reviews.length || '—'}`, label: 'Student Reviews' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700, color: '#F4F1BB' }}>
                  {value}
                </div>
                <div className="text-xs mt-1" style={{ color: 'rgba(234,244,211,0.6)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to bottom, transparent, #F4F1BB)' }} />
      </section>

      {/* ── How It Works ──────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: '#F4F1BB' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: '#002A22', fontWeight: 600 }}>
              Simple Process
            </p>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                color: '#002A22',
                lineHeight: 1.2,
              }}
            >
              How Tutor Finder Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: BookOpen,
                title: 'Browse Courses',
                desc: 'Explore our comprehensive catalogue of courses across all academic levels and disciplines.',
              },
              {
                step: '02',
                icon: Users,
                title: 'Choose Your Tutor',
                desc: 'Review tutor profiles, specializations, availability and student feedback to find your perfect match.',
              },
              {
                step: '03',
                icon: CheckCircle,
                title: 'Book a Session',
                desc: 'Schedule a session at your convenience. Receive confirmation and start your learning journey.',
              },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div
                key={step}
                className="relative rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.08)' }}
              >
                <div
                  className="text-xs font-bold mb-5 tracking-widest"
                  style={{ color: 'rgba(0,42,34,0.25)' }}
                >
                  STEP {step}
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: '#002A22' }}
                >
                  <Icon size={22} style={{ color: '#EAF4D3' }} />
                </div>
                <h3
                  className="mb-3"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#002A22', fontSize: '1.2rem', fontWeight: 700 }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,42,34,0.65)' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Courses ──────────────────────────────────────────── */}
      {featuredCourses.length > 0 && (
        <section className="py-24" style={{ backgroundColor: '#002A22' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-sm uppercase tracking-widest mb-2" style={{ color: 'rgba(234,244,211,0.6)', fontWeight: 600 }}>
                  Academic Programmes
                </p>
                <h2
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                    fontWeight: 700,
                    color: '#EAF4D3',
                    lineHeight: 1.2,
                  }}
                >
                  Featured Courses
                </h2>
              </div>
              <Link
                to="/courses"
                className="hidden sm:flex items-center gap-1 text-sm transition-colors"
                style={{ color: '#F4F1BB', fontWeight: 600 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EAF4D3'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#F4F1BB'}
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCourses.map(course => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  style={{ backgroundColor: 'rgba(234,244,211,0.07)', border: '1px solid rgba(234,244,211,0.12)' }}
                >
                  {course.imageUrl && (
                    <div className="h-44 overflow-hidden">
                      <img
                        src={course.imageUrl}
                        alt={course.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div
                      className="inline-block px-2 py-1 rounded text-xs font-semibold mb-3 tracking-wider"
                      style={{ backgroundColor: 'rgba(244,241,187,0.15)', color: '#F4F1BB' }}
                    >
                      {course.code}
                    </div>
                    <h3
                      className="mb-2"
                      style={{ fontFamily: 'Playfair Display, serif', color: '#EAF4D3', fontWeight: 700, fontSize: '1.1rem' }}
                    >
                      {course.name}
                    </h3>
                    <p className="text-sm line-clamp-2" style={{ color: 'rgba(234,244,211,0.6)' }}>
                      {course.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm"
                style={{ backgroundColor: '#EAF4D3', color: '#002A22', fontWeight: 600 }}
              >
                View All Courses <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Featured Tutors ───────────────────────────────────────────── */}
      {featuredTutors.length > 0 && (
        <section className="py-24" style={{ backgroundColor: '#F4F1BB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-sm uppercase tracking-widest mb-2" style={{ color: 'rgba(0,42,34,0.5)', fontWeight: 600 }}>
                  Expert Educators
                </p>
                <h2
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                    fontWeight: 700,
                    color: '#002A22',
                    lineHeight: 1.2,
                  }}
                >
                  Meet Our Tutors
                </h2>
              </div>
              <Link
                to="/tutors"
                className="hidden sm:flex items-center gap-1 text-sm transition-colors"
                style={{ color: '#002A22', fontWeight: 600 }}
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTutors.map(tutor => (
                <Link
                  key={tutor.id}
                  to={`/tutors/${tutor.id}`}
                  className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.08)' }}
                >
                  <div className="relative h-52 overflow-hidden" style={{ backgroundColor: '#002A22' }}>
                    {tutor.imageUrl ? (
                      <img
                        src={tutor.imageUrl}
                        alt={tutor.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div
                          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold"
                          style={{ backgroundColor: 'rgba(234,244,211,0.15)', color: '#EAF4D3' }}
                        >
                          {(tutor.name || '?').slice(0, 1)}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3
                      className="mb-1"
                      style={{ fontFamily: 'Playfair Display, serif', color: '#002A22', fontWeight: 700, fontSize: '1.1rem' }}
                    >
                      {tutor.name}
                    </h3>
                    <p className="text-sm font-medium mb-2" style={{ color: 'rgba(0,42,34,0.6)' }}>
                      {tutor.specialization}
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(0,42,34,0.5)' }}>
                      📍 {tutor.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Reviews Teaser ───────────────────────────────────────────── */}
      {featuredReviews.length > 0 && (
        <section className="py-24" style={{ backgroundColor: '#002A22' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm uppercase tracking-widest mb-2" style={{ color: 'rgba(234,244,211,0.5)', fontWeight: 600 }}>
                Student Voices
              </p>
              <h2
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                  fontWeight: 700,
                  color: '#EAF4D3',
                  lineHeight: 1.2,
                }}
              >
                What Students Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {featuredReviews.map(review => (
                <div
                  key={review.id}
                  className="rounded-2xl p-7"
                  style={{ backgroundColor: 'rgba(234,244,211,0.07)', border: '1px solid rgba(234,244,211,0.12)' }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#F4F1BB" style={{ color: '#F4F1BB' }} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(234,244,211,0.8)' }}>
                    "{review.feedback}"
                  </p>
                  <p className="text-sm font-semibold" style={{ color: '#F4F1BB' }}>
                    — {review.name}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/reviews"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: '#EAF4D3', color: '#002A22', fontWeight: 600 }}
              >
                Read All Reviews <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: '#F4F1BB' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="mb-5"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 700,
              color: '#002A22',
              lineHeight: 1.2,
            }}
          >
            Ready to Excel Academically?
          </h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: 'rgba(0,42,34,0.65)', lineHeight: 1.7 }}>
            Join thousands of students who have improved their grades and confidence with personalised tutoring.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: '#002A22', color: '#EAF4D3', fontWeight: 700 }}
            >
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link
              to="/tutors"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm transition-all duration-200"
              style={{ color: '#002A22', border: '1.5px solid rgba(0,42,34,0.3)', fontWeight: 600 }}
            >
              Browse Tutors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
