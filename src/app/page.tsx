import TransitRail from "./components/transit-rail";
import Reveal from "./components/reveal";
import { MartaProvider } from "./components/marta-ride";
import MartaStop from "./components/marta-stop";
import TrainTunnel from "./components/train-tunnel";
import MartaBoot from "./components/marta-boot";
import ExperienceTimeline from "./components/experience-timeline";
import FeaturedProjects from "./components/featured-projects";
import StopLink from "./components/stop-link";
import SiteNavBar from "./components/site-nav-bar";
import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon, CodeIcon, LayersIcon, DatabaseIcon, WrenchIcon } from "./components/icons";
import Image from "next/image";

export default function Home() {
  return (
    <MartaProvider>
      <main className="marta-viewport">
        <TransitRail />
        <SiteNavBar />
        <TrainTunnel />
        <MartaBoot />
        <Reveal />

        <MartaStop index={0} id="top" className="hero section-shell">
          <header className="site-header">
            <StopLink className="wordmark" href="#top" ariaLabel="Back to top">AS<span>.</span></StopLink>
            <nav className="site-nav" aria-label="Primary navigation">
              <StopLink href="#about">About</StopLink>
              <StopLink href="#projects">Projects</StopLink>
              <StopLink href="#experience">Experience</StopLink>
              <StopLink href="#contact">Contact</StopLink>
            </nav>
          </header>
          <div className="hero-ambient" aria-hidden="true"><span className="hero-grid" /></div>
          <div className="hero-kicker"><span>01</span> Georgia Tech / Computer Science</div>
          <div className="route-map" aria-hidden="true">
            <span className="route-stop route-stop-red" />
            <span className="route-stop route-stop-gold" />
            <span className="route-stop route-stop-green" />
          </div>
          <div className="hero-content">
            <div className="hero-copy"><h1>Aadi <em>Shah</em></h1><p className="hero-description">I&apos;m a Computer Science student at Georgia Tech, passionate about software engineering and learning how thoughtful systems come together.</p><div className="hero-links"><a href="https://github.com/aadi113467-gif" target="_blank" rel="noreferrer"><GithubIcon className="link-icon" />GitHub <span aria-hidden="true">↗</span></a><a href="https://www.linkedin.com/in/aadi-shah123/" target="_blank" rel="noreferrer"><LinkedinIcon className="link-icon" />LinkedIn <span aria-hidden="true">↗</span></a></div></div>
            <div className="hero-aside">
              <div className="hero-headshot-frame">
                <Image src="/Aadi Shah Portrait.jpeg" alt="Aadi Shah" width={300} height={375} priority quality={95} sizes="(max-width: 720px) 220px, 300px" />
              </div>
            </div>
          </div>
          <div className="hero-footer"><span>On the platform</span><span className="hero-line" /><span>Atlanta, Georgia</span></div>
        </MartaStop>

        <MartaStop index={1} id="about" className="split-section section-shell">
          <div className="section-heading"><p className="eyebrow"><span>02</span> About</p></div>
          <div className="about-content" data-reveal>
            <div className="about-details"><div><span>School</span><strong>Georgia Tech</strong></div><div><span>Major</span><strong>Computer Science</strong></div><div><span>Expected graduation</span><strong>May 2028</strong></div><div><span>Threads</span><strong>Intelligence and People</strong></div></div>
            <div className="coursework-block">
              <div className="coursework-heading"><span>Coursework</span></div>
              <div className="course-route">
                <div className="course-stop stop-red"><span className="course-dot" /><span>Data Structures &amp; Algorithms</span></div>
                <div className="course-stop stop-gold"><span className="course-dot" /><span>Design and Analysis of Algorithms</span></div>
                <div className="course-stop stop-green"><span className="course-dot" /><span>Object-Oriented Programming</span></div>
                <div className="course-stop stop-red"><span className="course-dot" /><span>Objects and Design</span></div>
                <div className="course-stop stop-gold"><span className="course-dot" /><span>Computer Organization</span></div>
                <div className="course-stop stop-green"><span className="course-dot" /><span>Artificial Intelligence</span></div>
                <div className="course-stop stop-red"><span className="course-dot" /><span>Linear Algebra</span></div>
                <div className="course-stop stop-gold"><span className="course-dot" /><span>Multivariable Calculus</span></div>
                <div className="course-stop stop-green"><span className="course-dot" /><span>Discrete Math</span></div>
                <div className="course-stop stop-red"><span className="course-dot" /><span>Probability &amp; Statistics</span></div>
              </div>
            </div>
            <div className="skills-block"><div className="coursework-heading"><span>Technical skills</span></div><div className="skill-group"><span className="skill-label"><CodeIcon className="skill-icon" />Languages</span><div className="skill-list"><span>Java</span><span>Python</span><span>C/C++</span><span>JavaScript</span><span>TypeScript</span><span>SQL</span><span>HTML/CSS</span></div></div><div className="skill-group"><span className="skill-label"><LayersIcon className="skill-icon" />Frameworks / Libraries</span><div className="skill-list"><span>React</span><span>Next.js</span><span>Node.js</span><span>Express.js</span><span>FastAPI</span><span>Flask</span><span>Streamlit</span><span>Pandas</span><span>NumPy</span><span>Scikit-learn</span><span>PyTorch</span></div></div><div className="skill-group"><span className="skill-label"><DatabaseIcon className="skill-icon" />Databases / Cloud</span><div className="skill-list"><span>PostgreSQL</span><span>MySQL</span><span>MongoDB</span><span>Supabase</span><span>AWS</span><span>Firebase</span></div></div><div className="skill-group"><span className="skill-label"><WrenchIcon className="skill-icon" />Developer tools</span><div className="skill-list"><span>Git</span><span>GitHub</span><span>Docker</span><span>VS Code</span><span>PyCharm</span><span>Postman</span><span>Jupyter Notebook</span><span>CI/CD</span><span>REST APIs</span></div></div></div>
          </div>
        </MartaStop>

        <MartaStop index={2} id="projects" className="projects-intro section-shell">
          <div className="section-heading"><p className="eyebrow"><span>03</span> Projects</p><p className="section-note">Selected work.</p></div>
          <FeaturedProjects />
          <div className="work-section movies-store-block">
            <article className="project-feature">
              <div className="project-visual" aria-label="Movies Store catalog screenshot">
                <div className="visual-topline"><span>MOVIES STORE</span><span>01 / 01</span></div>
                <div className="visual-window project-screenshot-window"><div className="window-bar"><span /><span /><span /></div><Image className="project-screenshot" src="/moviestore homepage.png" alt="GT Movies Store homepage" width={1366} height={768} sizes="(max-width: 720px) 88vw, 46vw" /></div>
                <p className="visual-caption">Movies Store / Homepage view</p>
              </div>
              <div className="project-details"><p className="project-index">03 / Full-stack web application</p><h2>Movies<br /><span>Store</span></h2><p className="project-summary">A digital movie storefront where people can browse a catalog, share reviews, build a cart, place orders, and return to their purchase history.</p><div className="tag-list" aria-label="Technologies used"><span>Django</span><span>Python</span><span>SQLite</span><span>Bootstrap</span></div><div className="project-actions"><a className="button button-primary" href="/projects/movies-store">More information <span aria-hidden="true">-&gt;</span></a><a className="button button-secondary" href="https://aadishah.pythonanywhere.com/" target="_blank" rel="noreferrer">Live site <span aria-hidden="true">↗</span></a><a className="button button-secondary" href="https://github.com/aadi113467-gif/moviesstore" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a></div></div>
            </article>
          </div>
        </MartaStop>

        <MartaStop index={3} id="experience" className="experience-section section-shell">
          <div className="section-heading"><p className="eyebrow"><span>04</span> Experience</p></div>
          <ExperienceTimeline />
        </MartaStop>

        <MartaStop index={4} id="contact" className="contact-section section-shell">
          <p className="eyebrow"><span>05</span> Contact</p><h2>Let&apos;s <em>connect.</em></h2>
          <div className="contact-links"><a className="contact-email" href="mailto:aadi113467@gmail.com"><MailIcon className="link-icon" />aadi113467@gmail.com <span aria-hidden="true">↗</span></a><span className="contact-link"><PhoneIcon className="link-icon" />470-437-8014</span><a className="contact-link" href="https://www.linkedin.com/in/aadi-shah123/" target="_blank" rel="noreferrer"><LinkedinIcon className="link-icon" />LinkedIn <span aria-hidden="true">↗</span></a></div>
          <div className="contact-footer"><span>Aadi Shah / Portfolio</span><div><StopLink href="#top">Back to top</StopLink><a href="https://github.com/aadi113467-gif" target="_blank" rel="noreferrer">GitHub ↗</a></div></div>
        </MartaStop>
      </main>
    </MartaProvider>
  );
}
