import { formErrorMessages } from '~/constants/formErrors'
import { FormProfileType, formProfileSchema } from './formSchema'
import { ZodError } from 'zod'

describe('formSchema Module', () => {
  describe('formProfileSchema', () => {
    it('should validate correctly when name is empty', () => {
      const data: FormProfileType = {
        name: '',
      }

      try {
        formProfileSchema.parse(data)
        fail('Validation should have failed')
      } catch (err) {
        expect((err as ZodError).issues[0].message).toEqual(
          formErrorMessages.nameRequired,
        )
      }
    })
    it('should validate correctly when only name is filled', () => {
      const data = {
        name: 'John Doe',
      }

      const result = formProfileSchema.safeParse(data)

      expect(result.success).toBe(true)
    })
    it('should validate correctly when all field is correctly filled', () => {
      const data = {
        name: 'John Doe',
        currentPassword: 'oldPassword',
        newPassword: 'newPassword123',
        confirmPassword: 'newPassword123',
      }

      const result = formProfileSchema.safeParse(data)

      expect(result.success).toBe(true)
    })
    it('should validate the newPw min length', () => {
      const data: FormProfileType = {
        name: 'John Snow',
        currentPassword: '123456',
        newPassword: '12345',
        confirmPassword: '12345',
      }

      try {
        formProfileSchema.parse(data)
        fail('Validation should have failed')
      } catch (err) {
        expect((err as ZodError).issues[0].message).toEqual(
          formErrorMessages.passwordMin6,
        )
        expect((err as ZodError).issues[0].path).toEqual(['newPassword'])
      }
    })

    it('should validate the newPw and confirmPW does not matches', () => {
      const data: FormProfileType = {
        name: 'John Snow',
        currentPassword: '123456',
        newPassword: '1234568',
        confirmPassword: '123457',
      }

      try {
        formProfileSchema.parse(data)
        fail('Validation should have failed')
      } catch (err) {
        expect((err as ZodError).issues[0].message).toEqual(
          formErrorMessages.passwordDoesNotMatch,
        )
        expect((err as ZodError).issues[0].path).toEqual(['confirmPassword'])
      }
    })

    describe('Pw fields filled partially', () => {
      it('should validate when only currentPW is filled', () => {
        //* Fill only currentPW
        try {
          formProfileSchema.parse({
            name: 'John Snow',
            currentPassword: '123456',
          } as FormProfileType)

          fail('Validation should have failed')
        } catch (err) {
          expect((err as ZodError).issues).toHaveLength(1)
          expect((err as ZodError).issues[0].message).toEqual(
            formErrorMessages.newPasswordRequired,
          )
          expect((err as ZodError).issues[0].path).toEqual(['newPassword'])
        }
      })
      it('should validate when only newPW is filled', () => {
        try {
          formProfileSchema.parse({
            name: 'John Snow',
            newPassword: '123456',
          } as FormProfileType)

          fail('Validation should have failed')
        } catch (err) {
          expect((err as ZodError).issues).toHaveLength(2)
          expect((err as ZodError).issues[0].message).toEqual(
            formErrorMessages.currentPasswordRequired,
          )
          expect((err as ZodError).issues[0].path).toEqual(['currentPassword'])

          expect((err as ZodError).issues[1].message).toEqual(
            formErrorMessages.passwordDoesNotMatch,
          )
          expect((err as ZodError).issues[1].path).toEqual(['confirmPassword'])
        }
      })
      it('should validate when only currentPW is filled', () => {
        try {
          formProfileSchema.parse({
            name: 'John Snow',
            currentPassword: '123456',
          } as FormProfileType)

          fail('Validation should have failed')
        } catch (err) {
          expect((err as ZodError).issues).toHaveLength(1)
          expect((err as ZodError).issues[0].message).toEqual(
            formErrorMessages.newPasswordRequired,
          )
          expect((err as ZodError).issues[0].path).toEqual(['newPassword'])
        }
      })
    })
  })
})
