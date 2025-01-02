import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdf.worker.min.mjs';

export async function gettext(pdfUrl: string): Promise<string> {
  const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
  const maxPages = pdf.numPages;
  const countPromises: Promise<string>[] = [];

  for (let j = 1; j <= maxPages; j++) {
    const page = pdf.getPage(j);

    countPromises.push(
      page.then(async (page) => {
        const textContent = await page.getTextContent();
        return textContent.items.map((item: any) => item.str).join('');
      })
    );
  }

  const texts = await Promise.all(countPromises);
  return texts.join('');
}
