import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Card({ date, title, image: imagePath, description, github }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const importImage = async () => {
      try {
        const imgModule = await import(`${imagePath}`);
        setImage(imgModule.default);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    importImage();
  }, [imagePath]);

  return (
    <article className="card">
      <div className="card-image-container">
        {image && <img src={image} alt={title} />}
      </div>
      {github && (
        <a
          href={github}
          className="github-project-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} style={{ color: "black" }} />
        </a>
      )}
      <header className="card-header">
        <p style={{ fontWeight: "bold" }}>{title}</p>
        <p>{date}</p>
      </header>
      <p dangerouslySetInnerHTML={{ __html: description }} />
    </article>
  );
}

export default Card;
