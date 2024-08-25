"use client"

import Head from 'next/head';
import st from "../styles/global.module.scss"

import InputGenerator from '../components/InputGenerator';
import GeneralInfoInput from '../components/GeneralInfoInput';


export default function Home() {

  return (
    <div>
      <Head>
        <title>Generador de Cuenta de Cobro</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className={[st.container].join(" ")}>
          <div>
            <h1>Hola mamá, respira y lee, esto es facil</h1>
            <div className='input-section'>  
              <GeneralInfoInput />
            </div>
          </div>
          <div className={[st.result_section].join(" ")}>
            {/* <div className='hoja'>
              <CuentaDeCobro files={files}/>
            </div> */}
          </div>
        </div>

 
       
      </main>
    </div>
  );
}
