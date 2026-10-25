import React, { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';

// Lazy-loaded pages — each becomes its own code chunk
// and is only fetched when the user navigates to it.
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AcademicsPage = React.lazy(() => import('./pages/AcademicsPage'));
const AdmissionsPage = React.lazy(() => import('./pages/AdmissionsPage'));
const ApplyPage = React.lazy(() => import('./pages/ApplyPage'));
const BoardingFeesPage = React.lazy(() => import('./pages/BoardingFeesPage'));
const ActivitiesPage = React.lazy(() => import('./pages/ActivitiesPage'));
const EventsPage = React.lazy(() => import('./pages/EventsPage'));
const KitchenPage = React.lazy(() => import('./pages/KitchenPage'));
const SportsPage = React.lazy(() => import('./pages/SportsPage'));
const StudentsPage = React.lazy(() => import('./pages/StudentsPage'));
const TeachersPage = React.lazy(() => import('./pages/TeachersPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));

// Fallback shown while a page chunk is being fetched.
const PageLoader = () => (
  <div
    role="status"
    aria-label="Loading page"
    className="flex items-center justify-center min-h-[50vh] w-full"
  >
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-[#4747d7] border-t-transparent rounded-full animate-spin" />
      <span className="text-[#76767f] text-sm">Loading…</span>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/apply" element={<ApplyPage />} />
            <Route path="/boarding-fees" element={<BoardingFeesPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/kitchen" element={<KitchenPage />} />
            <Route path="/sports" element={<SportsPage />} />
            <Route path="/staff" element={<TeachersPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
