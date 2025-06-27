import http from "http";

const PORT = 3000;

const server = http.createServer(
    (req, res) => {
        res.writeHead(200, {"content-type": "text/plain"});
        res.end("Hello World");
    }
);

server.listen(PORT, 
    () => {
        console.log("Servidor ativo e aguardando requisições...");
    }
)