import { useVerifyPenjahit } from "../../queries/admin/adminMutation";
import { usePenjahitByAdmin } from "../../queries/admin/adminQuery";
import { useCategories } from "../../queries/penjahit/penjahitQuery";

const ListVerifyPenjahit = () => {
  const { data: penjahit } = usePenjahitByAdmin();
  const { data: category } = useCategories();
  const { mutate: verifyPenjahit } = useVerifyPenjahit();

  const handleVerify = (penjahitId) => {
    verifyPenjahit(penjahitId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs min-w-max w-full">
        <thead>
          <tr className="text-center">
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No Telp</th>
            <th>Lokasi</th>
            <th>Rentang Harga</th>
            <th>Dok. KTP</th>
            <th>Dok. Portofolio</th>
            <th>Kategori</th>
            <th>Status Verifikasi</th>
            <th>Verifikasi</th>
          </tr>
        </thead>
        <tbody>
          {penjahit?.length > 0 ? (
            penjahit
              .filter((p) => !p.isVerified)
              .map((p, index) => (
                <tr key={p._id} className="text-center">
                  <td>{index + 1}</td>
                  <td>{p.user?.name || "Tidak tersedia"}</td>
                  <td>{p.user?.email || "Tidak tersedia"}</td>
                  <td>{p.user?.noTelp || "Tidak tersedia"}</td>
                  <td>{p.user?.address || "Tidak tersedia"}</td>
                  <td>{p.rentangHarga || "Tidak tersedia"}</td>
                  <td>
                    {p.dokKTP ? (
                      <a
                        href={p.dokKTP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Lihat KTP
                      </a>
                    ) : (
                      "Tidak tersedia"
                    )}
                  </td>
                  <td>
                    {p.dokPortofolio?.length > 0
                      ? p.dokPortofolio.map((portofolio, i) => (
                          <div key={i}>
                            <a
                              href={portofolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              Lihat Portofolio {i + 1}
                            </a>
                          </div>
                        ))
                      : "Tidak tersedia"}
                  </td>
                  <td>
                    {p.kategori?.length > 0
                      ? p.kategori
                          .map(
                            (id) =>
                              category?.find((cat) => cat._id === id)?.name ||
                              "Tidak ditemukan"
                          )
                          .join(", ")
                      : "Tidak tersedia"}
                  </td>
                  <td>
                    <span className="text-red-500">Belum Terverifikasi</span>
                  </td>
                  <td>
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
              <td colSpan="10" className="text-center py-4 border">
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
