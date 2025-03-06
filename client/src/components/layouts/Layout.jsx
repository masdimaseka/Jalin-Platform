import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuthAdmin } from "../../queries/admin/adminQuery";
import NavbarAdmin from "./NavbarAdmin";
import SideBarAdmin from "./SideBarAdmin";
const Layout = ({ children }) => {
  const { data: authAdmin, isLoadingAdmin } = useAuthAdmin();

  if (isLoadingAdmin) return null;

  return (
    <>
      <div className="min-h-screen ">
        {!authAdmin ? <Navbar /> : <NavbarAdmin />}
        {authAdmin ? (
          <div className="flex ">
            <SideBarAdmin />
            <main className="container mx-auto min-h-screen max-w-screen overflow-x-hidden px-8 lg:px-16 py-8 ">
              {children}
            </main>
          </div>
        ) : (
          <main className=" container mx-auto min-h-screen max-w-screen overflow-x-hidden px-8 lg:px-16 py-8 ">
            {children}
          </main>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
