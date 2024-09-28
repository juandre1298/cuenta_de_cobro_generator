
import { getInputList, replaceContent } from "../services/generaringDoc";

export default async function handler(req, res) {
  const { id } = req.query;
  switch (req.method) {
    case 'GET':
      try {
        const inputList = await getInputList(id);
        if(inputList){
          res.status(200).json({ message: 'successfull.',inputList });
        }else{
          res.status(404).json({ message: 'Template not found' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    break
    case 'PUT':
      try {
        const requestData=req.body;
        console.log("put request",requestData)
        const inputList = await replaceContent(id,requestData);
        if(inputList){
          res.status(200).json({ message: 'successfull.' });
        }else{
          res.status(404).json({ message: 'replacement error' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case 'POST':
      break;
    case 'DELETE':
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }  
}
