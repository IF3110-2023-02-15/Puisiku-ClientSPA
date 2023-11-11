import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const LandingPage = lazy(() => import("@/pages/landing"));
const RegisterPage = lazy(() => import("@/pages/register"));
const LoginPage = lazy(() => import("@/pages/login"));

const HomePage = lazy(() => import("@/pages/home"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const AlbumPage = lazy(() => import("@/pages/album"));
const PoemDetailPage = lazy(() => import("@/pages/poemdetail"));

const UnauthorizedPage = lazy(() => import("@/pages/errors/401"));
const NotFoundPage = lazy(() => import("@/pages/errors/404"));

const Routing = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/album/:id" element={<AlbumPage />} />
            <Route path="/poem/:id" element={<PoemDetailPage />} />
          </Route>

          <Route path="/401" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Routing;
