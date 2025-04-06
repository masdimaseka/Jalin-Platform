import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavbarAdmin from "./NavbarAdmin";
import SideBarAdmin from "./SideBarAdmin";

const LayoutAdmin = () => {
  return (
    <div className="min-h-screen ">
      <NavbarAdmin />

      <div className="flex ">
        <SideBarAdmin />
        <main className="container mx-auto min-h-screen max-w-screen overflow-x-hidden px-8 lg:px-16 py-8">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default LayoutAdmin;
