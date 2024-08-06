// @ts-ignore
import axios from "axios";
// @ts-ignore
import React, { useState } from "react";
// @ts-ignore
import styled from "styled-components";
// @ts-ignore
import PdfExtractor from "./PdfExtractor";

const Body = styled.div`
	padding: 3rem;
	font-size: 16px;
	* {
		font-family: "Open Sans", sans-serif;
	}

	input {
		border: lightgray 1px solid;
		padding: 0.75rem;
	}
`;

const Circle = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	border-radius: 999px;
	background: black;
	color: white;
`;

const ContainerBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 1000px;
	padding: 1rem;
`;

const FormContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
`;
const Header = styled.span`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const Container = (props: { heading: string; index: number; children: React.ReactNode }) => {
	const { index, heading, children } = props;
	return (
		<div className="mb-[2rem]">
			<Header className="mb-[1rem]">
				<Circle>{index}</Circle> <p className="font-semibold text-[1.25rem]">{heading}</p>
			</Header>

			<hr />
			<ContainerBody>{children}</ContainerBody>
		</div>
	);
};

interface BasicInfoForm extends HTMLFormElement {
	fullName: HTMLInputElement;
	age: HTMLInputElement;
	address1: HTMLInputElement;
	city: HTMLInputElement;
	state: HTMLInputElement;
	zip: HTMLInputElement;
}

const ChatGPT = () => {
	const [res, setRes] = useState<string>();

	// @ts-ignore
	const [isLoading, setIsLoading] = useState(false);
	// const apiKey = "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";
	// const apiKey = "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";
	const apiKey = "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";

	const turbo_endpoint = "https://api.openai.com/v1/chat/completions";
	const turbo_model = "gpt-4";

	// @ts-ignore
	const daVinci_endpoint = "https://api.openai.com/v1/completions";
	// @ts-ignore
	const daVinciMode = "text-davinci-003";

	const [pdfContent, setPdfContent] = useState("");

	const generateLetter = (e: React.FormEvent<BasicInfoForm>) => {
		e.preventDefault();
		const formVal = e.currentTarget;
		setIsLoading(true);
		setRes("loading....");

		console.log("formval", formVal.fullName.value);

		const params = {
			messages: [
				{
					role: "user",
					content:
						`I am immigrant facing deportation soon. Can you write me a letter under ${
							formVal.maxWordCount ? formVal.maxWordCount.value : 200
						} words?` +
						"My name is " +
						formVal.fullName.value +
						", " +
						formVal.age.value +
						" years old" +
						". My address is " +
						formVal.address1.value +
						formVal.city.value +
						", " +
						formVal.state.value +
						formVal.zip.value +
						"Here's an example of my hardship letter. Can you write one similar to it? " +
						pdfContent,
				},
			],
			model: turbo_model,
			max_tokens: 4000,
			temperature: 0,
		};

		console.log("params", params);

		const client = axios.create({
			headers: {
				Authorization: "Bearer " + apiKey,
			},
		});

		client
			.post(turbo_endpoint, params)
			// @ts-ignore
			.then((res) => {
				console.log("res", res);
				setRes(res.data.choices[0].message.content);
				setIsLoading(false);
			})
			// @ts-ignore
			.catch((err) => {
				setRes(err.message);
				console.log("err", err);
				setIsLoading(false);
			});

		return false;
	};

	// useEffect(() => {
	// 	console.log("pdf content", pdfContent);
	// }, [pdfContent]);

	return (
		<Body>
			<form className="mb-[2rem]" onSubmit={generateLetter}>
				<Container heading="Basic Information" index={1}>
					<FormContainer>
						<input type="text" name="fullName" placeholder="Full Name" />
						<input type="number" name="age" placeholder="Age" />
						<input type="text" name="address1" placeholder="Address" />
						<input type="text" name="city" placeholder="City" />
						<input type="text" name="state" placeholder="State" />
						<input type="text" name="zip" placeholder="Zip" />
					</FormContainer>
				</Container>
				<Container heading="Upload Files" index={2}>
					<PdfExtractor setPdf={setPdfContent} />

					{/* <button
						type="button"
						className="border border-lightgray-600 hover:bg-lightgray-900 font-semibold py-2 px-4 rounded w-[200px]"
					
					>
						+ Add File
					</button> */}
				</Container>
				<Container heading="Settings" index={3}>
					<input type="number" name="maxWordCount" placeholder="Word Count (default: 200)" />
				</Container>

				{/* <input
					type="submit"
					value="Generate Letter"
					placeholder="Max Word Count"
				/> */}
				<button type="submit" className="px-4 py-2 font-semibold text-white bg-purple-900 rounded hover:bg-purple-800">
					Generate Letter
				</button>
			</form>

			<hr />
			{res}
		</Body>
	);
};

export default ChatGPT;
