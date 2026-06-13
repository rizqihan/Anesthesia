import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

/**
 * Utility to print any HTML content as a PDF using browser native print.
 */
export const printContentAsPDF = (
  title: string,
  htmlContent: string,
  filename: string
) => {
  if (typeof window === 'undefined') return;

  // Temporarily change document title to control the default PDF filename
  const oldTitle = document.title;
  const targetTitle = filename.replace(/\.pdf$/i, '');
  document.title = targetTitle;

  // Create an iframe to print the content
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.pointerEvents = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document || iframe.contentDocument;
  if (!doc) {
    document.body.removeChild(iframe);
    document.title = oldTitle;
    return;
  }

  doc.title = targetTitle;

  // Write content with print-specific styles
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            color: #0f172a;
            line-height: 1.6;
            padding: 30px;
            font-size: 13px;
            background: #ffffff;
          }
          h1, h2, h3, h4, h5, h6 {
            color: #020617;
            font-weight: 800;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
          }
          h1 { font-size: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 6px; margin-top: 0; }
          h2 { font-size: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
          h3 { font-size: 13px; }
          p { margin-bottom: 1em; }
          ul, ol { margin-bottom: 1em; padding-left: 20px; }
          li { margin-bottom: 0.25em; }
          strong { font-weight: 700; color: #020617; }
          
          /* Table Styles */
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 12px;
          }
          th, td {
            border: 1px solid #cbd5e1;
            padding: 8px 12px;
            text-align: left;
            vertical-align: top;
          }
          th {
            background-color: #f1f5f9;
            font-weight: 700;
            color: #0f172a;
          }
          tr:nth-child(even) {
            background-color: #f8fafc;
          }
          
          /* Blockquote / Alert box */
          blockquote {
            margin: 1.5em 0;
            padding: 10px 20px;
            background: #f8fafc;
            border-left: 4px solid #3b82f6;
            color: #475569;
            font-style: italic;
          }

          /* SVG support for ECG */
          svg {
            max-width: 100%;
            height: auto;
            border: 1px solid #cbd5e1;
            background: #fff5f5; /* pink grid feeling */
            margin: 10px 0;
          }

          /* Hide anything not needed */
          button, .no-print, .close-btn, .close, [role="button"] {
            display: none !important;
          }

          @media print {
            body {
              padding: 0;
              font-size: 12px;
            }
            @page {
              margin: 15mm;
            }
            tr, blockquote, pre, svg {
              page-break-inside: avoid;
            }
            h1, h2, h3 {
              page-break-after: avoid;
            }
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div>${htmlContent}</div>
      </body>
    </html>
  `);
  doc.close();

  // Wait a short duration to ensure styles and fonts render before printing
  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(iframe);
      document.title = oldTitle;
    }, 1000);
  }, 350);
};

export const downloadAIResponsePDF = async (
  title: string,
  queryLabel: string,
  queryText: string,
  resultLabel: string,
  markdownResult: string,
  filename: string
) => {
  // 1. Convert markdown to HTML string
  const htmlString = renderToStaticMarkup(
    <div className="prose">
      <div style={{ marginBottom: '20px', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '12px', textTransform: 'uppercase', color: '#64748b' }}>{queryLabel}</h3>
        <p style={{ margin: 0, fontWeight: 500, fontSize: '13px' }}>{queryText}</p>
      </div>
      <h3 style={{ borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', textTransform: 'uppercase', color: '#64748b', fontSize: '12px' }}>{resultLabel}</h3>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {markdownResult}
      </ReactMarkdown>
    </div>
  );

  // 2. Generate and download PDF using browser native print
  printContentAsPDF(title, htmlString, filename);
};
