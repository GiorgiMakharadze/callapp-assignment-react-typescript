import { Request, Response } from "express";
import fs from "fs";

const dataPath = "./callapp-data.json";
fs.readFile(dataPath, (err, data) => {
  if (err) {
    console.log(`Error reading file: ${dataPath}`, err);
    process.exit(1);
  }
  const dataObject = JSON.parse(data.toString());
  console.log(`Data loaded from ${dataPath}:`);
});

const getAllData = async (req: Request, res: Response) => {
  res.send("get all data");
};

const updateData = async (req: Request, res: Response) => {
  res.send("update data");
};

const deleteData = async (req: Request, res: Response) => {
  res.send("delete data");
};

export { getAllData, updateData, deleteData };
