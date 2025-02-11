import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";

function Card({ date, title, imagePath, gifPath, description, github }) {
  const [isHovered, setIsHovered] = useState(false);

  const [image, setImage] = useState(null);
  const [gif, setGif] = useState(null);

  useEffect(() => {
    const importImage = async () => {
      const imgModule = await import(`${imagePath}`);
      setImage(imgModule.default);
    };

    const importGif = async () => {
      const gifModule = await import(`${gifPath}`);
      setGif(gifModule.default);
    }

    importImage();
    if (gifPath) importGif();
  }, [imagePath]);

  return (
    <article className="item">
      <div className="card-image-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          className={isHovered && gifPath ? "hovered" : "non-hovered"}

          src={isHovered && gifPath ? gif : image}
          alt={title}
        />
      </div>
      {/* {github && (
        <div className="github-project-link-container">
          <div className="github-project-link">
            <a href={github} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithubAlt} />
            </a>
          </div>
        </div>
      )}
      <header className="card-header">
        <p style={{ fontWeight: "bold" }}>{title}</p>
        <p>{date}</p>
      </header>
      <p dangerouslySetInnerHTML={{ __html: description }} /> */}
    </article>
  );
}

export default Card;
