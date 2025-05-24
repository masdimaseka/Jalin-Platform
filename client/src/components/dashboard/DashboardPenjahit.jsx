import { useAuthPenjahit } from "../../queries/auth/authQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ProfilePenjahit } from "../ProfilePenjahit";
import { ListTransaksiForPenjahitFiltered } from "../transaksi/ListTransaksiForPenjahit";
import { useState } from "react";
import { Link } from "react-router-dom";

const DashboardPenjahit = () => {
  const [activeTab, setActiveTab] = useState("diproses");

  const { data: authPenjahit, isLoading } = useAuthPenjahit();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
      </div>
    );
  }

  return (
    <div>
      <ProfilePenjahit penjahit={authPenjahit} />

      <div className="flex flex-col lg:flex-row justify-between gap-8 items-center mt-8 mb-4 bg-white rounded-xl p-8 shadow-sm">
        <h1 className="text-lg sm:text-2xl font-semibold flex items-center gap-2">
          <img src="/jalinPoint.svg" className="w-6" />
          Point :{" "}
          <span
            className={`${
              authPenjahit.point > 2000 ? "text-success" : "text-error"
            }`}
          >
            {Number(authPenjahit.point).toLocaleString("id-ID", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </h1>
        <Link
          to={`/topup-point/${authPenjahit._id}`}
          className="btn btn-primary"
        >
          <Icon icon="fluent:cart-24-filled" width="24" height="24" />
          Isi Point
        </Link>
      </div>

      <div className="mt-12 pt-8 border-t-2 border-gray-300">
        <h1 className="text-lg sm:text-2xl font-semibold mb-8">
          Daftar Pekerjaanmu
        </h1>

        <div className="mb-12">
          <div className="flex overflow-x-auto flex-nowrap gap-8 mb-8">
            <div
              className={`whitespace-nowrap cursor-pointer ${
                activeTab === "diproses" &&
                "border-b-4 border-primary-jalin pb-2"
              }`}
              onClick={() => setActiveTab("diproses")}
            >
              Pekerjaan Berlangsung
            </div>
            <div
              className={`whitespace-nowrap cursor-pointer ${
                activeTab === "menunggu" &&
                "border-b-4 border-primary-jalin pb-2"
              }`}
              onClick={() => setActiveTab("menunggu")}
            >
              Permintaan Pekerjaan
            </div>
            <div
              className={`whitespace-nowrap cursor-pointer ${
                activeTab === "riwayat" &&
                "border-b-4 border-primary-jalin pb-2"
              }`}
              onClick={() => setActiveTab("riwayat")}
            >
              Riyawat Pekerjaan
            </div>
          </div>
          <div>
            {activeTab === "diproses" && (
              <ListTransaksiForPenjahitFiltered
                penjahit={authPenjahit}
                filter={["diproses"]}
              />
            )}

            {activeTab === "menunggu" && (
              <ListTransaksiForPenjahitFiltered
                penjahit={authPenjahit}
                filter={["menunggu"]}
              />
            )}

            {activeTab === "riwayat" && (
              <ListTransaksiForPenjahitFiltered
                penjahit={authPenjahit}
                filter={[
                  "selesai",
                  "dibatalkan",
                  "dibatalkan sistem",
                  "ditolak",
                ]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPenjahit;
