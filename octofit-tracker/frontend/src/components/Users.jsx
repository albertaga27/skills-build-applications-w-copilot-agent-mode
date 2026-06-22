import DataView from './CollectionView'
import { formatValue, useCollectionUrl } from './collectionData'

function Users({ apiBaseUrl }) {
  const usersUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : `${apiBaseUrl}/users/`
  const collection = useCollectionUrl(usersUrl)

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