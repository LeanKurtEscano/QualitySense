import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'
import { jsPDF } from 'jspdf';

interface GeneratedText {
    generatedText: string;
    fileName:String;
  }

const Download:React.FC<GeneratedText> = ({generatedText,fileName}) => {
    const cleanText = (text: string) => {
        return text.replace(/[#*`']+/g, '');
    };
    const cleanedText = cleanText(generatedText || '');
   

    const downloadPDF = () => {
        const pdf = new jsPDF();
        const pageHeight = pdf.internal.pageSize.height; // Get the page height
        const margin = 10; // Define a margin for the text
        let yPosition = margin; // Start from the top margin
        const fontSize = 10; // Set the desired font size (smaller than before)
    
        pdf.setFontSize(fontSize); // Set the font size
    
        // Split the generated text into lines
        const lines: string[] = pdf.splitTextToSize(cleanedText, pdf.internal.pageSize.width - margin * 2);
    
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
        <div onClick={downloadPDF} className='flex flex-row items-center justify-center cursor-pointer hover:bg-gray-800 p-2 rounded-md'>
            <FontAwesomeIcon icon={faFileDownload} className='mr-2' />
            <p>Download</p>
        </div>
    )
}

export default Download