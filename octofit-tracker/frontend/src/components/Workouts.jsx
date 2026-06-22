import DataView from './CollectionView'
import { useCollectionUrl } from './collectionData'

function Workouts({ apiBaseUrl }) {
  const workoutsUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : `${apiBaseUrl}/workouts/`
  const collection = useCollectionUrl(workoutsUrl)

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