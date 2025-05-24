import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePenjahitByIdByAdmin } from "../../queries/admin/adminQuery";

const ProfilePenjahitAdminPage = () => {
  const { id } = useParams();

  const { data: penjahitByIdByAdmin, isLoading } = usePenjahitByIdByAdmin(id);

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
        Profile Penjahit
      </h1>
      <div className="overflow-x-auto ">
        <table className="table w-200 border border-base-content/5 bg-base-100 border-collapse">
          <tbody>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Profile Img
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                <img
                  src={penjahitByIdByAdmin?.user.profileImg || "/avatar.png"}
                  className="w-16 h-16"
                />
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Nama
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {penjahitByIdByAdmin?.user.name}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Username
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {penjahitByIdByAdmin?.user.username}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Email
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {penjahitByIdByAdmin?.user.email}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                No Telp
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {penjahitByIdByAdmin?.user.noTelp}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Alamat
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {penjahitByIdByAdmin?.user.address}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Verifikasi
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {penjahitByIdByAdmin?.isVerified === "diterima" && (
                  <Icon
                    icon="ix:success-filled"
                    width="20"
                    height="20"
                    className="text-success"
                  />
                )}
                {penjahitByIdByAdmin?.isVerified === "ditolak" && (
                  <Icon
                    icon="ix:namur-failure-filled"
                    width="20"
                    height="20"
                    className="text-error"
                  />
                )}
                {penjahitByIdByAdmin?.isVerified === "onreview" && (
                  <Icon
                    icon="mingcute:time-fill"
                    width="20"
                    height="20"
                    className="text-primary-jalin"
                  />
                )}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Last Login
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {new Date(penjahitByIdByAdmin?.user.lastLogin).toLocaleString(
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
                Deskripsi
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                <p>{penjahitByIdByAdmin?.description}</p>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Dokumen KTP
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                <a
                  href={penjahitByIdByAdmin?.dokKTP}
                  className="badge badge-info underline"
                  target="_blank"
                >
                  <Icon
                    icon="material-symbols:id-card"
                    width="16"
                    height="16"
                  />
                  <p>Lihat Dokumen</p>
                </a>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Dokumen Portofolio
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {penjahitByIdByAdmin?.dokPortofolio.map((dok, index) => (
                  <a
                    key={index}
                    href={dok}
                    className="badge badge-info underline mr-2"
                    target="_blank"
                  >
                    <Icon icon="f7:doc-fill" width="16" height="16" />
                    <p>Lihat Proto {index + 1}</p>
                  </a>
                ))}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Rentang Harga
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                <p>{penjahitByIdByAdmin?.rentangHarga}</p>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Kategori
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                {penjahitByIdByAdmin?.kategori.map((k, i) => (
                  <div key={i} className="badge badge-outline mr-1">
                    {k.name}
                  </div>
                ))}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Rating
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                <p>{penjahitByIdByAdmin?.rating}</p>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Premium
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                <p>{penjahitByIdByAdmin?.isPremium ? "Ya" : "Tidak"}</p>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Open To Work
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                <p>{penjahitByIdByAdmin?.isPremium ? "Ya" : "Tidak"}</p>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 border border-base-content/5 font-semibold">
                Point
              </td>
              <td className="py-4 px-4 border border-base-content/5">
                <span>
                  <img src="/jalinPoint.svg" className="w-3 inline" />{" "}
                  {Number(penjahitByIdByAdmin.point).toLocaleString("id-ID", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePenjahitAdminPage;
