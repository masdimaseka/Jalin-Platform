import { useParams } from "react-router-dom";
import DetailTransaksi from "../../components/transaksi/DetailTransaksi";
import { useAuthPenjahit } from "./../../queries/auth/authQuery";
import { useTransaksiById } from "../../queries/transaksi/transaksiQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import DetailTransaksiForPenjahit from "../../components/transaksi/DetailTransaksiForPenjahit";

const DetailJahitanPage = () => {
  const { id } = useParams();
  const { data: authPenjahit } = useAuthPenjahit();
  const { data: transaksiById, isLoading } = useTransaksiById(id);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
      </div>
    );
  }

  return (
    <div>
      {authPenjahit?.isVerified === "diterima" &&
      transaksiById?.user._id !== authPenjahit?.user._id ? (
        <DetailTransaksiForPenjahit id={id} />
      ) : (
        <DetailTransaksi id={id} />
      )}
    </div>
  );
};

export default DetailJahitanPage;
