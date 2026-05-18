import React from 'react';
import { Link } from 'react-router-dom';
import {
  Award, Brain, Users, Globe, BookOpen, GraduationCap,
  Trophy, Calendar, ArrowLeft, Sparkles, ShieldCheck, Star
} from 'lucide-react';
import Seo, { SITE_URL, DEFAULT_OG_IMAGE } from '../components/Seo';

const milestones = [
  { year: '2003', title: 'البداية في تدريب الذاكرة', desc: 'انطلاق رحلة تخصصية في علم الذاكرة وتقنيات الحفظ.' },
  { year: '2015', title: 'المنتخب الوطني المغربي للذاكرة', desc: 'مشاركة مشرّفة كعضو في المنتخب الوطني.' },
  { year: '2020', title: 'رقم قياسي في بطولة إفريقيا للذاكرة', desc: 'صاحب رقم قياسي إفريقي في فئة حفظ الأرقام.' },
  { year: '2021', title: 'إطلاق برنامج "ذاكرتي"', desc: 'أول منهجية عربية تجمع علم الأعصاب وتقنيات أبطال الذاكرة.' },
  { year: '2023', title: 'دورة الذاكرة والقرآن الكريم', desc: 'بالشراكة مع جمعية ابتسم لدعم أيتام المغرب.' },
  { year: '2025', title: '+5000 متدرّب', desc: 'تجاوز عدد المتدرّبين 5000 من 15 دولة عربية.' },
];

const credentials = [
  { icon: Trophy, text: 'بطل وطني سابق في الذاكرة - المغرب' },
  { icon: Award, text: 'صاحب رقم قياسي في بطولة إفريقيا للذاكرة 2020' },
  { icon: GraduationCap, text: 'مدرب معتمد في تقنيات الذاكرة والتعلم السريع' },
  { icon: Globe, text: 'يتحدث 4 لغات: العربية، الفرنسية، الإنجليزية، الإسبانية' },
  { icon: Users, text: 'درّب أكثر من 5000 متدرّب في 15 دولة' },
  { icon: BookOpen, text: '+12 سنة خبرة في تدريب حفّاظ القرآن الكريم' },
];

const programs = [
  { title: 'برنامج ذاكرتي', desc: 'تقوية الذاكرة في 28 يوم', href: '/dakiraty', color: 'from-primary-blue to-dark-blue' },
  { title: 'دورة القرآن', desc: 'حفظ القرآن بتقنيات أبطال العالم', href: '/quran', color: 'from-green-700 to-green-900' },
  { title: 'ذاكرة الأطفال', desc: 'برنامج علمي ممتع للأطفال', href: '/kids-memory', color: 'from-orange-500 to-orange-700' },
];

const About: React.FC = () => {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'كوتش أحمد',
      alternateName: 'Coach Ahmed',
      jobTitle: 'مدرب الذاكرة وحفظ القرآن الكريم',
      description: 'مدرب معتمد في مهارات الذاكرة والتعلم السريع، بطل وطني سابق في الذاكرة، وصاحب رقم قياسي في بطولة إفريقيا للذاكرة 2020.',
      url: `${SITE_URL}/about`,
      image: DEFAULT_OG_IMAGE,
      knowsLanguage: ['ar', 'ar-MA', 'fr', 'en', 'es'],
      knowsAbout: [
        'تقوية الذاكرة',
        'حفظ القرآن الكريم',
        'تقنيات M5',
        'علم الأعصاب التطبيقي',
        'التعلم السريع',
        'الذاكرة عند الأطفال',
      ],
      award: [
        'بطل وطني في الذاكرة - المغرب',
        'رقم قياسي في بطولة إفريقيا للذاكرة 2020',
      ],
      worksFor: {
        '@type': 'EducationalOrganization',
        name: 'كوتش أحمد',
        url: SITE_URL,
      },
      sameAs: [SITE_URL],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'من نحن', item: `${SITE_URL}/about` },
      ],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Seo
        title="من هو كوتش أحمد؟ بطل وطني سابق ومدرب ذاكرة معتمد"
        description="تعرّف على رحلة كوتش أحمد: بطل وطني سابق في الذاكرة، صاحب رقم قياسي في بطولة إفريقيا 2020، مدرب لأكثر من 5000 متدرّب في 15 دولة. منهجية تجمع علم الأعصاب وتقنيات أبطال العالم."
        keywords="كوتش أحمد, من هو كوتش أحمد, بطل الذاكرة المغرب, مدرب الذاكرة, تقنيات M5, سيرة كوتش أحمد"
        path="/about"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-blue via-dark-blue to-primary-blue text-white pt-16 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Right: Bio */}
            <div className="text-center lg:text-right space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-accent-yellow backdrop-blur-md">
                <Sparkles size={14} />
                <span>بطل وطني في الذاكرة</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                كوتش <span className="text-accent-yellow">أحمد</span>
              </h1>

              <p className="text-xl text-blue-100 leading-relaxed font-light">
                مدرّب الذاكرة الذي حوّل حياة <span className="text-white font-bold">+5000 متدرّب</span> في 15 دولة، عبر منهجية أصلية تجمع علم الأعصاب الحديث وتقنيات أبطال العالم.
              </p>

              <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                <Link
                  to="/dakiraty"
                  className="bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold py-3 px-6 rounded-xl shadow-lg transition-transform hover:scale-105"
                >
                  اكتشف برنامج ذاكرتي
                </Link>
                <Link
                  to="/quran"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 px-6 rounded-xl backdrop-blur-md transition-colors"
                >
                  دورة القرآن
                </Link>
              </div>
            </div>

            {/* Left: Photo */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5]">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-yellow to-yellow-300 rounded-[2.5rem] rotate-3 opacity-30"></div>
                <img
                  src={DEFAULT_OG_IMAGE}
                  alt="كوتش أحمد - مدرب الذاكرة وبطل وطني سابق"
                  className="relative z-10 w-full h-full object-cover rounded-[2rem] shadow-2xl border-4 border-white/10"
                  width="448"
                  height="560"
                  loading="eager"
                  // @ts-ignore
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-4">السيرة العلمية والإنجازات</h2>
            <div className="w-24 h-1.5 bg-accent-yellow mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {credentials.map((cred, i) => {
              const Icon = cred.icon;
              return (
                <div key={i} className="flex items-start gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 text-primary-blue rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={24} />
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed pt-2">{cred.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-8">فلسفتي في التدريب</h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            بعد 22 سنة من تدريب الذاكرة، تعلّمت حقيقة واحدة: <span className="font-bold text-primary-blue">الذاكرة ليست موهبة، هي مهارة</span>.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            ما يفرّق بطل العالم في الذاكرة عن شخص عادي ليس الجينات، بل <span className="font-bold">معرفة كيف يعمل الدماغ</span>، وتطبيق التقنيات المناسبة بانضباط.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            هدفي مع كل متدرّب هو نفسه: ليس فقط أن يحفظ القرآن أو يقوّي ذاكرته، بل أن يكتشف <span className="font-bold text-primary-blue">قدراته الحقيقية</span> التي لم يستثمرها بعد.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-4">الرحلة</h2>
            <p className="text-gray-600">+22 سنة من الشغف بتدريب الذاكرة</p>
          </div>

          <div className="relative">
            <div className="absolute right-1/2 transform translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-blue via-accent-yellow to-primary-blue rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((m, idx) => (
                <div key={idx} className={`flex items-center w-full ${idx % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="w-5/12"></div>
                  <div className="z-10 bg-white border-4 border-accent-yellow rounded-full w-16 h-16 flex items-center justify-center shadow-lg text-primary-blue font-bold text-sm">
                    {m.year}
                  </div>
                  <div className="w-5/12 bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-r-4 border-primary-blue">
                    <h3 className="font-bold text-dark-blue mb-2 leading-tight">{m.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-dark-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-extrabold text-accent-yellow mb-2">+5000</div>
              <p className="text-gray-300">متدرّب حول العالم</p>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-accent-yellow mb-2">15</div>
              <p className="text-gray-300">دولة عربية</p>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-accent-yellow mb-2">+22</div>
              <p className="text-gray-300">سنة خبرة</p>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-accent-yellow mb-2">100%</div>
              <p className="text-gray-300">تقييمات إيجابية</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-blue text-center mb-12">برامجي التدريبية</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((p) => (
              <Link
                key={p.href}
                to={p.href}
                className={`bg-gradient-to-br ${p.color} text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group`}
              >
                <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
                <p className="text-white/80 mb-6">{p.desc}</p>
                <div className="flex items-center gap-2 text-accent-yellow font-bold group-hover:translate-x-2 transition-transform">
                  <span>اكتشف</span>
                  <ArrowLeft size={20} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
