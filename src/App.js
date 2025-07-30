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
            I grew up in Tranås, Sweden, and now live in Linköping. I have an M.Sc. in Media Technology and Engineering from Linköping University. I'm passionate about coding and enjoy exploring new technologies. I've worked with C++, Python, web and game development, and Git. When I'm not coding, I like playing video games, staying active, and working out.

            Feel free to reach out through my socials — I'm always open to a chat.
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
