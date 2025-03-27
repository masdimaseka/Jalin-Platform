import { useAuthUser } from "../../queries/auth/authQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import Profile from "./../Profile";

const DashboardUser = () => {
  const { data: authUser } = useAuthUser();
  return (
    <div>
      <Profile user={authUser} />
      <div className="mt-12 pt-8 border-t-2 border-gray-300">
        <h1 className="text-lg sm:text-2xl font-semibold mb-8">
          Daftar Jahitanmu
        </h1>
        <div className="flex flex-wrap gap-4">
          <div className="card bg-base-100 w-80 shadow-sm">
            <figure className="w-full h-48 overflow-hidden rounded-lg">
              <img
                src="https://i.pinimg.com/736x/b4/0b/ce/b40bcee6d6c3a5582b5ca89a4e4a5b83.jpg"
                alt="Jahitan"
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Membuat Seragam</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente, maxime.
              </p>

              <div className="mt-2 flex flex-wrap flex-col gap-2">
                <p className="badge badge-success badge-lg">
                  <Icon
                    icon="material-symbols-light:work-history"
                    width="20"
                    height="20"
                    color="white"
                  />
                  : On Progres
                </p>
                <p className="badge badge-error badge-lg">
                  <Icon
                    icon="solar:calendar-bold"
                    width="20"
                    height="20"
                    color="white"
                  />
                  : 20/03/2025
                </p>
              </div>
              <div className="my-4 font-medium">
                <p>Penjahit : </p>
                <div className="flex items-center mt-2 gap-2">
                  <img
                    src={authUser.profileImg || "/avatar.png"}
                    alt="avatar"
                    className="rounded-full w-8 h-8 "
                  />
                  <span className="text-md flex gap-1">
                    {authUser.name}
                    <Icon
                      icon="material-symbols:verified-rounded"
                      width="20"
                      height="20"
                      className="text-primary-jalin"
                    />
                  </span>
                </div>
              </div>
              <button className="btn btn-primary mt-4 ">Lihat Pekerjaan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
