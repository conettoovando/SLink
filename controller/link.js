import { LinkModel } from "../models/redis/link.js";
import { validateLink } from "../schemas/link.js";
import { alterUrl } from "../utils/alertUrl.js";

export class LinkController {
  static async getShortLink(req, res) {
    const { id } = req.params;
    const { original_url } = JSON.parse(await LinkModel.getLink({ id }));
    res.redirect(original_url);
  }

  static async createUrl(req, res) {
    const result = await validateLink(req.body);

    if (!result.success) {
      res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { original_url } = result.data;
    const { id: newId, url: newUrl } = await alterUrl(original_url);

    const jsonData = {
      id: newId,
      original_url: original_url,
      short_url: newUrl,
    };

    const createResult = await LinkModel.createUrl({
      id: newId,
      input: jsonData,
    });

    if (createResult !== "OK")
      return res.status(400).json({ message: "Error al generar el enlace" });

    res.json(jsonData);
  }
}
