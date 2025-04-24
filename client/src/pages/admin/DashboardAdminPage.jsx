import { Icon } from "@iconify/react/dist/iconify.js";
import {
  usePenjahitByAdmin,
  useTransaksiByAdmin,
  useTransaksiPointByAdmin,
  useUserByAdmin,
} from "./../../queries/admin/adminQuery";
import { Link } from "react-router-dom";
const DashboardAdminPage = () => {
  const { data: user, isLoading: isLoadingUser } = useUserByAdmin();
  const { data: penjahit, isLoading: isLoadingPenjahit } = usePenjahitByAdmin();
  const { data: transaksiPoint, isLoading: isLoadingTransaksiPoint } =
    useTransaksiPointByAdmin();
  const { data: transaksi, isLoading: isLoadingTransaksi } =
    useTransaksiByAdmin();

  if (
    isLoadingUser ||
    isLoadingPenjahit ||
    isLoadingTransaksiPoint ||
    isLoadingTransaksi
  ) {
    return (
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-semibold mb-8">
        Dashboard Admin
      </h1>
      <div>
        <div className="stats stats-vertical lg:stats-horizontal rounded-2xl shadow bg-white w-full mx-auto p-6 text-lg ">
          <div className="stat ">
            <div className="stat-title text-xl text-gray-900 flex items-center gap-2">
              <Icon
                icon="solar:user-bold"
                width="20"
                height="20"
                className="text-primary-jalin"
              />
              Pengguna
            </div>
            <div className="stat-value text-5xl mt-4 mb-2">{user?.length}</div>
            <div className="stat-desc text-lg">orang</div>
          </div>

          <div className="stat ">
            <div className="stat-title text-xl text-gray-900 flex items-center gap-2">
              <Icon
                icon="ic:round-work"
                width="20"
                height="20"
                className="text-primary-jalin"
              />
              Penjahit
            </div>
            <div className="stat-value  text-5xl mt-4 mb-2">
              {penjahit?.filter((p) => p.isVerified).length}
            </div>
            <div className="stat-desc text-lg">orang</div>
          </div>

          <div className="stat ">
            <div className="stat-title text-xl text-gray-900 flex items-center gap-2">
              <Icon
                icon="map:clothing-store"
                width="20"
                height="20"
                className="text-primary-jalin"
              />
              Jahitan
            </div>
            <div className="stat-value  text-5xl mt-4 mb-2">
              {transaksi?.length}
            </div>
            <div className="stat-desc text-lg">jahitan</div>
          </div>

          <div className="stat ">
            <div className="stat-title text-xl text-gray-900 flex items-center gap-2">
              <Icon
                icon="ix:success-filled"
                width="20"
                height="20"
                className="text-primary-jalin"
              />
              Verifikasi Penjahit
            </div>
            <div className="stat-value text-5xl mt-4 mb-2">
              {penjahit?.filter((p) => !p.isVerified).length}
            </div>
            <div className="stat-desc text-lg">orang</div>
          </div>

          <div className="stat ">
            <div className="stat-title text-xl text-gray-900 flex items-center gap-2">
              <img src="/jalinPoint.svg" className="w-5 inline" />
              Transaksi Point
            </div>
            <div className="stat-value  text-5xl mt-4 mb-2">
              {transaksiPoint?.length}
            </div>
            <div className="stat-desc text-lg">transaksi</div>
          </div>
        </div>
      </div>

      <h1 className="text-2xl sm:text-4xl font-semibold mt-16 mb-8">
        Menus Admin
      </h1>
      <div className="flex lg:flex-row flex-col gap-4 lg:gap-8">
        <Link
          to="/admin/user"
          className="btn btn-primary p-4 w-full lg:w-40 lg:h-40 rounded-lg flex flex-row lg:flex-col"
        >
          <Icon
            icon="solar:user-bold"
            className="text-white w-6 h-6 lg:w-20 lg:h-20"
          />
          <p>Kelola User</p>
        </Link>

        <Link
          to="/admin/penjahit"
          className="btn btn-primary p-4 w-full lg:w-40 lg:h-40 rounded-lg flex flex-row lg:flex-col"
        >
          <Icon
            icon="ic:round-work"
            className="text-white w-6 h-6 lg:w-20 lg:h-20"
          />
          <p>Kelola Penjahit</p>
        </Link>

        <Link
          to="/admin/transaksi"
          className="btn btn-primary p-4 w-full lg:w-40 lg:h-40 rounded-lg flex flex-row lg:flex-col"
        >
          <Icon
            icon="map:clothing-store"
            className="text-white w-6 h-6 lg:w-20 lg:h-20"
          />
          <p>Kelola Jahitan</p>
        </Link>

        <Link
          to="/admin/transaksi-point"
          className="btn btn-primary p-4 w-full lg:w-40 lg:h-40 rounded-lg flex flex-row lg:flex-col"
        >
          <img
            src="/jalinPoint.svg"
            className="w-5 lg:w-20 inline border lg:border-2 border-white rounded-full"
          />
          <p>Kelola Point</p>
        </Link>

        <Link
          to="/admin/category"
          className="btn btn-primary p-4 w-full lg:w-40 lg:h-40 rounded-lg flex flex-row lg:flex-col"
        >
          <Icon
            icon="material-symbols:category"
            className="text-white w-6 h-6 lg:w-20 lg:h-20"
          />
          <p>Kelola Kategori</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardAdminPage;
