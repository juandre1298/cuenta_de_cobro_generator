"use client"
import React, { useState, useEffect } from 'react';
import st from "../styles/global.module.scss"
import mammoth from 'mammoth';

const CuentaDeCobro = ({ files }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [rawTextContent, setRawTextContent] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');

  const docxHandle = async (file) => {
    let htmlResult;
    let rawTextResult;
    let markdownResult;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const arrayBuffer = reader.result;
      try {
        htmlResult = await mammoth.convertToHtml({ arrayBuffer });
        rawTextResult = await mammoth.extractRawText({ arrayBuffer });
        markdownResult = await mammoth.convertToMarkdown({ arrayBuffer });
        setHtmlContent(htmlResult.value);
        setRawTextContent(rawTextResult.value);
        setMarkdownContent(markdownResult.value);
      } catch (error) {
        console.error('Error parsing the file:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const parseWordDocxFile = async (files) => {
    if (files.length < 1) {
      try {
        const response = await fetch('/cuenta_de_cobro_template.docx');
        const blob = await response.blob();
        const file = new File([blob], "cuenta_de_cobro_template.docx");
        docxHandle(file);
      } catch (error) {
        console.error('Error fetching the default file:', error);
      }
    } else {
      const file = files[0];
      docxHandle(file);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      parseWordDocxFile(files);
    }
  }, [files]);

  return (
    <div >
      <div id="result1">
        <h2>HTML Content:</h2>
        <div className={[st.paper].join(" ")} dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
};

export default CuentaDeCobro;
