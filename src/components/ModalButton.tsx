interface ModalButtonProps {
	name: string;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
	style?: React.CSSProperties;
}

function ModalButton(props: ModalButtonProps) {
	const { name, className, onClick, disabled, style } = props;

	return (
		<button
			type="button"
			className={`${className} h-[72px] w-full rounded-xl py-2 border-[5px] border-solid border-[#3141e4] bg-[#2a2c84]`}
			onClick={onClick}
			disabled={disabled}
			style={style}
		>
			<span className="text-xl font-semibold text-white">{name}</span>
		</button>
	);
}

export default ModalButton;
