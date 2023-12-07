interface Case {
	id: number;
	name: string;
	status: string;
}

const cases: Case[] = [
	{ id: 1, name: "Hardship Letter.doc", status: "Submitted" },
	{ id: 2, name: "Evidence.pdf", status: "Submitted" },
	{ id: 3, name: "Written Statement", status: "Reviewed" },
	{ id: 4, name: "Interview Recording.mp3", status: "Reviewed" },
	{ id: 5, name: "Interview Recording.doc", status: "Submitted" },
	{ id: 6, name: "Written Note.doc", status: "Reviewed" },
];

export default cases;
