import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const OnReviewRegister = () => {
  return (
    <>
      <Icon
        className="text-primary-jalin"
        icon="mingcute:time-fill"
        width="100"
        height="100"
      />
      <h1 className="text-xl sm:text-3xl font-semibold text-center">
        Pendaftaran anda akan diverifikasi terlebih dahulu
      </h1>
      <p className="text-center">
        Terima kasih sudah mendaftar sebagain penjahit dalam platform jalin.
        Mohon ditunggu 1-2 hari kerja untuk kami mereview dan memverfikasi
        pendaftaran yang anda lakukan. Nanti kami akan memberikan status
        pendaftaran penjahit anda melalui email yang anda daftarkan.
      </p>
      <Link className="btn btn-primary" to="/">
        Kembali ke halaman utama
      </Link>
    </>
  );
};

export default OnReviewRegister;
