import { useLocation, useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";

interface ButtonProps {
	path: string;
	imageActive: string;
	imageInactive: string;
	label: string;
	// imageSrc: string;
}

function RenderButton({ path, imageActive, imageInactive, label }: ButtonProps) {
	const navigate = useNavigate();
	const location = useLocation();

	const isCurrentPath = (path: string): boolean => location.pathname.includes(path);

	return (
		<div
			className="flex items-center justify-center w-20 mt-4 mb-4 cursor-pointer h-14 group/tooltip"
			onClick={() => navigate(path)}
		>
			<button type="button">
				<img
					style={{ display: isCurrentPath(path) ? "block" : "none" }}
					className="w-full relative top-[14px]"
					src={imageActive}
					alt={label}
				/>

				<img
					style={{ display: isCurrentPath(path) ? "none" : "block" }}
					className="w-[50px]"
					src={imageInactive}
					alt={label}
				/>
			</button>

			<Tooltip name={path} />
		</div>
	);
}

export default RenderButton;

/* This code below is a step in the right direction but is currently sidelined for a temporary workaround. */
{
	/* <div
className={`group/tooltip flex items-center justify-center w-12 h-12 mt-4 mb-4 cursor-pointer ${
  isCurrentPath(path) ? "active-background" : ""
}`}
onClick={() => navigate(path)}
>
<button type="button">
  <img className="w-8 h-8 cursor-pointer" src={imageSrc} alt={label} />
</button>
<Tooltip name={path} />
</div> */
}
