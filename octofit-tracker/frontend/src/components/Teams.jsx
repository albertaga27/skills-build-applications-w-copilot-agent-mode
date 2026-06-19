import DataView from './CollectionView'
import { useCollection } from './collectionData'

function Teams({ apiBaseUrl }) {
  const collection = useCollection(apiBaseUrl, 'teams')

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