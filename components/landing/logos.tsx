const partners = [
  "Uniwell",
  "Jikonify",
  "Univora",
  "Camposocial",
  "Nurse Now",
  "Bread",
]

export function ZentiriLogos() {
  return (
    <section className="border-y border-border/50 bg-muted">
      <div className="container px-4 py-12 md:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Trusted by people-centric teams
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 text-center text-base font-semibold text-muted-foreground sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner) => (
              <span key={partner} className="rounded-xl bg-card py-3 shadow-sm">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
