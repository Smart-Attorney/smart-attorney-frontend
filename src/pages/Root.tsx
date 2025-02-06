import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*
 * Placeholder page that redirects user from root route to home route.
 */
function Root() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/home");
	}, []);

	return <></>;
}

export default Root;
