export default function AboutPage() {
  return (
    <article className="w-full border-t border-line pt-12.5">
      <span className="eyebrow">About Adaddi</span>
      <h1 className="mt-3.5 mb-6 text-[3.8rem] leading-[.95] tracking-[-.075em] max-[700px]:text-5xl">
        Useful numbers, without the fog.
      </h1>
      <p>
        Adaddi is a focused collection of calculators and utilities for electricity and solar
        planning. The goal is simple: help you test a scenario quickly, understand the arithmetic,
        and make a better-informed next move.
      </p>
      <section className="mt-9.5">
        <h2>What we do</h2>
        <p>
          Our tools estimate monthly bills, compare solar scenarios, model payback, and translate
          everyday appliance habits into energy use. Everything is designed to run in your browser.
        </p>
      </section>
      <section className="mt-9.5">
        <h2>Methodology</h2>
        <p>
          Calculations use straightforward arithmetic such as kWh × price per kWh. Results are for
          planning only and should not replace a professional system design or installer quote.
        </p>
      </section>
      <section className="mt-9.5">
        <h2>Contact</h2>
        <p>
          Feedback and partnership inquiries:{' '}
          <a
            className="text-teal underline underline-offset-3"
            href="mailto:adaddi.hahaha@gmail.com"
          >
            adaddi.hahaha@gmail.com
          </a>
        </p>
      </section>
    </article>
  )
}
