import { useParams } from "react-router-dom";
import { useUserByIdByAdmin } from "../../queries/admin/adminQuery";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProfileUserAdminPage = () => {
  const { id } = useParams();

  const { data: userByIdByAdmin } = useUserByIdByAdmin(id);

  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-semibold mb-8">Profile User</h1>
      <div className="overflow-x-auto ">
        <table className="table min-w-max w-200 border border-base-content/5 bg-base-100 border-collapse">
          <tbody>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Profile Img
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                <img
                  src={userByIdByAdmin?.profileImg || "/avatar.png"}
                  className="w-16 h-16"
                />
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Nama
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {userByIdByAdmin?.name}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Username
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {userByIdByAdmin?.username}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Email
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {userByIdByAdmin?.email}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                No Telp
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {userByIdByAdmin?.noTelp}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Alamat
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {userByIdByAdmin?.address}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Verifikasi
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {userByIdByAdmin?.isVerified ? (
                  <Icon
                    icon="ix:success-filled"
                    width="20 "
                    height="20"
                    className="text-success"
                  />
                ) : (
                  <Icon
                    icon="ix:namur-failure-filled"
                    width="20"
                    height="20"
                    className="text-error"
                  />
                )}
              </td>
            </tr>
            {userByIdByAdmin?.isVerified === false && (
              <tr>
                <td className="py-4 px-4 border border-base-content/5 font-semibold">
                  Kode Verifikasi
                </td>
                <td className="py-4 px-4 border border-base-content/5">
                  {userByIdByAdmin?.verificationToken || "-"}
                </td>
              </tr>
            )}
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                S & K
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {userByIdByAdmin?.isAgreeTerms ? (
                  <Icon
                    icon="ix:success-filled"
                    width="20 "
                    height="20"
                    className="text-success"
                  />
                ) : (
                  <Icon
                    icon="ix:namur-failure-filled"
                    width="20"
                    height="20"
                    className="text-error"
                  />
                )}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Last Login
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {new Date(userByIdByAdmin?.lastLogin).toLocaleString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileUserAdminPage;
