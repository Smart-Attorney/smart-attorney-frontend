interface CardBodyProps {
	id?: string;
	navLabel?: string;
	children: React.ReactNode;
}

function CardBody({ id, navLabel, children }: CardBodyProps) {
	return (
		<div id={id} aria-label={navLabel} className="relative flex flex-col justify-between w-full h-full bottom-7">
			{children}
		</div>
	);
}

export default CardBody;
