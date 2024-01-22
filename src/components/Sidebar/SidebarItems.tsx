import { SmartAttorneyIcon } from "../../assets/smart-attorney-figma";

function SidebarItems() {
	return (
		<div className="flex flex-col items-center w-full h-full gap-3">
			<button
				className="cursor-pointer"
				onClick={() => {
					/* Handle button click */
				}}
			>
				<img className="cursor-pointer w-14 h-14" src={SmartAttorneyIcon} />
			</button>
		</div>
	);
}

export default SidebarItems;
