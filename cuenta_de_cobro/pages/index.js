"use client"
import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import CuentaDeCobro from '/components/CuentaDeCobro';

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
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

        <input type="file" onChange={handleFilesUpload} />
        <CuentaDeCobro files={files}/>
      </main>
    </div>
  );
}
