export default function PrivacyPolicyPage() {
  return (
    <article className="w-full border-t border-line pt-12.5">
      <span className="eyebrow">Your data</span>
      <h1 className="mt-3.5 mb-6 text-[3.8rem] leading-[.95] tracking-[-.075em] max-[700px]:text-5xl">
        Privacy Policy
      </h1>
      <p>Effective date: {new Date().toLocaleDateString('en-PH')}</p>
      <section className="mt-9.5">
        <h2>Data and tools</h2>
        <p>
          Calculator work happens in your browser. The Solar Savings Tracker can save results as a
          CSV file on your device if you choose. That file remains on your device unless you
          manually share or upload it.
        </p>
      </section>
      <section className="mt-9.5">
        <h2>Advertising and cookies</h2>
        <p>
          This site may display third-party advertising, such as Google AdSense. Third-party
          networks may use cookies or similar technologies to measure ad performance and tailor ads.
          You can manage your choices through the preference banner.
        </p>
      </section>
      <section className="mt-9.5">
        <h2>Contact</h2>
        <p>
          Privacy questions:{' '}
          <a
            className="text-teal underline underline-offset-[3px]"
            href="mailto:adaddi.hahaha@gmail.com"
          >
            adaddi.hahaha@gmail.com
          </a>
        </p>
      </section>
    </article>
  )
}
