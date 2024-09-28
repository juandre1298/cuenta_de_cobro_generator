"use client"
import React, { useState, useEffect } from 'react';
import { useGeneraldocContext } from '../contexts/docContext';
import { driveURLIdExtractor, scssST } from '../services/helper';
import { changeDocText } from '../services/doc_service';


const DocDisplay = () => {
  const { docList }=useGeneraldocContext();
  useEffect(()=>{
    console.log("docList:",docList)
  },docList)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const inputValues = {};
    
    Array.from(e.target.elements).forEach((element) => {
      if (element.tagName === 'INPUT') {
        inputValues[element.id] = element.value;
      }
    });
    
    console.log(inputValues);
    await changeDocText(driveURLIdExtractor(inputValues.documentLink), inputValues);
  }


  return (
    <div className={scssST("iframe-section")}>
      {docList.map(docElement=>{
        return <div key={`iframe-${docElement.id}`} id={`iframe-${docElement.id}`} className={scssST("editDoctSection")}>
          <h2>{docElement.title}</h2>
          <div id={docElement.id} className={scssST("editDoctContainer")}>
            <iframe src={docElement.link} frameBorder='0'></iframe>
            {docElement.listOfInputs && 
              <form className={scssST("inputOptionsSection")} onSubmit={handleSubmit}>
                  <fieldset>
                    <legend>Datos {docElement.title}</legend>
                    <input type="hidden" id="documentId" value={docElement.id} />
                    <input type="hidden" id="documentLink" value={docElement.link} />
                    {docElement.listOfInputs.map( (inputKey, i)=>{
                      return <p key={i}>
                          <label for={inputKey}>{inputKey}: </label>
                          <input id={inputKey} type="text"/> 
                        </p>
                    })}
                    <input type="submit" value="crear" />
                  </fieldset>
              </form>
            }
          </div>        
        </div>})}
    </div>
  );
};

export default DocDisplay;
