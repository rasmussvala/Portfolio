export default function About({ projectCount }) {
  return (
    <section className="about content-container">
      <span className="about__gutter-label">ABOUT · N°01</span>
      <div className="about__heading">
        <h2>About me</h2>
        <span className="mono">RASMUS SVALA · LINKÖPING, SE</span>
      </div>

      <p className="about__body">
        I grew up in Tranås, Sweden, and now live in Linköping. I'm passionate
        about coding and enjoy exploring new technologies. I've worked with C++,
        Python, web and game development, and Git. When I'm not coding, I like
        playing video games, staying active, and working out. Feel free to reach
        out through my socials — I'm always open to a chat.
      </p>

      <aside className="about__stats" aria-label="Stats">
        <div className="stat">
          <span className="stat__value">M.Sc.</span>
          <span className="stat__label">Media Tech. · LiU</span>
        </div>
        <div className="stat">
          <span className="stat__value">5+</span>
          <span className="stat__label">Years coding</span>
        </div>
      </aside>
    </section>
  );
}
