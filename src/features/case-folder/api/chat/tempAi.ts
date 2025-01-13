// import { NextResponse } from "next/server";
// import { getGroqResponse } from "../../../utils/groqClient";

// // Exported POST handler
// export async function POST(req: { json: () => any }) {
//   try {
//     const { message, messages } = await req.json();

//     console.log("message received", message);
//     console.log("messages: ", messages);

//     let scrapedContent = "";

//     // Extract the users Query by removing the URL if present

//     const userQuery = message;
//     console.log("question: ", userQuery);
//     const userPrompt = `
//       answer my question "${userQuery}"

//       Based on the following content:
//       <content>
//         ${scrapedContent}
//       </content>
//     `;

//     const llmMessages = [
//       ...(Array.isArray(messages) ? messages : []),
//       {
//         role: "user",
//         content: userPrompt,
//       },
//     ];
//     const response = await getGroqResponse(llmMessages);

//     return NextResponse.json({ message: response });
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json({ Message: "Error" });
//   }
// }