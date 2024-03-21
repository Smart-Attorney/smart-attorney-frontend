interface CardImageProps {
	id?: string;
	imgSrc: string;
}

function CardImage({ id, imgSrc }: CardImageProps) {
	return (
		<div id={id} className="w-60 h-[100px] rounded-lg">
			<img id={id} src={imgSrc} />
		</div>
	);
}

export default CardImage;
