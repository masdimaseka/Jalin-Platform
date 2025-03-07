import { Icon } from "@iconify/react/dist/iconify.js";
import { useUserByAdmin } from "../../queries/admin/adminQuery";

const ListUser = () => {
  const { data: user } = useUserByAdmin();

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs min-w-max w-full">
        <thead>
          <tr className="text-center">
            <th>No</th>
            <th>Nama</th>
            <th>Username</th>
            <th>Email</th>
            <th>No Telp</th>
            <th>Alamat</th>
            <th>Status Verifikasi</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user?.length > 0 ? (
            user.map((u, index) => (
              <tr key={u._id} className="text-center">
                <td>{index + 1}</td>
                <td>{u.name || "Tidak tersedia"}</td>
                <td>{u.username || "Tidak tersedia"}</td>
                <td>{u.email || "Tidak tersedia"}</td>
                <td>{u.noTelp || "Tidak tersedia"}</td>
                <td>{u.address || "Tidak tersedia"}</td>
                <td>
                  {u.isVerified ? (
                    <span className="text-green-500">Terverifikasi</span>
                  ) : (
                    <span className="text-red-500">Belum Terverifikasi</span>
                  )}
                </td>

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
                Tidak ada user.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListUser;
