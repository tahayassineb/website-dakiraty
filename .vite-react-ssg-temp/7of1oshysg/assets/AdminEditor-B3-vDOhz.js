import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { ChevronLeft, Eye, ExternalLink, Loader2, Save, CheckCircle, AlertCircle, Upload } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { a as api } from './api-jI3mfyCn.js';
import { g as getAdminToken } from './convex-client-MQY61BTd.js';
import 'convex/server';

const AdminEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = typeof window !== "undefined" ? getAdminToken() : null;
  const article = useQuery(
    api.articles.getById,
    token && id ? { token, id } : "skip"
  );
  const updateArticle = useMutation(api.articles.update);
  const generateUploadUrl = useMutation(api.images.generateUploadUrl);
  const setArticleImage = useMutation(api.images.setArticleImage);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    body: "",
    date: "",
    category: "",
    tags: "",
    keywords: "",
    readTime: "",
    image: "",
    imageAlt: "",
    author: "",
    authorBio: "",
    related: "",
    cta: "none"
  });
  const [originalSlug, setOriginalSlug] = useState("");
  const [lang, setLang] = useState("ar");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (article && form.title === "") {
      setForm({
        title: article.title,
        excerpt: article.excerpt,
        body: article.body,
        date: article.date,
        category: article.category,
        tags: article.tags.join(", "),
        keywords: article.keywords,
        readTime: article.readTime,
        image: article.image,
        imageAlt: article.imageAlt,
        author: article.author,
        authorBio: article.authorBio,
        related: article.related.join(", "),
        cta: article.cta
      });
      setOriginalSlug(article.slug);
      setLang(article.lang);
    }
  }, [article, form.title]);
  const handleSave = async () => {
    if (!token || !id) return;
    setStatus("saving");
    setErrorMsg(null);
    try {
      await updateArticle({
        token,
        id,
        patch: {
          title: form.title,
          excerpt: form.excerpt,
          body: form.body,
          date: form.date,
          category: form.category,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
          keywords: form.keywords,
          readTime: form.readTime,
          image: form.image,
          imageAlt: form.imageAlt,
          author: form.author,
          authorBio: form.authorBio,
          related: form.related.split(",").map((t) => t.trim()).filter(Boolean),
          cta: form.cta
        }
      });
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2e3);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.message || "فشل الحفظ");
    }
  };
  const handleImageUpload = async (file) => {
    if (!token || !id) return;
    setUploadStatus("uploading");
    setErrorMsg(null);
    try {
      const uploadUrl = await generateUploadUrl({ token });
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file
      });
      if (!result.ok) {
        throw new Error("Upload failed");
      }
      const { storageId } = await result.json();
      const { url } = await setArticleImage({
        token,
        articleId: id,
        storageId,
        imageAlt: form.imageAlt || form.title
      });
      setForm((prev) => ({ ...prev, image: url }));
      setUploadStatus("idle");
    } catch (err) {
      setUploadStatus("error");
      setErrorMsg(err?.message || "فشل رفع الصورة");
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };
  if (!token) {
    navigate("/admin", { replace: true });
    return null;
  }
  if (article === void 0) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-20 text-gray-500", children: "جاري التحميل..." });
  }
  if (article === null) {
    return /* @__PURE__ */ jsxs("div", { className: "text-center py-20 text-gray-500", children: [
      /* @__PURE__ */ jsx("p", { children: "المقال غير موجود." }),
      /* @__PURE__ */ jsx(Link, { to: "/admin/articles", className: "text-primary-blue font-bold hover:underline", children: "عودة للقائمة" })
    ] });
  }
  const publicUrl = lang === "fr" ? `https://website-dakiraty.vercel.app/fr/blog/${originalSlug}` : `https://website-dakiraty.vercel.app/blog/${originalSlug}`;
  return /* @__PURE__ */ jsxs("div", { dir: "rtl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6 flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/admin/articles",
          className: "flex items-center gap-2 text-gray-600 hover:text-primary-blue font-medium",
          children: [
            /* @__PURE__ */ jsx(ChevronLeft, { size: 20 }),
            /* @__PURE__ */ jsx("span", { children: "عودة للقائمة" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowPreview(!showPreview),
            className: "flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-4 rounded-lg transition-colors text-sm",
            children: [
              /* @__PURE__ */ jsx(Eye, { size: 16 }),
              /* @__PURE__ */ jsx("span", { children: showPreview ? "إخفاء المعاينة" : "معاينة" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: publicUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-4 rounded-lg transition-colors text-sm",
            children: [
              /* @__PURE__ */ jsx(ExternalLink, { size: 16 }),
              /* @__PURE__ */ jsx("span", { children: "عرض على الموقع" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleSave,
            disabled: status === "saving",
            className: "flex items-center gap-2 bg-primary-blue hover:bg-dark-blue text-white font-bold py-2.5 px-6 rounded-lg transition-colors disabled:opacity-50",
            children: [
              status === "saving" ? /* @__PURE__ */ jsx(Loader2, { size: 18, className: "animate-spin" }) : /* @__PURE__ */ jsx(Save, { size: 18 }),
              /* @__PURE__ */ jsx("span", { children: status === "saving" ? "جاري الحفظ..." : status === "saved" ? "تم الحفظ ✓" : "حفظ" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-6 flex-wrap", children: [
      /* @__PURE__ */ jsx("span", { className: `text-xs font-bold px-3 py-1 rounded ${lang === "fr" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`, children: lang === "fr" ? "FR" : "AR" }),
      /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
        "/",
        originalSlug
      ] }),
      status === "saved" && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs text-green-600 font-bold", children: [
        /* @__PURE__ */ jsx(CheckCircle, { size: 14 }),
        " تم الحفظ"
      ] })
    ] }),
    errorMsg && /* @__PURE__ */ jsxs("div", { className: "bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-6 flex items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsx(AlertCircle, { size: 18, className: "shrink-0" }),
      /* @__PURE__ */ jsx("span", { children: errorMsg })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `grid gap-6 ${showPreview ? "lg:grid-cols-2" : "grid-cols-1"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs(Section, { title: "الصورة", children: [
          form.image && /* @__PURE__ */ jsx(
            "img",
            {
              src: form.image,
              alt: form.imageAlt,
              className: "w-full max-h-64 object-cover rounded-xl mb-4 border border-gray-200"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                accept: "image/*",
                ref: fileInputRef,
                onChange: handleFileChange,
                className: "hidden"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => fileInputRef.current?.click(),
                disabled: uploadStatus === "uploading",
                className: "flex items-center gap-2 bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50",
                children: [
                  uploadStatus === "uploading" ? /* @__PURE__ */ jsx(Loader2, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ jsx(Upload, { size: 16 }),
                  /* @__PURE__ */ jsx("span", { children: uploadStatus === "uploading" ? "جاري الرفع..." : form.image ? "استبدال الصورة" : "رفع صورة" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: form.imageAlt,
                onChange: (e) => setForm((p) => ({ ...p, imageAlt: e.target.value })),
                placeholder: "وصف الصورة (لقارئات الشاشة)",
                className: "flex-grow min-w-0 bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary-blue",
                dir: "rtl"
              }
            )
          ] }),
          form.image && /* @__PURE__ */ jsx("div", { className: "mt-3 text-xs text-gray-400 truncate font-mono", dir: "ltr", children: form.image })
        ] }),
        /* @__PURE__ */ jsxs(Section, { title: "العنوان والملخص", children: [
          /* @__PURE__ */ jsx(Field, { label: "العنوان", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: form.title,
              onChange: (e) => setForm((p) => ({ ...p, title: e.target.value })),
              className: "w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue text-lg font-bold"
            }
          ) }),
          /* @__PURE__ */ jsx(Field, { label: "الملخص (يظهر في قائمة المدونة)", children: /* @__PURE__ */ jsx(
            "textarea",
            {
              value: form.excerpt,
              onChange: (e) => setForm((p) => ({ ...p, excerpt: e.target.value })),
              rows: 3,
              className: "w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue resize-y"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs(Section, { title: "المعلومات", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsx(Field, { label: "التاريخ", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: form.date,
                onChange: (e) => setForm((p) => ({ ...p, date: e.target.value })),
                className: "w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue"
              }
            ) }),
            /* @__PURE__ */ jsx(Field, { label: "مدة القراءة", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: form.readTime,
                onChange: (e) => setForm((p) => ({ ...p, readTime: e.target.value })),
                placeholder: "مثلاً: 8 دقائق",
                className: "w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue"
              }
            ) }),
            /* @__PURE__ */ jsx(Field, { label: "التصنيف", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: form.category,
                onChange: (e) => setForm((p) => ({ ...p, category: e.target.value })),
                className: "w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue"
              }
            ) }),
            /* @__PURE__ */ jsx(Field, { label: "دعوة الإجراء (CTA)", children: /* @__PURE__ */ jsxs(
              "select",
              {
                value: form.cta,
                onChange: (e) => setForm((p) => ({ ...p, cta: e.target.value })),
                className: "w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "dakiraty", children: "برنامج ذاكرتي (dakiraty)" }),
                  /* @__PURE__ */ jsx("option", { value: "quran", children: "دورة القرآن (quran)" }),
                  /* @__PURE__ */ jsx("option", { value: "kids-memory", children: "ذاكرة الأطفال (kids-memory)" }),
                  /* @__PURE__ */ jsx("option", { value: "none", children: "لا شيء" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(Field, { label: "الوسوم (مفصولة بفواصل)", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: form.tags,
              onChange: (e) => setForm((p) => ({ ...p, tags: e.target.value })),
              placeholder: "وسم1, وسم2, وسم3",
              className: "w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue"
            }
          ) }),
          /* @__PURE__ */ jsx(Field, { label: "الكلمات المفتاحية SEO (مفصولة بفواصل)", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: form.keywords,
              onChange: (e) => setForm((p) => ({ ...p, keywords: e.target.value })),
              className: "w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue"
            }
          ) }),
          /* @__PURE__ */ jsx(Field, { label: "المقالات ذات الصلة (slugs مفصولة بفواصل)", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: form.related,
              onChange: (e) => setForm((p) => ({ ...p, related: e.target.value })),
              placeholder: "slug-1, slug-2",
              className: "w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue text-sm font-mono",
              dir: "ltr"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs(Section, { title: "محتوى المقال (Markdown)", children: [
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: form.body,
              onChange: (e) => setForm((p) => ({ ...p, body: e.target.value })),
              rows: 30,
              className: "w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-primary-blue font-mono text-sm leading-relaxed resize-y",
              dir: "rtl",
              placeholder: "# عنوان\n\nاكتب محتوى المقال هنا باستخدام Markdown..."
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-2", children: "يدعم Markdown: # للعناوين، **عريض**، *مائل**، [نص](رابط)، قوائم، جداول." })
        ] }),
        /* @__PURE__ */ jsxs(Section, { title: "الكاتب", children: [
          /* @__PURE__ */ jsx(Field, { label: "اسم الكاتب", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: form.author,
              onChange: (e) => setForm((p) => ({ ...p, author: e.target.value })),
              className: "w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue"
            }
          ) }),
          /* @__PURE__ */ jsx(Field, { label: "نبذة عن الكاتب", children: /* @__PURE__ */ jsx(
            "textarea",
            {
              value: form.authorBio,
              onChange: (e) => setForm((p) => ({ ...p, authorBio: e.target.value })),
              rows: 3,
              className: "w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue resize-y"
            }
          ) })
        ] })
      ] }),
      showPreview && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-4 max-h-[85vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-dark-blue mb-4 pb-2 border-b", children: "معاينة" }),
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-extrabold mb-3", children: form.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-4 italic", children: form.excerpt }),
        form.image && /* @__PURE__ */ jsx("img", { src: form.image, alt: form.imageAlt, className: "w-full rounded-xl mb-4" }),
        /* @__PURE__ */ jsx("div", { className: "article-body", dir: lang === "fr" ? "ltr" : "rtl", children: /* @__PURE__ */ jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], children: form.body }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: handleSave,
        disabled: status === "saving",
        className: "w-full flex items-center justify-center gap-2 bg-primary-blue hover:bg-dark-blue text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50",
        children: [
          status === "saving" ? /* @__PURE__ */ jsx(Loader2, { size: 18, className: "animate-spin" }) : /* @__PURE__ */ jsx(Save, { size: 18 }),
          /* @__PURE__ */ jsx("span", { children: status === "saving" ? "جاري الحفظ..." : status === "saved" ? "تم الحفظ ✓" : "حفظ" })
        ]
      }
    ) })
  ] });
};
const Section = ({ title, children }) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 space-y-4", children: [
  /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-gray-500 uppercase tracking-wider", children: title }),
  children
] });
const Field = ({ label, children }) => /* @__PURE__ */ jsxs("div", { children: [
  /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: label }),
  children
] });

export { AdminEditor as default };
