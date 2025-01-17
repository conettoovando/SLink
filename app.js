import express, { json } from "express";
import { linkRoutes } from "./routes/link.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(json());

app.use("/", linkRoutes);

const PORT = process.env.SERVER_PORT ?? 1234;

app.listen(PORT, () => {
  console.log("Server listening on http://localhost:" + PORT);
});
