import Link from "next/link";
import Image from "next/image";

const userStories = [
  "As a user, I want to see information about the GT Movies Store so I can learn more about the app and its purpose.",
  "As a user, I want to register an account so that I can access the GT Movies Store.",
  "As a registered user, I want to log in so that I can access my account data.",
  "As a user, I want to be able to view the list of movies available in the GT Movies Store so I can make my selections.",
  "As a user, I want to search movies per title so I can make my selections.",
  "As a user, I want to be able to access a shopping cart so I can list all movie items I am willing to purchase.",
  "As a user, I want to be able to add one or more items of a movie to my shopping cart so I can purchase them in the future.",
  "As a user, I want to create movie reviews so others can use my insights when searching for movies.",
  "As a user, I want to be able to remove all movie items from my shopping cart so I can have flexibility on what I purchase or not.",
  "As a user, I want to edit my reviews so I have the freedom to change my mind about my reviews.",
  "As a user, I want to delete my movie reviews so I have the freedom to change my mind about my reviews.",
  "As a user, I want to see the reviews of a movie so I can have information on whether I should purchase a movie or not.",
  "As a user, I want to see the details of a movie so I have the information to make my choices.",
  "As a user, I want to see a list of my orders so I can track what I have purchased and my expenses.",
  "As a user, I want to be able to access the GT Movies Store from any desktop using a web browser, so I can use the app anywhere with an internet connection.",
  "As a user, I want the GT Movies Store to feature a responsive Graphical User Interface (GUI) so I can access it through different devices with diverse screen sizes.",
  "As an administrator, I want to be able to manage (view, create, update, or delete) users from the GT Movies Store so we can keep information up to date.",
  "As an administrator, I want to be able to manage (view, create, update, or delete) movies from the GT Movies Store so we can keep information up to date.",
  "As an administrator, I want to be able to manage (create, update, or delete) reviews from the GT Movies Store so we can keep information up to date.",
  "As an administrator, I want to be able to manage (create, update, or delete) orders from the GT Movies Store so we can keep information up to date.",
  "As a user, I want to report inappropriate reviews so that the comment section isn’t cluttered with irrelevant/offensive reviews and the review is removed from the page moving forward.",
];

export default function MoviesStoreCaseStudy() {
  return (
    <main className="case-study">
      <header className="site-header case-header"><Link className="wordmark" href="/">AS<span>.</span></Link><Link className="back-link" href="/">&lt;- Back to portfolio</Link><span className="header-availability"><span className="status-dot" /> More information / 01</span></header>
      <section className="case-hero section-shell"><p className="eyebrow"><span>01</span> Project information / 2026</p><h1>Movies<br /><em>Store.</em></h1><div className="case-hero-grid"><div><p className="case-intro">The GT Movies Store features dedicated pages like the Home storefront, Movie Details, and Shopping Cart that directly address user stories by allowing customers to search for titles, read reviews, and manage their purchases. Additionally, a secure Admin Dashboard and a fully responsive web design fulfill the remaining requirements, ensuring seamless management of users, orders, and inventory across all device sizes.</p><div className="case-meta"><span>Role / Developer</span><span>Stack / Django, Python, SQLite</span><span>Requirements / 21 user stories</span></div></div><figure className="case-hero-screenshot"><Image src="/moviestore homepage.png" alt="GT Movies Store homepage" width={1366} height={768} priority sizes="(max-width: 720px) 100vw, 42vw" /><figcaption>Movies Store / Homepage view</figcaption></figure></div></section>
      <section className="case-media section-shell"><div className="case-media-placeholder"><iframe className="project-video" src="https://www.youtube.com/embed/z1CME26FrYA" title="GT Movies Store demonstration" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div></section>
      <section className="process-section section-shell"><div className="case-label">Process</div><div className="process-content"><h2>Learning by building.</h2><p>Throughout the development process, I built the application by closely following the core concepts and instructions outlined in <em>Django 5 for the Impatient</em>. Whenever I encountered questions or roadblocks, I navigated them by carefully re-analyzing what the textbook said and thoroughly reviewing its examples to understand the underlying logic.</p></div></section>
      <section className="requirements-section section-shell"><div className="case-label">User stories</div><div className="requirements-content"><h2>What the project answers.</h2><ol className="user-story-list">{userStories.map((story, index) => <li key={story}><span>{String(index + 1).padStart(2, "0")}</span><p>{story}</p></li>)}</ol></div></section>
      <section className="case-close section-shell"><Link className="button button-primary" href="/">Return to portfolio <span aria-hidden="true">-&gt;</span></Link></section>
    </main>
  );
}
