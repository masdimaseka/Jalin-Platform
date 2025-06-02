import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useChangeUserPasswordByAdmin } from "../../queries/admin/adminMutation";

const ResetPasswordByAdminPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: changePasswordByAdmin, isPending } =
    useChangeUserPasswordByAdmin();

  const openModal = (e) => {
    e.preventDefault(); // cegah submit langsung
    setIsModalOpen(true);
  };

  const handleConfirmSubmit = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("newPassword", newPassword);

    changePasswordByAdmin(formData);
  };

  return (
    <>
      <form onSubmit={openModal} className="flex flex-col gap-4 w-full ">
        <div>
          <label htmlFor="username">Masukan Username</label>
          <input
            type="text"
            placeholder="Masukkan Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered rounded-md w-full text-xs"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Masukan Email User</label>
          <input
            type="text"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered rounded-md w-full text-xs"
            required
          />
        </div>

        <div className="relative">
          <label htmlFor="newPassword" className="block text-sm font-medium">
            Password Baru
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan Password (6+ characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input input-bordered rounded-md w-full text-xs pr-10"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icon
                icon={showPassword ? "tabler:eye-off" : "tabler:eye"}
                width={18}
                className="cursor-pointer"
              />
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary w-full mt-8"
        >
          {isPending ? "Menyimpan..." : "Reset Password"}
        </button>
      </form>

      {/* Modal Konfirmasi */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <dialog open className="modal z-50">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-6">
                Konfirmasi Ubah Password
              </h3>
              <p>Yakin ingin mereset password untuk user ini?</p>
              <div className="modal-action flex flex-col">
                <button
                  className="btn btn-error w-full"
                  onClick={handleConfirmSubmit}
                  disabled={isPending}
                >
                  {isPending ? "Memproses..." : "Ya, Reset Password"}
                </button>
                <button
                  className="btn bg-none font-light"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
              </div>
            </div>
          </dialog>
        </>
      )}
    </>
  );
};

export default ResetPasswordByAdminPage;
