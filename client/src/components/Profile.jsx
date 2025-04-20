import { useAuthUser } from "../queries/auth/authQuery";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLogout } from "../queries/auth/authMutation";
import { useUpdateStatusPenjahit } from "../queries/penjahit/penjahitMutation";

export const Profile = ({ user }) => {
  const { data: authUser } = useAuthUser();
  const { mutate: logutMutate } = useLogout();

  return (
    <div>
      <div className="flex items-center flex-col lg:flex-row lg:items-start gap-8">
        <div className="flex flex-col">
          <img
            src={user.profileImg || "/avatar.png"}
            alt={user.name}
            className="rounded-full w-32 h-32 border-2 border-primary-jalin p-2"
          />
        </div>
        <div className="flex flex-col items-center lg:items-start mt-4">
          <h2 className="text-md sm:text-xl font-semibold mb-2">{user.name}</h2>

          <p className="flex gap-1">{user.address}</p>

          {authUser?.id === user.id && (
            <div className="flex flex-col lg:flex-row items-center gap-2 mt-4 max-lg:w-full">
              <Link
                to={`/profile/edit/${user._id}`}
                className="btn btn-primary max-lg:w-full"
              >
                Edit Profile
              </Link>
              <button
                className="btn border-0 bg-error text-white max-lg:w-full"
                onClick={logutMutate}
              >
                <Icon icon="majesticons:logout" width="24" height="24" /> Log
                out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProfilePenjahit = ({ penjahit }) => {
  const { data: authUser } = useAuthUser();

  const { mutate: updateStatusPenjahit } = useUpdateStatusPenjahit();

  const handleToggleOpenToWork = (event) => {
    const isChecked = event.target.checked;
    updateStatusPenjahit({ id: penjahit._id, status: isChecked });
  };

  return (
    <div>
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <img
            src={penjahit?.user.profileImg || "/avatar.png"}
            alt={penjahit?.user.name}
            className="rounded-full w-24 h-24 border-2 border-primary-jalin p-1"
          />
          <div>
            <h2 className="text-md sm:text-xl font-semibold mb-2">
              {penjahit?.user.name}
            </h2>
            <div className="flex flex-col lg:flex-row gap-4">
              <span className="flex items-center gap-1 ">
                <Icon
                  icon="ic:round-star"
                  width="20"
                  height="20"
                  color="orange"
                />
                <p className="text-sm">({penjahit?.rating})</p>
              </span>
              <span className="flex items-center gap-1 ">
                <Icon
                  icon="tdesign:money-filled"
                  width="16"
                  height="16"
                  className="text-primary-jalin"
                />
                <p className="text-sm">({penjahit?.rentangHarga})</p>
              </span>
              <span className="flex items-start lg:items-center gap-1 ">
                <Icon
                  icon="carbon:location-filled"
                  width="16"
                  height="16"
                  className="text-primary-jalin"
                />
                <p className="text-sm">{penjahit?.user.address}</p>
              </span>
            </div>

            <div className="card-actions mt-4 flex flex-wrap gap-2">
              {penjahit?.kategori.length > 0 ? (
                penjahit?.kategori.map((k, i) => (
                  <div key={i} className="badge badge-outline">
                    {k.name}
                  </div>
                ))
              ) : (
                <div className="badge badge-outline">Tidak tersedia</div>
              )}
            </div>
          </div>
        </div>

        <div className="collapse bg-base-100 border-gray-100 border-2 mt-4 collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">Deskripsi Profile</div>
          <div className="collapse-content text-sm">
            <p className="text-justify">
              {penjahit?.description
                ? penjahit?.description
                : "Tidak ada deskripsi"}
            </p>
          </div>
        </div>

        {authUser?._id === penjahit?.user?._id?.toString() && (
          <div className="mt-4 flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex items-center justify-between gap-2 border-gray-100 border-2 px-4 py-4 rounded-xl">
              <p className="text-md font-medium">Open to work: </p>
              <input
                type="checkbox"
                className="toggle toggle-md border-gray-600 bg-gray-50 checked:border-primary-jalin checked:bg-blue-50 checked:text-primary-jalin"
                checked={penjahit?.openToWork}
                onChange={handleToggleOpenToWork}
              />
            </div>
            <Link
              to={`/penjahit/edit/${penjahit?._id}`}
              className="btn btn-primary"
            >
              Edit Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
