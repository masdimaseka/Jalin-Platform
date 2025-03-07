import { Icon } from "@iconify/react/dist/iconify.js";
import { useCategoryByAdmin } from "../../queries/admin/adminQuery";

const ListCategory = () => {
  const { data: category } = useCategoryByAdmin();
  return (
    <div className="overflow-x-auto">
      <table className="table min-w-max w-full">
        <thead>
          <tr className="text-center">
            <th>No</th>
            <th>Nama Kategoru</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {category?.length > 0 ? (
            category.map((c, index) => (
              <tr key={c._id} className="text-center">
                <td>{index + 1}</td>
                <td>{c.name || "Tidak tersedia"}</td>
                <td>
                  <button className="btn btn-primary mr-2">
                    <Icon icon="carbon:view-filled" width="16" height="16" />
                  </button>
                  <button className="btn btn-success mr-2">
                    <Icon icon="iconamoon:edit-fill" width="16" height="16" />
                  </button>
                  <button className="btn btn-error">
                    <Icon icon="iconamoon:trash-fill" width="16" height="16" />
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
  );
};

export default ListCategory;
