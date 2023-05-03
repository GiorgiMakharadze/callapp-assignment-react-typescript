import express, { Request, Response } from "express";
import "express-async-errors";
import dataRoutes from "./routes/dataRoutes";
import { notFoundMiddleware, errorHandlerMiddleware } from "./middleware/";

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());

//routes
app.use("/api/v1/data", dataRoutes);

// error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});
