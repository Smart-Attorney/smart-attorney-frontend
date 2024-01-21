import { ButtonProps } from "../../utils/types";

function ModalSpecialButton(props: ButtonProps) {
	const { name, className, onClick, disabled, style } = props;

	return (
		<button
			type="button"
			className={`${className} modal-special-btn-border border-[5px] border-transparent h-[72px] w-full flex items-center justify-center rounded-xl`}
			onClick={onClick}
			disabled={disabled}
			style={style}
		>
			<span className="text-xl font-semibold text-white">{name}</span>
		</button>
	);
}

export default ModalSpecialButton;
