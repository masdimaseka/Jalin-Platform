import { Link } from "react-router-dom";
import { useAuthAdmin } from "../../queries/admin/adminQuery";
import { useLogoutAdmin } from "../../queries/admin/adminMutation";
import { Icon } from "@iconify/react/dist/iconify.js";

const NavbarAdmin = () => {
  const { data: authAdmin } = useAuthAdmin();
  const { mutate: logutAdminMutate } = useLogoutAdmin();
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between max-w-screen px-8 lg:px-16 py-4">
        <div>
          <Link to="/admin">
            <img src="/new_logo.svg" alt="Logo jalin" className="h-10" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link className="btn btn-primary text-white flex items-center gap-2 font-bold">
            <Icon icon="ic:sharp-account-circle" width="24" height="24" />
            <span>{authAdmin.username}</span>
          </Link>
          <button
            className="btn border-0  bg-error text-white"
            onClick={logutAdminMutate}
          >
            <Icon icon="majesticons:logout" width="24" height="24" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
