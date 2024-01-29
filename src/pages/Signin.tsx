import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SmartAttorneyLogo } from "../assets/smart-attorney-figma/global";
import StyledBackground from "../layouts/StyledBackground";
/* temporary workaround */
import { mockUser } from "../utils/mock-user";

function Signin() {
	const navigate = useNavigate();

	const [credentials, setCredentials] = useState({ email: "", password: "" });

	const handleInputChange = (event: { target: { value: any; name: any } }) => {
		const { name, value } = event.target;
		setCredentials((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const handleSignIn = () => {
		/* temporary workaround */
		const passwordMatch = credentials.password === mockUser.password;
		const emailMatch = credentials.email === mockUser.email;
		if (!passwordMatch) {
			alert("Incorrect login information.");
			return;
		}
		if (!emailMatch) {
			alert("Incorrect login information.");
			return;
		}

		navigate("/dashboard");
	};

	const handleRedirectToRegister = () => navigate("/register");

	/* TODO
     Figma wireframe does not give accurate linear gradient.
     Fix the style to match the wireframe background gradient.
  */
	const formBackgroundStyle = {
		background: "linear-gradient(180deg, #5E35FF 0%, rgba(217, 217, 217, 0) 100%)",
	};

	return (
		<StyledBackground>
			<div className="flex flex-col items-center py-20">
				<img className="h-32" src={SmartAttorneyLogo} />
			</div>

			<div className="flex flex-col items-center">
				<form className=" h-[545px] w-[545px] rounded-3xl px-20 py-14" style={formBackgroundStyle}>
					<div className="flex flex-col items-center w-full h-full">
						<div className="mb-16">
							<h1 className="text-4xl font-normal text-white ">Welcome back!</h1>
						</div>

						<div className="flex flex-col w-full mb-6">
							<label className="text-white" htmlFor="email">
								Company Email
							</label>
							<input
								className="h-8 px-3"
								id="email"
								type="email"
								name="email"
								value={credentials.email}
								onChange={handleInputChange}
							/>
						</div>

						<div className="flex flex-col w-full mb-10">
							<label className="text-white" htmlFor="password">
								Password
							</label>
							<input
								className="h-8 px-3"
								id="password"
								type="password"
								name="password"
								value={credentials.password}
								onChange={handleInputChange}
							/>
						</div>

						<button className="w-full h-12 mb-4 bg-white rounded-lg" type="button" onClick={handleSignIn}>
							<span className="text-xl">Sign In</span>
						</button>

						<p className="mb-4 text-white">or</p>

						<button
							className="w-full border-2 border-white rounded-lg h-14"
							type="button"
							onClick={handleRedirectToRegister}
						>
							<span className="text-xl text-white">Get Started</span>
						</button>
					</div>
				</form>
			</div>
		</StyledBackground>
	);
}

export default Signin;
