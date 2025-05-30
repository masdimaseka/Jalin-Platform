// [Semua import sudah sesuai — tidak perlu diubah, kecuali menghapus import Penjahit]
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTransaksiById } from "../../queries/transaksi/transaksiQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useAuthPenjahit } from "../../queries/auth/authQuery";
import {
  useAcceptTransaksi,
  useRejectTransaksi,
} from "../../queries/transaksi/transaksiMutation";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ConfirmAcceptModal,
  ConfirmRejectModal,
} from "../modals/TransaksiModal";
import { FinishTransaksiModal } from "../modals/FinishTransaksiModal";
import { InfoTransaksiModal } from "../modals/InfoTransaksiModal";

const DetailTransaksiForPenjahit = ({ id }) => {
  const [confirmAccept, setConfirmAccept] = useState(false);
  const [confirmReject, setConfirmReject] = useState(false);
  const [confirmFinish, setConfirmFinish] = useState(false);
  const [seeInformation, setSeeInformation] = useState(false);

  const { data: authPenjahit } = useAuthPenjahit();
  const { data: transaksiById, isLoading } = useTransaksiById(id);
  const { mutate: acceptTransaksi, isPending } = useAcceptTransaksi();
  const { mutate: rejectTransaksi, isPending: isPendingReject } =
    useRejectTransaksi();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
      </div>
    );
  }

  const handleTerimaPekerjaan = (transaksiId, penjahitId) => {
    acceptTransaksi({ transaksiId, penjahitId });
    setConfirmAccept(false);
  };

  const handleTolakPekerjaan = (transaksiId) => {
    rejectTransaksi({ transaksiId });
    setConfirmReject(false);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8">
      <div className="w-full lg:w-[60vw]">
        <div className="bg-base-100 border-gray-100 border-2 p-8 mb-8 rounded-lg">
          <h1 className="text-2xl font-semibold mb-6">
            {transaksiById?.judul}
          </h1>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-2">
              <p>Tenggat waktu :</p>
              <span className="flex gap-1 badge badge-error">
                <Icon icon="solar:calendar-bold" width="16" height="16" />
                <p className="text-sm">
                  {new Date(transaksiById?.tenggatWaktu).toLocaleString(
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
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-2">
              <p>Pengerjaan :</p>
              <span className="flex items-center gap-1 badge badge-primary">
                <Icon icon="mage:delivery-truck-fill" width="20" height="20" />
                <p className="text-sm">{transaksiById?.pengerjaan}</p>
              </span>
            </div>
          </div>

          {transaksiById?.pengerjaan === "diambil oleh penjahit" ? (
            <div className="flex flex-col lg:flex-row lg:items-center gap-2 mt-4">
              <p>Alamat Customer:</p>
              <span className="flex gap-1">
                <Icon
                  icon="carbon:location-filled"
                  width="16"
                  height="16"
                  className="text-primary"
                />
                <p className="text-sm">{transaksiById?.alamat}</p>
              </span>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row lg:items-center gap-2 mt-4">
              <p>Alamat Penjahit :</p>
              <span className="flex gap-1">
                <Icon
                  icon="carbon:location-filled"
                  width="16"
                  height="16"
                  className="text-primary"
                />
                <p className="text-sm">
                  {transaksiById?.penjahit?.user?.address}
                </p>
              </span>
            </div>
          )}
        </div>

        <Swiper
          loop={true}
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper mb-8"
        >
          {transaksiById?.image?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                onError={(e) => (e.target.src = "/no-image.png")}
                alt={`Slide ${index + 1}`}
                className="w-full h-[75vh] object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="my-6 bg-base-100 border-gray-100 border-2 p-8 rounded-lg">
          <h3 className="font-semibold mb-2">Deskripsi Pekerjaan</h3>
          <p className="text-justify">
            {transaksiById?.deskripsi || "Tidak ada"}
          </p>
        </div>

        <div className="my-6 bg-base-100 border-gray-100 border-2 p-8 rounded-lg">
          <h3 className="font-semibold mb-2">Catatan tambahan</h3>
          <p className="text-justify">
            {transaksiById?.catatan || "Tidak ada"}
          </p>
        </div>
      </div>

      <div className="card bg-base-100 w-full lg:w-80 h-full shadow-sm">
        <div className="card-body flex justify-between">
          <div className="my-4">
            <p>Customer :</p>
            <div className="flex items-center mt-2 gap-2">
              <img
                src={transaksiById?.user?.profileImg || "/avatar.png"}
                alt="avatar"
                className="rounded-full w-8 h-8"
              />
              <div className="flex items-center gap-2 max-w-[200px]">
                <h2 className="text-md font-semibold truncate flex-1">
                  {transaksiById?.user?.name}
                </h2>
                <Icon
                  icon="material-symbols:verified-rounded"
                  width="20"
                  height="20"
                  className="text-primary-jalin"
                />
              </div>
            </div>

            <div className="mt-8">
              {transaksiById?.status === "Menunggu" && (
                <>
                  <button
                    onClick={() => setConfirmAccept(true)}
                    className="btn btn-primary w-full mb-4"
                    disabled={isPending || !authPenjahit} // Nonaktifkan jika authPenjahit belum ada
                  >
                    {isPending ? (
                      <Icon
                        icon="line-md:loading-loop"
                        width="20"
                        height="20"
                      />
                    ) : (
                      "Ambil Pekerjaan"
                    )}
                  </button>

                  <button
                    onClick={() => setConfirmReject(true)}
                    className="btn btn-error w-full"
                    disabled={isPendingReject}
                  >
                    {isPendingReject ? (
                      <Icon
                        icon="line-md:loading-loop"
                        width="20"
                        height="20"
                      />
                    ) : (
                      "Tolak Pekerjaan"
                    )}
                  </button>
                </>
              )}

              {transaksiById?.status === "Diproses" && (
                <>
                  <Link
                    to={`/jahitan/${transaksiById?._id}/chat/${transaksiById?.user?._id}`}
                    className="btn btn-primary w-full mb-4"
                  >
                    <>
                      <span className="flex items-center gap-2">
                        <Icon
                          icon="fluent:chat-28-filled"
                          width="20"
                          height="20"
                        />
                        Hubungi customer
                      </span>
                    </>
                  </Link>

                  <button
                    onClick={() => setConfirmFinish(true)}
                    className="btn btn-success w-full mb-8"
                  >
                    <Icon icon="ep:success-filled" width="20" height="20" />
                    Selesaikan Pekerjaan
                  </button>

                  <h2 className="text-xs text-center">
                    Batalkan Pekerjaan?{" "}
                    <Link
                      className="text-error"
                      to="https://wa.me/6285183949145/"
                      target="_blank"
                    >
                      Ajukan Pembatalan
                    </Link>
                  </h2>
                </>
              )}

              {transaksiById?.status === "Selesai" && (
                <button
                  onClick={() => setSeeInformation(true)}
                  className="btn btn-success w-full mb-4"
                >
                  <Icon icon="mdi:information" width="20" height="20" />
                  Pekerjaan Telah Selesai
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {authPenjahit && transaksiById && (
        <ConfirmAcceptModal
          isOpen={confirmAccept}
          onClose={() => setConfirmAccept(false)}
          onConfirm={() =>
            handleTerimaPekerjaan(transaksiById._id, authPenjahit._id)
          }
          authPenjahit={authPenjahit}
        />
      )}

      {transaksiById && (
        <>
          <ConfirmRejectModal
            isOpen={confirmReject}
            onClose={() => setConfirmReject(false)}
            onConfirm={() => handleTolakPekerjaan(transaksiById._id)}
          />

          <FinishTransaksiModal
            isOpen={confirmFinish}
            onClose={() => setConfirmFinish(false)}
            transaksiId={transaksiById._id}
          />

          <InfoTransaksiModal
            isOpen={seeInformation}
            onClose={() => setSeeInformation(false)}
            transaksiData={transaksiById}
          />
        </>
      )}
    </div>
  );
};

export default DetailTransaksiForPenjahit;
