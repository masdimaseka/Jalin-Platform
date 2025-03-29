import { useParams } from "react-router-dom";
import { OnReviewRegister } from "../components/Status";

const StatusPage = () => {
  const { status } = useParams();
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-8 justify-center items-center bg-white rounded-lg shadow py-8 px-4 lg:w-[60vw]">
        {status === "register-penjahit-on-review" && (
          <OnReviewRegister
            title="Pendaftaran anda akan diverifikasi terlebih dahulu"
            desc="Terima kasih sudah mendaftar sebagain penjahit dalam platform jalin. Mohon ditunggu 1-2 hari kerja untuk kami mereview dan memverfikasi pendaftaran yang anda lakukan. Nanti kami akan memberikan status pendaftaran penjahit anda melalui email yang anda daftarkan."
            navigation="/"
          />
        )}
        {status === "transaksi-created" && (
          <OnReviewRegister
            title="Pekerjaan anda sudah terkirim!"
            desc="Terima kasih sudah menghubungi penjahit kami. Pekerjaan mu sudah diterima oleh penjahit, mohon ditunggu pekerjaan mu diterima oleh penjahit. Pekerjaan akan otomatis dibatalkan jika sudah lebih dari 3 hari belum diterima oleh penjahit."
            navigation="/penjahit"
          />
        )}
      </div>
    </div>
  );
};

export default StatusPage;
