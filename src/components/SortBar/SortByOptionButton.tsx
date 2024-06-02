interface SortByOptionButtonProps {
	id: string;
	name: string;
	clicked: boolean;
	sortByOption: (event: React.MouseEvent<HTMLParagraphElement>) => void;
}

function SortByOptionButton({ id, name, clicked, sortByOption }: SortByOptionButtonProps) {
	return (
		<div
			className="px-2 py-1 rounded-lg min-w-max"
			style={{
				color: clicked ? "black" : "white",
				backgroundColor: clicked ? "white" : "transparent",
			}}
		>
			<p id={id} className="cursor-pointer" onClick={sortByOption}>
				{name}
			</p>
		</div>
	);
}

export default SortByOptionButton;
