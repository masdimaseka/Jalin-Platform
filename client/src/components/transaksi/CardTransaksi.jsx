import { Icon } from "@iconify/react/dist/iconify.js";

const CardTransaksi = ({ transaksi, show }) => {
  return (
    <div className="card bg-base-100 w-80 shadow-sm">
      <figure className="w-full h-48 overflow-hidden rounded-lg">
        <img
          src={transaksi.image || "/banner.png"}
          alt="Jahitan"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body flex justify-between">
        <h2 className="card-title line-clamp-2">{transaksi.judul}</h2>
        <div className="flex flex-col lg:flex-row flex-wrap gap-4 mt-2">
          <span className="flex items-center gap-1">
            <Icon
              icon="material-symbols-light:work-history"
              width="20"
              height="20"
              className="text-primary-jalin"
            />
            <p className="text-sm">{transaksi.status}</p>
          </span>
          <span className="flex items-center gap-1">
            <Icon
              icon="solar:calendar-bold"
              width="16"
              height="16"
              color="red"
            />
            <p className="text-sm">
              {new Date(transaksi.tenggatWaktu).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </span>

          <span className="flex items-center gap-1">
            <Icon
              icon="mage:delivery-truck-fill"
              width="20"
              height="20"
              className="text-primary-jalin"
            />
            <p className="text-sm">{transaksi.pengerjaan}</p>
          </span>
        </div>
        <div className="my-4">
          <p>{show} : </p>
          <div className="flex items-center mt-2 gap-2">
            <img
              src={
                show === "Customer"
                  ? transaksi.user.profileImg || "/avatar.png"
                  : transaksi.penjahit.user.profileImg || "/avatar.png"
              }
              alt="avatar"
              className="rounded-full w-8 h-8"
            />
            <div className="flex items-center gap-2 max-w-[200px]">
              <h2 className="text-md font-semibold truncate flex-1">
                {show === "Customer"
                  ? transaksi.user.name
                  : transaksi.penjahit.user.name}
              </h2>
              <Icon
                icon="material-symbols:verified-rounded"
                width="20"
                height="20"
                className="text-primary-jalin"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTransaksi;
