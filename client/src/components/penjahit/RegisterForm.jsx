import { useState } from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../../queries/penjahit/penjahitQuery";
import { useRegisterPenjahit } from "../../queries/penjahit/penjahitMutation";

const RegisterForm = () => {
  const [dokKTP, setDokKTP] = useState(null);
  const [dokPortofolio, setDokPortofolio] = useState([]);
  const [rentangHarga, setRentangharga] = useState("");
  const [kategori, setKategori] = useState([]);
  const [isAgreeTerms, setIsAgreeTerms] = useState(false);

  const { data: category } = useCategories();
  const { mutate: registerPenjahit, isPending } = useRegisterPenjahit();

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

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const registerData = { rentangHarga, kategori, isAgreeTerms };
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
        <label htmlFor="dokKTP">Dokumen KTP</label>
        <input
          type="file"
          onChange={(e) => setDokKTP(e.target.files[0])}
          className="file-input input-bordered rounded-md w-full text-xs"
          required
        />
      </div>

      <div>
        <label htmlFor="dokPortofolio">Dokumen Portofolio</label>
        <input
          type="file"
          multiple
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
        <div className="input input-bordered w-full">
          {category
            ?.filter((cat) => kategori.includes(cat._id))
            .map((cat) => cat.name)
            .join(", ") || "Belum ada"}
        </div>
        <div className="dropdown dropdown-start mt-2">
          <div tabIndex={0} role="button" className="btn w-full">
            Pilih Spesialisasi
          </div>
          <ul className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-sm">
            {category?.map((cat) => (
              <li key={cat._id} className="flex flex-row items-center gap-2">
                <input
                  type="checkbox"
                  value={cat._id} // Menggunakan _id, bukan name
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
