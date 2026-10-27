import Image from 'next/image'

export type Project = {
  title: string
  summary: string
  when: string
  image?: string
  links: { label: string; href?: string }[]
}

export function ProjectCard(project: Project) {
  const href = project.links[0]?.href

  return (
    <li className="post-item">
      <a className="post-item-thumb" href={href} tabIndex={-1} aria-hidden="true">
        {project.image ? (
          <Image src={project.image} alt="" fill sizes="72px" loading="eager" />
        ) : null}
      </a>
      <div>
        <a className="post-item-title" href={href}>
          {project.title}
        </a>
        <div className="post-item-meta">
          {project.when} · {project.summary}
        </div>
        <div className="mono">
          {project.links.map((link, i) => (
            <span key={link.label}>
              {i > 0 ? ' ' : ''}[
              {link.href ? (
                <a href={link.href}>{link.label}</a>
              ) : (
                <span className="muted" title="coming soon">
                  {link.label}
                </span>
              )}
              ]
            </span>
          ))}
        </div>
      </div>
    </li>
  )
}
