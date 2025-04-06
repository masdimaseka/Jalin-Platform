import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useAuthUser } from "./queries/auth/authQuery";
import { useAuthAdmin } from "./queries/admin/adminQuery";

import Layout from "./components/layouts/layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import TermAndConPage from "./pages/auth/TermAndConPage";
import EmailVerificationPage from "./pages/auth/EmailVerificationPage";
import RegisterPenjahit from "./pages/pejahit/RegisterPenjahitPage";
import StatusPage from "./pages/StatusPage";
import ListPenjahitPage from "./pages/pejahit/ListPenjahitPage";
import ListJahitanPage from "./pages/jahitan/ListJahitanPage";
import AboutPage from "./pages/AboutPage";
import DashboardPage from "./pages/DashboardPage";
import EditProfilePage from "./pages/auth/EditProfilePage";
import CreateTransaksiPage from "./pages/CreateTransaksiPage";
import ProfilePenjahitPage from "./pages/pejahit/ProfilePenjahitPage";
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import DashboardAdminPage from "./pages/admin/DashboardAdminPage";
import LoginAdminPage from "./pages/admin/LoginAdminPage";
import MenusAdminPage from "./pages/admin/MenusAdminPage";
import PreviewFilePage from "./pages/admin/PreviewFileAdminPage";
import NotFoundPage from "./pages/error/NotFoundPage";

const App = () => {
  const { data: authUser, isLoading: isLoading } = useAuthUser();
  const { data: authAdmin, isLoading: isLoadingAdmin } = useAuthAdmin();

  if (isLoading) return null;
  if (isLoadingAdmin) return null;

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/" element={<HomePage />} />
          <Route path="/status/:status" element={<StatusPage />} />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route path="/terms-and-conditions" element={<TermAndConPage />} />
          <Route
            path="/verify-email"
            element={
              !authUser ? <EmailVerificationPage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/dashboard"
            element={authUser ? <DashboardPage /> : <Navigate to="/login" />}
          />

          <Route path="/profile/edit/:id" element={<EditProfilePage />} />

          <Route path="/penjahit" element={<ListPenjahitPage />} />
          <Route
            path="/penjahit/register"
            element={
              authUser && authUser.role !== "penjahit" ? (
                <RegisterPenjahit />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/penjahit/dashboard"
            element={
              authUser && authUser.role === "penjahit" ? (
                <DashboardPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/penjahit/:id" element={<ProfilePenjahitPage />} />
          <Route path="/penjahit/apply/:id" element={<CreateTransaksiPage />} />

          <Route path="/jahitan" element={<ListJahitanPage />} />
          <Route path="/jahitan/create" element={<CreateTransaksiPage />} />

          <Route path="/about" element={<AboutPage />} />

          <Route
            path="/admin"
            element={
              <Navigate to={authAdmin ? "/admin/dashboard" : "/admin/login"} />
            }
          />

          <Route
            path="/admin/login"
            element={!authAdmin ? <LoginAdminPage /> : <Navigate to="/admin" />}
          />
        </Route>

        {authAdmin && (
          <Route element={<LayoutAdmin />}>
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/admin/dashboard"
              element={
                authAdmin ? (
                  <DashboardAdminPage />
                ) : (
                  <Navigate to="/admin/login" />
                )
              }
            />

            <Route
              path="/admin/user"
              element={
                authAdmin ? <MenusAdminPage /> : <Navigate to="/admin/login" />
              }
            />
            <Route
              path="/admin/penjahit"
              element={
                authAdmin ? <MenusAdminPage /> : <Navigate to="/admin/login" />
              }
            />
            <Route
              path="/admin/penjahit/verify"
              element={
                authAdmin ? <MenusAdminPage /> : <Navigate to="/admin/login" />
              }
            />
            <Route
              path="/admin/penjahit/verify/dok/:file"
              element={<PreviewFilePage />}
            />
            <Route
              path="/admin/kategori"
              element={
                authAdmin ? <MenusAdminPage /> : <Navigate to="/admin/login" />
              }
            />
          </Route>
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
