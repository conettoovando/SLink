export async function alterUrl() {
  const id = crypto.randomUUID().slice(-6);
  const url = `${process.env.BASE_URL}:${process.env.SERVER_PORT}/${id}`;
  return { id, url };
}
