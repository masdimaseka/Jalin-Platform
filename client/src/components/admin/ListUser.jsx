import { Icon } from "@iconify/react/dist/iconify.js";
import { useUserByAdmin } from "../../queries/admin/adminQuery";
import SearchBar from "../SearchBar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteUserByIdByAdmin } from "../../queries/admin/adminMutation";

const ListUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingUserId, setDeletingUserId] = useState(null);
  const { data: user, isLoading } = useUserByAdmin();
  const { mutate: deleteUserByIdByAdmin } = useDeleteUserByIdByAdmin();

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

  const filteredUser = user?.filter((u) => {
    const matchesSearch = u.name?.toLowerCase().includes(searchQuery);
    return matchesSearch;
  });

  return (
    <>
      <SearchBar
        onSearchChange={handleSearchChange}
        placeholder="Search user..."
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
              <th className="py-4 px-4 border border-base-content/5">
                Verifikasi
              </th>
              <th className="py-4 px-4 border border-base-content/5">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUser?.length > 0 ? (
              filteredUser.map((u, index) => (
                <tr key={u._id}>
                  <td className="text-center py-2 px-4  border border-base-content/5">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={u.profileImg || "/avatar.png"}
                        alt={u.name}
                        className="rounded-full w-8 h-8"
                      />
                      <p>{u.name || "Tidak tersedia"}</p>
                    </div>
                  </td>
                  <td className="text-center py-2 px-4 border border-base-content/5">
                    {u.email || "Tidak tersedia"}
                  </td>
                  <td className="text-center py-2 px-4  border border-base-content/5">
                    {u.noTelp || "Tidak tersedia"}
                  </td>
                  <td className="text-center py-2 px-4  border border-base-content/5">
                    {u.isVerified ? (
                      <div className="flex justify-center items-center">
                        <Icon
                          icon="ix:success-filled"
                          width="20"
                          height="20"
                          className="text-success"
                        />
                      </div>
                    ) : (
                      <div className="flex justify-center items-center">
                        <Icon
                          icon="ix:namur-failure-filled"
                          width="20"
                          height="20"
                          className="text-error"
                        />
                      </div>
                    )}
                  </td>
                  <td className="text-center py-2 px-4  border border-base-content/5">
                    <Link
                      to={`/admin/user/${u._id}`}
                      className="btn btn-primary mr-2"
                    >
                      <Icon icon="carbon:view-filled" width="16" height="16" />
                    </Link>
                    <button className="btn btn-success mr-2">
                      <Icon icon="iconamoon:edit-fill" width="16" height="16" />
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => setDeletingUserId(u)}
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
                  Tidak ada user.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deletingUserId && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black opacity-50 z-40"></div>
          <dialog open className="modal z-50">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Perhatian!</h3>
              <p className="mb-4">
                Anda yakin ingin menghapus user{" "}
                <span className="font-semibold">{deletingUserId.name}</span>?
              </p>
              <div className="modal-action flex flex-col">
                <button
                  onClick={() => {
                    deleteUserByIdByAdmin(deletingUserId._id);
                    setDeletingUserId(null);
                  }}
                  className="btn bg-error text-white w-full"
                >
                  Hapus
                </button>
                <button
                  className="btn bg-none font-light"
                  onClick={() => setDeletingUserId(null)}
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

export default ListUser;
