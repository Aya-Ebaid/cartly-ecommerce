import "./Filter.css";

const Filter = ({ categories, selectedCategory, onChange }) => {
  return (
    <select
      className="filter-select"
      value={selectedCategory}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};

export default Filter;