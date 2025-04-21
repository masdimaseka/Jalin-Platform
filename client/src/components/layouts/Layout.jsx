import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <div className="min-h-screen ">
        <Navbar />
        <main
          className={`mx-auto min-h-screen h-full max-w-screen overflow-x-hidden ${
            !isHomePage && "px-8 lg:px-16 pt-8 pb-24"
          }
            `}
        >
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
