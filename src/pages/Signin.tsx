import PageBody from "../layouts/PageBody";
import LogoSmartAttorney from "../assets/Smart-Attorney/Final Typeface White Ver 1.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
		<PageBody>
			<div className="flex flex-col items-center gap-4 pt-[5%]">
				<img className="h-32 w-fit" src={LogoSmartAttorney} />
				<form className=" h-[545px] w-[545px] rounded-3xl p-20" style={formBackgroundStyle}>
					<div className="flex flex-col items-center justify-between w-full h-full">
						<h1 className="text-4xl font-normal text-white ">Welcome back!</h1>

						<div className="flex flex-col w-full">
							<label className="text-white" htmlFor="email">
								Company Email
							</label>
							<input id="email" name="email" value={credentials.email} onChange={handleInputChange} />
						</div>

						<div className="flex flex-col w-full">
							<label className="text-white" htmlFor="password">
								Password
							</label>
							<input id="password" name="password" value={credentials.password} onChange={handleInputChange} />
						</div>

						<button className="w-full bg-white rounded-lg " type="button" onClick={handleSignIn}>
							<span>Sign In</span>
						</button>

						<p className="text-white">or</p>

						<button
							className="w-full text-white border-2 border-white"
							type="button"
							onClick={handleRedirectToRegister}
						>
							<span>Get Started</span>
						</button>
					</div>
				</form>
			</div>
		</PageBody>
	);
}

export default Signin;
