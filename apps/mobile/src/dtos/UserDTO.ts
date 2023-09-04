import { z } from 'zod'

const userDTOSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  email: z.string().email(),
  avatar: z.string().nullable(),
})

type UserDTO = z.infer<typeof userDTOSchema>

export { userDTOSchema }
export type { UserDTO }
