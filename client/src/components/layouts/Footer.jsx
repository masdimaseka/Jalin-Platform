import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/verify-email" ||
    location.pathname === "/admin/login";

  return (
    !isAuthPage && (
      <footer className="bg-primary shadow-md buttom-0 ">
        <div className="container mx-auto flex items-center justify-between max-w-screen px-8 lg:px-16 py-4">
          <div>
            <Link to="/">
              <img
                src="/new_logo_putih.svg"
                alt="Logo jalin"
                className="h-24"
              />
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <Link to="/" className="font-medium text-white">
              Home
            </Link>

            <Link to="/" className="font-medium text-white">
              Cari Penjahit
            </Link>
            <Link to="/" className="font-medium text-white">
              Lihat Jahitan
            </Link>
            <Link to="/" className="font-medium text-white">
              About Us
            </Link>
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
