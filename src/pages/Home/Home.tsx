import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("dashboard");
	}, []);

	return <></>;
}

export default Home;
