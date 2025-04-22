import { useParams } from "react-router-dom";
import ListPointProduct from "../../components/transaksi/ListPointProduct";

const TopupPointPage = () => {
  const { id } = useParams();
  return (
    <div>
      <div className="flex items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-4xl font-semibold ">Top Up</h1>
        <div className="flex items-center gap-2 bg-primary-jalin text-white py-2 px-4 rounded-full">
          <img
            src="/jalinPoint.svg"
            className="w-6 sm:w-8 border-2 border-white rounded-full"
          />
          <p className="font-medium text-md sm:text-lg">Point</p>
        </div>
      </div>
      <div>
        <ListPointProduct penjahit={id} />
      </div>
    </div>
  );
};

export default TopupPointPage;
