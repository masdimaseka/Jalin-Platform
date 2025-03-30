import { useLocation, useParams } from "react-router-dom";
import InputTransaksiToPenjahit from "../components/transaksi/InputTransaksiToPenjahit";
import InputTransaksi from "../components/transaksi/InputTransaksi";

const CreateTransaksiPage = () => {
  const location = useLocation();
  const { id } = useParams();

  const isToPenjahit = location.pathname !== "/jahitan/create";

  return (
    <div className="flex justify-center">
      {isToPenjahit ? <InputTransaksiToPenjahit id={id} /> : <InputTransaksi />}
    </div>
  );
};

export default CreateTransaksiPage;
