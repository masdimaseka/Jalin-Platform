import { Loader } from "lucide-react";
import { useState } from "react";
import { useLogin } from "../../queries/auth/authMutation";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        disabled={isPending}
      >
        {isPending ? <Loader className="size-5 animate-spin" /> : "Masuk"}
      </button>
    </form>
  );
};

export default LoginForm;
