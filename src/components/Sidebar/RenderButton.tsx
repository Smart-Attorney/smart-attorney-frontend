import { useLocation, useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";

interface ButtonProps {
	path: string;
	imageSrc: string;
	label: string;
}

function RenderButton({ path, imageSrc, label }: ButtonProps) {
	const navigate = useNavigate();
	const location = useLocation();

	const isCurrentPath = (path: string): boolean => location.pathname === path;

	return (
		<div
			className={`group/tooltip flex items-center justify-center w-12 h-12 mt-4 mb-4 cursor-pointer ${
				isCurrentPath(path) ? "active-circle" : ""
			}`}
			onClick={() => navigate(path)}
		>
			<button type="button">
				<img className="w-8 h-8 cursor-pointer" src={imageSrc} alt={label} />
			</button>
			<Tooltip name={path} />
		</div>
	);
}

export default RenderButton;
