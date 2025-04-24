import { useState } from "react";
import { useCreateCategoryByAdmin } from "../../queries/admin/adminMutation";

const CreateCategoryAdminPage = () => {
  const [name, setName] = useState("");
  const { mutate: createCategoryByAdmin, isPending } =
    useCreateCategoryByAdmin();

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategoryByAdmin({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full ">
      <div>
        <label htmlFor="name">Nama Kategori</label>
        <input
          type="text"
          placeholder="Masukkan Nama Kategori"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered rounded-md w-full text-xs"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn btn-primary w-full mt-8"
      >
        {isPending ? "Menyimpan..." : "Tambahkan"}
      </button>
    </form>
  );
};

export default CreateCategoryAdminPage;
