import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';


function Card({ date, title, imagePath, gifPath, description, github }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("fadeIn");
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

  const openModal = () => {
    setAnimationClass("fadeIn");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setAnimationClass("fadeOut");
    setTimeout(() => {
      setIsModalOpen(false);
    }, 500); // 500ms matches the animation-duration defined in CSS
  };

  return (
    <>
      <article className="card" onClick={openModal}>
        <div className="card-image-container">
          <img
            src={image}
            alt={title}
          />
        </div>
      </article>

      {isModalOpen && (
        <div
          className={`modal-overlay ${animationClass}`}
          onClick={closeModal}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
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

            {(gifPath ? !gif : !image) ? (
              <Skeleton
                count={1}
                className="skeleton-image"
                baseColor="#858585ff"
                highlightColor="#9b9b9bff"
              />
            ) : (
              <img src={gifPath ? gif : image} alt={title} className="modal-image" />
            )}

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
