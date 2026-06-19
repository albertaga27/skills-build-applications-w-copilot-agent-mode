import DataView from './CollectionView'
import { useCollection } from './collectionData'

function Workouts({ apiBaseUrl }) {
  const collection = useCollection(apiBaseUrl, 'workouts')

  return (
    <DataView
      title="Workouts"
      eyebrow="Suggestions"
      {...collection}
      columns={[
        { key: 'title', label: 'Workout' },
        { key: 'level', label: 'Level' },
        { key: 'durationMinutes', label: 'Minutes' },
        { key: 'exercises', label: 'Exercises', render: (workout) => workout.exercises?.join(', ') || 'Not set' },
      ]}
    />
  )
}

export default Workouts