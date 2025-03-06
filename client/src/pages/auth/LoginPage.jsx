import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className=" flex flex-col-reverse lg:flex-row justify-center gap-8 lg:gap-16 py-8">
      <div className="w-full lg:w-auto">
        <h2 className="text-2xl sm:text-4xl font-semibold mt-0">Masuk</h2>
        <p className="text-body-text mb-4 text-sm">
          Masuk sebagai pengguna jalin
        </p>

        <LoginForm />

        <p className="text-xs mt-2 text-center">
          Belum punya akun?{" "}
          <Link to="/signup" className="text-secondary-jalin">
            Daftar disini
          </Link>
        </p>
      </div>
      <div className="">
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
    </div>
  );
};

export default LoginPage;
