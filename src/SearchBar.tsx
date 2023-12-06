function SearchBar() {
	return (
		<div className="flex flex-row gap-8 w-full justify-between">
			<input
				className="bg-[#D9D9D9] pl-6 pr-3 h-11 rounded-full placeholder-black w-full"
				type="search"
				placeholder="Search..."
			/>
			<button className="bg-[#D9D9D9] h-11 rounded-md w-24" type="button">
				Search
			</button>
		</div>
	);
}

export default SearchBar;
