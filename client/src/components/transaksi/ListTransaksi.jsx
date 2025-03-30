import { useTransaksi } from "../../queries/transaksi/transaksiQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import CardTransaksi from "./CardTransaksi";

export const ListTransaksi = () => {
  const { data: transaksi, isLoading } = useTransaksi();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
      </div>
    );
  }

  if (!transaksi || transaksi.length === 0) {
    return (
      <h1 className="text-center text-lg font-semibold mt-4">
        Tidak ada transaksi yang tersedia
      </h1>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {transaksi.map((t) => (
        <CardTransaksi key={t._id} transaksi={t} show="Penjahit" />
      ))}
    </div>
  );
};

export const ListTransaksiForUser = ({ user }) => {
  const { data: transaksi, isLoading } = useTransaksi();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
      </div>
    );
  }

  if (!transaksi) {
    return (
      <h1 className="text-center text-lg font-semibold mt-4">
        Tidak ada transaksi yang tersedia
      </h1>
    );
  }

  const filteredTransaksi = transaksi.filter((t) => t.user?._id === user._id);

  if (filteredTransaksi.length === 0) {
    return (
      <h1 className="text-center text-lg font-semibold mt-4">
        Tidak ada transaksi yang tersedia
      </h1>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {filteredTransaksi.map((t) => (
        <CardTransaksi key={t._id} transaksi={t} show="Penjahit" />
      ))}
    </div>
  );
};

export const ListTransaksiForPenjahit = ({ penjahit }) => {
  const { data: transaksi, isLoading } = useTransaksi();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
      </div>
    );
  }

  if (!transaksi) {
    return (
      <h1 className="text-center text-lg font-semibold mt-4">
        Tidak ada transaksi yang tersedia
      </h1>
    );
  }

  const filteredTransaksi = transaksi.filter(
    (t) => t.penjahit?._id === penjahit._id
  );

  if (filteredTransaksi.length === 0) {
    return (
      <h1 className="text-center text-lg font-semibold mt-4">
        Tidak ada transaksi yang tersedia
      </h1>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {filteredTransaksi.map((t) => (
        <CardTransaksi key={t._id} transaksi={t} show="Customer" />
      ))}
    </div>
  );
};
