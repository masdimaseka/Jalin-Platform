import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../../queries/penjahit/penjahitQuery";
import { useRegisterPenjahit } from "../../queries/penjahit/penjahitMutation";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [profileImg, setProfileImg] = useState(null);
  const [description, setDescription] = useState("");
  const [dokKTP, setDokKTP] = useState(null);
  const [dokPortofolio, setDokPortofolio] = useState([]);
  const [rentangHarga, setRentangharga] = useState("");
  const [kategori, setKategori] = useState([]);
  const [isAgreeTerms, setIsAgreeTerms] = useState(false);

  const fileInputRef = useRef(null);

  const { data: category } = useCategories();
  const { mutate: registerPenjahit, isPending } = useRegisterPenjahit();

  const maxWords = 100;

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
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
    };
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const registerData = {
        description,
        rentangHarga,
        kategori,
        isAgreeTerms,
      };
      if (profileImg) {
        registerData.profileImg = await readFileAsDataURL(profileImg);
      }
      if (dokKTP) {
        registerData.dokKTP = await readFileAsDataURL(dokKTP);
      }
      if (dokPortofolio.length > 0) {
        const dokPortofolioUrls = await Promise.all(
          [...dokPortofolio].map((file) => readFileAsDataURL(file))
        );
        registerData.dokPortofolio = dokPortofolioUrls;
      }
      registerPenjahit(registerData);
    } catch (err) {
      console.log("Error saat registrasi:", err);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col gap-4 w-full lg:w-[30vw]"
    >
      <div>
        <label htmlFor="dokKTP">Foto Profile</label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleProfileImgChange}
          className="file-input input-bordered rounded-md w-full text-xs"
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
        <label htmlFor="dokKTP">Dokumen KTP</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setDokKTP(e.target.files[0])}
          className="file-input input-bordered rounded-md w-full text-xs"
          required
        />
      </div>
      <div>
        <label htmlFor="dokPortofolio">
          Dokumen Portofolio{" "}
          <span className="text-xs">(alat jahit, hasil pekerjaan)</span>
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setDokPortofolio([...e.target.files])}
          className="file-input input-bordered rounded-md w-full text-xs"
        />
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
        <label htmlFor="kategori">Kategori Spesialisasi</label>
        <p className="mt-2 text-sm text-gray-500">Kategori terpilih:</p>
        <div className="input input-bordered w-full overflow-x-auto whitespace-nowrap">
          {category
            ?.filter((cat) => kategori.includes(cat._id))
            .map((cat) => cat.name)
            .join(", ") || "Belum ada"}
        </div>
        <div className="dropdown dropdown-start mt-2 w-full">
          <div tabIndex={0} role="button" className="btn w-full">
            Pilih Spesialisasi
          </div>
          <ul className="dropdown-content bg-base-100 rounded-box z-50 w-full max-h-64 overflow-y-auto grid grid-cols-2 gap-y-2 p-2 shadow-sm">
            {category?.map((cat) => (
              <li key={cat._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={cat._id}
                  checked={kategori.includes(cat._id)}
                  onChange={handleCheckboxChange}
                  className="checkbox checkbox-sm checkbox-primary appearance-auto"
                />
                <span className="text-sm">{cat.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <input
          required
          type="checkbox"
          checked={isAgreeTerms}
          onChange={(e) => setIsAgreeTerms(e.target.checked)}
          className="checkbox checkbox-xs checkbox-primary mr-2"
        />
        <span className="text-sm">
          Saya menyetujui semua{" "}
          <Link
            to="/terms-and-conditions"
            target="_blank"
            className="text-secondary-jalin"
          >
            Ketentuan dan Kebijakan Privasi
          </Link>
        </span>
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isPending}
      >
        {isPending ? "Mendaftarkan..." : "Daftar"}
      </button>
    </form>
  );
};

export default RegisterForm;
