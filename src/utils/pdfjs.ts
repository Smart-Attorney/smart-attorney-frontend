import { pdfjs } from 'react-pdf';
import { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api'; // pdf.js types
import { GlobalWorkerOptions } from 'pdfjs-dist';

// Function to extract text from PDF
export const extractTextFromPdf = async (pdfUrl: string): Promise<string> => {
  try {
    const pdf = await pdfjs.getDocument(pdfUrl).promise;
    let fullText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content: TextContent = await page.getTextContent();

      // Filter the content items and extract only 'TextItem' types
      const pageText = content.items
        .filter((item): item is TextItem => 'str' in item) // Type guard to check for 'str' property
        .map((item) => item.str) // Now we can safely access 'str'
        .join(' ');

      fullText += pageText + '\n';
    }

    return fullText;
  } catch (error) {
    console.error('Error extracting text from PDF', error);
    return 'Failed to extract text';
  }
};

export default extractTextFromPdf;
