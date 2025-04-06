import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-8 justify-center items-center bg-white rounded-lg shadow py-8 px-4 lg:w-[60vw]">
        <Icon icon="tabler:error-404" width="100" height="100" color="red" />

        <h1 className="text-xl sm:text-3xl font-semibold text-center">
          Oops! Halaman tidak ditemukan
        </h1>
        <p className="text-center">
          Maaf halaman yang Anda cari tidak ditemukan
        </p>
        <Link className="btn btn-primary" to="/">
          Kembali ke halaman utama
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
