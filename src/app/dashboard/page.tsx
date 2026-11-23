const sections = [
  { name: "Workflows", href: "/workflows", description: "Design and manage automations." },
  { name: "Executions", href: "/executions", description: "Inspect recent workflow runs." },
  { name: "Credentials", href: "/credentials", description: "Manage connected accounts." },
  { name: "Settings", href: "/settings", description: "Configure your workspace." },
];

export default function DashboardPage() {
  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/dashboard">FlowForge</a>
        <span className="workspace-label">Workspace</span>
      </header>

      <section className="content">
        <p className="eyebrow">OVERVIEW</p>
        <h1>Your workflows, in one place.</h1>
        <p className="intro">Choose a workspace area to get started.</p>

        <nav className="section-grid" aria-label="Workspace sections">
          {sections.map((section) => (
            <a className="section-card" href={section.href} key={section.name}>
              <span className="section-name">{section.name}</span>
              <span className="section-description">{section.description}</span>
              <span className="section-arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
