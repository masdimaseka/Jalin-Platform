import {
  useCategories,
  usePenjahit,
} from "../../queries/penjahit/penjahitQuery";
import { useState } from "react";
import { useAuthUser } from "../../queries/auth/authQuery";
import SearchBar from "../SearchBar";
import { Icon } from "@iconify/react/dist/iconify.js";
import CardPenjahit from "./CardPenjahit";
import { Pagination } from "../Pagination";

const ITEMS_PER_PAGE = 12;

const ListPenjahit = () => {
  const { data: penjahit, isLoading } = usePenjahit();
  const { data: category } = useCategories();
  const { data: authUser } = useAuthUser();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
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

  const sortedPenjahit = filteredPenjahit.sort((a, b) => {
    return (b.openToWork === true) - (a.openToWork === true);
  });

  const totalPages = Math.ceil(sortedPenjahit.length / ITEMS_PER_PAGE);

  const currentData = sortedPenjahit.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
        {currentData.length > 0 ? (
          currentData
            .filter((p) => p.isVerified === "diterima")
            .map((p) => (
              <CardPenjahit key={p._id} penjahit={p} authUser={authUser} />
            ))
        ) : (
          <p className="text-center w-full col-span-3 text-gray-500">
            Tidak ada penjahit yang cocok dengan pencarian atau kategori ini.
          </p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ListPenjahit;
