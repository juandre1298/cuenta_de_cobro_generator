import { v4 as uuidv4 } from 'uuid';

export function driveURLIdExtractor(URL){
  const splitted = URL.split("/");
  if(splitted.length == 1){
    return URL 
  }else{
    return splitted[5]; 
  }
}

export const generateRandomId = () => {
  return uuidv4();
};