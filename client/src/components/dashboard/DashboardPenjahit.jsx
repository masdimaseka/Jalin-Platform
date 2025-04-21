import { useAuthUser } from "../../queries/auth/authQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePenjahitByIdUser } from "../../queries/penjahit/penjahitQuery";
import { ProfilePenjahit } from "../Profile";
import {
  ListTransaksiForPenjahit,
  ListTransaksiForPenjahitFiltered,
} from "../transaksi/ListTransaksiForPenjahit";
import { useState } from "react";

const DashboardPenjahit = () => {
  const [activeTab, setActiveTab] = useState("diproses");

  const { data: authUser } = useAuthUser();
  const { data: penjahitByIdUser, isLoading } = usePenjahitByIdUser(
    authUser._id
  );

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
      </div>
    );
  }

  return (
    <div>
      <ProfilePenjahit penjahit={penjahitByIdUser} />
      <div className="mt-12 pt-8 border-t-2 border-gray-300">
        <h1 className="text-lg sm:text-2xl font-semibold mb-8">
          Daftar Pekerjaanmu
        </h1>

        <div className="mb-12">
          <div class="flex overflow-x-auto flex-nowrap gap-8 mb-8">
            <div
              class={`whitespace-nowrap ${
                activeTab === "diproses" &&
                "border-b-4 border-primary-jalin pb-2"
              }`}
              onClick={() => setActiveTab("diproses")}
            >
              Pekerjaan Berlangsung
            </div>
            <div
              class={`whitespace-nowrap ${
                activeTab === "menunggu" &&
                "border-b-4 border-primary-jalin pb-2"
              }`}
              onClick={() => setActiveTab("menunggu")}
            >
              Permintaan Pekerjaan
            </div>
            <div
              class={`whitespace-nowrap ${
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
                penjahit={penjahitByIdUser}
                filter={["diproses"]}
              />
            )}

            {activeTab === "menunggu" && (
              <ListTransaksiForPenjahitFiltered
                penjahit={penjahitByIdUser}
                filter={["menunggu"]}
              />
            )}

            {activeTab === "riwayat" && (
              <ListTransaksiForPenjahitFiltered
                penjahit={penjahitByIdUser}
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
