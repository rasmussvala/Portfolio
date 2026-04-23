import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import useMagneticTilt from "./hooks/useMagneticTilt";
import { CATEGORIES } from "./Filter";

const CATEGORY_LABEL = CATEGORIES.reduce((acc, c) => {
  acc[c.id] = c.label;
  return acc;
}, {});

function getYear(date) {
  const m = date.match(/\d{4}/);
  return m ? m[0] : date;
}

function Card({
  index,
  date,
  title,
  imagePath,
  gifPath,
  description,
  category,
  tech = [],
  github,
  liveUrl,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [gif, setGif] = useState(null);
  const tilt = useMagneticTilt(4);

  useEffect(() => {
    let cancelled = false;
    const importImage = async () => {
      try {
        const mod = await import(`${imagePath}`);
        if (!cancelled) setImage(mod.default);
      } catch {}
    };
    const importGif = async () => {
      try {
        const mod = await import(`${gifPath}`);
        if (!cancelled) setGif(mod.default);
      } catch {}
    };
    importImage();
    if (gifPath) importGif();
    return () => {
      cancelled = true;
    };
  }, [imagePath, gifPath]);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isModalOpen, closeModal]);

  const visibleTech = tech.slice(0, 3);
  const extraTech = tech.length - visibleTech.length;
  const indexLabel = `N°${String(index + 1).padStart(2, "0")}`;

  return (
    <>
      <article
        className="card"
        onClick={() => setIsModalOpen(true)}
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
      >
        <span className="card__index" aria-hidden="true">
          {indexLabel}
        </span>
        <div className="card__image-wrap">
          {image && <img src={image} alt={title} loading="lazy" />}
        </div>
        <div className="card__meta">
          <h3 className="card__title">{title}</h3>
          <span className="card__year">{getYear(date)}</span>
        </div>
        <div className="card__chips">
          {category && (
            <span className="chip chip--category">
              {CATEGORY_LABEL[category] ?? category}
            </span>
          )}
          {visibleTech.map((t) => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
          {extraTech > 0 && (
            <span className="chip chip--more">+{extraTech}</span>
          )}
        </div>
      </article>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="overlay"
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 6 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={title}
            >
              <button
                type="button"
                className="modal__close"
                onClick={closeModal}
                aria-label="Close"
              >
                *
              </button>

              <div className="modal__hero">
                <img src={gif || image} alt={title} />
              </div>

              <div className="modal__body">
                <div>
                  <div className="modal__meta-row">
                    {category && (
                      <span className="chip chip--category">
                        {CATEGORY_LABEL[category] ?? category}
                      </span>
                    )}
                    <span className="chip">{date}</span>
                  </div>
                  <h3 className="modal__title">{title}</h3>
                  <p className="modal__description">{description}</p>
                </div>

                <aside className="modal__side">
                  {tech.length > 0 && (
                    <div>
                      <h4>Tech</h4>
                      <div className="modal__tech">
                        {tech.map((t) => (
                          <span className="chip" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {(github || liveUrl) && (
                    <div>
                      <h4>Links</h4>
                      <div className="modal__links">
                        {liveUrl && (
                          <a
                            className="modal__link"
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>Live demo</span>
                            <FontAwesomeIcon
                              icon={faArrowUpRightFromSquare}
                            />
                          </a>
                        )}
                        {github && (
                          <a
                            className="modal__link"
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>Source on GitHub</span>
                            <FontAwesomeIcon icon={faGithubAlt} />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </aside>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Card;
