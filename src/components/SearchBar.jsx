const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="search"
        placeholder="Buscar por nombre o categoría..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    </div>
  )
}

export default SearchBar
