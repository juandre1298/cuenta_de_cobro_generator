"use client";
import React, { useState } from 'react';
import { changeDocText } from '../services/doc_service';
import { useGeneraldocContext } from '../contexts/docContext';

const InputGenerator = ({ inputList }) => {
  const [requestData, setRequestData] = useState({});
  const {docURL}=useGeneraldocContext();  

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    changeDocText(docURL,requestData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData(prevRequest => ({
      ...prevRequest,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmitRequest}>
      {inputList.length > 0 &&
        inputList.map((e, i) => (
          <label key={i}>
            {e}
            <input
              type="text"
              name={e}
              value={requestData[e] || ''}
              onChange={handleChange}
            />
          </label>
        ))
      }
      <input type="submit" />
    </form>
  );
};

export default InputGenerator;
