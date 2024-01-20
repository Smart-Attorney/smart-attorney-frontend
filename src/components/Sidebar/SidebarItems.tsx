import SmartAttorneyLogo from "../../assets/smart-attorney-figma/Favicon 1@4x 1@3x.png";

function SidebarItems() {
	return (
		<div className="flex flex-col items-center w-full h-full gap-3">
			<button
				className="cursor-pointer"
				onClick={() => {
					/* Handle button click */
				}}
			>
				<img className="cursor-pointer w-14 h-14" src={SmartAttorneyLogo} />
			</button>
		</div>
	);
}

export default SidebarItems;
