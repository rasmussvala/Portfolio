import "./styles/global.css";
import projects from "./data.json";
import { useMemo, useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";

import Card from "./Card";
import Header from "./Header";
import Links from "./Links";
import About from "./About";
import Filter, { CATEGORIES } from "./Filter";
import Footer from "./Footer";

const parseDate = (dateString) => {
  const [month, year] = dateString.split(" ");
  return new Date(`${month} 1, ${year}`);
};

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [active, setActive] = useState("all");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sortedProjects = useMemo(
    () =>
      projects.slice().sort((a, b) => parseDate(b.date) - parseDate(a.date)),
    []
  );

  const counts = useMemo(() => {
    const c = { all: sortedProjects.length };
    for (const cat of CATEGORIES) if (cat.id !== "all") c[cat.id] = 0;
    for (const p of sortedProjects) {
      if (p.category && c[p.category] !== undefined) c[p.category] += 1;
    }
    return c;
  }, [sortedProjects]);

  const visible =
    active === "all"
      ? sortedProjects
      : sortedProjects.filter((p) => p.category === active);

  return (
    <div className={`app ${isLoaded ? "loaded" : ""}`}>
      <Header />
      <Links />

      <div className="content-container">
        <div className="section-divider" aria-hidden="true">
          <span>*</span>
          <span>*</span>
          <span>*</span>
        </div>

        <About projectCount={sortedProjects.length} />

        <div className="projects-header">
          <h2>Projects</h2>
          <span className="projects-header__count">
            Showing <strong>{visible.length}</strong> / {sortedProjects.length}
          </span>
        </div>

        <Filter active={active} counts={counts} onChange={setActive} />

        <section className="card-container" aria-label="Projects">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <Card
                key={project.title}
                index={sortedProjects.indexOf(project)}
                date={project.date}
                title={project.title}
                imagePath={project.image}
                gifPath={project.gif ? project.gif : null}
                description={project.description}
                category={project.category}
                tech={project.tech}
                github={project.github}
                liveUrl={project.liveUrl}
              />
            ))}
          </AnimatePresence>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default App;
