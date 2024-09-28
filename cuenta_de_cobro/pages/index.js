"use client"

import { createContext, useContext, useState } from 'react';
import Head from 'next/head';

import InputGenerator from '../components/InputGenerator';
import GeneralInfoInput from '../components/GeneralInfoInput';
import DocDisplay from '../components/DocDisplay';
import { GeneralDocContextProvider } from '../contexts/docContext';
import { scssST } from '../services/helper';

export default function Home() {
  
  return (
    <GeneralDocContextProvider>
      <div>
        <Head>
          <title>Generador de Cuenta de Cobro</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main >
          <div className={scssST("container")}>
            <div>
              <h1>Hola mamá, respira y lee, esto es facil</h1>
              <div className='input-section'>  
                <GeneralInfoInput />
              </div>
            </div>
            <div className={scssST("result_section")}>
              < DocDisplay/>
            </div>
          </div>      
        </main>
      </div>
    </GeneralDocContextProvider>
  );
}
