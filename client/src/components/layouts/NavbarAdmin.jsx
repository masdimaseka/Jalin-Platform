import { Link } from "react-router-dom";
import { useAuthAdmin } from "../../queries/admin/adminQuery";
import { useLogoutAdmin } from "../../queries/admin/adminMutation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import Category from "./../../../../server/models/category.model";

const NavbarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: authAdmin } = useAuthAdmin();
  const { mutate: logutAdminMutate } = useLogoutAdmin();

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between max-w-screen px-8 lg:px-16 py-4">
          <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            <Icon
              icon="ic:round-menu"
              width="40"
              height="40"
              className="text-primary-jalin"
            />
          </button>

          <div>
            <Link to="/admin">
              <img
                src="/new_logo.svg"
                alt="Logo jalin"
                className="h-10 hidden lg:block"
              />
            </Link>
          </div>
          <div className="flex items-center gap-4 ">
            <Link className="btn btn-primary text-white  items-center gap-2 font-bold flex">
              <Icon icon="ic:sharp-account-circle" width="24" height="24" />
              <span>{authAdmin.username}</span>
            </Link>
            <button
              className="btn border-0  bg-error text-white"
              onClick={logutAdminMutate}
            >
              <Icon icon="majesticons:logout" width="24" height="24" />
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <ul
          className={`menu shadow-md bg-white gap-4 rounded-box w-80 mx-auto min-w-max min-h-screen overflow-x-hidden px-8 lg:px-16 py-8 fixed z-40 text-md`}
        >
          <li className="block lg:hidden">
            <Link to="/admin">
              <img src="/new_logo.svg" alt="Logo jalin" className="h-10 " />
            </Link>
          </li>
          <li>
            <Link
              to="/admin/dashboard"
              className={`w-full hover:text-primary-jalin ${
                location.pathname === "/admin/dashboard"
                  ? "font-bold text-blue-500"
                  : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Icon
                icon="ic:round-dashboard"
                width="20"
                height="20"
                className="text-primary-jalin"
              />
              Dashboard
            </Link>
          </li>

          <li>
            <details open>
              <summary>
                <Icon
                  icon="solar:user-bold"
                  width="20"
                  height="20"
                  className="text-primary-jalin"
                />
                Kelola User
              </summary>
              <ul>
                <li>
                  <Link
                    to="/admin/user"
                    className={`w-full hover:text-primary-jalin ${
                      location.pathname === "/admin/user"
                        ? "font-bold text-blue-500"
                        : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Daftar User
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details open>
              <summary>
                <Icon
                  icon="ic:round-work"
                  width="20"
                  height="20"
                  className="text-primary-jalin"
                />
                Kelola Penjahit
              </summary>
              <ul>
                <li>
                  <Link
                    to="/admin/penjahit"
                    className={`w-full hover:text-primary-jalin ${
                      location.pathname === "/admin/penjahit"
                        ? "font-bold text-blue-500"
                        : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Daftar Penjahit
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/penjahit/verify"
                    className={`w-full hover:text-primary-jalin ${
                      location.pathname === "/admin/penjahit/verify"
                        ? "font-bold text-blue-500"
                        : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Verifikasi Penjahit
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details open>
              <summary>
                <Icon
                  icon="map:clothing-store"
                  width="20"
                  height="20"
                  className="text-primary-jalin"
                />
                Kelola Jahitan
              </summary>
              <ul>
                <li>
                  <Link
                    to="/admin/transaksi"
                    className={`w-full hover:text-primary-jalin ${
                      location.pathname === "/admin/transaksi"
                        ? "font-bold text-blue-500"
                        : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Daftar Jahitan
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details open>
              <summary>
                <img src="/jalinPoint.svg" className="w-5 inline" />
                Kelola Point
              </summary>
              <ul>
                <li>
                  <Link
                    to="/admin/transaksi-point"
                    className={`w-full hover:text-primary-jalin ${
                      location.pathname === "/admin/transaksi-point"
                        ? "font-bold text-blue-500"
                        : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Daftar Transaksi
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details open>
              <summary>
                <Icon
                  icon="material-symbols:category"
                  width="20"
                  height="20"
                  className="text-primary-jalin"
                />
                Kelola Kategori
              </summary>
              <ul>
                <li>
                  <Link
                    to="/admin/category"
                    className={`w-full hover:text-primary-jalin ${
                      location.pathname === "/admin/category"
                        ? "font-bold text-blue-500"
                        : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Daftar Kategori
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/category/create"
                    className={`w-full hover:text-primary-jalin ${
                      location.pathname === "/admin/category/create"
                        ? "font-bold text-blue-500"
                        : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Buat Kategori Baru
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      )}
    </>
  );
};

export default NavbarAdmin;
