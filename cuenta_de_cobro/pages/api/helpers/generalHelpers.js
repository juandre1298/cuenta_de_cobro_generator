const http = require('http');

export async function startServerWithJSON(jsonElement, port = 4000) {
    try {
        if (!jsonElement) {
            throw new Error('The provided JSON element is invalid or undefined.');
        }

        let jsonString = JSON.stringify(jsonElement, null, 2); // Pretty print with 2 spaces of indentation

        const server = http.createServer((req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(jsonString);
        });

        server.listen(port, () => {
            console.log(`Server running at http://localhost:${port}/`);
        });

        server.on('error', (err) => {
            console.error(`Server error: ${err.message}`);
        });

    } catch (err) {
        console.error(`Failed to start server: ${err.message}`);
    }
}

export function extractKeysFromJSON(jsonData) {
  const extractedData = [];
  const pattern = /\{\{(.*?)\}\}/g;

  function searchContent(element) {
      if (typeof element === 'object' && element !== null) {
          if (Array.isArray(element)) {
              for (const item of element) {
                  searchContent(item);
              }
          } else {
              for (const [key, value] of Object.entries(element)) {
                  if (typeof value === 'string') {
                      const matches = value.match(pattern);
                      if (matches) {
                          matches.forEach(match => {
                              const key = match.slice(2, -2); // Extract key from {{key}}
                              extractedData.push(key.trim());
                          });
                      }
                  } else {
                      searchContent(value);
                  }
              }
          }
      }
  }

  searchContent(jsonData);
  return extractedData;
}