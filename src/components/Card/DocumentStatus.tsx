import { DOC_STATUS } from "../../utils/constants/document-status";
import { DocumentStatus as DocStatus } from "../../utils/types";

interface FileStatusProps {
	id?: string;
	text: DocStatus;
}

function DocumentStatus({ id, text }: FileStatusProps) {
	let statusColor: string;
	switch (text) {
		case DOC_STATUS.inReview:
			statusColor = "bg-[#ff9c34]"; // orange
			break;
		case DOC_STATUS.inProgress:
			statusColor = "bg-[#ffd434]"; // yellow
			break;
		case DOC_STATUS.submitted:
			statusColor = "bg-[#60bc6c]"; // green
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
