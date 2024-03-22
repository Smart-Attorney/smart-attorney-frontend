interface CardNameProps {
	id?: string;
	name: string;
}

function CardName({ id, name }: CardNameProps) {
	return (
		<p id={id} className="text-sm cursor-pointer line-clamp-1 w-fit hover:text-blue-500">
			{name}
		</p>
	);
}

export default CardName;
