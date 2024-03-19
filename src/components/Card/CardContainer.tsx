interface CardContainerProps {
	children?: React.ReactNode;
	id?: string;
	onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void;
	className?: string;
}

function CardContainer({ children, id, onClick, className }: CardContainerProps) {
	return (
		<div className={`${className} w-[272px] h-[256px] p-4 bg-white rounded-2xl`} id={id} onClick={onClick}>
			{children}
		</div>
	);
}

export default CardContainer;
