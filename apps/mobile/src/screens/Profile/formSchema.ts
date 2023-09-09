import { z } from 'zod'
import { formErrorMessages } from '~/constants/formErrors'

const pwSchema = z.string().min(6, { message: formErrorMessages.passwordMin6 })

export const formProfileSchema = z
  .object({
    name: z
      .string({ required_error: formErrorMessages.nameRequired })
      .nonempty({ message: formErrorMessages.nameRequired }),
    currentPassword: z
      .string({
        required_error: formErrorMessages.currentPasswordRequired,
      })
      .optional(),
    newPassword: z
      .string({
        required_error: formErrorMessages.newPasswordRequired,
      })
      .optional(),
    confirmPassword: z
      .string({
        required_error: formErrorMessages.confirmPasswordRequired,
      })
      .optional(),
  })
  .superRefine(({ currentPassword, newPassword, confirmPassword }, ctx) => {
    if (currentPassword || newPassword || confirmPassword) {
      !currentPassword &&
        ctx.addIssue({
          code: 'custom',
          message: formErrorMessages.currentPasswordRequired,
          path: ['currentPassword'],
        })
      !newPassword &&
        ctx.addIssue({
          code: 'custom',
          message: formErrorMessages.newPasswordRequired,
          path: ['newPassword'],
        })

      if (newPassword) {
        const result = pwSchema.safeParse(newPassword)

        if (!result.success) {
          ctx.addIssue({
            code: 'custom',
            message: result.error.issues[0].message,
            path: ['newPassword'],
          })
        }
      }

      newPassword !== confirmPassword &&
        ctx.addIssue({
          code: 'custom',
          message: formErrorMessages.passwordDoesNotMatch,
          path: ['confirmPassword'],
        })
    }
  })

export type FormProfileType = z.infer<typeof formProfileSchema>
