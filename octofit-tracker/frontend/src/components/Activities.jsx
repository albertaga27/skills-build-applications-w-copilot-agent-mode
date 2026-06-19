import DataView from './CollectionView'
import { useCollection } from './collectionData'

function Activities({ apiBaseUrl }) {
  const collection = useCollection(apiBaseUrl, 'activities')

  return (
    <DataView
      title="Activities"
      eyebrow="Training log"
      {...collection}
      columns={[
        { key: 'type', label: 'Activity' },
        { key: 'user', label: 'User', render: (activity) => activity.user?.displayName || activity.user?.username || 'Unknown' },
        { key: 'durationMinutes', label: 'Minutes' },
        { key: 'calories', label: 'Calories' },
      ]}
    />
  )
}

export default Activities