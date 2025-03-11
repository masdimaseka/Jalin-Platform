import { useState } from "react";

const SearchBar = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <div className="flex mb-4">
      <input
        type="text"
        placeholder="Cari penjahit..."
        className="input input-bordered w-full max-w-xs"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
