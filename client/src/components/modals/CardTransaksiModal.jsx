import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

export const CardTransaksiModal = ({ isOpen, onClose, transaksiData }) => {
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
        <Link
          to={`/jahitan/${transaksiData._id}`}
          className="card bg-base-100 w-80 shadow-sm cursor-pointer h-full hidden lg:block"
        >
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <figure className="w-full h-48 overflow-hidden rounded-lg">
            <img
              src={transaksiData.image?.[0] || "/banner.png"}
              alt="Jahitan"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body flex justify-between">
            <h2 className="card-title line-clamp-2">{transaksiData.judul}</h2>
            <div className="flex flex-col lg:flex-row flex-wrap gap-4 mt-2">
              <span className="flex items-center gap-1">
                <Icon
                  icon="material-symbols-light:work-history"
                  width="20"
                  height="20"
                  className="text-primary-jalin"
                />
                <p className="text-sm">{transaksiData.status}</p>
              </span>
              <span className="flex items-center gap-1">
                <Icon
                  icon="solar:calendar-bold"
                  width="16"
                  height="16"
                  color="red"
                />
                <p className="text-sm">
                  {new Date(transaksiData.tenggatWaktu).toLocaleString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "UTC",
                    }
                  )}
                </p>
              </span>

              <span className="flex items-center gap-1">
                <Icon
                  icon="mage:delivery-truck-fill"
                  width="20"
                  height="20"
                  className="text-primary-jalin"
                />
                <p className="text-sm">{transaksiData.pengerjaan}</p>
              </span>
            </div>
          </div>
        </Link>
      </dialog>
    </>
  );
};
