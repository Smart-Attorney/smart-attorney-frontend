function SearchBar() {
	return (
		<div className="flex flex-row gap-5 items-center">
			<input
				className="bg-[#D9D9D9] pl-6 pr-3 py-1 rounded-full placeholder-black"
				type="search"
				placeholder="Search..."
			></input>
			<button className="bg-[#D9D9D9] py-1 px-3 rounded-md" type="button">
				Search
			</button>
		</div>
	);
}

export default SearchBar;
