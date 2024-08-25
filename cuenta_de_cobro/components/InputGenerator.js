"use client"
import React, { useState, useEffect } from 'react';
import { handleDownload } from '../services/doc_service.js';

const InputGenerator = ({ inputList }) => {

  return (
    <div>
      {inputList.length > 0 &&
        inputList.map((e,i) =>(<div>
          {console.log(i+" element "+e)}
          {e}
        </div>)
        )
      }
    </div>
  );
};

export default InputGenerator;
