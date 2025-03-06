import { useLocation } from "react-router-dom";
import ListUser from "../../components/admin/ListUser";
import ListVerifyPenjahit from "../../components/admin/ListVerifyPenjahit";
import ListPenjahit from "../../components/admin/ListPenjahit";

const MenuPages = () => {
  const location = useLocation();

  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-semibold mb-8">
        {location.pathname === "/admin/user" && "Daftar User"}
        {location.pathname === "/admin/penjahit" && "Daftar Penjahit"}
        {location.pathname === "/admin/penjahit/verify" && "Daftar Penjahit"}
      </h1>
      <div>
        {location.pathname === "/admin/user" && <ListUser />}
        {location.pathname === "/admin/penjahit" && <ListPenjahit />}
        {location.pathname === "/admin/penjahit/verify" && (
          <ListVerifyPenjahit />
        )}
      </div>
    </div>
  );
};

export default MenuPages;
