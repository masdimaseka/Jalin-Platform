import { useAuthUser } from "../queries/auth/authQuery";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLogout } from "../queries/auth/authMutation";

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
