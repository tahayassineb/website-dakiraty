import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, ArrowRight, Check, MessageCircle, Phone, ShieldCheck, Users, Sparkles, CheckCircle2, ChevronUp, ChevronDown, GraduationCap } from 'lucide-react';
import { S as Seo } from './Seo-RAKbgilb.js';
import 'vite-react-ssg';

function OnboardingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    parentName: "",
    whatsapp: "",
    childName: "",
    childAge: "",
    problem: "",
    contactMethod: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!isOpen) return null;
  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };
  const handleSubmit = async (contactMethod) => {
    const finalData = { ...formData, contactMethod };
    setFormData(finalData);
    setIsSubmitting(true);
    const getCookie = (name) => {
      if (typeof document === "undefined") return "";
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift() || "";
      return "";
    };
    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const intakeUrl = "https://adjoining-bee-105.eu-west-1.convex.site/intake/website"?.trim() || "https://adjoining-bee-105.eu-west-1.convex.site/intake/website";
    try {
      await fetch(intakeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          // Map to standard fields while keeping specific ones
          name: finalData.parentName,
          phone: finalData.whatsapp,
          parentName: finalData.parentName,
          whatsapp: finalData.whatsapp,
          childName: finalData.childName,
          childAge: finalData.childAge,
          problem: finalData.problem,
          contactMethod: finalData.contactMethod,
          // Meta CAPI Fields
          program: "kids_memory",
          form: "kids_memory_landing",
          event_name: "Lead",
          event_id: eventId,
          event_source_url: window.location.href,
          user_agent: navigator.userAgent,
          event_time: Math.floor(Date.now() / 1e3),
          fbp,
          fbc
        })
      });
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", { eventID: eventId });
      }
      setStep(6);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("وقع شي مشكل، عاود حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCloseAndReset = () => {
    onClose();
    setTimeout(() => {
      setStep(0);
      setFormData({
        parentName: "",
        whatsapp: "",
        childName: "",
        childAge: "",
        problem: "",
        contactMethod: ""
      });
    }, 300);
  };
  const renderStep = () => {
    switch (step) {
      case 0:
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold text-dark-blue text-center", children: "أهلا بك! شنو الاسم الكريم ديالك؟" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              autoFocus: true,
              value: formData.parentName,
              onChange: (e) => setFormData({ ...formData, parentName: e.target.value }),
              placeholder: "الاسم الكامل ديالك",
              className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-xl text-gray-800 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 transition-all text-center",
              onKeyDown: (e) => e.key === "Enter" && formData.parentName && handleNext()
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleNext,
              disabled: !formData.parentName,
              className: "w-full bg-[#3B82F6] hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2",
              children: [
                "التالي ",
                /* @__PURE__ */ jsx(ArrowRight, { size: 20, className: "rotate-180" })
              ]
            }
          )
        ] });
      case 1:
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-2xl md:text-3xl font-bold text-dark-blue text-center", children: [
            "متشرفين سي/للا ",
            formData.parentName,
            "! شنو رقم الواتساب ديالك باش نتواصلو معاك؟"
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              autoFocus: true,
              dir: "ltr",
              value: formData.whatsapp,
              onChange: (e) => setFormData({ ...formData, whatsapp: e.target.value }),
              placeholder: "06XXXXXXXX",
              className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-xl text-gray-800 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 transition-all text-center",
              onKeyDown: (e) => e.key === "Enter" && formData.whatsapp && handleNext()
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleNext,
              disabled: !formData.whatsapp,
              className: "w-full bg-[#3B82F6] hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2",
              children: [
                "التالي ",
                /* @__PURE__ */ jsx(ArrowRight, { size: 20, className: "rotate-180" })
              ]
            }
          )
        ] });
      case 2:
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold text-dark-blue text-center", children: "شنو اسم ولدك ولا بنتك؟" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              autoFocus: true,
              value: formData.childName,
              onChange: (e) => setFormData({ ...formData, childName: e.target.value }),
              placeholder: "اسم الطفل",
              className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-xl text-gray-800 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 transition-all text-center",
              onKeyDown: (e) => e.key === "Enter" && formData.childName && handleNext()
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleNext,
              disabled: !formData.childName,
              className: "w-full bg-[#3B82F6] hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2",
              children: [
                "التالي ",
                /* @__PURE__ */ jsx(ArrowRight, { size: 20, className: "rotate-180" })
              ]
            }
          )
        ] });
      case 3:
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold text-dark-blue text-center", children: "شحال فعمرو(ها)؟" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              autoFocus: true,
              value: formData.childAge,
              onChange: (e) => setFormData({ ...formData, childAge: e.target.value }),
              placeholder: "مثال: 10 سنين",
              className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-xl text-gray-800 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 transition-all text-center",
              onKeyDown: (e) => e.key === "Enter" && formData.childAge && handleNext()
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleNext,
              disabled: !formData.childAge,
              className: "w-full bg-[#3B82F6] hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2",
              children: [
                "التالي ",
                /* @__PURE__ */ jsx(ArrowRight, { size: 20, className: "rotate-180" })
              ]
            }
          )
        ] });
      case 4:
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-2xl md:text-3xl font-bold text-dark-blue text-center", children: [
            "شنو هو أكبر مشكل كيعاني منو ",
            formData.childName,
            " فالدراسة؟"
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              autoFocus: true,
              rows: 4,
              value: formData.problem,
              onChange: (e) => setFormData({ ...formData, problem: e.target.value }),
              placeholder: "مثال: كينسى دغيا، ماكيركزش...",
              className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-xl text-gray-800 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 transition-all resize-none text-right"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleNext,
              disabled: !formData.problem,
              className: "w-full bg-[#3B82F6] hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2",
              children: [
                "التالي ",
                /* @__PURE__ */ jsx(ArrowRight, { size: 20, className: "rotate-180" })
              ]
            }
          )
        ] });
      case 5:
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold text-dark-blue text-center", children: "كيفاش تفضل نتواصلو معاك؟" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-5 rounded-2xl border border-blue-100 text-center space-y-3", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-gray-800 font-medium leading-relaxed", children: [
              "هاد الاستشارة ",
              /* @__PURE__ */ jsx("span", { className: "font-bold text-[#3B82F6]", children: "مجانية 100% وما غتخلص والو" }),
              "."
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-sm leading-relaxed", children: [
              "الفريق ديالنا غادي يتواصل معاك باش نفهمو المشكل ديال ",
              formData.childName,
              " مزيان، وإلى بانت لينا الحالة ديالو مناسبة للبرنامج ديالنا، ديك الساعة نقدرو نخدمو مجموعين."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleSubmit("whatsapp"),
                disabled: isSubmitting,
                className: "w-full bg-[#25D366] hover:bg-green-600 disabled:opacity-70 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3",
                children: isSubmitting ? "جاري الإرسال..." : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(MessageCircle, { size: 24 }),
                  "واتساب"
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleSubmit("call"),
                disabled: isSubmitting,
                className: "w-full bg-[#3B82F6] hover:bg-blue-600 disabled:opacity-70 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3",
                children: isSubmitting ? "جاري الإرسال..." : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Phone, { size: 24 }),
                  "اتصال هاتفي"
                ] })
              }
            )
          ] })
        ] });
      case 6:
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(Check, { size: 40, className: "text-green-500" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-dark-blue", children: "تم التسجيل بنجاح! 🎉" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xl text-gray-600 leading-relaxed", children: [
            "شكراً سي/للا ",
            formData.parentName,
            ".",
            /* @__PURE__ */ jsx("br", {}),
            "الفريق ديالنا غادي يتواصل معاك فأقرب وقت باش نحددو موعد الاستشارة."
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleCloseAndReset,
              className: "w-full bg-[#3B82F6] hover:bg-blue-600 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all mt-8",
              children: "إغلاق"
            }
          )
        ] });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden relative", children: [
    /* @__PURE__ */ jsx("div", { className: "h-2 w-full bg-gray-100", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-full bg-[#3B82F6] transition-all duration-500 ease-out",
        style: { width: `${step === 6 ? 100 : (step + 1) / 6 * 100}%` }
      }
    ) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: step === 6 ? handleCloseAndReset : onClose,
        className: "absolute top-6 left-6 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors z-10",
        children: /* @__PURE__ */ jsx(X, { size: 20 })
      }
    ),
    step > 0 && step < 6 && /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: handleBack,
        className: "absolute top-6 right-6 text-gray-500 hover:text-gray-800 font-medium transition-colors z-10 flex items-center gap-1",
        children: [
          /* @__PURE__ */ jsx(ArrowRight, { size: 18 }),
          " رجوع"
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "p-8 md:p-10 pt-16", children: renderStep() })
  ] }) });
}

const kidsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "برنامج الذاكرة للأطفال",
    description: "تقنيات ممتعة وعلمية لتطوير ذاكرة طفلك وتحسين تركيزه وأدائه الدراسي. برنامج معتمد للأطفال من 6 إلى 14 سنة.",
    provider: {
      "@type": "EducationalOrganization",
      name: "كوتش أحمد",
      sameAs: "https://website-dakiraty.vercel.app"
    },
    inLanguage: "ar",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "Children ages 6-14"
    },
    teaches: ["تقنيات الذاكرة للأطفال", "تحسين التركيز", "الحفظ السريع للدروس", "مهارات التعلم"],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      inLanguage: "ar"
    }
  }
];
const KidsMemoryLanding = () => {
  const [parentType, setParentType] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const savedType = localStorage.getItem("kidsMemoryParentType");
    if (savedType === "father" || savedType === "mother") {
      setParentType(savedType);
      setShowSplash(false);
    }
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
      window.fbq("init", "1435549911489261");
      window.fbq("track", "PageView");
    }
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll) * 100);
      if (window.scrollY > 500) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !localStorage.getItem("kidsMemoryExitPopupShown")) {
        setShowExitPopup(true);
        localStorage.setItem("kidsMemoryExitPopupShown", "true");
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  const handleSelectParent = (type) => {
    setParentType(type);
    localStorage.setItem("kidsMemoryParentType", type);
    setShowSplash(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
    setShowExitPopup(false);
  };
  const scrollToOffer = () => {
    const offerElement = document.getElementById("offer-stack");
    if (offerElement) {
      offerElement.scrollIntoView({ behavior: "smooth" });
      setShowExitPopup(false);
    }
  };
  const faqs = [
    {
      question: "طفلي صغير في السن، هل سيستوعب الدورة؟",
      answer: "الدورة مناسبة للأطفال من سن 7 سنوات فما فوق. التقنيات مبسطة ومشروحة بطريقة يفهمها أي طفل. وأنا أحرص على أن يفهم الجميع قبل الانتقال للخطوة التالية."
    },
    {
      question: "طفلي لا يركز، ويشعر بالملل بسرعة.",
      answer: "هذه مشكلة الطريقة التقليدية، وليست مشكلة طفلك. التقنيات التي أعلمها تعتمد على اللعب والخيال. الأطفال يستمتعون ويتفاعلون بشكل كبير."
    },
    {
      question: "الحصص عبر الإنترنت، هل ستكون فعالة؟",
      answer: "الحصص مباشرة وتفاعلية — وليست فيديوهات مسجلة. أرى طفلك، يسألني، وأجيبه في الحين. وكأنه يحضر معي شخصياً. ويمكنك الحضور معه والمراقبة بنفسك."
    },
    {
      question: "كم مرة في الأسبوع؟",
      answer: "4 حصص في الأسبوع. المدة: من ساعة إلى ساعة ونصف. مما يعني أنه في أسبوع واحد، سيكون طفلك قد تعلم كل شيء."
    },
    {
      question: "ماذا لو لم تعجبنا الدورة؟",
      answer: "إذا حضر طفلك الحصة الأولى ولم تعجبه، سنعيد لك أموالك بالكامل. بدون أي أسئلة."
    },
    {
      question: "هل يمكنني كولي أمر أن أحضر؟",
      answer: "بالتأكيد! بل أشجع على ذلك. لترى كيف يتعلم طفلك، وتستفيد أنت أيضاً من التقنيات."
    },
    {
      question: "كيف يمكنني الدفع؟",
      answer: "بعد التسجيل، سنتواصل معك عبر الواتساب ونشرح لك طرق الدفع المتاحة."
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "font-sans bg-[#F9FAFB] text-[#1A1A1A] relative min-h-screen", dir: "rtl", children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "برنامج الذاكرة للأطفال | تقوية ذاكرة طفلك وتحسين تركيزه - كوتش أحمد",
        description: "برنامج علمي ممتع لتطوير ذاكرة طفلك وتحسين تركيزه وحفظه للدروس. تقنيات مثبتة للأطفال من 6-14 سنة، يطبقها طفلك في 15 دقيقة يومياً. سجل طفلك الآن.",
        keywords: "ذاكرة الأطفال, تركيز الأطفال, تقوية ذاكرة طفلي, طفلي ينسى, حفظ الدروس للأطفال, برامج ذاكرة الأطفال المغرب, كوتش أحمد أطفال",
        path: "/kids-memory",
        ogType: "product",
        jsonLd: kidsJsonLd
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-full bg-[#22C55E] transition-all duration-150 ease-out",
        style: { width: `${scrollProgress}%` }
      }
    ) }),
    showSplash && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-4 transition-opacity duration-500", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-gray-100", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-2", children: "أهلاً بك 👋" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 mb-8 font-medium", children: "من أنت؟" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleSelectParent("father"),
            className: "w-full py-4 px-6 bg-[#3B82F6] hover:bg-blue-600 text-white rounded-2xl text-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-3",
            children: [
              /* @__PURE__ */ jsx("span", { children: "أنا الأب" }),
              /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "👨" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleSelectParent("mother"),
            className: "w-full py-4 px-6 bg-[#F97316] hover:bg-orange-600 text-white rounded-2xl text-xl font-bold transition-all shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-3",
            children: [
              /* @__PURE__ */ jsx("span", { children: "أنا الأم" }),
              /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "👩" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mt-6", children: "لنقدم لك تجربة مناسبة" })
    ] }) }),
    showStickyCTA && /* @__PURE__ */ jsx("div", { className: "md:hidden fixed bottom-6 left-4 right-4 z-40 animate-fade-in-up", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: openModal,
        className: "w-full bg-[#22C55E] text-white font-bold py-4 rounded-2xl text-xl shadow-[0_10px_25px_rgba(34,197,94,0.5)] border-2 border-white/20",
        children: "سجل طفلك الآن"
      }
    ) }),
    showExitPopup && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in-up", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowExitPopup(false),
          className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors",
          children: /* @__PURE__ */ jsx(X, { size: 24 })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(MessageCircle, { size: 32 }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 text-dark-blue", children: "هل تنتظر شيئاً؟" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-8 text-lg", children: "إذا كان لديك أي سؤال أو استفسار حول الدورة، راسلنا على واتساب وسنجيبك فوراً." }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://wa.me/212633698758",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "w-full bg-[#25D366] hover:bg-green-600 text-white text-xl font-bold py-4 rounded-xl shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-3",
            children: [
              /* @__PURE__ */ jsx(MessageCircle, { size: 24 }),
              "تواصل معنا على واتساب"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowExitPopup(false),
            className: "mt-4 text-gray-500 hover:text-gray-700 underline text-sm",
            children: "لا شكراً، أريد العودة للصفحة"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "pt-32 pb-20 px-4 min-h-[85vh] flex items-center bg-gradient-to-b from-blue-50 to-[#F9FAFB]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-dark-blue", children: [
        "طفلك ليس لديه مشكلة في الذاكرة.",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-[#F97316]", children: "لديه مشكلة في الطريقة." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto font-medium", children: "في 4 حصص فقط، سيتعلم كيف يحفظ كأبطال الذاكرة — جدول الضرب، القرآن، الاجتماعيات... بدون تكرار ممل" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: scrollToOffer,
            className: "bg-[#22C55E] hover:bg-green-600 text-white text-2xl font-bold py-5 px-10 rounded-2xl shadow-xl hover:shadow-green-500/40 transition-all transform hover:-translate-y-1 w-full md:w-auto",
            children: "سجل طفلك الآن — 400 درهم"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 text-gray-500 font-medium text-sm md:text-base", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { size: 18, className: "text-[#22C55E]" }),
            " ضمان استرجاع الأموال"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Users, { size: 18, className: "text-[#3B82F6]" }),
            " +3000 متدرب"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-4 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-12 text-dark-blue", children: "هل هذه حياتك كل يوم؟ 😫" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-xl md:text-2xl text-gray-700 font-medium leading-relaxed", children: [
        /* @__PURE__ */ jsx("p", { children: "تعود من العمل متعباً..." }),
        /* @__PURE__ */ jsx("p", { children: "وبدلاً من أن ترتاح، تجلس مع طفلك لتراجع معه الدروس." }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F97316] font-bold", children: '"اقرأ معي... ركّز... لماذا تنسى؟!"' }),
        /* @__PURE__ */ jsx("p", { children: "تعيد معه مرة. مرتين. عشر مرات." }),
        /* @__PURE__ */ jsx("p", { children: "يحفظ الليلة... وغداً؟ ينسى كل شيء." }),
        /* @__PURE__ */ jsx("p", { children: "وفي الامتحان؟ كأنه لم يقرأ أبداً." }),
        /* @__PURE__ */ jsx("p", { children: "تشعر بالإحباط." }),
        /* @__PURE__ */ jsx("p", { children: 'تتساءل: "هل طفلي يعاني من مشكلة؟"' }),
        /* @__PURE__ */ jsx("p", { children: 'وأحياناً تشعر بالذنب: "هل أنا السبب؟"' })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-4 bg-blue-50/50 border-y border-blue-100", children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "bg-white p-8 md:p-12 rounded-3xl shadow-lg border-r-8 border-[#3B82F6]", children: parentType === "father" ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6 text-[#3B82F6]", children: "أخي الأب..." }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-xl text-gray-700 leading-relaxed", children: [
        /* @__PURE__ */ jsx("p", { children: "أعلم أنك تعمل بجد لتوفير حياة كريمة لعائلتك." }),
        /* @__PURE__ */ jsx("p", { children: "وعندما تعود للمنزل، تجد طفلك غارقاً في الدروس." }),
        /* @__PURE__ */ jsx("p", { children: "وتشعر أنه يجب عليك مساعدته، لكنك لا تعرف كيف. وليس لديك الوقت للجلوس معه لساعات." }),
        /* @__PURE__ */ jsx("p", { className: "font-bold text-dark-blue mt-6", children: "والحقيقة؟ لست أنت المشكلة." }),
        /* @__PURE__ */ jsx("p", { children: "المشكلة أن لا أحد علّم طفلك كيف يحفظ بالطريقة الصحيحة." })
      ] })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6 text-[#F97316]", children: "أختي الأم..." }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-xl text-gray-700 leading-relaxed", children: [
        /* @__PURE__ */ jsx("p", { children: "أعلم أنك تبذلين كل ما بوسعك من أجل طفلك." }),
        /* @__PURE__ */ jsx("p", { children: "تضحين براحتك. تسهرين معه. وتحاولين بكل الطرق." }),
        /* @__PURE__ */ jsx("p", { children: "ومع ذلك، كلما رأيتِ نتائجه تشعرين بالخيبة. وأحياناً تلومين نفسك." }),
        /* @__PURE__ */ jsx("p", { className: "font-bold text-dark-blue mt-6", children: "أخبريني: هل هذا عدل؟" }),
        /* @__PURE__ */ jsx("p", { children: "هل أنتِ من يجب أن تشعري بالذنب؟ أم المدرسة التي لم تعلمه الطريقة الصحيحة؟" })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-4 bg-[#E0F2FE]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-md", children: /* @__PURE__ */ jsx(Sparkles, { className: "text-[#3B82F6]", size: 40 }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-8 text-dark-blue", children: "الحقيقة التي لا يخبرونك بها:" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-2xl text-gray-800 font-medium mb-10", children: [
        /* @__PURE__ */ jsx("p", { children: "طفلك ليس لديه أي مشكلة في الذاكرة." }),
        /* @__PURE__ */ jsx("p", { className: "text-[#22C55E] font-bold", children: "طفلك ذكي." }),
        /* @__PURE__ */ jsx("p", { className: "text-[#22C55E] font-bold", children: "طفلك قادر." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white/60 p-8 rounded-2xl text-xl text-gray-700 leading-relaxed", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4", children: "المشكلة؟" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'في المدرسة يقولون له "احفظ!" ولكن لا أحد يشرح له كيف.' }),
        /* @__PURE__ */ jsx("p", { className: "mb-4", children: "فيعيد ويعيد ويعيد... وهذه الطريقة أصلاً غير فعالة." }),
        /* @__PURE__ */ jsx("p", { className: "font-bold text-dark-blue text-2xl mt-6", children: "الذاكرة لها قواعد. لها أسرار." }),
        /* @__PURE__ */ jsx("p", { className: "font-bold text-[#F97316] text-2xl", children: "وإذا تعلمها طفلك — كل شيء يتغير." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-4 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-dark-blue", children: "الحل: دورة الذاكرة للأطفال" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "في 4 حصص فقط، سيتعلم طفلك نفس التقنيات التي يستخدمها أبطال العالم:" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#F9FAFB] p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx("div", { className: "text-5xl mb-6", children: "🏰" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 text-dark-blue", children: "القصر الذهني" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg leading-relaxed", children: "سيبني طفلك قصراً في خياله، ويخزن فيه أي معلومة. جدول الضرب؟ يأخذه لغرفة الضيوف. الاجتماعيات؟ يأخذها للمطبخ. لن ينسى شيئاً." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#F9FAFB] p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx("div", { className: "text-5xl mb-6", children: "🗺️" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 text-dark-blue", children: "الخرائط الذهنية" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg leading-relaxed", children: "أي درس معقد، سيحوله طفلك إلى رسم بسيط. الدماغ يحب الصور — وهكذا يتذكر بسرعة." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#F9FAFB] p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx("div", { className: "text-5xl mb-6", children: "🔁" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 text-dark-blue", children: "التكرار الذكي" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg leading-relaxed", children: "بدلاً من أن يعيد 100 مرة وينسى... سيتعلم كيف يعيد مرات قليلة ويحفظ للأبد." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#F9FAFB] p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx("div", { className: "text-5xl mb-6", children: "📖" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 text-dark-blue", children: "تقنيات حفظ القرآن" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg leading-relaxed", children: "نفس الطريقة التي يستخدمها حفّاظ القرآن. سيحفظ طفلك الآيات ويثبتها في ذاكرته." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-4 bg-[#F3F4F6]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-12 text-center text-dark-blue", children: "ما الفرق بين دورتنا والطرق التقليدية؟" }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:block bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-right border-collapse min-w-[600px]", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50", children: [
          /* @__PURE__ */ jsx("th", { className: "p-6 font-bold text-xl text-gray-700 border-b border-gray-200 w-1/3", children: "الميزة" }),
          /* @__PURE__ */ jsx("th", { className: "p-6 font-bold text-xl text-gray-500 border-b border-gray-200 w-1/3 text-center bg-red-50/30", children: "الطرق التقليدية" }),
          /* @__PURE__ */ jsx("th", { className: "p-6 font-bold text-xl text-green-700 border-b border-gray-200 w-1/3 text-center bg-green-50", children: "دورة الذاكرة للأطفال" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-gray-100", children: [
          /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
            /* @__PURE__ */ jsx("td", { className: "p-6 text-lg font-medium text-gray-800", children: "طريقة التعلم" }),
            /* @__PURE__ */ jsx("td", { className: "p-6 text-center bg-red-50/30", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx(X, { className: "text-red-500", size: 28 }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "حفظ عن ظهر قلب (تكرار ممل)" })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "p-6 text-center bg-green-50", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx(Check, { className: "text-green-600", size: 28 }),
              /* @__PURE__ */ jsx("span", { className: "text-green-800 font-bold", children: "التعلم باللعب والخيال" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
            /* @__PURE__ */ jsx("td", { className: "p-6 text-lg font-medium text-gray-800", children: "نوع الحصص" }),
            /* @__PURE__ */ jsx("td", { className: "p-6 text-center bg-red-50/30", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx(X, { className: "text-red-500", size: 28 }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "فيديوهات مسجلة سلبية" })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "p-6 text-center bg-green-50", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx(Check, { className: "text-green-600", size: 28 }),
              /* @__PURE__ */ jsx("span", { className: "text-green-800 font-bold", children: "حصص مباشرة تفاعلية" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
            /* @__PURE__ */ jsx("td", { className: "p-6 text-lg font-medium text-gray-800", children: "التطبيق" }),
            /* @__PURE__ */ jsx("td", { className: "p-6 text-center bg-red-50/30", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx(X, { className: "text-red-500", size: 28 }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "معلومات نظرية فقط" })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "p-6 text-center bg-green-50", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx(Check, { className: "text-green-600", size: 28 }),
              /* @__PURE__ */ jsx("span", { className: "text-green-800 font-bold", children: "تطبيق عملي على الدروس" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
            /* @__PURE__ */ jsx("td", { className: "p-6 text-lg font-medium text-gray-800", children: "الاستمرارية" }),
            /* @__PURE__ */ jsx("td", { className: "p-6 text-center bg-red-50/30", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx(X, { className: "text-red-500", size: 28 }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "دورة وتنتهي (غياب الدعم)" })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "p-6 text-center bg-green-50", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx(Check, { className: "text-green-600", size: 28 }),
              /* @__PURE__ */ jsx("span", { className: "text-green-800 font-bold", children: "تسجيلات مدى الحياة ومتابعة" })
            ] }) })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "md:hidden space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-4 border-b border-gray-100 text-center", children: /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl text-gray-800", children: "طريقة التعلم" }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 divide-x divide-x-reverse divide-gray-100", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 text-center bg-red-50/30", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 mb-2", children: "الطرق التقليدية" }),
              /* @__PURE__ */ jsx(X, { className: "text-red-500 mx-auto mb-2", size: 24 }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-sm", children: "حفظ عن ظهر قلب (تكرار ممل)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 text-center bg-green-50", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-green-700 mb-2 font-bold", children: "دورة الذاكرة" }),
              /* @__PURE__ */ jsx(Check, { className: "text-green-600 mx-auto mb-2", size: 24 }),
              /* @__PURE__ */ jsx("span", { className: "text-green-800 font-bold text-sm", children: "التعلم باللعب والخيال" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-4 border-b border-gray-100 text-center", children: /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl text-gray-800", children: "نوع الحصص" }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 divide-x divide-x-reverse divide-gray-100", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 text-center bg-red-50/30", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 mb-2", children: "الطرق التقليدية" }),
              /* @__PURE__ */ jsx(X, { className: "text-red-500 mx-auto mb-2", size: 24 }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-sm", children: "فيديوهات مسجلة سلبية" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 text-center bg-green-50", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-green-700 mb-2 font-bold", children: "دورة الذاكرة" }),
              /* @__PURE__ */ jsx(Check, { className: "text-green-600 mx-auto mb-2", size: 24 }),
              /* @__PURE__ */ jsx("span", { className: "text-green-800 font-bold text-sm", children: "حصص مباشرة تفاعلية" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-4 border-b border-gray-100 text-center", children: /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl text-gray-800", children: "التطبيق" }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 divide-x divide-x-reverse divide-gray-100", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 text-center bg-red-50/30", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 mb-2", children: "الطرق التقليدية" }),
              /* @__PURE__ */ jsx(X, { className: "text-red-500 mx-auto mb-2", size: 24 }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-sm", children: "معلومات نظرية فقط" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 text-center bg-green-50", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-green-700 mb-2 font-bold", children: "دورة الذاكرة" }),
              /* @__PURE__ */ jsx(Check, { className: "text-green-600 mx-auto mb-2", size: 24 }),
              /* @__PURE__ */ jsx("span", { className: "text-green-800 font-bold text-sm", children: "تطبيق عملي على الدروس" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-4 border-b border-gray-100 text-center", children: /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl text-gray-800", children: "الاستمرارية" }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 divide-x divide-x-reverse divide-gray-100", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 text-center bg-red-50/30", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 mb-2", children: "الطرق التقليدية" }),
              /* @__PURE__ */ jsx(X, { className: "text-red-500 mx-auto mb-2", size: 24 }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-sm", children: "دورة وتنتهي (غياب الدعم)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 text-center bg-green-50", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-green-700 mb-2 font-bold", children: "دورة الذاكرة" }),
              /* @__PURE__ */ jsx(Check, { className: "text-green-600 mx-auto mb-2", size: 24 }),
              /* @__PURE__ */ jsx("span", { className: "text-green-800 font-bold text-sm", children: "تسجيلات مدى الحياة ومتابعة" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-4 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse md:flex-row items-center gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-8 text-dark-blue", children: "مع المدرب أحمد" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 mb-8", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-xl font-medium text-gray-700", children: [
            /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "🏆" }),
            " شاركت في البطولة العربية للذاكرة"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-xl font-medium text-gray-700", children: [
            /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "🏆" }),
            " شاركت في البطولة الأفريقية للذاكرة"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-xl font-medium text-gray-700", children: [
            /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "🏆" }),
            " مسؤول عن البطولة الوطنية المغربية للذاكرة"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-6 rounded-2xl border-r-4 border-[#3B82F6]", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-800 leading-relaxed font-medium mb-4", children: '"درّبت أكثر من 3000 شخص — أصغرهم 7 سنوات وأكبرهم 73 سنة.' }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-800 leading-relaxed font-bold", children: 'التقنيات التي استعملتها في البطولات العالمية؟ الآن أعلمها لطفلك."' })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 w-full max-w-md", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://i.ibb.co/HfQqvX2Q/Generated-Image-February-25-2026-4-08-PM-jpg.jpg",
          alt: "المدرب أحمد",
          className: "w-full aspect-square object-cover rounded-[2rem] shadow-2xl",
          loading: "lazy"
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { id: "offer-stack", className: "py-20 px-4 bg-[#DCFCE7]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-10 text-center text-dark-blue", children: "ماذا ستحصل مقابل 400 درهم؟" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-xl p-8 md:p-12", children: [
        /* @__PURE__ */ jsxs("ul", { className: "space-y-6 mb-10", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "text-[#22C55E] flex-shrink-0 mt-1", size: 28 }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-900", children: "4 حصص مباشرة" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "حصص تفاعلية، وليست فيديوهات مملة" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 line-through", children: "(قيمتها 600 درهم)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "text-[#22C55E] flex-shrink-0 mt-1", size: 28 }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-900", children: "تسجيلات الحصص — مدى الحياة" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "طفلك يراجع في أي وقت يشاء" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 line-through", children: "(قيمتها 200 درهم)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "text-[#22C55E] flex-shrink-0 mt-1", size: 28 }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-900", children: 'تطبيق "ذاكرتي" — مجاناً' }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "يتدرب عليه كل يوم ويقوّي ذاكرته" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 line-through", children: "(قيمتو 150 درهم)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "text-[#22C55E] flex-shrink-0 mt-1", size: 28 }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-900", children: "مجموعة واتساب للدعم — 30 يوم" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "أي سؤال لديك، أنا موجود" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 line-through", children: "(قيمتها 100 درهم)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "text-[#22C55E] flex-shrink-0 mt-1", size: 28 }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-900", children: "أنت كولي أمر يمكنك الحضور مع طفلك" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "ترى كيف يتعلم، وتستفيد أنت أيضاً" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-[#22C55E] font-bold", children: "(بلا أي زيادة)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-t-2 border-dashed border-gray-200 pt-8 pb-6 text-center mb-8", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-xl text-gray-500 mb-2", children: [
            "المجموع الحقيقي: ",
            /* @__PURE__ */ jsx("span", { className: "line-through", children: "1050 درهم" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-3xl md:text-4xl font-black text-dark-blue", children: [
            "أنت ستدفع: ",
            /* @__PURE__ */ jsx("span", { className: "text-[#22C55E]", children: "400 درهم فقط" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8 flex items-start gap-4", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "text-orange-500 flex-shrink-0 mt-1", size: 32 }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-900 mb-2", children: "ضمان استرجاع الأموال 100%" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "إذا لم تلاحظ فرقاً في مستوى طفلك بعد الحصة الأولى، سنعيد لك أموالك كاملة بدون أن نسألك أي سؤال. المخاطرة علينا نحن، وليست عليك!" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: openModal,
            className: "w-full bg-[#22C55E] hover:bg-green-600 text-white text-2xl font-bold py-5 rounded-2xl shadow-xl hover:shadow-green-500/40 transition-all transform hover:-translate-y-1",
            children: "سجل طفلك الآن"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-4 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-12 text-center text-dark-blue", children: "بعد الدورة، طفلك سوف:" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-100 shadow-sm p-6 rounded-2xl flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl", children: "📈" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-900 mb-1", children: "يحفظ أسرع بكثير" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "بدل ساعات، دقائق" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-100 shadow-sm p-6 rounded-2xl flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl", children: "🎯" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-900 mb-1", children: "يركّز وقت أطول" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "بدون تشتت وبدون ملل" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-100 shadow-sm p-6 rounded-2xl flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl", children: "😊" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-900 mb-1", children: "يحب وقت الدراسة" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "بدل الصراخ والبكاء والتوتر" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-100 shadow-sm p-6 rounded-2xl flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl", children: "💪" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-900 mb-1", children: "يثق بنفسه" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "لأنه سيرى النتائج بعينيه" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-100 shadow-sm p-6 rounded-2xl flex items-start gap-4 sm:col-span-2 sm:max-w-md sm:mx-auto w-full", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl", children: "🤝" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-900 mb-1", children: "علاقتكم ستتحسن" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "لأن وقت الدروس لن يبقى حرباً" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-4 bg-[#E5DDD5] overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-12 text-center text-dark-blue", children: "ماذا يقول الآباء؟" }),
      /* @__PURE__ */ jsx("div", { className: "relative h-[600px] overflow-hidden mask-image-linear-gradient", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          animate: {
            translateY: "-50%"
          },
          transition: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          },
          className: "flex flex-col gap-8 pb-8",
          children: [...new Array(2).fill(0).map((_, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm overflow-hidden max-w-md mx-auto w-full", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#075E54] text-white p-3 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-300 overflow-hidden relative", children: /* @__PURE__ */ jsx("img", { src: "https://picsum.photos/id/1011/100/100", alt: "Avatar", className: "w-full h-full object-cover blur-[2px]", loading: "lazy" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("p", { className: "font-bold text-sm", children: [
                    "أم ف... ",
                    /* @__PURE__ */ jsx("span", { className: "font-normal text-xs opacity-80 ml-2", children: "الرباط" })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs opacity-80", children: "متصل الآن" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none inline-block max-w-[90%] shadow-sm relative", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-800 text-[15px] leading-relaxed mb-4", children: "طفلي كان ينسى جدول الضرب كل يوم. أراجع معه لساعات دون جدوى. بعد الدورة مع الأستاذ أحمد، أصبح يفاجئني بالإجابات قبل أن أكمل السؤال! 🤩" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1 text-xs text-gray-500", children: [
                    /* @__PURE__ */ jsx("span", { children: "10:42" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[#34B7F1]", children: "✓✓" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-gray-500 mt-3 bg-white/80 inline-block px-2 py-1 rounded-full mx-auto block w-max", children: "(ابنها 9 سنوات)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm overflow-hidden max-w-md mx-auto w-full", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#075E54] text-white p-3 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-300 overflow-hidden relative", children: /* @__PURE__ */ jsx("img", { src: "https://picsum.photos/id/1005/100/100", alt: "Avatar", className: "w-full h-full object-cover blur-[2px]", loading: "lazy" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("p", { className: "font-bold text-sm", children: [
                    "أب م... ",
                    /* @__PURE__ */ jsx("span", { className: "font-normal text-xs opacity-80 ml-2", children: "الدار البيضاء" })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs opacity-80", children: "متصل الآن" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none inline-block max-w-[90%] shadow-sm relative", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-800 text-[15px] leading-relaxed mb-4", children: "كنت خائفاً على مستقبل ابنتي. كلما أراها تعاني مع الدروس، يتمزق قلبي. الأستاذ أحمد علمها تقنيات بسيطة والآن تدرس بمفردها دون أن أصرخ عليها 💪" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1 text-xs text-gray-500", children: [
                    /* @__PURE__ */ jsx("span", { children: "14:15" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[#34B7F1]", children: "✓✓" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-gray-500 mt-3 bg-white/80 inline-block px-2 py-1 rounded-full mx-auto block w-max", children: "(ابنته 11 سنة)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm overflow-hidden max-w-md mx-auto w-full", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#075E54] text-white p-3 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-300 overflow-hidden relative", children: /* @__PURE__ */ jsx("img", { src: "https://picsum.photos/id/1027/100/100", alt: "Avatar", className: "w-full h-full object-cover blur-[2px]", loading: "lazy" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("p", { className: "font-bold text-sm", children: [
                    "أم س... ",
                    /* @__PURE__ */ jsx("span", { className: "font-normal text-xs opacity-80 ml-2", children: "مراكش" })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs opacity-80", children: "متصل الآن" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none inline-block max-w-[90%] shadow-sm relative", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-800 text-[15px] leading-relaxed mb-4", children: "أفضل استثمار قمت به في حياتي. 400 درهم مقابل راحة البال؟ تستحق! 👍" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1 text-xs text-gray-500", children: [
                    /* @__PURE__ */ jsx("span", { children: "18:30" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[#34B7F1]", children: "✓✓" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-gray-500 mt-3 bg-white/80 inline-block px-2 py-1 rounded-full mx-auto block w-max", children: "(ابنها 8 سنوات)" })
              ] })
            ] })
          ] }, index))]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 px-4 bg-[#0F2D54] text-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-black mb-10 text-white", children: "سؤال أخير..." }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-xl md:text-2xl text-gray-300 font-medium mb-12", children: [
        /* @__PURE__ */ jsx("p", { children: "كل يوم يمر، طفلك يتأخر أكثر." }),
        /* @__PURE__ */ jsx("p", { children: "كل امتحان يفشل فيه، ثقته بنفسه تقل." }),
        /* @__PURE__ */ jsx("p", { children: "كل ليلة من الصراخ والتوتر، علاقتكم تتضرر." }),
        /* @__PURE__ */ jsx("p", { className: "text-white font-bold mt-10", children: 'السؤال ليس "هل ستنفع الدورة؟"' }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F97316] font-bold text-3xl mt-4", children: 'السؤال هو: "كم ستنتظر؟"' }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mt-8 leading-relaxed max-w-2xl mx-auto", children: "هذه التقنيات لن تنفع طفلك الآن فقط. ستنفعه طوال حياته — في الإعدادي، في الثانوي، في الجامعة، وحتى في العمل." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/20 mb-10", children: /* @__PURE__ */ jsxs("p", { className: "text-3xl md:text-4xl font-black text-white", children: [
        "400 درهم الآن = ",
        /* @__PURE__ */ jsx("span", { className: "text-[#22C55E]", children: "مستقبل مختلف لطفلك." })
      ] }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: openModal,
          className: "w-full md:w-auto bg-[#22C55E] hover:bg-green-600 text-white text-2xl font-bold py-5 px-12 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transition-all transform hover:-translate-y-1",
          children: "أريد أن أرى هذه النتائج على ولدي"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-4 bg-[#F9FAFB]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-8 text-dark-blue", children: "مستعد لتغيير حياة طفلك الدراسية؟" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 mb-10", children: "اضغط على الزر أدناه لتبدأ عملية التسجيل. الأماكن محدودة!" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: openModal,
          className: "w-full md:w-auto bg-[#22C55E] hover:bg-green-600 text-white text-2xl font-bold py-5 px-12 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transition-all transform hover:-translate-y-1",
          children: "سجل طفلك الآن"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-4 bg-[#F9FAFB]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-12 text-center text-dark-blue", children: "أسئلة يطرحها الآباء:" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs.map((faq, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300",
          children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setOpenFaq(openFaq === index ? null : index),
                className: "w-full px-6 py-5 flex items-center justify-between text-right focus:outline-none",
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold text-gray-900 flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[#3B82F6]", children: "❓" }),
                    " ",
                    faq.question
                  ] }),
                  openFaq === index ? /* @__PURE__ */ jsx(ChevronUp, { className: "text-gray-400 flex-shrink-0" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "text-gray-400 flex-shrink-0" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"}`,
                children: /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed pt-2 border-t border-gray-100", children: faq.answer })
              }
            )
          ]
        },
        index
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "bg-[#1A1A1A] text-gray-400 py-12 px-4 border-t border-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 mb-6 text-white", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(GraduationCap, { size: 20 }) }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-xl", children: "أحمد" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "دورة الذاكرة للأطفال — المدرب أحمد" }),
      /* @__PURE__ */ jsx("p", { className: "mb-8", children: "+3000 متدرب | بطولات عربية وأفريقية" }),
      /* @__PURE__ */ jsxs("a", { href: "https://wa.me/212633698758", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 bg-[#25D366] hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-colors mb-12", children: [
        /* @__PURE__ */ jsx(MessageCircle, { size: 20 }),
        "تواصل معنا"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "border-t border-gray-800 pt-8 text-sm", children: /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " جميع الحقوق محفوظة"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(OnboardingModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false) })
  ] });
};

export { KidsMemoryLanding as default };
