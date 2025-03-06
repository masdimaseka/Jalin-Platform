import LoginAdminForm from "../../components/admin/LoginAdminFrom";

const LoginAdminPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 py-8">
      <div>
        <img className="h-20" src="/new_logo.svg" alt="" />
      </div>
      <div>
        <h2 className="text-2xl sm:text-4xl font-semibold ">Masuk</h2>
        <p className="text-body-text mb-4 text-sm">Masuk sebagai Admin jalin</p>

        <LoginAdminForm />
      </div>
    </div>
  );
};

export default LoginAdminPage;
