import { jsxs, jsx } from 'react/jsx-runtime';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Play, Brain, BookOpen, Users, ShieldCheck, MessageCircle } from 'lucide-react';
import { S as Seo } from './Seo-RAKbgilb.js';
import 'vite-react-ssg';

const prefetchRoute = (path) => {
  if (path === "/dakiraty") import('./DakiratyLanding-L0gwtWBt.js');
  if (path === "/quran") import('./ProgramDetails-B9MA60qD.js');
};
const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "كوتش أحمد",
    url: "https://website-dakiraty.vercel.app",
    inLanguage: "ar",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://website-dakiraty.vercel.app/blog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        url: "https://website-dakiraty.vercel.app/dakiraty",
        name: "برنامج ذاكرتي - تدريب الذاكرة"
      },
      {
        "@type": "ListItem",
        position: 2,
        url: "https://website-dakiraty.vercel.app/quran",
        name: "برنامج الذاكرة والقرآن الكريم"
      },
      {
        "@type": "ListItem",
        position: 3,
        url: "https://website-dakiraty.vercel.app/kids-memory",
        name: "برنامج الذاكرة للأطفال"
      }
    ]
  }
];
const Home = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col font-sans", children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "كوتش أحمد | تدريب الذاكرة وحفظ القرآن الكريم - برامج عربية معتمدة",
        description: "انضم لأكثر من 5000 متدرب في برامج كوتش أحمد لتقوية الذاكرة وحفظ القرآن الكريم. منهجية تجمع علم الأعصاب وتقنيات أبطال العالم للذاكرة. شهادة معتمدة وضمان استرداد.",
        keywords: "كوتش أحمد, تقوية الذاكرة, حفظ القرآن الكريم, تدريب الذاكرة, ذاكرة الأطفال, دورات الذاكرة المغرب, تقنيات أبطال الذاكرة, طرق الحفظ السريع",
        path: "/",
        jsonLd: homeJsonLd
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "relative bg-dark-blue text-white overflow-hidden min-h-[90vh] flex items-center pt-10", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-blue/30 rounded-full blur-[100px]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/40 rounded-full blur-[120px]" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-12 lg:py-20", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-right space-y-8 order-2 lg:order-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-accent-yellow mb-2 backdrop-blur-md", children: [
            /* @__PURE__ */ jsx(Sparkles, { size: 14 }),
            /* @__PURE__ */ jsx("span", { children: "المنهجية الأولى عربياً" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.2] tracking-tight", children: [
            "حول ذاكرتك من ",
            /* @__PURE__ */ jsx("span", { className: "text-gray-400 line-through decoration-red-500 decoration-4", children: "غربال" }),
            " إلى ",
            /* @__PURE__ */ jsx("br", { className: "hidden lg:block" }),
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-l from-accent-yellow to-yellow-200", children: "'خزنة فولاذية'" }),
            "... ",
            /* @__PURE__ */ jsx("br", {}),
            "واحفظ كتاب الله بإتقان لم تعهده من قبل"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-light", children: [
            "اكتشف المنهجية المبتكرة التي تجمع بين أسرار الحفاظ الأوائل وعلم الأعصاب الحديث، لمضاعفة سرعة حفظك 3 أضعاف - ",
            /* @__PURE__ */ jsx("span", { className: "text-white font-bold border-b border-accent-yellow/50 pb-0.5", children: "مهما كان عمرك أو انشغالك" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" }),
                className: "bg-accent-yellow hover:bg-yellow-400 text-dark-blue text-lg font-bold py-4 px-10 rounded-2xl shadow-[0_10px_30px_rgba(255,193,7,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "ابدأ رحلة التغيير الآن" }),
                  /* @__PURE__ */ jsx(ArrowLeft, { size: 20 })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(Link, { to: "/dakiraty", onMouseEnter: () => prefetchRoute("/dakiraty"), className: "group bg-white/5 border border-white/10 hover:bg-white/10 text-white text-lg font-medium py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-3 backdrop-blur-sm", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-white text-dark-blue flex items-center justify-center group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Play, { size: 14, fill: "currentColor" }) }),
              /* @__PURE__ */ jsx("span", { children: "شاهد كيف يمكنك تقوية ذاكرتك (2د)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-6 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-400", children: [
            /* @__PURE__ */ jsx("div", { className: "flex -space-x-3 space-x-reverse", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx("img", { src: `https://picsum.photos/id/${i + 50}/50`, alt: "User", className: "w-8 h-8 rounded-full border-2 border-dark-blue", width: "32", height: "32", loading: "lazy" }, i)) }),
            /* @__PURE__ */ jsxs("p", { children: [
              "انضم لـ ",
              /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "+5,000" }),
              " متدرب"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "order-1 lg:order-2 flex justify-center relative", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-md aspect-[4/5]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-primary-blue to-blue-500 rounded-[2.5rem] rotate-3 opacity-20 transform translate-x-4 translate-y-4" }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "https://szyuhfwlwmmjjtbupmxf.supabase.co/storage/v1/object/public/chat-media/212632730020@s.whatsapp.net_1768925248390.jpeg",
              alt: "Coach Ahmed Presentation",
              fetchPriority: "high",
              className: "relative z-10 w-full h-full object-cover rounded-[2rem] shadow-2xl border-4 border-white/10",
              width: "448",
              height: "560",
              loading: "eager"
            }
          )
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "programs", className: "py-24 bg-light-gray relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-dark-blue mb-4", children: "ما هو هدفك القادم؟" }),
        /* @__PURE__ */ jsx("div", { className: "w-24 h-1.5 bg-accent-yellow mx-auto rounded-full" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8 max-w-7xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-gray-100 hover:border-primary-blue/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary-blue mb-8 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(Brain, { size: 36 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-dark-blue mb-4 group-hover:text-primary-blue transition-colors", children: "برنامج ذاكرتي" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-medium mb-6 min-h-[56px]", children: '"هل تعاني من نسيان الأسماء، المعلومات، أو التشتت أثناء الدراسة؟"' }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-gray-400 uppercase mb-2", children: "الوعد:" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-800 font-bold leading-relaxed", children: "امتلك ذاكرة خارقة، تخلص من النسيان، وضاعف استيعابك الدراسي والمهني." })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/dakiraty", onMouseEnter: () => prefetchRoute("/dakiraty"), className: "block w-full bg-white border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-bold py-4 rounded-xl text-center transition-all", children: "اكتشف تفاصيل الدورة" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-gray-100 hover:border-green-600/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-8 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(BookOpen, { size: 36 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-dark-blue mb-4 group-hover:text-green-700 transition-colors", children: "برنامج القرآن الكريم" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-medium mb-6 min-h-[56px]", children: '"هل بدأت الحفظ مراراً وتكراراً ثم توقفت بسبب ضعف التثبيت؟"' }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-gray-400 uppercase mb-2", children: "الوعد:" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-800 font-bold leading-relaxed", children: "طريقك المختصر لحفظ كتاب الله كاملاً، مع الفهم والتدبر، ورسخ المحفوظ كاسمك." })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/quran", onMouseEnter: () => prefetchRoute("/quran"), className: "block w-full bg-green-600 text-white hover:bg-green-700 font-bold py-4 rounded-xl text-center shadow-lg hover:shadow-green-600/30 transition-all", children: "ابدأ رحلة الحفظ" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-gray-100 hover:border-orange-500/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-8 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(Sparkles, { size: 36 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-dark-blue mb-4 group-hover:text-orange-600 transition-colors", children: "برنامج الذاكرة للأطفال" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-medium mb-6 min-h-[56px]", children: '"هل يعاني طفلك من النسيان السريع أو صعوبة في التركيز أثناء الدراسة؟"' }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-gray-400 uppercase mb-2", children: "الوعد:" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-800 font-bold leading-relaxed", children: "تقنيات ممتعة تجعل طفلك يحفظ دروسه بسرعة، يركز أكثر، ويتفوق في دراسته." })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/kids-memory", className: "block w-full bg-orange-500 text-white hover:bg-orange-600 font-bold py-4 rounded-xl text-center shadow-lg hover:shadow-orange-500/30 transition-all", children: "سجّل طفلك الآن" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center max-w-3xl mx-auto mb-16", children: /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-dark-blue mb-6 leading-tight", children: [
        "لماذا يثق بنا أكثر من ",
        /* @__PURE__ */ jsx("span", { className: "text-primary-blue", children: "5,000" }),
        " طالب حول العالم؟"
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-10", children: [
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
      ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-blue-50 text-primary-blue rounded-2xl flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(item.icon, { size: 32 }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-dark-blue mb-3", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed max-w-xs", children: item.desc })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-20 bg-gradient-to-br from-gray-900 to-dark-blue text-white overflow-hidden relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 backdrop-blur-md", children: [
        /* @__PURE__ */ jsx("div", { className: "md:w-1/3 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative w-48 h-48", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-blue-500 rounded-full blur-[50px] opacity-40 animate-pulse" }),
          /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full bg-gradient-to-b from-blue-400 to-primary-blue rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl", children: [
            /* @__PURE__ */ jsx(MessageCircle, { size: 80, className: "text-white" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 right-4 w-6 h-6 bg-green-400 rounded-full border-2 border-dark-blue" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "md:w-2/3 text-center md:text-right", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-4", children: 'لديك استفسار؟ المساعد الذكي "رفيق" جاهز للإجابة.' }),
          /* @__PURE__ */ jsx("p", { className: "text-blue-200 text-lg mb-8 leading-relaxed max-w-2xl", children: "سواء كنت تسأل عن خطة الحفظ المناسبة لك، أو تريد نصيحة سريعة لتقوية التركيز، الذكاء الاصطناعي لدينا مدرب على منهجية الأستاذ أحمد للإجابة فوراً." }),
          /* @__PURE__ */ jsxs("button", { className: "bg-white text-dark-blue hover:bg-gray-100 font-bold py-3.5 px-8 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 mx-auto md:mx-0", children: [
            /* @__PURE__ */ jsx(MessageCircle, { size: 20 }),
            /* @__PURE__ */ jsx("span", { children: "تحدث معه الآن مجاناً" })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl font-extrabold text-dark-blue mb-6 leading-tight", children: [
        "لا تدع يوماً آخر يمر وأنت ",
        /* @__PURE__ */ jsxs("span", { className: "text-primary-blue relative inline-block", children: [
          '"تنوي"',
          /* @__PURE__ */ jsx("svg", { className: "absolute w-full h-3 -bottom-1 left-0 text-accent-yellow opacity-50", viewBox: "0 0 100 10", preserveAspectRatio: "none", children: /* @__PURE__ */ jsx("path", { d: "M0 5 Q 50 10 100 5", stroke: "currentColor", strokeWidth: "8", fill: "none" }) })
        ] }),
        " البدء."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-500 mb-10 max-w-2xl mx-auto", children: "الذاكرة القوية وحفظ القرآن ليسا حكراً على العباقرة. إنهما مهارة يمكنك تعلمها... ونحن هنا لنعلمك كيف." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" }),
          className: "bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold text-xl py-5 px-12 rounded-2xl shadow-xl hover:shadow-yellow-400/30 transition-all hover:scale-105",
          children: "انضم إلينا اليوم"
        }
      )
    ] }) })
  ] });
};

export { Home as default };
