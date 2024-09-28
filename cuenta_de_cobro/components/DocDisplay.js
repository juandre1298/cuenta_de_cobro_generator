"use client"
import React, { useState, useEffect } from 'react';
import { useGeneraldocContext } from '../contexts/docContext';
import { scssST } from '../services/helper';


const DocDisplay = () => {
  const {docURL, docList, setDocList }=useGeneraldocContext();

  return (
    <div className={scssST("iframe-section")}>
      {docList.map(e=>{
        return <div key={`iframe-${e.id}`} id={`iframe-${e.id}`} className={scssST("editDoctSection")}>
          <h2>{e.title}</h2>
          <div id={e.id} className={scssST("editDoctContainer")}>
            <iframe src={e.link} frameBorder='0'></iframe>
            {e.listOfInputs && 
              <form className={scssST("inputOptionsSection")}>
                  <fieldset>
                    <legend>Datos {e.title}</legend>
                    {e.listOfInputs.map( (inputKey, i)=>{
                      return <p key={i}>
                          <label>{inputKey}</label>
                          <input type="text"/> 
                        </p>
                    })}
                    <input type="submit" />
                  </fieldset>
              </form>
            }
          </div>        
        </div>})}
    </div>
  );
};

export default DocDisplay;
