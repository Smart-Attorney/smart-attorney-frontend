import { SearchIcon } from "../../assets/smart-attorney-figma/global";
import { DocumentObj, DashboardCaseCardObj } from "../../utils/types";

interface SearchBarProps {
	cards?: DashboardCaseCardObj[] | DocumentObj[] | null;
}

function SearchBar({ cards }: SearchBarProps) {
	const filterCardsByQuery = (query: string) => {
		if (!cards) return;

		if (query.trim().length === 0) {
			cards.forEach((card) => {
				document.getElementById(card.id)?.classList.remove("hide");
			});
			return;
		}

		for (let i = 0, n = cards.length; i < n; i++) {
			if (cards[i].name.toLowerCase().includes(query.toLowerCase().trim())) {
				document.getElementById(cards[i].id)?.classList.remove("hide");
			} else {
				document.getElementById(cards[i].id)?.classList.add("hide");
			}
		}
	};

	const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value: inputQuery } = event.target;
		filterCardsByQuery(inputQuery);
	};

	const handleClearSearchInput = () => {
		const emptyString = "";
		const searchInput = document.getElementById("search-input") as HTMLInputElement;
		searchInput.value = emptyString;
		filterCardsByQuery(emptyString);
	};

	return (
		<div className="flex flex-row justify-between w-full gap-8 pb-8 pl-20 pr-28">
			<div className="flex flex-row w-full rounded-lg ">
				<span className="flex items-center h-full pl-3 pr-2 bg-white rounded-l-lg">
					<img className="w-6" src={SearchIcon} />
				</span>
				<input
					id="search-input"
					className="w-full pr-3 text-xl font-medium placeholder-[#686868] bg-white rounded-r-lg h-11 focus:outline-none search-cancel-button"
					type="search"
					placeholder="Search Cases"
					onChange={handleQueryChange}
				/>
			</div>

			<button
				className="bg-transparent h-11 rounded-lg min-w-[100px] flex justify-center items-center border-[3px]"
				type="button"
				onClick={handleClearSearchInput}
			>
				<span className="text-xl font-normal text-white">Cancel</span>
			</button>
		</div>
	);
}

export default SearchBar;
