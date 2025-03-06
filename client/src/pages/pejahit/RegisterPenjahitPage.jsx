import RegisterForm from "../../components/penjahit/RegisterForm";

const RegisterPenjahit = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center lg:gap-20 py-8 ">
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
      <div className="">
        <h2 className="text-2xl sm:text-4xl font-semibold mt-8 lg:mt-0">
          Daftar Penjahit
        </h2>
        <p className="text-body-text mb-4 text-sm">
          Daftar sebagai penjahit jalin
        </p>

        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPenjahit;
