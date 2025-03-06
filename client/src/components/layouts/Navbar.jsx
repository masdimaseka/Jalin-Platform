import { Link, useLocation } from "react-router-dom";
import { useAuthUser } from "../../queries/auth/authQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLogout } from "../../queries/auth/authMutation";
import { usePenjahit } from "./../../queries/penjahit/penjahitQuery";

const Navbar = () => {
  const { data: authUser, isLoading: isLoadingUser } = useAuthUser();
  const { data: penjahit, isLoading: isLoadingPenjahit } = usePenjahit();
  const { mutate: logutMutate } = useLogout();

  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/verify-email" ||
    location.pathname === "/admin/login";

  const userPenjahit = penjahit?.find((p) => p.user._id === authUser?._id);

  if (isLoadingUser) return null;
  if (isLoadingPenjahit) return null;

  return (
    !isAuthPage && (
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between max-w-screen px-8 lg:px-16 py-4">
          <div>
            <Link to="/">
              <img src="/new_logo.svg" alt="Logo jalin" className="h-10" />
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <Link to="/" className="font-medium ">
              Home
            </Link>
            <Link to="/" className="font-medium ">
              Cari Penjahit
            </Link>
            <Link to="/" className="font-medium ">
              Lihat Jahitan
            </Link>
            <Link to="/" className="font-medium ">
              About Us
            </Link>
            {authUser ? (
              <div className="flex items-center gap-4">
                {!userPenjahit && (
                  <Link
                    to="/penjahit/register"
                    className="btn btn-primary text-white flex items-center gap-2 font-semibold"
                  >
                    <span>Daftar Penjahit</span>
                  </Link>
                )}
                <Link className="btn btn-primary text-white flex items-center gap-2 font-semibold">
                  <Icon icon="ic:sharp-account-circle" width="24" height="24" />
                  <span>{authUser.username}</span>
                </Link>
                <button
                  className="btn border-0 bg-error text-white"
                  onClick={logutMutate}
                >
                  <Icon icon="majesticons:logout" width="24" height="24" />
                </button>
              </div>
            ) : (
              <div>
                <Link
                  to="/login"
                  className="btn btn-primary text-white font-bold"
                >
                  Bergabung
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    )
  );
};

export default Navbar;
