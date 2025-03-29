import { useAuthUser } from "../../queries/auth/authQuery";
import { Icon } from "@iconify/react";
import Profile from "./../Profile";
import { useTransaksi } from "../../queries/transaksi/transaksiQuery";

const DashboardUser = () => {
  const { data: authUser } = useAuthUser();
  const { data: transaksi, isLoading } = useTransaksi();

  return (
    <div>
      <Profile user={authUser} />
      <div className="mt-12 pt-8 border-t-2 border-gray-300">
        <h1 className="text-lg sm:text-2xl font-semibold mb-8">
          Daftar Jahitanmu
        </h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : transaksi?.length === 0 ? (
          <p className="text-gray-500">Belum ada transaksi jahitan.</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {transaksi.map((item) => (
              <div key={item._id} className="card bg-base-100 w-80 shadow-sm">
                <figure className="w-full h-48 overflow-hidden rounded-lg">
                  <img
                    src={item.image || "/default-image.jpg"}
                    alt="Jahitan"
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.judul}</h2>
                  <p>{item.deskripsi}</p>

                  <div className="mt-2 flex flex-wrap flex-col gap-2">
                    <p
                      className={`badge badge-lg ${
                        item.status === "Diproses"
                          ? "badge-success"
                          : item.status === "Selesai"
                          ? "badge-primary"
                          : "badge-error"
                      }`}
                    >
                      <Icon
                        icon="material-symbols-light:work-history"
                        width="20"
                        height="20"
                        color="white"
                      />
                      : {item.status}
                    </p>
                    <p className="badge badge-error badge-lg">
                      <Icon
                        icon="solar:calendar-bold"
                        width="20"
                        height="20"
                        color="white"
                      />
                      : {new Date(item.tenggatWaktu).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="my-4 font-medium">
                    <p>Penjahit :</p>
                    <div className="flex items-center mt-2 gap-2">
                      <img
                        src={item.penjahit?.user?.profileImg || "/avatar.png"}
                        alt="avatar"
                        className="rounded-full w-8 h-8"
                      />
                      <span className="text-md flex gap-1">
                        {item.penjahit?.user?.name || "Tidak Diketahui"}
                        <Icon
                          icon="material-symbols:verified-rounded"
                          width="20"
                          height="20"
                          className="text-primary-jalin"
                        />
                      </span>
                    </div>
                  </div>

                  <button className="btn btn-primary mt-4">
                    Lihat Pekerjaan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardUser;
