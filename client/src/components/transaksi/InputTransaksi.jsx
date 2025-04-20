import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useCreateTransaksi } from "../../queries/transaksi/transaksiMutation";

const InputTransaksi = () => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tenggatWaktu, setTenggatWaktu] = useState("");
  const [catatan, setCatatan] = useState("");
  const [prosesPengerjaan, setProsesPengerjaan] = useState("Diantar");
  const [image, setImage] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const fileInputRef = useRef(null);
  const { mutate: createTransaksi, isPending } = useCreateTransaksi();

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      readFileAsDataURL(file).then(setPreviewImg);
    } else {
      setPreviewImg(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createData = {
      judul,
      deskripsi,
      tenggatWaktu,
      prosesPengerjaan,
      catatan,
    };

    if (image) {
      createData.image = await readFileAsDataURL(image);
    }

    createTransaksi(createData);
  };

  return (
    <div className="w-full flex">
      <div className="w-full">
        <h1 className="text-2xl sm:text-4xl font-semibold mb-8">
          Buat Jahitan
        </h1>
        <h1></h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Judul Pekerjaan</label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Masukkan judul pekerjaan"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Deskripsi Pekerjaan
            </label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Jelaskan detail pekerjaan"
              className="textarea textarea-bordered w-full"
              rows="3"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Tenggat Pekerjaan
            </label>
            <input
              type="date"
              value={tenggatWaktu}
              onChange={(e) => setTenggatWaktu(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Proses Pengerjaan
            </label>
            <select
              value={prosesPengerjaan}
              onChange={(e) => setProsesPengerjaan(e.target.value)}
              className="select w-full"
            >
              <option>Diantar ke Penjahit</option>
              <option>Diambil oleh Penjahit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Upload Gambar</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImgChange}
              className="file-input file-input-bordered w-full"
              required
              accept="image/*"
            />
            <p className="text-xs font-light mt-2">
              *Disarankan untuk upload gambar landscape (max 7MB)
            </p>
            {previewImg && (
              <img
                src={previewImg}
                alt="Preview"
                className="rounded-md lg:w-1/2 mt-4"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Catatan Tambahan
            </label>
            <input
              type="text"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Tambahkan catatan jika diperlukan"
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex gap-2 my-16">
            <button
              type="submit"
              className="btn btn-primary w-30"
              disabled={isPending}
            >
              {isPending ? "Mengirim..." : "Kirim"}
            </button>
            <Link to="/penjahit" className="btn btn-ghost w-30">
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputTransaksi;
