interface Case {
	id: number;
	name: string;
	status: string;
}

const cases: Case[] = [
	{ id: 1, name: "Hardship Letter.doc", status: "Submitted" },
	{ id: 2, name: "Evidence.pdf", status: "Submitted" },
	{ id: 3, name: "Written Statement", status: "Reviewed" },
];

export default cases;
