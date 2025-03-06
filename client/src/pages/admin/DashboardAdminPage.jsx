import {
  usePenjahitByAdmin,
  useUserByAdmin,
} from "./../../queries/admin/adminQuery";
const DashboardAdminPage = () => {
  const { data: user } = useUserByAdmin();
  const { data: penjahit } = usePenjahitByAdmin();
  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-semibold mb-8">
        Dashboard Admin
      </h1>
      <div>
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full max-w-5xl mx-auto p-6 text-lg">
          <div className="stat">
            <div className="stat-title text-xl">Daftar Pengguna</div>
            <div className="stat-value text-primary-jalin text-3xl">
              {user?.length}
            </div>
            <div className="stat-desc text-lg">orang</div>
          </div>

          <div className="stat">
            <div className="stat-title text-xl">Daftar Penjahit</div>
            <div className="stat-value text-primary-jalin text-3xl">
              {penjahit?.filter((p) => p.isVerified).length}
            </div>
            <div className="stat-desc text-lg">orang</div>
          </div>

          <div className="stat">
            <div className="stat-title text-xl">
              Penjahit Belum Terverifikasi
            </div>
            <div className="stat-value text-primary-jalin text-3xl">
              {penjahit?.filter((p) => !p.isVerified).length}
            </div>
            <div className="stat-desc text-lg">orang</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminPage;
