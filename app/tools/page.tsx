import Link from 'next/link'

const tools = [
  {
    title: 'Solar Savings Tracker',
    description:
      'Estimate your solar potential, compare energy costs, and turn sunlight into a clearer savings plan.',
    image: '/tools-solar.png',
    href: '/solar-savings',
    label: 'Open tracker',
  },
  {
    title: 'Appliances Calculator',
    description:
      'Build a simple appliance load list and understand how everyday usage shapes your electricity bill.',
    image: '/tools-appliances.png',
    href: '/appliances',
    label: 'Calculate usage',
  },
]

export const metadata = {
  title: 'Tools | Adaddi',
  description: 'Practical electricity tools for clearer energy decisions.',
}

export default function ToolsPage() {
  return (
    <div className="pb-6">
      <section className="grid grid-cols-[1.2fr_.8fr] items-end gap-16 border-y border-line py-14.5 max-[700px]:grid-cols-1 max-[700px]:gap-6 max-[700px]:py-10">
        <div>
          <span className="eyebrow">The Adaddi toolkit</span>
          <h1 className="mb-0 max-w-190">
            Make your next energy decision with better information.
          </h1>
        </div>
        <p className="mb-1 max-w-97.5 text-[1.02rem] text-muted">
          Straightforward calculators for the moments when electricity gets complicated. Explore a
          tool, add your numbers, and leave with a clearer view.
        </p>
      </section>

      <section className="tools-directory" aria-labelledby="tools-heading">
        <div className="flex items-end justify-between gap-5 px-0 pt-12 pb-5 max-[700px]:block">
          <div>
            <span className="eyebrow">Explore tools</span>
            <h2 className="mt-2.5" id="tools-heading">
              Useful by design.
            </h2>
          </div>
          <p className="mb-1 text-[.9rem] text-muted">{tools.length} tools available</p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[700px]:grid-cols-1">
          {tools.map((tool) => (
            <article
              className="group flex min-h-full flex-col overflow-hidden border border-line bg-panel"
              key={tool.href}
            >
              <div className="aspect-[1.55] overflow-hidden bg-[#e9dfcf]">
                <img
                  src={tool.image}
                  alt=""
                  className="block size-full object-cover transition-transform duration-300 group-hover:scale-[1.035]"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                <div>
                  <span className="font-mono text-[.68rem] uppercase tracking-[.08em] text-teal">
                    Interactive tool
                  </span>
                  <h3 className="my-2.5 text-[1.35rem]">{tool.title}</h3>
                  <p className="mb-0 text-[.9rem] text-muted">{tool.description}</p>
                </div>
                <Link
                  className="inline-block self-start rounded-md bg-orange px-3.25 py-2.25 text-[.8rem] font-bold text-white hover:brightness-95"
                  href={tool.href}
                >
                  {tool.label} <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
