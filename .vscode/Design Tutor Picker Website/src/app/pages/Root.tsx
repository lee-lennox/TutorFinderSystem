import { Outlet } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function Root() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F4F1BB', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
