import DataView from './CollectionView'
import { useCollectionUrl } from './collectionData'

function Activities({ apiBaseUrl }) {
  const activitiesUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : `${apiBaseUrl}/activities/`
  const collection = useCollectionUrl(activitiesUrl)

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