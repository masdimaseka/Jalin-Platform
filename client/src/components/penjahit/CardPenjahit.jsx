import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const CardPenjahit = ({ penjahit, authUser }) => {
  return (
    <div className="card bg-base-100 w-80 shadow-sm">
      <div className="card-body flex justify-between">
        <div className="flex justify-center mb-4">
          <Link
            to={`/penjahit/${penjahit._id}`}
            className="flex flex-col items-center"
          >
            <img
              src={penjahit.user.profileImg || "/avatar.png"}
              alt={penjahit.user.name}
              className="rounded-full w-32 h-32"
              loading="lazy"
            />
          </Link>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold  truncate">
              {penjahit.user.name}
            </h2>
            <Icon
              icon="material-symbols:verified-rounded"
              width="20"
              height="20"
              className="text-primary-jalin"
            />
          </div>

          {penjahit.openToWork ? (
            <div className="badge badge-success my-4">
              <p className="text-xs">Open To Work</p>
            </div>
          ) : (
            <div className="badge badge-error my-4">
              <p className="text-xs">Closed To Work</p>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-4 ">
            <span className="flex items-center gap-1">
              <Icon
                icon="ic:round-star"
                width="20"
                height="20"
                color="orange"
              />
              <p className="text-sm">({penjahit.rating})</p>
            </span>
            <span className="flex items-center gap-1">
              <Icon
                icon="tdesign:money-filled"
                width="16"
                height="16"
                className="text-primary-jalin"
              />
              <p className="text-sm">({penjahit.rentangHarga})</p>
            </span>
          </div>

          <div className="mt-1">
            <span className="flex items-start gap-1">
              <Icon
                icon="carbon:location-filled"
                width="16"
                height="16"
                className="text-primary-jalin"
              />
              <p className="text-sm truncate ">{penjahit.user.address}</p>
            </span>
          </div>
        </div>

        <div className="card-actions mt-4 flex flex-wrap gap-2">
          {penjahit.kategori?.length > 0 ? (
            <>
              {penjahit.kategori.slice(0, 2).map((k, i) => (
                <div key={i} className="badge badge-outline">
                  {k.name}
                </div>
              ))}
              {penjahit.kategori.length > 2 && (
                <div className="badge badge-outline">
                  +{penjahit.kategori.length - 2}
                </div>
              )}
            </>
          ) : (
            <div className="badge badge-outline">Tidak tersedia</div>
          )}
        </div>

        {penjahit.openToWork ? (
          <Link
            to={`/penjahit/apply/${penjahit._id}`}
            className={`btn mt-4 ${authUser ? "btn-primary" : "btn-disabled"}`}
          >
            {authUser ? "Hubungi Penjahit" : "Bergabung untuk Hubungi"}
          </Link>
        ) : (
          <Link
            to={`/penjahit/apply/${penjahit._id}`}
            className={`btn mt-4 btn-disabled`}
          >
            Penjahit sedang tidak tersedia
          </Link>
        )}
      </div>
    </div>
  );
};

export default CardPenjahit;
