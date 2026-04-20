import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Search, BookOpen, ChevronRight, Loader2 } from 'lucide-react';
import { getAllCourses, type Course } from '../api';

export function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

  useEffect(() => {
    getAllCourses()
      .then(data => setCourses(asArray<Course>(data).filter(Boolean)))
      .catch(() => setError('Failed to load courses. Please ensure the backend is running.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = courses.filter(c => {
    const name = c?.name ?? '';
    const code = c?.code ?? '';
    const description = c?.description ?? '';
    return `${name} ${code} ${description}`.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div style={{ backgroundColor: '#F4F1BB', minHeight: '100vh' }}>
      {/* Page Header */}
      <div style={{ backgroundColor: '#002A22' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-widest mb-2" style={{ color: 'rgba(234,244,211,0.55)', fontWeight: 600 }}>
            Academic Programmes
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#EAF4D3', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Browse Courses
          </h1>
          <p className="mt-3 max-w-xl" style={{ color: 'rgba(234,244,211,0.65)', fontSize: '1rem' }}>
            Explore all available courses and find the perfect tutor to guide your studies.
          </p>

          {/* Search */}
          <div className="relative mt-8 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(234,244,211,0.4)' }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name, code, or description…"
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm"
              style={{
                backgroundColor: 'rgba(234,244,211,0.1)',
                border: '1px solid rgba(234,244,211,0.2)',
                color: '#EAF4D3',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4" style={{ color: '#002A22' }}>
            <Loader2 size={32} className="animate-spin opacity-50" />
            <p className="text-sm" style={{ color: 'rgba(0,42,34,0.5)' }}>Loading courses…</p>
          </div>
        )}

        {error && (
          <div
            className="flex items-center gap-3 px-5 py-4 rounded-xl max-w-lg mx-auto mt-8 text-sm"
            style={{ backgroundColor: 'rgba(212,24,61,0.08)', color: '#d4183d', border: '1px solid rgba(212,24,61,0.2)' }}
          >
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24">
            <BookOpen size={48} className="mx-auto mb-4 opacity-25" style={{ color: '#002A22' }} />
            <p style={{ color: 'rgba(0,42,34,0.5)' }}>
              {query ? 'No courses match your search.' : 'No courses available yet.'}
            </p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <>
            <p className="text-sm mb-6" style={{ color: 'rgba(0,42,34,0.5)' }}>
              Showing {filtered.length} of {courses.length} courses
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(course => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.09)' }}
                >
                  {/* Image */}
                  <div
                    className="h-44 overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: '#002A22' }}
                  >
                    {course.imageUrl ? (
                      <img
                        src={course.imageUrl}
                        alt={course.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <BookOpen size={36} style={{ color: 'rgba(234,244,211,0.3)' }} />
                    )}
                  </div>

                  <div className="p-6">
                    <span
                      className="inline-block px-2 py-1 rounded text-xs font-bold tracking-widest mb-3"
                      style={{ backgroundColor: 'rgba(0,42,34,0.07)', color: '#002A22' }}
                    >
                      {course.code}
                    </span>
                    <h3
                      className="mb-2"
                      style={{ fontFamily: 'Playfair Display, serif', color: '#002A22', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.3 }}
                    >
                      {course.name}
                    </h3>
                    <p className="text-sm line-clamp-2 mb-4" style={{ color: 'rgba(0,42,34,0.6)', lineHeight: 1.6 }}>
                      {course.description}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#002A22' }}>
                      View Course <ChevronRight size={15} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
