interface CardHeaderContainerProps {
	id?: string;
	children: React.ReactNode;
}

function CardHeaderContainer({ id, children }: CardHeaderContainerProps) {
	return (
		<div id={id} className="flex flex-col w-[230px] h-[72px] justify-between">
			{children}
		</div>
	);
}

export default CardHeaderContainer;
