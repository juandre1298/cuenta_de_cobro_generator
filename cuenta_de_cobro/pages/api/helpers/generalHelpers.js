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
