
import {getInputList} from "./services/generaringDoc.js";

export default async function handler(req, res) {
  
  if (req.method === 'POST') {
    const { googleDocsUrl } = req.body;

    try {


      // const fileInfo = {
      //   newName: "tesx2",
      //   filePath: path.join(process.cwd(), 'test.txt'),
      //   mimeType: "text/plain"
      // }
      // const uploadResp = await uploadFile(fileInfo,authResp);
      // console.log(uploadResp)
      // await replaceText(authResp);
      // const copyInfo = await makeAcopy("1YQ2y6UYsxR_Ft9y_Zx-Xn6oMBGVXVQmYbI6HA6OOuo8","NEW COPY");
      // console.log(copyInfo);

      const inputLink = await getInputList("1YQ2y6UYsxR_Ft9y_Zx-Xn6oMBGVXVQmYbI6HA6OOuo8");
      console.log(inputLink);
      res.status(200).json({ message: 'successfull.' })

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed. Use POST method.' });
  }
}
