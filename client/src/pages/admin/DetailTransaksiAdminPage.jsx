import { useParams } from "react-router-dom";
import { useTransaksiByIdByAdmin } from "../../queries/admin/adminQuery";
import { Icon } from "@iconify/react/dist/iconify.js";

const DetailTransaksiAdminPage = () => {
  const { id } = useParams();

  const { data: transaksiByAdmin, isLoading } = useTransaksiByIdByAdmin(id);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-semibold mb-8">
        Detail Transaksi
      </h1>
      <div className="overflow-x-auto ">
        <table className="table w-200 border border-base-content/5 bg-base-100 border-collapse">
          <tbody>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Image
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                <img
                  src={transaksiByAdmin?.image || "/avatar.png"}
                  className="w-60"
                />
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Judul
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {transaksiByAdmin?.judul}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Deskripsi
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {transaksiByAdmin?.deskripsi}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Tenggat Waktu
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {new Date(transaksiByAdmin?.tenggatWaktu).toLocaleString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Status
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {transaksiByAdmin?.status === "Menunggu" && (
                  <div className="badge badge-warning" target="_blank">
                    <p className="text-xs text-white">
                      {transaksiByAdmin?.status}
                    </p>
                  </div>
                )}
                {transaksiByAdmin?.status === "Diproses" && (
                  <div className="badge badge-info" target="_blank">
                    <p className="text-xs text-white">
                      {transaksiByAdmin?.status}
                    </p>
                  </div>
                )}
                {transaksiByAdmin?.status === "Selesai" && (
                  <div className="badge badge-success" target="_blank">
                    <p className="text-xs text-white">
                      {transaksiByAdmin?.status}
                    </p>
                  </div>
                )}
                {(transaksiByAdmin?.status === "Dibatalkan" ||
                  transaksiByAdmin?.status === "Dibatalkan Sistem" ||
                  transaksiByAdmin?.status === "Ditolak") && (
                  <div className="badge badge-error" target="_blank">
                    <p className="text-xs text-white">
                      {transaksiByAdmin?.status}
                    </p>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Pengerjaan
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {transaksiByAdmin?.pengerjaan}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Catatan
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {transaksiByAdmin?.catatan || "Tidak ada catatan"}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Dibuat
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {new Date(transaksiByAdmin?.createdAt).toLocaleString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Diubah
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {new Date(transaksiByAdmin?.updatedAt).toLocaleString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Penjahit
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                <a
                  href={`/admin/penjahit/${transaksiByAdmin?.penjahit?._id}`}
                  className="flex items-center gap-2"
                >
                  <img
                    src={
                      transaksiByAdmin?.penjahit?.user.profileImg ||
                      "/avatar.png"
                    }
                    alt={transaksiByAdmin?.penjahit?.user.name}
                    className="rounded-full w-8 h-8"
                  />
                  <div>
                    <p className="font-semibold">
                      {transaksiByAdmin?.penjahit?.user.name ||
                        "Tidak tersedia"}
                    </p>
                    <p>
                      {transaksiByAdmin?.penjahit?.user.username ||
                        "Tidak tersedia"}
                    </p>
                  </div>
                </a>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Customer
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                <a
                  href={`/admin/user/${transaksiByAdmin?.user?._id}`}
                  className="flex items-center gap-2"
                >
                  <img
                    src={transaksiByAdmin?.user?.profileImg || "/avatar.png"}
                    alt={transaksiByAdmin?.user?.name}
                    className="rounded-full w-8 h-8"
                  />
                  <div>
                    <p className="font-semibold">
                      {transaksiByAdmin?.user?.name || "Tidak tersedia"}
                    </p>
                    <p>
                      {transaksiByAdmin?.user?.username || "Tidak tersedia"}
                    </p>
                  </div>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailTransaksiAdminPage;
