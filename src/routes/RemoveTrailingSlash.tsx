/*
 * Source for this function:
 * https://stackoverflow.com/questions/41948228/how-to-remove-trailing-slash-in-react-router-urls
 */

import { Navigate, useLocation } from "react-router-dom";

function RemoveTrailingSlash() {
	const location = useLocation();

	// If the last character of the url is '/'
	if (location.pathname.match("/.*/$")) {
		return (
			<Navigate
				replace
				to={{
					pathname: location.pathname.replace(/\/+$/, ""),
					search: location.search,
				}}
			/>
		);
	} else return null;
}

export default RemoveTrailingSlash;
