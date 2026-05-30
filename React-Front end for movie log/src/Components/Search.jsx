function Search({ searchQuery, setSearchQuery, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="d-flex justify-content-center my-4">
            <div className="input-group" style={{ maxWidth: '520px', width: '100%' }}>
                <input
                    type="text"
                    className="form-control form-control-lg bg-dark text-white border-secondary"
                    placeholder="Search for movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ borderRadius: '8px 0 0 8px' }}
                />
                <button
                    className="btn btn-danger px-4 fw-semibold"
                    type="submit"
                    style={{ borderRadius: '0 8px 8px 0' }}
                >
                    Search
                </button>
            </div>
        </form>
    );
}
export default Search;