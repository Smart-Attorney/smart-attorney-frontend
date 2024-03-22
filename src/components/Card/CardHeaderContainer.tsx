interface CardHeaderContainerProps {
	id?: string;
	navLabel?: string;
	children: React.ReactNode;
}

function CardHeaderContainer({ id, navLabel, children }: CardHeaderContainerProps) {
	return (
		<div id={id} aria-label={navLabel} className="flex flex-col w-[230px] h-[72px] justify-between">
			{children}
		</div>
	);
}

export default CardHeaderContainer;
