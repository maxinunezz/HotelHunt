

const SearchBar = () => {
    return (
        <div className="bg-slate-500 p-2">
            <input
                className="rounded-md"
                type="text"
                placeholder="Buscar driver..."
            />
            <button className="p-2" type="submit">🔍</button>
        </div>
    )
}

export default SearchBar;