import { Icon } from "@iconify/react/dist/iconify.js";
import { usePenjahitByAdmin } from "../../queries/admin/adminQuery";
import { useState } from "react";
import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";
import { useDeletePenjahitByIdByAdmin } from "../../queries/admin/adminMutation";

const ListPenjahit = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingPenjahitId, setDeletingPenjahitId] = useState(null);
  const { data: penjahit, isLoading } = usePenjahitByAdmin();
  const { mutate: deletePenjahitByIdByAdmin } = useDeletePenjahitByIdByAdmin();

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

  const filteredPenjahit = penjahit?.filter((p) => {
    const matchesSearch = p.user.name?.toLowerCase().includes(searchQuery);
    return matchesSearch;
  });

  return (
    <>
      <SearchBar
        onSearchChange={handleSearchChange}
        placeholder="Search penjahit..."
      />
      <div className="overflow-x-auto">
        <table className="table table-xs min-w-max w-full border border-base-content/5 bg-base-100">
          <thead>
            <tr className="text-center">
              <th className="py-4 px-4 border border-base-content/5">No</th>
              <th className="py-4 px-4 border border-base-content/5">Nama</th>
              <th className="py-4 px-4 border border-base-content/5">Email</th>
              <th className="py-4 px-4 border border-base-content/5">
                No Telp
              </th>
              <th className="py-4 px-4 border border-base-content/5">Point</th>
              <th className="py-4 px-4 border border-base-content/5">
                Open To Work
              </th>
              <th className="py-4 px-4 border border-base-content/5">
                Verifikasi
              </th>
              <th className="py-4 px-4 border border-base-content/5">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPenjahit?.length > 0 ? (
              filteredPenjahit.map((p, index) => (
                <tr key={p._id}>
                  <td className="text-center py-2 px-4 border border-base-content/5">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={p.user.profileImg || "/avatar.png"}
                        alt={p.user.name}
                        className="rounded-full w-8 h-8"
                      />
                      <p>{p.user.name || "Tidak tersedia"}</p>
                    </div>
                  </td>
                  <td className="text-center py-2 px-4 border border-base-content/5">
                    {p.user.email || "Tidak tersedia"}
                  </td>
                  <td className="text-center py-2 px-4 border border-base-content/5">
                    {p.user.noTelp || "Tidak tersedia"}
                  </td>
                  <td className="text-center py-2 px-4 border border-base-content/5">
                    <span>
                      <img src="/jalinPoint.svg" className="w-3 inline" />{" "}
                      {Number(p.point).toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </td>
                  <td className="text-center py-2 px-4 border border-base-content/5">
                    {p.openToWork ? "Iya" : "Tidak"}
                  </td>
                  <td className="text-center py-2 px-4 border border-base-content/5">
                    {p.isVerified === "diterima" && (
                      <div className="flex justify-center items-center">
                        <Icon
                          icon="ix:success-filled"
                          width="20"
                          height="20"
                          className="text-success"
                        />
                      </div>
                    )}
                    {p.isVerified === "ditolak" && (
                      <div className="flex justify-center items-center">
                        <Icon
                          icon="ix:namur-failure-filled"
                          width="20"
                          height="20"
                          className="text-error"
                        />
                      </div>
                    )}
                    {p.isVerified === "onreview" && (
                      <div className="flex justify-center items-center">
                        <Icon
                          icon="mingcute:time-fill"
                          width="20"
                          height="20"
                          className="text-primary-jalin"
                        />
                      </div>
                    )}
                  </td>
                  <td className="text-center py-2 px-4 border border-base-content/5">
                    <Link
                      to={`/admin/penjahit/${p._id}`}
                      className="btn btn-primary mr-2"
                    >
                      <Icon icon="carbon:view-filled" width="16" height="16" />
                    </Link>
                    <button className="btn btn-success mr-2">
                      <Icon icon="iconamoon:edit-fill" width="16" height="16" />
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => setDeletingPenjahitId(p)}
                    >
                      <Icon
                        icon="iconamoon:trash-fill"
                        width="16"
                        height="16"
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  Tidak ada penjahit.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deletingPenjahitId && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black opacity-50 z-40"></div>
          <dialog open className="modal z-50">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Perhatian!</h3>
              <p className="mb-4">
                Anda yakin ingin menghapus penjahit{" "}
                <span className="font-semibold">{deletingPenjahitId.name}</span>
                ?
              </p>
              <div className="modal-action flex flex-col">
                <button
                  onClick={() => {
                    deletePenjahitByIdByAdmin(deletingPenjahitId._id);
                    setDeletingPenjahitId(null);
                  }}
                  className="btn bg-error text-white w-full"
                >
                  Hapus
                </button>
                <button
                  className="btn bg-none font-light"
                  onClick={() => setDeletingPenjahitId(null)}
                >
                  Batal
                </button>
              </div>
            </div>
          </dialog>
        </>
      )}
    </>
  );
};

export default ListPenjahit;
