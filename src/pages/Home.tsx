import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Placeholder page that redirects user from root route to dashboard.
 */
function Home() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("dashboard");
	}, []);

	return <></>;
}

export default Home;