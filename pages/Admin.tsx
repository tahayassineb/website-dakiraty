import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'convex/react';
import { Lock, Mail, AlertCircle, GraduationCap, FileText, Globe, Pencil, Calendar, Image as ImageIcon } from 'lucide-react';
import { api } from '../convex/_generated/api';
import { setAdminToken, getAdminToken } from '../lib/convex-client';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    setHasToken(!!getAdminToken());
  }, []);

  // If we already have a token, send the user to the articles list immediately.
  useEffect(() => {
    if (hasToken === true) {
      navigate('/admin/articles', { replace: true });
    }
  }, [hasToken, navigate]);

  if (hasToken === null) return null;
  if (hasToken === true) return null; // navigating

  return <LoginForm onSuccess={() => navigate('/admin/articles', { replace: true })} />;
};

const LoginForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const login = useMutation(api.auth.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const result = await login({ email, password });
      setAdminToken(result.token);
      onSuccess();
    } catch (err: any) {
      const msg = err?.message || String(err);
      if (msg.toLowerCase().includes('invalid')) {
        setError('بيانات تسجيل الدخول غير صحيحة');
      } else if (msg.toLowerCase().includes('not configured')) {
        setError('لم يتم إعداد المصادقة. تحقق من متغيرات البيئة في Convex.');
      } else {
        setError('حدث خطأ. حاول مرة أخرى.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-primary-blue to-dark-blue flex items-center justify-center px-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-blue rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-2xl font-bold text-dark-blue mb-2">لوحة التحكم</h1>
          <p className="text-sm text-gray-500">سجّل دخولك لإدارة المقالات</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-3 top-3.5 text-gray-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pr-10 pl-4 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all text-right"
                placeholder="name@example.com"
                dir="ltr"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-3.5 text-gray-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pr-10 pl-4 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all text-right"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary-blue hover:bg-dark-blue text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'جاري الدخول...' : 'دخول'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          صفحة محمية. الدخول مقتصر على المسؤولين.
        </p>
      </div>
    </div>
  );
};

/**
 * Dashboard: lists all articles (both AR + FR) with search/filter.
 */
export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const token = typeof window !== 'undefined' ? getAdminToken() : null;

  const articles = useQuery(
    api.articles.listAdmin,
    token ? { token } : 'skip'
  );

  const [query, setQuery] = useState('');
  const [langFilter, setLangFilter] = useState<'all' | 'ar' | 'fr'>('all');

  if (!articles) {
    return (
      <div className="text-center py-20 text-gray-500">
        جاري تحميل المقالات...
      </div>
    );
  }

  const filtered = articles.filter((a) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || a.title.toLowerCase().includes(q) || a.slug.toLowerCase().includes(q);
    const matchesLang = langFilter === 'all' || a.lang === langFilter;
    return matchesQuery && matchesLang;
  });

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-blue mb-2">المقالات</h1>
        <p className="text-gray-500 text-sm">عدد المقالات: {articles.length}</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث في المقالات..."
          className="flex-grow bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue text-sm"
        />
        <div className="flex gap-2">
          {([
            { key: 'all', label: 'الكل' },
            { key: 'ar', label: 'العربية' },
            { key: 'fr', label: 'الفرنسية' },
          ] as const).map((opt) => (
            <button
              key={opt.key}
              onClick={() => setLangFilter(opt.key)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                langFilter === opt.key
                  ? 'bg-primary-blue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles list */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-2xl">
          لا توجد مقالات مطابقة.
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((article) => (
            <button
              key={article._id}
              onClick={() => navigate(`/admin/edit/${article._id}`)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4 flex items-center gap-4 text-right group"
            >
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  className="w-20 h-20 object-cover rounded-lg shrink-0"
                  loading="lazy"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                  <ImageIcon size={24} />
                </div>
              )}
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      article.lang === 'fr'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {article.lang === 'fr' ? 'FR' : 'AR'}
                  </span>
                  <span className="text-xs text-gray-500">{article.category}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar size={12} />
                    {article.date}
                  </span>
                </div>
                <h3 className="font-bold text-dark-blue mb-1 line-clamp-1 group-hover:text-primary-blue transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1">{article.excerpt}</p>
              </div>
              <div className="shrink-0 text-gray-400 group-hover:text-primary-blue transition-colors">
                <Pencil size={20} />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
