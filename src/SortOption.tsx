interface SortOptionProps {
	id: string;
	name: string;
	clicked: boolean;
	onClick: (event: React.MouseEvent<HTMLParagraphElement>) => void;
}

function SortOption(props: SortOptionProps) {
	const sortOptionStyle = {
		color: props.clicked ? "white" : "black",
		backgroundColor: props.clicked ? "black" : "white",
	};

	return (
		<p
			id={props.id}
			className="px-2 py-1 border-[0px] border-black rounded-lg cursor-pointer cursor text-b"
			style={sortOptionStyle}
			onClick={props.onClick}
		>
			{props.name}
		</p>
	);
}

export default SortOption;
