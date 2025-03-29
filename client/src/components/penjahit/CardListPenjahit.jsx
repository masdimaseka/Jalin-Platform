import {
  useCategories,
  usePenjahit,
} from "../../queries/penjahit/penjahitQuery";
import { useState } from "react";
import { useAuthUser } from "../../queries/auth/authQuery";
import SearchBar from "../SearchBar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const CardListPenjahit = () => {
  const { data: penjahit, isLoading } = usePenjahit();
  const { data: category } = useCategories();
  const { data: authUser } = useAuthUser();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!penjahit || penjahit.length === 0) {
    return (
      <h1 className="text-center text-lg font-semibold mt-4">
        Tidak ada penjahit yang tersedia
      </h1>
    );
  }

  const filteredPenjahit = penjahit.filter((p) => {
    const matchesCategory = selectedCategory
      ? p.kategori?.includes(selectedCategory)
      : true;
    const matchesSearch = p.user.name.toLowerCase().includes(searchQuery);
    const isNotCurrentUser = authUser ? p.user._id !== authUser._id : true;
    return matchesCategory && matchesSearch && isNotCurrentUser;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row mb-8 gap-4">
        <SearchBar onSearchChange={handleSearchChange} />
        <select
          className="select select-bordered w-48"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Semua Kategori</option>
          {category?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-4">
        {filteredPenjahit.length > 0 ? (
          filteredPenjahit
            .filter((p) => p.openToWork && p.isVerified)
            .map((p, index) => (
              <div key={index} className="card bg-base-100 w-80 shadow-sm">
                <div className="card-body">
                  <div className="flex justify-center mb-4">
                    <img
                      src={p.user.profileImg || "/avatar.png"}
                      alt={p.user.name}
                      className="rounded-full w-32 h-32"
                    />
                  </div>

                  <h2 className="card-title">
                    {p.user.name}{" "}
                    <Icon
                      icon="material-symbols:verified-rounded"
                      width="20"
                      height="20"
                      className="text-primary-jalin"
                    />
                  </h2>

                  <p>
                    {p.description
                      ? p.description.split(" ").slice(0, 20).join(" ") +
                        (p.description.split(" ").length > 20 ? "..." : "")
                      : "Deskripsi belum tersedia."}
                  </p>

                  <div className="card-actions mt-4 flex flex-wrap gap-2">
                    <div className="badge badge-success">Open To Work</div>
                    {p.kategori?.length > 0 ? (
                      p.kategori.map((id, i) => {
                        const kategoriName =
                          category?.find((cat) => cat._id === id)?.name ||
                          "Tidak ditemukan";
                        return (
                          <div key={i} className="badge badge-outline">
                            {kategoriName}
                          </div>
                        );
                      })
                    ) : (
                      <div className="badge badge-outline">Tidak tersedia</div>
                    )}
                  </div>
                  <Link
                    to={`/penjahit/apply/${p._id}`}
                    className={`btn mt-4 ${
                      authUser ? "btn-primary" : "btn-disabled"
                    }`}
                  >
                    {authUser ? "Hubungi Penjahit" : "Bergabung untuk Hubungi"}
                  </Link>
                </div>
              </div>
            ))
        ) : (
          <p className="text-center w-full col-span-3 text-gray-500">
            Tidak ada penjahit yang cocok dengan pencarian atau kategori ini.
          </p>
        )}
      </div>
    </div>
  );
};

export default CardListPenjahit;
