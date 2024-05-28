import { SearchIcon } from "../../assets/smart-attorney-figma/global";
import { CaseFileObj, DashboardFolderCardObj } from "../../utils/types";

interface SearchBarProps {
	cards?: DashboardFolderCardObj[] | CaseFileObj[] | null;
}

function SearchBar({ cards }: SearchBarProps) {
	const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value: inputQuery } = event.target;
		filterCardsByQuery(inputQuery);
	};

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

	return (
		<div className="flex flex-row justify-between w-full gap-8 pb-8 pl-20 pr-28">
			<div className="flex flex-row w-full rounded-lg ">
				<span className="flex items-center h-full pl-3 pr-2 bg-white rounded-l-lg">
					<img className="w-6" src={SearchIcon} />
				</span>
				<input
					className="w-full pr-3 text-xl font-medium placeholder-black bg-white rounded-r-lg h-11 focus:outline-none"
					type="search"
					placeholder="Search..."
					onChange={handleQueryChange}
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
