import { Link } from "react-router-dom";
import { usePenjahitById } from "../../queries/penjahit/penjahitQuery";
import { useRef, useState } from "react";
import { useCreateTransaksiToPenjahit } from "../../queries/transaksi/transaksiMutation";

const InputTransaksiToPenjahit = ({ id }) => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tenggatWaktu, setTenggatWaktu] = useState("");
  const [catatan, setCatatan] = useState(""); // Tambahkan state catatan
  const [prosesPengerjaan, setProsesPengerjaan] = useState("Diantar"); // Tambahkan state proses pengerjaan
  const [image, setImage] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const { data: penjahitById, isLoading } = usePenjahitById(id);
  const fileInputRef = useRef(null);
  const { mutate: createTransaksiToPenjahit, isPending } =
    useCreateTransaksiToPenjahit();

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
      penjahitId: id,
      judul,
      deskripsi,
      tenggatWaktu,
      prosesPengerjaan,
      catatan,
    };

    if (image) {
      createData.image = await readFileAsDataURL(image);
    }

    createTransaksiToPenjahit(createData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-full flex">
      <div className="w-full">
        <div className="flex gap-2 mb-8">
          <img
            src={penjahitById?.user?.profileImg || "/avatar.png"}
            alt={penjahitById?.user?.name}
            className="rounded-full w-8 h-8"
          />
          <h2 className="text-xl font-semibold">{penjahitById?.user?.name}</h2>
        </div>
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
              <option>Diantar</option>
              <option>Diambil</option>
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
              *Disarankan untuk upload gambar horizontal (max 7MB)
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

export default InputTransaksiToPenjahit;
