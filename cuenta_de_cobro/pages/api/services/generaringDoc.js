
import {authorize, printDocTitle ,replaceText, makeACopy, getDocTextString} from "../helpers/googleHelpers"

export async function getInputList(documentId){
  const text = await getDocTextString(documentId);
  const regex = /\{\{(.*?)\}\}/g; // Regular expression to match {{stringExample}}
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1]); // Capture the text inside {{ and }}
  }
  return matches;
}