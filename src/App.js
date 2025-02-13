import "./styles/global.css";
import projects from "./data.json";
import Card from "./Card.js";
import Header from "./Header.js";
import Links from "./Links";

import { useState, useEffect } from "react";

// Convert date strings to a comparable format
const parseDate = (dateString) => {
  const [month, year] = dateString.split(" ");
  return new Date(`${month} 1, ${year}`);
};

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Sort the projects by date
  const sortedProjects = projects
    .slice()
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));

  // Set loaded to true
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`app ${isLoaded ? "loaded" : ""}`}>
      <Header />
      <Links />

      <div className="content-container">
        <h2>About me</h2>
        <div className="about-me-text">
          <p>
            I grew up in Tranås, Sweden, and currently live in Norrköping, where I study at Linköping University. I enjoy coding and learning new things. I have explored a variety of programming languages and environments, including C++, Python, web development, game development, and some Git. When I'm not coding, I also enjoy playing video games, working out and being active.
          </p>
        </div>

        <h2>Projects</h2>
        <section className="card-container">
          {sortedProjects.map((project, index) => (
            <Card
              key={index}
              date={project.date}
              title={project.title}
              imagePath={project.image}
              gifPath={project.gif ? project.gif : null}
              description={project.description}
              github={project.github}
            />
          ))}
        </section>
      </div>
      <footer>
        <p>
          2025 Designed and created by me. Find the source code on{" "}
          <a href="https://github.com/rasmussvala/Portfolio">GitHub</a>.
        </p>
      </footer>
    </div>
  );
}

export default App;
