interface ModalDialogProps {
	children: React.ReactNode;
	className?: string;
	closeModal: (event?: React.MouseEvent<HTMLDivElement>) => void;
	enableBackdropClose: boolean;
}

function ModalDialog({ children, className, closeModal, enableBackdropClose }: ModalDialogProps) {
	const handleClickModalBackdrop = (event: React.MouseEvent<HTMLDivElement>): void => {
		const { id } = event.target as HTMLDivElement;
		if (id === "modal-backdrop") {
			closeModal();
		}
	};

	return (
		<div
			id="modal-backdrop"
			className="bg-[#00000040] h-screen w-[calc(100%-80px)] justify-center flex items-center top-0 absolute backdrop-blur-[2px]"
			onClick={
				enableBackdropClose
					? (event) => handleClickModalBackdrop(event)
					: () => {
							return;
						}
			}
		>
			<div
				id="modal-container"
				className={`${className} border border-[#9C9DA4] rounded-[32px] py-14 h-fit bg-gradient-custom flex flex-col items-center justify-center`}
			>
				{children}
			</div>
		</div>
	);
}

export default ModalDialog;
