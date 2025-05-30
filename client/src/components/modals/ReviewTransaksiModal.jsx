import { useState } from "react";
import toast from "react-hot-toast";
import { useReviewTransaksi } from "../../queries/transaksi/transaksiMutation";
import { Icon } from "@iconify/react/dist/iconify.js";

export const ReviewTransaksiModal = ({ isOpen, onClose, transaksiData }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState(
    "Pekerjaan sangat memuaskan, penjahit sangat profesional."
  );

  const { mutate: reviewTransaksi, isPending } = useReviewTransaksi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("transaksiId", transaksiData._id);
    formData.append("userId", transaksiData.user._id);
    formData.append("rating", rating);
    formData.append("review", review);

    reviewTransaksi(formData, {
      onSuccess: () => {
        toast.success("Review penjahit telah dikirim");
        onClose();
      },
      onError: () => toast.error("Gagal mengirim review"),
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
          <h3 className="font-bold text-lg mb-6">Review Penjahit</h3>

          <div className="flex items-center gap-2 mb-6">
            <button className="cursor-pointer">
              <Icon
                icon="material-symbols:star-rounded"
                width="40"
                height="40"
                color={rating >= 1 ? "gold" : "gray"}
                onClick={() => setRating(1)}
                value={1}
              />
            </button>
            <button className="cursor-pointer">
              <Icon
                icon="material-symbols:star-rounded"
                width="40"
                height="40"
                color={rating >= 2 ? "gold" : "gray"}
                onClick={() => setRating(2)}
                value={2}
              />
            </button>
            <button className="cursor-pointer">
              <Icon
                icon="material-symbols:star-rounded"
                width="40"
                height="40"
                color={rating >= 3 ? "gold" : "gray"}
                onClick={() => setRating(3)}
                value={3}
              />
            </button>
            <button className="cursor-pointer">
              <Icon
                icon="material-symbols:star-rounded"
                width="40"
                height="40"
                color={rating >= 4 ? "gold" : "gray"}
                onClick={() => setRating(4)}
                value={4}
              />
            </button>
            <button className="cursor-pointer">
              <Icon
                icon="material-symbols:star-rounded"
                width="40"
                height="40"
                color={rating >= 5 ? "gold" : "gray"}
                onClick={() => setRating(5)}
                value={5}
              />
            </button>
            <h3>({rating}/5)</h3>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ulasan</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Pekerjaan sangat memuaskan, penjahit sangat profesional."
              className="textarea textarea-bordered w-full"
              rows="3"
              required
            />
          </div>

          <div className="modal-action flex flex-col">
            <button
              className="btn btn-primary w-full"
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
                "Kirim"
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
