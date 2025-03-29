import { useParams } from "react-router-dom";
import { InputTransaksiToPenjahit } from "../components/transaksi/InputTransaksi";
const CreateTransaksiPage = () => {
  const { id } = useParams();
  return (
    <div className="flex justify-center">
      <InputTransaksiToPenjahit id={id} />
    </div>
  );
};

export default CreateTransaksiPage;
