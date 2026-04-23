import P5Wrapper from "./p5Wrapper";
import Marquee from "./Marquee";

export default function Header() {
  return (
    <header className="header">
      <div className="hero-eyebrow">
        <span>Portfolio</span>
        <span className="dot" aria-hidden="true"></span>
        <span>N°002</span>
        <span className="dot" aria-hidden="true"></span>
        <span>Linköping, SE</span>
        <span className="dot" aria-hidden="true"></span>
        <span>Est. 2020</span>
      </div>

      <div className="text-container">
        <P5Wrapper />
      </div>

      <p className="hero-tagline">
        Hi, I'm Rasmus — a software engineer with an M.Sc. in Media Technology
        &amp; Engineering, based in Linköping, Sweden. I build games, graphics,
        and the occasional web thing.
      </p>

      <Marquee />

      <div className="scroll-cue" aria-hidden="true">
        <span className="blink">*</span>
        <span>Scroll ↓</span>
      </div>
    </header>
  );
}
