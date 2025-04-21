import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  useCategories,
  usePenjahitById,
} from "../../queries/penjahit/penjahitQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useUpdateProfilePenjahit } from "../../queries/penjahit/penjahitMutation";

const EditProfilePenjahitForm = ({ id }) => {
  const [name, setName] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [address, setAddress] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [description, setDescription] = useState("");
  const [rentangHarga, setRentangharga] = useState("");
  const [kategori, setKategori] = useState([]);
  const [maxWords] = useState(100);

  const fileInputRef = useRef(null);

  const { data: penjahitById, isLoading } = usePenjahitById(id);
  const { mutate: updateProfilePenjahit, isPending } =
    useUpdateProfilePenjahit();

  const { data: category } = useCategories();

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (penjahitById) {
      setName(penjahitById.user.name || "");
      setNoTelp(penjahitById.user.noTelp || "");
      setAddress(penjahitById.user.address || "");
      setPreviewImg(penjahitById.user.profileImg || null);
      setDescription(penjahitById.description || "");
      setRentangharga(penjahitById.rentangHarga || "");
    }
  }, [penjahitById]);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
      </div>
    );
  }

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

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setKategori((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const handleDescriptionChange = (e) => {
    const words = e.target.value.split(/\s+/).filter((word) => word !== ""); // Hitung kata
    if (words.length <= maxWords) {
      setDescription(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      id,
      name,
      noTelp,
      address,
      description,
      rentangHarga,
      kategori,
    };

    if (profileImg) {
      updateData.profileImg = await readFileAsDataURL(profileImg);
    }

    updateProfilePenjahit(updateData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full h-full">
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

      <div>
        <label htmlFor="rentangBiaya">Deskripsi Profile</label>
        <textarea
          type="text"
          placeholder="Saya adalah seorang penjahit..."
          value={description}
          onChange={handleDescriptionChange}
          className="textarea textarea-bordered w-full text-xs rounded-md"
          required
        />
        <p className="text-right text-xs text-gray-500 mt-1">
          {description.split(/\s+/).filter((word) => word !== "").length} /{" "}
          {maxWords} kata
        </p>
      </div>

      <div>
        <label htmlFor="rentangBiaya">Rentang Biaya Jasa</label>
        <input
          type="text"
          placeholder="Contoh : 50rb - 100rb"
          value={rentangHarga}
          onChange={(e) => setRentangharga(e.target.value)}
          className="input input-bordered rounded-md w-full text-xs"
          required
        />
      </div>

      <div>
        <label htmlFor="kategori">Kategori Spesialisasi :</label>
        <div className="input input-bordered w-full overflow-x-auto whitespace-nowrap">
          {category
            ?.filter((cat) => kategori.includes(cat._id))
            .map((cat) => cat.name)
            .join(", ") || "Belum ada"}
        </div>
        <span className="text-xs">
          *harap masukkan kembali kategori speliasasi anda
        </span>
        <div className="dropdown dropdown-start mt-2 w-full h-full">
          <div tabIndex={0} role="button" className="btn w-full">
            Pilih Spesialisasi
          </div>
          <ul className="dropdown-content bg-base-100 rounded-box z-50 w-full  grid grid-cols-2 gap-y-2 p-4  shadow-sm">
            {category?.map((cat) => (
              <li key={cat._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={cat._id}
                  checked={kategori.includes(cat._id)}
                  onChange={handleCheckboxChange}
                  className="checkbox checkbox-sm checkbox-primary "
                />
                <span className="text-sm">{cat.name}</span>
              </li>
            ))}
          </ul>
        </div>
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

export default EditProfilePenjahitForm;
