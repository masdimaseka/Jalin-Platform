import { useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useFinishTransaksi } from "../../queries/transaksi/transaksiMutation";
import { Icon } from "@iconify/react/dist/iconify.js";

export const FinishTransaksiModal = ({ isOpen, onClose, transaksiId }) => {
  const [images, setImages] = useState([]);
  const [previewImgs, setPreviewImgs] = useState([]);
  const fileInputRef = useRef(null);

  const { mutate: finishTransaksi, isPending } = useFinishTransaksi();

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
    formData.append("transaksiId", transaksiId);

    images.forEach((img) => formData.append("images", img)); // multiple files

    finishTransaksi(formData, {
      onSuccess: () => {
        toast.success("Transaksi transaksi telah selesai");
        onClose();
      },
      onError: () => toast.error("Gagal menyelesaikan transaksi"),
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={onClose}
      ></div>
      <dialog open className="modal z-50">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-6">Pekerjaan Selesai</h3>
          <div>
            <label className="block text-sm font-medium">
              Upload bukti pekerjaan telah selesai
            </label>
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
          <div className="modal-action flex flex-col">
            <button
              className="btn btn-success w-full"
              onClick={handleSubmit}
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
                "Selesai"
              )}
            </button>
            <button className="btn bg-none font-light" onClick={onClose}>
              Batal
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
