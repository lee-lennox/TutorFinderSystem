import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Search, Users, MapPin, Clock, ChevronRight, Loader2 } from 'lucide-react';
import { getAllTutors, type Tutor } from '../api';

export function TutorsList() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getAllTutors()
      .then(setTutors)
      .catch(() => setError('Failed to load tutors. Please ensure the backend is running.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = tutors.filter(t =>
    `${t.name} ${t.specialization} ${t.description} ${t.location}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#F4F1BB', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#002A22' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-widest mb-2" style={{ color: 'rgba(234,244,211,0.55)', fontWeight: 600 }}>
            Expert Educators
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#EAF4D3', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Find a Tutor
          </h1>
          <p className="mt-3 max-w-xl" style={{ color: 'rgba(234,244,211,0.65)' }}>
            Browse our network of qualified tutors and book a session today.
          </p>

          <div className="relative mt-8 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(234,244,211,0.4)' }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name, specialization, or location…"
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

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 size={32} className="animate-spin" style={{ color: '#002A22', opacity: 0.4 }} />
            <p className="text-sm" style={{ color: 'rgba(0,42,34,0.5)' }}>Loading tutors…</p>
          </div>
        )}

        {error && (
          <div
            className="px-5 py-4 rounded-xl max-w-lg mx-auto mt-8 text-sm"
            style={{ backgroundColor: 'rgba(212,24,61,0.08)', color: '#d4183d', border: '1px solid rgba(212,24,61,0.2)' }}
          >
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24">
            <Users size={48} className="mx-auto mb-4 opacity-25" style={{ color: '#002A22' }} />
            <p style={{ color: 'rgba(0,42,34,0.5)' }}>
              {query ? 'No tutors match your search.' : 'No tutors available yet.'}
            </p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <>
            <p className="text-sm mb-6" style={{ color: 'rgba(0,42,34,0.5)' }}>
              Showing {filtered.length} of {tutors.length} tutors
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(tutor => (
                <Link
                  key={tutor.id}
                  to={`/tutors/${tutor.id}`}
                  className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ backgroundColor: '#fff', border: '1px solid rgba(0,42,34,0.09)' }}
                >
                  {/* Photo */}
                  <div
                    className="h-52 overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: '#002A22' }}
                  >
                    {tutor.imageUrl ? (
                      <img
                        src={tutor.imageUrl}
                        alt={tutor.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold"
                        style={{ backgroundColor: 'rgba(234,244,211,0.12)', color: '#EAF4D3' }}
                      >
                        {tutor.name[0]}
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
                    <p className="text-sm font-medium mb-3" style={{ color: 'rgba(0,42,34,0.6)' }}>
                      {tutor.specialization}
                    </p>

                    <div className="flex flex-col gap-1 mb-4">
                      {tutor.location && (
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(0,42,34,0.5)' }}>
                          <MapPin size={12} /> {tutor.location}
                        </div>
                      )}
                      {tutor.availableTime && (
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(0,42,34,0.5)' }}>
                          <Clock size={12} /> {tutor.availableTime}
                        </div>
                      )}
                    </div>

                    <p className="text-sm line-clamp-2 mb-4" style={{ color: 'rgba(0,42,34,0.55)', lineHeight: 1.6 }}>
                      {tutor.description}
                    </p>

                    <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#002A22' }}>
                      View Profile & Book <ChevronRight size={15} />
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
