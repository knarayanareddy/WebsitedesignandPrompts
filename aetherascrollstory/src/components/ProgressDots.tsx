type Props = {
  ids: string[]
  active: string
}

/**
 * Side progress rail. mix-blend-difference keeps the dots legible on both
 * white chapters and the dark night chapter.
 */
export default function ProgressDots({ ids, active }: Props) {
  return (
    <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 mix-blend-difference md:right-8 lg:flex">
      {ids.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={`chapter ${id}`}
          className={`rounded-full bg-white transition-all duration-500 ${
            active === id ? 'h-6 w-1.5' : 'h-1.5 w-1.5 opacity-40 hover:opacity-80'
          }`}
        />
      ))}
    </div>
  )
}
