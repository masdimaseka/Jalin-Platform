import { useState } from "react";
import { useLogin } from "../../queries/auth/authMutation";
import { Icon } from "@iconify/react/dist/iconify.js";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: loginMutation, isPending } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation({ username, password });
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

      <div className="relative">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan Password (6+ characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        className="btn btn-primary w-full block mt-20"
        disabled={isPending}
      >
        {isPending ? (
          <Icon icon="codex:loader" width="24" height="24" />
        ) : (
          "Masuk"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
