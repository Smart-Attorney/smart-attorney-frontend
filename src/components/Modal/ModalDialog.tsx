interface ModalDialogProps {
	children: React.ReactNode;
	closeModal: (event?: React.MouseEvent<HTMLDivElement>) => void;
}

function ModalDialog({ children, closeModal }: ModalDialogProps) {
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
			onClick={(event) => handleClickModalBackdrop(event)}
		>
			<div
				id="modal-container"
				className="border border-[#9C9DA4] rounded-[32px] py-14 h-fit w-[768px] bg-gradient-custom flex items-center justify-center"
			>
				{children}
			</div>
		</div>
	);
}

export default ModalDialog;
