import { useState, useEffect } from "react";

/* ==================================================================
   EDIT EVERYTHING HERE
   ================================================================== */

const ME = {
  name: "Sunita Bhat",
  role: "Full Stack Developer",
  email: "sunitabhathkl@gmail.com",
  phone: "+91 94829 11995",
  location: "Bengaluru, India",

  // TODO: paste your real profile URLs
  linkedin: "https://www.linkedin.com/in/sunita-bhat-55a13123a/",
  github: "https://github.com/SunitaSBhat",
  leetcode: "https://leetcode.com/u/ssbh888/",
};

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Experience" },
  { id: "project", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "more", label: "Education & more" },
  { id: "contact", label: "Contact" },
];

const INTRO = {
  lede: "I keep data intact while it moves.",
  ledeHighlight: "intact",
  body:
    "Full stack developer with just over a year across the JavaScript ecosystem — React, Vue and Node.js on top of MongoDB and SQL, deployed on AWS. Most of my work so far has been the unglamorous kind that matters: making a slow pipeline fast, moving a production database without losing a row, and retiring a deprecated framework before it became someone else's problem.",
  facts: [
    { value: "80%", label: "Faster bulk-update pipeline in MongoDB" },
    { value: "0", label: "Rows lost migrating a production database" },
    { value: "300+", label: "LeetCode problems solved" },
  ],
};

const JOBS = [
  {
    title: "Full Stack Developer",
    org: "Rugas Technologies Pvt. Ltd. — Bengaluru",
    from: "Aug 2025",
    to: "Present",
    current: true,
    points: [
      "Rewrote a bulk-update data pipeline in MongoDB, cutting processing time by 80%.",
      "Led a zero-data-loss migration of the production MongoDB database, designing the aggregation pipelines that made a tight deadline possible.",
      "Deployed and monitored services on AWS, tightening the release workflow.",
      "Received a formal recognition award for work on a key project.",
    ],
  },
  {
    title: "Full Stack Developer Intern",
    org: "Rugas Technologies Pvt. Ltd. — Bengaluru",
    from: "Apr 2025",
    to: "Jul 2025",
    points: [
      "Migrated the production codebase from Vue 2 to Vue 3 ahead of schedule, removing every deprecated API call along the way.",
    ],
  },
  {
    title: "Full Stack Developer Intern",
    org: "Xzect Labs Pvt. Ltd. — Delhi",
    from: "Jul 2024",
    to: "Aug 2024",
    points: [
      "Added JWT-based authentication to secure REST API endpoints.",
      "Built a responsive production UI in React and Next.js, wired end to end with the backend APIs.",
    ],
  },
  {
    title: "Cloud Computing Intern",
    org: "Technotut Solutions LLP — Mysore",
    from: "Jul 2024",
    to: "Jul 2024",
    points: [
      "Encrypted S3 storage with AWS KMS to close off unauthorised access paths.",
      "Wrote least-privilege IAM policies to bring access in line with security standards.",
    ],
  },
];

const PROJECTS = [
  {
    title: "Your Shop — order management",
    meta: "Full stack application · React, Node.js, MongoDB",
    body:
      "A full stack order management app built to take the friction out of customer onboarding. Redux holds application state in one place, and JWT with cookie-based role authentication runs through middleware so every route knows who is asking.",
    tags: ["React", "Redux", "Node.js", "MongoDB", "JWT", "Role-based access"],
    link: null, // e.g. "https://github.com/you/your-shop"
  },
];

const SKILLS = [
  ["Languages", "JavaScript, TypeScript-ready ES6+, Python, Java, SQL"],
  ["Frontend", "React, Vue 2 & 3, Next.js, Redux, HTML5, CSS3, Bootstrap"],
  ["Backend", "Node.js, Express-style REST APIs, Feathers.js, JWT auth, Pandas"],
  ["Databases", "MongoDB with aggregation pipelines, SQL, Neo4j"],
  ["Cloud & ops", "AWS (S3, IAM, KMS), Docker, Terraform, Ansible, CI/CD, Git"],
  [
    "Ways of working",
    "Agile / Scrum, data structures & algorithms, system design fundamentals, code review",
  ],
];

const EDUCATION = {
  degree: "B.Tech, Computer Science",
  detail: "Srinivas University, Mangaluru · Apr 2025 · GPA 8.85 / 10",
};

const EXTRAS = [
  "Solved 300+ problems on LeetCode, with 50-day and 100-day streaks.",
  "Open-source contributor to Digitomize and other repositories.",
  "Took part in the Market Matrix Hackathon at IIT Madras.",
  "Formal recognition award at Rugas Technologies for contribution to a key project.",
];

const CONTACT_BLURB =
  "I'm open to full stack roles and to interesting problems involving data, APIs and the messy middle between the two. Email is the fastest way to reach me.";

/* ================================================================== */

function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("sb-theme") || "auto";
    } catch {
      return "auto";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "auto") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("sb-theme", theme);
    } catch {
      /* storage unavailable — theme just won't persist */
    }
  }, [theme]);

  const cycle = () =>
    setTheme((t) => (t === "auto" ? "light" : t === "light" ? "dark" : "auto"));

  return [theme, cycle];
}

const telHref = (phone) => "tel:" + phone.replace(/\s/g, "");

function Lede({ text, highlight }) {
  if (!highlight || !text.includes(highlight)) return <p className="lede">{text}</p>;
  const [before, after] = text.split(highlight);
  return (
    <p className="lede">
      {before}
      <em>{highlight}</em>
      {after}
    </p>
  );
}

function Rail() {
  const active = useActiveSection();
  const [theme, cycleTheme] = useTheme();

  return (
    <header className="rail">
      <h1>{ME.name}</h1>
      <p className="role">
        {ME.role} · {ME.location}
      </p>

      <nav aria-label="Sections">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}>
            {s.label}
          </a>
        ))}
      </nav>

      <div className="contact">
        <a href={`mailto:${ME.email}`}>{ME.email}</a>
        <a href={telHref(ME.phone)}>{ME.phone}</a>
        <a href={ME.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={ME.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>

    
    </header>
  );
}

function About() {
  return (
    <section id="about">
      <h2>About</h2>
      <Lede text={INTRO.lede} highlight={INTRO.ledeHighlight} />
      <p className="intro">{INTRO.body}</p>
      <ul className="facts">
        {INTRO.facts.map((f) => (
          <li key={f.value}>
            <b>{f.value}</b>
            <span>{f.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Work() {
  return (
    <section id="work">
      <h2>Experience</h2>
      {JOBS.map((job, i) => (
        <article className="job" key={i}>
          <div className="when">
            {job.from} – {job.to}
            {job.current && <span className="now">Current</span>}
          </div>
          <div>
            <h3>{job.title}</h3>
            <p className="where">{job.org}</p>
            <ul>
              {job.points.map((p, k) => (
                <li key={k}>{p}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </section>
  );
}

function Projects() {
  return (
    <section id="project">
      <h2>Projects</h2>
      {PROJECTS.map((p) => (
        <article className="project" key={p.title}>
          <h3>
            {p.link ? (
              <a href={p.link} target="_blank" rel="noreferrer">{p.title}</a>
            ) : (
              p.title
            )}
          </h3>
          <p className="where">{p.meta}</p>
          <p>{p.body}</p>
          <div className="tags">
            {p.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <dl>
        {SKILLS.map(([group, list]) => (
          <div className="skill-row" key={group}>
            <dt>{group}</dt>
            <dd>{list}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function More() {
  return (
    <section id="more">
      <h2>Education &amp; more</h2>
      <div className="edu">
        <h3>{EDUCATION.degree}</h3>
        <span className="gpa">{EDUCATION.detail}</span>
      </div>
      <ul className="extras">
        {EXTRAS.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact">
      <h2>Contact</h2>
      <p>{CONTACT_BLURB}</p>
      <a className="cta" href={`mailto:${ME.email}`}>
        Email {ME.name.split(" ")[0]}
      </a>
      <div className="elsewhere">
        <a href={ME.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={ME.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={ME.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
        <a href={telHref(ME.phone)}>{ME.phone}</a>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="shell">
      <Rail />
      <main>
        <About />
        <Work />
        <Projects />
        <Skills />
        <More />
        <Contact />
      </main>
    </div>
  );
}