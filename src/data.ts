interface Case {
	id: number;
	name: string;
	deadline: string;
}

const cases: Case[] = [
	{ id: 1, name: "Case 1", deadline: "Today" },
	{ id: 2, name: "Case 2", deadline: "Tomorrow" },
	{ id: 3, name: "Case 3", deadline: "Yesterday" },
];

export default cases;
