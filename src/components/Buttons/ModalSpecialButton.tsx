import { ButtonProps } from "../../utils/types";

function ModalSpecialButton(props: ButtonProps) {
	const { name, type, className, onClick, isDisabled, style } = props;

	return (
		<button
			name={name}
			type={type}
			disabled={isDisabled}
			style={style}
			className={`${className} modal-special-btn-border border-[5px] border-transparent w-full flex items-center justify-center rounded-xl`}
			onClick={onClick}
		>
			<span className="text-xl font-semibold text-white">{name}</span>
		</button>
	);
}

export default ModalSpecialButton;
