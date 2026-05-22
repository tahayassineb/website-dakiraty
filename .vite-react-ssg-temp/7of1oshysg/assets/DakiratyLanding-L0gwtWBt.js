import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { ShieldCheck, Award, XCircle, X, CheckCircle, Check, CloudFog, Sun, UserCheck, BrainCircuit, TrendingUp, ChevronDown, ArrowLeft, Video, Smartphone, Users } from 'lucide-react';
import { Link } from 'react-scroll';
import { L as LiteYouTubeEmbed } from './LiteYouTubeEmbed-CWqo_Vmb.js';
import { S as Seo } from './Seo-RAKbgilb.js';
import 'vite-react-ssg';

const contentData = {
  heroVideoId: "DrcJ7yal7J4",
  heroCustomThumbnail: "https://szyuhfwlwmmjjtbupmxf.supabase.co/storage/v1/object/public/chat-media/212632730020@s.whatsapp.net_1768925248390.jpeg",
  // Optimized Authority Image (Reduced size w1000 -> w600)
  authorityImage: "https://drive.google.com/thumbnail?id=1G9GlcTc1-8tEuxDeDIgftISbVivRwUaD&sz=w600",
  proofVideoIds: [
    "0bbHdxHxotI",
    "9OTqcjbqFfk",
    "5S88yPxXcbg"
  ],
  // Optimized Proof Images (Reduced size w800 -> w400)
  proofImageUrls: [
    "https://drive.google.com/thumbnail?id=1160er0NXl8g7TDYfymIyysctN7h1a1UU&sz=w400",
    "https://drive.google.com/thumbnail?id=19NDughmyL23AOkOs06gcCuVfvSuqw7UD&sz=w400",
    "https://drive.google.com/thumbnail?id=1jYnXsZuwGkh4AbITE7FbWvQ5fEYEjKtd&sz=w400",
    "https://drive.google.com/thumbnail?id=1l_yY81OeyLas7EfSahSssl9PbyuRu33O&sz=w400",
    "https://drive.google.com/thumbnail?id=1b1TXDdOXqbUl3qATiyR10Y4nDZGZedzR&sz=w400"
  ]
};
const PIXEL_ID = "1971224763824220";
const Hero = ({ videoId }) => {
  return /* @__PURE__ */ jsxs("section", { className: "bg-primary-blue text-white py-12 lg:py-20 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-4xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block bg-accent-yellow/20 text-accent-yellow border border-accent-yellow/50 px-4 py-1.5 rounded-full text-sm font-bold mb-6", children: "البرنامج التدريبي الأقوى للذاكرة عربياً" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6", children: [
          "اكتشف كيف تضاعف قدرتك على الحفظ وتتخلص من النسيان في ",
          /* @__PURE__ */ jsx("span", { className: "text-accent-yellow underline decoration-wavy decoration-2 underline-offset-8", children: "28 يوماً فقط" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed", children: "منهجية علمية متكاملة تجمع بين أسرار أبطال الذاكرة وعلم الأعصاب الحديث لتعطيك ذاكرة حديدية لا تخذلك أبداً." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto bg-dark-blue p-2 md:p-3 rounded-2xl md:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10", children: /* @__PURE__ */ jsx("div", { className: "relative pt-[56.25%] rounded-xl md:rounded-2xl overflow-hidden bg-black group", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full", children: /* @__PURE__ */ jsx(
        LiteYouTubeEmbed,
        {
          videoId,
          title: "Dakiraty VSL",
          posterQuality: "maxresdefault",
          priority: true,
          customThumbnail: contentData.heroCustomThumbnail
        }
      ) }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 text-center", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "offer-section",
            smooth: true,
            duration: 800,
            className: "inline-flex cursor-pointer bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold text-lg md:text-2xl py-4 px-10 rounded-xl shadow-lg shadow-yellow-500/20 transition-transform hover:scale-105",
            children: "نعم، أريد تقوية ذاكرتي الآن"
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-blue-300 opacity-80 flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { size: 16 }),
          " ضمان استرداد الأموال لمدة 7 أيام"
        ] })
      ] })
    ] })
  ] });
};
const Authority = ({ imageUrl }) => {
  return /* @__PURE__ */ jsx("section", { className: "py-16 bg-white overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:w-1/2 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-accent-yellow/10 rounded-3xl transform rotate-3 scale-105 -z-10" }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: imageUrl,
          alt: "Coach Ahmed with Trophy",
          className: "rounded-3xl shadow-xl w-full object-cover border-4 border-white",
          width: "600",
          height: "400",
          loading: "lazy"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden md:block", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-blue-100 p-2 rounded-full text-primary-blue", children: /* @__PURE__ */ jsx(Award, { size: 24 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 font-bold uppercase", children: "المدرب" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-dark-blue", children: "كوتش أحمد" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "md:w-1/2 space-y-6 text-right", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-dark-blue", children: "من هو كوتش أحمد؟" }),
      /* @__PURE__ */ jsx("div", { className: "w-20 h-1.5 bg-accent-yellow rounded-full" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed", children: "مدرب معتمد في مهارات الذاكرة والتعلم السريع، وبطل وطني سابق في الذاكرة. قضى أكثر من 12 عاماً في دراسة وتطبيق تقنيات الحفظ التي يستخدمها أبطال العالم." }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed", children: 'هدفي ليس مجرد تعليمك "حيل" للحفظ، بل إعادة برمجة طريقة تفكيرك وعمل عقلك لتتمكن من استيعاب كميات ضخمة من المعلومات واسترجاعها بدقة متناهية.' }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 pt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-4 rounded-xl border border-gray-100", children: [
          /* @__PURE__ */ jsx("span", { className: "block text-3xl font-bold text-primary-blue mb-1", children: "+5000" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "متدرب حول العالم" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-4 rounded-xl border border-gray-100", children: [
          /* @__PURE__ */ jsx("span", { className: "block text-3xl font-bold text-primary-blue mb-1", children: "100%" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "تقييمات إيجابية" })
        ] })
      ] })
    ] })
  ] }) }) });
};
const FilterSection = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-16 bg-light-gray", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-10", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-dark-blue", children: "هل هذا البرنامج لك؟" }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-sm border-2 border-red-100 p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 border-b border-red-50 pb-4", children: [
          /* @__PURE__ */ jsx(XCircle, { className: "text-red-500 w-8 h-8" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-800", children: "هذا البرنامج ليس لك إذا:" })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: ["تبحث عن حل سحري بدون بذل مجهود 15 دقيقة يومياً.", "تعتقد أن الذاكرة موهبة فطرية لا يمكن تطويرها.", "غير مستعد للاستثمار في تطوير ذاتك ومستقبلك."].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-700", children: [
          /* @__PURE__ */ jsx(X, { className: "text-red-400 mt-1 shrink-0", size: 18 }),
          /* @__PURE__ */ jsx("span", { children: item })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-lg border-2 border-primary-blue p-8 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -mr-10 -mt-10 z-0" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 border-b border-blue-50 pb-4", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500 w-8 h-8" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-dark-blue", children: "أهلاً بك في البرنامج إذا:" })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: ["تريد حفظ المعلومات والأسماء والأرقام من أول مرة.", "تطمح للتفوق في دراستك أو عملك وتوفير ساعات من الجهد.", "ترغب في بناء ثقة بالنفس والتخلص من إحراج النسيان."].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-800 font-medium", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-green-100 rounded-full p-0.5 mt-0.5", children: /* @__PURE__ */ jsx(Check, { className: "text-green-600", size: 14 }) }),
            /* @__PURE__ */ jsx("span", { children: item })
          ] }, i)) })
        ] })
      ] })
    ] })
  ] }) });
};
const Transformation = () => {
  return /* @__PURE__ */ jsxs("section", { className: "grid grid-cols-1 md:grid-cols-2 min-h-[400px]", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white p-12 md:p-20 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-l border-gray-100", children: [
      /* @__PURE__ */ jsx(CloudFog, { size: 64, className: "text-gray-400 mb-6" }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-600 mb-4", children: "قبل البرنامج" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed max-w-sm", children: "تشتت ذهني، قلق دائم من نسيان المعلومات المهمة، استغراق ساعات طويلة في المذاكرة دون جدوى، وشعور بالإحباط من تراجع الأداء." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-primary-blue p-12 md:p-20 flex flex-col justify-center items-center text-center text-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [
        /* @__PURE__ */ jsx(Sun, { size: 64, className: "text-accent-yellow mb-6 animate-pulse" }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "بعد البرنامج" }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-100 leading-relaxed max-w-sm", children: "ذاكرة حديدية، سرعة في الحفظ والاسترجاع، ثقة عالية بالنفس، وقدرة على إنجاز المهام الدراسية والمهنية في وقت قياسي." })
      ] })
    ] })
  ] });
};
const TransformationRoadmap = () => {
  const steps = [
    {
      week: "الأسبوع 1",
      title: "الحضور المهني الفوري",
      icon: UserCheck,
      before: "القلق الجسدي قبل أي اجتماع مهم: 'هل سأنسى اسم العميل الرئيسي أو ذلك الرقم الحاسم؟' شعور داخلي بأنك تفقد حدتك المهنية.",
      after: "ستشعر بانتصاب قامتك وثقة تسري في جسدك عند دخول الاجتماعات. القدرة على استدعاء الأسماء والأرقام فوراً تمنحك حضوراً قيادياً يفرض الاحترام."
    },
    {
      week: "الأسبوع 2",
      title: "الهيكلة الذهنية واستعادة الوقت",
      icon: BrainCircuit,
      before: "الشعور بثقل في الرأس وغرق مستمر تحت طوفان المعلومات والتقارير. إرهاق يلاحقك حتى في وقت راحتك لأن عقلك لا يتوقف عن الدوران.",
      after: "ستشعر بهدوء داخلي عميق وصفاء ذهني. عقلك يصبح كأرشيف منظم، تصنف فيه أعقد الملفات المهنية وتغلقها، لتستعيد وقتك الخاص وطاقتك لعائلتك."
    },
    {
      week: "الأسبوع 3",
      title: "السرعة الإدراكية والطاقة الشبابية",
      icon: TrendingUp,
      before: "الشعور بأنك أبطأ في استيعاب المتغيرات الجديدة مقارنة بالمنافسين الأصغر سناً. خمول ذهني يجعلك تتجنب التحديات الفكرية المعقدة.",
      after: "ستشعر بطاقة ذهنية متجددة كأنك استعدت نشاطك قبل 10 سنوات. سرعة بديهة تجعلك الأسرع في تحليل المواقف واتخاذ القرارات الحاسمة بثقة."
    },
    {
      week: "الأسبوع 4",
      title: "السلطة التنفيذية والثقة المطلقة",
      icon: ShieldCheck,
      before: "التوتر الذي يسبق العروض التقديمية الكبرى، والاعتماد المهين على الملاحظات الورقية الذي يضعف صورتك كخبير أمام الإدارة العليا.",
      after: "ستشعر بقوة هادئة وسيطرة مطلقة. الوقوف أمام مجلس الإدارة أو العملاء بدون ورقة واحدة، وسرد الحقائق بدقة تجبر الجميع على الإنصات لك."
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-24 bg-white relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-20", children: [
      /* @__PURE__ */ jsx("span", { className: "text-accent-yellow font-bold tracking-wider uppercase text-sm mb-2 block", children: "المنهجية التنفيذية" }),
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl font-extrabold text-dark-blue mb-6 leading-tight", children: [
        "مسارك نحو ",
        /* @__PURE__ */ jsxs("span", { className: "text-primary-blue relative inline-block", children: [
          "الهيمنة الذهنية",
          /* @__PURE__ */ jsx("span", { className: "absolute bottom-1 left-0 w-full h-2 bg-accent-yellow/30 -z-10" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-500 max-w-2xl mx-auto", children: "رحلة استعادة السيطرة وإعادة شحن طاقتك الذهنية في 4 أسابيع مركزة" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden lg:block absolute top-[28rem] left-0 w-full h-1 bg-gray-100 -z-10" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: steps.map((step, idx) => /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col h-full group", children: [
      /* @__PURE__ */ jsx("div", { className: "hidden lg:flex absolute top-[11.5rem] left-1/2 transform -translate-x-1/2 justify-center items-center w-8 h-8 bg-white border-4 border-primary-blue rounded-full z-20 group-hover:border-accent-yellow transition-colors duration-300" }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 relative", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-blue to-dark-blue text-white rounded-2xl shadow-lg mb-6 transform group-hover:-translate-y-2 transition-transform duration-300 relative z-10", children: /* @__PURE__ */ jsx(step.icon, { size: 36, className: "text-accent-yellow" }) }),
        /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-accent-yellow uppercase tracking-widest mb-2", children: step.week }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-dark-blue px-2 leading-snug h-14 flex items-center justify-center", children: step.title })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-grow bg-light-gray/50 rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-xl border-r-4 border-red-300 shadow-sm", children: [
          /* @__PURE__ */ jsxs("h4", { className: "text-xs font-bold text-red-400 uppercase mb-2 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(XCircle, { size: 12 }),
            " قبل البرنامج"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: step.before })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "self-center text-gray-300", children: /* @__PURE__ */ jsx(ChevronDown, { size: 20 }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-white to-blue-50 p-4 rounded-xl border-r-4 border-green-500 shadow-sm flex-grow", children: [
          /* @__PURE__ */ jsxs("h4", { className: "text-xs font-bold text-green-600 uppercase mb-2 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(CheckCircle, { size: 12 }),
            " بعد البرنامج"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-800 font-bold leading-relaxed", children: step.after })
        ] })
      ] })
    ] }, idx)) })
  ] }) });
};
const SocialProof = ({ videoIds, imageUrls }) => {
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-dark-blue mb-4", children: "قصص نجاح حقيقية" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "لا تأخذ كلامنا مسلمات.. استمع لما يقوله مشتركونا" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0", children: videoIds.map((id, idx) => /* @__PURE__ */ jsx("div", { className: "w-[80vw] sm:w-[450px] flex-none snap-center", children: /* @__PURE__ */ jsx("div", { className: "bg-black rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative pt-[56.25%]", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full", children: /* @__PURE__ */ jsx(LiteYouTubeEmbed, { videoId: id, title: `Review ${idx}`, posterQuality: "hqdefault" }) }) }) }, idx)) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: imageUrls.map((url, idx) => /* @__PURE__ */ jsx("div", { className: "bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: url,
        alt: `Review Screenshot ${idx}`,
        className: "w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300",
        loading: "lazy",
        width: "300",
        height: "200"
      }
    ) }, idx)) })
  ] }) });
};
const ValueStack = () => {
  const items = [
    { icon: Video, title: "7 لقاءات مباشرة (Live)", value: "بقيمة 1400 DH" },
    { icon: Smartphone, title: "تطبيق ذاكرتي برو", value: "بقيمة 500 DH" },
    { icon: Users, title: "عضوية مجتمع النخبة", value: "بقيمة 300 DH" },
    { icon: Award, title: "شهادة إتمام معتمدة", value: "لا تقدر بثمن" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-dark-blue mb-6 border-b border-gray-100 pb-4", children: "ماذا يشمل العرض؟" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: items.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between group", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-blue-50 text-primary-blue p-2 rounded-lg group-hover:bg-primary-blue group-hover:text-white transition-colors", children: /* @__PURE__ */ jsx(item.icon, { size: 20 }) }),
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: item.title })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-accent-yellow bg-yellow-50 px-2 py-1 rounded hidden sm:block", children: item.value })
    ] }, idx)) })
  ] });
};
const Logistics = () => {
  const faqs = [
    { q: "هل الدورة مسجلة أم مباشرة؟", a: "الدورة تجمع بين الاثنين. دروس مسجلة عالية الجودة، ولقاءات مباشرة أسبوعية للمتابعة." },
    { q: "ماذا لو فاتني لقاء مباشر؟", a: "جميع اللقاءات المباشرة تسجل وترفع على المنصة لتشاهدها في أي وقت." },
    { q: "هل أحتاج مهارات سابقة؟", a: "لا، نبدأ معك من الصفر." }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "mt-12 space-y-4 max-w-3xl mx-auto px-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-center font-bold text-dark-blue text-xl mb-6", children: "أسئلة متكررة" }),
    faqs.map((f, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-lg p-4", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-bold text-primary-blue mb-2", children: f.q }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: f.a })
    ] }, i))
  ] });
};
const Offer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [status, setStatus] = useState("idle");
  const [validationError, setValidationError] = useState(null);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "phone") {
      setValidationError(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError(null);
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length > 10) {
      setValidationError("لقد أدخلت أرقاماً زائدة، يجب أن يكون الرقم 10 أرقام");
      return;
    }
    if (cleanPhone.length < 10) {
      setValidationError("رقم الهاتف غير مكتمل");
      return;
    }
    setStatus("submitting");
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const getCookie = (name) => {
      if (typeof document === "undefined") return "";
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift() || "";
      return "";
    };
    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");
    const intakeUrl = "https://adjoining-bee-105.eu-west-1.convex.site/intake/website"?.trim() || "https://adjoining-bee-105.eu-west-1.convex.site/intake/website";
    try {
      const response = await fetch(intakeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          // Form Data
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          form: "dakiraty_landing",
          // CAPI Payload
          event_name: "Lead",
          // Changed to Lead
          event_id: eventId,
          event_source_url: window.location.href,
          fbp,
          fbc,
          user_agent: navigator.userAgent,
          event_time: Math.floor(Date.now() / 1e3)
        })
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "" });
        if (window.fbq) {
          window.fbq("track", "Lead", {
            // Changed to Lead
            content_name: "Dakiraty Program",
            value: 600,
            currency: "MAD"
          }, { eventID: eventId });
        }
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };
  return /* @__PURE__ */ jsx("section", { id: "offer-section", className: "py-20 bg-dark-blue text-white relative", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-start", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: [
        "استثمر في عقلك اليوم ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-accent-yellow", children: "واحصد النتائج مدى الحياة" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-blue-200 text-lg mb-8 leading-relaxed", children: "انضم الآن واحصل على خصم خاص 33% لفترة محدودة. العرض يشمل جميع المزايا والهدايا المجانية وضمان استرداد كامل." }),
      /* @__PURE__ */ jsx(ValueStack, {}),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-400", children: [
        /* @__PURE__ */ jsx(ShieldCheck, { className: "text-green-400" }),
        /* @__PURE__ */ jsx("span", { children: "بياناتك آمنة 100% ومشفرة" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white text-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-accent-yellow", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-gray-500 font-medium", children: [
          "السعر العادي: ",
          /* @__PURE__ */ jsx("span", { className: "line-through", children: "1200 DH" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-5xl font-extrabold text-primary-blue mb-2", children: "600 DH" }),
        /* @__PURE__ */ jsx("p", { className: "text-green-600 font-bold bg-green-50 inline-block px-3 py-1 rounded-full text-sm", children: "وفر 600 DH اليوم" })
      ] }),
      status === "success" ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce", children: /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-600", size: 32 }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-dark-blue mb-2", children: "تم تسجيل طلبك بنجاح!" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "شكراً لك، سيتواصل معك فريق العمل قريباً لإتمام إجراءات التسجيل." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setStatus("idle"),
            className: "text-primary-blue font-bold underline hover:text-blue-700",
            children: "تسجيل شخص آخر"
          }
        )
      ] }) : /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "الاسم الكامل" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "name",
              value: formData.name,
              onChange: handleChange,
              required: true,
              className: "w-full bg-gray-100 text-black border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-blue outline-none transition-all placeholder-gray-500",
              placeholder: "أدخل اسمك الثلاثي"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "البريد الإلكتروني" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              name: "email",
              value: formData.email,
              onChange: handleChange,
              required: true,
              className: "w-full bg-gray-100 text-black border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-blue outline-none transition-all placeholder-gray-500",
              placeholder: "name@example.com"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "رقم الهاتف (واتساب)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              name: "phone",
              value: formData.phone,
              onChange: handleChange,
              required: true,
              className: `w-full bg-gray-100 text-black border ${validationError ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-blue outline-none transition-all placeholder-gray-500`,
              dir: "ltr",
              placeholder: "0632730020"
            }
          ),
          validationError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1 text-right font-bold", children: validationError })
        ] }),
        status === "error" && /* @__PURE__ */ jsx("div", { className: "bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center", children: "عذراً، حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: status === "submitting",
            className: "w-full bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold text-xl py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed",
            children: status === "submitting" ? /* @__PURE__ */ jsx("span", { children: "جاري الإرسال..." }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { children: "احجز مقعدي الآن" }),
              /* @__PURE__ */ jsx(ArrowLeft, { size: 20 })
            ] })
          }
        )
      ] }),
      status !== "success" && /* @__PURE__ */ jsxs("div", { className: "mt-6 text-center space-y-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "بالضغط على الزر أعلاه، أنت توافق على الشروط والأحكام" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2 opacity-50", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-5 bg-gray-300 rounded" }),
          /* @__PURE__ */ jsx("div", { className: "w-8 h-5 bg-gray-300 rounded" }),
          /* @__PURE__ */ jsx("div", { className: "w-8 h-5 bg-gray-300 rounded" })
        ] })
      ] })
    ] })
  ] }) }) });
};
const StickyCTA = () => {
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] md:hidden z-50", children: /* @__PURE__ */ jsx(
    Link,
    {
      to: "offer-section",
      smooth: true,
      duration: 800,
      className: "block w-full bg-primary-blue text-white text-center font-bold py-3 rounded-lg shadow-md active:bg-blue-800",
      children: "سجل الآن - 600 DH"
    }
  ) });
};
const DakiratyLanding = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = contentData.heroCustomThumbnail;
    link.fetchPriority = "high";
    document.head.appendChild(link);
    if (typeof window !== "undefined") {
      const w = window;
      if (!w.fbq) {
        let n;
        n = w.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!w._fbq) w._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = "2.0";
        n.queue = [];
        const t = document.createElement("script");
        t.async = true;
        t.src = "https://connect.facebook.net/en_US/fbevents.js";
        const s = document.getElementsByTagName("script")[0];
        if (s && s.parentNode) {
          s.parentNode.insertBefore(t, s);
        }
      }
      window.fbq("init", PIXEL_ID);
      window.fbq("track", "PageView");
    }
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);
  const dakiratyJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "برنامج ذاكرتي - تدريب الذاكرة الحديدية",
      description: "برنامج تدريبي مكثف لمدة 28 يوماً يجمع بين علم الأعصاب الحديث وتقنيات أبطال العالم في الذاكرة، لمضاعفة قدرتك على الحفظ والتركيز.",
      provider: {
        "@type": "EducationalOrganization",
        name: "كوتش أحمد",
        sameAs: "https://website-dakiraty.vercel.app"
      },
      inLanguage: "ar",
      educationalLevel: "Beginner to Advanced",
      teaches: ["تقنيات الذاكرة", "التركيز الذهني", "الحفظ السريع", "تقنيات M5", "الخرائط الذهنية"],
      offers: {
        "@type": "Offer",
        price: "600",
        priceCurrency: "MAD",
        availability: "https://schema.org/InStock",
        url: "https://website-dakiraty.vercel.app/dakiraty"
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: "PT28D",
        inLanguage: "ar"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "هل الدورة مسجلة أم مباشرة؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "الدورة تجمع بين الاثنين. دروس مسجلة عالية الجودة، ولقاءات مباشرة أسبوعية للمتابعة."
          }
        },
        {
          "@type": "Question",
          name: "ماذا لو فاتني لقاء مباشر؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "جميع اللقاءات المباشرة تسجل وترفع على المنصة لتشاهدها في أي وقت."
          }
        },
        {
          "@type": "Question",
          name: "هل أحتاج مهارات سابقة؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "لا، نبدأ معك من الصفر."
          }
        }
      ]
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen font-sans", dir: "rtl", children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "برنامج ذاكرتي | دورة تقوية الذاكرة في 28 يوم - كوتش أحمد",
        description: "انضم لبرنامج ذاكرتي الحديدية مع كوتش أحمد. منهجية علمية متكاملة لتقوية الذاكرة وتضاعف سرعة الحفظ 3 أضعاف في 28 يوم. لقاءات مباشرة، تطبيق ذكي، وضمان استرداد 7 أيام. السعر 600 درهم.",
        keywords: "برنامج ذاكرتي, دورة الذاكرة, تقوية الذاكرة, تدريب الذاكرة المغرب, كوتش أحمد ذاكرتي, تقنيات الحفظ السريع, M5 تقنية, دورة الذاكرة 28 يوم",
        path: "/dakiraty",
        ogType: "product",
        jsonLd: dakiratyJsonLd
      }
    ),
    /* @__PURE__ */ jsx(Hero, { videoId: contentData.heroVideoId }),
    /* @__PURE__ */ jsx(Authority, { imageUrl: contentData.authorityImage }),
    /* @__PURE__ */ jsx(FilterSection, {}),
    /* @__PURE__ */ jsx(Transformation, {}),
    /* @__PURE__ */ jsx(TransformationRoadmap, {}),
    /* @__PURE__ */ jsx(
      SocialProof,
      {
        videoIds: contentData.proofVideoIds,
        imageUrls: contentData.proofImageUrls
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "bg-gray-50 py-16", children: /* @__PURE__ */ jsx(Logistics, {}) }),
    /* @__PURE__ */ jsx(Offer, {}),
    /* @__PURE__ */ jsx(StickyCTA, {})
  ] });
};

export { DakiratyLanding as default };
