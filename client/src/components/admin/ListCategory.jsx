import { Icon } from "@iconify/react/dist/iconify.js";
import { useCategoryByAdmin } from "../../queries/admin/adminQuery";
import { useState } from "react";
import { useDeleteCategoryByIdByAdmin } from "../../queries/admin/adminMutation";

const ListCategory = () => {
  const [deletingCategoryId, setDeletingCategoryId] = useState(null);
  const { data: category, isLoading } = useCategoryByAdmin();
  const { mutate: deleteCategoryByIdByAdmin } = useDeleteCategoryByIdByAdmin();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
      </div>
    );
  }
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-xs min-w-max w-full border border-base-content/5 bg-base-100">
          <thead>
            <tr className="text-center">
              <th className="py-4 px-4 border border-base-content/5">No</th>
              <th className="py-4 px-4 border border-base-content/5">
                Nama Kategori
              </th>
              <th className="py-4 px-4 border border-base-content/5">Action</th>
            </tr>
          </thead>
          <tbody>
            {category?.length > 0 ? (
              category.map((c, index) => (
                <tr key={c._id} className="text-center">
                  <td className="py-2 px-4 border border-base-content/5">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border border-base-content/5">
                    {c.name || "Tidak tersedia"}
                  </td>
                  <td className="py-2 px-4 border border-base-content/5">
                    <button
                      className="btn btn-error"
                      onClick={() => setDeletingCategoryId(c)}
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
                <td colSpan="10" className="text-center py-4 border">
                  Tidak ada Kategori.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deletingCategoryId && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black opacity-50 z-40"></div>
          <dialog open className="modal z-50">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Perhatian!</h3>
              <p className="mb-4">
                Anda yakin ingin menghapus penjahit{" "}
                <span className="font-semibold">{deletingCategoryId.name}</span>
                ?
              </p>
              <div className="modal-action flex flex-col">
                <button
                  onClick={() => {
                    deleteCategoryByIdByAdmin(deletingCategoryId._id);
                    setDeletingCategoryId(null);
                  }}
                  className="btn bg-error text-white w-full"
                >
                  Hapus
                </button>
                <button
                  className="btn bg-none font-light"
                  onClick={() => setDeletingCategoryId(null)}
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

export default ListCategory;
