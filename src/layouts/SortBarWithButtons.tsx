interface SortBarWithButtonsProps {
	children: React.ReactNode;
}

function SortBarWithButtons({ children }: SortBarWithButtonsProps) {
	return <div className="flex flex-row justify-between w-full pl-[88px] pr-32 pb-8">{children}</div>;
}

export default SortBarWithButtons;
