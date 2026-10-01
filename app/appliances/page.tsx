import { ApplianceCalculator } from '@/components/appliance-calculator'

export default function AppliancesPage() {
  return (
    <>
      <section className="border-y border-line py-10.5 pb-8.5">
        <span className="eyebrow">Tool 02 / Home energy</span>
        <h1 className="my-3.5 mb-4.5 text-[clamp(2.6rem,6vw,5rem)] leading-[.95] tracking-[-.075em]">
          What is the house really using?
        </h1>
        <p className="mb-0 text-[1.05rem] text-muted">
          Build a quick monthly estimate from appliance wattage and your everyday routine.
        </p>
      </section>
      <ApplianceCalculator />
    </>
  )
}
