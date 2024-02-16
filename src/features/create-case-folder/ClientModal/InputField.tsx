interface InputFieldProps {
	name: string;
	type: string;
	onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

function InputField({ name, type, onChange }: InputFieldProps) {
	return (
		<div className="flex flex-col gap-1 w-60">
			<label htmlFor={name} className="text-white">
				{name}
			</label>
			<input
				id={name}
				name={name}
				type={type}
				className="h-8 px-2 overflow-hidden text-base bg-white rounded text-ellipsis whitespace-nowrap"
				onChange={onChange}
			/>
		</div>
	);
}

export default InputField;
