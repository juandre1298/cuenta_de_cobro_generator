"use client";

import React, { useState, useEffect } from 'react';
import { getInputList } from '../services/doc_service';
import InputGenerator from './InputGenerator';
import { driveURLIdExtractor, generateRandomId } from '../services/helper';
import { useGeneraldocContext } from '../contexts/docContext';
import st from "../styles/global.module.scss"


const GeneralInfoInput = () => {
  const defaultOptions = [
    { id: "Informe_de_Actividades", title: "Informe de Actividades", link: "https://docs.google.com/document/d/1YQ2y6UYsxR_Ft9y_Zx-Xn6oMBGVXVQmYbI6HA6OOuo8/edit" },
    { id: "cta_cobro_55", title: "Cuenta de Cobro de la 55", link: "https://docs.google.com/document/d/1q3w4N42TAELaalaSHClteFlET94Qg14A9F06PLf7SVk/edit" },
    { id: "cta_cobro_41", title: "Cuenta de Cobro de la 41", link: "https://docs.google.com/document/d/1q3w4N42TAELaalaSHClteFlET94Qg14A9F06PLf7SVk/edit" },
    { id: "cta_cobro_47", title: "Cuenta de Cobro de la 47", link: "https://docs.google.com/document/d/1q3w4N42TAELaalaSHClteFlET94Qg14A9F06PLf7SVk/edit" },
  ];

  const { docURL, setDocURL, docList, setDocList } = useGeneraldocContext();

  const [documentId, setDocumentId] = useState("1CNp6AmMsHmKmk720vkXWl1RHOcqN9qJzPJN0Z6rXIzE");
  const [inputList, setInputList] = useState([]);

  const [docNameInput, setDocNameInput] = useState("");
  const [docLinkInput, setDocLinkInput] = useState("");
  

  useEffect(() => {
    // Set initial state to avoid server-client mismatch
    setDocList([]);
  }, []);

  const handleChangeAddOtherFile = (e) => {
    const { value } = e.target;
    setDocumentId(driveURLIdExtractor(value));
  };

  const addNewFileToDocList = (newDoc) => {
    setDocList((prevDocList) => {
      if (!prevDocList.some(doc => doc.id === newDoc.id)) {
        return [...prevDocList, newDoc];
      }
      return prevDocList;
    });
  };

  const removeNewFileFromDocList = (docId) => {
    setDocList((prevDocList) => prevDocList.filter(doc => doc.id !== docId));
  };

  const handleCheckToggle = (e) => {
    const { id, checked } = e.target;
    const optionObject = defaultOptions.find(opt => opt.id === id);

    if (checked && optionObject) {
      addNewFileToDocList(optionObject);
    } else {
      removeNewFileFromDocList(optionObject.id);
    }
  };
  const handleAddOther = (e)=>{
      e.preventDefault();
      if (!docLinkInput){
        alert("Tienes que añadir un link para añadir el document");
        return
      }
      if (!docNameInput){
        alert("Tienes que añadir un nombre para añadir el document");
        return
      }
      addNewFileToDocList({id: docNameInput.replace(" ","_")+"_"+generateRandomId(),title:docNameInput, link: docLinkInput })
   }
  
  const handleDeletButton = (id)=>{
    removeNewFileFromDocList(id);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit click", docList);
  
    const updatedDocList = await Promise.all(
      docList.map(async (docElement) => {
        const driveId = driveURLIdExtractor(docElement.link);
        const listOfInputs = await getInputList(driveId);
        return {
          ...docElement,
          listOfInputs,
        };
      })
    );
  
    setDocList(updatedDocList);
    console.log("Updated docList:", updatedDocList);
  };
  

  return (
    <div>
      <p>Por favor ingresar el LINK documento a editar o seleccione alguna de las opciones disponibles</p>
      <form onSubmit={handleSubmit}>
        <ul>
          {defaultOptions.map((e) => (
            <li key={e.id}>
              <input type="checkbox" id={e.id} name={e.id} onChange={handleCheckToggle} />
              <label htmlFor={e.id}>{e.title}</label><br />
            </li>
          ))}
        </ul>
        <div className={[st.otherFileSelction].join(" ")}>
          <label>Otro:</label>
          <div>
            <label>Nombre:</label>
            <input 
              type="text"
              name="newDocName"
              value={docNameInput}
              placeholder="link del documento"
              onChange={(e)=>setDocNameInput(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Link</label>
            <input
              type="text"
              name="newDocLink"
              value={docLinkInput}
              placeholder="link del documento"
              onChange={(e)=>setDocLinkInput(e.target.value)}
            />
            <button onClick={handleAddOther}>Añadir</button>  
          </div>
        </div>
        <label>Documentos a generar:</label>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Título</th>
              <th>Link</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {docList.map((e, i) => (
              <tr key={e.id}>
                <td>{i + 1}</td>
                <td>{e.title}</td>
                <td><a href={e.link} target="_blank" rel="noopener noreferrer">link</a></td>
                <td><button type="button" onClick={() => handleDeletButton(e.id)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div></div>
        <input type="submit" value="Crear" />
      </form>
      {inputList.length > 0 && <InputGenerator inputList={inputList} />}
    </div>
  );
};

export default GeneralInfoInput;
