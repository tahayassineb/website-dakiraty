import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import {
  Save, ArrowRight, Upload, Loader2, CheckCircle, AlertCircle,
  ChevronLeft, ImageIcon, ExternalLink, Eye
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { api } from '../convex/_generated/api';
import { Id } from '../convex/_generated/dataModel';
import { getAdminToken } from '../lib/convex-client';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const AdminEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = typeof window !== 'undefined' ? getAdminToken() : null;

  // Fetch the article (also gates by auth via the token arg)
  const article = useQuery(
    api.articles.getById,
    token && id ? { token, id: id as Id<'articles'> } : 'skip'
  );

  const updateArticle = useMutation(api.articles.update);
  const generateUploadUrl = useMutation(api.images.generateUploadUrl);
  const setArticleImage = useMutation(api.images.setArticleImage);

  // Form state — initialized from article once it loads
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    body: '',
    date: '',
    category: '',
    tags: '',
    keywords: '',
    readTime: '',
    image: '',
    imageAlt: '',
    author: '',
    authorBio: '',
    related: '',
    cta: 'none' as 'dakiraty' | 'quran' | 'kids-memory' | 'none',
  });
  const [originalSlug, setOriginalSlug] = useState('');
  const [lang, setLang] = useState<'ar' | 'fr'>('ar');
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'error'>('idle');
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync form when article arrives
  useEffect(() => {
    if (article && form.title === '') {
      setForm({
        title: article.title,
        excerpt: article.excerpt,
        body: article.body,
        date: article.date,
        category: article.category,
        tags: article.tags.join(', '),
        keywords: article.keywords,
        readTime: article.readTime,
        image: article.image,
        imageAlt: article.imageAlt,
        author: article.author,
        authorBio: article.authorBio,
        related: article.related.join(', '),
        cta: article.cta,
      });
      setOriginalSlug(article.slug);
      setLang(article.lang);
    }
  }, [article, form.title]);

  const handleSave = async () => {
    if (!token || !id) return;
    setStatus('saving');
    setErrorMsg(null);
    try {
      await updateArticle({
        token,
        id: id as Id<'articles'>,
        patch: {
          title: form.title,
          excerpt: form.excerpt,
          body: form.body,
          date: form.date,
          category: form.category,
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
          keywords: form.keywords,
          readTime: form.readTime,
          image: form.image,
          imageAlt: form.imageAlt,
          author: form.author,
          authorBio: form.authorBio,
          related: form.related.split(',').map((t) => t.trim()).filter(Boolean),
          cta: form.cta,
        },
      });
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.message || 'فشل الحفظ');
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!token || !id) return;
    setUploadStatus('uploading');
    setErrorMsg(null);
    try {
      // 1. Get a signed upload URL from Convex
      const uploadUrl = await generateUploadUrl({ token });

      // 2. POST the file directly to Convex storage
      const result = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      if (!result.ok) {
        throw new Error('Upload failed');
      }
      const { storageId } = await result.json();

      // 3. Tell Convex to attach this storageId to the article and get the URL
      const { url } = await setArticleImage({
        token,
        articleId: id as Id<'articles'>,
        storageId,
        imageAlt: form.imageAlt || form.title,
      });

      // 4. Update local form state to reflect new image
      setForm((prev) => ({ ...prev, image: url }));
      setUploadStatus('idle');
    } catch (err: any) {
      setUploadStatus('error');
      setErrorMsg(err?.message || 'فشل رفع الصورة');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  if (!token) {
    navigate('/admin', { replace: true });
    return null;
  }
  if (article === undefined) {
    return <div className="text-center py-20 text-gray-500">جاري التحميل...</div>;
  }
  if (article === null) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>المقال غير موجود.</p>
        <Link to="/admin/articles" className="text-primary-blue font-bold hover:underline">عودة للقائمة</Link>
      </div>
    );
  }

  const publicUrl = lang === 'fr'
    ? `https://website-dakiraty.vercel.app/fr/blog/${originalSlug}`
    : `https://website-dakiraty.vercel.app/blog/${originalSlug}`;

  return (
    <div dir="rtl">
      {/* Top action bar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <Link
          to="/admin/articles"
          className="flex items-center gap-2 text-gray-600 hover:text-primary-blue font-medium"
        >
          <ChevronLeft size={20} />
          <span>عودة للقائمة</span>
        </Link>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-4 rounded-lg transition-colors text-sm"
          >
            <Eye size={16} />
            <span>{showPreview ? 'إخفاء المعاينة' : 'معاينة'}</span>
          </button>
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-4 rounded-lg transition-colors text-sm"
          >
            <ExternalLink size={16} />
            <span>عرض على الموقع</span>
          </a>
          <button
            onClick={handleSave}
            disabled={status === 'saving'}
            className="flex items-center gap-2 bg-primary-blue hover:bg-dark-blue text-white font-bold py-2.5 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {status === 'saving' ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            <span>
              {status === 'saving' ? 'جاري الحفظ...' :
                status === 'saved' ? 'تم الحفظ ✓' :
                  'حفظ'}
            </span>
          </button>
        </div>
      </div>

      {/* Article status pill */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <span className={`text-xs font-bold px-3 py-1 rounded ${
          lang === 'fr' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
        }`}>
          {lang === 'fr' ? 'FR' : 'AR'}
        </span>
        <span className="text-xs text-gray-500">/{originalSlug}</span>
        {status === 'saved' && (
          <span className="flex items-center gap-1 text-xs text-green-600 font-bold">
            <CheckCircle size={14} /> تم الحفظ
          </span>
        )}
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-6 flex items-center gap-2 text-sm">
          <AlertCircle size={18} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Editor */}
        <div className="space-y-6">
          {/* Image */}
          <Section title="الصورة">
            {form.image && (
              <img
                src={form.image}
                alt={form.imageAlt}
                className="w-full max-h-64 object-cover rounded-xl mb-4 border border-gray-200"
              />
            )}
            <div className="flex items-center gap-3 flex-wrap">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadStatus === 'uploading'}
                className="flex items-center gap-2 bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {uploadStatus === 'uploading' ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Upload size={16} />
                )}
                <span>
                  {uploadStatus === 'uploading' ? 'جاري الرفع...' : (form.image ? 'استبدال الصورة' : 'رفع صورة')}
                </span>
              </button>
              <input
                type="text"
                value={form.imageAlt}
                onChange={(e) => setForm((p) => ({ ...p, imageAlt: e.target.value }))}
                placeholder="وصف الصورة (لقارئات الشاشة)"
                className="flex-grow min-w-0 bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary-blue"
                dir="rtl"
              />
            </div>
            {form.image && (
              <div className="mt-3 text-xs text-gray-400 truncate font-mono" dir="ltr">
                {form.image}
              </div>
            )}
          </Section>

          {/* Title + excerpt */}
          <Section title="العنوان والملخص">
            <Field label="العنوان">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue text-lg font-bold"
              />
            </Field>
            <Field label="الملخص (يظهر في قائمة المدونة)">
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue resize-y"
              />
            </Field>
          </Section>

          {/* Meta */}
          <Section title="المعلومات">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="التاريخ">
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue"
                />
              </Field>
              <Field label="مدة القراءة">
                <input
                  type="text"
                  value={form.readTime}
                  onChange={(e) => setForm((p) => ({ ...p, readTime: e.target.value }))}
                  placeholder="مثلاً: 8 دقائق"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue"
                />
              </Field>
              <Field label="التصنيف">
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue"
                />
              </Field>
              <Field label="دعوة الإجراء (CTA)">
                <select
                  value={form.cta}
                  onChange={(e) => setForm((p) => ({ ...p, cta: e.target.value as any }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue"
                >
                  <option value="dakiraty">برنامج ذاكرتي (dakiraty)</option>
                  <option value="quran">دورة القرآن (quran)</option>
                  <option value="kids-memory">ذاكرة الأطفال (kids-memory)</option>
                  <option value="none">لا شيء</option>
                </select>
              </Field>
            </div>
            <Field label="الوسوم (مفصولة بفواصل)">
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
                placeholder="وسم1, وسم2, وسم3"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue"
              />
            </Field>
            <Field label="الكلمات المفتاحية SEO (مفصولة بفواصل)">
              <input
                type="text"
                value={form.keywords}
                onChange={(e) => setForm((p) => ({ ...p, keywords: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue"
              />
            </Field>
            <Field label="المقالات ذات الصلة (slugs مفصولة بفواصل)">
              <input
                type="text"
                value={form.related}
                onChange={(e) => setForm((p) => ({ ...p, related: e.target.value }))}
                placeholder="slug-1, slug-2"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue text-sm font-mono"
                dir="ltr"
              />
            </Field>
          </Section>

          {/* Body */}
          <Section title="محتوى المقال (Markdown)">
            <textarea
              value={form.body}
              onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
              rows={30}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-primary-blue font-mono text-sm leading-relaxed resize-y"
              dir="rtl"
              placeholder="# عنوان&#10;&#10;اكتب محتوى المقال هنا باستخدام Markdown..."
            />
            <p className="text-xs text-gray-400 mt-2">
              يدعم Markdown: # للعناوين، **عريض**، *مائل**، [نص](رابط)، قوائم، جداول.
            </p>
          </Section>

          {/* Author */}
          <Section title="الكاتب">
            <Field label="اسم الكاتب">
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue"
              />
            </Field>
            <Field label="نبذة عن الكاتب">
              <textarea
                value={form.authorBio}
                onChange={(e) => setForm((p) => ({ ...p, authorBio: e.target.value }))}
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue resize-y"
              />
            </Field>
          </Section>
        </div>

        {/* Live preview */}
        {showPreview && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-4 max-h-[85vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-dark-blue mb-4 pb-2 border-b">معاينة</h2>
            <h1 className="text-xl font-extrabold mb-3">{form.title}</h1>
            <p className="text-gray-500 mb-4 italic">{form.excerpt}</p>
            {form.image && (
              <img src={form.image} alt={form.imageAlt} className="w-full rounded-xl mb-4" />
            )}
            <div className="article-body" dir={lang === 'fr' ? 'ltr' : 'rtl'}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{form.body}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* Sticky save bar at the bottom for mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg">
        <button
          onClick={handleSave}
          disabled={status === 'saving'}
          className="w-full flex items-center justify-center gap-2 bg-primary-blue hover:bg-dark-blue text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {status === 'saving' ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          <span>{status === 'saving' ? 'جاري الحفظ...' : status === 'saved' ? 'تم الحفظ ✓' : 'حفظ'}</span>
        </button>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 space-y-4">
    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{title}</h2>
    {children}
  </div>
);

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
    {children}
  </div>
);

export default AdminEditor;
