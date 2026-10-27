import { getAllPublications } from '@/lib/publications'

function Authors({ authors }: { authors: string }) {
  const parts = authors.split(', ')
  return (
    <>
      {parts.map((name, i) => (
        <span key={name}>
          {name === 'Gia Khanh Nguyen' ? <strong>{name}</strong> : name}
          {i < parts.length - 1 ? ', ' : ''}
        </span>
      ))}
    </>
  )
}

const PublicationsSection = () => {
  const publications = getAllPublications()

  return (
    <ul className="plain">
      {publications.map((pub) => (
        <li key={pub.id}>
          {pub.title}. <Authors authors={pub.authors} />.{' '}
          <em>{pub.venue}</em>
          {pub.year ? `, ${pub.year}` : ''}.{' '}
          <span className="mono">
            {pub.link ? (
              <>
                [<a href={pub.link}>paper</a>]
              </>
            ) : (
              <span className="muted" title="coming soon">
                [paper] [code]
              </span>
            )}
            {pub.code ? (
              <>
                {' '}
                [<a href={pub.code}>code</a>]
              </>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default PublicationsSection
