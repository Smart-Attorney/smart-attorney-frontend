interface InputFieldProps {
	name: string;
	type: string;
}

function InputField({ name, type }: InputFieldProps) {
	return (
		<div className="flex flex-col gap-1 w-60">
			<label htmlFor={name} className="text-white">
				{name}
			</label>
			<input id={name} type={type} className="h-8 px-2 text-base rounded" />
		</div>
	);
}

export default InputField;
