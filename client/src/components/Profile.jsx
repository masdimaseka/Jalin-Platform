import { useAuthUser } from "../queries/auth/authQuery";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  const { data: authUser } = useAuthUser();

  return (
    <div>
      <div className="flex items-center flex-col lg:flex-row lg:items-start gap-8">
        <div className="flex flex-col">
          <img
            src={user.profileImg || "/avatar.png"}
            alt={user.name}
            className="rounded-full w-32 h-32 border-2 border-primary-jalin"
          />
        </div>
        <div className="flex flex-col items-center lg:items-start mt-4">
          <h2 className="text-md sm:text-xl font-semibold mb-2">{user.name}</h2>

          <p className="flex gap-1">{user.address}</p>

          {authUser?.id === user.id && (
            <Link
              to={`/profile/edit/${user._id}`}
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
