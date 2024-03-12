interface CardContainerProps {
	children?: React.ReactNode;
	key?: string;
	id?: string;
	onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void;
	className?: string;
}

function CardContainer({ children, key, id, onClick, className }: CardContainerProps) {
	return (
		<div className={`${className} w-[272px] h-[256px] p-4 bg-white rounded-2xl`} key={key} id={id} onClick={onClick}>
			{children}
		</div>
	);
}

export default CardContainer;
