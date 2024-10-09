import { makeACopy } from "../helpers/googleHelpers";
import { replaceContent } from "../services/generaringDoc";

export async function fileRequestController(docId, options, requestData){
  if(options?.createNewFile){
    const newFileData = await makeACopy(docId,options.newFileData.newFileName);
    console.log(newFileData);
    await replaceContent(newFileData.id,requestData);
    return newFileData

  }else{
    return await replaceContent(docId,requestData);
  }
}