import Link from 'next/link';

export default function HomePage() {
  return <>
    <section className="hero">
      <div>
        <span className="eyebrow">A practical energy toolkit</span>
        <h1>Make the next electricity decision with better numbers.</h1>
        <p className="hero-copy">Clear, browser-based calculators for households and small businesses exploring solar, bills, and everyday energy use.</p>
        <p style={{ marginTop: 26 }}><Link className="button" href="/solar-savings">Open Solar Savings Tracker <span aria-hidden="true">↗</span></Link></p>
      </div>
      <div className="hero-aside"><div className="hero-stat"><strong>2 tools</strong><span>for the questions that usually start with “what if?”</span></div></div>
      <div className="solar-sun" aria-hidden="true"><span className="sun-core" /><span className="sun-orbit sun-orbit-one" /><span className="sun-orbit sun-orbit-two" /></div>
    </section>
    <section>
      <div className="section-head"><div><span className="eyebrow">The toolbox</span><h2>Start with a real question.</h2></div><p>Simple inputs. Transparent formulas.</p></div>
      <div className="tool-grid">
        <article className="tool-card"><div><span className="eyebrow" style={{ color: '#f7d39a' }}>01 / Solar</span><h3>Solar Savings Tracker</h3><p>Compare old bills, projected no-solar costs, solar bills, and loan payback month by month.</p></div><Link className="card-link" href="/solar-savings">Open tracker →</Link></article>
        <article className="tool-card"><div><span className="eyebrow">02 / Home energy</span><h3>Appliances Calculator</h3><p>Turn wattage and habits into a useful estimate of monthly kWh and cost.</p></div><Link className="card-link" href="/appliances">Open calculator →</Link></article>
      </div>
    </section>
    <section className="note-band"><div><span className="eyebrow">Built for clarity</span><h3 style={{ marginTop: 8 }}>The math stays visible.</h3></div><p>These tools run in your browser and keep the formulas straightforward, so you can test assumptions, compare scenarios, and bring useful numbers to an installer conversation.</p></section>
    <section className="info-section">
      <div className="section-head"><div><span className="eyebrow">Field notes</span><h2>Better energy decisions start with better inputs.</h2></div><p>Useful context for using the tools well.</p></div>
      <div className="info-grid">
        <article><span className="info-number">01</span><h3>Start with a real bill</h3><p>Use the kWh and price per kWh from a recent electricity bill instead of relying on a monthly guess. A few accurate months will give you a more useful picture of seasonal changes.</p></article>
        <article><span className="info-number">02</span><h3>Separate use from price</h3><p>Electricity cost changes when consumption changes, but it also changes when the utility rate changes. Keeping those inputs separate makes a solar comparison easier to explain and audit.</p></article>
        <article><span className="info-number">03</span><h3>Test the quiet assumptions</h3><p>Solar output, loan terms, appliance schedules, and future rates are estimates. Try a conservative scenario as well as an optimistic one before making a purchase decision.</p></article>
      </div>
    </section>
    <section className="faq-section">
      <div><span className="eyebrow">Common questions</span><h2>What the numbers mean.</h2></div>
      <div className="faq-list">
        <details><summary>Are these calculators financial advice?</summary><p>No. They are planning tools that use the values you enter. Use the results to compare scenarios, then confirm system design, financing, and savings estimates with qualified professionals.</p></details>
        <details><summary>What does “no solar” mean?</summary><p>It is an estimate of what the bill could have been without solar, based on the consumption and electricity rate you enter. It is useful as a comparison baseline, not a guaranteed future bill.</p></details>
        <details><summary>Where does my calculator data go?</summary><p>Calculations run in the browser. The tools do not need an account, and the solar tracker can be extended to save a CSV locally on your device. Read the <Link href="/privacy-policy">Privacy Policy</Link> for more detail.</p></details>
      </div>
    </section>
  </>;
}
