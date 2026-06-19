import DataView from './CollectionView'
import { formatValue, useCollection } from './collectionData'

function Users({ apiBaseUrl }) {
  const collection = useCollection(apiBaseUrl, 'users')

  return (
    <DataView
      title="Users"
      eyebrow="Profiles"
      {...collection}
      columns={[
        { key: 'displayName', label: 'Name' },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'team', label: 'Team', render: (user) => formatValue(user.team) },
      ]}
    />
  )
}

export default Users