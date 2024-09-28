"use client"
import React, { useState, useEffect } from 'react';
import { useGeneraldocContext } from '../contexts/docContext';


const DocDisplay = () => {
  const {docURL, docList, setDocList }=useGeneraldocContext();

  return (
    <div >
      IFRAME SECTION
      <div id="result1">
        {
          docURL && <iframe src={`https://docs.google.com/document/d/${docURL}/edit`} width='1366px' height='623px' frameBorder='0'></iframe>
        }
        </div>
      {docList.map(e=>{return <div key={e.id}>
        <h2>{e.title}</h2>
        <iframe src={e.link} width='1366px' height='623px' frameBorder='0'></iframe>
      </div>})}
    </div>
  );
};

export default DocDisplay;
