import { useParams } from "react-router-dom";
import { ProfilePenjait } from "../../components/Profile";
import { ListTransaksiForPenjahit } from "../../components/transaksi/ListTransaksi";
import { usePenjahitById } from "../../queries/penjahit/penjahitQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
const ProfilePenjahitPage = () => {
  const { id } = useParams();
  const { data: penjahitById, isLoading } = usePenjahitById(id);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-semibold mb-8">
        Profile Penjahit
      </h1>
      <ProfilePenjait penjahit={penjahitById} />
      <div className="my-12 pt-8 border-t-2 border-gray-300">
        <h1 className="text-lg sm:text-2xl font-semibold mb-8">
          Daftar Pekerjaan
        </h1>
        <ListTransaksiForPenjahit penjahit={penjahitById} />
      </div>
    </div>
  );
};

export default ProfilePenjahitPage;
