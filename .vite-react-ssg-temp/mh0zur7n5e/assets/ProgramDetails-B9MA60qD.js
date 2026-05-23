import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Heart, Users, Award, ShieldCheck, Brain, XCircle, X, CheckCircle, Check, CloudFog, Sun, Star, Video, Smartphone, MessageCircle, ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react';
import { Link } from 'react-scroll';
import { L as LiteYouTubeEmbed } from './LiteYouTubeEmbed-CWqo_Vmb.js';
import { S as Seo } from './Seo-RAKbgilb.js';
import 'vite-react-ssg';

const DAKIRATY_PIXEL_ID = "1971224763824220";
const QURAN_PIXEL_ID = "1435549911489261";
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-xl overflow-hidden", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-white transition-colors text-right",
        children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-lg text-primary-blue", children: question }),
          isOpen ? /* @__PURE__ */ jsx(ChevronUp, { className: "text-gray-400" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "text-gray-400" })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "p-5 bg-white text-gray-600 border-t border-gray-100 leading-relaxed", children: answer })
  ] });
};
const ProgramDetails = ({ type }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle");
  const [validationError, setValidationError] = useState(null);
  const currentPixelId = type === "quran" ? QURAN_PIXEL_ID : DAKIRATY_PIXEL_ID;
  useEffect(() => {
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
      window.fbq("init", currentPixelId);
      window.fbq("track", "PageView");
    }
  }, [currentPixelId]);
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setValidationError(null);
  };
  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setValidationError(null);
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length > 10) {
      setValidationError("لقد أدخلت أرقاماً زائدة، يجب أن يكون الرقم 10 أرقام");
      return;
    }
    if (cleanPhone.length < 10) {
      setValidationError("رقم الهاتف غير مكتمل");
      return;
    }
    setStatus("submitting");
    const intakeUrl = "https://adjoining-bee-105.eu-west-1.convex.site/intake/website"?.trim() || "https://adjoining-bee-105.eu-west-1.convex.site/intake/website";
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
          phone,
          program: type,
          form: type === "quran" ? "quran_landing" : "program_details",
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
        setFormData({ name: "", email: "" });
        setPhone("");
        if (window.fbq) {
          window.fbq("track", "Lead", {
            // Changed to Lead
            content_name: type === "quran" ? "Quran Program" : "Program",
            value: type === "quran" ? 200 : 0,
            currency: "MAD"
          }, { eventID: eventId });
        }
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };
  const data = type === "dakiraty" ? {
    title: "برنامج ذاكرتي الحديدية",
    subtitle: "البرنامج الأول على الصعيد العربي الذي يجمع بين علم الأعصاب وتقنيات أبطال الذاكرة.",
    price: "600 DH",
    originalPrice: "1200 DH",
    features: ["7 لقاءات مباشرة وتفاعلية", "دخول مدى الحياة لمحتوى الدورة", "متابعة فردية مع المدرب", "شهادة إتمام معتمدة", "ضمان استرداد الأموال"],
    curriculum: [
      { title: "الأسبوع الأول: الأساسيات", desc: "فهم آلية عمل الذاكرة وكيفية تجهيز العقل للحفظ.", icon: "🧠" },
      { title: "الأسبوع الثاني: التقنيات", desc: "تعلم استراتيجيات الربط والقصة والخرائط الذهنية.", icon: "🔗" },
      { title: "الأسبوع الثالث: التطبيق", desc: "تطبيقات عملية على حفظ الأسماء، الأرقام، والكتب.", icon: "📚" },
      { title: "الأسبوع الرابع: الاحتراف", desc: "الوصول لمرحلة الحفظ المتقن والسريع ومراجعة المكتسبات.", icon: "🏆" }
    ],
    faqs: [
      { question: "هل البرنامج مناسب للموظفين المشغولين؟", answer: "نعم، تم تصميم البرنامج ليناسب جدول الموظفين وأصحاب الأعمال، حيث يحتاج فقط 15-20 دقيقة يومياً." },
      { question: "كيف تتم متابعة المتدربين؟", answer: "تتم المتابعة عبر مجموعة واتساب خاصة وجلسات زووم أسبوعية." },
      { question: "ماذا لو لم أستفد من الدورة؟", answer: "نقدم ضمان استرداد كامل المبلغ خلال أول 7 أيام إذا لم تكن راضياً." }
    ],
    heroImage: "https://picsum.photos/id/1073/600/400"} : {
    title: "اكتشف أسرار الحفظ باستخدام تقنيات أبطال العالم للذاكرة",
    subtitle: "بـ 200 درهم فقط وخلال 3 أيام.. تعلّم كيف تحفظ القرآن الكريم بسهولة وثبات.",
    price: "200 DH",
    originalPrice: "",
    // No strike-through needed for new copy
    features: ["فهم الذاكرة وكسر الحواجز", "تطبيق تقنيات أبطال العالم (M5)", "طرق تثبيت المحفوظ القديم", "شهادة إلكترونية معتمدة"],
    // Replaced by Testimonials for Quran
    curriculum: [
      { title: "اليوم الأول", desc: "كسر الحواجز أمام الحفظ الفعال: فهم الذاكرة، تدريب العقل، وورشة تطبيقية لتقنيات أبطال الذاكرة.", icon: "01" },
      { title: "اليوم الثاني", desc: "ورشة تطبيقية جماعية (تقنيات M5): تطبيق عملي على آيات القرآن وتفاعل جماعي.", icon: "02" },
      { title: "اليوم الثالث", desc: "طرق تثبيت المحفوظ القديم: كيفية التخزين في الذاكرة طويلة الأمد وجلسة مناقشة.", icon: "03" }
    ],
    faqs: [
      { question: "تكلفة البرنامج غالية (200 درهم)؟", answer: "أقدر وجهة نظرك، لكن فكر في هذا كاستثمار في نفسك. خلال 3 أيام ستكتسب مهارات تغير حياتك. النتائج تفوق التكلفة بكثير، وهو ما أكده خريجونا السابقون." },
      { question: "هل التداريب اليومية مباشرة ولها وقت محدد؟", answer: "التداريب اليومية فردية وليست محددة بوقت معين، مما يمنحك مرونة كاملة." },
      { question: "هل يناسب البرنامج كبار السن؟", answer: 'نعم! الذاكرة لا عمر لها. تحتاج فقط لتعلم "لغة الذاكرة" والتدريب، والبرنامج مصمم للجميع.' },
      { question: "هل يحصل المتدرب على شهادة؟", answer: "نعم، يتوصل المشارك بشهادة إلكترونية مسلمة من البطولة الوطنية للذاكرة." }
    ],
    heroImage: "https://picsum.photos/id/1073/600/400"};
  const quranJsonLd = type === "quran" ? [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "دورة الذاكرة والقرآن الكريم",
      description: "دورة مكثفة لمدة 3 أيام لتعلم تقنيات أبطال العالم في حفظ القرآن الكريم. مداخيل الدورة كاملة لدعم أيتام جمعية ابتسم.",
      provider: {
        "@type": "EducationalOrganization",
        name: "كوتش أحمد",
        sameAs: "https://website-dakiraty.vercel.app"
      },
      inLanguage: "ar",
      teaches: ["حفظ القرآن الكريم", "تقنيات M5", "تثبيت الحفظ", "مراجعة المحفوظ"],
      offers: {
        "@type": "Offer",
        price: "200",
        priceCurrency: "MAD",
        availability: "https://schema.org/InStock",
        url: "https://website-dakiraty.vercel.app/quran"
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: "PT3D",
        inLanguage: "ar"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer }
      }))
    }
  ] : void 0;
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 min-h-screen pb-20 md:pb-0", children: [
    type === "quran" && /* @__PURE__ */ jsx(
      Seo,
      {
        title: "دورة حفظ القرآن الكريم في 3 أيام بتقنيات أبطال الذاكرة | كوتش أحمد",
        description: "تعلم كيف تحفظ القرآن الكريم بسهولة وثبات في 3 أيام بتقنية M5 العالمية. دورة مع المدرب أحمد بـ 200 درهم فقط - مداخيل الدورة كلها لدعم أيتام جمعية ابتسم.",
        keywords: "حفظ القرآن الكريم, دورة حفظ القرآن, تقنيات حفظ القرآن, تثبيت حفظ القرآن, طريقة حفظ القرآن السريع, M5 قرآن, كوتش أحمد قرآن",
        path: "/quran",
        ogType: "product",
        jsonLd: quranJsonLd
      }
    ),
    type === "quran" && /* @__PURE__ */ jsx("div", { className: "bg-red-50 text-red-800 px-4 py-3 text-center border-b border-red-100 sticky top-20 z-40", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 font-bold text-sm md:text-base animate-pulse", children: [
      /* @__PURE__ */ jsx(Heart, { className: "fill-red-500 text-red-500", size: 20 }),
      /* @__PURE__ */ jsx("span", { children: "تنبيه: مداخيل الدورة موجهة كلها لدعم أيتام جمعية ابتسم" })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "bg-primary-blue text-white py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: `flex flex-col ${type === "quran" ? "justify-center" : "md:flex-row"} items-center gap-12`, children: [
        type !== "quran" && /* @__PURE__ */ jsx("div", { className: "md:w-1/2 flex justify-center order-2 md:order-2", children: /* @__PURE__ */ jsxs("div", { className: "relative group perspective-1000 w-full max-w-md", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: data.heroImage,
              alt: data.title,
              className: "rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-y-12 transition-transform duration-500 group-hover:rotate-y-0 w-full border-4 border-white/20",
              width: "600",
              height: "400",
              loading: "eager"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute -top-4 -right-4 bg-accent-yellow text-dark-blue font-bold px-6 py-2 rounded-full shadow-lg animate-bounce z-20", children: "الدفعة القادمة قريباً" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: `${type === "quran" ? "w-full text-center max-w-4xl mx-auto" : "md:w-1/2 text-right"} order-1 md:order-1 space-y-6`, children: [
          /* @__PURE__ */ jsx("span", { className: "inline-block bg-blue-800 text-blue-200 px-4 py-1 rounded-full text-sm font-semibold", children: type === "quran" ? "دورة الذاكرة والقرآن الكريم" : "برنامج تدريبي متكامل" }),
          type === "dakiraty" ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-extrabold leading-tight", children: data.title }),
            /* @__PURE__ */ jsxs("p", { className: "text-xl text-blue-100 font-light leading-relaxed", children: [
              "البرنامج الأول على الصعيد العربي الذي يجمع بين ",
              /* @__PURE__ */ jsx("span", { className: "text-accent-yellow font-bold border-b-2 border-accent-yellow/50", children: "علم الأعصاب" }),
              " وتقنيات ",
              /* @__PURE__ */ jsx("span", { className: "text-accent-yellow font-bold border-b-2 border-accent-yellow/50", children: "أبطال الذاكرة" }),
              "، مع مدرب البطولة الوطنية للذاكرة."
            ] })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-extrabold leading-tight", children: data.title }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-blue-100 font-light", children: data.subtitle })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `flex flex-col sm:flex-row gap-4 pt-4 ${type === "quran" ? "justify-center" : ""}`, children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: "registration-form",
              smooth: true,
              duration: 800,
              offset: -100,
              className: "cursor-pointer bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold py-4 px-8 rounded-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsx("span", { children: type === "quran" ? "أريد الإنضمام لدورة الذاكرة والقرآن" : "احجز مقعدك الآن" }),
                /* @__PURE__ */ jsx("span", { className: "bg-white/20 px-2 py-0.5 rounded text-sm", children: data.price })
              ]
            }
          ) }),
          type === "dakiraty" ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-sm text-blue-200 pt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 font-bold text-accent-yellow", children: [
              /* @__PURE__ */ jsx(Users, { size: 16 }),
              " +3000 متدرب"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Award, { size: 16 }),
              " شهادة معتمدة"
            ] })
          ] }) : /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-4 text-sm text-blue-200 pt-2 ${type === "quran" ? "justify-center" : ""}`, children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(ShieldCheck, { size: 16 }),
              " ضمان استرداد الأموال"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Award, { size: 16 }),
              " شهادة معتمدة"
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    type === "dakiraty" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("section", { className: "bg-primary-blue pb-20 -mt-1 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-dark-blue p-2 rounded-3xl shadow-2xl", children: /* @__PURE__ */ jsx("div", { className: "relative pt-[56.25%] rounded-2xl overflow-hidden bg-black", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full", children: /* @__PURE__ */ jsx(LiteYouTubeEmbed, { videoId: "dQw4w9WgXcQ", title: "Course Introduction" }) }) }) }) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 bg-white relative", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-primary-blue" }),
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-blue-50 text-primary-blue rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(Brain, { size: 40 }) }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-primary-blue mb-4", children: [
          "كابوس ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "مشاكل الذاكرة" }),
          " وتراجع الأداء"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto", children: [
          "هل تشعر ",
          /* @__PURE__ */ jsx("span", { className: "font-bold text-dark-blue", children: "بضباب ذهني دائم" }),
          "؟ الخوف من تراجع القدرات العقلية وفقدان السيطرة على المعلومات هو ",
          /* @__PURE__ */ jsx("span", { className: "font-bold text-dark-blue", children: "كابوس صامت" }),
          " يهدد مستقبلك المهني."
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 bg-light-gray", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-lg border-2 border-primary-blue p-8 md:p-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6 border-b border-gray-100 pb-4", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "text-red-500 w-10 h-10" }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-dark-blue", children: "من فضلك.. أغلق هذه الصفحة فوراً إذا:" })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: [
            'كنت تبحث عن "عصا سحرية" ولا تريد تخصيص 15 دقيقة يومياً للتدريب.',
            'كنت تعتقد أن الاستثمار في صحة عقلك "مصاريف زائدة".',
            "كنت تقبل بضياع فرصك المهنية بسبب النسيان."
          ].map((item, idx) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(X, { className: "text-red-500 mt-1 flex-shrink-0", size: 20 }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700 text-lg font-medium", children: item })
          ] }, idx)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-lg border-2 border-accent-yellow p-8 md:p-10 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-bl-full -mr-12 -mt-12 z-0" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6 border-b border-gray-100 pb-4", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500 w-10 h-10" }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-dark-blue", children: "ولكن.. أهلاً بك في النخبة إذا:" })
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx(Check, { className: "text-green-600", size: 16 }) }),
                /* @__PURE__ */ jsxs("span", { className: "text-gray-700 text-lg font-medium", children: [
                  "كنت من يريد بناء ",
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-primary-blue", children: "قدرات غير محدودة" }),
                  " من قوة التذكر لاستخدامها في عملك وحياتك."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx(Check, { className: "text-green-600", size: 16 }) }),
                /* @__PURE__ */ jsxs("span", { className: "text-gray-700 text-lg font-medium", children: [
                  "كنت ممن يطمح ",
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-primary-blue", children: "للتميز المهني" }),
                  " وليس مجرد النجاح العادي."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx(Check, { className: "text-green-600", size: 16 }) }),
                /* @__PURE__ */ jsxs("span", { className: "text-gray-700 text-lg font-medium", children: [
                  "كنت تريد امتلاك ",
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-primary-blue", children: "ذاكرة حديدية" }),
                  " تخدمك مدى الحياة."
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "grid grid-cols-1 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50/50 p-12 md:p-20 text-center flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-gray-200", children: [
          /* @__PURE__ */ jsx(CloudFog, { size: 64, className: "text-gray-400 mb-6" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-500 mb-4", children: "الآن: ضباب، فوضى، وإحراج" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-lg max-w-sm", children: [
            "تشتت دائم، إحراج اجتماعي بسبب ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-700", children: "نسيان الأسماء والمعلومات المهمة" }),
            "، قلق وفوضى عارمة مع كثرة المعلومات المتدفقة يومياً."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-primary-blue p-12 md:p-20 text-center flex flex-col items-center justify-center text-white relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [
            /* @__PURE__ */ jsx(Sun, { size: 64, className: "text-accent-yellow mb-6 animate-pulse" }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "بعد البرنامج: صفاء، ثقة، وإنجاز" }),
            /* @__PURE__ */ jsxs("p", { className: "text-blue-100 text-lg max-w-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-accent-yellow font-bold", children: "ذاكرة حادة كالموس" }),
              "، ثقة عالية بالنفس في الاجتماعات والمواقف الاجتماعية، وإمكانية إنجاز مهام الحفظ والمراجعة في ",
              /* @__PURE__ */ jsx("span", { className: "text-accent-yellow font-bold", children: "20 دقيقة فقط" }),
              " بدلاً من ساعات."
            ] })
          ] })
        ] })
      ] })
    ] }),
    type === "quran" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("section", { className: "bg-primary-blue pb-20 -mt-1 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsx("div", { className: "text-center mb-8", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "شاهد الفيديو واكتشف تقنيات أبطال العالم" }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-dark-blue p-2 rounded-3xl shadow-2xl", children: /* @__PURE__ */ jsx("div", { className: "relative pt-[56.25%] rounded-2xl overflow-hidden bg-black", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full", children: /* @__PURE__ */ jsx(LiteYouTubeEmbed, { videoId: "I3jYprUogGI", title: "Quran Program Video" }) }) }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-accent-yellow mb-6 flex justify-center gap-1", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsx(Star, { fill: "currentColor", size: 24 }, i)) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold text-dark-blue mb-8", children: '"كنت أظن أنني لا أستطيع حفظ القرآن..."' }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50/50 p-8 md:p-12 rounded-[2rem] relative border border-blue-100", children: [
          /* @__PURE__ */ jsx("div", { className: "text-6xl text-primary-blue absolute -top-8 right-8 opacity-10 font-serif", children: '"' }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg md:text-xl text-gray-700 leading-relaxed italic mb-8 font-light", children: [
            '"كنتُ أحلم بحفظ القرآن الكريم منذ سنوات، لكنني كنت أواجه صعوبة في التركيز والتذكر... ظننت أن المشكلة فيّ.',
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "ثم اكتشفت دورة ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-primary-blue not-italic", children: "'الذاكرة والقرآن الكريم'" }),
            ' مع المدرب أحمد. خلال 3 أيام فقط، تغيرت نظرتي تماماً. تعلمت كيف أعيد ضبط بوصلة ذهني... وأدركت أن الحفظ ليس مجرد تكرار بل هو منهجية."'
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gray-200 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: "https://picsum.photos/id/447/100/100", alt: "Student", loading: "lazy", width: "48", height: "48" }) }),
            /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsx("div", { className: "font-bold text-dark-blue", children: "أحد خريجي الدورة" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: "الدفعة 15" })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-light-gray relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-dark-blue", children: type === "quran" ? "ما الذي ستحصل عليه خلال 3 أيام؟" : "رحلة التعلم" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2", children: "خطة عملية مدروسة خطوة بخطوة" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-blue via-accent-yellow to-primary-blue rounded-full" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-12", children: data.curriculum.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between w-full ${idx % 2 === 0 ? "flex-row-reverse" : ""}`, children: [
          /* @__PURE__ */ jsx("div", { className: "w-5/12" }),
          /* @__PURE__ */ jsx("div", { className: "z-10 bg-white border-4 border-accent-yellow rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold shadow-lg text-primary-blue", children: item.icon }),
          /* @__PURE__ */ jsxs("div", { className: "w-5/12 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-primary-blue", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-dark-blue mb-2", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: item.desc })
          ] })
        ] }, idx)) })
      ] })
    ] }) }),
    type === "quran" && /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:w-1/3 relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-accent-yellow rounded-3xl transform rotate-6 opacity-20" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://drive.google.com/thumbnail?id=1G9GlcTc1-8tEuxDeDIgftISbVivRwUaD&sz=w1000",
            className: "rounded-3xl shadow-2xl w-full object-cover relative z-10",
            alt: "Coach Ahmed",
            width: "400",
            height: "500",
            loading: "lazy"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:w-2/3", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-dark-blue mb-6", children: "من هو مقدم الدورة؟" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-primary-blue font-medium mb-8", children: "المدرب أحمد: شغوف بمرافقة الآخرين في رحلة التميز." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-6", children: [
          "انطلق في التدريب الجاد منذ 2003.",
          "مشاركة مشرفة مع المنتخب المغربي للذاكرة 2015.",
          "صاحب رقم قياسي في بطولة إفريقيا للذاكرة 2020.",
          "درب أكثر من 3000 متدرب في الذاكرة والقرآن."
        ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500 shrink-0 mt-1", size: 20 }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-medium leading-relaxed", children: item })
        ] }, i)) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-dark-blue text-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-start", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8", children: "ماذا ستحصل عند الاشتراك؟" }),
        type === "dakiraty" ? /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white text-gray-800 p-6 rounded-2xl flex items-center gap-6 shadow-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-100 p-4 rounded-xl text-primary-blue", children: /* @__PURE__ */ jsx(Video, { size: 32 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl mb-1 text-primary-blue", children: "7 لقاءات مباشرة" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "(Live Coaching) مرتين أسبوعياً مع المدرب." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white text-gray-800 p-6 rounded-2xl flex items-center gap-6 shadow-lg relative border-2 border-accent-yellow", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-6 bg-accent-yellow text-dark-blue text-xs font-bold px-3 py-1 rounded-b-lg", children: "حصري" }),
            /* @__PURE__ */ jsx("div", { className: "bg-blue-100 p-4 rounded-xl text-primary-blue", children: /* @__PURE__ */ jsx(Smartphone, { size: 32 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl mb-1 text-primary-blue", children: "التطبيق الذكي (هدية)" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "أول تطبيق في الوطن العربي لتدريب الذاكرة." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white text-gray-800 p-6 rounded-2xl flex items-center gap-6 shadow-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-100 p-4 rounded-xl text-primary-blue", children: /* @__PURE__ */ jsx(Users, { size: 32 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl mb-1 text-primary-blue", children: "مجتمع النخبة" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "بيئة محفزة للنمو تستمر معك حتى بعد نهاية الـ 28 يوماً." })
            ] })
          ] })
        ] }) : (
          /* Original Simple List for Quran */
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            data.features.map((feature, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-accent-yellow text-dark-blue p-1 rounded-full", children: /* @__PURE__ */ jsx(Check, { size: 20 }) }),
              /* @__PURE__ */ jsx("span", { className: "text-lg", children: feature })
            ] }, idx)),
            /* @__PURE__ */ jsxs("div", { className: "bg-red-500/20 border border-red-500/30 p-4 rounded-xl flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Heart, { className: "text-red-400 fill-red-400" }),
              /* @__PURE__ */ jsx("span", { children: "مداخيل الدورة كاملة لدعم أيتام جمعية ابتسم" })
            ] })
          ] })
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:sticky lg:top-24", children: /* @__PURE__ */ jsxs("div", { className: "bg-white text-gray-800 rounded-3xl p-8 shadow-2xl border-4 border-accent-yellow transform lg:-rotate-1 hover:rotate-0 transition-transform duration-300", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
          type === "dakiraty" && /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-semibold mb-2", children: "استثمارك في نفسك" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-5xl font-extrabold text-primary-blue", children: data.price }),
            data.originalPrice && /* @__PURE__ */ jsx("span", { className: "text-xl text-gray-400 line-through decoration-red-500 decoration-2", children: data.originalPrice })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { id: "registration-form", className: "bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-center font-bold text-dark-blue mb-4", children: [
            type === "dakiraty" ? "جاهز لمضاعفة قدراتك العقلية؟" : "أنت على بعد خطوة واحدة...",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-primary-blue", children: type === "quran" ? "سجل الآن وابدأ رحلتك" : "احجز مقعدك الآن" })
          ] }),
          status === "success" ? /* @__PURE__ */ jsxs("div", { className: "text-center py-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce", children: /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-600", size: 28 }) }),
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-dark-blue mb-2", children: "تم استلام طلبك!" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "شكراً لك، سيتواصل معك فريقنا قريباً لإتمام التسجيل." }),
            /* @__PURE__ */ jsx("button", { onClick: () => setStatus("idle"), className: "mt-4 text-primary-blue underline text-sm", children: "تسجيل شخص آخر" })
          ] }) : /* @__PURE__ */ jsxs("form", { className: "space-y-3", onSubmit: handleFormSubmit, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1 text-right", children: "الاسم الكامل *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "name",
                  value: formData.name,
                  onChange: handleInputChange,
                  required: true,
                  className: "w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-black focus:ring-2 focus:ring-accent-yellow focus:border-accent-yellow outline-none text-right placeholder-gray-500",
                  placeholder: "أدخل اسمك هنا"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1 text-right", children: "رقم الهاتف (واتساب) *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  value: phone,
                  onChange: handlePhoneChange,
                  required: true,
                  className: `w-full p-3 rounded-lg border bg-gray-100 text-black ${validationError ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-accent-yellow focus:border-accent-yellow outline-none text-right placeholder-gray-500`,
                  placeholder: "0632730020",
                  dir: "ltr"
                }
              ),
              validationError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1 text-right font-bold", children: validationError })
            ] }),
            type === "quran" && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1 text-right", children: "البريد الإلكتروني *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  name: "email",
                  value: formData.email,
                  onChange: handleInputChange,
                  required: true,
                  className: "w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-black focus:ring-2 focus:ring-accent-yellow focus:border-accent-yellow outline-none text-right placeholder-gray-500",
                  placeholder: "email@example.com",
                  dir: "ltr"
                }
              )
            ] }),
            status === "error" && /* @__PURE__ */ jsx("div", { className: "bg-red-50 text-red-600 text-xs p-2 rounded text-center", children: "عذراً، حدث خطأ. حاول مرة أخرى." }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: status === "submitting",
                className: "w-full bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold py-4 rounded-xl text-lg shadow-lg mt-2 transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed",
                children: status === "submitting" ? "جاري الإرسال..." : type === "quran" ? `تأكيد الحجز (${data.price})` : "إرسال الطلب وحجز المقعد"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-center", children: type === "dakiraty" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-2", children: "عرض لفترة محدودة" }),
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { size: 14 }),
            " 7 أيام ضمان استرداد الأموال"
          ] })
        ] }) : /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { size: 14 }),
          "بياناتك آمنة 100% ولن يتم مشاركتها"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 pt-6 border-t border-gray-100 text-center", children: /* @__PURE__ */ jsxs("a", { href: "#", className: "inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors", children: [
          /* @__PURE__ */ jsx(MessageCircle, { size: 18 }),
          /* @__PURE__ */ jsx("span", { children: "للاستفسار قبل التسجيل: تواصل معنا عبر الواتساب" })
        ] }) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white mb-20 md:mb-0", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-center text-dark-blue mb-12", children: "الأسئلة الشائعة" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: data.faqs.map((faq, idx) => /* @__PURE__ */ jsx(FaqItem, { question: faq.question, answer: faq.answer }, idx)) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-0 left-0 right-0 p-4 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden z-50 border-t border-gray-100", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: "registration-form",
        smooth: true,
        duration: 800,
        offset: -100,
        className: "cursor-pointer w-full bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 animate-pulse",
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { size: 20 }),
          /* @__PURE__ */ jsx("span", { children: type === "quran" ? "احجز الآن بـ 200 درهم" : "اضغط هنا لحجز مقعدك الآن" })
        ]
      }
    ) })
  ] });
};

export { ProgramDetails as default };
