interface InputFieldProps {
	id: string;
	name: string;
	type: string;
	value: string;
	onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

function InputField({ id, name, type, value, onChange }: InputFieldProps) {
	return (
		<div className="flex flex-col gap-1 w-60">
			<label htmlFor={name} className="text-white">
				{name}
			</label>
			<input
				className="h-8 px-2 overflow-hidden text-base bg-white rounded text-ellipsis whitespace-nowrap"
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				required
			/>
		</div>
	);
}

export default InputField;
