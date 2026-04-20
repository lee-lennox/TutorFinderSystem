import { Link } from 'react-router';
import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#002A22', fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span style={{ color: '#EAF4D3', fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.25rem' }}>
                Tutor Finder
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(234,244,211,0.65)' }}>
              Connecting students with expert tutors across all disciplines. Start your academic journey today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-5" style={{ color: '#F4F1BB', fontWeight: 600 }}>
              Platform
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/courses', label: 'Browse Courses' },
                { to: '/tutors', label: 'Find Tutors' },
                { to: '/reviews', label: 'Student Reviews' },
                { to: '/bookings', label: 'My Bookings' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'rgba(234,244,211,0.65)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EAF4D3'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(234,244,211,0.65)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-5" style={{ color: '#F4F1BB', fontWeight: 600 }}>
              Account
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/login', label: 'Sign In' },
                { to: '/register', label: 'Create Account' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'rgba(234,244,211,0.65)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EAF4D3'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(234,244,211,0.65)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-5" style={{ color: '#F4F1BB', fontWeight: 600 }}>
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm" style={{ color: 'rgba(234,244,211,0.65)' }}>
                <Mail size={14} className="mt-0.5 shrink-0" />
                support@tutorfinder.ac.za
              </li>
              <li className="flex items-start gap-2 text-sm" style={{ color: 'rgba(234,244,211,0.65)' }}>
                <Phone size={14} className="mt-0.5 shrink-0" />
                +27 (0) 11 000 0000
              </li>
              <li className="flex items-start gap-2 text-sm" style={{ color: 'rgba(234,244,211,0.65)' }}>
                <MapPin size={14} className="mt-0.5 shrink-0" />
                Johannesburg, South Africa
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(234,244,211,0.12)' }}>
          <p className="text-sm" style={{ color: 'rgba(234,244,211,0.4)' }}>
            © {year} Tutor Finder. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: 'rgba(234,244,211,0.4)' }}>
            Privacy Policy · Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
