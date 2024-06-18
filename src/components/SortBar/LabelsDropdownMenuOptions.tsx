interface LabelsDropdownMenuProps {
	id: string;
	name: string;
	clicked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabelsDropdownMenuOptions({ id, name, clicked, onChange }: LabelsDropdownMenuProps) {
	return (
		<div key={id} className="flex flex-row gap-x-2 hover:bg-[#dddddd] py-1 px-2.5">
			<input
				type="checkbox"
				id={id}
				name={name}
				checked={clicked}
				onChange={onChange}
				className="cursor-pointer"
			/>
			<label htmlFor={id} className="w-full overflow-x-hidden text-sm cursor-pointer overflow-ellipsis">
				{name}
			</label>
		</div>
	);
}

export default LabelsDropdownMenuOptions;
