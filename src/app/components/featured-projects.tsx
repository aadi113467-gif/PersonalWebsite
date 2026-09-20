"use client";

import { useState } from "react";
import { ChevronIcon } from "./icons";

type FeaturedProject = {
  id: string;
  accent: "gold" | "green";
  index: string;
  category: string;
  name: string;
  year: string;
  stats: { value: string; label: string }[];
  spark: string;
  summary: string;
  more: string[];
  tags: string[];
  github: string;
};

const projects: FeaturedProject[] = [
  {
    id: "movie-rec",
    accent: "gold",
    index: "01",
    category: "Full-stack ML platform",
    name: "Movie Recommendation System",
    year: "2026",
    stats: [
      { value: "1,000+", label: "Movies vectorized" },
      { value: "3+", label: "REST endpoints" },
    ],
    spark: "0,32 20,28 40,30 60,18 80,22 100,10 120,16 140,8 160,14 180,4 200,10",
    summary:
      "A personalized movie recommender that learns your taste from the titles you like and ranks a 1,000+ movie catalog by genuine similarity — not just shared genre tags.",
    more: [
      "Every movie in the 1,000+ title catalog is converted into a TF-IDF vector over its text, then blended with genre, director, cast, and release-year signals — each normalized and weighted before being combined into a single cosine-similarity ranking. Liking a movie folds its vector into a running taste profile, and a popularity/quality prior built from IMDb rating and vote counts keeps obscure noise from outranking well-regarded films.",
      "Since there's no ground-truth interaction data to validate against, I built an offline evaluation harness that scores the recommender on content-proxy metrics — genre overlap, shared director/cast rate, and average rating of the results — to compare configurations before shipping a change. That logic is served through a FastAPI backend exposing 3+ REST endpoints with sub-second latency, connected to a React/TypeScript frontend where favoriting, rating, and tagging movies persists to localStorage and stays in sync across open tabs.",
    ],
    tags: ["Python", "FastAPI", "Scikit-learn", "TypeScript"],
    github: "https://github.com/aadi113467-gif/movie-recommender",
  },
  {
    id: "nba-analytics",
    accent: "green",
    index: "02",
    category: "Automated betting analytics",
    name: "NBA Analytics & Prediction Engine",
    year: "2026",
    stats: [
      { value: "67%", label: "Game outcome accuracy" },
      { value: "50K+", label: "Player-game records" },
    ],
    spark: "0,24 20,26 40,14 60,20 80,12 100,18 120,6 140,12 160,4 180,10 200,2",
    summary:
      "An end-to-end sports analytics pipeline that predicts NBA game outcomes and flags mispriced player prop bets using historical and live betting data.",
    more: [
      "The pipeline ingests 10,000+ NBA games and 50,000+ player-game records, then blends them with live betting lines pulled from The Odds API. On top of that data I engineered 15+ predictive features — team efficiency, matchup statistics, rolling averages, and usage rates — feeding models that call game outcomes with 67% accuracy and project individual player stats from historical performance trends.",
      "A probability and expected-value layer converts each projection into a win probability and compares it against the sportsbook's own implied probability, derived from the posted American odds, to flag props where the market and the model disagree. That scoring runs automatically against live odds feeds, surfacing matchup-based analytics insights without manual review.",
    ],
    tags: ["Python", "Pandas", "SQLite", "The Odds API"],
    github: "https://github.com/aadi113467-gif/nba-prop-bet",
  },
];

export default function FeaturedProjects() {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="feature-grid" data-reveal>
      {projects.map((project) => {
        const isOpen = openIds.has(project.id);
        return (
          <article className={`feature-card stop-${project.accent}`} key={project.id}>
            <div className="feature-visual">
              <div className="feature-visual-top">
                <span>{project.name}</span>
                <span>{project.year}</span>
              </div>
              <div className="feature-stats">
                {project.stats.map((stat) => (
                  <div key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className="feature-spark" aria-hidden="true">
                <svg viewBox="0 0 200 40" preserveAspectRatio="none">
                  <polyline points={project.spark} />
                </svg>
              </div>
            </div>
            <div className="feature-details">
              <p className="project-index">
                {project.index} / {project.category}
              </p>
              <h3>{project.name}</h3>
              <p className="feature-summary">{project.summary}</p>
              <button
                type="button"
                className="feature-toggle"
                aria-expanded={isOpen}
                onClick={() => toggle(project.id)}
              >
                <span>{isOpen ? "Less info" : "More info"}</span>
                <ChevronIcon className="feature-toggle-icon" />
              </button>
              <div className="feature-more">
                <div className="feature-more-inner">
                  {project.more.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="tag-list" aria-label="Technologies used">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-actions">
                <a className="button button-secondary" href={project.github} target="_blank" rel="noreferrer">
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
