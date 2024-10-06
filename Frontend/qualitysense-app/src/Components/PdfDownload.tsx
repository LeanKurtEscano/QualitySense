import React from 'react';
import { jsPDF } from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

interface GeneratedText {
  generatedText: string;
  fileName:String;
}

const PdfDownloadButton: React.FC<GeneratedText> = ({ generatedText, fileName }) => {
  const downloadPDF = () => {
    const pdf = new jsPDF();
    const pageHeight = pdf.internal.pageSize.height; // Get the page height
    const margin = 10; // Define a margin for the text
    let yPosition = margin; // Start from the top margin
    const fontSize = 10; // Set the desired font size (smaller than before)

    pdf.setFontSize(fontSize); // Set the font size

    // Split the generated text into lines
    const lines: string[] = pdf.splitTextToSize(generatedText, pdf.internal.pageSize.width - margin * 2);

    lines.forEach((line) => {
      // Check if adding this line would exceed the page height
      if (yPosition + fontSize > pageHeight - margin) {
        pdf.addPage(); // Add a new page
        yPosition = margin; // Reset yPosition for the new page
      }

      pdf.text(line, margin, yPosition); // Add the text line
      yPosition += fontSize; // Move down for the next line
    });

    pdf.save(`${fileName}_quality_report.pdf`);
  };

  return (
    <button 
      onClick={downloadPDF} 
      className="flex items-center p-2 bg-loginbg rounded-lg shadow-xl hover:bg-cyan-500 group"
    >
      <FontAwesomeIcon 
        icon={faDownload} 
        className="text-slate-500 group-hover:text-white" 
      />
      <span className="ml-2 text-slate-500 group-hover:text-white">Download</span>
    </button>
  );
};

export default PdfDownloadButton;
