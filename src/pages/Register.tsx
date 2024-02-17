import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SmartAttorneyLogo } from "../assets/smart-attorney-figma/global";
import InputField from "../features/register/InputField";
import TermsOfService from "../features/register/TermsOfService";
import { RegisterCredentialsDTO, registerNewUser } from "../features/register/api/register";
import StyledBackground from "../layouts/StyledBackground";

function Register() {
	const navigate = useNavigate();

	// keep these consistent with credentials object property names
	const INPUT = {
		FIRST_NAME: "firstName",
		LAST_NAME: "lastName",
		FIRM_NAME: "firmName",
		COMPANY_EMAIL: "companyEmail",
		PASSWORD: "password",
		CONFIRM_PASSWORD: "confirmPassword",
	};

	const [credentials, setCredentials] = useState<RegisterCredentialsDTO>({
		firstName: "",
		lastName: "",
		firmName: "",
		companyEmail: "",
		password: "",
	});

	const [confirmPassword, setConfirmPassword] = useState({ confirmPassword: "" });

	const handleRegistration = async () => {
		// temp: checks whether password and confirm-password match
		if (credentials.password !== confirmPassword.confirmPassword) {
			alert("Passwords do not match.");
			return;
		}

		try {
			const response = await registerNewUser(credentials);
			if (response.ok) {
				navigate("/signin");
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target;

		if (id === INPUT.CONFIRM_PASSWORD) {
			setConfirmPassword((prev) => ({ ...prev, [id]: value }));
		}

		setCredentials((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	return (
		<StyledBackground>
			<div className="pt-8 pl-14">
				<img className="h-12" src={SmartAttorneyLogo} />
			</div>

			<div className="flex justify-center py-10">
				<h1 className="text-3xl text-white">Get Started</h1>
			</div>

			<div className="flex justify-center py-10">
				{/* Input Fields Grid Layout */}
				<div className="grid grid-cols-2 grid-rows-3 gap-y-7 gap-x-16">
					<InputField
						id={INPUT.FIRST_NAME}
						name="First Name"
						type="text"
						onChange={(event) => handleInputChange(event)}
					/>
					<InputField
						id={INPUT.LAST_NAME}
						name="Last Name"
						type="text"
						onChange={(event) => handleInputChange(event)}
					/>
					<InputField
						id={INPUT.FIRM_NAME}
						name="Firm Name"
						type="text"
						onChange={(event) => handleInputChange(event)}
					/>
					<InputField
						id={INPUT.COMPANY_EMAIL}
						name="Company Email"
						type="email"
						onChange={(event) => handleInputChange(event)}
					/>
					<InputField
						id={INPUT.PASSWORD}
						name="Password"
						type="password"
						onChange={(event) => handleInputChange(event)}
					/>
					<InputField
						id={INPUT.CONFIRM_PASSWORD}
						name="Re-enter Password"
						type="password"
						onChange={(event) => handleInputChange(event)}
					/>
				</div>
			</div>

			{/* Terms of Service */}
			<div className="flex flex-col items-center py-10">
				<TermsOfService />
			</div>

			<div className="flex flex-col items-center py-10">
				<button
					className="h-12 bg-white border-2 border-white rounded-lg w-96"
					type="button"
					onClick={handleRegistration}
				>
					<span className="text-xl text-black">Register</span>
				</button>
			</div>
		</StyledBackground>
	);
}

export default Register;
