"use client"
import React, { useState, useEffect } from 'react';
import { getInputList } from '../services/doc_service';
import InputGenerator from './InputGenerator';

const GeneralInfoInput = ({ files }) => {
  const [documentId, setDocumentId] = useState("1YQ2y6UYsxR_Ft9y_Zx-Xn6oMBGVXVQmYbI6HA6OOuo8")
  const [inputList, setInputList] = useState([]);
  

  const handleChange = (e) => {
    const { value } = e.target;
    setDocumentId(value);
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log('Form submitted:', documentId);
    const inputList = await getInputList(documentId);
    setInputList(inputList)
  }

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <label>
          Document Id:
          <input
            type="text"
            name="template_id"
            value={documentId}
            onChange={handleChange}
            />
          <input type="submit"/>
        </label>
        <InputGenerator inputList={inputList} />
      </form>
    </div>
  );
};

export default GeneralInfoInput;
