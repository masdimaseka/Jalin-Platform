import { Link } from "react-router-dom";
import { usePenjahitById } from "../../queries/penjahit/penjahitQuery";
import { useRef, useState } from "react";
import { useCreateTransaksiToPenjahit } from "../../queries/transaksi/transaksiMutation";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

const InputTransaksiToPenjahit = ({ id }) => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tenggatWaktu, setTenggatWaktu] = useState("");
  const [catatan, setCatatan] = useState("");
  const [prosesPengerjaan, setProsesPengerjaan] = useState(
    "diantar ke penjahit"
  );
  const [images, setImages] = useState([]);
  const [previewImgs, setPreviewImgs] = useState([]);

  const fileInputRef = useRef(null);
  const { data: penjahitById, isLoading } = usePenjahitById(id);
  const { mutate: createTransaksiToPenjahit, isPending } =
    useCreateTransaksiToPenjahit();

  const handleImgChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 3) {
      toast.error("Maksimal upload 3 gambar");
      return;
    }

    const previews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...files]);
    setPreviewImgs((prev) => [...prev, ...previews]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImgs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Harap upload minimal 1 gambar");
      return;
    }

    const formData = new FormData();
    formData.append("penjahitId", id);
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);
    formData.append("tenggatWaktu", tenggatWaktu);
    formData.append("prosesPengerjaan", prosesPengerjaan);
    formData.append("catatan", catatan);
    images.forEach((img) => formData.append("images", img));

    createTransaksiToPenjahit(formData, {
      onSuccess: () => toast.success("Transaksi berhasil dikirim ke penjahit"),
      onError: () => toast.error("Gagal mengirim transaksi"),
    });
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Tenggat Pekerjaan
            </label>
            <input
              type="datetime-local"
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
              <option value="diantar ke penjahit">Diantar ke Penjahit</option>
              <option value="diambil oleh penjahit">
                Diambil oleh Penjahit
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Upload Gambar</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImgChange}
              className="file-input file-input-bordered w-full"
              multiple
              accept="image/*"
            />
            <p className="text-xs font-light mt-2">
              *Maksimal 3 gambar, ukuran max 3MB
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {previewImgs.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="rounded-md w-32 h-32 object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white cursor-pointer rounded-full"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <Icon
                      icon="material-symbols:cancel"
                      width="24"
                      height="24"
                    />
                  </button>
                </div>
              ))}
            </div>
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
              {isPending ? (
                <Icon
                  icon="line-md:loading-loop"
                  width="16"
                  height="16"
                  color="gray"
                />
              ) : (
                "Kirim"
              )}
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
