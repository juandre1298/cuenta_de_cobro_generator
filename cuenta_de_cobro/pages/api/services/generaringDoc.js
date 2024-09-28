
import {authorize, printDocTitle ,textReplacement, makeACopy, getDocTextString} from "../helpers/googleHelpers"

export async function getInputList(documentId){
  const text = await getDocTextString(documentId);
  const regex = /\{\{(.*?)\}\}/g; // Regular expression to match {{stringExample}}
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if(!matches.includes(match[1])){
      matches.push(match[1]); // Capture the text inside {{ and }}
    }
  }
  return matches;
}
export async function replaceContent(documentId, replacementData) {
  const promises = Object.keys(replacementData).map(async key => {
    const textToReplace = `{{${key}}}`;
    return textReplacement(documentId, textToReplace, replacementData[key]);
  });
  await Promise.all(promises);
}