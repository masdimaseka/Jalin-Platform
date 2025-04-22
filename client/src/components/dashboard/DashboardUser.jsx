import { useState } from "react";
import { useAuthUser } from "../../queries/auth/authQuery";
import { ListTransaksiForUserFiltered } from "../transaksi/ListTransaksiForUser";
import { Profile } from "./../Profile";

const DashboardUser = () => {
  const [activeTab, setActiveTab] = useState("diproses");
  const { data: authUser } = useAuthUser();

  return (
    <div>
      <Profile user={authUser} />
      <div className="mt-12 pt-8 border-t-2 border-gray-300">
        <h1 className="text-lg sm:text-2xl font-semibold mb-8">
          Daftar Jahitanmu
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
              Menunggu Konfirmasi
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
              <ListTransaksiForUserFiltered
                user={authUser}
                filter={["diproses"]}
              />
            )}

            {activeTab === "menunggu" && (
              <ListTransaksiForUserFiltered
                user={authUser}
                filter={["menunggu"]}
              />
            )}

            {activeTab === "riwayat" && (
              <ListTransaksiForUserFiltered
                user={authUser}
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

export default DashboardUser;
