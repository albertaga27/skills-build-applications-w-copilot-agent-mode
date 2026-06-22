import DataView from './CollectionView'
import { useCollectionUrl } from './collectionData'

function Teams({ apiBaseUrl }) {
  const teamsUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : `${apiBaseUrl}/teams/`
  const collection = useCollectionUrl(teamsUrl)

  return (
    <DataView
      title="Teams"
      eyebrow="Groups"
      {...collection}
      columns={[
        { key: 'name', label: 'Team' },
        { key: 'description', label: 'Description' },
        { key: 'members', label: 'Members', render: (team) => team.members?.length || 0 },
      ]}
    />
  )
}

export default Teams