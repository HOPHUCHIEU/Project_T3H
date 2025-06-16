import { useRoutes, useLocation } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import "./App.css";
import Loading from "./components/Loading";
import MainLayout from "./layout/MainLayout";
import AboutPage from "./page/AboutPage";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import NewsDetail from "./page/NewsDetail";
import NewsPage from "./page/NewsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUpPage from "./page/SignupPage";
import Service from "./page/service";
import Contact from "./page/Contact";
import Profile from "./page/Profile";
import Bookings from "./page/Bookings";
import Payments from "./page/Payments";
import DashboardPage from "./page/DashboardPage";
import UserManagementPage from "./page/UserManagementPage";
import MenuManagementPage from "./page/MenuManagementPage";
import { AuthProvider } from "./context/AuthContext";

function PageWrapper({ children }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {isLoading && <Loading />}
      {children}
    </>
  );
}

function App() {
  const routes = [
    {
      path: "/login",
      element: <PageWrapper><LoginPage /></PageWrapper>,
    },
    {
      path: "/",
      element: <PageWrapper><HomePage /></PageWrapper>,
    },
    {
      path: "/about",
      element: <PageWrapper><AboutPage /></PageWrapper>,
    },
    {
      path: "/service",
      element: <PageWrapper><Service /></PageWrapper>,
    },
    {
      path: "/contact",
      element: <PageWrapper><Contact /></PageWrapper>,
    },
    {
      path: "/profile",
      element: <PageWrapper><Profile /></PageWrapper>,
    },
    {
      path: "/bookings",
      element: <PageWrapper><Bookings /></PageWrapper>,
    },
    {
      path: "/payments",
      element: <PageWrapper><Payments /></PageWrapper>,
    },
    {
      path: "/signup",
      element: <PageWrapper><SignUpPage /></PageWrapper>,
    },
    {
      path: "/dashboard",
      element: (
        <PageWrapper>
          <ProtectedRoute adminOnly={true}>
            <DashboardPage />
          </ProtectedRoute>
        </PageWrapper>
      ),
    },
    {
      path: "/users",
      element: (
        <PageWrapper>
          <ProtectedRoute adminOnly={true}>
            <UserManagementPage />
          </ProtectedRoute>
        </PageWrapper>
      ),
    },
    {
      path: "/menu",
      element: (
        <PageWrapper>
          <ProtectedRoute adminOnly={true}>
            <MenuManagementPage />
          </ProtectedRoute>
        </PageWrapper>
      ),
    },
    {
      path: "*",
      element: <PageWrapper><>Not Found</></PageWrapper>,
    },
  ];

  const elementsRoutes = useRoutes(routes);
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        {elementsRoutes}
      </Suspense>
    </AuthProvider>
  );
}

export default App;
