interface CardContainerProps {
	children?: React.ReactNode;
	id?: string;
	navLabel?: string;
	onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void;
	status?: boolean;
	className?: string;
}

function CardContainer({
	children,
	id,
	navLabel,
	onClick,
	status,
	className,
}: CardContainerProps) {
	let borderStatusIndicator: string;
	switch (status) {
		case true:
			borderStatusIndicator = "ring-4 ring-inset ring-green-500";
			break;
		case false:
			borderStatusIndicator = "ring-4 ring-inset ring-gray-500";
			break;
		default:
			borderStatusIndicator = "";
			break;
	}

	return (
		<div
			className={`${className} ${borderStatusIndicator} w-[272px] min-h-[256px] p-4 bg-white rounded-2xl`}
			id={id}
			aria-label={navLabel}
			onClick={onClick}
		>
			{children}
		</div>
	);
}

export default CardContainer;
