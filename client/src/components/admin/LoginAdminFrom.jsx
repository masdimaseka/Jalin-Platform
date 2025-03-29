import { useState } from "react";
import { useLoginAdmin } from "../../queries/admin/adminMutation.js";
import { Icon } from "@iconify/react/dist/iconify.js";

const LoginAdminForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: loginAdminMutation, isLoading } = useLoginAdmin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginAdminMutation({ username, password });
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 w-full lg:w-[30vw]"
    >
      <label htmlFor="username">Username</label>
      <input
        type="text"
        placeholder="Masukkan Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered rounded-md w-full text-xs"
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="Masukkan Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered rounded-md w-full text-xs"
        required
      />

      <button
        type="submit"
        className="btn btn-primary w-full block mt-20"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icon icon="codex:loader" width="24" height="24" />
        ) : (
          "Masuk"
        )}
      </button>
    </form>
  );
};

export default LoginAdminForm;
