"use client"
import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import st from "../styles/global.module.scss"

import CuentaDeCobro from '/components/CuentaDeCobro';
import InputGenerator from '../components/InputGenerator';


export default function Home() {
  const [ files, useFiles ] = useState([]);

  const handleFilesUpload = async (event)=>{
    let uploadFiles = []
    if (!!event){
      uploadFiles = event.target.files;
    }

    useFiles(uploadFiles)
  }
  useEffect(()=>{
    handleFilesUpload();
  },[])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className={[st.container].join(" ")}>
          <div className='input-section'>  
            <label className="title" >Algun formato en especifico?</label>
            <input type="file" onChange={handleFilesUpload} />
            <InputGenerator/>
          </div>
          <div className={[st.result_section].join(" ")}>
            <div className='hoja'>
              <CuentaDeCobro files={files}/>
            </div>
          </div>
        </div>

 
       
      </main>
    </div>
  );
}
