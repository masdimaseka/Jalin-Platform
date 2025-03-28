import { useParams } from "react-router-dom";
import EditProfileForm from "../../components/auth/EditProfileForm";

const EditProfilePage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-semibold mb-8">Edit Profile</h1>
      <EditProfileForm id={id} />
    </div>
  );
};

export default EditProfilePage;
