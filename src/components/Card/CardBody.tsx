import React from "react";

interface CardBodyProps {
	id?: string;
	children: React.ReactNode;
}

function CardBody({ id, children }: CardBodyProps) {
	return (
		<div id={id} className="relative flex flex-col justify-between w-full h-full bottom-7">
			{children}
		</div>
	);
}

export default CardBody;
