interface Options {
	clicked: boolean;
	name: string;
}

const newCaseSortOptions: Options[] = [
	{ clicked: false, name: "Name" },
	{ clicked: false, name: "Date Created" },
	{ clicked: false, name: "Last Opened" },
	{ clicked: false, name: "Status" },
];

export default newCaseSortOptions;
