export async function getInputList(documentId) {
  try {
    const response = await fetch('/api/document/'+documentId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data.inputList;

  } catch (error) {
    console.error('Error getting inputs:', error);
    alert('Error getting inputs. Check console for details.');
  }
}

export async function changeDocText(documentId, requestData) {
  try {
    const response = await fetch('/api/document/'+documentId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(requestData)
    });

    const data = await response.json();
    return data.inputList;

  } catch (error) {
    console.error('Error getting inputs:', error);
    alert('Error getting inputs. Check console for details.');
  }
}

export function downloadDocxFromGoogleDocs(googleDocsUrl) {
  // Extract the FILE_ID from the Google Docs URL
  const fileIdMatch = googleDocsUrl.match(/\/document\/d\/(.*?)\/edit/);
  
  if (!fileIdMatch || !fileIdMatch[1]) {
    console.error("Invalid Google Docs URL");
    return;
  }

  const fileId = fileIdMatch[1];
  
  // Construct the direct download URL for a .docx file
  const downloadUrl = `https://docs.google.com/document/d/${fileId}/export?format=docx`;
  
  // Create an anchor element to trigger the download
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = ''; // The filename will be derived from the Google Docs file
  document.body.appendChild(anchor);
  anchor.click();
  
  // Remove the anchor element after download
  document.body.removeChild(anchor);
}

export async function handleDownload(googleDocsUrl) {
  // const googleDocsUrl = 'https://docs.google.com/document/d/1ZJjqNKp7BY_2jhSqM3Ng7L4Vjzq_0StA/edit';
  
  try {
    // const response = await fetch('/api/download-doc', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ googleDocsUrl }),
    // });

    // const data = await response.json();

    // if (response.ok) {
    //   alert('File downloaded successfully!');
    // } else {
    //   alert(`Error: ${data.error}`);
    // }
  } catch (error) {
    console.error('Error downloading file:', error);
    alert('Error downloading file. Check console for details.');
  }
}