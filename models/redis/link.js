import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

async function connect() {
  if (!client.isOpen) {
    await client.connect();
    console.log("coneccion a redis establecida");
  }
}
await connect();

export class LinkModel {
  static async getLink({ id }) {
    try {
      const result = client.get(id);
      return result;
    } catch (error) {
      return null;
    }
  }

  static async createUrl({ id, input }) {
    const result = await client.set(id, JSON.stringify(input), {
      EX: 10 * 60,
    });
    return result;
  }
}
