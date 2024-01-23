import { Link } from "react-router-dom";

interface SidebarItemsProps {
	linkTo?: string;
	image?: string;
}

function SidebarItem(props: SidebarItemsProps) {
	const { linkTo, image } = props;

	return (
		<Link className="flex flex-col items-center w-full" to={linkTo ? linkTo : ""}>
			<img className="w-5 m-4" src={image ? image : ""} />
		</Link>
	);
}

export default SidebarItem;
