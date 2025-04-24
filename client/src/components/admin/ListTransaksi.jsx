import { useState } from "react";
import { useTransaksiByAdmin } from "../../queries/admin/adminQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

const ListTransaksi = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCreated, setFilterCreated] = useState("");
  const [filterUpdated, setFilterUpdated] = useState("");

  const { data: transaksiByAdmin, isLoading } = useTransaksiByAdmin();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
      </div>
    );
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredTransaksi = transaksiByAdmin?.filter((t) => {
    const matchesSearch =
      t.penjahit?.user.name?.toLowerCase().includes(searchQuery) ||
      t.user?.name?.toLowerCase().includes(searchQuery);

    const matchesStatus = filterStatus ? t.status === filterStatus : true;

    const matchesCreated = filterCreated
      ? new Date(t.createdAt).toISOString().split("T")[0] === filterCreated
      : true;

    const matchesUpdated = filterUpdated
      ? new Date(t.updatedAt).toISOString().split("T")[0] === filterUpdated
      : true;

    return matchesSearch && matchesStatus && matchesCreated && matchesUpdated;
  });

  return (
    <>
      <div className="flex gap-4 items-center mb-4">
        <div>
          <label htmlFor="name">Cari user</label>
          <SearchBar
            onSearchChange={handleSearchChange}
            placeholder="Search user..."
          />
        </div>

        <div>
          <label htmlFor="tglCreate">Tanggal dibuat</label>
          <input
            type="date"
            className="input input-bordered mb-4"
            placeholder="Filter by created"
            onChange={(e) => setFilterCreated(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="tglUpdate">Tanggal diperbarui</label>
          <input
            type="date"
            className="input input-bordered mb-4"
            placeholder="Filter by updated"
            onChange={(e) => setFilterUpdated(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="status">Status transaksi</label>
          <select
            className="select select-bordered mb-4"
            onChange={(e) => setFilterStatus(e.target.value)}
            value={filterStatus}
          >
            <option value="">All Status</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Diproses">Diproses</option>
            <option value="Selesai">Selesai</option>
            <option value="Dibatalkan">Dibatalkan</option>
            <option value="Dibatalkan Sistem">Dibatalkan Sistem</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-xs min-w-max w-full border border-base-content/5 bg-base-100">
          <thead>
            <tr className="text-center">
              <th className="py-4 px-4 border border-base-content/5">No</th>
              <th className="py-4 px-4 border border-base-content/5">Dibuat</th>
              <th className="py-4 px-4 border border-base-content/5">
                Diperbarui
              </th>
              <th className="py-4 px-4 border border-base-content/5">
                Nama Penjahit
              </th>
              <th className="py-4 px-4 border border-base-content/5">
                Nama Customer
              </th>
              <th className="py-4 px-4 border border-base-content/5">
                Tenggat Waktu
              </th>
              <th className="py-4 px-4 border border-base-content/5">Status</th>
              <th className="py-4 px-4 border border-base-content/5">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransaksi?.length > 0 ? (
              filteredTransaksi.map((t, index) => (
                <tr key={t._id}>
                  <td className="text-center py-2 px-4 border border-base-content/5">
                    {index + 1}
                  </td>
                  <td className="text-center py-2 px-4 border border-base-content/5">
                    {new Date(t.createdAt).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="text-center py-2 px-4 border border-base-content/5">
                    {new Date(t.updatedAt).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-2 px-4 border border-base-content/5">
                    <a
                      href={`/admin/penjahit/${t.penjahit?._id}`}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={t.penjahit?.user.profileImg || "/avatar.png"}
                        alt={t.penjahit?.user.name}
                        className="rounded-full w-8 h-8"
                      />
                      <div>
                        <p className="font-semibold">
                          {t.penjahit?.user.name || "Tidak tersedia"}
                        </p>
                        <p>{t.penjahit?.user.username || "Tidak tersedia"}</p>
                      </div>
                    </a>
                  </td>
                  <td className="py-2 px-4 border border-base-content/5">
                    <a
                      href={`/admin/user/${t.user?._id}`}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={t.user?.profileImg || "/avatar.png"}
                        alt={t.user?.name}
                        className="rounded-full w-8 h-8"
                      />
                      <div>
                        <p className="font-semibold">
                          {t.user?.name || "Tidak tersedia"}
                        </p>
                        <p>{t.user?.username || "Tidak tersedia"}</p>
                      </div>
                    </a>
                  </td>
                  <td className="text-center py-2 px-4 border border-base-content/5">
                    {new Date(t.tenggatWaktu).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="text-center py-2 px-4 border border-base-content/5">
                    {t.status === "Menunggu" && (
                      <div className="badge badge-warning" target="_blank">
                        <p className="text-xs text-white">{t.status}</p>
                      </div>
                    )}
                    {t.status === "Diproses" && (
                      <div className="badge badge-info" target="_blank">
                        <p className="text-xs text-white">{t.status}</p>
                      </div>
                    )}
                    {t.status === "Selesai" && (
                      <div className="badge badge-success" target="_blank">
                        <p className="text-xs text-white">{t.status}</p>
                      </div>
                    )}
                    {(t.status === "Dibatalkan" ||
                      t.status === "Dibatalkan Sistem" ||
                      t.status === "Ditolak") && (
                      <div className="badge badge-error" target="_blank">
                        <p className="text-xs text-white">{t.status}</p>
                      </div>
                    )}
                  </td>
                  <td className="text-center py-2 px-4  border border-base-content/5">
                    <Link
                      to={`/admin/transaksi/${t._id}`}
                      className="btn btn-primary mr-2"
                    >
                      <Icon icon="carbon:view-filled" width="16" height="16" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  Tidak ada transaksi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListTransaksi;
