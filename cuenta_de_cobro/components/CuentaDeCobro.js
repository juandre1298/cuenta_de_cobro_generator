"use client"
import React, { useState } from 'react';
import mammoth from 'mammoth';

const CuentaDeCobro = ({files}) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [rawTextContent, setRawTextContent] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  
  const parseWordDocxFile = (files) => {

    if (files.length < 1) return

    const file = files[0];

    const reader = new FileReader();
    reader.onloadend = async (event) => {
      const arrayBuffer = reader.result;

      try {
        const htmlResult = await mammoth.convertToHtml({ arrayBuffer });
        setHtmlContent(htmlResult.value);

        const rawTextResult = await mammoth.extractRawText({ arrayBuffer });
        setRawTextContent(rawTextResult.value);

        const markdownResult = await mammoth.convertToMarkdown({ arrayBuffer });
        setMarkdownContent(markdownResult.value);
        
      } catch (error) {
        console.error('Error parsing the file:', error);
      }

    };
    reader.readAsArrayBuffer(file);
  };
  if (typeof window !== 'undefined' && files.length > 0) {
    parseWordDocxFile(files);
  }
  
  return (
    <div>
      {/* <input type="file" onChange={parseWordDocxFile} /> */}
      <div id="result1">
        <h2>HTML Content:</h2>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
};

export default CuentaDeCobro;
