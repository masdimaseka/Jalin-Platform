import { useVerifyPenjahit } from "../../queries/admin/adminMutation";
import { usePenjahitByAdmin } from "../../queries/admin/adminQuery";
import { Icon } from "@iconify/react/dist/iconify.js";

const ListVerifyPenjahit = () => {
  const { data: penjahit } = usePenjahitByAdmin();
  const { mutate: verifyPenjahit } = useVerifyPenjahit();

  const handleVerify = (penjahitId) => {
    verifyPenjahit(penjahitId);
  };

  const filteredPenjahit = penjahit?.filter((p) => {
    const notVerif = p.isVerified === "onreview";
    return notVerif;
  });

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs min-w-max w-full border border-base-content/5 bg-base-100">
        <thead>
          <tr className="text-center">
            <th className="py-4 px-4 border border-base-content/5">No</th>
            <th className="py-4 px-4 border border-base-content/5">Nama</th>
            <th className="py-4 px-4 border border-base-content/5">Email</th>
            <th className="py-4 px-4 border border-base-content/5">No Telp</th>
            <th className="py-4 px-4 border border-base-content/5">Lokasi</th>
            <th className="py-4 px-4 border border-base-content/5">
              Deskripsi
            </th>
            <th className="py-4 px-4 border border-base-content/5">
              Rentang Harga
            </th>
            <th className="py-4 px-4 border border-base-content/5">Dok. KTP</th>
            <th className="py-4 px-4 border border-base-content/5">
              Dok. Portofolio
            </th>
            <th className="py-4 px-4 border border-base-content/5">Kategori</th>
            <th className="py-4 px-4 border border-base-content/5">
              Status Verifikasi
            </th>
            <th className="py-4 px-4 border border-base-content/5">
              Verifikasi
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredPenjahit?.length > 0 ? (
            filteredPenjahit.map((p, index) => (
              <tr key={p._id} className="text-center">
                <td className="text-center py-2 px-4 border border-base-content/5">
                  {index + 1}
                </td>
                <td className="text-center py-2 px-4 border border-base-content/5">
                  <div className="flex items-center gap-2">
                    <img
                      src={p.user?.profileImg || "/avatar.png"}
                      alt={p.user?.name}
                      className="rounded-full w-8 h-8"
                    />
                    <p>{p.user?.name || "Tidak tersedia"}</p>
                  </div>
                </td>
                <td className="text-center py-2 px-4 border border-base-content/5">
                  {p.user?.email || "Tidak tersedia"}
                </td>
                <td className="text-center py-2 px-4 border border-base-content/5">
                  {p.user?.noTelp || "Tidak tersedia"}
                </td>
                <td className="text-center py-2 px-4 border border-base-content/5">
                  {p.user?.address || "Tidak tersedia"}
                </td>
                <td className="max-w-xs break-words whitespace-normal text-justify py-2 px-4 border border-base-content/5">
                  {p.description || "Tidak tersedia"}
                </td>

                <td className="text-center py-2 px-4 border border-base-content/5">
                  {p.rentangHarga || "Tidak tersedia"}
                </td>
                <td className="text-center py-2 px-4 border border-base-content/5">
                  <a
                    href={p.dokKTP}
                    className="badge badge-info underline"
                    target="_blank"
                  >
                    <Icon
                      icon="material-symbols:id-card"
                      width="16"
                      height="16"
                    />
                    <p className="text-xs">Lihat Dokumen</p>
                  </a>
                </td>
                <td className="text-center py-2 px-4 border border-base-content/5">
                  <div className="w-80 flex flex-wrap justify-center gap-2">
                    {p.dokPortofolio.map((dok, index) => (
                      <a
                        key={index}
                        href={dok}
                        className="badge badge-info underline mr-2"
                        target="_blank"
                      >
                        <Icon icon="f7:doc-fill" width="16" height="16" />
                        <p className="text-xs">Lihat Proto {index + 1}</p>
                      </a>
                    ))}
                  </div>
                </td>
                <td className="py-2 px-4 border border-base-content/5">
                  <div className="w-60 flex flex-wrap justify-center gap-2">
                    {p.kategori.map((k, i) => (
                      <div key={i} className="badge badge-outline mr-1">
                        {k.name}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="text-center py-2 px-4 border border-base-content/5">
                  <div className="badge badge-error" target="_blank">
                    <p className="text-xs font-bold">Belum Terverifikasi</p>
                  </div>
                </td>
                <td className="text-center py-2 px-4 border border-base-content/5">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleVerify(p._id)}
                  >
                    Verifikasi
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13" className="text-center py-4">
                Tidak ada penjahit untuk diverifikasi.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListVerifyPenjahit;
