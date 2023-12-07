import SearchBar from "./SearchBar";
import SortBar from "./SortBar";
import newCaseSortOptions from "./NewCaseSortOptions";

function NewCase() {
	return (
		<div className="flex flex-col items-center gap-5 w-[80%] mx-auto">
			<h1 className="pt-10 pb-5 text-4xl font-bold">New Case</h1>
			<SearchBar />
			<SortBar options={newCaseSortOptions} />
			<p>hello</p>
		</div>
	);
}

export default NewCase;
