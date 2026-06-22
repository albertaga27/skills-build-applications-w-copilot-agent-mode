import { formatValue } from './collectionData'

function DataView({ title, eyebrow, status, error, items, columns }) {
  if (status === 'loading') {
    return <p className="surface-note">Loading {title.toLowerCase()}...</p>
  }

  if (status === 'error') {
    return <p className="surface-note text-danger">{error}</p>
  }

  return (
    <section className="data-surface" aria-labelledby={`${title.toLowerCase()}-heading`}>
      <div className="surface-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id={`${title.toLowerCase()}-heading`}>{title}</h1>
        </div>
        <span className="count-pill">{items.length}</span>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              {columns.map((column) => (
                <th scope="col" key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id || item.id}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render ? column.render(item) : formatValue(item[column.key])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default DataView