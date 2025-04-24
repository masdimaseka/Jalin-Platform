import { useState } from "react";

const SearchBar = ({ onSearchChange, placeholder }) => {
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
        placeholder={placeholder || "Search..."}
        className="input input-bordered w-full max-w-xs"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
