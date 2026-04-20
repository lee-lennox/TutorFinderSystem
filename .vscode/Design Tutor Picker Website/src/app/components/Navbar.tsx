import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { BookOpen, Menu, X, LogOut, User, ChevronDown } from 'lucide-react';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setUserEmail(localStorage.getItem('userEmail'));
    setUserRole(localStorage.getItem('userRole'));
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setUserEmail(null);
    setUserRole(null);
    navigate('/');
  };

  const isAdmin = (userRole || '').toLowerCase() === 'admin';

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/tutors', label: 'Tutors' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/profile', label: 'Profile' },
    ...(isAdmin ? [{ to: '/admin', label: 'Admin' }] : []),
  ];

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
      style={{
        backgroundColor: '#002A22',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span
              className="text-xl tracking-tight"
              style={{ color: '#EAF4D3', fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            >
              Tutor Finder
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="px-4 py-2 rounded-md text-sm transition-all duration-200"
                style={{
                  color: isActive(to) ? '#F4F1BB' : '#EAF4D3',
                  backgroundColor: isActive(to) ? 'rgba(234,244,211,0.12)' : 'transparent',
                  fontWeight: isActive(to) ? 600 : 400,
                }}
                onMouseEnter={e => {
                  if (!isActive(to)) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(234,244,211,0.08)';
                }}
                onMouseLeave={e => {
                  if (!isActive(to)) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            {userEmail ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200"
                  style={{ color: '#EAF4D3', backgroundColor: 'rgba(234,244,211,0.08)' }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
                    style={{ backgroundColor: '#F4F1BB', color: '#002A22' }}
                  >
                    {userEmail[0].toUpperCase()}
                  </div>
                  <span className="max-w-32 truncate">{userEmail}</span>
                  <ChevronDown size={14} />
                </button>
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 rounded-xl overflow-hidden shadow-2xl"
                    style={{ backgroundColor: '#002A22', border: '1px solid rgba(234,244,211,0.15)' }}
                  >
                    <Link
                      to="/bookings"
                      className="flex items-center gap-2 px-4 py-3 text-sm transition-colors duration-150"
                      style={{ color: '#EAF4D3' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(234,244,211,0.08)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
                    >
                      <BookOpen size={15} />
                      My Bookings
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-3 text-sm transition-colors duration-150"
                      style={{ color: '#EAF4D3' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(234,244,211,0.08)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
                    >
                      <User size={15} />
                      My Profile
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-3 text-sm transition-colors duration-150"
                        style={{ color: '#EAF4D3' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(234,244,211,0.08)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm transition-colors duration-150"
                      style={{ color: '#ff8888' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,136,136,0.08)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm transition-all duration-200"
                  style={{ color: '#EAF4D3' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(234,244,211,0.08)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-sm transition-all duration-200"
                  style={{
                    backgroundColor: '#EAF4D3',
                    color: '#002A22',
                    fontWeight: 600,
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#F4F1BB'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#EAF4D3'}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md transition-colors"
            style={{ color: '#EAF4D3' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden pb-4 pt-2 border-t"
            style={{ borderColor: 'rgba(234,244,211,0.12)' }}
          >
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="block px-4 py-3 text-sm rounded-md mb-1 transition-colors"
                style={{
                  color: '#EAF4D3',
                  backgroundColor: isActive(to) ? 'rgba(234,244,211,0.12)' : 'transparent',
                }}
              >
                {label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t flex flex-col gap-2" style={{ borderColor: 'rgba(234,244,211,0.12)' }}>
              {userEmail ? (
                <>
                  <Link
                    to="/bookings"
                    className="flex items-center gap-2 px-4 py-3 text-sm rounded-md"
                    style={{ color: '#EAF4D3', backgroundColor: 'rgba(234,244,211,0.08)' }}
                  >
                    <BookOpen size={15} /> My Bookings
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-3 text-sm rounded-md"
                    style={{ color: '#EAF4D3', backgroundColor: 'rgba(234,244,211,0.08)' }}
                  >
                    <User size={15} /> My Profile
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-3 text-sm rounded-md text-center"
                      style={{ color: '#EAF4D3', backgroundColor: 'rgba(234,244,211,0.08)' }}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-3 text-sm rounded-md"
                    style={{ color: '#ff8888', backgroundColor: 'rgba(255,136,136,0.08)' }}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-3 text-sm rounded-md text-center" style={{ color: '#EAF4D3', backgroundColor: 'rgba(234,244,211,0.08)' }}>
                    Sign In
                  </Link>
                  <Link to="/register" className="block px-4 py-3 text-sm rounded-md text-center" style={{ backgroundColor: '#EAF4D3', color: '#002A22', fontWeight: 600 }}>
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
