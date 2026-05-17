import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain, BookOpen, Play,
  Users, MessageCircle, ArrowLeft, ShieldCheck, Sparkles
} from 'lucide-react';
import Seo from '../components/Seo';

const prefetchRoute = (path: string) => {
  if (path === '/dakiraty') import('./DakiratyLanding');
  if (path === '/quran') import('./ProgramDetails');
};

const homeJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'كوتش أحمد',
    url: 'https://website-dakiraty.vercel.app',
    inLanguage: 'ar',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://website-dakiraty.vercel.app/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        url: 'https://website-dakiraty.vercel.app/dakiraty',
        name: 'برنامج ذاكرتي - تدريب الذاكرة'
      },
      {
        '@type': 'ListItem',
        position: 2,
        url: 'https://website-dakiraty.vercel.app/quran',
        name: 'برنامج الذاكرة والقرآن الكريم'
      },
      {
        '@type': 'ListItem',
        position: 3,
        url: 'https://website-dakiraty.vercel.app/kids-memory',
        name: 'برنامج الذاكرة للأطفال'
      }
    ]
  }
];

const Home: React.FC = () => {
  return (
    <div className="flex flex-col font-sans">
      <Seo
        title="كوتش أحمد | تدريب الذاكرة وحفظ القرآن الكريم - برامج عربية معتمدة"
        description="انضم لأكثر من 5000 متدرب في برامج كوتش أحمد لتقوية الذاكرة وحفظ القرآن الكريم. منهجية تجمع علم الأعصاب وتقنيات أبطال العالم للذاكرة. شهادة معتمدة وضمان استرداد."
        keywords="كوتش أحمد, تقوية الذاكرة, حفظ القرآن الكريم, تدريب الذاكرة, ذاكرة الأطفال, دورات الذاكرة المغرب, تقنيات أبطال الذاكرة, طرق الحفظ السريع"
        path="/"
        jsonLd={homeJsonLd}
      />
      
      {/* SECTION 1: HERO (Above the Fold) */}
      <section className="relative bg-dark-blue text-white overflow-hidden min-h-[90vh] flex items-center pt-10">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-blue/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/40 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Right: Copy (RTL) */}
            <div className="text-center lg:text-right space-y-8 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-accent-yellow mb-2 backdrop-blur-md">
                    <Sparkles size={14} />
                    <span>المنهجية الأولى عربياً</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.2] tracking-tight">
                    حول ذاكرتك من <span className="text-gray-400 line-through decoration-red-500 decoration-4">غربال</span> إلى <br className="hidden lg:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-l from-accent-yellow to-yellow-200">'خزنة فولاذية'</span>... <br />
                    واحفظ كتاب الله بإتقان لم تعهده من قبل
                </h1>
                
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-light">
                    اكتشف المنهجية المبتكرة التي تجمع بين أسرار الحفاظ الأوائل وعلم الأعصاب الحديث، لمضاعفة سرعة حفظك 3 أضعاف - <span className="text-white font-bold border-b border-accent-yellow/50 pb-0.5">مهما كان عمرك أو انشغالك</span>.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                    <button 
                        onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-accent-yellow hover:bg-yellow-400 text-dark-blue text-lg font-bold py-4 px-10 rounded-2xl shadow-[0_10px_30px_rgba(255,193,7,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span>ابدأ رحلة التغيير الآن</span>
                        <ArrowLeft size={20} />
                    </button>
                    
                    <Link to="/dakiraty" onMouseEnter={() => prefetchRoute('/dakiraty')} className="group bg-white/5 border border-white/10 hover:bg-white/10 text-white text-lg font-medium py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
                        <div className="w-8 h-8 rounded-full bg-white text-dark-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play size={14} fill="currentColor" />
                        </div>
                        <span>شاهد كيف يمكنك تقوية ذاكرتك (2د)</span>
                    </Link>
                </div>

                <div className="pt-6 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-400">
                    <div className="flex -space-x-3 space-x-reverse">
                        {[1,2,3,4].map(i => (
                            <img key={i} src={`https://picsum.photos/id/${i+50}/50`} alt="User" className="w-8 h-8 rounded-full border-2 border-dark-blue" width="32" height="32" loading="lazy" />
                        ))}
                    </div>
                    <p>انضم لـ <span className="text-white font-bold">+5,000</span> متدرب</p>
                </div>
            </div>

            {/* Left: Visual/Image */}
            <div className="order-1 lg:order-2 flex justify-center relative">
                <div className="relative w-full max-w-md aspect-[4/5]">
                    {/* Main Image - Replaced video with optimized static image for better LCP & Bandwidth */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-blue to-blue-500 rounded-[2.5rem] rotate-3 opacity-20 transform translate-x-4 translate-y-4"></div>
                    <img 
                        src="https://szyuhfwlwmmjjtbupmxf.supabase.co/storage/v1/object/public/chat-media/212632730020@s.whatsapp.net_1768925248390.jpeg" 
                        alt="Coach Ahmed Presentation"
                        // @ts-ignore
                        fetchPriority="high"
                        className="relative z-10 w-full h-full object-cover rounded-[2rem] shadow-2xl border-4 border-white/10"
                        width="448"
                        height="560"
                        loading="eager"
                    />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE TWO PATHS (Segmentation) */}
      <section id="programs" className="py-24 bg-light-gray relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-4">ما هو هدفك القادم؟</h2>
                <div className="w-24 h-1.5 bg-accent-yellow mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* CARD 1: DAKIRATY */}
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-gray-100 hover:border-primary-blue/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary-blue mb-8 group-hover:scale-110 transition-transform duration-300">
                        <Brain size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-dark-blue mb-4 group-hover:text-primary-blue transition-colors">برنامج ذاكرتي</h3>
                    <p className="text-gray-500 font-medium mb-6 min-h-[56px]">
                        "هل تعاني من نسيان الأسماء، المعلومات، أو التشتت أثناء الدراسة؟"
                    </p>
                    <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
                        <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">الوعد:</h4>
                        <p className="text-gray-800 font-bold leading-relaxed">
                            امتلك ذاكرة خارقة، تخلص من النسيان، وضاعف استيعابك الدراسي والمهني.
                        </p>
                    </div>
                    <Link to="/dakiraty" onMouseEnter={() => prefetchRoute('/dakiraty')} className="block w-full bg-white border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-bold py-4 rounded-xl text-center transition-all">
                        اكتشف تفاصيل الدورة
                    </Link>
                </div>

                {/* CARD 2: QURAN */}
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-gray-100 hover:border-green-600/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-8 group-hover:scale-110 transition-transform duration-300">
                        <BookOpen size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-dark-blue mb-4 group-hover:text-green-700 transition-colors">برنامج القرآن الكريم</h3>
                    <p className="text-gray-500 font-medium mb-6 min-h-[56px]">
                        "هل بدأت الحفظ مراراً وتكراراً ثم توقفت بسبب ضعف التثبيت؟"
                    </p>
                    <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
                        <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">الوعد:</h4>
                        <p className="text-gray-800 font-bold leading-relaxed">
                            طريقك المختصر لحفظ كتاب الله كاملاً، مع الفهم والتدبر، ورسخ المحفوظ كاسمك.
                        </p>
                    </div>
                    <Link to="/quran" onMouseEnter={() => prefetchRoute('/quran')} className="block w-full bg-green-600 text-white hover:bg-green-700 font-bold py-4 rounded-xl text-center shadow-lg hover:shadow-green-600/30 transition-all">
                        ابدأ رحلة الحفظ
                    </Link>
                </div>

                {/* CARD 3: KIDS MEMORY */}
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-gray-100 hover:border-orange-500/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-8 group-hover:scale-110 transition-transform duration-300">
                        <Sparkles size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-dark-blue mb-4 group-hover:text-orange-600 transition-colors">برنامج الذاكرة للأطفال</h3>
                    <p className="text-gray-500 font-medium mb-6 min-h-[56px]">
                        "هل يعاني طفلك من النسيان السريع أو صعوبة في التركيز أثناء الدراسة؟"
                    </p>
                    <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
                        <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">الوعد:</h4>
                        <p className="text-gray-800 font-bold leading-relaxed">
                            تقنيات ممتعة تجعل طفلك يحفظ دروسه بسرعة، يركز أكثر، ويتفوق في دراسته.
                        </p>
                    </div>
                    <Link to="/kids-memory" className="block w-full bg-orange-500 text-white hover:bg-orange-600 font-bold py-4 rounded-xl text-center shadow-lg hover:shadow-orange-500/30 transition-all">
                        سجّل طفلك الآن
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* SECTION 3: AUTHORITY & TRUST */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-6 leading-tight">
                    لماذا يثق بنا أكثر من <span className="text-primary-blue">5,000</span> طالب حول العالم؟
                </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
                {[
                    {
                        icon: Sparkles,
                        title: "ليس سحراً، بل علم",
                        desc: "نعتمد على استراتيجيات الذاكرة المثبتة علمياً، وليس مجرد التكرار الممل."
                    },
                    {
                        icon: Users,
                        title: "متابعة شخصية",
                        desc: "لست وحدك في الرحلة. فريقنا ومساعدنا الذكي معك خطوة بخطوة."
                    },
                    {
                        icon: ShieldCheck,
                        title: "نتائج ملموسة",
                        desc: "طلابنا لا يحفظون فقط، بل يغيرون طريقة تفكيرهم بالكامل."
                    }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-blue-50 text-primary-blue rounded-2xl flex items-center justify-center mb-6">
                            <item.icon size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-dark-blue mb-3">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed max-w-xs">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* SECTION 4: CHATBOT TEASER */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-dark-blue text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 backdrop-blur-md">
                
                <div className="md:w-1/3 flex justify-center">
                    <div className="relative w-48 h-48">
                        <div className="absolute inset-0 bg-blue-500 rounded-full blur-[50px] opacity-40 animate-pulse"></div>
                        <div className="relative w-full h-full bg-gradient-to-b from-blue-400 to-primary-blue rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl">
                             <MessageCircle size={80} className="text-white" />
                             <div className="absolute bottom-2 right-4 w-6 h-6 bg-green-400 rounded-full border-2 border-dark-blue"></div>
                        </div>
                    </div>
                </div>

                <div className="md:w-2/3 text-center md:text-right">
                    <h2 className="text-3xl font-bold mb-4">لديك استفسار؟ المساعد الذكي "رفيق" جاهز للإجابة.</h2>
                    <p className="text-blue-200 text-lg mb-8 leading-relaxed max-w-2xl">
                        سواء كنت تسأل عن خطة الحفظ المناسبة لك، أو تريد نصيحة سريعة لتقوية التركيز، الذكاء الاصطناعي لدينا مدرب على منهجية الأستاذ أحمد للإجابة فوراً.
                    </p>
                    <button className="bg-white text-dark-blue hover:bg-gray-100 font-bold py-3.5 px-8 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 mx-auto md:mx-0">
                        <MessageCircle size={20} />
                        <span>تحدث معه الآن مجاناً</span>
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* SECTION 5: FINAL CTA (Pre-Footer) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark-blue mb-6 leading-tight">
                لا تدع يوماً آخر يمر وأنت <span className="text-primary-blue relative inline-block">
                    "تنوي"
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent-yellow opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                </span> البدء.
            </h2>
            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
                الذاكرة القوية وحفظ القرآن ليسا حكراً على العباقرة. إنهما مهارة يمكنك تعلمها... ونحن هنا لنعلمك كيف.
            </p>
            <button 
                onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold text-xl py-5 px-12 rounded-2xl shadow-xl hover:shadow-yellow-400/30 transition-all hover:scale-105"
            >
                انضم إلينا اليوم
            </button>
        </div>
      </section>

    </div>
  );
};

export default Home;