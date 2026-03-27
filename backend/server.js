import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import loggerMiddleware from "./middleware/logger.js";
import usersRouter from "./routes/users.js";

const app = express();
const port = process.env.PORT || 3001;

connectDB();

app.use(express.json());

app.use(loggerMiddleware);
app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
