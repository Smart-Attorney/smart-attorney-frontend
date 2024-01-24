import { useLocation, useNavigate } from "react-router-dom";

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
		<button className={`cursor-pointer ${isCurrentPath(path) ? "active" : ""}`} onClick={() => navigate(path)}>
			<div
				className={`flex items-center justify-center w-12 h-12 mt-4 mb-4 ${
					isCurrentPath(path) ? "active-circle" : ""
				}`}
			>
				<img className="w-8 h-8 cursor-pointer" src={imageSrc} alt={label} />
			</div>
		</button>
	);
}

export default RenderButton;
