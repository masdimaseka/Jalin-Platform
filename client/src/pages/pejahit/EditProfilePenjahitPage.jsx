import { useParams } from "react-router-dom";
import EditProfilePenjahitForm from "../../components/penjahit/EditProfilePenjahitForm";

const EditProfilePenjahitPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-semibold mb-8">
        Edit Profile Penjahit
      </h1>
      <EditProfilePenjahitForm id={id} />
    </div>
  );
};

export default EditProfilePenjahitPage;
