import {
  useCategories,
  usePenjahit,
} from "../../queries/penjahit/penjahitQuery";
import { useState } from "react";
import { useAuthUser } from "../../queries/auth/authQuery";
import SearchBar from "../SearchBar";
import { Icon } from "@iconify/react/dist/iconify.js";
import CardPenjahit from "./CardPenjahit";

const ListPenjahit = () => {
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
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
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
      ? Array.isArray(p.kategori)
        ? p.kategori.some((k) => k._id === selectedCategory)
        : p.kategori?._id === selectedCategory
      : true;

    const matchesSearch = p.user?.name?.toLowerCase().includes(searchQuery);
    const isNotCurrentUser = authUser ? p.user?._id !== authUser._id : true;

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
            .map((p) => (
              <CardPenjahit key={p._id} penjahit={p} authUser={authUser} />
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

export default ListPenjahit;
