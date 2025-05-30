// ConfirmAcceptModal.jsx
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

export const ConfirmAcceptModal = ({
  isOpen,
  onClose,
  onConfirm,
  authPenjahit,
}) => {
  if (!isOpen || !authPenjahit) {
    // Tambahkan pengecekan authPenjahit
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
          <h3 className="font-bold text-lg mb-6">Terima Pekerjaan</h3>

          <div className="flex gap-2 items-center bg-blue-50 px-4 py-2 rounded-lg">
            <h1 className="text-lg font-semibold flex items-center gap-2">
              <img src="/jalinPoint.svg" className="w-6" alt="Jalin Point" />
              Point kamu:
              <span
                className={
                  authPenjahit.point >= 2000 ? "text-success" : "text-error"
                }
              >
                {Number(authPenjahit.point).toLocaleString("id-ID")}
              </span>
            </h1>
          </div>

          {authPenjahit.point < 2000 ? (
            <p className="my-4">
              Untuk menerima pekerjaan, memerlukan point <b>2.000.</b> Silahkan
              isi pointmu terlebih dahulu
            </p>
          ) : (
            <p className="my-4">
              Untuk menerima pekerjaan, pointmu akan digunakan <b>2.000.</b>
            </p>
          )}

          <div className="modal-action flex flex-col">
            {authPenjahit.point < 2000 ? (
              <Link
                to={`/topup-point/${authPenjahit._id}`}
                className="btn btn-primary"
              >
                <Icon icon="fluent:cart-24-filled" width="24" height="24" />
                Isi Point
              </Link>
            ) : (
              <button className="btn btn-primary w-full" onClick={onConfirm}>
                Bayar Sekarang
              </button>
            )}
            <button className="btn bg-none font-light" onClick={onClose}>
              Batal
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export const ConfirmRejectModal = ({ isOpen, onClose, onConfirm }) => {
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
          <h3 className="font-bold text-lg mb-6">Tolak Pekerjaan</h3>
          <p>Kamu yakin ingin menolak pekerjaan ini?</p>
          <div className="modal-action flex flex-col">
            <button className="btn btn-error w-full" onClick={onConfirm}>
              Tolak Pekerjaan
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
