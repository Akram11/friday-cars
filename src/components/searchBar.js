import "./style.css";

export default function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <div className="search-container">
            <input
                autoFocus
                className="input"
                placeholder="filter"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                }}
            />
        </div>
    );
}
