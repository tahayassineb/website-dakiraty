import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const prefetchRoute = (path: string) => {
  if (path === '/') import('../pages/Home');
  if (path === '/dakiraty') import('../pages/DakiratyLanding');
  if (path === '/quran') import('../pages/ProgramDetails');
  if (path === '/kids-memory') import('../pages/KidsMemoryLanding');
  if (path === '/blog') import('../pages/Blog');
};

const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'من نحن', path: '/about' },
    { name: 'برنامج ذاكرتي', path: '/dakiraty' },
    { name: 'برنامج القرآن', path: '/quran' },
    { name: 'ذاكرة الأطفال', path: '/kids-memory' },
    { name: 'المدونة', path: '/blog' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:h-20">
          
          {/* Top Row: Logo */}
          <div className="flex justify-between items-center h-16 md:h-full">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2 group" onMouseEnter={() => prefetchRoute('/')}>
                <div className="w-10 h-10 bg-primary-blue rounded-xl rotate-3 group-hover:rotate-0 transition-all duration-300 flex items-center justify-center text-white shadow-lg">
                  <GraduationCap size={24} />
                </div>
                <span className="font-bold text-2xl text-dark-blue tracking-tight flex items-center gap-1">
                  <span className="text-accent-yellow">Coach</span>
                  <span>أحمد</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Row (Horizontal Scroll) */}
          <div className="md:hidden w-full pb-3 overflow-x-auto no-scrollbar">
             <div className="flex items-center gap-2 min-w-max px-1">
               {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onMouseEnter={() => prefetchRoute(link.path)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border ${
                    isActive(link.path) 
                      ? 'bg-primary-blue text-white border-primary-blue shadow-md' 
                      : 'bg-gray-50 text-gray-600 border-gray-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
             </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onMouseEnter={() => prefetchRoute(link.path)}
                className={`text-base font-medium transition-colors duration-200 hover:text-primary-blue ${
                  isActive(link.path) ? 'text-primary-blue font-bold' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;