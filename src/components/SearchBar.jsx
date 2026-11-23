// Controlled search form: the inputs read from and write to the parent's state.
export default function SearchBar({ query, onQueryChange, sort, onSortChange, onSubmit }) {
  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <div className="field grow">
        <label htmlFor="search">Destination or hotel name</label>
        <input
          id="search"
          type="text"
          placeholder="Try Nakuru or Coral Bay"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="sort">Sort by</label>
        <select id="sort" value={sort} onChange={(e) => onSortChange(e.target.value)}>
          <option value="recommended">Recommended</option>
          <option value="price">Price: low to high</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
}
