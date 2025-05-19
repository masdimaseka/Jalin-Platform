import { useParams } from "react-router-dom";
import DetailTransaksi from "../../components/transaksi/DetailTransaksi";

const DetailJahitanPage = () => {
  const { id } = useParams();
  return (
    <div>
      <DetailTransaksi id={id} />
    </div>
  );
};

export default DetailJahitanPage;
