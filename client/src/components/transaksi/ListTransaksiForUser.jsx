import { Icon } from "@iconify/react/dist/iconify.js";
import { useTransaksi } from "../../queries/transaksi/transaksiQuery";
import { CardTransaksiForCustomer } from "./CardTransaksi";

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
        <CardTransaksiForCustomer key={t._id} transaksi={t} />
      ))}
    </div>
  );
};
export const ListTransaksiForUserFiltered = ({ user, filter }) => {
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

  const filteredTransaksi = transaksi.filter((t) => {
    const matchesSearch = t.user?._id === user._id;
    const statusFilter = filter.includes(t.status?.toLowerCase());
    return matchesSearch && statusFilter;
  });

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
        <CardTransaksiForCustomer key={t._id} transaksi={t} />
      ))}
    </div>
  );
};
