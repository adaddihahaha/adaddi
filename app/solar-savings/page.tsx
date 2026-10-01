import { SolarTracker } from '@/components/solar-tracker'

export default function SolarSavingsPage() {
  return (
    <>
      <section className="border-y border-line py-10.5 pb-8.5">
        <span className="eyebrow">Tool 01 / Solar</span>
        <h1 className="my-3.5 mb-4.5 text-[clamp(2.6rem,6vw,5rem)] leading-[.95] tracking-[-.075em]">
          Does solar pay for itself?
        </h1>
        <p className="mb-0 text-[1.05rem] text-muted">
          Compare your old bills, your solar bills, and the cost of staying on the grid over time.
        </p>
      </section>
      <SolarTracker />
    </>
  )
}
