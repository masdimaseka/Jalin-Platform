import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isAuthPage = [
    "/login",
    "/signup",
    "/verify-email",
    "/admin/login",
  ].includes(location.pathname);

  return (
    !isAuthPage && (
      <footer className="bg-primary shadow-md bottom-0 w-full">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-6 gap-4 text-center lg:text-left">
          <div>
            <Link to="/">
              <img
                src="/new_logo_putih.svg"
                alt="Logo jalin"
                className="h-16 mx-auto lg:mx-0"
              />
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4">
            {[
              { path: "/", label: "Home" },
              { path: "/penjahit", label: "Cari Penjahit" },
              { path: "/jahitan", label: "Lihat Jahitan" },
              { path: "/about", label: "About Us" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="font-medium text-white hover:text-gray-300 transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
