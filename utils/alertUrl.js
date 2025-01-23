export async function alterUrl () {
  const id = crypto.randomUUID().slice(-6)
  const url = `${process.env.SERVER_URL}/${id}`
  return { id, url }
}
