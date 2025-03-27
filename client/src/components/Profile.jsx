import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuthUser } from "../queries/auth/authQuery";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  const { data: authUser } = useAuthUser();
  return (
    <div>
      <div className="flex items-center gap-4">
        <img
          src={user.profileImg || "/avatar.png"}
          alt={user.name}
          className="rounded-full w-32 h-32 border-2 border-primary-jalin"
        />
        <div>
          <h2 className="text-md sm:text-xl font-semibold mb-2">{user.name}</h2>

          <p className="flex gap-1">
            <Icon
              icon="mdi:location"
              width="24"
              height="24"
              className="text-primary-jalin"
            />
            {user.address}
          </p>

          {authUser?.id === user.id && (
            <Link
              to={`/profile/${user._id}/edit`}
              className="btn btn-primary mt-4"
            >
              Edit Profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
