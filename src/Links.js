import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faItchIo,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const LINKS = [
  {
    href: "https://github.com/rasmussvala",
    label: "GitHub",
    icon: faGithub,
  },
  {
    href: "https://www.linkedin.com/in/rasmus-svala/",
    label: "LinkedIn",
    icon: faLinkedin,
  },
  {
    href: "mailto:rasmus.svala@hotmail.com",
    label: "Email",
    icon: faEnvelope,
  },
  {
    href: "https://rasmussvala.itch.io/",
    label: "Itch.io",
    icon: faItchIo,
  },
];

export default function Links() {
  return (
    <nav className="social-links" aria-label="Social">
      {LINKS.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={l.icon} />
          {l.label}
        </a>
      ))}
    </nav>
  );
}
