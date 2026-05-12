import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export const downloadAIResponsePDF = async (
  title: string,
  queryLabel: string,
  queryText: string,
  resultLabel: string,
  markdownResult: string,
  filename: string
) => {
  // Dynamically import heavy PDF libraries to avoid bloating the main app bundle
  const pdfMakeModule = await import('pdfmake/build/pdfmake');
  const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
  const htmlToPdfmakeModule = await import('html-to-pdfmake');

  const pdfMake: any = pdfMakeModule.default || pdfMakeModule;
  const pdfFonts: any = pdfFontsModule.default || pdfFontsModule;
  const htmlToPdfmake: any = htmlToPdfmakeModule.default || htmlToPdfmakeModule;

  // Initialize fonts
  if (pdfFonts && pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  } else if (pdfFonts && pdfFonts.vfs) {
    pdfMake.vfs = pdfFonts.vfs;
  }

  // 1. Convert markdown to HTML string
  const htmlString = renderToStaticMarkup(
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {markdownResult}
    </ReactMarkdown>
  );

  // 2. Convert HTML string to pdfmake format
  const pdfmakeContent = htmlToPdfmake(htmlString, {
    window: window
  });

  // 3. Construct Document Definition
  const docDefinition = {
    content: [
      { text: title, style: 'header' },
      { text: queryLabel, style: 'subheader' },
      { text: queryText, style: 'body' },
      { text: '\n' },
      { text: resultLabel, style: 'subheader' },
      { text: '\n' },
      // Embed the parsed markdown content
      pdfmakeContent
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10] as [number, number, number, number]
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5] as [number, number, number, number],
        color: '#3b82f6'
      },
      body: {
        fontSize: 12,
        margin: [0, 0, 0, 10] as [number, number, number, number]
      }
    },
    defaultStyle: {
      fontSize: 11,
      lineHeight: 1.3
    }
  };

  // 4. Generate and download PDF
  (pdfMake as any).createPdf(docDefinition).download(filename);
};
