import { ExerciseDTO } from '~/dtos/ExerciseDTO'
import { HistoryByDayDTO } from '~/dtos/HistoryByDayDTO'
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

export const MockedHistoriesByDay: HistoryByDayDTO[] = [
  {
    title: '07.10.2023',
    data: [
      {
        id: 12,
        name: 'Rosca punho',
        group: 'antebraço',
        created_at: '2023-09-07 14:55:15',
        hour: '14:55',
      },
      {
        id: 11,
        name: 'Rosca deitada',
        group: 'antebraço',
        created_at: '2023-09-07 14:45:15',
        hour: '14:55',
      },
    ],
  },
  {
    title: '07.09.2023',
    data: [
      {
        id: 13,
        name: 'Rosca direta',
        group: 'antebraço',
        created_at: '2023-09-07 15:00:15',
        hour: '15:00',
      },
    ],
  },
]

export const MockedHistory = MockedHistoriesByDay[0].data[0]
