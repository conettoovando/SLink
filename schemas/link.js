// Archivo para vincular a base de datos..
// trabajar al crear autenticación de usuarios.
import z from "zod";

const linkSchema = z.object({
  original_url: z.string().url({
    invalid_type_error: "Enlace invalido",
    required_error: "Es necesario un enlace para ser acordato",
  }),
});

export async function validateLink(input) {
  return linkSchema.safeParse(input);
}
