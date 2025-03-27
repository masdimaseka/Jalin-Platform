import {
  useCategories,
  usePenjahit,
} from "../../queries/penjahit/penjahitQuery";
import { useState } from "react";
import InputPekerjaan from "../InputPekerjaan";
import { useAuthUser } from "../../queries/auth/authQuery";
import SearchBar from "../SearchBar";
import { Icon } from "@iconify/react/dist/iconify.js";

const CardListPenjahit = () => {
  const { data: penjahit } = usePenjahit();
  const { data: category } = useCategories();
  const { data: authUser } = useAuthUser();
  const [selectedPenjahit, setSelectedPenjahit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = (penjahit) => {
    if (!authUser) {
      alert("Silakan login terlebih dahulu untuk menghubungi penjahit.");
      return;
    }
    setSelectedPenjahit(penjahit);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPenjahit(null);
    setIsModalOpen(false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  if (!penjahit || penjahit.length === 0) {
    return (
      <h1 className="text-center text-lg font-semibold mt-4">
        Tidak ada penjahit
      </h1>
    );
  }

  const filteredPenjahit = penjahit.filter((p) => {
    const matchesCategory = selectedCategory
      ? p.kategori?.includes(selectedCategory)
      : true;
    const matchesSearch = p.user.name.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row  mb-8 gap-4">
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
                  <button
                    onClick={() => openModal(p)}
                    className={`btn mt-4 ${
                      authUser ? "btn-primary" : "btn-disabled"
                    }`}
                  >
                    {authUser ? "Hubungi Penjahit" : "Bergabung untuk Hubungi"}
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p className="text-center w-full col-span-3 text-gray-500">
            Tidak ada penjahit yang cocok dengan pencarian atau kategori ini.
          </p>
        )}
      </div>

      {isModalOpen && selectedPenjahit && (
        <InputPekerjaan penjahit={selectedPenjahit} onClose={closeModal} />
      )}
    </div>
  );
};

export default CardListPenjahit;
