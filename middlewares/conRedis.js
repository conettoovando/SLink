import { createClient } from 'redis'

export default class RedisClient {
  constructor () {
    this.redisClient = createClient({
      url: process.env.REDIS_SERVER
    })

    this.redisClient.on('error', (err) => {
      console.log('Redis Client Error', err)
    })
  }

  async initializeClientMethod () {
    if (!this.redisClient.isOpen) {
      try {
        await this.redisClient.connect()
      } catch (error) {
        console.log(error)
      }
    }
  }

  getClient () {
    return this.redisClient
  }
}
