const InputPekerjaan = ({ penjahit, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data form
    console.log("Pekerjaan dikirim ke:", penjahit.user.name);
    onClose(); // Tutup modal setelah submit
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bg-jalin">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          Hubungi {penjahit.user.name}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Judul Pekerjaan</label>
            <input
              type="text"
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
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Upload Gambar</label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputPekerjaan;
