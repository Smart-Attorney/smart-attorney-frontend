interface CardNameProps {
	id?: string;
	navLabel?: string;
	viewFile?: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
	name: string;
}

function CardName({ id, navLabel, viewFile, name }: CardNameProps) {
	return (
		<p
			id={id}
			aria-label={navLabel}
			className="mb-4 text-sm cursor-pointer line-clamp-1 w-fit hover:text-blue-500"
			onClick={viewFile}
		>
			{name}
		</p>
	);
}

export default CardName;
