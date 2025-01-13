import net from "node:net";
import { parseRequest } from "./parser";
import { createResponse, getTemplate } from "./response";
import { manageRoutes } from "./router";
import cluster from "cluster";
import { cpus } from "os";

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  const numCPUs = cpus().length;
  console.log(`Number of CPUs: ${numCPUs}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const server = net.createServer().listen(3000, () => {
    console.log("SOCKET SERVER Listening");
  });

  server.on("connection", (socket: net.Socket) => {
    console.log("SERVER CONNECTED");

    socket
      .on("data", (data: Buffer | string) => {
        console.log(`[process ${process.pid}]`);

        const request = parseRequest(data);
        if (request) {
          try {
            const page = manageRoutes(request);
            const template = getTemplate(page);
            const response = createResponse(request, template);
            socket.write(response);
          } catch (error) {
            socket.write(
              "HTTP/1.1\r\n\r\n" + (error as { message: string }).message
            );
          }
        }

        // close the socket
        socket.end();
      })
      .on("end", () => {
        console.log("SOCKET ENDED");
      });
  });

  server.on("error", (err) => {
    console.log(`[process ${process.pid}] : ${err}`);
    process.exit(1);
  });
}
