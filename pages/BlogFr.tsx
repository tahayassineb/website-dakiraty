import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { Search, Calendar, Clock, Globe } from 'lucide-react';
import Seo, { SITE_URL } from '../components/Seo';
import { api } from '../convex/_generated/api';

const BlogFr: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const articlesFr = useQuery(api.articles.list, { lang: 'fr' }) ?? [];
  const categoriesFr = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of articlesFr) {
      counts.set(a.category, (counts.get(a.category) || 0) + 1);
    }
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, [articlesFr]);

  const filtered = useMemo(() => {
    return articlesFr.filter((a) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCategory = !activeCategory || a.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [articlesFr, query, activeCategory]);

  const featured = articlesFr[0];
  const rest = filtered.filter((a) => !featured || a.slug !== featured.slug);

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Coach Ahmed - Techniques de mémoire et mémorisation du Coran',
    description: 'Articles approfondis et basés sur la science pour renforcer la mémoire, techniques de mémorisation du Coran, concentration et productivité.',
    inLanguage: 'fr-MA',
    url: `${SITE_URL}/fr/blog`,
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Coach Ahmed',
      url: SITE_URL,
    },
    blogPost: articlesFr.map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.excerpt,
      datePublished: a.date,
      dateModified: a.updated || a.date,
      image: a.image,
      url: `${SITE_URL}/fr/blog/${a.slug}`,
      author: { '@type': 'Person', name: a.author },
      articleSection: a.category,
      keywords: a.keywords,
    })),
  };

  if (articlesFr.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center" dir="ltr">
        <Seo
          title="Blog Coach Ahmed | Techniques de mémoire en français"
          description="Articles en français sur les techniques de mémoire, la mémorisation du Coran, la concentration et la productivité."
          path="/fr/blog"
          jsonLd={blogJsonLd}
        />
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-dark-blue mb-4">Bientôt disponible</h1>
          <p className="text-gray-600 mb-6">Les articles en français arrivent. En attendant, consultez notre blog en arabe.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 bg-primary-blue text-white font-bold py-3 px-8 rounded-xl hover:bg-dark-blue transition-colors">
            <Globe size={18} />
            <span>المدونة بالعربية</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20" dir="ltr">
      <Seo
        title="Blog Coach Ahmed | Techniques de mémoire et mémorisation du Coran"
        description="Articles approfondis sur les techniques de mémoire, la mémorisation rapide, la concentration et le développement cognitif. Écrits par un ancien champion national de mémoire."
        keywords="techniques de mémoire, mémorisation Coran, concentration, productivité, neurosciences, apprentissage rapide"
        path="/fr/blog"
        jsonLd={blogJsonLd}
      />

      {featured && (
        <section className="bg-gradient-to-r from-primary-blue to-dark-blue text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6 text-left">
                <span className="bg-accent-yellow text-dark-blue px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                  Article en vedette
                </span>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">{featured.title}</h1>
                <p className="text-blue-200 text-lg leading-relaxed">{featured.excerpt}</p>
                <Link
                  to={`/fr/blog/${featured.slug}`}
                  className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-primary-blue text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Lire l'article complet
                </Link>
              </div>
              <div className="md:w-1/2">
                <img
                  src={featured.image}
                  alt={featured.imageAlt}
                  className="rounded-2xl shadow-2xl border-4 border-white/10"
                  loading="eager"
                  width="800"
                  height="500"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-[70%]">
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-dark-blue">
                {activeCategory ? `Articles - ${activeCategory}` : 'Derniers articles'}
              </h2>
              {activeCategory && (
                <button
                  onClick={() => setActiveCategory(null)}
                  className="text-sm text-primary-blue font-bold hover:underline"
                >
                  Tout afficher
                </button>
              )}
            </div>

            {rest.length === 0 ? (
              <p className="text-center text-gray-500 py-20">Aucun article ne correspond à votre recherche.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {rest.map((article) => (
                  <Link
                    to={`/fr/blog/${article.slug}`}
                    key={article.slug}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        width="400"
                        height="200"
                      />
                      <div className="absolute top-4 left-4 bg-accent-yellow text-dark-blue text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {article.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-dark-blue mb-3 group-hover:text-primary-blue transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <aside className="lg:w-[30%] space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-dark-blue mb-4">Recherche</h3>
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un article..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all"
                />
                <Search className="absolute right-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-dark-blue mb-4">Catégories</h3>
              <ul className="space-y-2">
                {categoriesFr.map((cat) => (
                  <li key={cat.name}>
                    <button
                      onClick={() => setActiveCategory(cat.name === activeCategory ? null : cat.name)}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
                        activeCategory === cat.name
                          ? 'bg-primary-blue text-white'
                          : 'hover:bg-blue-50 text-gray-600 hover:text-primary-blue'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{cat.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/blog"
              className="bg-accent-yellow text-dark-blue font-bold p-6 rounded-2xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors shadow-md"
            >
              <Globe size={20} />
              <span>المدونة بالعربية</span>
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogFr;
