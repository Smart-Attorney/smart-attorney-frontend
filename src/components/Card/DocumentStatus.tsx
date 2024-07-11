import { DOCUMENT_STATUS } from "../../utils/constants/document-status";
import { DocumentStatus as DocStatus } from "../../types/api";

interface FileStatusProps {
	id?: string;
	text: DocStatus;
}

function DocumentStatus({ id, text }: FileStatusProps) {
	let statusColor: string;
	switch (text) {
		case DOCUMENT_STATUS.IN_REVIEW:
			statusColor = "bg-[#ff9c34]"; // orange
			break;
		case DOCUMENT_STATUS.IN_PROGRESS:
			statusColor = "bg-[#ffd434]"; // yellow
			break;
		case DOCUMENT_STATUS.SUBMITTED:
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
