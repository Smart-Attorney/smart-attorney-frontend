interface Options {
	clicked: boolean;
	name: string;
}

const dashboardOptions: Options[] = [
	{ clicked: false, name: "Name" },
	{ clicked: false, name: "Date Created" },
	{ clicked: false, name: "Last Opened" },
	{ clicked: false, name: "Open Cases" },
	{ clicked: false, name: "Deadline" },
	{ clicked: false, name: "Labels" },
];

export default dashboardOptions;
