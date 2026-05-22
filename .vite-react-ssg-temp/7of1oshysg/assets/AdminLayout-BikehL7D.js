import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Outlet, Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { ShieldAlert, FileText, Home, LogOut } from 'lucide-react';
import { C as ConvexClientProvider } from '../index.mjs';
import { S as Seo } from './Seo-RAKbgilb.js';
import { a as api } from './api-jI3mfyCn.js';
import { g as getAdminToken, c as clearAdminToken } from './convex-client-MQY61BTd.js';
import 'vite-react-ssg';
import '@vercel/analytics/react';
import 'convex/server';

const AdminShell = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState(null);
  const token = typeof window !== "undefined" ? getAdminToken() : null;
  useEffect(() => {
    setHasToken(!!getAdminToken());
  }, [token]);
  const verification = useQuery(api.auth.verify, token ? { token } : "skip");
  useEffect(() => {
    if (verification && !verification.valid) {
      clearAdminToken();
      setHasToken(false);
    }
  }, [verification]);
  const isLoginPage = pathname === "/admin" || pathname === "/admin/";
  const handleLogout = () => {
    clearAdminToken();
    setHasToken(false);
    navigate("/admin", { replace: true });
  };
  if (hasToken === false || verification && !verification.valid) {
    if (!isLoginPage) {
      if (typeof window !== "undefined") {
        navigate("/admin", { replace: true });
      }
      return null;
    }
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsx(Outlet, {}) });
  }
  if (hasToken === null || token && verification === void 0) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "text-gray-500", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", dir: "rtl", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-dark-blue text-white shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(ShieldAlert, { size: 20, className: "text-accent-yellow" }),
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: "لوحة التحكم" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs bg-white/10 px-2 py-0.5 rounded", children: "Admin" })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/admin/articles",
            className: "flex items-center gap-1.5 text-sm text-blue-100 hover:text-white transition-colors",
            children: [
              /* @__PURE__ */ jsx(FileText, { size: 16 }),
              /* @__PURE__ */ jsx("span", { children: "المقالات" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/",
            className: "flex items-center gap-1.5 text-sm text-blue-100 hover:text-white transition-colors",
            children: [
              /* @__PURE__ */ jsx(Home, { size: 16 }),
              /* @__PURE__ */ jsx("span", { children: "الموقع" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleLogout,
            className: "flex items-center gap-1.5 text-sm bg-red-500/20 hover:bg-red-500/40 px-3 py-1.5 rounded-lg transition-colors",
            children: [
              /* @__PURE__ */ jsx(LogOut, { size: 16 }),
              /* @__PURE__ */ jsx("span", { children: "خروج" })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
};
const AdminLayout = () => {
  return /* @__PURE__ */ jsxs(ConvexClientProvider, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "لوحة التحكم - Coach Ahmed",
        description: "Admin panel",
        path: "/admin",
        noindex: true
      }
    ),
    /* @__PURE__ */ jsx(AdminShell, {})
  ] });
};

export { AdminLayout as default };
