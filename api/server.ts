import express from "express";
import fs from "fs";

const app = express();
const port = process.env.PORT || 5000;

const dataPath = "./callapp-data.json";
const dataRead = fs.readFile(dataPath, (err, data) => {
  if (err) {
    console.log(`Error reading file: ${dataPath}`, err);
    process.exit(1);
  }
  const dataObject = JSON.parse(data.toString());
  console.log(`Data loaded from ${dataPath}:`, dataObject);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});
