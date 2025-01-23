import { LinkModel } from '../models/redis/link.js'
import { validateLink } from '../schemas/link.js'
import { alterUrl } from '../utils/alertUrl.js'

export class LinkController {
  static async getShortLink (req, res) {
    try {
      const { id } = req.params
      const result = await LinkModel.getLink({ id })
      if (!result) {
        return res.status(404).json({
          status: 404,
          message: 'Link not found try with a validate link'
        })
      }

      const { original_url: originalUrl } = JSON.parse(result)

      return res.redirect(originalUrl)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async createUrl (req, res) {
    try {
      const result = await validateLink(req.body)

      if (!result.success) {
        res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const { original_url: originalUrl } = result.data
      const { id: newId, url: newUrl } = await alterUrl(originalUrl)

      const jsonData = {
        id: newId,
        original_url: originalUrl,
        short_url: newUrl
      }

      const createResult = await LinkModel.createUrl({
        id: newId,
        input: jsonData
      })

      if (createResult !== 'OK') { return res.status(400).json({ message: 'Error to create link' }) }

      res.json(jsonData)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
