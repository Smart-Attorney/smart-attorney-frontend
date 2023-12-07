interface Case {
	id: number;
	name: string;
	deadline: string;
	status: string;
}

const cases: Case[] = [
	{ id: 1, name: "Name of Case 1", deadline: "10/22/23", status: "#53EF0A" },
	{ id: 2, name: "Name of Case 2", deadline: "11/22/23", status: "#FB3E3E" },
	{ id: 3, name: "Name of Case 3", deadline: "12/24/23", status: "#53EF0A" },
	{ id: 4, name: "Name of Case 4", deadline: "1/12/24", status: "#FB3E3E" },
];

export default cases;
