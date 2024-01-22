import { SearchIcon } from "../assets/smart-attorney-figma";

function SearchBar() {
	return (
		<div className="flex flex-row justify-between w-full gap-8">
			<div className="flex flex-row w-full rounded-lg ">
				<span className="flex items-center h-full pl-3 pr-2 bg-white rounded-l-lg">
					<img className="w-6" src={SearchIcon} />
				</span>
				<input
					className="bg-white pb-[2px] pr-3 h-11 rounded-r-lg placeholder-black w-full focus:outline-none font-semibold text-lg"
					type="search"
					placeholder="Search..."
				/>
			</div>
			<button
				className="bg-transparent h-11 rounded-lg min-w-[100px] flex justify-center items-center text-white border-[3px] text-xl font-normal"
				type="button"
			>
				<span>Search</span>
			</button>
		</div>
	);
}

export default SearchBar;
