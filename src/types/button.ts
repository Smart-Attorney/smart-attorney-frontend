export type ButtonProps = {
	img: string;
	title: string;
	name: string;
	type: "button" | "submit" | "reset";
	className: string;
	style: React.CSSProperties;
	isDisabled: boolean;
	onClick: () => void;
};
