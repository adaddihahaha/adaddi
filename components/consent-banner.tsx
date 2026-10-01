'use client'

import { useState } from 'react'

export function ConsentBanner() {
  const [visible, setVisible] = useState(true)
  const [manage, setManage] = useState(false)
  if (!visible) return null
  return (
    <aside
      className="fixed bottom-4 left-4 right-4 z-10 flex w-[calc(100%-32px)] items-center justify-between gap-5.5 bg-ink px-5 py-4.25 text-[.86rem] text-panel shadow-[0_10px_30px_#17231f35] max-[700px]:block max-[420px]:w-[calc(100%-20px)] max-[420px]:p-3.75"
      aria-label="Cookie preferences"
    >
      <div className="max-w-[72%] text-[#becbc3] max-[700px]:max-w-none">
        <strong>We use cookies and ads</strong>
        <p className="mb-0 mt-1 text-[.77rem] text-[#becbc3]">
          We and our partners use cookies to personalize content and ads. Choose "Consent" to allow
          personalized ads, or "Manage options" to set preferences.
        </p>
      </div>
      <div className="flex items-center whitespace-nowrap max-[700px]:mt-3 max-[420px]:block">
        <button
          className="cursor-pointer rounded-md border border-[#becbc3] bg-transparent px-3 py-2.25 font-bold text-panel hover:bg-[#31443d] max-[420px]:block mr-2"
          onClick={() => setManage(!manage)}
        >
          Manage options
        </button>
        <button
          className="inline-block cursor-pointer rounded-md border border-orange bg-orange px-3.25 py-2.25 text-[.8rem] font-bold text-white hover:brightness-95"
          onClick={() => setVisible(false)}
        >
          Consent
        </button>
      </div>
      {manage && (
        <div className="absolute bottom-17.5 left-5 right-5 flex items-center justify-between border border-line bg-panel p-3.5 text-ink max-[700px]:bottom-23">
          <label className="flex items-center gap-2 font-sans text-[.8rem] normal-case text-ink">
            <input className="size-4" type="checkbox" defaultChecked /> Allow personalized ads
          </label>
          <button
            className="inline-block cursor-pointer rounded-md bg-orange px-3.25 py-2.25 text-[.8rem] font-bold text-white hover:brightness-95"
            onClick={() => setVisible(false)}
          >
            Save
          </button>
        </div>
      )}
    </aside>
  )
}
