import { useAuthUser } from "../../queries/auth/authQuery";
import {
  ListTransaksi,
  ListTransaksiForUser,
} from "../transaksi/ListTransaksi";
import { Profile } from "./../Profile";

const DashboardUser = () => {
  const { data: authUser } = useAuthUser();

  return (
    <div>
      <Profile user={authUser} />
      <div className="mt-12 pt-8 border-t-2 border-gray-300">
        <h1 className="text-lg sm:text-2xl font-semibold mb-8">
          Daftar Jahitanmu
        </h1>
        <ListTransaksiForUser user={authUser} />
      </div>
    </div>
  );
};

export default DashboardUser;
