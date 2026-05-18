import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Calendar, Clock, ChevronLeft, ArrowLeft, Tag, User, Globe } from 'lucide-react';
import Seo, { SITE_URL, DEFAULT_OG_IMAGE } from '../components/Seo';
import { articlesFrBySlug, getRelatedArticles, Article } from '../lib/articles';

const ctaConfig: Record<Exclude<Article['cta'], 'none'>, {
  title: string;
  subtitle: string;
  buttonText: string;
  href: string;
  color: string;
}> = {
  dakiraty: {
    title: 'Prêt à bâtir une mémoire d\'acier ?',
    subtitle: 'Rejoignez le programme Dakiraty et doublez votre capacité de mémorisation en 28 jours avec la méthodologie des champions du monde.',
    buttonText: 'Découvrir Dakiraty',
    href: '/dakiraty',
    color: 'from-primary-blue to-dark-blue',
  },
  quran: {
    title: 'Votre rêve de mémoriser le Coran est plus proche que vous ne pensez',
    subtitle: 'Formation de 3 jours avec la technique M5 mondiale. Les recettes du cours soutiennent les orphelins de l\'association Ibtassim.',
    buttonText: 'Rejoindre le programme Coran',
    href: '/quran',
    color: 'from-green-700 to-green-900',
  },
  'kids-memory': {
    title: 'Votre enfant mérite une mémoire forte',
    subtitle: 'Programme scientifique amusant que votre enfant applique en 15 minutes par jour pour mémoriser ses leçons rapidement.',
    buttonText: 'Inscrire mon enfant',
    href: '/kids-memory',
    color: 'from-orange-500 to-orange-700',
  },
};

const BlogPostFr: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articlesFrBySlug.get(slug) : undefined;

  const related = useMemo(
    () => (article ? getRelatedArticles(article.related, 'fr').slice(0, 3) : []),
    [article]
  );

  if (!article) {
    return <Navigate to="/fr/blog" replace />;
  }

  const fullUrl = `${SITE_URL}/fr/blog/${article.slug}`;
  const cta = article.cta !== 'none' ? ctaConfig[article.cta] : null;
  const arUrl = article.hreflangAr ? `${SITE_URL}/blog/${article.hreflangAr}` : null;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      image: article.image || DEFAULT_OG_IMAGE,
      datePublished: article.date,
      dateModified: article.updated || article.date,
      author: {
        '@type': 'Person',
        name: article.author,
        description: article.authorBio,
        url: `${SITE_URL}/about`,
      },
      publisher: {
        '@type': 'EducationalOrganization',
        name: 'Coach Ahmed',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
        },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': fullUrl },
      inLanguage: 'fr-MA',
      articleSection: article.category,
      keywords: article.keywords,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/fr/blog` },
        { '@type': 'ListItem', position: 3, name: article.title, item: fullUrl },
      ],
    },
  ];

  return (
    <article className="bg-gray-50 min-h-screen pb-20" dir="ltr">
      <Seo
        title={`${article.title} | Coach Ahmed`}
        description={article.excerpt}
        keywords={article.keywords}
        path={`/fr/blog/${article.slug}`}
        ogType="article"
        ogImage={article.image || DEFAULT_OG_IMAGE}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <header className="bg-gradient-to-br from-primary-blue to-dark-blue text-white pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronLeft size={14} />
            <Link to="/fr/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronLeft size={14} />
            <span className="text-white/80 truncate max-w-[50vw]">{article.title}</span>
          </nav>

          <span className="inline-block bg-accent-yellow text-dark-blue px-3 py-1 rounded-full text-xs font-bold mb-6">
            {article.category}
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8 font-light">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <time dateTime={article.date}>{article.date}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{article.readTime}</span>
            </div>
            {arUrl && (
              <Link
                to={`/blog/${article.hreflangAr}`}
                className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
              >
                <Globe size={14} />
                <span>العربية</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-12">
          {article.image && (
            <img
              src={article.image}
              alt={article.imageAlt}
              className="w-full rounded-2xl mb-10 shadow-md"
              width="800"
              height="450"
              loading="eager"
            />
          )}

          <div className="article-body max-w-none text-gray-800 leading-loose text-lg" dir="ltr">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
              {article.body}
            </ReactMarkdown>
          </div>

          {article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-gray-100">
              <Tag size={16} className="text-gray-400" />
              {article.tags.map((tag) => (
                <span key={tag} className="bg-blue-50 text-primary-blue text-sm px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10 pt-8 border-t border-gray-100 bg-gray-50 rounded-2xl p-6 -mx-2 md:-mx-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-blue flex items-center justify-center text-white font-bold text-xl shrink-0">
                C
              </div>
              <div>
                <h3 className="font-bold text-dark-blue mb-1">{article.author}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{article.authorBio}</p>
              </div>
            </div>
          </div>
        </div>

        {cta && (
          <section className={`bg-gradient-to-br ${cta.color} text-white rounded-3xl p-8 md:p-12 mt-12 shadow-2xl`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{cta.title}</h2>
            <p className="text-blue-100 text-lg mb-6 leading-relaxed">{cta.subtitle}</p>
            <Link
              to={cta.href}
              className="inline-flex items-center gap-2 bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold py-3 px-8 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              <span>{cta.buttonText}</span>
              <ArrowLeft size={20} className="rotate-180" />
            </Link>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-dark-blue mb-8 text-center">Articles connexes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  to={`/fr/blog/${r.slug}`}
                  key={r.slug}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group overflow-hidden border border-gray-100"
                >
                  {r.image && (
                    <img src={r.image} alt={r.imageAlt} className="w-full h-40 object-cover" loading="lazy" width="400" height="200" />
                  )}
                  <div className="p-5">
                    <span className="text-xs font-bold text-accent-yellow uppercase tracking-wider">{r.category}</span>
                    <h3 className="text-lg font-bold text-dark-blue mt-2 mb-3 leading-tight group-hover:text-primary-blue transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{r.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 text-center">
          <Link to="/fr/blog" className="inline-flex items-center gap-2 text-primary-blue font-bold hover:underline">
            <ChevronLeft size={18} />
            <span>Retour au blog</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPostFr;
