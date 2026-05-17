import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const ProgramDetails = lazy(() => import('./pages/ProgramDetails'));
const DakiratyLanding = lazy(() => import('./pages/DakiratyLanding'));
const Blog = lazy(() => import('./pages/Blog'));
const KidsMemoryLanding = lazy(() => import('./pages/KidsMemoryLanding'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dakiraty" element={<DakiratyLanding />} />
            <Route path="/quran" element={<ProgramDetails type="quran" />} />
            <Route path="/kids-memory" element={<KidsMemoryLanding />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default App;