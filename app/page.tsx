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
    decision: 'Separate world truth from each character’s private beliefs, access and emotional state — then update derived continuity without blocking play.',
    evidence: 'Packaged desktop build, regression suites, benchmark tooling, recovery workflows and a draft cross-platform alpha pipeline.',
    stack: 'Tauri · Rust · React · TypeScript · SQLite · LM Studio',
  },
  {
    id: 'vile', name: 'Vile', descriptor: 'Founder intelligence & relationship OS', icon: '/vile.png',
    status: 'Working private product · Active internal workflow',
    lede: 'A local-first workspace that connects founder discovery, lead review, relationship context and follow-ups without automating human judgment.',
    problem: 'Founder research and outreach context were fragmented across searches, notes, spreadsheets and conversations.',
    role: 'Workflow discovery, product architecture, desktop and extension integration, implementation and migration planning.',
    decision: 'Make SQLite the local source of truth and keep outreach user-controlled. The companion extension only processes information already visible to the user.',
    evidence: 'Packaged desktop app, structured pipeline, local knowledge integration and a Chrome companion with explicit review and save boundaries.',
    stack: 'Tauri · React · TypeScript · Rust · SQLite · Local AI',
  },
  {
    id: 'orion', name: 'Orion', descriptor: 'Mission control for AI projects', icon: '/orion.png',
    status: 'Working MVP · Public repository',
    lede: 'A desktop workspace that turns local Git evidence, product intent and feature health into a clear next action.',
    problem: 'Resuming a complex software project means reconstructing context from repositories, notes, chats and memory.',
    role: 'Product framing, information architecture, implementation and packaging workflow.',
    decision: 'Keep Git facts read-only, store product context locally and optimize the interface around the resume-work loop rather than generic project management.',
    evidence: 'Working Windows MVP with repository registration, branch and change scanning, project goals, feature horizons and local SQLite persistence.',
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
        <div className="eyebrow"><span>AI product builder</span><span>Warsaw, PL</span></div>
        <h1>I turn messy workflows into AI products people can actually use.</h1>
        <div className="hero-bottom">
          <p>I connect product thinking, operations and hands-on delivery — from an ambiguous problem to a working local-first tool.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore selected work</a>
            <a className="button button-ghost" href="#approach">See how I work</a>
          </div>
        </div>
        <div className="proof-strip" aria-label="Core strengths">
          <span>Product discovery → working software</span><span>AI workflows + local-first systems</span><span>Founder research + business operations</span>
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
                <div className={`case-visual visual-${project.id}`} aria-hidden="true">
                  <div className="case-orbit orbit-one" /><div className="case-orbit orbit-two" />
                  <Image src={project.icon} alt="" width={148} height={148} /><span>{project.status}</span>
                </div>
                <div className="case-copy">
                  <p className="case-lede">{project.lede}</p>
                  <dl className="decision-grid">
                    <div><dt>Problem</dt><dd>{project.problem}</dd></div>
                    <div><dt>My role</dt><dd>{project.role}</dd></div>
                    <div><dt>Key decision</dt><dd>{project.decision}</dd></div>
                    <div><dt>Evidence</dt><dd>{project.evidence}</dd></div>
                  </dl>
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
        <p className="eyebrow-label">Open to the right problem</p>
        <h2>Hiring for AI product, product operations or a hands-on PM?</h2>
        <p>I can show the private products in a guided interview demo and go deeper on the decisions, trade-offs and verification behind them.</p>
        <div className="contact-actions">
          <a className="button button-primary" href="https://www.linkedin.com/in/zuzanna-sobecka-69275117b" target="_blank" rel="noreferrer">Contact me on LinkedIn ↗</a>
          <a className="text-link" href="https://github.com/zrsobecka" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </section>

      <footer className="section-shell"><p>© 2026 Zuzanna Sobecka</p><p>Designed for clarity. Built with evidence.</p></footer>
    </main>
  );
}
