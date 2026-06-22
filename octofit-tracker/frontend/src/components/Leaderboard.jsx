import DataView from './CollectionView'
import { useCollectionUrl } from './collectionData'

function Leaderboard({ apiBaseUrl }) {
  const leaderboardUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : `${apiBaseUrl}/leaderboard/`
  const collection = useCollectionUrl(leaderboardUrl)

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