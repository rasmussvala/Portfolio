import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";

function Card({ date, title, imagePath, gifPath, description, github }) {
  // State for hover effect on the image
  const [isHovered, setIsHovered] = useState(false);
  // State to control whether the modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);
  // States to store the imported image and gif
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
    };

    importImage();
    if (gifPath) importGif();
  }, [imagePath, gifPath]);

  return (
    <>
      {/* Card version: only image is displayed */}
      <article className="card" onClick={() => setIsModalOpen(true)}>
        <div
          className="card-image-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            className={isHovered && gifPath ? "hovered" : "non-hovered"}
            src={isHovered && gifPath ? gif : image}
            alt={title}
          />
        </div>
      </article>

      {/* Modal version: shown when card is pressed */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsModalOpen(false)}
          // The overlay takes the full screen and centers its content via CSS.
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal when clicking inside it
          >
            {github && (
              <div className="github-project-link-container">
                <div className="github-project-link">
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithubAlt} />
                  </a>
                </div>
              </div>
            )}

            {/* You can choose whether to show the image, the gif, or both in the modal.
                Here we show the static image. */}
            <img src={image} alt={title} className="modal-image" />

            <header className="card-header">
              <p style={{ fontWeight: "bold" }}>{title}</p>
              <p>{date}</p>
            </header>


            <p dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
