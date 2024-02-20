interface SelectFieldProps {
	id: string;
	name: string;
	options: string[];
	value: string;
	onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
}

function SelectField({ id, name, options, value, onChange }: SelectFieldProps) {
	const optionsElements = options.map((option, index) => {
		return (
			<option className="text-base" key={index} value={option}>
				{option}
			</option>
		);
	});

	return (
		<div className="flex flex-col gap-1 w-60">
			<label htmlFor={name} className="text-white">
				{name}
			</label>
			<select
				className="h-8 px-2 overflow-hidden text-base bg-white rounded whitespace-nowrap text-ellipsis"
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				required
				disabled
			>
				<option value="" className="text-base">
					-- Select --
				</option>
				{optionsElements}
			</select>
		</div>
	);
}

export default SelectField;
