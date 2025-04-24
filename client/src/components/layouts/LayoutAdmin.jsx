import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";

const LayoutAdmin = () => {
  return (
    <div className="min-h-screen ">
      <NavbarAdmin />

      <main className="container mx-auto min-h-screen max-w-screen overflow-x-hidden px-8 lg:px-16 pt-8 pb-16 ">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;
