import { useTransaksi } from "../../queries/transaksi/transaksiQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CardTransaksiCustomer, CardTransaksiPenjahit } from "./CardTransaksi";
import { useState } from "react";
import SearchBar from "./../SearchBar";
import { Link } from "react-router-dom";

export const ListTransaksi = () => {
  const { data: transaksi, isLoading } = useTransaksi();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase());
  };

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

  const filteredTransaksi = transaksi.filter((t) => {
    const matchesSearch = t.judul?.toLowerCase().includes(searchQuery);
    const notToPenjahit =
      t.penjahit?._id === undefined || t.penjahit?._id === null;
    const statusWaiting = t.status?.toLowerCase() === "menunggu";
    return matchesSearch && notToPenjahit && statusWaiting;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row mb-8 gap-4">
        <SearchBar onSearchChange={handleSearchChange} />
        <Link
          to="/jahitan/create"
          className="btn btn-primary text-white px-6 py-3 font-semibold "
        >
          Upload Jahitan
        </Link>
      </div>
      {filteredTransaksi.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {filteredTransaksi.map((t) => (
            <CardTransaksiPenjahit key={t._id} transaksi={t} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Transaksi tidak ditemukan.</p>
      )}
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
        <CardTransaksiCustomer key={t._id} transaksi={t} />
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
        <CardTransaksiPenjahit key={t._id} transaksi={t} />
      ))}
    </div>
  );
};
