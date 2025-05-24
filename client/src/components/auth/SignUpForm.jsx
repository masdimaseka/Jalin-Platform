import { useState } from "react";
import { useSignup } from "../../queries/auth/authMutation.js";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [address, setAddress] = useState("");
  const [isAgreeTerms, setIsAgreeTerms] = useState(false);

  const { mutate: signUpMutation, isPending } = useSignup();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();

    signUpMutation({
      name,
      username,
      email,
      password,
      noTelp,
      address,
      isAgreeTerms,
    });
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="flex flex-col gap-4 w-full lg:w-[30vw]"
    >
      <div>
        <label htmlFor="name">Nama Lengkap</label>
        <input
          type="text"
          placeholder="Masukkan Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered rounded-md w-full text-xs"
          required
        />
      </div>

      <div>
        <label htmlFor="username">Username</label>
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered rounded-md w-full text-xs"
          required
        />
      </div>

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

      <div>
        <label htmlFor="noTelp">No Telp.</label>
        <input
          type="number"
          placeholder="08xx-xxxx-xxxx"
          value={noTelp}
          onChange={(e) => setNoTelp(e.target.value)}
          className="input input-bordered rounded-md w-full text-xs"
          required
        />
      </div>

      <div>
        <label htmlFor="address">Alamat</label>
        <input
          type="text"
          placeholder="Jl. Raya No. 123, Denpasar Barat, Bali"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="input input-bordered rounded-md w-full text-xs"
          required
        />
      </div>

      <div className="mt-8">
        <input
          required
          type="checkbox"
          checked={isAgreeTerms}
          onChange={(e) => setIsAgreeTerms(e.target.checked)}
          className="checkbox checkbox-xs checkbox-primary mr-2"
        />
        <span className="text-sm">
          Saya menyetujui semua{" "}
          <Link
            to="/terms-and-conditions"
            target="_blank"
            className="text-secondary-jalin"
          >
            Ketentuan dan Kebijakan Privasi
          </Link>
        </span>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="btn btn-primary w-full"
      >
        {isPending ? (
          <Icon icon="codex:loader" width="24" height="24" />
        ) : (
          "Daftar"
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
