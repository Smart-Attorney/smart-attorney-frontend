interface SortOptionProps {
	id: string;
	name: string;
	clicked: boolean;
	onClick: (event: React.MouseEvent<HTMLParagraphElement>) => void;
}

function SortOption(props: SortOptionProps) {
	const sortOptionStyle = {
		color: props.clicked ? "black" : "white",
		backgroundColor: props.clicked ? "white" : "transparent",
	};

	return (
		<div className="px-2 py-1 rounded-lg min-w-max" style={sortOptionStyle}>
			<p id={props.id} className="cursor-pointer" onClick={props.onClick}>
				{props.name}
			</p>
		</div>
	);
}

export default SortOption;
