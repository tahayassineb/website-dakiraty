import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { LogOut, Home, FileText, ShieldAlert } from 'lucide-react';
import ConvexClientProvider from './ConvexClientProvider';
import Seo from './Seo';
import { api } from '../convex/_generated/api';
import { getAdminToken, clearAdminToken } from '../lib/convex-client';

const AdminShell: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  // Re-check token on every render so it stays in sync after login
  useEffect(() => {
    setHasToken(!!getAdminToken());
  }, [token]);

  const token = typeof window !== 'undefined' ? getAdminToken() : null;

  // Validate token with Convex (returns undefined while loading, then { valid: bool })
  const verification = useQuery(api.auth.verify, token ? { token } : 'skip');

  // If verification returns invalid, kick out
  useEffect(() => {
    if (verification && !verification.valid) {
      clearAdminToken();
      setHasToken(false);
    }
  }, [verification]);

  const isLoginPage = pathname === '/admin' || pathname === '/admin/';

  const handleLogout = () => {
    clearAdminToken();
    setHasToken(false);
    navigate('/admin', { replace: true });
  };

  // Show login page (when not authed)
  if (hasToken === false || (verification && !verification.valid)) {
    if (!isLoginPage) {
      // Trying to access protected admin route without auth — redirect
      if (typeof window !== 'undefined') {
        navigate('/admin', { replace: true });
      }
      return null;
    }
    return (
      <div className="min-h-screen bg-gray-50">
        <Outlet />
      </div>
    );
  }

  // Still loading auth state
  if (hasToken === null || (token && verification === undefined)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Authed — show admin shell with top bar
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <header className="bg-dark-blue text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert size={20} className="text-accent-yellow" />
            <span className="font-bold">لوحة التحكم</span>
            <span className="text-xs bg-white/10 px-2 py-0.5 rounded">Admin</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              to="/admin/articles"
              className="flex items-center gap-1.5 text-sm text-blue-100 hover:text-white transition-colors"
            >
              <FileText size={16} />
              <span>المقالات</span>
            </Link>
            <a
              href="/"
              className="flex items-center gap-1.5 text-sm text-blue-100 hover:text-white transition-colors"
            >
              <Home size={16} />
              <span>الموقع</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm bg-red-500/20 hover:bg-red-500/40 px-3 py-1.5 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              <span>خروج</span>
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

/**
 * Top-level admin layout — wraps everything in ConvexProvider and noindex Seo.
 * The actual auth/UI lives inside AdminShell.
 */
const AdminLayout: React.FC = () => {
  return (
    <ConvexClientProvider>
      <Seo
        title="لوحة التحكم - Coach Ahmed"
        description="Admin panel"
        path="/admin"
        noindex
      />
      <AdminShell />
    </ConvexClientProvider>
  );
};

export default AdminLayout;
