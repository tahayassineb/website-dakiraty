import React from 'react';
import { Search, Calendar, Clock, Download, ChevronRight } from 'lucide-react';
import { Article } from '../types';
import Seo from '../components/Seo';

const Blog: React.FC = () => {
  const articles: Article[] = [
    {
      id: 1,
      title: "5 أسرار لتقوية الذاكرة قبل الامتحانات",
      excerpt: "اكتشف الطرق العلمية التي يستخدمها المتفوقون للحفاظ على المعلومات لأطول فترة ممكنة واسترجاعها بسهولة.",
      category: "مذاكرة",
      date: "12 أكتوبر 2023",
      readTime: "5 دقائق",
      imageUrl: "https://picsum.photos/id/20/800/600"
    },
    {
      id: 2,
      title: "كيف تحفظ صفحة من القرآن في 10 دقائق؟",
      excerpt: "تقنية التكرار المتباعد والربط الذهني ستغير طريقتك في الحفظ تماماً. دليل عملي خطوة بخطوة.",
      category: "قرآن",
      date: "05 نوفمبر 2023",
      readTime: "8 دقائق",
      imageUrl: "https://picsum.photos/id/366/800/600"
    },
    {
        id: 3,
        title: "التغذية الصحية وعلاقتها بحدة الذكاء",
        excerpt: "ما تأكله يؤثر بشكل مباشر على أداء عقلك. تعرف على الأطعمة الخارقة التي تعزز التركيز.",
        category: "صحة",
        date: "20 نوفمبر 2023",
        readTime: "4 دقائق",
        imageUrl: "https://picsum.photos/id/292/800/600"
      },
      {
        id: 4,
        title: "علاج التشتت الذهني أثناء العمل",
        excerpt: "استراتيجيات عملية للتغلب على المشتتات الرقمية وزيادة الإنتاجية في بيئة العمل المزدحمة.",
        category: "إنتاجية",
        date: "01 ديسمبر 2023",
        readTime: "6 دقائق",
        imageUrl: "https://picsum.photos/id/180/800/600"
      }
  ];

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'مدونة كوتش أحمد - مقالات الذاكرة والحفظ',
    description: 'مقالات وأدلة عملية حول تقوية الذاكرة، حفظ القرآن الكريم، التركيز والإنتاجية.',
    inLanguage: 'ar',
    url: 'https://website-dakiraty.vercel.app/blog',
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'كوتش أحمد',
      url: 'https://website-dakiraty.vercel.app'
    },
    blogPost: articles.map(a => ({
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.excerpt,
      datePublished: a.date,
      image: a.imageUrl,
      author: { '@type': 'Person', name: 'كوتش أحمد' },
      articleSection: a.category
    }))
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Seo
        title="مدونة كوتش أحمد | مقالات تقوية الذاكرة وحفظ القرآن الكريم"
        description="اكتشف أحدث المقالات والنصائح العملية لتقوية الذاكرة، تقنيات حفظ القرآن، تحسين التركيز، والتغلب على النسيان. محتوى مكتوب من خبراء الذاكرة بأسلوب علمي مبسط."
        keywords="مقالات الذاكرة, نصائح حفظ القرآن, التركيز الذهني, علاج النسيان, تقوية الذاكرة, الذاكرة قبل الامتحانات, التغذية والذاكرة"
        path="/blog"
        jsonLd={blogJsonLd}
      />

      {/* Featured Article Hero */}
      <section className="bg-gradient-to-r from-primary-blue to-dark-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 space-y-6 text-center md:text-right">
                    <span className="bg-accent-yellow text-dark-blue px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                        مقال مميز
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                        لماذا ننسى؟ وكيف نوقف نزيف الذاكرة؟
                    </h1>
                    <p className="text-blue-200 text-lg leading-relaxed">
                        جولة عميقة في أسرار العقل البشري، نفهم فيها أسباب النسيان البيولوجية والنفسية، ونقدم حلولاً عملية لاستعادة السيطرة على ذاكرتك.
                    </p>
                    <button className="bg-transparent border-2 border-white hover:bg-white hover:text-primary-blue text-white font-bold py-3 px-8 rounded-lg transition-colors">
                        اقرأ المقال كاملاً
                    </button>
                </div>
                <div className="md:w-1/2">
                    <img 
                        src="https://picsum.photos/id/1/800/500" 
                        alt="Featured" 
                        className="rounded-2xl shadow-2xl border-4 border-white/10"
                        loading="eager"
                        // @ts-ignore
                        fetchPriority="high"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Right Column: Articles Grid (70%) */}
            <div className="lg:w-[70%]">
                <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold text-dark-blue">أحدث المقالات</h2>
                    <div className="flex gap-2">
                        {/* Simple sort or view toggle could go here */}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {articles.map(article => (
                        <div key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                            <div className="relative h-48 overflow-hidden">
                                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                                <div className="absolute top-4 right-4 bg-accent-yellow text-dark-blue text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                    {article.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-dark-blue mb-3 group-hover:text-primary-blue transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                                    {article.excerpt}
                                </p>
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
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex justify-center gap-2">
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-blue text-white font-bold">1</button>
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-white text-gray-600 hover:bg-gray-100 border border-gray-200">2</button>
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-white text-gray-600 hover:bg-gray-100 border border-gray-200">3</button>
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-white text-gray-600 hover:bg-gray-100 border border-gray-200">
                        <ChevronRight className="rotate-180" size={18} />
                    </button>
                </div>
            </div>

            {/* Left Column: Sidebar (30%) */}
            <div className="lg:w-[30%] space-y-8">
                
                {/* Search Widget */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-dark-blue mb-4">بحث</h3>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="ابحث في المقالات..." 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 pr-10 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all"
                        />
                        <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                </div>

                {/* Categories Widget */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-dark-blue mb-4">التصنيفات</h3>
                    <ul className="space-y-2">
                        {['الذاكرة والتركيز', 'حفظ القرآن', 'تطوير الذات', 'الصحة والغذاء', 'قصص نجاح'].map((cat, i) => (
                            <li key={i}>
                                <a href="#" className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-primary-blue transition-colors group">
                                    <span>{cat}</span>
                                    <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full group-hover:bg-blue-100 group-hover:text-blue-700">
                                        {Math.floor(Math.random() * 20) + 1}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Lead Magnet Widget */}
                <div className="bg-blue-50 p-6 rounded-2xl border-2 border-accent-yellow shadow-md text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-primary-blue shadow-sm">
                        <Download size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-dark-blue mb-2">هدية مجانية</h3>
                    <p className="text-gray-600 text-sm mb-4">
                        حمل الآن قائمة المراجعة الذهبية لزيادة تركيزك 10 أضعاف خلال المذاكرة.
                    </p>
                    <input 
                        type="email" 
                        placeholder="بريدك الإلكتروني" 
                        className="w-full bg-white border border-blue-200 rounded-lg py-2 px-4 mb-3 focus:outline-none text-sm"
                    />
                    <button className="w-full bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold py-2 rounded-lg transition-colors shadow-sm text-sm">
                        تحميل مجاني
                    </button>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;