const onsed = require("framework");
const fs = require("fs");
const path = require('path');

const app = onsed();
const PORT = 8000;
const HOST = "localhost";

let inMemData = {};


const pathToBuild = path.join(__dirname, '..', '..', 'build');

if (!fs.existsSync(pathToBuild)) {
  console.error('You have not built your server, run `yarn build` before starting the server');

  process.exit(1);
}

app.static(pathToBuild);

app.makeGetRequest("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  fs.readFile(`${pathToBuild}/index.html`, null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write("File not found!");
    } else {
      res.write(data);
    }
    res.end();
  });
});

app.makeGetRequest("/data", (req, res) => {
  res.writeHead(200);
  res.end(JSON.stringify(inMemData));
  console.log(inMemData);
});

app.makePostRequest("/data", (req, res) => {
  const data = req.data;
  inMemData = data;
  res.writeHead(200);
  res.end("POST request done");
  console.log(inMemData);
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
