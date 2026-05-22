import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './Navbar';
import Footer from './Footer';
import ConvexClientProvider from './ConvexClientProvider';

const Layout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ConvexClientProvider>
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar />
        <main className="flex-grow pt-32 md:pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
      <SpeedInsights />
    </ConvexClientProvider>
  );
};

export default Layout;
