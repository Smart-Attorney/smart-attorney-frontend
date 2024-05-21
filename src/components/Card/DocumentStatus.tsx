interface FileStatusProps {
	id?: string;
	text: string;
}

function DocumentStatus({ id, text }: FileStatusProps) {
	let statusColor: string;
	switch (text) {
		case "In Review":
			// orange
			statusColor = "bg-[#ff9c34]";
			break;
		case "In Progress":
			// yellow
			statusColor = "bg-[#ffd434]";
			break;
		case "Submitted":
			// green
			statusColor = "bg-[#60bc6c]";
			break;
		default:
			statusColor = "";
			break;
	}

	return (
		<div id={id} className={`${statusColor} min-w-max rounded-full px-2.5 py-1`}>
			<p className="text-xs">{text}</p>
		</div>
	);
}

export default DocumentStatus;
