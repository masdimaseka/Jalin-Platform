import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthPenjahit, useAuthUser } from "../../queries/auth/authQuery";
import { Icon } from "@iconify/react";
import { useTransaksi } from "../../queries/transaksi/transaksiQuery";

const Navbar = () => {
  const { data: authUser, isLoading: isLoadingUser } = useAuthUser();
  const { data: authPenjahit, isLoading: isLoadingPenjahit } =
    useAuthPenjahit();
  const { data: transaksi, isLoading: isLoadingTransaksi } = useTransaksi();

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = [
    "/login",
    "/signup",
    "/verify-email",
    "/admin/login",
  ].includes(location.pathname);

  const pendingTransaksiCount = transaksi?.filter((t) => {
    if (!t.penjahit || !t.penjahit._id) return false;
    return (
      t.penjahit._id === authPenjahit?._id &&
      t.status.toLowerCase() === "menunggu"
    );
  }).length;

  if (isLoadingUser || isLoadingPenjahit || isLoadingTransaksi) return null;

  return (
    !isAuthPage && (
      <nav className={`navbar bg-primary-jalin shadow-md sticky top-0 z-50`}>
        <div className="container mx-auto flex items-center justify-between max-w-screen px-2 lg:px-16 py-2">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img
                src="/new_logo_putih.svg"
                alt="Logo jalin"
                className="h-10"
              />
            </Link>
          </div>

          <ul className="hidden lg:flex items-center gap-8">
            {["/", "/penjahit", "/jahitan", "/about"].map((path, index) => (
              <li key={index}>
                <Link
                  to={path}
                  className={`text-white hover:text-gray-300 transition duration-300 ${
                    location.pathname === path
                      ? "font-semibold border-b-2 border-white"
                      : "font-regular"
                  }`}
                >
                  {path === "/"
                    ? "Home"
                    : path.replace("/", "").replace("-", " ")}
                </Link>
              </li>
            ))}
            {authUser ? (
              <div className="flex items-center gap-4">
                {authPenjahit ? (
                  <>
                    {authPenjahit.isVerified === "diterima" && (
                      <Link
                        to="/penjahit/dashboard"
                        className="btn btn-white text-primary-jalin font-semibold relative"
                      >
                        Dashboard Penjahit
                        {pendingTransaksiCount > 0 && (
                          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {pendingTransaksiCount}
                          </span>
                        )}
                      </Link>
                    )}

                    {authPenjahit.isVerified === "ditolak" && (
                      <Link
                        to="/penjahit/register"
                        className="btn btn-white text-primary-jalin font-semibold"
                      >
                        Daftar Penjahit
                      </Link>
                    )}

                    {authPenjahit.isVerified === "onreview" && (
                      <div className="btn btn-white text-primary-jalin font-semibold cursor-default">
                        Menunggu Verifikasi
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to="/penjahit/register"
                    className="btn btn-white text-primary-jalin font-semibold"
                  >
                    Daftar Penjahit
                  </Link>
                )}

                <Link
                  to="/dashboard"
                  className="btn btn-white text-primary-jalin flex items-center gap-2 font-semibold"
                >
                  <img
                    src={authUser.profileImg || "/avatar.png"}
                    alt={authUser.name}
                    className="rounded-full w-8 h-8"
                  />
                  <span>{authUser.username}</span>
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-white text-primary-jalin font-bold"
              >
                Bergabung
              </Link>
            )}
          </ul>

          <div className="lg:hidden ">
            {!authUser && (
              <Link
                to="/login"
                className="btn btn-white text-primary-jalin font-bold"
              >
                Bergabung
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-ghost relative"
            >
              <Icon icon="ic:round-menu" width="30" height="30" color="white" />
              {pendingTransaksiCount > 0 && (
                <span
                  className={`${
                    isOpen && "hidden"
                  } absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center`}
                >
                  {pendingTransaksiCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <ul className="lg:hidden bg-white shadow-md p-4 absolute w-full left-0 top-[60px] z-10 flex flex-col gap-4">
            {["/", "/penjahit", "/jahitan", "/about"].map((path, index) => (
              <li key={index}>
                <Link
                  to={path}
                  className={`text-primary-jalin block py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300 ${
                    location.pathname === path
                      ? "font-semibold border-l-4 border-primary-jalin"
                      : "font-regular"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {path === "/"
                    ? "Home"
                    : path.replace("/", "").replace("-", " ")}
                </Link>
              </li>
            ))}
            {authUser && (
              <div className="flex flex-col gap-2 mt-4">
                {authPenjahit ? (
                  <Link
                    to="/penjahit/dashboard"
                    className="btn btn-primary text-white w-full relative"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard Penjahit
                    {pendingTransaksiCount > 0 && (
                      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {pendingTransaksiCount}
                      </span>
                    )}
                  </Link>
                ) : (
                  <Link
                    to="/penjahit/register"
                    className="btn btn-primary text-white w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Daftar Penjahit
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="btn btn-primary text-white w-full flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src={authUser.profileImg || "/avatar.png"}
                    alt={authUser.name}
                    className="rounded-full w-8 h-8"
                  />
                  <span>{authUser.username}</span>
                </Link>
              </div>
            )}
          </ul>
        )}
      </nav>
    )
  );
};

export default Navbar;
