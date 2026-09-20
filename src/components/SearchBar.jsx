import "./SearchBar.css";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search for a product..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;