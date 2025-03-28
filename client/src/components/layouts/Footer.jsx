import { Icon } from "@iconify/react/dist/iconify.js";
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
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-16 gap-4 text-center lg:text-left">
          <div>
            <Link to="/">
              <img
                src="/new_logo_putih.svg"
                alt="Logo jalin"
                className="h-16 mx-auto lg:mx-0"
              />
            </Link>
          </div>
          <div className="flex flex-col lg:items-end gap-8 lg:gap-0">
            <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
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

            <div className="flex gap-4">
              <h3 className="text-white">Contact us : </h3>
              <div className="flex gap-2">
                <Link
                  to="https://www.instagram.com/jalin.official/"
                  target="_blank"
                >
                  <Icon
                    icon="mdi:instagram"
                    width="24"
                    height="24"
                    color="white"
                  />
                </Link>
                <Link to="https://wa.me/6285183949145/" target="_blank">
                  <Icon
                    icon="mdi:whatsapp"
                    width="24"
                    height="24"
                    color="white"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-6 border-t-1 border-gray-100 mt-6 mx-12">
          <p className="text-white text-xs font-lighth">
            &copy; {new Date().getFullYear()} Jalin. All rights reserved.
          </p>
        </div>
      </footer>
    )
  );
};

export default Footer;
