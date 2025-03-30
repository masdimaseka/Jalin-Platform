import { useAuthUser } from "../../queries/auth/authQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ProfilePenjait } from "../Profile";
import { usePenjahitByIdUser } from "../../queries/penjahit/penjahitQuery";
import { ListTransaksiForPenjahit } from "../transaksi/ListTransaksi";

const DashboardPenjahit = () => {
  const { data: authUser } = useAuthUser();
  const { data: penjahitByIdUser, isLoading } = usePenjahitByIdUser(
    authUser._id
  );

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
      </div>
    );
  }

  return (
    <div>
      <ProfilePenjait penjahit={penjahitByIdUser} />
      <div className="mt-12 pt-8 border-t-2 border-gray-300">
        <h1 className="text-lg sm:text-2xl font-semibold mb-8">
          Daftar Pekerjaanmu
        </h1>
        <ListTransaksiForPenjahit penjahit={penjahitByIdUser} />
      </div>
    </div>
  );
};

export default DashboardPenjahit;
