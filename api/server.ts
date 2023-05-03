import express, { Request, Response } from "express";
import "express-async-errors";
import dataRoutes from "../api//routes/dataRoutes";

const app = express();
const port = process.env.PORT || 5000;

//routes
app.use("/api/v1", dataRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});
