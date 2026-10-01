'use client'

import { useState } from 'react'

type Appliance = { name: string; watts: number; hours: number; days: number }
const peso = (value: number) =>
  `₱${value.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export function ApplianceCalculator() {
  const [items, setItems] = useState<Appliance[]>([])
  const [name, setName] = useState('')
  const [watts, setWatts] = useState('')
  const [hours, setHours] = useState('')
  const [days, setDays] = useState('30')
  const [rate, setRate] = useState('10')
  const add = () => {
    if (!watts || !hours) return
    setItems([
      ...items,
      {
        name: name || 'Appliance',
        watts: Number(watts),
        hours: Number(hours),
        days: Number(days) || 30,
      },
    ])
    setName('')
    setWatts('')
    setHours('')
  }
  const totals = items.reduce((sum, item) => sum + (item.watts * item.hours * item.days) / 1000, 0)
  return (
    <div className="mt-4.5 grid gap-4 min-[851px]:grid-cols-[.8fr_1.2fr]">
      <section className="border border-line bg-panel p-6.5 max-[700px]:px-4 max-[700px]:py-5">
        <div className="mb-5.5">
          <span className="eyebrow">Inputs</span>
          <h2 className="my-2">Add an appliance</h2>
        </div>
        <div className="mb-4.5 grid grid-cols-2 gap-3.5 max-[700px]:grid-cols-1">
          <label className="grid gap-1.5 font-mono text-[.7rem] uppercase text-muted">
            Name
            <input
              className="w-full rounded-[5px] border border-line bg-[#f8f4ec] px-2.75 py-2.5 text-ink outline-none focus:border-teal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Refrigerator"
            />
          </label>
          <label className="grid gap-1.5 font-mono text-[.7rem] uppercase text-muted">
            Watts
            <input
              className="w-full rounded-[5px] border border-line bg-[#f8f4ec] px-2.75 py-2.5 text-ink outline-none focus:border-teal"
              type="number"
              value={watts}
              onChange={(e) => setWatts(e.target.value)}
              placeholder="800"
            />
          </label>
          <label className="grid gap-1.5 font-mono text-[.7rem] uppercase text-muted">
            Hours/day
            <input
              className="w-full rounded-[5px] border border-line bg-[#f8f4ec] px-2.75 py-2.5 text-ink outline-none focus:border-teal"
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="8"
            />
          </label>
          <label className="grid gap-1.5 font-mono text-[.7rem] uppercase text-muted">
            Days/month
            <input
              className="w-full rounded-[5px] border border-line bg-[#f8f4ec] px-2.75 py-2.5 text-ink outline-none focus:border-teal"
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </label>
        </div>
        <button
          className="inline-block cursor-pointer rounded-md bg-orange px-4.25 py-3 font-bold text-white hover:brightness-95"
          onClick={add}
        >
          Add appliance +
        </button>
        <label className="mt-5.5 grid max-w-55 gap-1.5 font-mono text-[.7rem] uppercase text-muted">
          Electricity rate (₱/kWh)
          <input
            className="w-full rounded-[5px] border border-line bg-[#f8f4ec] px-2.75 py-2.5 text-ink outline-none focus:border-teal"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </label>
      </section>
      <section className="min-w-0 border border-line bg-panel p-6.5 max-[700px]:px-4 max-[700px]:py-5">
        <div className="mb-5.5">
          <span className="eyebrow">Your list</span>
          <h2 className="my-2">Monthly estimate</h2>
        </div>
        {items.length === 0 ? (
          <p className="py-6 text-[.9rem] text-muted">
            No appliances yet. Add one above to see the estimate.
          </p>
        ) : (
          <div className="mb-5 overflow-x-auto">
            <table className="w-full border-collapse text-[.78rem]">
              <thead>
                <tr>
                  <th>Appliance</th>
                  <th>kWh/mo</th>
                  <th>Cost/mo</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const kwh = (item.watts * item.hours * item.days) / 1000
                  return (
                    <tr key={`${item.name}-${index}`}>
                      <td>{item.name}</td>
                      <td>{kwh.toFixed(2)}</td>
                      <td>{peso(kwh * Number(rate || 0))}</td>
                      <td>
                        <button
                          className="cursor-pointer border-0 bg-transparent text-[.75rem] text-orange"
                          onClick={() => setItems(items.filter((_, i) => i !== index))}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex items-center gap-4.5 border-t-2 border-teal pt-4.5 text-[.82rem] max-[700px]:flex-wrap max-[700px]:gap-2">
          <span>Total estimated use</span>
          <strong className="ml-auto max-[700px]:ml-0 max-[700px]:w-full">
            {totals.toFixed(2)} kWh / month
          </strong>
          <b className="text-[1.1rem] text-teal">{peso(totals * Number(rate || 0))}</b>
        </div>
      </section>
    </div>
  )
}
