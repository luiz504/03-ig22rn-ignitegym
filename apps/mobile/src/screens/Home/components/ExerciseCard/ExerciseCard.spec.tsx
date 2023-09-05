import { render } from '~/utils/test/test-utils'
import { ExerciseCard } from '.'
import { ExerciseDTO } from '~/dtos/ExerciseDTO'

describe('ExerciseCard Component', () => {
  const mockExercise: ExerciseDTO = {
    id: 1,
    demo: 'someDemoUrl',
    group: 'Back',
    name: 'Front row',
    repetitions: 12,
    series: 3,
    thumb: 'thumbUrl',
  }
  it('should render correctly', () => {
    render(<ExerciseCard exercise={mockExercise} />)
  })
})
