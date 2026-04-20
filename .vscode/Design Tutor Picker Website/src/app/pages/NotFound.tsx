import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#F4F1BB' }}
    >
      <div className="text-center max-w-md">
        <h1
          className="mb-2"
          style={{ fontFamily: 'Playfair Display, serif', color: '#002A22', fontWeight: 700, fontSize: '4rem', lineHeight: 1 }}
        >
          404
        </h1>
        <h2
          className="mb-3"
          style={{ fontFamily: 'Playfair Display, serif', color: '#002A22', fontWeight: 600, fontSize: '1.5rem' }}
        >
          Page Not Found
        </h2>
        <p className="mb-8" style={{ color: 'rgba(0,42,34,0.6)' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:opacity-90"
          style={{ backgroundColor: '#002A22', color: '#EAF4D3', fontWeight: 600 }}
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
