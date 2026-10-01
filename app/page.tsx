import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <section className="hero relative grid grid-cols-[1.15fr_.85fr] items-end gap-17.5 border-y border-line py-18 pb-17 max-[700px]:block max-[700px]:py-12 max-[700px]:pt-10">
        <div className="relative z-1">
          <span className="eyebrow">A practical energy toolkit</span>
          <h1 className="my-3.5 mb-6 text-[clamp(2.8rem,6vw,5.8rem)] leading-[.95] tracking-[-.075em]">
            Make the next electricity decision with better numbers.
          </h1>
          <p className="mb-6 max-w-120 text-[1.04rem] text-muted">
            Clear, browser-based calculators for households and small businesses exploring solar,
            bills, and everyday energy use.
          </p>
          <p className="mt-6.5">
            <Link
              className="inline-block cursor-pointer rounded-md bg-orange px-4.25 py-3 font-bold text-white hover:brightness-95"
              href="/solar-savings"
            >
              Open Solar Savings Tracker <span aria-hidden="true">↗</span>
            </Link>
          </p>
        </div>
        <div className="hero-aside relative z-1 min-h-75 overflow-hidden border-l-3 border-orange py-3.5 pl-5.5 max-[700px]:mt-9.5 max-[700px]:min-h-40">
          <div className="hero-stat absolute bottom-12.5 left-5.5 z-1 max-[700px]:bottom-6">
            <strong className="block text-[2.8rem] tracking-[-.08em]">2 tools</strong>
            <span className="text-[.86rem] text-muted">
              for the questions that usually start with “what if?”
            </span>
          </div>
        </div>
        <div className="solar-sun" aria-hidden="true">
          <span className="sun-core" />
          <span className="sun-orbit sun-orbit-one" />
          <span className="sun-orbit sun-orbit-two" />
        </div>
      </section>
      <section>
        <div className="flex items-end justify-between gap-5 px-0 pt-10.5 pb-5 max-[700px]:block">
          <div>
            <span className="eyebrow">The toolbox</span>
            <h2>Start with a real question.</h2>
          </div>
          <p className="mb-1 text-[.9rem] text-muted">Simple inputs. Transparent formulas.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
          <article className="flex min-h-52.5 flex-col justify-between border border-line bg-teal p-6.5 text-panel first:[&_p]:text-[#d1e8df]">
            <div>
              <span className="eyebrow text-[#f7d39a]">01 / Solar</span>
              <h3>Solar Savings Tracker</h3>
              <p className="max-w-97.5 text-[#d1e8df]">
                Compare old bills, projected no-solar costs, solar bills, and loan payback month by
                month.
              </p>
            </div>
            <Link className="text-[.86rem] font-bold" href="/solar-savings">
              Open tracker →
            </Link>
          </article>
          <article className="flex min-h-52.5 flex-col justify-between border border-line bg-panel p-6.5">
            <div>
              <span className="eyebrow">02 / Home energy</span>
              <h3>Appliances Calculator</h3>
              <p className="max-w-97.5 text-muted">
                Turn wattage and habits into a useful estimate of monthly kWh and cost.
              </p>
            </div>
            <Link className="text-[.86rem] font-bold" href="/appliances">
              Open calculator →
            </Link>
          </article>
        </div>
      </section>
      <section className="mt-4 flex justify-between gap-7.5 bg-[#e9dfcf] p-6 max-[700px]:block">
        <div>
          <span className="eyebrow">Built for clarity</span>
          <h3 className="mt-2">The math stays visible.</h3>
        </div>
        <p className="mb-0 max-w-162.5 text-muted">
          These tools run in your browser and keep the formulas straightforward, so you can test
          assumptions, compare scenarios, and bring useful numbers to an installer conversation.
        </p>
      </section>
      <section className="mt-16 border-t border-line pt-2.5 max-[700px]:mt-12">
        <div className="flex items-end justify-between gap-5 px-0 pt-10.5 pb-5 max-[700px]:block">
          <div>
            <span className="eyebrow">Field notes</span>
            <h2>Better energy decisions start with better inputs.</h2>
          </div>
          <p className="mb-1 text-[.9rem] text-muted">Useful context for using the tools well.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-[700px]:grid-cols-1 max-[700px]:gap-0">
          <article className="border-t-[3px] border-teal py-6 max-[700px]:py-5">
            <span className="font-mono text-sm text-muted">01</span>
            <h3 className="my-6">Start with a real bill</h3>
            <p className="max-w-85 text-sm text-muted">
              Use the kWh and price per kWh from a recent electricity bill instead of relying on a
              monthly guess. A few accurate months will give you a more useful picture of seasonal
              changes.
            </p>
          </article>
          <article className="border-t-[3px] border-orange py-6 max-[700px]:py-5">
            <span className="font-mono text-sm text-muted">02</span>
            <h3 className="my-6">Separate use from price</h3>
            <p className="max-w-85 text-sm text-muted">
              Electricity cost changes when consumption changes, but it also changes when the
              utility rate changes. Keeping those inputs separate makes a solar comparison easier to
              explain and audit.
            </p>
          </article>
          <article className="border-t-[3px] border-yellow py-6 max-[700px]:py-5">
            <span className="font-mono text-sm text-muted">03</span>
            <h3 className="my-6">Test the quiet assumptions</h3>
            <p className="max-w-85 text-sm text-muted">
              Solar output, loan terms, appliance schedules, and future rates are estimates. Try a
              conservative scenario as well as an optimistic one before making a purchase decision.
            </p>
          </article>
        </div>
      </section>
      <section className="mt-10.5 grid grid-cols-[.7fr_1.3fr] gap-17.5 border-t border-line pt-10.5 max-[700px]:block max-[700px]:mt-8 max-[700px]:pt-8">
        <div>
          <span className="eyebrow">Common questions</span>
          <h2 className="mt-3">What the numbers mean.</h2>
        </div>
        <div className="max-[700px]:mt-7">
          <details className="border-t border-line py-4.25 first:border-t last:border-b">
            <summary className="cursor-pointer font-semibold">
              Are these calculators financial advice?
            </summary>
            <p className="my-3 max-w-162.5 text-sm text-muted">
              No. They are planning tools that use the values you enter. Use the results to compare
              scenarios, then confirm system design, financing, and savings estimates with qualified
              professionals.
            </p>
          </details>
          <details className="border-t border-line py-4.25 last:border-b">
            <summary className="cursor-pointer font-semibold">What does “no solar” mean?</summary>
            <p className="my-3 max-w-162.5 text-sm text-muted">
              It is an estimate of what the bill could have been without solar, based on the
              consumption and electricity rate you enter. It is useful as a comparison baseline, not
              a guaranteed future bill.
            </p>
          </details>
          <details className="border-t border-line py-4.25 last:border-b">
            <summary className="cursor-pointer font-semibold">
              Where does my calculator data go?
            </summary>
            <p className="my-3 max-w-162.5 text-sm text-muted">
              Calculations run in the browser. The tools do not need an account, and the solar
              tracker can be extended to save a CSV locally on your device. Read the{' '}
              <Link className="text-teal underline underline-offset-[3px]" href="/privacy-policy">
                Privacy Policy
              </Link>{' '}
              for more detail.
            </p>
          </details>
        </div>
      </section>
    </>
  )
}
