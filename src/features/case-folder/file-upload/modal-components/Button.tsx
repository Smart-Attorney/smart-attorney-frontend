interface ModalButtonProps {
	name: string;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
	style?: React.CSSProperties;
}

function Button(props: ModalButtonProps) {
	const { onClick, name, className, disabled, style } = props;
	return (
		<button
			type="button"
			className={`${className} w-[296px] h-[72px] rounded-xl py-2`}
			onClick={onClick}
			disabled={disabled}
			style={style}
		>
			<span className="text-xl font-semibold text-white">{name}</span>
		</button>
	);
}

export default Button;
