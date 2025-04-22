import { useTransaksi } from "../../queries/transaksi/transaksiQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import SearchBar from "./../SearchBar";
import { Link } from "react-router-dom";
import { Pagination } from "../Pagination";
import { CardTransaksiForPenjahit } from "./CardTransaksi";

const ITEMS_PER_PAGE = 12;

export const ListTransaksi = () => {
  const { data: transaksi, isLoading } = useTransaksi();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase());
    setCurrentPage(1);
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

  const totalPages = Math.ceil(filteredTransaksi.length / ITEMS_PER_PAGE);

  const currentData = filteredTransaksi.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row mb-8 gap-4">
        <SearchBar onSearchChange={handleSearchChange} />
        <Link
          to="/jahitan/create"
          className="btn btn-primary text-white px-6 py-3 font-semibold"
        >
          Upload Jahitan
        </Link>
      </div>
      {currentData.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {currentData.map((t) => (
            <CardTransaksiForPenjahit key={t._id} transaksi={t} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Transaksi tidak ditemukan.</p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
