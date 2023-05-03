import { Request, Response } from "express";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import NotFoundError from "../errors/not-found";

const dataPath = "./callapp-data.json";
let dataObject: any;

fs.readFile(dataPath, (err, data) => {
  if (err) {
    console.log(`Error reading file: ${dataPath}`, err);
    return;
  }
  dataObject = JSON.parse(data.toString());
  console.log(`Data loaded from ${dataPath}:`);
});

const getAllData = async (req: Request, res: Response) => {
  if (!dataObject || dataObject.length <= 0) {
    throw new NotFoundError("Data doesn't exist");
  }
  res.status(StatusCodes.OK).json({ msg: "all data", dataObject });
};

const updateData = async (req: Request, res: Response) => {
  res.send("update data");
};

const deleteData = async (req: Request, res: Response) => {
  res.send("delete data");
};

export { getAllData, updateData, deleteData };
