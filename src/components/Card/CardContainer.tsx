interface CardContainerProps {
	children?: React.ReactNode;
	id?: string;
	navLabel?: string;
	onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void;
	className?: string;
}

function CardContainer({ children, id, navLabel, onClick, className }: CardContainerProps) {
	return (
		<div
			className={`${className} w-[272px] h-[256px] p-4 bg-white rounded-2xl`}
			id={id}
			aria-label={navLabel}
			onClick={onClick}
		>
			{children}
		</div>
	);
}

export default CardContainer;
