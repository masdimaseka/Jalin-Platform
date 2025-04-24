import { useLocation } from "react-router-dom";
import ListUser from "../../components/admin/ListUser";
import ListVerifyPenjahit from "../../components/admin/ListVerifyPenjahit";
import ListPenjahit from "../../components/admin/ListPenjahit";
import ListCategory from "../../components/admin/ListCategory";
import CreateCategoryAdminPage from "./CreateCategoryAdminPage";
import ListTransaksiPoint from "../../components/admin/ListTransaksiPoint";
import ListTransaksi from "../../components/admin/ListTransaksi";

const MenusAdminPage = () => {
  const location = useLocation();

  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-semibold mb-8">
        {location.pathname === "/admin/user" && "Daftar User"}
        {location.pathname === "/admin/penjahit" && "Daftar Penjahit"}
        {location.pathname === "/admin/penjahit/verify" && "Daftar Penjahit"}
        {location.pathname === "/admin/category" && "Daftar Kategori"}
        {location.pathname === "/admin/category/create" && "Buat Kategori"}
        {location.pathname === "/admin/transaksi-point" &&
          "Daftar Transaksi Point"}
        {location.pathname === "/admin/transaksi" && "Daftar Transaksi Jahitan"}
      </h1>
      <div>
        {location.pathname === "/admin/user" && <ListUser />}
        {location.pathname === "/admin/penjahit" && <ListPenjahit />}
        {location.pathname === "/admin/penjahit/verify" && (
          <ListVerifyPenjahit />
        )}
        {location.pathname === "/admin/category" && <ListCategory />}
        {location.pathname === "/admin/category/create" && (
          <CreateCategoryAdminPage />
        )}
        {location.pathname === "/admin/transaksi-point" && (
          <ListTransaksiPoint />
        )}
        {location.pathname === "/admin/transaksi" && <ListTransaksi />}
      </div>
    </div>
  );
};

export default MenusAdminPage;
