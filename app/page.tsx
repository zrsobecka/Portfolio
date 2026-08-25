import Image from 'next/image';

type Project = {
  id: string;
  name: string;
  descriptor: string;
  icon: string;
  status: string;
  lede: string;
  problem: string;
  role: string;
  decision: string;
  evidence: string;
  audience: string;
  discovery: string;
  tradeoff: string;
  learning: string;
  nextProof: string;
  metrics?: { value: string; label: string }[];
  workflow?: string[];
  stack: string;
  link?: string;
};

const products = ['Vile', 'Vile for LinkedIn', 'Raptor', 'Akasha', 'Orion', 'Menma'];

const featuredProjects: Project[] = [
  {
    id: 'menma', name: 'Menma', descriptor: 'Local AI storytelling system', icon: '/menma.png',
    status: 'Working local product · External-alpha candidate',
    lede: 'A desktop studio where multiple AI characters share a persistent world while keeping memory, perspective and story truth distinct.',
    problem: 'Long-running AI stories lose continuity and flatten distinct characters into one generic voice.',
    role: 'Product direction, system design, implementation, evaluation and release preparation.',
    audience: 'Writers and role-players who want persistent multi-character stories while keeping their content and model traffic local.',
    discovery: 'Mapped continuity failures, profiled the production turn pipeline with content-free receipts and reviewed repeated fixed-fixture model runs manually.',
    decision: 'Keep Character and Story State outside the response critical path. For public-context turns, remove the slow universal repair loop; retain the hard gate only where private Director context can affect the answer.',
    tradeoff: 'The faster path makes remaining model limitations visible. One grounding fixture still invented technical evidence in 2/3 runs, so I kept that risk explicit instead of hiding it behind a slow fallback.',
    evidence: 'Across the same nine-fixture production benchmark, median latency fell from 24.1 s to 8.7 s; repairs fell from 7/9 to 0/9; safe fallbacks from 3/9 to 0/9; semantic acceptance improved from 5/9 to 6/9.',
    learning: 'The bottleneck was local-model inference, not interface or prompt assembly: measured non-native overhead before first text was only 0.13–0.24 s. Rebuilding the coordinator would have added risk without improving the experience.',
    nextProof: 'Run a small external alpha on a clean machine and test continuity while derived state is deliberately delayed.',
    metrics: [
      { value: '24.1 → 8.7 s', label: 'median response latency' },
      { value: '7/9 → 0/9', label: 'repair requests' },
      { value: '5/9 → 6/9', label: 'semantic acceptance' },
    ],
    workflow: ['Participant beat', 'Visible response', 'Durable save', 'State in background'],
    stack: 'Tauri · Rust · React · TypeScript · SQLite · LM Studio',
  },
  {
    id: 'vile', name: 'Vile', descriptor: 'Founder intelligence & relationship OS', icon: '/vile.png',
    status: 'Working private product · Active internal workflow',
    lede: 'A local-first workspace that connects founder discovery, lead review, relationship context and follow-ups without automating human judgment.',
    problem: 'Founder research and outreach context were fragmented across searches, notes, spreadsheets and conversations.',
    role: 'Workflow discovery, product architecture, desktop and extension integration, implementation and migration planning.',
    audience: 'A sales operator who needs to turn founder signals into useful conversations without volume pressure, blank-page writing or CRM administration.',
    discovery: 'Mapped the daily workflow from signal to outcome and separated commercial stage, relationship state, next action and evidence instead of compressing them into one generic status.',
    decision: 'Make SQLite the local source of truth and keep outreach user-controlled. The companion extension only processes information already visible to the user.',
    tradeoff: 'Rejected both a generic CRM and an automatic sender. Vile prepares up to three high-value actions, preserves the full queue and treats defer or reject as valid operator decisions.',
    evidence: 'Before a deliberate operational data reset, Vile’s verified archive contained 1,773 lead records, 2,030 conversation records, 3,749 sales events, 301 messages and 1,968 source snapshots. The clean restart preserved configuration while the automatic pre-reset backup passed SQLite integrity and foreign-key checks. These figures demonstrate workflow coverage, not current adoption or commercial outcome.',
    learning: 'Lead volume and generated drafts are diagnostic signals, not product value. The meaningful measure is whether qualified opportunities move through useful conversations to a recorded commercial outcome.',
    nextProof: 'Measure signal-to-approved-action time and commercial outcomes in the next complete sales cycle; validate configuration with a second workspace before claiming repeatability.',
    metrics: [
      { value: '1,773', label: 'lead records in verified archive' },
      { value: '3,749', label: 'sales lifecycle events' },
      { value: '1,968', label: 'source snapshots' },
    ],
    workflow: ['Signal', 'Qualify', 'Opportunity', 'Conversation', 'Outcome'],
    stack: 'Tauri · React · TypeScript · Rust · SQLite · Local AI',
  },
  {
    id: 'orion', name: 'Orion', descriptor: 'Mission control for AI projects', icon: '/orion.png',
    status: 'Working MVP · Public repository',
    lede: 'A desktop workspace that turns local Git evidence, product intent and feature health into a clear next action.',
    problem: 'Resuming a complex software project means reconstructing context from repositories, notes, chats and memory.',
    role: 'Product framing, information architecture, implementation and packaging workflow.',
    audience: 'Hands-on builders who return to several local software projects and need to recover the next useful action quickly.',
    discovery: 'Separated observable Git facts from editable product context and designed the interface around the resume-work loop.',
    decision: 'Keep Git facts read-only, store product context locally and optimize the interface around the resume-work loop rather than generic project management.',
    tradeoff: 'Kept the first version intentionally local and read-only around Git rather than adding collaboration, cloud sync or repository writes before the core loop was proven.',
    evidence: 'Working Windows MVP with repository registration, branch and change scanning, project goals, feature horizons and local SQLite persistence.',
    learning: 'Project dashboards only help when they reduce re-orientation time. More status fields would add maintenance unless each one changes the next decision.',
    nextProof: 'Measure time-to-resume across repeated real project returns and test the workflow with another builder.',
    stack: 'Tauri · Rust · React · TypeScript · SQLite · Git',
    link: 'https://github.com/zrsobecka/Orion',
  },
];

const supportingProjects = [
  {
    name: 'Vile for LinkedIn', icon: '/vile-linkedin.png', tag: 'Chrome companion',
    text: 'Reads user-visible LinkedIn context, previews structured changes and saves approved information to Vile. No auto-send, unattended browsing or background scraping.',
  },
  {
    name: 'Raptor', icon: '/raptor.png', tag: 'AI content workspace',
    text: 'A desktop decision assistant for reviewing, planning and drafting LinkedIn content from publication history and approved personal knowledge.',
  },
  {
    name: 'Akasha', icon: '/akasha.png', tag: 'Evidence-led learning tool',
    text: 'A local-first socionics learning app that keeps observations, interpretations and provisional hypotheses visibly separate.',
    link: 'https://github.com/zrsobecka/Akasha',
  },
];

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Zuzanna Sobecka, home">ZS<span>{'//'}</span></a>
        <div className="nav-links"><a href="#work">Work</a><a href="#approach">Approach</a><a href="#about">About</a><a href="#contact">Contact</a></div>
      </nav>

      <section className="hero section-shell" id="top">
        <div className="eyebrow"><span>AI Product Manager · hands-on builder</span><span>Warsaw, PL</span></div>
        <h1>AI Product Manager who turns messy workflows into working products.</h1>
        <div className="hero-bottom">
          <p>I connect user problems, product decisions and hands-on delivery — then use benchmarks, tests and real workflow evidence to decide what changes next.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore selected work</a>
            <a className="button button-ghost" href="#approach">See how I work</a>
          </div>
        </div>
        <div className="proof-strip" aria-label="Core strengths">
          <span>Product discovery → measurable decision</span><span>AI workflows + local-first systems</span><span>Operations experience → realistic constraints</span>
        </div>
      </section>

      <section className="project-index section-shell" aria-label="Product portfolio">
        <p>Product systems</p>
        <div>{products.map((product, index) => <span key={product}><b>0{index + 1}</b>{product}</span>)}</div>
      </section>

      <section className="featured section-shell" id="work">
        <header className="section-intro">
          <p className="eyebrow-label">{'Selected work // strongest hiring evidence'}</p>
          <h2>Product decisions,<br />not just screens.</h2>
          <p>Three case studies chosen for independent ownership, problem framing, technical judgment and verification. Private internals stay private.</p>
        </header>

        <div className="case-list">
          {featuredProjects.map((project, index) => (
            <article className="case-study" id={project.id} key={project.id}>
              <header className="case-heading">
                <span>Case // 0{index + 1}</span><h3>{project.name}</h3><p>{project.descriptor}</p>
              </header>
              <div className="case-card">
                <div className={`case-visual visual-${project.id}`}>
                  <div className="case-orbit orbit-one" /><div className="case-orbit orbit-two" />
                  <Image src={project.icon} alt={`${project.name} product icon`} width={112} height={112} />
                  {project.metrics ? <div className="evidence-panel" aria-label={`${project.name} verified evidence`}>
                    <p>Verified product evidence</p>
                    <div className="metric-grid">{project.metrics.map((metric) => <div key={metric.label}><b>{metric.value}</b><span>{metric.label}</span></div>)}</div>
                    <ol className="workflow-strip">{project.workflow?.map((step) => <li key={step}>{step}</li>)}</ol>
                  </div> : null}
                  <span>{project.status}</span>
                </div>
                <div className="case-copy">
                  <p className="case-lede">{project.lede}</p>
                  <dl className="decision-grid">
                    <div><dt>For whom</dt><dd>{project.audience}</dd></div>
                    <div><dt>Problem</dt><dd>{project.problem}</dd></div>
                    <div><dt>Key decision</dt><dd>{project.decision}</dd></div>
                    <div><dt>Evidence</dt><dd>{project.evidence}</dd></div>
                  </dl>
                  <details className="case-details">
                    <summary>Read the full decision record</summary>
                    <dl className="decision-grid">
                      <div><dt>Discovery</dt><dd>{project.discovery}</dd></div>
                      <div><dt>My role</dt><dd>{project.role}</dd></div>
                      <div><dt>Trade-off / rejected path</dt><dd>{project.tradeoff}</dd></div>
                      <div><dt>What I learned and changed</dt><dd>{project.learning}</dd></div>
                    </dl>
                  </details>
                  <p className="case-next"><b>Next evidence-producing step</b>{project.nextProof}</p>
                  <div className="case-meta"><span>{project.stack}</span>{project.link ? <a href={project.link} target="_blank" rel="noreferrer">View public repository ↗</a> : <span>Private demo during interview</span>}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="supporting section-shell" aria-labelledby="supporting-title">
        <header className="supporting-heading">
          <p className="eyebrow-label">Supporting evidence // 04–06</p><h2 id="supporting-title">More systems,<br />different constraints.</h2>
        </header>
        <div className="support-grid">
          {supportingProjects.map((project, index) => (
            <article className="support-card" key={project.name}>
              <div className="support-top"><span>0{index + 4}</span><Image src={project.icon} alt={`${project.name} icon`} width={72} height={72} /></div>
              <p className="support-tag">{project.tag}</p><h3>{project.name}</h3><p>{project.text}</p>
              {project.link ? <a href={project.link} target="_blank" rel="noreferrer">Public repository ↗</a> : <span className="private-label">Private product</span>}
            </article>
          ))}
        </div>
      </section>

      <section className="approach section-shell" id="approach">
        <header><p className="eyebrow-label">How I work</p><h2>From ambiguity<br />to evidence.</h2></header>
        <ol className="approach-list">
          <li><span>01</span><div><h3>Frame the real problem</h3><p>Map the user, workflow, constraint and decision before choosing a feature.</p></div></li>
          <li><span>02</span><div><h3>Design the smallest useful loop</h3><p>Separate the must-have outcome from architecture and polish that can wait.</p></div></li>
          <li><span>03</span><div><h3>Build across the boundary</h3><p>Connect interface, product logic, local data and AI behavior into one coherent flow.</p></div></li>
          <li><span>04</span><div><h3>Verify, learn, cut</h3><p>Use tests, benchmarks and failure cases to keep what works and remove what does not.</p></div></li>
        </ol>
      </section>

      <section className="about section-shell" id="about">
        <div className="about-main">
          <p className="eyebrow-label">About // the useful version</p>
          <h2>Product judgment grounded in operations.</h2>
          <p>My background spans regulated business operations, startup and founder research, sales workflows and hands-on AI product building. That combination makes me comfortable translating between a messy business reality and the system needed to improve it.</p>
        </div>
        <div className="about-proof">
          <div><b>AI product</b><p>Local models, context design, structured outputs, recovery and evaluation.</p></div>
          <div><b>Product operations</b><p>Workflows, CRM, documentation, prioritization and cross-functional coordination.</p></div>
          <div><b>Research</b><p>Founder discovery, qualitative analysis and turning evidence into a decision.</p></div>
          <div><b>Delivery</b><p>Desktop apps, Chrome extensions, APIs, persistence, testing and packaging.</p></div>
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <div className="contact-copy">
          <p className="eyebrow-label">Warsaw · open to the right problem</p>
          <h2>AI Product Manager, AI Product Specialist or Product Operations.</h2>
          <p>I can show the private products in a guided interview demo and go deeper on the decisions, trade-offs and verification behind them. My full CV is shared directly with job applications.</p>
          <div className="contact-actions">
            <a className="button button-primary" href="https://www.linkedin.com/in/zuzanna-sobecka-69275117b" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a className="text-link" href="https://github.com/zrsobecka" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
        <form className="contact-form" name="portfolio-contact" method="POST" action="/thanks" data-netlify="true" data-netlify-honeypot="company-website">
          <input type="hidden" name="form-name" value="portfolio-contact" />
          <p className="form-honeypot" aria-hidden="true"><label>Do not fill this out: <input name="company-website" tabIndex={-1} autoComplete="off" /></label></p>
          <label>Your name<input name="name" type="text" autoComplete="name" required /></label>
          <label>Work email<input name="email" type="email" autoComplete="email" required /></label>
          <label>Role or message<textarea name="message" rows={5} required /></label>
          <button className="button button-primary" type="submit">Send a message</button>
          <p className="form-note">Handled by Netlify so my private email stays off the public page. Please do not include sensitive information.</p>
        </form>
      </section>

      <footer className="section-shell"><p>© 2026 Zuzanna Sobecka</p><p>Designed for clarity. Built with evidence.</p></footer>
    </main>
  );
}
