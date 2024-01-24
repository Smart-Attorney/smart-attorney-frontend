import { SearchIcon } from "../assets/smart-attorney-figma/global";

function SearchBar() {
	return (
		<div className="flex flex-row justify-between w-full gap-8">
			<div className="flex flex-row w-full rounded-lg ">
				<span className="flex items-center h-full pl-3 pr-2 bg-white rounded-l-lg">
					<img className="w-6" src={SearchIcon} />
				</span>
				<input
					className="w-full pr-3 text-lg font-medium placeholder-black bg-white rounded-r-lg h-11 focus:outline-none"
					type="search"
					placeholder="Search..."
				/>
			</div>
			<button
				className="bg-transparent h-11 rounded-lg min-w-[100px] flex justify-center items-center border-[3px]"
				type="button"
			>
				<span className="text-xl font-normal text-white">Search</span>
			</button>
		</div>
	);
}

export default SearchBar;
