import UploadLogo from "../../../../assets/smart-attorney-figma/upload-white-icon.png";

function Header() {
	return (
		<div className="flex flex-col items-center gap-2">
			<div className="flex flex-row items-center gap-2">
				<span className="w-5 h-5">
					<img src={UploadLogo} />
				</span>
				<h1 className="text-xl font-semibold text-white">Upload Documentation</h1>
			</div>
			<p className="text-sm text-white">You have the option to translate files before upload.</p>
		</div>
	);
}

export default Header;
