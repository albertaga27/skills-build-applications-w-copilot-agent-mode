import { useEffect, useState } from 'react'

function normalizeCollection(response) {
  if (Array.isArray(response)) {
    return response
  }

  return response?.results || response?.items || response?.data || response?.docs || []
}

export function formatValue(value) {
  if (value && typeof value === 'object') {
    return value.displayName || value.name || value.username || value.title || value._id || 'Linked record'
  }

  return value || 'Not set'
}

export function useCollectionUrl(collectionUrl) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      try {
        setStatus('loading')
        const response = await fetch(collectionUrl, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setItems(normalizeCollection(data))
        setStatus('ready')
      } catch (requestError) {
        if (requestError.name === 'AbortError') {
          return
        }

        setError(requestError.message)
        setStatus('error')
      }
    }

    loadItems()

    return () => controller.abort()
  }, [collectionUrl])

  return { items, status, error }
}

export function useCollection(apiBaseUrl, resourceName) {
  return useCollectionUrl(`${apiBaseUrl}/${resourceName}/`)
}
