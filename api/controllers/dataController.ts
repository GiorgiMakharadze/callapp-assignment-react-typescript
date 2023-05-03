import { Request, Response } from "express";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, EmptyValueError } from "../errors";

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
  const id = parseInt(req.params.id, 10);
  const updatedFields = req.body;

  const index = dataObject.findIndex((item: any) => item.id === id);

  if (index === -1) {
    throw new NotFoundError(`Data with ID ${id} not found`);
  }

  for (const key in updatedFields) {
    if (key === "address" && !(updatedFields[key] instanceof Object)) {
      throw new TypeError(
        "Address field should be an object with 'street' and 'city' properties"
      );
    }

    if (!(key in dataObject[index])) {
      throw new NotFoundError(`Field '${key}' does not exist in the object`);
    }

    if (updatedFields[key] === "") {
      throw new EmptyValueError(`Value for '${key}' cannot be empty`);
    }
  }

  const updatedObject = {
    ...dataObject[index],
    ...updatedFields,
  };

  if (updatedFields.address) {
    updatedObject.address = {
      ...dataObject[index].address,
      ...updatedFields.address,
    };
  }

  dataObject[index] = updatedObject;

  await fs.promises.writeFile(dataPath, JSON.stringify(dataObject, null, 2));

  res.status(StatusCodes.OK).json(dataObject[index]);
};

const deleteData = async (req: Request, res: Response) => {
  res.send("delete data");
};

export { getAllData, updateData, deleteData };
