import { ButtonProps } from "../../types/api";

function ModalSpecialButton({ title, name, type, className, style, isDisabled, onClick }: Partial<ButtonProps>) {
	return (
		<button
			title={title}
			name={name}
			type={type}
			className={`${className} modal-special-btn-border border-[5px] border-transparent w-full flex items-center justify-center rounded-xl`}
			style={style}
			disabled={isDisabled}
			onClick={onClick}
		>
			<span className="text-xl font-semibold text-white">{name}</span>
		</button>
	);
}

export default ModalSpecialButton;
