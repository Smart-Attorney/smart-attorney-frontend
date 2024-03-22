interface FileStatusProps {
	id?: string;
	text: string;
}

function FileStatus({ id, text }: FileStatusProps) {
	return (
		<div id={id} className="min-w-max bg-[#53EF0A80] rounded-full px-2.5 py-1">
			<p className="text-xs">{text}</p>
		</div>
	);
}

export default FileStatus;
