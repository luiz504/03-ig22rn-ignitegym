import { renderWithNBNavProviders, screen } from '~/utils/test/test-utils'
import { MockedExercise } from '~/utils/test'

import { ExerciseCard, ExerciseCardSkeleton } from '.'

describe('ExerciseCard Component', () => {
  it('should render correctly', () => {
    renderWithNBNavProviders(<ExerciseCard exercise={MockedExercise} />)

    expect(screen.getByTestId('exercise-thumb').props.source).toEqual({
      uri: 'undefined/exercise/thumb/fake-thumb-url',
    })
    expect(screen.getByText(MockedExercise.name)).toBeTruthy()
    expect(
      screen.getByText(
        `${MockedExercise.series} sets x ${MockedExercise.repetitions} reps`,
      ),
    ).toBeTruthy()
  })
})
describe('ExerciseCard Skeleton Component', () => {
  it('should render correctly', () => {
    jest.useFakeTimers()
    renderWithNBNavProviders(<ExerciseCardSkeleton />)
    jest.clearAllTimers()
  })
})
