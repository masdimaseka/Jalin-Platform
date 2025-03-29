import { Link } from "react-router-dom";
import { usePenjahitById } from "../../queries/penjahit/penjahitQuery";
import { useRef, useState } from "react";
import { useCreateTransaksiToPenjahit } from "../../queries/transaksi/transaksiMutation";

export const InputTransaksiToPenjahit = ({ id }) => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tenggatWaktu, setTenggatWaktu] = useState("");
  const [image, setImage] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const { data: penjahitById } = usePenjahitById(id);

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
    };

    if (image) {
      createData.image = await readFileAsDataURL(image);
    }

    createTransaksiToPenjahit(createData);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
      <div className="flex gap-2 mb-8">
        <img
          src={penjahitById?.user.profileImg || "/avatar.png"}
          alt={penjahitById?.user.name}
          className="rounded-full w-8 h-8"
        />
        <h2 className="text-xl font-semibold">{penjahitById?.user.name}</h2>
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
          <label className="block text-sm font-medium">Tenggat Pekerjaan</label>
          <input
            type="date"
            value={tenggatWaktu}
            onChange={(e) => setTenggatWaktu(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Gambar</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImgChange}
            className="file-input file-input-bordered w-full"
          />
          {previewImg && (
            <img src={previewImg} alt="Preview" className="rounded-md  mt-4" />
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Link to="/penjahit" type="button" className="btn btn-ghost">
            Batal
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            {isPending ? "Mengirim..." : "Kirim"}
          </button>
        </div>
      </form>
    </div>
  );
};
