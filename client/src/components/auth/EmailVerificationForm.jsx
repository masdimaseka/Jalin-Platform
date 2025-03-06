import { useState } from "react";
import { useVerifyEmail } from "../../queries/auth/authMutation";
import { Loader } from "lucide-react";

const EmailVerificationForm = () => {
  const [code, setCode] = useState("");

  const { mutate: verifyEmailMutation, isPending } = useVerifyEmail();

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyEmailMutation({ code });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Masukkan Kode Verifikasi"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="input input-bordered rounded-md w-full font-semibold text-primary-jalin text-lg"
        required
      />
      <button
        type="submit"
        className="btn btn-primary w-full block mt-20"
        disabled={isPending}
      >
        {isPending ? <Loader className="size-5 animate-spin" /> : "Verifikasi"}
      </button>
    </form>
  );
};

export default EmailVerificationForm;
