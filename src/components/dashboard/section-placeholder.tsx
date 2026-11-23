type SectionPlaceholderProps = {
  title: string;
  description: string;
};

export function SectionPlaceholder({
  title,
  description,
}: SectionPlaceholderProps) {
  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/dashboard">FlowForge</a>
        <a className="workspace-label" href="/dashboard">Back to dashboard</a>
      </header>

      <section className="content">
        <p className="eyebrow">WORKSPACE</p>
        <h1>{title}</h1>
        <p className="intro">{description}</p>
      </section>
    </main>
  );
}
