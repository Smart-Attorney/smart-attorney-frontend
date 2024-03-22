function KebabMenuContainer({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative left-[232px] bottom-1 max-w-fit z-10 rounded-full hover:bg-slate-300">{children}</div>
	);
}

export default KebabMenuContainer;
