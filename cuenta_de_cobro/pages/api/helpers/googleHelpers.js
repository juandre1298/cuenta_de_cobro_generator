import fs from 'fs';
import path from 'path';
import {google} from "googleapis";
import apikeys from "./../apikey.json"
import { embedStyleMap } from 'mammoth';
const http = require('http');
import { startServerWithJSON } from './generalHelpers';

const SCOPE = ["https://www.googleapis.com/auth/", 'https://www.googleapis.com/auth/documents' ];



export async function authorize(){
  
  const keyFile = '/home/juan-salas/dev/cuenta_de_cobro/cuenta_de_cobro/pages/api/apikey.json'; // Update with your actual path
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFile,
    scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/documents'],
  });

  const authClient = await auth.getClient();
  return authClient;
}

export async function authorizeClient(){
  const SCOPES = [
    'https://www.googleapis.com/auth/documents',
    'https://www.googleapis.com/auth/drive.file'
  ];

  const oauth2Client = new google.auth.OAuth2(
    apikeys.client_id,
    YOUR_CLIENT_SECRET,
    YOUR_REDIRECT_URL
  );
  
  // Generate an authentication URL
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens)
}

export async function printDocTitle(auth = authResp) {
  const docs = google.docs({version: 'v1', auth});
  const res = await docs.documents.get({
    documentId: '1YQ2y6UYsxR_Ft9y_Zx-Xn6oMBGVXVQmYbI6HA6OOuo8',
  });
  console.log(`The title of the document is: ${res.data.title}`);
}

export async function textReplacement(documentId,text,newText) {
  const authResp = await authorize();
  
  const docs = google.docs({version: 'v1', auth: authResp});
  const requests = [
    {
      replaceAllText: {
        containsText: {
          text: text,
          matchCase: true,
        },
        replaceText: newText,
      },
    },
  ];
  const res = await docs.documents.batchUpdate({
    documentId,
    requestBody:{
      requests,
    }
  });  
  return res
}

export async function makeACopy(sourceDocumentId,newDocumentName){
  const authResp = await authorize();
  const drive = google.drive({ version: 'v3', auth: authResp });
  const response = await drive.files.copy({
    fileId: sourceDocumentId, // The ID of the Google Doc you want to copy
    requestBody: {
      name: newDocumentName, // The name for the new copy of the document
    },
  });
  return response.data;  
}

export async function getDocData(documentId){
  const authResp = await authorize();

  const docs = google.docs({ version: 'v1', auth: authResp });
  const response = await docs.documents.get({
    documentId: documentId,
  });

  // The full document object
  const document = response.data;
  console.log(document);
  return document;

}

export async function getDocTextString(documentId){
  const doc = await getDocData(documentId);
  let content = doc.body.content;
  // let text = '';
  // await startServerWithJSON(content);
  // content.forEach(element => {
  //   console.log(element)
  //   if (element.paragraph) {
  //     element.paragraph.elements.forEach(paragraphElement => {
  //       if (paragraphElement.textRun && paragraphElement.textRun.content) {
  //         text += paragraphElement.textRun.content;
  //       }
  //     });
  //   }
  //   if (element.table) {
  //     element.table.tableRows.forEach(tableRowsElement => {
  //       if (tableRowsElement.content) {
  //         console.log(tableRowsElement.content);
  //         text += tableRowsElement.content;
  //       }
  //     });
  //   }
  //   console.log("element.sectionBreak:",element.sectionBreak)
  // });
  return JSON.stringify(content);
}

export async function uploadFile(fileInfo, parentsId="1HkeNr5RRtESIrrAsG9SC2tZNfzMEMIfp"){
  const authResp = await authorize();

  return new Promise((resolve,rejected)=>{
    
    const drive = google.drive({version: "v3", auth: authResp});
    
    var fileMetaData = {
      name: fileInfo.newName,
      parents: [parentsId] // id de folder de drive de cuenta de cobro
    }

    drive.files.create({
      resource: fileMetaData,
      media:{
        body: fs.createReadStream(fileInfo.filePath),
        mimeType: fileInfo.mimeType
      },
      fields: "id"
    }, function(err,file){
      if(err){
        return rejected(err)
      }
      resolve(file)
    });
  });
}

export async function downloadDocxFromGoogleDocs(googleDocsUrl, outputFolder) {
  // Extract the FILE_ID from the Google Docs URL
  const fileIdMatch = googleDocsUrl.match(/\/document\/d\/(.*?)\/edit/);
  
  if (!fileIdMatch || !fileIdMatch[1]) {
    throw new Error("Invalid Google Docs URL");
  }

  const fileId = fileIdMatch[1];
  
  // Construct the direct download URL for a .docx file
  const downloadUrl = `https://docs.google.com/document/d/${fileId}/export?format=docx`;
  
  try {
    console.log("downloadUrl",downloadUrl)
    // Make a request to download the file
    // const response = await axios.get(downloadUrl, { responseType: 'stream' });

    // Ensure output directory exists
    // if (!fs.existsSync(outputFolder)) {
    //   fs.mkdirSync(outputFolder, { recursive: true });
    // }

    // // Define the output file path
    // const outputPath = path.join(outputFolder, `${fileId}.docx`);

    // // Create a write stream to the file path
    // const writer = fs.createWriteStream(outputPath);
    
    // // Pipe the response data to the file
    // response.data.pipe(writer);

    // return new Promise((resolve, reject) => {
    //   writer.on('finish', resolve);
    //   writer.on('error', reject);
    // });

  } catch (error) {
    throw new Error(`Error downloading the file: ${error.message}`);
  }
}
