import DataView from './CollectionView'
import { useCollection } from './collectionData'

function Leaderboard({ apiBaseUrl }) {
  const collection = useCollection(apiBaseUrl, 'leaderboard')

  return (
    <DataView
      title="Leaderboard"
      eyebrow="Competition"
      {...collection}
      columns={[
        { key: 'rank', label: 'Rank' },
        { key: 'user', label: 'User', render: (entry) => entry.user?.displayName || entry.user?.username || 'Unknown' },
        { key: 'score', label: 'Score' },
      ]}
    />
  )
}

export default Leaderboard