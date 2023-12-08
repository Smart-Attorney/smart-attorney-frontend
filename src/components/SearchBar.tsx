function SearchBar() {
	return (
		<div className="flex flex-row justify-between w-full gap-8">
			<input
				className="bg-[#D9D9D9] pb-[2px] pl-6 pr-3 h-11 rounded-full placeholder-black w-full"
				type="search"
				placeholder="Search..."
			/>
			<button
				className="bg-[#D9D9D9] pb-[2px] h-11 rounded-md min-w-[100px] flex justify-center items-center"
				type="button"
			>
				<span>Search</span>
			</button>
		</div>
	);
}

export default SearchBar;
