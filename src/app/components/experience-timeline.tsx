"use client";

import { useState } from "react";
import { ChevronIcon } from "./icons";

type Experience = {
  id: string;
  accent: "red" | "gold" | "green";
  title: string;
  company: string;
  location: string;
  dates: string;
  summary: string;
  tags: string[];
};

const experiences: Experience[] = [
  {
    id: "gt-baseball",
    accent: "gold",
    title: "Research Lead & Software Development Engineer",
    company: "GT Baseball Analytics (VIP)",
    location: "Atlanta, GA",
    dates: "Jan 2026 – Present",
    summary:
      "Leading development on a baseball analytics platform that turns raw pitch and swing data into coaching-ready insight. I migrated the dashboard to a static AWS S3 and CloudFront stack, wrote the Lambda functions behind the pitch-sequencing visualizations, and provisioned the infrastructure with Terraform. The Parquet/CSV-to-PostgreSQL pipeline I automated cut manual reporting time by 70%.",
    tags: ["AWS Lambda", "Terraform", "PostgreSQL", "CloudFront · Cognito"],
  },
  {
    id: "alvi-satellites",
    accent: "red",
    title: "Data & Software Development Intern",
    company: "Alvi Satellites",
    location: "Berkeley Lake, GA",
    dates: "May 2023 – May 2025",
    summary:
      "Built the data backbone for a small hospitality business over two years — Python and Pandas pipelines that cleaned and processed thousands of hotel and ownership records, a lead-scoring model that ranked prospects by engagement, and SQL databases that kept client interactions organized. Together they cut processing time by 75% and lead qualification time in half.",
    tags: ["Python", "Pandas", "SQL", "Lead Scoring"],
  },
  {
    id: "first-robotics",
    accent: "green",
    title: "Co-Founder & Software Engineering Lead",
    company: "FIRST Robotics Competition",
    location: "Lambert High School",
    dates: "Aug 2023 – May 2025",
    summary:
      "Co-founded the school's first robotics software division and grew it into a 90-person team with real development workflows for controls and testing. I designed and shipped 15+ autonomous control systems with sensor integration and motion planning, then carried that software across three competition robots through 20+ matches, lifting robot reliability by more than 30%.",
    tags: ["Embedded Systems", "Autonomous Control", "Team Leadership"],
  },
];

export default function ExperienceTimeline() {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(experiences.map((exp) => exp.id)));

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
    <div className="exp-route" data-reveal>
      {experiences.map((exp) => {
        const isOpen = openIds.has(exp.id);
        return (
          <article
            className={`exp-stop stop-${exp.accent}${isOpen ? " is-open" : ""}`}
            key={exp.id}
          >
            <span className="exp-dot" aria-hidden="true" />
            <button
              type="button"
              className="exp-head"
              aria-expanded={isOpen}
              onClick={() => toggle(exp.id)}
            >
              <span className="exp-head-main">
                <span className="exp-title">{exp.title}</span>
                <span className="exp-company">
                  {exp.company} <span className="exp-sep">/</span> {exp.location}
                </span>
              </span>
              <span className="exp-head-meta">
                <span className="exp-dates">{exp.dates}</span>
                <ChevronIcon className="exp-chevron" />
              </span>
            </button>
            <div className="exp-panel">
              <div className="exp-panel-inner">
                <p>{exp.summary}</p>
                <div className="exp-tags">
                  {exp.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
