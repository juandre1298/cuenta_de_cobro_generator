
import { extractKeysFromJSON } from "../helpers/generalHelpers";
import {authorize, printDocTitle ,textReplacement, makeACopy, getDocTextString, getDocData} from "../helpers/googleHelpers"

export async function getInputList(documentId){
  const doc = await getDocData(documentId);
  const matches = extractKeysFromJSON(doc.body.content);
  return matches;
}
export async function replaceContent(documentId, replacementData) {
  const promises = Object.keys(replacementData).map(async key => {
    const textToReplace = `{{${key}}}`;
    return textReplacement(documentId, textToReplace, replacementData[key]);
  });
  await Promise.all(promises);
}