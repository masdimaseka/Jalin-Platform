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

    // Validasi rasio gambar harus 1:1
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      if (img.width !== img.height) {
        toast.error("Foto harus memiliki rasio 1:1 (persegi)!");
        fileInputRef.current.value = "";
        return;
      }
      setProfileImg(file);
      setPreviewImg(URL.createObjectURL(file));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gunakan FormData untuk mengirim file
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("noTelp", noTelp);
    formData.append("address", address);
    if (profileImg) {
      formData.append("profileImg", profileImg);
    }

    updateProfile(formData, {
      onSuccess: () => {
        toast.success("Profil berhasil diperbarui!");
      },
      onError: (error) => {
        toast.error(error.message || "Gagal memperbarui profil!");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full lg:w-[30vw]"
    >
      <div>
        <label htmlFor="profileImg">Foto Profile</label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleProfileImgChange}
          className="file-input input-bordered rounded-md w-full text-xs"
        />
        {previewImg && (
          <img
            src={previewImg}
            alt="Preview"
            className="mt-2 w-20 h-20 rounded-full"
          />
        )}
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
        className="btn btn-primary w-full"
      >
        {isPending ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </form>
  );
};

export default EditProfileForm;
