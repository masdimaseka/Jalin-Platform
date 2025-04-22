import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useUserById } from "../../queries/user/userQuery";
import { useUpdateProfile } from "../../queries/user/userMutation";

const EditProfileForm = ({ id }) => {
  const [name, setName] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [address, setAddress] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const fileInputRef = useRef(null);

  const { data: user } = useUserById(id);
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setNoTelp(user.noTelp || "");
      setAddress(user.address || "");
      setPreviewImg(user.profileImg || null);
    }
  }, [user]);

  const handleProfileImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      if (img.width !== img.height) {
        toast.error("Foto harus memiliki rasio 1:1 (persegi)!");
        fileInputRef.current.value = "";
        return;
      }
      setProfileImg(file);
      readFileAsDataURL(file).then(setPreviewImg);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      id,
      name,
      noTelp,
      address,
    };

    if (profileImg) {
      updateData.profileImg = await readFileAsDataURL(profileImg);
    }

    updateProfile(updateData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full ">
      <div>
        {previewImg && (
          <img
            src={previewImg}
            alt="Preview"
            className="rounded-full w-32 h-32 border-2 border-primary-jalin p-1 mb-4"
          />
        )}
        <label htmlFor="profileImg">Foto Profile</label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleProfileImgChange}
          className="file-input input-bordered rounded-md w-full text-xs"
        />
      </div>

      <div>
        <label htmlFor="name">Nama Lengkap</label>
        <input
          type="text"
          placeholder="Masukkan Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered rounded-md w-full text-xs"
          required
        />
      </div>

      <div>
        <label htmlFor="noTelp">No Telp.</label>
        <input
          type="number"
          placeholder="Masukkan No Telp"
          value={noTelp}
          onChange={(e) => setNoTelp(e.target.value)}
          className="input input-bordered rounded-md w-full text-xs"
          required
        />
      </div>

      <div>
        <label htmlFor="address">Alamat</label>
        <input
          type="text"
          placeholder="Masukkan Alamat"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="input input-bordered rounded-md w-full text-xs"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn btn-primary w-full mt-8"
      >
        {isPending ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </form>
  );
};

export default EditProfileForm;
