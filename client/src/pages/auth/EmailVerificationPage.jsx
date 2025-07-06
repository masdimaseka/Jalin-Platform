import EmailVerificationForm from "../../components/auth/EmailVerificationForm";

const EmailVerificationPage = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="flex flex-col justify-center gap-4 lg:h-[70vh] w-full lg:w-[30vw] bg-white rounded-lg shadow py-8 px-4">
        <img className="mx-auto h-20 " src="/new_logo.svg" alt="" />
        <h2 className="text-lg sm:text-2xl font-semibold mt-8 lg:mt-0 text-center">
          Verifikasi Akun Anda
        </h2>
        <p className="text-body-text mb-4 text-sm">
          Masukkan kode 6 digit yang dikirim ke alamat email Anda.
        </p>

        <EmailVerificationForm />

        <p className="text-body-text mb-4 text-xs">
          Belum menerima email?{" "}
          <a
            target="_blank"
            href="https://wa.me/6285183949145/"
            className="text-secondary-jalin font-semibold"
          >
            Hubungi admin
          </a>
        </p>
      </div>
    </div>
  );
};
export default EmailVerificationPage;
