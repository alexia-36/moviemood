export default function Search({ searchInput, setSearchInput }) {
  return (
    <div className="w-full bg-light-100/5 px-4 py-3 rounded-lg mt-10 max-w-3xl mx-auto;">
      <img src="search.svg" alt="search" />
      <input
        type="text"
        placeholder="Search through movies"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
    </div>
  );
}
