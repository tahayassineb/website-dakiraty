import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { Image, Calendar, Pencil, GraduationCap, Mail, Lock, AlertCircle } from 'lucide-react';
import { a as api } from './api-jI3mfyCn.js';
import { g as getAdminToken, s as setAdminToken } from './convex-client-MQY61BTd.js';
import 'convex/server';

const Admin = () => {
  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState(null);
  useEffect(() => {
    setHasToken(!!getAdminToken());
  }, []);
  useEffect(() => {
    if (hasToken === true) {
      navigate("/admin/articles", { replace: true });
    }
  }, [hasToken, navigate]);
  if (hasToken === null) return null;
  if (hasToken === true) return null;
  return /* @__PURE__ */ jsx(LoginForm, { onSuccess: () => navigate("/admin/articles", { replace: true }) });
};
const LoginForm = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const login = useMutation(api.auth.login);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const result = await login({ email, password });
      setAdminToken(result.token);
      onSuccess();
    } catch (err) {
      const msg = err?.message || String(err);
      if (msg.toLowerCase().includes("invalid")) {
        setError("بيانات تسجيل الدخول غير صحيحة");
      } else if (msg.toLowerCase().includes("not configured")) {
        setError("لم يتم إعداد المصادقة. تحقق من متغيرات البيئة في Convex.");
      } else {
        setError("حدث خطأ. حاول مرة أخرى.");
      }
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br from-dark-blue via-primary-blue to-dark-blue flex items-center justify-center px-4", dir: "rtl", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-primary-blue rounded-2xl flex items-center justify-center text-white mx-auto mb-4", children: /* @__PURE__ */ jsx(GraduationCap, { size: 32 }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-dark-blue mb-2", children: "لوحة التحكم" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "سجّل دخولك لإدارة المقالات" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "البريد الإلكتروني" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Mail, { className: "absolute right-3 top-3.5 text-gray-400", size: 18 }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              required: true,
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pr-10 pl-4 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all text-right",
              placeholder: "name@example.com",
              dir: "ltr",
              autoComplete: "email"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "كلمة المرور" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Lock, { className: "absolute right-3 top-3.5 text-gray-400", size: 18 }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              required: true,
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: "w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pr-10 pl-4 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all text-right",
              placeholder: "••••••••",
              autoComplete: "current-password"
            }
          )
        ] })
      ] }),
      error && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 text-sm", children: [
        /* @__PURE__ */ jsx(AlertCircle, { size: 18, className: "shrink-0" }),
        /* @__PURE__ */ jsx("span", { children: error })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: submitting,
          className: "w-full bg-primary-blue hover:bg-dark-blue text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          children: submitting ? "جاري الدخول..." : "دخول"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-gray-400 mt-6", children: "صفحة محمية. الدخول مقتصر على المسؤولين." })
  ] }) });
};
const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = typeof window !== "undefined" ? getAdminToken() : null;
  const articles = useQuery(
    api.articles.listAdmin,
    token ? { token } : "skip"
  );
  const [query, setQuery] = useState("");
  const [langFilter, setLangFilter] = useState("all");
  if (!articles) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-20 text-gray-500", children: "جاري تحميل المقالات..." });
  }
  const filtered = articles.filter((a) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || a.title.toLowerCase().includes(q) || a.slug.toLowerCase().includes(q);
    const matchesLang = langFilter === "all" || a.lang === langFilter;
    return matchesQuery && matchesLang;
  });
  return /* @__PURE__ */ jsxs("div", { dir: "rtl", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-dark-blue mb-2", children: "المقالات" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm", children: [
        "عدد المقالات: ",
        articles.length
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: "ابحث في المقالات...",
          className: "flex-grow bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-primary-blue text-sm"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [
        { key: "all", label: "الكل" },
        { key: "ar", label: "العربية" },
        { key: "fr", label: "الفرنسية" }
      ].map((opt) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setLangFilter(opt.key),
          className: `px-4 py-2 rounded-lg text-sm font-bold transition-colors ${langFilter === opt.key ? "bg-primary-blue text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
          children: opt.label
        },
        opt.key
      )) })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-12 text-gray-500 bg-white rounded-2xl", children: "لا توجد مقالات مطابقة." }) : /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: filtered.map((article) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => navigate(`/admin/edit/${article._id}`),
        className: "bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4 flex items-center gap-4 text-right group",
        children: [
          article.image ? /* @__PURE__ */ jsx(
            "img",
            {
              src: article.image,
              alt: article.imageAlt,
              className: "w-20 h-20 object-cover rounded-lg shrink-0",
              loading: "lazy"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 shrink-0", children: /* @__PURE__ */ jsx(Image, { size: 24 }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-grow min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `text-xs font-bold px-2 py-0.5 rounded ${article.lang === "fr" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`,
                  children: article.lang === "fr" ? "FR" : "AR"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: article.category }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-400 flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Calendar, { size: 12 }),
                article.date
              ] })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-dark-blue mb-1 line-clamp-1 group-hover:text-primary-blue transition-colors", children: article.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 line-clamp-1", children: article.excerpt })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "shrink-0 text-gray-400 group-hover:text-primary-blue transition-colors", children: /* @__PURE__ */ jsx(Pencil, { size: 20 }) })
        ]
      },
      article._id
    )) })
  ] });
};

export { AdminDashboard, Admin as default };
