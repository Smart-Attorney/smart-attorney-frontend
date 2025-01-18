import { getDocument } from "pdfjs-dist";

export async function extractTextFromPDF(data: Uint8Array): Promise<string> {
  const pdf = await getDocument({ data }).promise;

  const pagePromises = Array.from({ length: pdf.numPages }, (_, i) =>
    pdf
      .getPage(i + 1)
      .then((page) =>
        page
          .getTextContent()
          .then((pageText) => pageText.items.map((item) => item).join(" "))
      )
  );

  const allText = await Promise.all(pagePromises);
  return allText.join(" ");
}
