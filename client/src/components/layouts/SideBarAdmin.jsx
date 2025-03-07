import { Link, useLocation } from "react-router-dom";

const SideBarAdmin = () => {
  const location = useLocation();

  return (
    <div className="shadow-md  mx-auto min-w-max min-h-screen overflow-x-hidden px-8 lg:px-16 py-8 ">
      <h2 className="text-lg sm:text-xl font-semibold mb-8">
        <Link to="/admin">Dashborad</Link>
      </h2>
      <div className="flex flex-col gap-6 font-medium">
        <Link
          to="/admin/user"
          className={`w-full hover:text-primary-jalin ${
            location.pathname === "/admin/user" ? "font-bold text-blue-500" : ""
          }`}
        >
          Daftar User
        </Link>
        <Link
          to="/admin/penjahit"
          className={`w-full hover:text-primary-jalin ${
            location.pathname === "/admin/penjahit"
              ? "font-bold text-blue-500"
              : ""
          }`}
        >
          Daftar Penjahit
        </Link>
        <Link
          to="/admin/penjahit/verify"
          className={`w-full hover:text-primary-jalin ${
            location.pathname === "/admin/penjahit/verify"
              ? "font-bold text-blue-500"
              : ""
          }`}
        >
          Verifikasi Penjahit
        </Link>
        <Link
          to="/admin/penjahit/verify"
          className={`w-full hover:text-primary-jalin ${
            location.pathname === "/admin/transaksi"
              ? "font-bold text-blue-500"
              : ""
          }`}
        >
          Daftar Transaksi
        </Link>
        <Link
          to="/admin/kategori"
          className={`w-full hover:text-primary-jalin ${
            location.pathname === "/admin/kategori"
              ? "font-bold text-blue-500"
              : ""
          }`}
        >
          Daftar Kategori
        </Link>
      </div>
    </div>
  );
};

export default SideBarAdmin;
