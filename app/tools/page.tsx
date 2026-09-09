import Link from 'next/link';

const tools = [
  {
    title: 'Solar Savings Tracker',
    description: 'Estimate your solar potential, compare energy costs, and turn sunlight into a clearer savings plan.',
    image: '/tools-solar.png',
    href: '/solar-savings',
    label: 'Open tracker',
  },
  {
    title: 'Appliances Calculator',
    description: 'Build a simple appliance load list and understand how everyday usage shapes your electricity bill.',
    image: '/tools-appliances.png',
    href: '/appliances',
    label: 'Calculate usage',
  },
];

export const metadata = {
  title: 'Tools | Adaddi',
  description: 'Practical electricity tools for clearer energy decisions.',
};

export default function ToolsPage() {
  return (
    <div className="tools-page">
      <section className="tools-hero">
        <div>
          <span className="eyebrow">The Adaddi toolkit</span>
          <h1>Make your next energy decision with better information.</h1>
        </div>
        <p className="tools-intro">
          Straightforward calculators for the moments when electricity gets complicated. Explore a tool, add your numbers, and leave with a clearer view.
        </p>
      </section>

      <section className="tools-directory" aria-labelledby="tools-heading">
        <div className="section-head tools-section-head">
          <div>
            <span className="eyebrow">Explore tools</span>
            <h2 id="tools-heading">Useful by design.</h2>
          </div>
          <p>{tools.length} tools available</p>
        </div>
        <div className="tools-directory-grid">
          {tools.map((tool) => (
            <article className="directory-card" key={tool.href}>
              <div className="directory-image-wrap">
                <img src={tool.image} alt="" className="directory-image" />
              </div>
              <div className="directory-card-body">
                <div>
                  <span className="directory-kicker">Interactive tool</span>
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                </div>
                <Link className="button button-small directory-link" href={tool.href}>
                  {tool.label} <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
