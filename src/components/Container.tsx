import clsx from 'clsx'

export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={clsx(className, 'mx-auto max-w-[640px] px-4')}>
      {children}
    </div>
  )
}
