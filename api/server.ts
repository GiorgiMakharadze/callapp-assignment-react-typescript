import express from "express";
import "express-async-errors";
import helmet from "helmet";
import path from "path";
import xss from "xss-clean";
import dataRoutes from "./routes/dataRoutes";
import { notFoundMiddleware, errorHandlerMiddleware } from "./middleware/";

const app = express();
const port = process.env.PORT || 5000;
const __dirnames = path.resolve();

//middleware & security
app.use(express.json());
app.use(helmet());
app.use(xss());

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "worker-src 'self' blob:");
  next();
});

app.use(express.static(path.resolve("../build")));

//routes
app.use("/api/v1/data", dataRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirnames, "../build", "index.html"));
});

// error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});
