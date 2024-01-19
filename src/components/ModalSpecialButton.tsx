interface ModalSpBtnProps {
	name: string;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
	style?: React.CSSProperties;
}

function ModalSpecialButton(props: ModalSpBtnProps) {
	const { name, className, onClick, disabled, style } = props;

	return (
		<div className="cursor-pointer modal-special-btn-border w-full h-[72px] p-[5px] rounded-xl">
			<button
				type="button"
				className={`${className} relative h-full w-full flex items-center justify-center rounded-lg bg-[#0a0a1e]`}
				onClick={onClick}
				disabled={disabled}
				style={style}
			>
				<span className="text-xl font-semibold text-white">{name}</span>
			</button>
		</div>
	);
}

export default ModalSpecialButton;
