import { client as redisClient } from '../../app.js'

export class LinkModel {
  static async getLink ({ id }) {
    const client = redisClient.getClient()
    try {
      const result = await client.get(id)
      return result
    } catch (error) {
      return null
    }
  }

  static async createUrl ({ id, input }) {
    const client = redisClient.getClient()

    const result = await client.set(id, JSON.stringify(input), {
      EX: 10 * 60
    })
    return result
  }
}
