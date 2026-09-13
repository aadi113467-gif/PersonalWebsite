import TransitRail from "./components/transit-rail";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <TransitRail />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Back to top">AS<span>.</span></a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-kicker"><span>01</span> Georgia Tech / Computer Science</div>
        <div className="route-map" aria-hidden="true">
          <span className="route-stop route-stop-red" />
          <span className="route-stop route-stop-gold" />
          <span className="route-stop route-stop-green" />
        </div>
        <div className="hero-content">
          <div className="hero-copy"><h1>Aadi <em>Shah</em></h1><p className="hero-description">I&apos;m a Computer Science student at Georgia Tech, passionate about software engineering and learning how thoughtful systems come together.</p><div className="hero-links"><a href="https://github.com/aadi113467-gif" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a><a href="https://www.linkedin.com/in/aadi-shah123/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></div></div>
          <div className="hero-aside">
            <div className="hero-headshot-frame"><Image src="/Aadi Senior Yearbook Photo.jpeg" alt="Aadi Shah" width={300} height={375} priority quality={95} sizes="(max-width: 720px) 220px, 300px" /></div>
          </div>
        </div>
        <div className="hero-footer"><span>Scroll to explore</span><span className="hero-line" /><span>Atlanta, Georgia</span></div>
      </section>

      <section className="split-section section-shell" id="about">
        <div className="section-heading"><p className="eyebrow"><span>02</span> About</p></div>
        <div className="about-content">
          <div className="about-details"><div><span>School</span><strong>Georgia Tech</strong></div><div><span>Major</span><strong>Computer Science</strong></div><div><span>Expected graduation</span><strong>2028</strong></div><div><span>Threads</span><strong>Intelligence and People</strong></div></div>
          <div className="coursework-block"><div className="coursework-heading"><span>Coursework</span></div><div className="coursework-grid"><span>Data Structures &amp; Algorithms</span><span>Object-Oriented Programming</span><span>Computer Organization</span><span>Machine Learning</span><span>Artificial Intelligence</span><span>Software Engineering</span><span>Linear Algebra</span><span>Multivariable Calculus</span><span>Discrete Math</span><span>Probability &amp; Statistics</span></div></div>
          <div className="skills-block"><div className="coursework-heading"><span>Technical skills</span></div><div className="skill-group"><span className="skill-label">Languages</span><div className="skill-list"><span>Java</span><span>Python</span><span>C/C++</span><span>JavaScript</span><span>TypeScript</span><span>SQL</span><span>HTML/CSS</span></div></div><div className="skill-group"><span className="skill-label">Frameworks / Libraries</span><div className="skill-list"><span>React</span><span>Next.js</span><span>Node.js</span><span>Express.js</span><span>FastAPI</span><span>Flask</span><span>Streamlit</span><span>Pandas</span><span>NumPy</span><span>Scikit-learn</span><span>PyTorch</span></div></div><div className="skill-group"><span className="skill-label">Databases / Cloud</span><div className="skill-list"><span>PostgreSQL</span><span>MySQL</span><span>MongoDB</span><span>Supabase</span><span>AWS</span><span>Firebase</span></div></div><div className="skill-group"><span className="skill-label">Developer tools</span><div className="skill-list"><span>Git</span><span>GitHub</span><span>Docker</span><span>VS Code</span><span>PyCharm</span><span>Postman</span><span>Jupyter Notebook</span><span>CI/CD</span><span>REST APIs</span></div></div></div>
        </div>
      </section>

      <section className="work-section section-shell" id="projects">
        <div className="section-heading"><p className="eyebrow"><span>03</span> Projects</p><p className="section-note">Selected work.</p></div>
        <article className="project-feature">
          <div className="project-visual" aria-label="Placeholder for Movies Store project screenshots">
            <div className="visual-topline"><span>MOVIES STORE</span><span>01 / 01</span></div>
            <div className="visual-window"><div className="window-bar"><span /><span /><span /></div><div className="window-content"><div className="movie-mark">MS<span>.</span></div><div className="movie-copy">Your next<br /><b>favorite film.</b></div><div className="movie-poster"><i>POSTER<br />IMAGE<br />GOES HERE</i></div><div className="movie-nav">Browse <span>Search</span> <span>Cart (0)</span></div></div></div>
            <p className="visual-caption">Project imagery will replace this frame</p>
          </div>
          <div className="project-details"><p className="project-index">01 / Full-stack web application</p><h2>Movies<br /><span>Store</span></h2><p className="project-summary">A digital movie storefront where people can browse a catalog, share reviews, build a cart, place orders, and return to their purchase history.</p><div className="tag-list" aria-label="Technologies used"><span>Django</span><span>Python</span><span>SQLite</span><span>Bootstrap</span></div><div className="project-actions"><a className="button button-primary" href="/projects/movies-store">More information <span aria-hidden="true">-&gt;</span></a><a className="button button-secondary" href="https://github.com/aadi113467-gif/moviesstore" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a></div></div>
        </article>
      </section>

      <section className="experience-section section-shell" id="experience">
        <div className="section-heading"><p className="eyebrow"><span>04</span> Experience</p><p className="section-note">In progress.</p></div>
        <div className="experience-placeholder"><span className="experience-marker" aria-hidden="true" /><p>I&apos;m still working on filling this section out.</p></div>
      </section>

      <section className="contact-section section-shell" id="contact">
        <p className="eyebrow"><span>05</span> Contact</p><h2>Let&apos;s <em>connect.</em></h2>
        <div className="contact-links"><a className="contact-email" href="mailto:aadi113467@gmail.com">aadi113467@gmail.com <span aria-hidden="true">↗</span></a><span className="contact-link">470-437-8014</span><a className="contact-link" href="https://www.linkedin.com/in/aadi-shah123/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></div>
        <div className="contact-footer"><span>Aadi Shah / Portfolio</span><div><a href="#top">Back to top</a><a href="https://github.com/aadi113467-gif" target="_blank" rel="noreferrer">GitHub ↗</a></div></div>
      </section>
    </main>
  );
}
