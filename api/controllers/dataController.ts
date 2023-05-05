import { Request, Response } from "express";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, EmptyValueError } from "../errors";
import { IData } from "../types/createDataTypes";

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

const createData = async (req: Request, res: Response) => {
  const newData: IData = req.body;
  if (
    !newData ||
    !("name" in newData) ||
    !("email" in newData) ||
    !("gender" in newData) ||
    !("address" in newData) ||
    !("phone" in newData)
  ) {
    throw new Error("Invalid data format, Please provide correct values");
  }

  for (const key in newData) {
    if (key === "address") {
      if (!(newData[key] instanceof Object)) {
        throw new TypeError(
          "Address field should be an object with 'street' and 'city' properties"
        );
      }
      if (!newData[key].street || !newData[key].city) {
        throw new EmptyValueError(
          `Value for 'street' and 'city' in address cannot be empty`
        );
      }
    } else {
      if (newData[key] === "") {
        throw new EmptyValueError(`Value for '${key}' cannot be empty`);
      }
    }
  }

  const lastItemId = dataObject[dataObject.length - 1].id;
  const newId = lastItemId + 1;

  const newObject: IData = {
    id: newId,
    name: newData.name,
    email: newData.email,
    gender: newData.gender,
    address: {
      street: newData.address.street,
      city: newData.address.city,
    },
    phone: newData.phone,
  };
  dataObject.push(newObject);

  await fs.promises.writeFile(dataPath, JSON.stringify(dataObject, null, 2));

  res.status(StatusCodes.CREATED).json(newObject);
};

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
  const id = parseInt(req.params.id, 10);
  const index = dataObject.findIndex((item: any) => item.id === id);

  if (index === -1) {
    throw new NotFoundError(`Data with ID ${id} not found`);
  }

  dataObject.splice(index, 1);

  await fs.promises.writeFile(dataPath, JSON.stringify(dataObject, null, 2));

  res
    .status(StatusCodes.OK)
    .json({ msg: `Data with ID ${id} deleted successfully` });
};

export { createData, getAllData, updateData, deleteData };
