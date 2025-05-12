import { Link } from "react-router-dom";
import SignUpForm from "../../components/auth/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-16 py-8">
      <div className="w-full lg:w-auto">
        <img
          className="mx-auto h-[40vh] xl:h-[60vh] w hidden lg:block"
          src="/banner-auth.png"
          alt=""
        />
        <img
          className="mx-auto h-20 block lg:hidden"
          src="/new_logo.svg"
          alt=""
        />
      </div>
      <div className="">
        <h2 className="text-2xl sm:text-4xl font-semibold mt-8 lg:mt-0">
          Daftar
        </h2>
        <p className="text-body-text mb-4 text-sm">
          Daftar sebagai pengguna jalin
        </p>

        <SignUpForm />

        <p className="mt-2 text-center">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-secondary-jalin">
            Masuk disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
