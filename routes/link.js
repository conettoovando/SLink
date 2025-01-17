import { Router } from "express";
import { LinkController } from "../controller/link.js";

export const linkRoutes = Router();

linkRoutes.get("/", (req, res) => {
  res.send("pagina principal");
});
linkRoutes.post("/", LinkController.createUrl);
linkRoutes.get("/:id", LinkController.getShortLink);
