import { ExerciseDTO } from '~/dtos/ExerciseDTO'
import { UserDTO } from '~/dtos/UserDTO'

export const MockedUser: UserDTO = {
  id: 300,
  email: 'john@example.com',
  name: 'John Doe',
  avatar: 'avatar:url',
} as const

export const MockedGroups = [
  'Fake Group',
  'Fake Group1',
  'Fake Group2',
  'Fake Group3',
]

export const MockedExercise: ExerciseDTO = {
  id: 1,
  demo: 'fake-demo-url',
  group: 'Fake Group',
  name: 'Fake Name',
  repetitions: 12,
  series: 3,
  thumb: 'fake-thumb-url',
}

export const MockedExercises: ExerciseDTO[] = [
  {
    id: 1,
    demo: 'fake-demo-url-1',
    group: 'Fake Group',
    name: 'Fake Name 1',
    repetitions: 12,
    series: 3,
    thumb: 'fake-thumb-url-1',
  },
  {
    id: 2,
    demo: 'fake-demo-url-2',
    group: 'Fake Group',
    name: 'Fake Name 2',
    repetitions: 12,
    series: 3,
    thumb: 'fake-thumb-url-2',
  },
  {
    id: 3,
    demo: 'fake-demo-url-3',
    group: 'Fake Group',
    name: 'Fake Name 3',
    repetitions: 12,
    series: 3,
    thumb: 'fake-thumb-url-3',
  },
]
